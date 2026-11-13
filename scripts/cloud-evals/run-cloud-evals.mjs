#!/usr/bin/env node
// Agent evals in Renku Cloud (plan 0258, Q3): Claude Code (`claude -p`) and
// the Codex CLI (`codex exec`) with the Renku Cloud plugin, against the studio
// repository's local cloud launcher and its fake acme provider. Pass or fail
// comes from the project afterwards and the recorded calls, never from the
// transcript.
//
//   pnpm eval:cloud [--case <name|case-id>]... [--app claude-code|codex]...
//                   [--studio <studio checkout>] [--out <folder>]
//                   [--claude-model <m>] [--claude-budget-usd <n>] [--codex-model <m>]
//                   [--timeout-minutes <n>] [--list]
//
// The studio checkout must be built (`pnpm build` there). Each run's
// transcript, launcher log, records and check results stay in --out.
import { mkdtemp } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { buildCloudPlugin } from './cloud-plugin.mjs';
import { EVAL_APPS, loadEvalCases, planEvalRuns } from './eval-cases.mjs';
import { runEval } from './eval-run.mjs';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const casesFolder = path.join(repositoryRoot, 'scripts', 'cloud-evals', 'cases');

const { values } = parseArgs({
  options: {
    case: { type: 'string', multiple: true, default: [] },
    app: { type: 'string', multiple: true, default: [] },
    studio: { type: 'string', default: path.resolve(repositoryRoot, '..', 'studio') },
    out: { type: 'string' },
    'claude-model': { type: 'string' },
    'claude-budget-usd': { type: 'string', default: '5' },
    'codex-model': { type: 'string' },
    'timeout-minutes': { type: 'string', default: '20' },
    list: { type: 'boolean', default: false },
  },
});

const budgetUsd = Number(values['claude-budget-usd']);
const timeoutMinutes = Number(values['timeout-minutes']);
if (!(budgetUsd > 0) || !(timeoutMinutes > 0)) {
  throw new Error('SKILLS_CLOUD_EVAL005 --claude-budget-usd and --timeout-minutes must be positive numbers.');
}

const cases = await loadEvalCases(casesFolder);
const runs = planEvalRuns(cases, { apps: values.app.length > 0 ? values.app : EVAL_APPS, filters: values.case });

if (values.list) {
  for (const evalCase of cases) {
    console.log(`${evalCase.name}  [${evalCase.cases.join(' ')}]  ${evalCase.apps.join(', ')}${evalCase.requires.length > 0 ? `  requires ${evalCase.requires.join(', ')}` : ''}`);
  }
  process.exit(0);
}

const outFolder = path.resolve(values.out ?? await mkdtemp(path.join(os.tmpdir(), 'renku-cloud-evals-')));
const options = {
  outFolder,
  studioRoot: path.resolve(values.studio),
  skillsRoot: repositoryRoot,
  builtPlugin: buildCloudPlugin(repositoryRoot),
  claudeModel: values['claude-model'],
  claudeBudgetUsd: budgetUsd,
  codexModel: values['codex-model'],
  timeoutMs: timeoutMinutes * 60_000,
};
console.log(`${runs.length} eval runs; transcripts in ${outFolder}`);

const outcomes = [];
for (const run of runs) {
  console.log(`\n▶ ${run.evalCase.name} in ${run.app} [${run.evalCase.cases.join(' ')}]`);
  const outcome = await runEval(run, options).catch((error) => ({ ...run, status: 'error', reason: error.message, results: [] }));
  printOutcome(outcome);
  outcomes.push(outcome);
}

printSummary(outcomes);
process.exitCode = outcomes.some((outcome) => outcome.status === 'failed' || outcome.status === 'error') ? 1 : 0;

function printOutcome(outcome) {
  for (const result of outcome.results) {
    console.log(`  ${result.passed ? 'pass' : 'FAIL'}  ${result.check}: ${result.detail}`);
  }
  if (outcome.agent) {
    console.log(`  agent exit ${outcome.agent.exitCode}${outcome.agent.timedOut ? ' (timed out)' : ''}; ${Math.round(outcome.durationMs / 1000)} s; ${outcome.runFolder}`);
  }
  if (outcome.reason) {
    console.log(`  ${outcome.status}: ${outcome.reason}`);
  }
}

function printSummary(all) {
  console.log('\nSummary');
  for (const outcome of all) {
    const passedChecks = outcome.results.filter((result) => result.passed).length;
    console.log(`  ${outcome.status.padEnd(7)}  ${outcome.evalCase.name} in ${outcome.app}  ${outcome.results.length > 0 ? `${passedChecks}/${outcome.results.length} checks` : ''}  [${outcome.evalCase.cases.join(' ')}]`);
  }
  const counts = Object.groupBy(all, (outcome) => outcome.status);
  console.log(`  ${Object.entries(counts).map(([status, list]) => `${list.length} ${status}`).join(', ')}`);
}
