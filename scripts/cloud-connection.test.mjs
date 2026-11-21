import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  CLAUDE_CONNECTION_FILE,
  CODEX_CONNECTION_FILE,
  PLUGIN_VERSION_FILE,
  PLUGIN_VERSION_HEADER,
  cloudConnectionFiles,
} from './cloud-connection.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = JSON.parse(readFileSync(path.join(root, 'cloud.mcp.json'), 'utf8'));

test('the built connections send the plugin version to Codex and to Claude Code', () => {
  assert.deepEqual(cloudConnectionFiles(source, '0.5.1'), {
    'claude.mcp.json': {
      mcpServers: { renku: { type: 'http', url: 'https://app.gorenku.com/mcp', headersHelper: 'cat renku-plugin-version.json' } },
    },
    'codex.mcp.json': {
      mcpServers: { renku: { type: 'http', url: 'https://app.gorenku.com/mcp', http_headers: { 'Renku-Plugin-Version': '0.5.1' } } },
    },
    'renku-plugin-version.json': { 'Renku-Plugin-Version': '0.5.1' },
  });
});

test('Claude Code\'s connection is the same in every release; only the version file changes', () => {
  const first = cloudConnectionFiles(source, '0.5.1');
  const next = cloudConnectionFiles(source, '0.6.0');
  assert.deepEqual(next[CLAUDE_CONNECTION_FILE], first[CLAUDE_CONNECTION_FILE]);
  assert.notDeepEqual(next[PLUGIN_VERSION_FILE], first[PLUGIN_VERSION_FILE]);
  assert.equal(next[CLAUDE_CONNECTION_FILE].mcpServers.renku.headersHelper, `cat ${PLUGIN_VERSION_FILE}`);
});

test('the version file is the JSON object Codex sends', () => {
  const files = cloudConnectionFiles(source, '1.12.3');
  assert.deepEqual(files[PLUGIN_VERSION_FILE], files[CODEX_CONNECTION_FILE].mcpServers.renku.http_headers);
  assert.equal(files[PLUGIN_VERSION_FILE][PLUGIN_VERSION_HEADER], '1.12.3');
});

test('the address stays the source file\'s, whatever the version', () => {
  for (const version of ['0.5.1', '0.6.0', '2.0.0']) {
    const files = cloudConnectionFiles(source, version);
    for (const name of [CLAUDE_CONNECTION_FILE, CODEX_CONNECTION_FILE]) {
      assert.equal(files[name].mcpServers.renku.url, source.mcpServers.renku.url);
    }
  }
});

test('a version that is not strict X.Y.Z is refused', () => {
  for (const version of ['0.5', 'v0.5.0', "0.5.0'; rm -rf /", '0.5.0-beta']) {
    assert.throws(() => cloudConnectionFiles(source, version), /SKILLS_RELEASE001/);
  }
});

test('a source without an http renku server is refused', () => {
  assert.throws(() => cloudConnectionFiles({ mcpServers: {} }, '0.5.0'), /SKILLS_CLOUD_PLUGIN001/);
  assert.throws(() => cloudConnectionFiles({ mcpServers: { renku: { type: 'stdio', command: 'renku' } } }, '0.5.0'), /SKILLS_CLOUD_PLUGIN001/);
});
