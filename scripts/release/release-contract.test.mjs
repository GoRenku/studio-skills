import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import {
  PLUGIN_VERSION_MANIFESTS,
  assertReleaseTagAtHead,
  betaPushRefspec,
  bumpSemver,
  githubReleaseCreateArgs,
  parseReleaseTag,
  readPluginVersion,
  writePluginVersion,
} from './release-contract.mjs';

test('plugin manifests own one independent strict SemVer version', () => {
  const root = createPluginFixture('0.1.0');
  assert.equal(readPluginVersion(root), '0.1.0');
  assert.equal(bumpSemver('0.1.0', 'patch'), '0.1.1');
  assert.equal(bumpSemver('0.1.0', 'minor'), '0.2.0');
  assert.equal(bumpSemver('0.1.0', 'major'), '1.0.0');
  assert.equal(parseReleaseTag('v0.1.0'), '0.1.0');
});

test('version updates change only version fields in both existing manifests', () => {
  const root = createPluginFixture('0.1.0');
  const before = PLUGIN_VERSION_MANIFESTS.map((relativePath) =>
    JSON.parse(readFileSync(path.join(root, relativePath), 'utf8'))
  );
  writePluginVersion('0.2.0', root);
  const after = PLUGIN_VERSION_MANIFESTS.map((relativePath) =>
    JSON.parse(readFileSync(path.join(root, relativePath), 'utf8'))
  );
  for (let index = 0; index < before.length; index += 1) {
    assert.deepEqual(after[index], { ...before[index], version: '0.2.0' });
  }
});

test('release validation requires an annotated tag at the manifest commit', () => {
  const root = createPluginFixture('0.1.0');
  runGit(root, ['init', '-b', 'main']);
  runGit(root, ['config', 'user.email', 'release-test@gorenku.com']);
  runGit(root, ['config', 'user.name', 'Renku Release Test']);
  runGit(root, ['add', '.']);
  runGit(root, ['commit', '-m', 'release fixture']);
  runGit(root, ['tag', '-a', 'v0.1.0', '-m', 'release: v0.1.0']);
  assert.equal(assertReleaseTagAtHead('v0.1.0', root).version, '0.1.0');
});

test('GitHub Release exists before the non-force beta fast-forward', () => {
  const commit = 'a'.repeat(40);
  assert.deepEqual(githubReleaseCreateArgs('v0.2.0').slice(0, 3), [
    'release',
    'create',
    'v0.2.0',
  ]);
  assert.equal(betaPushRefspec(commit), `${commit}:refs/heads/beta`);
  assert.doesNotMatch(betaPushRefspec(commit), /force/);
});

test('release tooling cannot write or trigger the Studio repository', () => {
  const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', '..');
  for (const name of ['release-contract.mjs', 'prepare.mjs', 'publish.mjs', 'ship.mjs']) {
    const contents = readFileSync(path.join(root, 'scripts/release', name), 'utf8');
    assert.doesNotMatch(contents, /GoRenku\/studio(?:[^-]|$)|\.\.\/studio(?:\/|$)/);
  }
});

function createPluginFixture(version) {
  const root = mkdtempSync(path.join(os.tmpdir(), 'renku-skills-release-'));
  for (const relativePath of PLUGIN_VERSION_MANIFESTS) {
    const destination = path.join(root, relativePath);
    mkdirSync(path.dirname(destination), { recursive: true });
    writeFileSync(
      destination,
      `${JSON.stringify({ name: 'renku', version, untouched: relativePath }, null, 2)}\n`
    );
  }
  return root;
}

function runGit(root, args) {
  const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
}
