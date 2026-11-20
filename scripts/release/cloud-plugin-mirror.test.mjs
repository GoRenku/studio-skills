import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  assertCloudPluginMirrorReachable,
  deployKeyPathFromEnvironment,
  publishCloudPluginMirror,
} from './cloud-plugin-mirror.mjs';
import { githubSignedInName, mirrorCommitMessage, mirrorPushRefspecs, mirrorReadme } from './cloud-plugin-mirror-files.mjs';

const SOURCE_COMMIT = 'c'.repeat(40);
const IDENTITY = { name: 'Release Test', email: 'release@example.invalid' };

function git(cwd, args) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8', env: { ...process.env, GIT_AUTHOR_NAME: IDENTITY.name, GIT_AUTHOR_EMAIL: IDENTITY.email, GIT_COMMITTER_NAME: IDENTITY.name, GIT_COMMITTER_EMAIL: IDENTITY.email } });
  assert.equal(result.status, 0, `git ${args.join(' ')}: ${result.stderr}`);
  return result.stdout.trim();
}

/** A bare repository standing in for GoRenku/renku-cloud-plugin, a built marketplace and a key file. */
function setup() {
  const root = mkdtempSync(path.join(os.tmpdir(), 'cloud-plugin-mirror-test-'));
  const remote = path.join(root, 'remote.git');
  git(root, ['init', '--quiet', '--bare', '--initial-branch=main', remote]);
  const deployKeyPath = path.join(root, 'deploy-key');
  writeFileSync(deployKeyPath, 'not a real key\n');
  return { root, remote, deployKeyPath, cleanup: () => rmSync(root, { recursive: true, force: true }) };
}

function builtMarketplace(root, name, files) {
  const folder = path.join(root, name);
  for (const [relativePath, contents] of Object.entries(files)) {
    mkdirSync(path.dirname(path.join(folder, relativePath)), { recursive: true });
    writeFileSync(path.join(folder, relativePath), contents);
  }
  return folder;
}

const RELEASE_FILES = {
  '.claude-plugin/marketplace.json': '{"name":"renku-cloud"}\n',
  '.agents/plugins/marketplace.json': '{"name":"renku-cloud"}\n',
  'renku-cloud/.claude-plugin/plugin.json': '{"name":"renku-cloud"}\n',
  'renku-cloud/skills/movie-director/SKILL.md': '# Movie director\n',
  'renku-cloud/skills/old-skill/SKILL.md': '# Old skill\n',
};

function mirrorFiles(remote, root) {
  const clone = path.join(root, `inspect-${Date.now()}-${Math.random().toString(16).slice(2)}`);
  git(root, ['clone', '--quiet', remote, clone]);
  return { clone, files: git(clone, ['ls-files']).split('\n').filter(Boolean).sort() };
}

test('the first publish leaves exactly the build, the README and the LICENSE in one tagged commit', () => {
  const { root, remote, deployKeyPath, cleanup } = setup();
  try {
    const result = publishCloudPluginMirror({ tag: 'v0.2.0', sourceCommit: SOURCE_COMMIT, builtMarketplace: builtMarketplace(root, 'build', RELEASE_FILES), remote, deployKeyPath, identity: IDENTITY });
    assert.equal(result.status, 'published');
    const { clone, files } = mirrorFiles(remote, root);
    assert.deepEqual(files, ['.agents/plugins/marketplace.json', '.claude-plugin/marketplace.json', 'LICENSE', 'README.md', 'renku-cloud/.claude-plugin/plugin.json', 'renku-cloud/skills/movie-director/SKILL.md', 'renku-cloud/skills/old-skill/SKILL.md']);
    assert.equal(git(clone, ['rev-list', '--count', 'HEAD']), '1');
    assert.equal(git(clone, ['rev-parse', 'HEAD']), result.commit);
    assert.equal(git(clone, ['cat-file', '-t', 'refs/tags/v0.2.0']), 'tag');
    assert.equal(git(clone, ['log', '-1', '--format=%B']), mirrorCommitMessage({ version: '0.2.0', sourceCommit: SOURCE_COMMIT }).trim());
  } finally {
    cleanup();
  }
});

test('publishing the same release again changes nothing', () => {
  const { root, remote, deployKeyPath, cleanup } = setup();
  try {
    const build = builtMarketplace(root, 'build', RELEASE_FILES);
    const first = publishCloudPluginMirror({ tag: 'v0.2.0', sourceCommit: SOURCE_COMMIT, builtMarketplace: build, remote, deployKeyPath, identity: IDENTITY });
    const again = publishCloudPluginMirror({ tag: 'v0.2.0', sourceCommit: SOURCE_COMMIT, builtMarketplace: build, remote, deployKeyPath, identity: IDENTITY });
    assert.deepEqual(again, { status: 'already-published', commit: first.commit });
    assert.equal(git(mirrorFiles(remote, root).clone, ['rev-list', '--count', 'HEAD']), '1');
  } finally {
    cleanup();
  }
});

test('the same tag with different files is refused before any push', () => {
  const { root, remote, deployKeyPath, cleanup } = setup();
  try {
    const first = publishCloudPluginMirror({ tag: 'v0.2.0', sourceCommit: SOURCE_COMMIT, builtMarketplace: builtMarketplace(root, 'build', RELEASE_FILES), remote, deployKeyPath, identity: IDENTITY });
    const changed = builtMarketplace(root, 'changed', { ...RELEASE_FILES, 'renku-cloud/skills/movie-director/SKILL.md': '# Changed\n' });
    assert.throws(() => publishCloudPluginMirror({ tag: 'v0.2.0', sourceCommit: SOURCE_COMMIT, builtMarketplace: changed, remote, deployKeyPath, identity: IDENTITY }), /SKILLS_RELEASE022/);
    assert.equal(git(root, ['--git-dir', remote, 'rev-parse', 'refs/heads/main']), first.commit);
  } finally {
    cleanup();
  }
});

