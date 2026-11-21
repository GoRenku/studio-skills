import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { CLAUDE_CONNECTION_FILE, CODEX_CONNECTION_FILE } from './cloud-connection.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => JSON.parse(readFileSync(path.join(root, file), 'utf8'));

test('K1: the Renku Cloud plugin is the Renku plugin with the cloud MCP address', () => {
  const manifests = [
    ['.codex-plugin/plugin.json', '.codex-plugin-cloud/plugin.json', `./${CODEX_CONNECTION_FILE}`],
    ['.claude-plugin/plugin.json', '.claude-plugin-cloud/plugin.json', `./${CLAUDE_CONNECTION_FILE}`],
  ];
  for (const [local, cloud, connection] of manifests) {
    const localManifest = read(local);
    const cloudManifest = read(cloud);
    assert.equal(cloudManifest.name, 'renku-cloud');
    assert.equal(cloudManifest.version, localManifest.version, `${cloud} must share the release version`);
    assert.equal(cloudManifest.mcpServers, connection, `${cloud} reads the connection the build writes for its app`);
    if (localManifest.skills) assert.equal(cloudManifest.skills, localManifest.skills);
  }
  assert.deepEqual(read('cloud.mcp.json'), { mcpServers: { renku: { type: 'http', url: 'https://app.gorenku.com/mcp' } } });
});

const skillNames = readdirSync(path.join(root, 'skills'), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

/** Every `## Renku Cloud` and `## Renku Cloud Generation` section of a skill, up to the next `## ` heading. */
function renkuCloudSections(skill) {
  const text = readFileSync(path.join(root, 'skills', skill, 'SKILL.md'), 'utf8');
  return [...text.matchAll(/^## (Renku Cloud(?: Generation)?)\n([\s\S]*?)(?=^## |(?![\s\S]))/gm)]
    .map(([, heading, body]) => ({ heading, body }));
}

test('K3: every skill has its own Renku Cloud section', () => {
  const issues = [];
  const skillsBySection = new Map();
  for (const skill of skillNames) {
    const section = renkuCloudSections(skill).find(({ heading }) => heading === 'Renku Cloud');
    if (!section) {
      issues.push(`${skill} has no Renku Cloud section`);
      continue;
    }
    const sharedWith = skillsBySection.get(section.body);
    if (sharedWith) issues.push(`${skill} has the same Renku Cloud section as ${sharedWith}`);
    else skillsBySection.set(section.body, skill);
  }
  assert.deepEqual(issues, []);
});

test('A3: every Renku Cloud section that shows renku_command arguments shows them in a batch', () => {
  const issues = [];
  for (const skill of skillNames) {
    for (const { heading, body } of renkuCloudSections(skill)) {
      if (/\bargs\b/.test(body) && !/\bbatch\b|"commands"/.test(body)) {
        issues.push(`${skill} "## ${heading}" shows renku_command arguments outside a batch`);
      }
    }
  }
  assert.deepEqual(issues, []);
});

test('F16: no Renku Cloud section names a key check, a refused command, --file - or a laptop path', () => {
  const forbidden = [
    ['credentials status', /credentials status/],
    ['generation execute', /generation execute/],
    ['generation recover', /generation recover/],
    ['--file -', /--file -(?!\w)/],
    ['/Users/', /\/Users\//],
    ['~/', /~\//],
  ];
  const issues = [];
  for (const skill of skillNames) {
    for (const { heading, body } of renkuCloudSections(skill)) {
      for (const [name, pattern] of forbidden) {
        if (pattern.test(body)) issues.push(`${skill} "## ${heading}" names ${name}`);
      }
    }
  }
  assert.deepEqual(issues, []);
});
