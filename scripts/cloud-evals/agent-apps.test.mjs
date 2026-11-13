import assert from 'node:assert/strict';
import { chmod, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { AGENT_APPS, CLAUDE_CODE_SETTINGS, claudeCodeArguments, codexArguments } from './agent-apps.mjs';
import { launcherArguments } from './cloud-launcher.mjs';
import { withRenkuAddress } from './cloud-plugin.mjs';
import { evalPrompt, UNATTENDED_NOTE } from './eval-run.mjs';
import { findProgram } from './local-programs.mjs';

const ADDRESSES = { mcpUrl: 'http://127.0.0.1:5001/mcp', providerMcpUrl: 'http://127.0.0.1:5002/mcp' };

test('Claude Code runs headless with the plugin folder, only the eval\'s MCP servers, and sandboxed Bash', () => {
  const args = claudeCodeArguments({ prompt: 'Do it.', pluginFolder: '/run/plugin', mcpConfigFile: '/run/mcp.json', model: 'sonnet', budgetUsd: 3 });
  assert.deepEqual(args.slice(0, 2), ['-p', 'Do it.']);
  assert.equal(args[args.indexOf('--plugin-dir') + 1], '/run/plugin');
  assert.equal(args[args.indexOf('--add-dir') + 1], '/run/plugin');
  assert.equal(args[args.indexOf('--mcp-config') + 1], '/run/mcp.json');
  assert.ok(args.includes('--strict-mcp-config'));
  assert.equal(args[args.indexOf('--permission-mode') + 1], 'acceptEdits');
  assert.equal(args[args.indexOf('--permission-prompts') + 1], 'none');
  assert.deepEqual(JSON.parse(args[args.indexOf('--settings') + 1]), CLAUDE_CODE_SETTINGS);
  assert.deepEqual(CLAUDE_CODE_SETTINGS.sandbox.network.allowedDomains, ['127.0.0.1', 'localhost']);
  assert.deepEqual(args.slice(args.indexOf('--allowed-tools') + 1, args.indexOf('--allowed-tools') + 3), ['mcp__renku', 'mcp__acme-media']);
  assert.equal(args[args.indexOf('--model') + 1], 'sonnet');
  assert.equal(args[args.indexOf('--max-budget-usd') + 1], '3');
  assert.ok(!args.some((arg) => /dangerously|bypassPermissions/.test(arg)));
});

test('Codex runs exec in its workspace sandbox, without the person\'s config, with both MCP servers by -c', () => {
  const args = codexArguments({ prompt: 'Do it.', workspace: '/run/workspace', ...ADDRESSES });
  assert.deepEqual(args.slice(0, 2), ['exec', '--json']);
  assert.ok(args.includes('--ignore-user-config'));
  assert.equal(args[args.indexOf('--sandbox') + 1], 'workspace-write');
  assert.equal(args[args.indexOf('--cd') + 1], '/run/workspace');
  const overrides = args.filter((_, index) => args[index - 1] === '-c');
  assert.deepEqual(overrides, [
    'sandbox_workspace_write.network_access=true',
    'approval_policy="never"',
    'mcp_servers.renku.url="http://127.0.0.1:5001/mcp"',
    'mcp_servers.acme-media.url="http://127.0.0.1:5002/mcp"',
  ]);
  assert.equal(args.at(-1), 'Do it.');
  assert.ok(!args.includes('--model'));
  assert.ok(!args.some((arg) => /dangerously/.test(arg)));
});

test('preparing an eval writes Claude Code\'s MCP config and gives Codex the plugin\'s skills', async () => {
  const runFolder = await mkdtemp(path.join(os.tmpdir(), 'cloud-eval-apps-'));
  try {
    const pluginFolder = path.join(runFolder, 'plugin');
    await mkdir(path.join(pluginFolder, 'skills', 'media-producer'), { recursive: true });
    await writeFile(path.join(pluginFolder, 'skills', 'media-producer', 'SKILL.md'), '# Media Producer\n');
    const workspace = path.join(runFolder, 'workspace');
    await mkdir(workspace);
    const setup = { runFolder, workspace, pluginFolder, addresses: ADDRESSES, prompt: 'Go.', options: {} };

    const claude = await AGENT_APPS['claude-code'].prepare(setup);
    const codex = await AGENT_APPS.codex.prepare(setup);

    assert.deepEqual(JSON.parse(await readFile(path.join(runFolder, 'claude-mcp.json'), 'utf8')), {
      mcpServers: { renku: { type: 'http', url: ADDRESSES.mcpUrl }, 'acme-media': { type: 'http', url: ADDRESSES.providerMcpUrl } },
    });
    assert.equal(claude.cwd, workspace);
    assert.equal(codex.cwd, workspace);
    assert.equal(await readFile(path.join(workspace, '.agents', 'skills', 'media-producer', 'SKILL.md'), 'utf8'), '# Media Producer\n');
  } finally {
    await rm(runFolder, { recursive: true, force: true });
  }
});

test('the plugin copy points its renku server at the launcher and keeps everything else', () => {
  const config = { mcpServers: { renku: { type: 'http', url: 'https://app.gorenku.com/mcp' }, other: { type: 'stdio' } } };
  assert.deepEqual(withRenkuAddress(config, ADDRESSES.mcpUrl), { mcpServers: { renku: { type: 'http', url: ADDRESSES.mcpUrl }, other: { type: 'stdio' } } });
  assert.throws(() => withRenkuAddress({ mcpServers: { renku: { type: 'stdio' } } }, ADDRESSES.mcpUrl), /SKILLS_CLOUD_EVAL030/);
});

test('the launcher runs with type transforms and the eval\'s fixture, files and job length', () => {
  const args = launcherArguments({ studioRoot: '/studio', fixture: 'small-film-acme', workspace: '/run/workspace', skillsRoot: '/skills', agentFiles: ['harbor-sheets', 'voice-samples'], providerJobMs: 8000 });
  assert.deepEqual(args, [
    '--experimental-transform-types', '--disable-warning=ExperimentalWarning',
    '/studio/packages/sandbox/tests/evals/serve-cloud-for-evals.mjs',
    '--fixture', 'small-film-acme', '--workspace', '/run/workspace', '--skills-root', '/skills',
    '--agent-files', 'harbor-sheets', '--agent-files', 'voice-samples',
    '--provider-job-ms', '8000',
  ]);
  assert.ok(!launcherArguments({ studioRoot: '/studio', fixture: 'small-film', workspace: '/w', skillsRoot: '/s' }).includes('--provider-job-ms'));
});

test('the prompt fills required programs\' paths and ends with the unattended note', () => {
  const prompt = evalPrompt({ request: 'Render with Blender at {blender}.' }, { blender: '/Applications/Blender.app/Contents/MacOS/Blender' });
  assert.equal(prompt, `Render with Blender at /Applications/Blender.app/Contents/MacOS/Blender.\n\n${UNATTENDED_NOTE}`);
});

test('a program is found on PATH or at its known install location', async () => {
  const folder = await mkdtemp(path.join(os.tmpdir(), 'cloud-eval-programs-'));
  try {
    const onPath = path.join(folder, 'ffprobe');
    const app = path.join(folder, 'Blender.app', 'Contents', 'MacOS', 'Blender');
    await mkdir(path.dirname(app), { recursive: true });
    for (const file of [onPath, app]) {
      await writeFile(file, '#!/bin/sh\n');
      await chmod(file, 0o755);
    }
    assert.equal(findProgram('ffprobe', { searchPath: folder, locations: {} }), onPath);
    assert.equal(findProgram('blender', { searchPath: folder, locations: { blender: [app] } }), app);
    assert.equal(findProgram('whisper-cli', { searchPath: folder, locations: {} }), null);
  } finally {
    await rm(folder, { recursive: true, force: true });
  }
});
