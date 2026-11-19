// The text and refspecs the release writes into GoRenku/renku-cloud-plugin, the
// generated repository that holds the built Renku Cloud plugin. Pure functions only.
import { parseReleaseTag } from './release-contract.mjs';

export const CLOUD_PLUGIN_MIRROR_REPOSITORY = 'GoRenku/renku-cloud-plugin';
export const CLOUD_PLUGIN_SOURCE_REPOSITORY = 'GoRenku/studio-skills';

/** The mirror's README: generated, what it is, and how to install and update the plugin from it. */
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

**Claude:** do this on https://claude.ai/customize/plugins in your web browser,
not in the Claude desktop app. The desktop app installs the plugin on that one
computer (marked **Installed locally**), and that copy never updates. A plugin
added on claude.ai is saved to your Claude account, and the desktop app picks
it up from there.

1. **Add** → **Add marketplace**, and enter \`${CLOUD_PLUGIN_MIRROR_REPOSITORY}\`.
   This adds the marketplace only; Claude lists it as \`renku-cloud-plugin\`.
2. Search \`renku\`, open **Renku cloud**, and select **Add**.
3. On its page, select **Connect** for the \`renku\` connector and sign in.
4. In the desktop app, start a new Code-tab session once it has picked up the
   plugin, within about 20 minutes.

**ChatGPT (Codex):** use the ChatGPT desktop app; ChatGPT on the web can't add
a marketplace. Settings → Manage plugins, skills, and MCPs → Add → Add a
marketplace, with Source \`${CLOUD_PLUGIN_MIRROR_REPOSITORY}\` and the Git ref
left empty. Install Renku Cloud, then select Connect when asked and sign in.

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

## Update

Your app keeps its own copy of this repository and shows a new version only
after it refreshes that copy.

**Claude:** after each new release, on https://claude.ai/customize/plugins,
**Add** → **Manage marketplaces** → **⋯** on \`renku-cloud-plugin\` →
**Check for updates**. Don't count on Claude to fetch a new version by itself.
The desktop app downloads it within about an hour; then start a new session.

**ChatGPT (Codex):** the app has no update button. Codex looks for a new
version only when it starts, and the ChatGPT app keeps it running while the
app is open, often for days. After each new release, quit the ChatGPT app
completely (closing its window isn't enough) and open it again, then start a
new chat.

If the new version still isn't there, run the app's own \`codex\`, then start a
new chat. On a Mac, in Terminal:

\`\`\`bash
/Applications/ChatGPT.app/Contents/Resources/codex-cli/CodexCLI.app/Contents/MacOS/codex plugin marketplace upgrade renku-cloud
\`\`\`

On Windows, in PowerShell:

\`\`\`powershell
& (Join-Path (Get-AppxPackage OpenAI.Codex).InstallLocation 'app\\resources\\codex.exe') plugin marketplace upgrade renku-cloud
\`\`\`

With \`codex\` in your terminal, \`codex plugin marketplace upgrade renku-cloud\`
does the same.

**Claude Code installed from a terminal or the Code tab:**

\`\`\`bash
claude plugin marketplace update renku-cloud
claude plugin update renku-cloud@renku-cloud
\`\`\`

To have Claude Code update it by itself, turn on auto-update for
\`renku-cloud\` in \`/plugin\` → Marketplaces.

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
