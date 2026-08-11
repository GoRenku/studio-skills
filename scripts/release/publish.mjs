#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import {
  assertCleanMain,
  assertOriginMainIsAncestor,
  assertReleaseTagAtHead,
  betaPushRefspec,
  fetchOriginMain,
  githubReleaseCreateArgs,
  runCommand,
} from './release-contract.mjs';

function readTag(args) {
  const index = args.indexOf('--tag');
  const tag = index >= 0 ? args[index + 1] : undefined;
  if (!tag) {
    throw new Error('SKILLS_RELEASE018 Usage: publish.mjs --tag vX.Y.Z [--dry-run]');
  }
  return tag;
}

function viewRelease(tag) {
  const result = spawnSync(
    'gh',
    ['release', 'view', tag, '--json', 'tagName,url'],
    { encoding: 'utf8' }
  );
  return result.status === 0 ? JSON.parse(result.stdout) : null;
}

try {
  const args = process.argv.slice(2);
  const tag = readTag(args);
  const dryRun = args.includes('--dry-run');
  assertCleanMain();
  fetchOriginMain();
  assertOriginMainIsAncestor();
  const { commit } = assertReleaseTagAtHead(tag);
  if (dryRun) {
    process.stdout.write(`Studio Skills publish validation passed for ${tag}; no refs changed.\n`);
  } else {
    runCommand('git', ['push', 'origin', 'main']);
    runCommand('git', ['push', 'origin', tag]);
    if (!viewRelease(tag)) {
      runCommand('gh', githubReleaseCreateArgs(tag));
    }
    const release = viewRelease(tag);
    if (!release || release.tagName !== tag) {
      throw new Error(`SKILLS_RELEASE019 GitHub Release publication failed for ${tag}.`);
    }
    runCommand('git', ['push', 'origin', betaPushRefspec(commit)]);
    process.stdout.write(`Published Studio Skills ${tag}: ${release.url}\n`);
    process.stdout.write('The beta marketplace channel now points to this released commit.\n');
  }
} catch (error) {
  process.stderr.write(`[release:publish] ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