test('the next release replaces every file, removes the ones the build dropped, and keeps history', () => {
  const { root, remote, deployKeyPath, cleanup } = setup();
  try {
    publishCloudPluginMirror({ tag: 'v0.2.0', sourceCommit: SOURCE_COMMIT, builtMarketplace: builtMarketplace(root, 'build', RELEASE_FILES), remote, deployKeyPath, identity: IDENTITY });
    const { 'renku-cloud/skills/old-skill/SKILL.md': removed, ...remaining } = RELEASE_FILES;
    assert.ok(removed);
    const next = builtMarketplace(root, 'next', { ...remaining, 'renku-cloud/skills/new-skill/SKILL.md': '# New skill\n' });
    const result = publishCloudPluginMirror({ tag: 'v0.3.0', sourceCommit: 'd'.repeat(40), builtMarketplace: next, remote, deployKeyPath, identity: IDENTITY });
    assert.equal(result.status, 'published');
    const { clone, files } = mirrorFiles(remote, root);
    assert.ok(files.includes('renku-cloud/skills/new-skill/SKILL.md'));
    assert.ok(!files.includes('renku-cloud/skills/old-skill/SKILL.md'));
    assert.equal(git(clone, ['rev-list', '--count', 'HEAD']), '2');
    assert.deepEqual(git(clone, ['tag', '--list']).split('\n').sort(), ['v0.2.0', 'v0.3.0']);
  } finally {
    cleanup();
  }
});

test('a mirror changed outside the release is refused', () => {
  const { root, remote, deployKeyPath, cleanup } = setup();
  try {
    publishCloudPluginMirror({ tag: 'v0.2.0', sourceCommit: SOURCE_COMMIT, builtMarketplace: builtMarketplace(root, 'build', RELEASE_FILES), remote, deployKeyPath, identity: IDENTITY });
    const { clone } = mirrorFiles(remote, root);
    writeFileSync(path.join(clone, 'README.md'), 'Edited by hand\n');
    git(clone, ['commit', '--quiet', '--all', '--message', 'hand edit']);
    git(clone, ['push', '--quiet', 'origin', 'HEAD:refs/heads/main']);
    assert.throws(() => publishCloudPluginMirror({ tag: 'v0.3.0', sourceCommit: 'd'.repeat(40), builtMarketplace: builtMarketplace(root, 'next', RELEASE_FILES), remote, deployKeyPath, identity: IDENTITY }), /SKILLS_RELEASE023/);
  } finally {
    cleanup();
  }
});

test('the deploy key setting must name an existing file; ~/ is the home folder', () => {
  const { root, cleanup } = setup();
  try {
    assert.throws(() => deployKeyPathFromEnvironment({}), /SKILLS_RELEASE020.*studio-skills\/\.env/);
    assert.throws(() => deployKeyPathFromEnvironment({ RENKU_CLOUD_PLUGIN_DEPLOY_KEY: path.join(root, 'missing') }), /SKILLS_RELEASE020/);
    writeFileSync(path.join(root, 'key'), 'not a real key\n');
    assert.equal(deployKeyPathFromEnvironment({ RENKU_CLOUD_PLUGIN_DEPLOY_KEY: '~/key' }, root), path.join(root, 'key'));
  } finally {
    cleanup();
  }
});

test('an unreachable mirror is refused before anything is pushed', () => {
  const { root, deployKeyPath, cleanup } = setup();
  try {
    assert.throws(() => assertCloudPluginMirrorReachable({ remote: path.join(root, 'no-such-repository.git'), deployKeyPath }), /SKILLS_RELEASE021/);
  } finally {
    cleanup();
  }
});

test('GitHub\'s SSH answer tells a deploy key from a person', () => {
  assert.equal(githubSignedInName("Hi GoRenku/renku-cloud-plugin! You've successfully authenticated, but GitHub does not provide shell access."), 'GoRenku/renku-cloud-plugin');
  assert.equal(githubSignedInName("Hi keremk! You've successfully authenticated, but GitHub does not provide shell access."), 'keremk');
  assert.equal(githubSignedInName('git@github.com: Permission denied (publickey).'), null);
});

test('mirror pushes never force, and the README names its source', () => {
  for (const refspec of mirrorPushRefspecs('v0.2.0')) assert.doesNotMatch(refspec, /^\+/);
  assert.throws(() => mirrorPushRefspecs('0.2.0'), /SKILLS_RELEASE003/);
  const readme = mirrorReadme({ version: '0.2.0', sourceCommit: SOURCE_COMMIT });
  assert.match(readme, /Generated\. Do not edit\./);
  assert.match(readme, new RegExp(`GoRenku/studio-skills[\\s\\S]*${SOURCE_COMMIT}`));
});

test('the README says how each app gets a new version', () => {
  const update = mirrorReadme({ version: '0.2.0', sourceCommit: SOURCE_COMMIT }).split('## Update')[1];
  assert.ok(update, 'the README has an Update section');
  assert.match(update, /Check for updates/);
  assert.match(update, /your agent tells you when a newer\nversion is out/);
  assert.match(update, /codex plugin marketplace upgrade renku-cloud/);
  assert.match(update, /claude plugin marketplace update renku-cloud\nclaude plugin update renku-cloud@renku-cloud/);
});
