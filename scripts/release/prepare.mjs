#!/usr/bin/env node
import {
  PLUGIN_VERSION_MANIFESTS,
  REQUIRED_RELEASE_FILE,
  assertCleanMain,
  assertHeadEqualsOriginMain,
  assertTagMissing,
  bumpSemver,
  fetchOriginMain,
  parseReleaseArguments,
  readPluginVersion,
  readRequiredRelease,
  runCommand,
  writePluginVersion,
  writeRequiredRelease,
} from './release-contract.mjs';

try {
  const { bumpType, required } = parseReleaseArguments(process.argv.slice(2), ['--required']);
  assertCleanMain();
  fetchOriginMain();
  assertHeadEqualsOriginMain();
  readRequiredRelease();
  const nextVersion = bumpSemver(readPluginVersion(), bumpType);
  const tag = `v${nextVersion}`;
  assertTagMissing(tag);
  writePluginVersion(nextVersion);
  if (required) {
    writeRequiredRelease(tag);
  }
  readRequiredRelease();
  runCommand('node', ['--test', 'scripts/release/release-contract.test.mjs']);
  runCommand('git', ['add', ...PLUGIN_VERSION_MANIFESTS, REQUIRED_RELEASE_FILE]);
  runCommand('git', ['commit', '-m', `release: ${tag}`]);
  runCommand('git', ['tag', '-a', tag, '-m', `release: ${tag}`]);
  process.stdout.write(`Prepared Studio Skills ${tag}${required ? ', required' : ''}.\n`);
  process.stdout.write(`Next: pnpm release:publish -- --tag ${tag}\n`);
} catch (error) {
  process.stderr.write(`[release:prepare] ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
