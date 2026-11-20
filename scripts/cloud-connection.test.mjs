import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { PLUGIN_VERSION_HEADER, cloudConnection } from './cloud-connection.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = JSON.parse(readFileSync(path.join(root, 'cloud.mcp.json'), 'utf8'));

test('the built connection sends the plugin version to Codex and to Claude Code', () => {
  assert.deepEqual(cloudConnection(source, '0.5.0'), {
    mcpServers: {
      renku: {
        type: 'http',
        url: 'https://app.gorenku.com/mcp',
        http_headers: { 'Renku-Plugin-Version': '0.5.0' },
        headersHelper: `echo '{"Renku-Plugin-Version":"0.5.0"}'`,
      },
    },
  });
});

test('the header command prints the same JSON object Codex sends', () => {
  const { renku } = cloudConnection(source, '1.12.3').mcpServers;
  const printed = /^echo '(.*)'$/.exec(renku.headersHelper)?.[1];
  assert.deepEqual(JSON.parse(printed), renku.http_headers);
  assert.equal(renku.http_headers[PLUGIN_VERSION_HEADER], '1.12.3');
});

test('the address stays the source file\'s, whatever the version', () => {
  for (const version of ['0.5.0', '0.5.1', '2.0.0']) {
    assert.equal(cloudConnection(source, version).mcpServers.renku.url, source.mcpServers.renku.url);
  }
});

test('a version that is not strict X.Y.Z is refused', () => {
  for (const version of ['0.5', 'v0.5.0', "0.5.0'; rm -rf /", '0.5.0-beta']) {
    assert.throws(() => cloudConnection(source, version), /SKILLS_RELEASE001/);
  }
});

test('a source without an http renku server is refused', () => {
  assert.throws(() => cloudConnection({ mcpServers: {} }, '0.5.0'), /SKILLS_CLOUD_PLUGIN001/);
  assert.throws(() => cloudConnection({ mcpServers: { renku: { type: 'stdio', command: 'renku' } } }, '0.5.0'), /SKILLS_CLOUD_PLUGIN001/);
});
