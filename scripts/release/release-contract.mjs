import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..'
);

export const PLUGIN_VERSION_MANIFESTS = Object.freeze([
  '.codex-plugin/plugin.json',
  '.claude-plugin/plugin.json',
  '.codex-plugin-cloud/plugin.json',
  '.claude-plugin-cloud/plugin.json',
]);

/**
 * The oldest Renku Cloud plugin release that still works with Renku Cloud, or
 * null. Only `pnpm release:<bump> -- --required` writes it; Renku Cloud reads
 * it from the skills it is deployed with.
 */
export const REQUIRED_RELEASE_FILE = 'cloud-plugin-required-release.json';

const BUMP_TYPES = Object.freeze(['patch', 'minor', 'major']);
const RELEASE_OPTIONS = Object.freeze(['--dry-run', '--required']);

export function parseSemver(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);
  if (!match) {
    throw new Error(`SKILLS_RELEASE001 Version must be strict SemVer X.Y.Z: ${version}`);
  }
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
}

export function bumpSemver(version, bumpType) {
  const current = parseSemver(version);
  if (bumpType === 'major') {
    return `${current.major + 1}.0.0`;
  }
  if (bumpType === 'minor') {
    return `${current.major}.${current.minor + 1}.0`;
  }
  if (bumpType === 'patch') {
    return `${current.major}.${current.minor}.${current.patch + 1}`;
  }
  throw new Error(`SKILLS_RELEASE002 Unsupported version bump: ${bumpType}`);
}

/** Negative, zero or positive as `left` is older than, equal to or newer than `right`. */
export function compareSemver(left, right) {
  const a = parseSemver(left);
  const b = parseSemver(right);
  return a.major - b.major || a.minor - b.minor || a.patch - b.patch;
}

/**
 * The release command's arguments: the bump type is the one word that is not
 * an option, so `--required` is never read as the bump.
 */
export function parseReleaseArguments(args, allowedOptions = RELEASE_OPTIONS) {
  const words = args.filter((argument) => argument !== '--');
  const options = words.filter((word) => word.startsWith('--'));
  const unknown = options.filter((option) => !allowedOptions.includes(option));
  if (unknown.length > 0) {
    throw new Error(`SKILLS_RELEASE025 Unknown release option ${unknown.join(', ')}. Use ${allowedOptions.join(' or ')}.`);
  }
  const bumpTypes = words.filter((word) => !word.startsWith('--'));
  const bumpType = bumpTypes[0] ?? 'patch';
  if (bumpTypes.length > 1 || !BUMP_TYPES.includes(bumpType)) {
    throw new Error(`SKILLS_RELEASE017 Use patch, minor, or major; received ${bumpTypes.join(' ')}.`);
  }
  return { bumpType, dryRun: options.includes('--dry-run'), required: options.includes('--required') };
}

export function parseReleaseTag(tag) {
  const match = /^v(\d+\.\d+\.\d+)$/.exec(tag);
  if (!match) {
    throw new Error(`SKILLS_RELEASE003 Release tag must match vX.Y.Z: ${tag}`);
  }
  parseSemver(match[1]);
  return match[1];
}

/**
 * The required release tag, or null. Refuses a value that is not null or a
 * strict vX.Y.Z tag, and a tag newer than the plugin manifests.
 */
export function readRequiredRelease(root = repositoryRoot) {
  const filePath = path.join(root, REQUIRED_RELEASE_FILE);
  if (!existsSync(filePath)) {
    throw new Error(`SKILLS_RELEASE026 ${REQUIRED_RELEASE_FILE} is missing; it holds { "requiredRelease": null } until a release is cut with --required.`);
  }
  const { requiredRelease } = readJson(filePath);
  if (requiredRelease === null) {
    return null;
  }
  if (typeof requiredRelease !== 'string') {
    throw new Error(`SKILLS_RELEASE026 ${REQUIRED_RELEASE_FILE} must hold { "requiredRelease": "vX.Y.Z" } or null.`);
  }
  if (compareSemver(parseReleaseTag(requiredRelease), readPluginVersion(root)) > 0) {
    throw new Error(`SKILLS_RELEASE027 ${REQUIRED_RELEASE_FILE} names ${requiredRelease}, newer than the plugin manifests.`);
  }
  return requiredRelease;
}

export function writeRequiredRelease(tag, root = repositoryRoot) {
  parseReleaseTag(tag);
  writeFileSync(path.join(root, REQUIRED_RELEASE_FILE), `${JSON.stringify({ requiredRelease: tag }, null, 2)}\n`);
}

export function readPluginVersion(root = repositoryRoot) {
  const manifests = PLUGIN_VERSION_MANIFESTS.map((relativePath) => ({
    relativePath,
    manifest: readJson(path.join(root, relativePath)),
  }));
  for (const { relativePath, manifest } of manifests) {
    if (typeof manifest.version !== 'string') {
      throw new Error(`SKILLS_RELEASE004 Missing version in ${relativePath}.`);
    }
    parseSemver(manifest.version);
  }
  const version = manifests[0].manifest.version;
  if (manifests.some(({ manifest }) => manifest.version !== version)) {
    throw new Error('SKILLS_RELEASE005 Codex and Claude plugin manifest versions must match.');
  }
  return version;
}

