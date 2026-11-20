#!/usr/bin/env node
import { assertCloudPluginMirrorReachable, deployKeyPathFromEnvironment } from './cloud-plugin-mirror.mjs';
import {
  assertCleanMain,
  assertHeadEqualsOriginMain,
  assertTagMissing,
  bumpSemver,
  fetchOriginMain,
  parseReleaseArguments,
  readPluginVersion,
  readRequiredRelease,
  runCommand,
} from './release-contract.mjs';

try {
  const { bumpType, dryRun, required } = parseReleaseArguments(process.argv.slice(2));
  assertCloudPluginMirrorReachable({ deployKeyPath: deployKeyPathFromEnvironment() });
  if (dryRun) {
    assertCleanMain();
    fetchOriginMain();
    assertHeadEqualsOriginMain();
    readRequiredRelease();
    const nextVersion = bumpSemver(readPluginVersion(), bumpType);
    assertTagMissing(`v${nextVersion}`);
    runCommand('node', ['--test', 'scripts/release/release-contract.test.mjs']);
    process.stdout.write(
      `Studio Skills release dry run passed. Next tag would be v${nextVersion}, ${required ? 'required: Renku Cloud would tell older plugins they must update' : 'not required'}.\n`
    );
  } else {
    runCommand('node', ['scripts/release/prepare.mjs', bumpType, ...(required ? ['--required'] : [])]);
    runCommand('node', [
      'scripts/release/publish.mjs',
      '--tag',
      `v${readPluginVersion()}`,
    ]);
  }
} catch (error) {
  process.stderr.write(`[release:ship] ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
