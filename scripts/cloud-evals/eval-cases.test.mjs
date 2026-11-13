import assert from 'node:assert/strict';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { loadEvalCases, parseEvalCase, planEvalRuns } from './eval-cases.mjs';

const CASES_FOLDER = path.join(path.dirname(fileURLToPath(import.meta.url)), 'cases');

/** Every case id the parity design proves with agent evals (docs/architecture/renku-cloud-parity.md, "Agent evals"). */
const AGENT_EVAL_CASE_IDS = [
  'B1', 'C3', 'C8', 'D2', 'D4', 'D5', 'D6',
  'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8',
  'F11', 'F12', 'F16', 'F18', 'G3', 'H3', 'I3', 'I4', 'K3', 'M1', 'M2', 'M3',
];

const VALID = `---
cases: [M2, C3]
apps: [claude-code, codex]
fixture: small-film
agentFiles: [harbor-sheets]
request: |
  Add the seven sheets.
checks:
  - check: assets
    owner: location:{harbor}
    min: 7
---

# Seven sheets
`;

test('a case file gives its ids, apps, fixture, request and checks', () => {
  const evalCase = parseEvalCase(VALID, '/cases/seven-sheets.md');
  assert.deepEqual(evalCase, {
    name: 'seven-sheets',
    file: '/cases/seven-sheets.md',
    title: 'Seven sheets',
    cases: ['M2', 'C3'],
    apps: ['claude-code', 'codex'],
    fixture: 'small-film',
    agentFiles: ['harbor-sheets'],
    requires: [],
    providerJobMs: undefined,
    request: 'Add the seven sheets.',
    checks: [{ check: 'assets', owner: 'location:{harbor}', min: 7 }],
  });
});

test('every problem in a case file is reported at once', () => {
  const text = `---
cases: [M2, Z99]
apps: [chatgpt]
request: ""
extra: 1
checks:
  - check: assets
  - check: teleport
---
`;
  assert.throws(() => parseEvalCase(text, 'bad.md'), (error) => {
    assert.match(error.message, /^SKILLS_CLOUD_EVAL002 bad\.md:/);
    assert.deepEqual(error.problems, [
      'cases must list design case ids such as [M2, E1]',
      'apps must list apps from claude-code, codex',
      'fixture must name a launcher fixture',
      'request must be the person\'s request',
      'extra is not a case field; use cases, apps, fixture, agentFiles, requires, providerJobMs, request, checks',
      'checks[0]: assets needs owner',
      'checks[0]: assets needs min, max or both',
      'checks[1]: check "teleport" is not one of assets, asset-text, screenplay-scenes, location, cast-member, cast-voices, previs-revisions, generation-jobs, project-json, project-files, renku-calls, renku-commands, provider-calls, provider-peak, provider-inputs',
    ]);
    return true;
  });
});

test('a front matter error names the file', () => {
  assert.throws(() => parseEvalCase('no front matter', 'plain.md'), /SKILLS_CLOUD_EVAL002 plain\.md:\n {2}- SKILLS_CLOUD_EVAL001 line 1/);
});

test('runs pair each chosen case with each of its apps that was asked for', () => {
  const both = parseEvalCase(VALID, 'seven-sheets.md');
  const codexOnly = { ...both, name: 'codex-built-in-image', cases: ['F12'], apps: ['codex'] };
  const names = (runs) => runs.map((run) => `${run.evalCase.name}/${run.app}`);
  assert.deepEqual(names(planEvalRuns([both, codexOnly])), ['seven-sheets/claude-code', 'seven-sheets/codex', 'codex-built-in-image/codex']);
  assert.deepEqual(names(planEvalRuns([both, codexOnly], { apps: ['claude-code'] })), ['seven-sheets/claude-code']);
  assert.deepEqual(names(planEvalRuns([both, codexOnly], { filters: ['F12'] })), ['codex-built-in-image/codex']);
  assert.deepEqual(names(planEvalRuns([both, codexOnly], { filters: ['seven-sheets'], apps: ['codex'] })), ['seven-sheets/codex']);
  assert.throws(() => planEvalRuns([both], { filters: ['Q9'] }), /SKILLS_CLOUD_EVAL004 no case matches Q9/);
  assert.throws(() => planEvalRuns([both], { apps: ['cursor'] }), /SKILLS_CLOUD_EVAL003 unknown app cursor/);
});

test('the committed cases parse, and together cover every agent-eval case id of the design', async () => {
  const cases = await loadEvalCases(CASES_FOLDER);
  const covered = new Set(cases.flatMap((evalCase) => evalCase.cases));
  assert.deepEqual(AGENT_EVAL_CASE_IDS.filter((id) => !covered.has(id)), []);
  assert.deepEqual(cases.filter((evalCase) => evalCase.cases.includes('F12')).map((evalCase) => evalCase.apps), [['codex']]);
});