export function writePluginVersion(version, root = repositoryRoot) {
  parseSemver(version);
  for (const relativePath of PLUGIN_VERSION_MANIFESTS) {
    const manifestPath = path.join(root, relativePath);
    const manifest = readJson(manifestPath);
    manifest.version = version;
    writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  }
}

export function runCommand(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? repositoryRoot,
    encoding: 'utf8',
    stdio: options.stdio ?? 'inherit',
    env: { ...process.env, ...options.env },
  });
  if (!options.allowFailure && result.status !== 0) {
    const details = [result.stdout, result.stderr].filter(Boolean).join('\n').trim();
    throw new Error(
      `SKILLS_RELEASE006 Command failed (${command} ${args.join(' ')})${details ? `:\n${details}` : '.'}`
    );
  }
  return result;
}

export function commandOutput(command, args, options = {}) {
  return (runCommand(command, args, { ...options, stdio: 'pipe' }).stdout ?? '').trim();
}

export function assertCleanMain(root = repositoryRoot) {
  const branch = commandOutput('git', ['branch', '--show-current'], { cwd: root });
  if (branch !== 'main') {
    throw new Error(`SKILLS_RELEASE007 Releases must run from main; current branch is ${branch || '(detached)'}.`);
  }
  if (commandOutput('git', ['status', '--porcelain'], { cwd: root })) {
    throw new Error('SKILLS_RELEASE008 The working tree must be clean before a release.');
  }
}

export function fetchOriginMain(root = repositoryRoot) {
  runCommand('git', ['fetch', '--quiet', 'origin', 'main'], { cwd: root });
}

export function assertHeadEqualsOriginMain(root = repositoryRoot) {
  const head = commandOutput('git', ['rev-parse', 'HEAD'], { cwd: root });
  const originMain = commandOutput('git', ['rev-parse', 'refs/remotes/origin/main'], { cwd: root });
  if (head !== originMain) {
    throw new Error('SKILLS_RELEASE009 Local main must exactly match origin/main before prepare.');
  }
}

export function assertOriginMainIsAncestor(root = repositoryRoot) {
  const result = runCommand(
    'git',
    ['merge-base', '--is-ancestor', 'refs/remotes/origin/main', 'HEAD'],
    { cwd: root, stdio: 'pipe', allowFailure: true }
  );
  if (result.status !== 0) {
    throw new Error('SKILLS_RELEASE010 Local main has diverged from origin/main.');
  }
}

export function assertTagMissing(tag, root = repositoryRoot) {
  parseReleaseTag(tag);
  const local = runCommand('git', ['rev-parse', '--verify', `refs/tags/${tag}`], {
    cwd: root,
    stdio: 'pipe',
    allowFailure: true,
  });
  if (local.status === 0) {
    throw new Error(`SKILLS_RELEASE011 Tag already exists locally: ${tag}`);
  }
  const remote = runCommand('git', ['ls-remote', '--tags', 'origin', `refs/tags/${tag}`], {
    cwd: root,
    stdio: 'pipe',
    allowFailure: true,
  });
  if (remote.status !== 0) {
    throw new Error(`SKILLS_RELEASE012 Could not inspect origin for tag ${tag}.`);
  }
  if ((remote.stdout ?? '').trim()) {
    throw new Error(`SKILLS_RELEASE011 Tag already exists on origin: ${tag}`);
  }
}

export function assertReleaseTagAtHead(tag, root = repositoryRoot) {
  const version = parseReleaseTag(tag);
  if (readPluginVersion(root) !== version) {
    throw new Error(`SKILLS_RELEASE013 Tag ${tag} does not match the plugin manifests.`);
  }
  if (commandOutput('git', ['cat-file', '-t', `refs/tags/${tag}`], { cwd: root }) !== 'tag') {
    throw new Error(`SKILLS_RELEASE014 Release tags must be annotated: ${tag}`);
  }
  const commit = commandOutput('git', ['rev-list', '-n', '1', tag], { cwd: root });
  if (commit !== commandOutput('git', ['rev-parse', 'HEAD'], { cwd: root })) {
    throw new Error(`SKILLS_RELEASE015 Tag ${tag} does not point to HEAD.`);
  }
  return { version, commit };
}

export function betaPushRefspec(commit) {
  if (!/^[0-9a-f]{40}$/.test(commit)) {
    throw new Error(`SKILLS_RELEASE016 Invalid release commit: ${commit}`);
  }
  return `${commit}:refs/heads/beta`;
}

export function githubReleaseCreateArgs(tag) {
  parseReleaseTag(tag);
  return [
    'release',
    'create',
    tag,
    '--verify-tag',
    '--generate-notes',
    '--title',
    `Renku Skills ${tag}`,
  ];
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}
