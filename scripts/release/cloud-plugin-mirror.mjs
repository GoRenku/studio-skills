// Publishes the built Renku Cloud plugin to GoRenku/renku-cloud-plugin, the generated
// repository people add in the Claude and ChatGPT apps. Each release replaces the
// mirror's files with `pnpm build:cloud-plugin` output, commits them once and tags the
// commit. Only the deploy key named by RENKU_CLOUD_PLUGIN_DEPLOY_KEY (studio-skills'
// .env) can push: the mirror's rulesets refuse everything else. Never force-pushes.
import { copyFileSync, cpSync, existsSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  CLOUD_PLUGIN_MIRROR_REPOSITORY,
  mirrorCommitMessage,
  mirrorPushRefspecs,
  mirrorReadme,
  mirrorTagMessage,
} from './cloud-plugin-mirror-files.mjs';
import { commandOutput, parseReleaseTag, repositoryRoot, runCommand } from './release-contract.mjs';

export const CLOUD_PLUGIN_MIRROR_REMOTE = `git@github.com:${CLOUD_PLUGIN_MIRROR_REPOSITORY}.git`;

/** The deploy key's private key file, from RENKU_CLOUD_PLUGIN_DEPLOY_KEY; a leading ~/ is the home folder. */
export function deployKeyPathFromEnvironment(environment = process.env, homeDirectory = os.homedir()) {
  const value = environment.RENKU_CLOUD_PLUGIN_DEPLOY_KEY?.trim();
  if (!value) {
    throw new Error(
      'SKILLS_RELEASE020 RENKU_CLOUD_PLUGIN_DEPLOY_KEY is not set. Add it to studio-skills/.env (see .env.example): the path to the "renku-cloud-plugin release" deploy key.'
    );
  }
  const keyPath = value.startsWith('~/') ? path.join(homeDirectory, value.slice(2)) : path.resolve(repositoryRoot, value);
  if (!existsSync(keyPath)) {
    throw new Error(`SKILLS_RELEASE020 The deploy key ${keyPath}, named by RENKU_CLOUD_PLUGIN_DEPLOY_KEY in studio-skills/.env, does not exist.`);
  }
  return keyPath;
}

/** Fails before anything is pushed when the deploy key cannot reach the mirror. */
export function assertCloudPluginMirrorReachable({ remote = CLOUD_PLUGIN_MIRROR_REMOTE, deployKeyPath }) {
  const result = runCommand('git', ['ls-remote', remote], {
    stdio: 'pipe',
    allowFailure: true,
    env: sshEnvironment(deployKeyPath),
  });
  if (result.status !== 0) {
    throw new Error(`SKILLS_RELEASE021 The deploy key ${deployKeyPath} cannot reach ${remote}: ${(result.stderr ?? '').trim()}`);
  }
}

/**
 * Publishes one release to the mirror. Answers "already-published" when the mirror
 * already holds this tag with the same files, "published" with the new commit otherwise.
 */
export function publishCloudPluginMirror({
  tag,
  sourceCommit,
  builtMarketplace = buildCloudPluginMarketplace(),
  remote = CLOUD_PLUGIN_MIRROR_REMOTE,
  deployKeyPath,
  identity = releaseIdentity(),
}) {
  const version = parseReleaseTag(tag);
  const workFolder = mkdtempSync(path.join(os.tmpdir(), 'renku-cloud-plugin-mirror-'));
  try {
    const git = gitIn(path.join(workFolder, 'mirror'), { ...sshEnvironment(deployKeyPath), ...identityEnvironment(identity) });
    runCommand('git', ['clone', '--quiet', remote, path.join(workFolder, 'mirror')], { stdio: 'pipe', env: sshEnvironment(deployKeyPath) });
    replaceMirrorTree(git.folder, builtMarketplace, { version, sourceCommit });
    git.run(['add', '--all']);
    const tree = git.output(['write-tree']);
    const state = mirrorState(git, tag);
    if (state.tagTree !== null) {
      if (state.tagTree !== tree) {
        throw new Error(`SKILLS_RELEASE022 ${CLOUD_PLUGIN_MIRROR_REPOSITORY} already has ${tag} with different files. Release a new version instead.`);
      }
      return { status: 'already-published', commit: state.tagCommit };
    }
    if (state.main !== state.latestReleaseCommit) {
      throw new Error(
        `SKILLS_RELEASE023 ${CLOUD_PLUGIN_MIRROR_REPOSITORY}'s main (${state.main ?? 'none'}) is not its latest release commit (${state.latestReleaseCommit ?? 'none'}): it was changed outside the release.`
      );
    }
    commitAndTagMirror(git, { tag, version, sourceCommit });
    const commit = git.output(['rev-parse', 'HEAD']);
    git.run(['push', '--atomic', '--quiet', remote, ...mirrorPushRefspecs(tag)]);
    verifyMirrorMain(git, remote, commit);
    return { status: 'published', commit };
  } finally {
    rmSync(workFolder, { recursive: true, force: true });
  }
}

