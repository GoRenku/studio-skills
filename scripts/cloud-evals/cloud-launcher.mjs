// Starts and stops the studio repository's Renku Cloud launcher for evals
// (packages/cloud/tests/evals/serve-cloud-for-evals.mjs) and talks to its
// eval control: the records of every tool call, and renku commands on the
// project for the checks.
import { spawn } from 'node:child_process';
import { createWriteStream, existsSync } from 'node:fs';
import path from 'node:path';
import { createInterface } from 'node:readline';

const LAUNCHER = 'packages/cloud/tests/evals/serve-cloud-for-evals.mjs';
const START_TIMEOUT_MS = 180_000;
const STOP_TIMEOUT_MS = 30_000;

/** The launcher's command line, from the studio checkout and one eval's setup. */
export function launcherArguments({ studioRoot, fixture, workspace, skillsRoot, agentFiles = [], providerJobMs }) {
  return [
    path.join(studioRoot, LAUNCHER),
    '--fixture', fixture,
    '--workspace', workspace,
    '--skills-root', skillsRoot,
    ...agentFiles.flatMap((name) => ['--agent-files', name]),
    ...(providerJobMs === undefined ? [] : ['--provider-job-ms', String(providerJobMs)]),
  ];
}

/** Starts the launcher and waits for its addresses; its stderr goes to `logFile`. */
export async function startCloudLauncher(setup, logFile) {
  const script = path.join(setup.studioRoot, LAUNCHER);
  if (!existsSync(script)) {
    throw new Error(`SKILLS_CLOUD_EVAL020 ${script} does not exist; pass --studio <studio checkout>.`);
  }
  const child = spawn(process.execPath, launcherArguments(setup), { cwd: path.dirname(script), stdio: ['ignore', 'pipe', 'pipe'] });
  const log = createWriteStream(logFile);
  child.stderr.pipe(log);
  const exited = new Promise((resolve) => child.once('exit', (code, signal) => resolve({ code, signal })));
  const addresses = await Promise.race([
    firstLine(child.stdout).then((line) => JSON.parse(line)),
    exited.then(({ code }) => Promise.reject(new Error(`SKILLS_CLOUD_EVAL021 the launcher exited with ${code} before it was ready; see ${logFile}.`))),
    delay(START_TIMEOUT_MS).then(() => Promise.reject(new Error(`SKILLS_CLOUD_EVAL022 the launcher was not ready after ${START_TIMEOUT_MS / 1000} s; see ${logFile}.`))),
  ]).catch((error) => {
    child.kill('SIGKILL');
    throw error;
  });
  return {
    addresses,
    records: () => controlJson(addresses.evalControlUrl, '/records'),
    renku: (args) => runRenku(addresses.evalControlUrl, args),
    async stop() {
      child.kill('SIGTERM');
      const stopped = await Promise.race([exited, delay(STOP_TIMEOUT_MS).then(() => null)]);
      if (!stopped) {
        child.kill('SIGKILL');
        await exited;
      }
      log.end();
    },
  };
}

async function firstLine(stream) {
  for await (const line of createInterface({ input: stream })) {
    if (line.trim() !== '') return line;
  }
  throw new Error('SKILLS_CLOUD_EVAL023 the launcher closed its output without its addresses.');
}

async function controlJson(origin, pathname, init) {
  const response = await fetch(`${origin}${pathname}`, init);
  if (!response.ok) {
    throw new Error(`SKILLS_CLOUD_EVAL024 ${pathname} answered ${response.status}: ${await response.text()}`);
  }
  return await response.json();
}

/** A renku command's parsed JSON answer; a failed command fails with renku's own error. */
async function runRenku(origin, args) {
  const result = await controlJson(origin, '/renku', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ args }) });
  if (result.exitCode !== 0) {
    throw new Error(`renku ${args.join(' ')} exited with ${result.exitCode}: ${(result.stderr || result.stdout).trim().slice(0, 600)}`);
  }
  return JSON.parse(result.stdout);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms).unref());
}
