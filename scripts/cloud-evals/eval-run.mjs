// One eval: one case in one AI app, against its own launcher and fixture
// project. The agent's transcript and the launcher's records are kept in the
// run's folder; pass or fail comes from the checks alone.
import { spawn } from 'node:child_process';
import { createWriteStream } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { finished } from 'node:stream/promises';
import path from 'node:path';
import { AGENT_APPS } from './agent-apps.mjs';
import { startCloudLauncher } from './cloud-launcher.mjs';
import { copyCloudPlugin } from './cloud-plugin.mjs';
import { runChecks, substitutePlaceholders } from './eval-checks.mjs';
import { findProgram } from './local-programs.mjs';

/** Added to every request: the run is headless, so a question would end it. */
export const UNATTENDED_NOTE = 'This runs unattended: nobody can answer questions or approve anything until it ends. Treat the choices and approvals above as final, and finish the whole request without stopping to ask.';

/**
 * The person's request with `{program}` placeholders filled from the
 * programs the case requires, followed by the unattended note.
 */
export function evalPrompt(evalCase, programs) {
  return `${substitutePlaceholders(evalCase.request, programs)}\n\n${UNATTENDED_NOTE}`;
}

/** Runs one eval and returns its outcome: `passed`, `failed` or `skipped`, with its check results. */
export async function runEval({ evalCase, app }, options) {
  const runFolder = path.join(options.outFolder, `${evalCase.name}--${app}`);
  const missing = [AGENT_APPS[app].program, ...evalCase.requires].filter((program) => !findProgram(program));
  if (missing.length > 0) {
    return { evalCase, app, status: 'skipped', reason: `not installed here: ${missing.join(', ')}`, results: [], runFolder };
  }
  const programs = Object.fromEntries(evalCase.requires.map((program) => [program, findProgram(program)]));
  const workspace = path.join(runFolder, 'workspace');
  await mkdir(workspace, { recursive: true });
  const startedAt = Date.now();
  const launcher = await startCloudLauncher({
    studioRoot: options.studioRoot,
    fixture: evalCase.fixture,
    workspace,
    skillsRoot: options.skillsRoot,
    agentFiles: evalCase.agentFiles,
    providerJobMs: evalCase.providerJobMs,
  }, path.join(runFolder, 'launcher.log'));
  try {
    const { addresses } = launcher;
    await writeJson(path.join(runFolder, 'addresses.json'), addresses);
    const pluginFolder = await copyCloudPlugin(options.builtPlugin, path.join(runFolder, 'plugin', 'renku-cloud'), addresses.mcpUrl);
    const prompt = evalPrompt(evalCase, programs);
    const invocation = await AGENT_APPS[app].prepare({ runFolder, workspace, pluginFolder, addresses, prompt, options });
    const agent = await runAgent(AGENT_APPS[app].program, invocation, runFolder, options.timeoutMs);
    const records = await launcher.records();
    await writeJson(path.join(runFolder, 'records.json'), records);
    const results = await runChecks(evalCase.checks, {
      renku: launcher.renku,
      records,
      projectFolder: addresses.project.folder,
      values: { project: addresses.project.name, ...addresses.ids },
    });
    await writeJson(path.join(runFolder, 'checks.json'), results);
    const status = results.every((result) => result.passed) ? 'passed' : 'failed';
    return { evalCase, app, status, agent, results, runFolder, durationMs: Date.now() - startedAt };
  } finally {
    await launcher.stop();
  }
}

/** Runs the app to the end, or until the timeout; its output is the transcript. */
async function runAgent(program, { cwd, args }, runFolder, timeoutMs) {
  const transcript = createWriteStream(path.join(runFolder, 'transcript.jsonl'));
  const errors = createWriteStream(path.join(runFolder, 'agent-stderr.log'));
  const child = spawn(program, args, { cwd, stdio: ['ignore', 'pipe', 'pipe'] });
  child.stdout.pipe(transcript);
  child.stderr.pipe(errors);
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    child.kill('SIGTERM');
  }, timeoutMs);
  const exitCode = await new Promise((resolve, reject) => {
    child.once('error', reject);
    child.once('close', (code) => resolve(code));
  });
  clearTimeout(timer);
  await Promise.all([finished(transcript), finished(errors)]);
  return { exitCode, timedOut };
}

async function writeJson(file, value) {
  await writeFile(file, `${JSON.stringify(value, null, 2)}\n`);
}
