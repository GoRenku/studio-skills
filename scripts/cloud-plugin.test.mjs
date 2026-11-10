import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => JSON.parse(readFileSync(path.join(root, file), 'utf8'));

test('the Renku Cloud plugin is the Renku plugin with the cloud MCP address', () => {
  for (const [local, cloud] of [['.codex-plugin/plugin.json', '.codex-plugin-cloud/plugin.json'], ['.claude-plugin/plugin.json', '.claude-plugin-cloud/plugin.json']]) {
    const localManifest = read(local);
    const cloudManifest = read(cloud);
    assert.equal(cloudManifest.name, 'renku-cloud');
    assert.equal(cloudManifest.version, localManifest.version, `${cloud} must share the release version`);
    assert.equal(cloudManifest.mcpServers, './cloud.mcp.json');
    if (localManifest.skills) assert.equal(cloudManifest.skills, localManifest.skills);
  }
  assert.deepEqual(read('cloud.mcp.json'), { mcpServers: { renku: { type: 'http', url: 'https://app.gorenku.com/mcp' } } });
});

test('every skill carries the Renku Cloud note', async () => {
  const { readdirSync } = await import('node:fs');
  for (const skill of readdirSync(path.join(root, 'skills'), { withFileTypes: true }).filter((entry) => entry.isDirectory())) {
    const text = readFileSync(path.join(root, 'skills', skill.name, 'SKILL.md'), 'utf8');
    assert.match(text, /## Renku Cloud\n/, `${skill.name} has no Renku Cloud note`);
  }
});
