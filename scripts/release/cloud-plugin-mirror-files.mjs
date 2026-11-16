// The text and refspecs the release writes into GoRenku/renku-cloud-plugin, the
// generated repository that holds the built Renku Cloud plugin. Pure functions only.
import { parseReleaseTag } from './release-contract.mjs';

export const CLOUD_PLUGIN_MIRROR_REPOSITORY = 'GoRenku/renku-cloud-plugin';
export const CLOUD_PLUGIN_SOURCE_REPOSITORY = 'GoRenku/studio-skills';

/** The mirror's README: generated, what it is, and how to install the plugin from it. */
export function mirrorReadme({ version, sourceCommit }) {
  assertCommit(sourceCommit);
  return `# Renku Cloud plugin

> **Generated. Do not edit.** The Renku Skills release makes this repository from
> [${CLOUD_PLUGIN_SOURCE_REPOSITORY}](https://github.com/${CLOUD_PLUGIN_SOURCE_REPOSITORY})
> v${version} (commit \`${sourceCommit}\`). Every release replaces its contents,
> and GitHub refuses changes from anything but the release. Make skill changes in
> ${CLOUD_PLUGIN_SOURCE_REPOSITORY}.

Renku's filmmaking skills for Claude and Codex, connected to Renku Cloud at
https://app.gorenku.com. Renku Cloud is invite only: sign in with the email
address your invitation was sent to.

## Install

**Claude app or claude.ai:** Customize → Plugins → Add → Add marketplace, and
enter \`${CLOUD_PLUGIN_MIRROR_REPOSITORY}\`. Add Renku Cloud, then on its
Connectors tab select Add, then Connect, and sign in.

**ChatGPT app (Codex):** Settings → Manage plugins, skills, and MCPs → Add →
Add a marketplace, with Source \`${CLOUD_PLUGIN_MIRROR_REPOSITORY}\`. Install
Renku Cloud, then select Connect when asked and sign in.

**Terminal:**

\`\`\`bash
claude plugin marketplace add ${CLOUD_PLUGIN_MIRROR_REPOSITORY}
claude plugin install renku-cloud@renku-cloud
claude mcp login plugin:renku-cloud:renku
\`\`\`

\`\`\`bash
codex plugin marketplace add ${CLOUD_PLUGIN_MIRROR_REPOSITORY}
codex plugin add renku-cloud@renku-cloud
codex mcp login renku
\`\`\`

More: https://gorenku.com/renku-plugins/
`;
}

/** The message of the mirror commit for one release. */
export function mirrorCommitMessage({ version, sourceCommit }) {
  assertCommit(sourceCommit);
  return `Renku Skills v${version}\n\nGenerated from ${CLOUD_PLUGIN_SOURCE_REPOSITORY} at ${sourceCommit}.\n`;
}

/** The message of the mirror's annotated release tag. */
export function mirrorTagMessage(version) {
  return `Renku Skills v${version}`;
}

/**
 * Who GitHub says an SSH key signed in as, from its "Hi <name>! You've successfully
 * authenticated" answer: a user's login, or "<owner>/<repo>" for a deploy key.
 */
export function githubSignedInName(sshAnswer) {
  return /Hi ([^!\s]+)! You've successfully authenticated/.exec(sshAnswer)?.[1] ?? null;
}

/** What one mirror push sends: its main branch and the release tag. Never forced. */
export function mirrorPushRefspecs(tag) {
  parseReleaseTag(tag);
  return ['HEAD:refs/heads/main', `refs/tags/${tag}:refs/tags/${tag}`];
}

function assertCommit(commit) {
  if (!/^[0-9a-f]{40}$/.test(commit)) {
    throw new Error(`SKILLS_RELEASE016 Invalid release commit: ${commit}`);
  }
}
