import assert from 'node:assert/strict';
import { test } from 'node:test';
import { installedRenkuPlugin, switchCommands, switchProblems } from './codex-plugin-variants.mjs';

const local = { pluginId: 'renku@renku-local', name: 'renku', enabled: true, source: { path: '/repo' } };
const cloud = { pluginId: 'renku-cloud@renku-cloud', name: 'renku-cloud', enabled: true, source: { path: '/repo/dist/renku-cloud-marketplace/renku-cloud' } };
const released = { pluginId: 'renku@renku', name: 'renku', enabled: true, source: { path: '/cache/renku' } };
const unrelated = { pluginId: 'github@openai-curated', name: 'github', enabled: true, source: { path: '/cache/github' } };

test('switching to the cloud plugin removes the local one, then copies the cloud one', () => {
  assert.deepEqual(switchCommands([unrelated, local], 'cloud'), [
    ['plugin', 'remove', 'renku@renku-local'],
    ['plugin', 'add', 'renku-cloud@renku-cloud'],
  ]);
});

test('refreshing the installed plugin only copies it again', () => {
  assert.deepEqual(switchCommands([local], 'local'), [['plugin', 'add', 'renku@renku-local']]);
  assert.deepEqual(switchCommands([], 'local'), [['plugin', 'add', 'renku@renku-local']]);
});

test('a released Renku plugin stops the switch', () => {
  assert.throws(() => switchCommands([released], 'local'), /SKILLS_CODEX_PLUGIN001 renku@renku/);
});

test('the installed Renku plugin is local, cloud or none, never both', () => {
  assert.equal(installedRenkuPlugin([unrelated, local]), 'local');
  assert.equal(installedRenkuPlugin([cloud]), 'cloud');
  assert.equal(installedRenkuPlugin([unrelated]), null);
  assert.throws(() => installedRenkuPlugin([local, cloud]), /SKILLS_CODEX_PLUGIN002/);
});

test('a switch is complete when only the chosen plugin is installed, on, from its source', () => {
  assert.deepEqual(switchProblems([unrelated, cloud], 'cloud', cloud.source.path), []);
  assert.deepEqual(switchProblems([{ ...local, enabled: false }, cloud], 'local', '/elsewhere'), [
    'renku@renku-local is turned off.',
    'renku@renku-local is copied from /repo, not /elsewhere.',
    'renku-cloud@renku-cloud is still installed.',
  ]);
  assert.deepEqual(switchProblems([], 'local', '/repo'), ['renku@renku-local is not installed.']);
});
