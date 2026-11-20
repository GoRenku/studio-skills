#!/usr/bin/env node
// Assembles the installable Renku Cloud plugin, a variant of the Renku plugin
// whose MCP server is Renku Cloud's web address, so nothing is installed on
// the person's computer. Output: dist/renku-cloud-marketplace/ with Codex and
// Claude Code marketplace files and the plugin in renku-cloud/. Committed
// skill files only. The built cloud.mcp.json carries the plugin version (see
// cloud-connection.mjs).
import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cloudConnection } from './cloud-connection.mjs';
import { readPluginVersion } from './release/release-contract.mjs';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(repositoryRoot, 'dist', 'renku-cloud-marketplace');
const plugin = path.join(output, 'renku-cloud');

rmSync(output, { recursive: true, force: true });
mkdirSync(plugin, { recursive: true });

copy('.codex-plugin-cloud/plugin.json', '.codex-plugin/plugin.json');
copy('.claude-plugin-cloud/plugin.json', '.claude-plugin/plugin.json');
writeJson(
  path.join(plugin, 'cloud.mcp.json'),
  cloudConnection(JSON.parse(readFileSync(path.join(repositoryRoot, 'cloud.mcp.json'), 'utf8')), readPluginVersion(repositoryRoot))
);
copy('LICENSE', 'LICENSE');
for (const file of execFileSync('git', ['-C', repositoryRoot, 'ls-files', 'skills'], { encoding: 'utf8' }).split('\n').filter(Boolean)) {
  copy(file, file);
}

writeJson(path.join(output, '.claude-plugin', 'marketplace.json'), {
  name: 'renku-cloud',
  owner: { name: 'Kerem Karatal' },
  plugins: [{ name: 'renku-cloud', source: './renku-cloud', description: 'Renku filmmaking skills connected to Renku Cloud.' }],
});
writeJson(path.join(output, '.agents', 'plugins', 'marketplace.json'), {
  name: 'renku-cloud',
  interface: { displayName: 'Renku Cloud' },
  plugins: [{ name: 'renku-cloud', source: { source: 'local', path: './renku-cloud' }, policy: { installation: 'AVAILABLE', authentication: 'ON_INSTALL' }, category: 'Video / Media' }],
});
process.stdout.write(`${output}\n`);

function copy(from, to) {
  const target = path.join(plugin, to);
  mkdirSync(path.dirname(target), { recursive: true });
  cpSync(path.join(repositoryRoot, from), target);
}

function writeJson(file, value) {
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}
