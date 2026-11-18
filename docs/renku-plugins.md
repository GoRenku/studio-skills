# Renku Plugins For Codex And Claude Code

Renku has two plugins. Both carry the one set of skills in this repository's
`skills/` folder:

- **`renku`** is for Renku installed on the person's computer.
- **`renku-cloud`** is for Renku Cloud at `https://app.gorenku.com`, where
  nothing Renku-specific is installed on the computer.

Each plugin is installed in two AI apps, Codex and Claude Code. This document
covers the four cases (two plugins, two apps): what each app reads, the files
in this repository each case uses, how each is built, installed, signed in
and updated, and what is not built yet.

Checked on 2026-11-15 with `codex-cli 0.167.0` and Claude Code 2.1.317; see
[What has been tried](#what-has-been-tried).

## Words Used Here

| Word | Meaning |
|---|---|
| Plugin | A folder an AI app installs: the skills, a manifest, and optionally a connection file. |
| Manifest | The plugin's `plugin.json`: its name, version and description, and for Codex where its skills and connection file are. |
| Connection file | A `*.mcp.json` file naming the MCP server the app starts or connects to. |
| Marketplace | A list file saying which plugins can be installed from a folder or Git repository. Both apps call it a marketplace. |
| Install id | `<plugin>@<marketplace>`, the name the install command takes, for example `renku@renku`. |

## What Each App Reads

Each app reads these files only at fixed paths. A file under any other name is
never read.

| | Codex | Claude Code |
|---|---|---|
| Marketplace file | `<root>/.agents/plugins/marketplace.json` | `<root>/.claude-plugin/marketplace.json` |
| Manifest | `<plugin folder>/.codex-plugin/plugin.json` | `<plugin folder>/.claude-plugin/plugin.json` |
| Skills | The folder the manifest's `skills` names (`./skills/`) | `<plugin folder>/skills/`, found without being named |
| Connection | The file the manifest's `mcpServers` names | The file the manifest's `mcpServers` names; none when it names none |
| Add a marketplace | `codex plugin marketplace add <folder, owner/repo[@ref] or Git URL> [--ref <ref>]` | `claude plugin marketplace add <folder, owner/repo[#ref] or Git URL>` |
| Add a marketplace in the app | ChatGPT app: Settings → Manage plugins, skills, and MCPs → Add → Add a marketplace (Source: `owner/repo`, Git URL or folder; optional Git ref) | Claude app or claude.ai: Customize → Plugins → Add → Add marketplace (`owner/repo` or repository URL). The plugin is saved to the Claude account and reaches Claude Code as a synced plugin. |
| Install a plugin | `codex plugin add <plugin>@<marketplace>` | `claude plugin install <plugin>@<marketplace>` (user scope by default) |
| Sign in to a connection | `codex mcp login <server>`, or the app asks | `/mcp` in a session, or `claude mcp login <server>` |
| Remove a plugin | `codex plugin remove <plugin>@<marketplace>` | `claude plugin uninstall <plugin>@<marketplace>` |
| Remove a marketplace | `codex plugin marketplace remove <marketplace>` | `claude plugin marketplace remove <marketplace>` (also removes its plugins) |
| Desktop app and CLI | The ChatGPT desktop app's Codex uses the plugins the `codex` CLI installs. Renku's installer relies on this. | The desktop app's local Code sessions and the terminal `claude` read the same settings, so a user-scope plugin installed in one is available in the other. |
| Installed copy | Codex copies the plugin at install (`~/.codex/plugins/cache/<marketplace>/<plugin>/<version>/`). | Claude reads a folder marketplace in place and clones a Git one. |

A plugin's folder can hold one manifest per app, so two plugins can never
share a folder:

- **Claude Code:** when the folder has `.claude-plugin/plugin.json`, that file
  is the manifest. A marketplace entry cannot give the same folder a
  different connection.
- **Codex:** a marketplace entry names a plugin folder and nothing else; the
  manifest and connection are read from that folder.

## How The Skills Reach Renku

**Renku on the computer.** The skills run `renku …` commands in the
terminal, in both apps. Codex also starts one local MCP server,
`renku studio mcp`, for its generation review panels, which only the Codex
desktop app shows. Claude Code shows no such panels, so the `renku` plugin
gives Claude no connection at all.

**Renku Cloud.** There is no `renku` command on the computer. The skills reach
Renku only through the MCP server at `https://app.gorenku.com/mcp`, which has
the tools `renku_command`, `renku_upload`, `renku_download`, `renku_view` and
`renku_guide`, and also serves the Codex panels. Both apps need this
connection, so both `renku-cloud` manifests name `cloud.mcp.json`.

The two plugins carry the same skills, so each skill's Renku Cloud section
says how it knows where Renku runs: in Renku Cloud when the skill comes from
the `renku-cloud` plugin or the `renku_` tools are present. The tools are
missing until the person signs in to the connection, which the app cannot do
for them. A `renku-cloud` skill without the tools tells the person how to sign
in and stops; it never runs a `renku` command on the computer, even when an
older local Renku is installed there.

## The Four Cases

| | Codex, Renku on the computer | Claude Code, Renku on the computer | Codex, Renku Cloud | Claude Code, Renku Cloud |
|---|---|---|---|---|
| Install id | `renku@renku` | `renku@renku` | `renku-cloud@renku-cloud` | `renku-cloud@renku-cloud` |
| Manifest in this repository | `.codex-plugin/plugin.json` | `.claude-plugin/plugin.json` | `.codex-plugin-cloud/plugin.json` | `.claude-plugin-cloud/plugin.json` |
| Manifest in the installed plugin | the same file | the same file | `.codex-plugin/plugin.json`, put there by the build | `.claude-plugin/plugin.json`, put there by the build |
| Connection | `codex.mcp.json`: runs `renku studio mcp` on the computer | none | `cloud.mcp.json`: `https://app.gorenku.com/mcp` | `cloud.mcp.json`: `https://app.gorenku.com/mcp` |
| How skills run Renku | `renku` in the terminal | `renku` in the terminal | the `renku_` tools | the `renku_` tools |
| Plugin folder | this repository's root | this repository's root | `dist/renku-cloud-marketplace/renku-cloud/`, made by `pnpm build:cloud-plugin` | the same built folder |
| Published from | this repository on GitHub, branch `beta` | this repository on GitHub, its default branch (`main`) | `GoRenku/renku-cloud-plugin`, generated by the release ([Publishing renku-cloud](#publishing-renku-cloud)); not published yet | the same |
| Installed by | Renku's installer | Renku's installer | the person, in the ChatGPT app or with `codex` | the person, in the Claude app or with `claude` |
| Sign-in | none | none | `codex mcp login renku`, or the app asks | `/mcp`, or `claude mcp login plugin:renku-cloud:renku` |

### Codex, Renku On The Computer

Renku's installer (`distribution/install-codex-plugin.mjs` in the studio
repository) runs:

```text
codex plugin marketplace add GoRenku/studio-skills --ref beta --json
codex plugin marketplace upgrade renku --json
codex plugin add renku@renku --json
codex plugin list --json
```

The `beta` branch is made by this repository's release (`pnpm release`). It
does not exist on GitHub yet, because there has been no release.
`renku update` and `renku update skills` repeat these steps. Without the
`codex` CLI the installer skips Codex.

### Claude Code, Renku On The Computer

Renku's installer (`distribution/claude/`) clones
`https://github.com/GoRenku/studio-skills.git` into
`<install-root>/plugins/claude/renku`, adds that folder as the marketplace
`renku`, and installs `renku@renku` at user scope. It uses a terminal `claude`
when one is available, otherwise the Claude desktop app's own copy of Claude
Code. `renku update` and `renku update skills` fast-forward the clone to the
default branch and update the plugin. Renku keeps its own clone because
Claude's own GitHub download failed on Windows (studio ADR 0110).

### Codex, Renku Cloud

In the ChatGPT app: Settings → Manage plugins, skills, and MCPs → Add → Add a
marketplace, Source `GoRenku/renku-cloud-plugin`; install Renku Cloud; select
Connect when asked and sign in to `https://app.gorenku.com` with the invited
email; start a new chat. In a terminal the same is
`codex plugin marketplace add GoRenku/renku-cloud-plugin`,
`codex plugin add renku-cloud@renku-cloud` and `codex mcp login renku`.
Until the plugin is published, a maintainer installs it with
`pnpm codex:cloud` (`scripts/codex-plugin.mjs`), which builds it and adds the
built folder as a marketplace.

### Claude Code, Renku Cloud

In the Claude app (or claude.ai): Customize → Plugins → Add → Add marketplace,
`GoRenku/renku-cloud-plugin`; add Renku Cloud; on its Connectors tab select Add,
then Connect, and sign in with the invited email. The plugin is saved to the
person's Claude account and reaches Claude Code, in the desktop app's Code tab
and in a terminal signed in to the same account, as a synced plugin. In a
terminal the same is `claude plugin marketplace add GoRenku/renku-cloud-plugin`,
`claude plugin install renku-cloud@renku-cloud`, and `/mcp` or
`claude mcp login plugin:renku-cloud:renku`. Until the plugin is published, a
maintainer installs it from the built folder:

```bash
pnpm build:cloud-plugin
claude plugin marketplace add ./dist/renku-cloud-marketplace
claude plugin install renku-cloud@renku-cloud
```

## Files In This Repository

```text
.agents/plugins/marketplace.json   Codex marketplace "renku": plugin renku in ./
.claude-plugin/marketplace.json    Claude marketplace "renku": plugin renku in ./
.codex-plugin/plugin.json          renku manifest for Codex: skills ./skills/, connection ./codex.mcp.json
.claude-plugin/plugin.json         renku manifest for Claude: no connection
codex.mcp.json                     renku connection for Codex: runs `renku studio mcp`
.codex-plugin-cloud/plugin.json    renku-cloud manifest for Codex: skills ./skills/, connection ./cloud.mcp.json
.claude-plugin-cloud/plugin.json   renku-cloud manifest for Claude: connection ./cloud.mcp.json
cloud.mcp.json                     renku-cloud connection: https://app.gorenku.com/mcp
skills/                            the one set of skills both plugins carry
scripts/build-cloud-plugin.mjs     builds the renku-cloud plugin into dist/
scripts/codex-plugin.mjs           pnpm codex:local, codex:cloud and codex:watch, for trying plugins in Codex
scripts/release/cloud-plugin-mirror.mjs        publishes the built renku-cloud plugin to GoRenku/renku-cloud-plugin
scripts/release/cloud-plugin-mirror-files.mjs  that repository's generated README, commit message and push refspecs
.env.example                       the release's setting: RENKU_CLOUD_PLUGIN_DEPLOY_KEY
```

The repository root is the `renku` plugin. The two `-cloud` manifests are
never read where they are: the build copies them to the names the apps read.

## How The renku-cloud Plugin Is Built

`pnpm build:cloud-plugin` deletes and rebuilds `dist/renku-cloud-marketplace/`:

```text
dist/renku-cloud-marketplace/
  .agents/plugins/marketplace.json   Codex marketplace "renku-cloud": plugin renku-cloud in ./renku-cloud
  .claude-plugin/marketplace.json    Claude marketplace "renku-cloud": plugin renku-cloud in ./renku-cloud
  renku-cloud/
    .codex-plugin/plugin.json        copied from .codex-plugin-cloud/plugin.json
    .claude-plugin/plugin.json       copied from .claude-plugin-cloud/plugin.json
    cloud.mcp.json                   copied from cloud.mcp.json
    LICENSE
    skills/                          the committed files under skills/ (git ls-files skills)
```

- Only committed skill files are copied, so commit skill changes before
  building.
- Nobody edits the built folder; every build replaces it.
- `dist/` is ignored by Git. The build publishes nothing.

## One Renku Plugin At A Time

Both plugins carry the same skills, so with both installed an app lists every
skill twice. In Codex, both connections are also named `renku`. Remove one
before installing the other:

| To switch from `renku` to `renku-cloud` | To switch from `renku-cloud` to `renku` |
|---|---|
| `codex plugin remove renku@renku` | `codex plugin remove renku-cloud@renku-cloud` |
| `claude plugin uninstall renku@renku` | `claude plugin uninstall renku-cloud@renku-cloud` |

Then install the other plugin as its case describes. Removing the local plugin
by hand does not stop Renku's installer from adding it again on the next
`renku update`.

## Versions And Updates

`pnpm release` sets one version in all four manifests
(`.codex-plugin/plugin.json`, `.claude-plugin/plugin.json`,
`.codex-plugin-cloud/plugin.json`, `.claude-plugin-cloud/plugin.json`). Claude
Code only loads updated plugin files when the manifest version changes.

- **`renku`:** `renku update` or `renku update skills` refreshes the plugin
  in both apps.
- **`renku-cloud`:** each release updates `GoRenku/renku-cloud-plugin`.
  Plugins on a Claude account (id `renku-cloud@synced` in Claude Code) update
  from their source by themselves, and Check for updates in Customize →
  Plugins pulls the latest. In the ChatGPT app the person selects Upgrade
  marketplace. In a terminal:
  `claude plugin marketplace update renku-cloud` then
  `claude plugin update renku-cloud@renku-cloud`, or
  `codex plugin marketplace upgrade renku-cloud` then
  `codex plugin add renku-cloud@renku-cloud`.
- **Installed in Claude Code itself** (id `renku-cloud@renku-cloud`, as on the
  Windows PC on 2026-11-18): Claude Code compares against its own copy of the
  marketplace, which it does not refresh by itself, because auto-update is
  off for marketplaces a person adds. Its Update button reports the installed
  version as the latest until `claude plugin marketplace update renku-cloud`
  has run. The Claude desktop app's Code tab has its own `claude` under
  `%APPDATA%\Claude\claude-code\<version>\<hash>\claude.exe` on Windows and
  `~/Library/Application Support/Claude/claude-code/` on macOS, for a computer
  with no `claude` in the terminal.

## Publishing renku-cloud

`GoRenku/renku-cloud-plugin` is a public, generated repository that people add
in the Claude app or the ChatGPT app. Its `main` holds exactly what
`pnpm build:cloud-plugin` makes, plus a generated `README.md` and the `LICENSE`.
Its README, GitHub description and commit messages say it is generated from
this repository and must not be edited.

- **The maintainer edits only `skills/`** here, commits and runs
  `pnpm release`. Nobody edits the generated repository.
- **`pnpm release` updates it.** `scripts/release/publish.mjs` pushes `main`,
  the tag, the GitHub Release and `beta`, then
  `scripts/release/cloud-plugin-mirror.mjs` builds the plugin and pushes it as
  one commit, `Renku Skills vX.Y.Z`, tagged `vX.Y.Z`, never forced. Running it
  again for a published tag changes nothing; the same tag with other files is
  refused (`SKILLS_RELEASE022`), and so is a repository changed outside the
  release (`SKILLS_RELEASE023`).
- **Only the release can.** Two rulesets on the repository, one for all
  branches and one for all tags, refuse creating, updating, deleting and
  force-pushing, except from deploy keys. Its one deploy key, "renku-cloud-plugin
  release", has write access. GoRenku allows deploy keys.
- **The key.** This repository's git-ignored `.env` names the deploy key's
  private key file in `RENKU_CLOUD_PLUGIN_DEPLOY_KEY` (see `.env.example`;
  `~/` is the home folder). The release commands start Node with
  `--env-file-if-exists=.env`. `pnpm release` checks that the key exists
  (`SKILLS_RELEASE020`) and reaches the repository (`SKILLS_RELEASE021`) before
  it prepares anything.

The first release publishes the repository's first commit. Before it, the
skills' Renku Cloud sections, now on the local `experimental-cloud` branch,
go into `main`.

## What Has Been Tried

On 2026-11-15, with `codex-cli 0.167.0` and Claude Code 2.1.317, in throwaway
profiles (`CODEX_HOME` and `CLAUDE_CONFIG_DIR` set to empty folders), with
`dist/renku-cloud-marketplace` added as a folder marketplace:

- **Codex:** marketplace `renku-cloud` added; `renku-cloud@renku-cloud`
  installed into `plugins/cache/renku-cloud/renku-cloud/0.1.0`;
  `codex mcp list` showed `renku` at `https://app.gorenku.com/mcp`, status
  `Not logged in`.
- **Claude Code:** marketplace `renku-cloud` added in user settings;
  `renku-cloud@renku-cloud` installed at user scope and enabled;
  `claude mcp list` showed `plugin:renku-cloud:renku` at
  `https://app.gorenku.com/mcp` (HTTP), `Needs authentication`.

On 2026-11-18, on Windows 11 in the Claude desktop app, the marketplace
`GoRenku/renku-cloud-plugin` was added from the app, with no terminal, and
`renku-cloud@renku-cloud` 0.2.0 installed from GitHub through Claude's own
download; studio ADR 0110's Windows download failure did not happen. The
connection stayed `needs_auth` because nobody had signed in. Without the
`renku_` tools, the 0.2.0 skills used an older local Renku installed on that
computer. The skills' Renku Cloud sections now stop and ask for the sign-in
instead.

Earlier, on 2026-08-10 (studio `docs/operations/distribution-and-release.md`),
a throwaway Codex profile added `GoRenku/studio-skills --ref main` and
installed `renku@renku`.

Not tried yet:

- finishing the sign-in to `https://app.gorenku.com` from each app;
- adding a marketplace from inside the ChatGPT desktop app, without a
  terminal CLI.
