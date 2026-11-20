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

Checked on 2026-11-15 with `codex-cli 0.167.0` and Claude Code 2.1.317, and
updates checked on 2026-11-19 with `codex-cli 0.169.0-alpha.11.1` and Claude
Code 2.1.326; see [What has been tried](#what-has-been-tried).

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
| Add a marketplace in the app | ChatGPT desktop app (ChatGPT on the web cannot add a marketplace): Settings → Manage plugins, skills, and MCPs → Add → Add a marketplace (Source: `owner/repo`, Git URL or folder; optional Git ref) | claude.ai in a web browser (Customize → Plugins): Add → Add marketplace (`owner/repo` or repository URL). This adds only the marketplace, listed under the repository's name; each plugin is then added from the plugin list. Plugins on the Claude account reach the desktop app's Code tab and a terminal `claude`. Adding a plugin in the Claude desktop app's own Plugins page, or from the Code tab's **+** → **Add plugins**, installs it into Claude Code on that computer only, marked **Installed locally**. |
| Install a plugin | `codex plugin add <plugin>@<marketplace>` | `claude plugin install <plugin>@<marketplace>` (user scope by default) |
| Sign in to a connection | `codex mcp login <server>`, or the app asks | `/mcp` in a session, or `claude mcp login <server>` |
| Remove a plugin | `codex plugin remove <plugin>@<marketplace>` | `claude plugin uninstall <plugin>@<marketplace>` |
| Remove a marketplace | `codex plugin marketplace remove <marketplace>`. The ChatGPT app can uninstall a plugin but has no way to remove a marketplace. | `claude plugin marketplace remove <marketplace>` (also removes its plugins) |
| Desktop app and CLI | The ChatGPT desktop app's Codex uses the plugins the `codex` CLI installs. Renku's installer relies on this. | The desktop app's local Code sessions and the terminal `claude` read the same settings, so a user-scope plugin installed in one is available in the other. |
| Installed copy | Codex keeps a snapshot of a Git marketplace (`~/.codex/.tmp/marketplaces/<marketplace>/`) and copies the plugin at install (`~/.codex/plugins/cache/<marketplace>/<plugin>/<version>/`). | Claude reads a folder marketplace in place and clones a Git one (`~/.claude/plugins/marketplaces/<marketplace>/`), and copies the plugin at install (`~/.claude/plugins/cache/<marketplace>/<plugin>/<version>/`). |

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
| Published from | this repository on GitHub, branch `beta` | this repository on GitHub, its default branch (`main`) | `GoRenku/renku-cloud-plugin`, generated by the release ([Publishing renku-cloud](#publishing-renku-cloud)) | the same |
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

In the ChatGPT desktop app (ChatGPT on the web cannot add a marketplace):
Settings → Manage plugins, skills, and MCPs → Add → Add a marketplace, Source `GoRenku/renku-cloud-plugin` with the Git ref left empty
(a marketplace added with a ref never moves past it); install Renku Cloud;
select Connect when asked and sign in to `https://app.gorenku.com` with the
invited email; start a new chat. In a terminal the same is
`codex plugin marketplace add GoRenku/renku-cloud-plugin`,
`codex plugin add renku-cloud@renku-cloud` and `codex mcp login renku`.
To try an unreleased build, a maintainer installs it with
`pnpm codex:cloud` (`scripts/codex-plugin.mjs`), which builds it and adds the
built folder as a marketplace.

### Claude Code, Renku Cloud

On claude.ai in a web browser (Customize → Plugins), not in the Claude desktop
app:

1. **Add** → **Add marketplace**, `GoRenku/renku-cloud-plugin`. Claude lists
   the marketplace as `renku-cloud-plugin`. Adding it does not add the plugin.
2. Search `renku` in Plugins, open **Renku cloud** ("From
   renku-cloud-plugin") and select **Add**.
3. On its page, select **Connect** for the `renku` connector and sign in with
   the invited email.

After each release the person selects **Check for updates** for the
marketplace ([Versions And Updates](#versions-and-updates)).

The plugin is saved to the person's Claude account. The desktop app downloads
account plugins about every 20 minutes into its own folder
(`~/Library/Application Support/Claude/local-agent-mode-sessions/<account>/<organization>/rpm/`
on macOS, `%APPDATA%\Claude\rpm\<organization>\<account>\` on Windows) and
hands them to each new Code-tab session. A terminal
`claude` signed in to the same account gets it as `renku-cloud@synced`.

The desktop app's Plugins page looks the same but installs differently.
Adding Renku Cloud there, or from the Code tab's **+** → **Add plugins**,
installs `renku-cloud@renku-cloud` into Claude Code on that computer only. The
Plugins list marks it **Installed locally**, and it does not update by itself
([Versions And Updates](#versions-and-updates)). Once the account copy is
there, remove the local copy from its **⋯** menu, so the list shows one Renku
Cloud.

In a terminal the same is `claude plugin marketplace add GoRenku/renku-cloud-plugin`,
`claude plugin install renku-cloud@renku-cloud`, and `/mcp` or
`claude mcp login plugin:renku-cloud:renku`; this too is a Claude Code-only
install. To try an unreleased build, a maintainer installs it from the built
folder:

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
cloud-plugin-required-release.json the oldest renku-cloud release that still works with Renku Cloud, or null
skills/                            the one set of skills both plugins carry
scripts/build-cloud-plugin.mjs     builds the renku-cloud plugin into dist/
scripts/cloud-connection.mjs       the built cloud.mcp.json: the connection with the plugin version added
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
    cloud.mcp.json                   cloud.mcp.json with the plugin version added (see below)
    LICENSE
    skills/                          the committed files under skills/ (git ls-files skills)
```

- Only committed skill files are copied, so commit skill changes before
  building.
- Nobody edits the built folder; every build replaces it.
- `dist/` is ignored by Git. The build publishes nothing.
- The built `cloud.mcp.json` carries the manifests' version in two fields,
  so every request to Renku Cloud says which plugin sent it:

  ```json
  "http_headers": { "Renku-Plugin-Version": "0.5.0" },
  "headersHelper": "echo '{\"Renku-Plugin-Version\":\"0.5.0\"}'"
  ```

  Codex reads only `http_headers`; Claude Code reads only `headersHelper`, a
  command it runs each time it connects, which only prints that line. Neither
  field is part of the key each app saves its sign-in under, so a new release
  keeps the person signed in. A fixed `headers` value or a changed address
  would ask for a new sign-in after every release (see What Has Been Tried).

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
- **`renku-cloud`:** each release updates `GoRenku/renku-cloud-plugin`. Each
  app keeps its own copy of that marketplace and installs from the copy, so a
  release reaches a person only when their app refreshes its copy. Nothing in
  `marketplace.json` or a manifest can make an app refresh. How each install
  gets a release:

| Install | How it gets a release | To get it now |
|---|---|---|
| Claude account (claude.ai Plugins → **Add**; `renku-cloud@synced` in a terminal Claude Code) | When the account's copy of the `renku-cloud-plugin` marketplace re-syncs, which so far has needed **Check for updates**. With **Sync automatically** on ("Re-syncs on GitHub changes"), v0.4.2 had still not synced five minutes after its release. The desktop app then checks plugins already added for updates only on its full sync: its sync runs every 20 minutes, and only a run that finds the last full sync over an hour old is full, so an update can take up to about 80 minutes to arrive. The next new Code-tab session loads the update. | After each release, on claude.ai, **Add** → **Manage marketplaces** → **⋯** on `renku-cloud-plugin` → **Check for updates**, then a new Code-tab session once the desktop app has downloaded it. |
| Claude Code only (the desktop app's Plugins page, Code tab **+** → **Add plugins**, or `claude plugin install`; `renku-cloud@renku-cloud`, **Installed locally** in the Plugins list) | Never by itself: auto-update is off for a marketplace a person adds. The person can turn it on in `/plugin` → Marketplaces → `renku-cloud`, or with `"autoUpdate": true` on the `renku-cloud` entry under `extraKnownMarketplaces` in `~/.claude/settings.json`. Until then the Update button reports the installed version as the latest. | `claude plugin marketplace update renku-cloud`, then `claude plugin update renku-cloud@renku-cloud`, then a new session or `/reload-plugins`. |
| Codex (the ChatGPT desktop app or `codex`; `renku-cloud@renku-cloud`) | When Codex's app-server starts, it refreshes every Git marketplace without a pinned ref and reinstalls the plugins installed from it. The ChatGPT app keeps that server running while it is open, often for days, and has no button to refresh a marketplace. | Quit the ChatGPT app completely and reopen it, then a new chat. Or run the app's own `codex plugin marketplace upgrade renku-cloud`, which replaces the installed plugin too; a running ChatGPT app lists the new skills straight away. |

- **Both Claude copies on one computer:** in the desktop app's Code tab, a new
  session loads the account copy. For terminal Claude Code, Claude's docs say
  an installed marketplace plugin outranks a synced one; that has not been
  tested.
- **The apps' own command-line tools,** for a computer with no `claude` or
  `codex` in the terminal: a Claude Code session has the path of its `claude`
  in `CLAUDE_CODE_EXECPATH`; the desktop app keeps it under
  `%APPDATA%\Claude\claude-code\<version>\<hash>\claude.exe` on Windows and
  `~/Library/Application Support/Claude/claude-code/` on macOS. The ChatGPT
  app's `codex` is
  `/Applications/ChatGPT.app/Contents/Resources/codex-cli/CodexCLI.app/Contents/MacOS/codex`
  on macOS, and the background service runs
  `~/.codex/packages/app-server-daemon/releases/<version>/bin/codex`. On
  Windows the ChatGPT app is the Microsoft Store package `OpenAI.Codex`
  (`ChatGPT.exe`, with Codex's servers as its child processes). Its
  `codex.exe`, not on PATH, is
  `C:\Program Files\WindowsApps\OpenAI.Codex_<version>_x64__2p2nqsd0c76g0\app\resources\codex.exe`;
  `& (Join-Path (Get-AppxPackage OpenAI.Codex).InstallLocation 'app\resources\codex.exe')`
  reaches it without the version.

### Renku Cloud Tells The Agent

From 0.5.0, Renku Cloud reads the plugin's version from each session and puts
a notice at the start of the instructions it sends the agent. The notice
gives the update steps for the session's app (the table above) and links the
website's steps.

- **A newer plugin is out:** the agent mentions it once, with the steps.
- **The plugin is older than the required release:** the agent says Renku may
  fail or give wrong results until the person updates, gives the steps, and
  asks whether to go on before any Renku work. Every `renku_command` result
  carries the same notice in `pluginUpdate` until the person updates.
  Commands keep running.
- **No version arrived** (plugins before 0.5.0, or an app without the plugin):
  a sentence asks the agent to give the steps once if its skills come from
  this plugin.

Renku Cloud learns the latest and the required release from the skills it is
deployed with, so deploy Renku Cloud after each release.

**Required releases.** `cloud-plugin-required-release.json` names the oldest
release that still works with the Renku Cloud running now. Only the release
writes it:

```bash
pnpm release:minor -- --required
```

writes the new tag into it, in the release commit. Use the flag for the
release that adapts the skills to a Renku Cloud change older skills can't
follow, such as a renamed command or a changed answer they read; then deploy
Renku Cloud with that change. A release without the flag leaves the file as
it is. `--dry-run` says whether the release would be required. Version
numbers alone never make a release required: a large release can work fine
with older skills, and a small Renku Cloud change can break them.

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

On 2026-11-19, after v0.4.0 was published, the Windows PC's Claude desktop app
and ChatGPT app (with the marketplace added from inside the app) both kept
their older version and showed no update. The ChatGPT app could uninstall the
plugin but offered no way to remove or refresh the marketplace, and ChatGPT on
the web had no way to add one. A read-only check on that PC found:

- **Claude:** only the Code-tab copy, `renku-cloud@renku-cloud` 0.3.1, with
  its marketplace copy last refreshed on 2026-11-18 17:02 UTC and no
  `autoUpdate`. No account copy: the desktop app had no `rpm` folder.
- **Codex:** the marketplace without a pinned ref, its snapshot at 0.3.2, and
  the ChatGPT app's app-server running since 2026-11-18 18:50, when 0.3.2 was
  the newest release. The plugin itself was no longer installed.

The Claude account, checked on claude.ai the same day:

- It had the marketplace, as `renku-cloud-plugin`, at "Synced commit:
  f6a6190" (v0.3.0), with Sync automatically off. It had no Renku Cloud
  plugin: Renku cloud's page offered **Add**. Renku Cloud had been added in
  the Windows desktop app's Plugins page, which installed it into Claude Code
  on that PC only; the Plugins list showed that copy as **Installed locally**.
  Everything below was done on claude.ai in a browser.
- **Check for updates** moved the synced commit to `ccafed7` (v0.4.0) in about
  15 seconds, and the plugin's page then said v0.4.0.
- **Sync automatically**, turned on, was still on after a reload.
- **Add** put Renku Cloud 0.4.0 on the account. The desktop apps downloaded
  it at their next sync: the Windows PC's about 4 minutes later, into
  `%APPDATA%\Claude\rpm\<organization>\<account>\plugin_01RyMhWT1guL7Qp1PgnCYwzD\`,
  and the Mac's 7 minutes later, into
  `local-agent-mode-sessions/<account>/<organization>/rpm/plugin_01RyMhWT1guL7Qp1PgnCYwzD/`.
- A Code-tab session started after that loaded its `renku-cloud` skills from
  that account copy (0.4.0), one set of them, although
  `renku-cloud@renku-cloud` 0.2.0 was still installed and enabled. The desktop
  log showed `2 plugin(s) go to Claude Code over stdin` for that session and
  `1` for every earlier one.

Two more releases the same day:

- **v0.4.1** (14:18 CET): Check for updates on claude.ai brought it to the
  account. The Mac's desktop app ran a sync six seconds after the release and
  kept 0.4.0; its quick syncs log "kept 1 user-installed plugin(s) without
  checking them for updates", and only a full sync checks. Its next full
  sync, at 15:26, logged "Refreshed 1 stale user-installed plugin(s)
  (remote_newer)" and brought 0.4.1 in, 68 minutes after Check for updates.
- **v0.4.2** (14:31 CET): with Sync automatically on, the account was still at
  v0.4.1 (`ff24d00`) five minutes later. On the Windows PC, quitting the
  ChatGPT app and reopening it at 14:32 started new Codex server processes,
  which refreshed the marketplace to 0.4.2; Renku Cloud 0.4.2 was then
  installed in Codex.

On macOS, the same day:

- **Codex starts by refreshing.** In a throwaway profile
  (`codex-cli 0.169.0-alpha.11.1`), `renku-cloud@renku-cloud` was installed
  from the marketplace pinned to `v0.3.2`, then the pin was removed from
  `config.toml`. Starting `codex app-server` replaced the installed 0.3.2 with
  0.4.0 with no command. The ChatGPT app's own app-server
  (`codex app-server --listen unix:// --managed-daemon`) had been running
  since 2026-11-18 05:20, and the VS Code extension's since October.
- **`codex plugin marketplace upgrade renku-cloud`** alone replaced the
  installed plugin. An app-server already running answered `skills/list` with
  the new version straight after, without a restart.
- **Claude Code commands work inside a session.** In a throwaway
  `CLAUDE_CONFIG_DIR`, run from a Claude Code session through
  `$CLAUDE_CODE_EXECPATH`: `claude plugin marketplace update renku-cloud` and
  `claude plugin update renku-cloud@renku-cloud` moved 0.3.2 to 0.4.0, with
  `Restart to apply changes.`
- **This Mac's own Claude Code** had `renku-cloud@renku-cloud` 0.2.0 installed,
  its marketplace copy at 0.3.0, and no synced `renku-cloud`.

On 2026-11-19, on macOS, which connection fields keep the sign-in across a
release (studio plan 0267). Each case ran in empty throwaway profiles, with
the desktop app's Claude Code 2.1.326 and the ChatGPT app's `codex`
0.169.0-alpha.11.1, against a local fake Renku Cloud with OAuth that logged
every request: install 0.4.0, sign in, release 0.4.1, update, check the sign-in.

| What changes each release | Claude Code | Codex |
|---|---|---|
| Nothing (version only) | still signed in | still signed in |
| a fixed `headers` value | asks for a new sign-in | ignores `headers`; never sent |
| the address (`/mcp?plugin=0.4.1`) | asks for a new sign-in | asks for a new sign-in |
| `http_headers` | ignored | sent with the old token |
| `headersHelper: echo '{…}'` | sent with the old token | ignored |
| both `http_headers` and `headersHelper` | sent with the old token | sent with the old token |
| `headersHelper` printing bad output | connects, without the header | — |

Codex files its saved sign-in under the server name and a hash of the address
with empty headers. Claude Code's docs say folder trust gates `headersHelper`
only for servers in a project's `.mcp.json` or at local scope, so a plugin's
helper runs in any folder; account plugins load through the same plugin
loader. On Windows, Claude Code runs commands in Git Bash, or in PowerShell
without it, and the single-quoted `echo` prints the same JSON in both.

On 2026-11-20, after v0.5.0 and the Renku Cloud deploy that reads the header:

- **The built plugin, against the fake server.** In throwaway profiles, the
  plugin `pnpm build:cloud-plugin` made, installed at 0.5.0, signed in, then
  rebuilt at 0.5.1 and updated: Claude Code and the ChatGPT app's `codex`
  (0.171.0-alpha.13) both sent `Renku-Plugin-Version: 0.5.1` with the old
  token, and neither asked for a new sign-in.
- **Against Renku Cloud, with this Mac's own sign-in.** This Mac's Code-tab
  sessions take `renku-cloud` from the Claude account (the desktop app's copy
  under `local-agent-mode-sessions/<account>/<organization>/rpm/`, then
  0.4.1); `claude plugin list` lists no `renku-cloud`. `claude -p` with
  `--plugin-dir` on that copy connected with the existing sign-in, and the
  instructions began with the no-version sentence ("The latest is 0.5.0.").
  With `--plugin-dir` on the built 0.5.0 plugin, the same sign-in worked, the
  instructions had no notice, and `renku_command` answered. `wrangler tail`
  showed `pluginVersion: null` then `"0.5.0"`, `aiApp: "other"`.
- **The account's marketplace had not synced by itself.** With Sync
  automatically on since 2026-11-19, claude.ai still showed synced commit
  `ff24d00` (v0.4.1), missing v0.4.2 and v0.5.0. **Check for updates** moved it
  to `e92d565` (v0.5.0) in about 3 seconds, with "1 notice": the sync record
  says `exec_surface_changed`, "Executable files or settings in this version
  (such as scripts, hooks, MCP servers, or the sites it declares it calls)
  differ from the version org members were using before this sync. This
  version was not held for approval." The new `headersHelper` is such a
  change, and since it holds the version, every release changes it.
- **The account copy.** The Mac's desktop app downloaded 0.5.0 into its
  account copy 24 minutes after Check for updates, with both version fields.
  `claude -p --plugin-dir` on that copy connected with the existing sign-in;
  `wrangler tail` showed `pluginVersion: "0.5.0"`, `notice: "none"`, and
  `renku_command` answered.

Earlier, on 2026-08-10 (studio `docs/operations/distribution-and-release.md`),
a throwaway Codex profile added `GoRenku/studio-skills --ref main` and
installed `renku@renku`.

Not tried yet:

- finishing the sign-in to `https://app.gorenku.com` from each app;
- whether Sync automatically brings in a release later than five minutes;
- a new Code-tab session on Windows loading the account copy;
- whether quitting the ChatGPT app on macOS restarts its Codex server, which
  runs there as a separate background service
  (`codex app-server --managed-daemon`).