/** Builds the plugin with scripts/build-cloud-plugin.mjs and answers its marketplace folder. */
function buildCloudPluginMarketplace() {
  return commandOutput('node', [path.join(repositoryRoot, 'scripts', 'build-cloud-plugin.mjs')]);
}

/** The releaser's Git name and email, from studio-skills' own Git settings. */
function releaseIdentity() {
  return {
    name: commandOutput('git', ['config', 'user.name']),
    email: commandOutput('git', ['config', 'user.email']),
  };
}

/** Every file except .git becomes the build, the generated README and the LICENSE. */
function replaceMirrorTree(folder, builtMarketplace, { version, sourceCommit }) {
  for (const entry of readdirSync(folder)) {
    if (entry !== '.git') rmSync(path.join(folder, entry), { recursive: true, force: true });
  }
  cpSync(builtMarketplace, folder, { recursive: true });
  writeFileSync(path.join(folder, 'README.md'), mirrorReadme({ version, sourceCommit }));
  copyFileSync(path.join(repositoryRoot, 'LICENSE'), path.join(folder, 'LICENSE'));
}

/** The tag's commit and tree if the mirror has it, its main, and its latest release tag's commit. */
function mirrorState(git, tag) {
  const tagCommit = git.optional(['rev-parse', '--verify', '--quiet', `refs/tags/${tag}^{commit}`]);
  const latestTag = git.output(['tag', '--list', 'v*', '--sort=-v:refname']).split('\n').find(Boolean) ?? null;
  return {
    tagCommit,
    tagTree: tagCommit === null ? null : git.output(['rev-parse', `${tagCommit}^{tree}`]),
    main: git.optional(['rev-parse', '--verify', '--quiet', 'refs/remotes/origin/main']),
    latestReleaseCommit: latestTag === null ? null : git.output(['rev-parse', `refs/tags/${latestTag}^{commit}`]),
  };
}

function commitAndTagMirror(git, { tag, version, sourceCommit }) {
  git.run(['commit', '--quiet', '--message', mirrorCommitMessage({ version, sourceCommit })]);
  git.run(['tag', '--annotate', tag, '--message', mirrorTagMessage(version)]);
}

function verifyMirrorMain(git, remote, commit) {
  const line = git.output(['ls-remote', remote, 'refs/heads/main']);
  if (line.split(/\s+/)[0] !== commit) {
    throw new Error(`SKILLS_RELEASE024 After the push, ${CLOUD_PLUGIN_MIRROR_REPOSITORY}'s main is not ${commit}.`);
  }
}

function sshEnvironment(deployKeyPath) {
  return { GIT_SSH_COMMAND: `ssh -i "${deployKeyPath}" -o IdentitiesOnly=yes` };
}

function identityEnvironment({ name, email }) {
  return { GIT_AUTHOR_NAME: name, GIT_AUTHOR_EMAIL: email, GIT_COMMITTER_NAME: name, GIT_COMMITTER_EMAIL: email };
}

/** Git commands in the mirror clone, with the deploy key and the release identity. */
function gitIn(folder, env) {
  return {
    folder,
    run: (args) => runCommand('git', args, { cwd: folder, stdio: 'pipe', env }),
    output: (args) => commandOutput('git', args, { cwd: folder, env }),
    optional: (args) => {
      const result = runCommand('git', args, { cwd: folder, stdio: 'pipe', env, allowFailure: true });
      return result.status === 0 ? (result.stdout ?? '').trim() : null;
    },
  };
}
