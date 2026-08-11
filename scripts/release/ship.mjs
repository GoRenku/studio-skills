#!/usr/bin/env node
import {
  assertCleanMain,
  assertHeadEqualsOriginMain,
  assertTagMissing,
  bumpSemver,
  fetchOriginMain,
  readPluginVersion,
  runCommand,
} from './release-contract.mjs';

try {
  const args = process.argv.slice(2).filter((argument) => argument !== '--');
  const dryRun = args.includes('--dry-run');
  const bumpType = args.find((argument) => argument !== '--dry-run') ?? 'patch';
  if (!['patch', 'minor', 'major'].includes(bumpType)) {
    throw new Error(`SKILLS_RELEASE017 Use patch, minor, or major; received ${bumpType}.`);
  }
  if (dryRun) {
    assertCleanMain();
    fetchOriginMain();
    assertHeadEqualsOriginMain();
    const nextVersion = bumpSemver(readPluginVersion(), bumpType);
    assertTagMissing(`v${nextVersion}`);
    runCommand('node', ['--test', 'scripts/release/release-contract.test.mjs']);
    process.stdout.write(
      `Studio Skills release dry run passed. Next tag would be v${nextVersion}.\n`
    );
  } else {
    runCommand('node', ['scripts/release/prepare.mjs', bumpType]);
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
