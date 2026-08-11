#!/usr/bin/env node
import {
  PLUGIN_VERSION_MANIFESTS,
  assertCleanMain,
  assertHeadEqualsOriginMain,
  assertTagMissing,
  bumpSemver,
  fetchOriginMain,
  readPluginVersion,
  runCommand,
  writePluginVersion,
} from './release-contract.mjs';

try {
  const bumpType = process.argv.slice(2).find((argument) => argument !== '--') ?? 'patch';
  if (!['patch', 'minor', 'major'].includes(bumpType)) {
    throw new Error(`SKILLS_RELEASE017 Use patch, minor, or major; received ${bumpType}.`);
  }
  assertCleanMain();
  fetchOriginMain();
  assertHeadEqualsOriginMain();
  const nextVersion = bumpSemver(readPluginVersion(), bumpType);
  const tag = `v${nextVersion}`;
  assertTagMissing(tag);
  writePluginVersion(nextVersion);
  runCommand('node', ['--test', 'scripts/release/release-contract.test.mjs']);
  runCommand('git', ['add', ...PLUGIN_VERSION_MANIFESTS]);
  runCommand('git', ['commit', '-m', `release: ${tag}`]);
  runCommand('git', ['tag', '-a', tag, '-m', `release: ${tag}`]);
  process.stdout.write(`Prepared Studio Skills ${tag}.\n`);
  process.stdout.write(`Next: pnpm release:publish -- --tag ${tag}\n`);
} catch (error) {
  process.stderr.write(`[release:prepare] ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
