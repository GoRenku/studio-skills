# Renku Studio Skills

**A film crew of 20 skills for your coding agent.** A director,
screenwriters, a casting director, a production designer, shot planners and a
media producer that work with [Renku Studio](https://github.com/GoRenku/studio)
in Codex, Claude Code or any agent that supports Agent Skills.

[![License: MIT](https://img.shields.io/github/license/GoRenku/studio-skills)](LICENSE)

## Skill map

Each link opens the skill's instructions and its references. These are the
maintained workflow entrypoints, rather than a second set of tutorials here.

| Area | Skills |
| --- | --- |
| Direction | [Movie Director](skills/movie-director/SKILL.md) |
| Screenplay | [Drafter](skills/screenplay-drafter/SKILL.md), [Analyst](skills/screenplay-analyst/SKILL.md), [Supporting Material Importer](skills/screenplay-supporting-material-importer/SKILL.md), [PDF to FDX](skills/screenplay-pdf-to-fdx/SKILL.md) |
| Visual language | [Inspiration Analyzer](skills/inspiration-analyzer/SKILL.md), [Lookbook Designer](skills/lookbook-designer/SKILL.md) |
| Cast and sets | [Casting Director](skills/casting-director/SKILL.md), [Production Designer](skills/production-designer/SKILL.md), [Location World Producer](skills/location-world-producer/SKILL.md) |
| Scene and shot planning | [Scene Beat Designer](skills/scene-beat-designer/SKILL.md), [Shot Planner](skills/shot-planner/SKILL.md), [Previs Staging](skills/previs-staging/SKILL.md), [Blender Shot Planner](skills/blender-shot-planner/SKILL.md) |
| Media workflow | [Media Producer](skills/media-producer/SKILL.md) |
| Model research and curation | [Model Researcher](skills/model-researcher/SKILL.md) |
| Provider execution | [Fal.ai](skills/fal-ai-media-provider/SKILL.md), [ElevenLabs](skills/elevenlabs-media-provider/SKILL.md), [Pika](skills/pika-media-provider/SKILL.md), [Comfy Router](skills/comfy-router-media-provider/SKILL.md), [Replicate](skills/replicate-media-provider/SKILL.md), [WaveSpeed](skills/wavespeed-media-provider/SKILL.md) |

## What it looks like

From a session on Urban Basilica, lightly trimmed:

> **You:** It repeats the line "A foundry that can breathe without
> collapsing" twice.
>
> **Agent:** Yes—that confirms the duplicate. This take needs a retry. I'd
> revise the prompt to tie the wide cut directly to the start of "A
> foundry…", state the dialogue only once, and explicitly prohibit
> replaying speech across the cut.
>
> **You:** Can you just cut out that repeated part without regenerating the
> whole thing?
>
> **Agent:** Done—removed the repeated sentence with its matching picture
> and sound, without regenerating or replacing audio. Saved as Clip 2.1 —
> "Duplicate removed."

## Install

- **Codex**: [Install Renku](https://gorenku.com/download/?utm_source=github&utm_medium=referral&utm_campaign=always-on&utm_content=skills-readme). Setup adds
  these skills as the Renku plugin; restart Codex afterwards.
- **Claude Code**: [Install Renku](https://gorenku.com/download/?utm_source=github&utm_medium=referral&utm_campaign=always-on&utm_content=skills-readme). Setup
  adds the Renku plugin. In Claude Desktop, open the Code tab once before
  setup; then start a new Code conversation and use `/renku:movie-director`.
- **Other agents** (Cursor and others): Install Renku, then run
  `npx skills add GoRenku/studio-skills --agent cursor --skill '*' --copy`.
  See [Install skills for other agents](#install-skills-for-other-agents).

Also listed on [skills.sh](https://skills.sh/gorenku/studio-skills).

### Renku Cloud (invite only)

Renku Cloud runs Renku Studio for you at `https://app.gorenku.com`, so nothing
Renku-specific is installed on your computer. It is for Codex and Claude Code,
in their desktop apps or CLIs; chat apps are not supported.

The **Renku Cloud** plugin (`renku-cloud`) carries every skill file, the same
as the local plugin; your agent reads them on your computer. Its MCP server is
the web address `https://app.gorenku.com/mcp`, in Codex and Claude Code; the
local plugin gives Codex the `renku studio mcp` program and Claude none. Every
release publishes it to the generated repository
[GoRenku/renku-cloud-plugin](https://github.com/GoRenku/renku-cloud-plugin),
which you add in the app:

- **Claude app or claude.ai:** Customize → Plugins → Add → Add marketplace,
  `GoRenku/renku-cloud-plugin`; add Renku Cloud; on its Connectors tab select
  Add, then Connect, and sign in with your invited email.
- **ChatGPT app (Codex):** Settings → Manage plugins, skills, and MCPs → Add →
  Add a marketplace, Source `GoRenku/renku-cloud-plugin`; install Renku Cloud;
  select Connect when asked and sign in.

[Renku plugins](docs/renku-plugins.md) describes how both plugins are built,
installed, signed in to and updated in each app. Only one Renku plugin is
installed at a time.

Renku Cloud keeps the project, its files, Studio and the panels; your agent
keeps doing the real work on your computer, with its own programs and
scripts. Every skill has a **Renku Cloud** section that says what changes:

- Until you sign in, a skill from the Renku Cloud plugin tells you how and
  stops; it never uses a Renku installed on your computer.
- Renku commands run through the `renku_command` tool, many in one batch. A
  script that ran `renku` becomes a local script, a batch and a local script.
- The agent's working documents stay on your computer. Files go up with one
  `renku_upload` call and come down with one `renku_download` call; folders
  travel as `.tar` archives.
- Renku Cloud holds no provider keys. Generation goes through the provider's
  own MCP server, connected in your AI app with your own provider account:
  fal, WaveSpeed, Replicate and ElevenLabs. Renku builds the exact request,
  records each provider job, and imports the results with the provider's
  receipt. Pika, Comfy Router and World Labs are not available in Renku Cloud.
- Panels open in the Codex desktop app, as locally; Claude Code and the Codex
  CLI use the same chat steps as locally.

Media Producer's
[Renku Cloud guide](skills/media-producer/references/renku-cloud.md) has the
whole flow. Your personal model notes live in Renku Cloud; the agent reads and
writes them with `renku generation models guide show|write`.

Maintainers assemble the installable plugin and its marketplace files with
`pnpm build:cloud-plugin` (output in `dist/renku-cloud-marketplace/`), try it
in Codex with `pnpm codex:cloud`, and check the cloud sections with
`pnpm eval:cloud` (see [Agent evals in Renku Cloud](#agent-evals-in-renku-cloud)).
`pnpm release` publishes the same build to GoRenku/renku-cloud-plugin with the
deploy key named in `.env` (see `.env.example`).

## Relationship to Studio

This repository supplies Renku's Claude/Codex plugins and skills for other
compatible agents. The separately installed
[Studio runtime](https://github.com/GoRenku/studio) provides the `renku` CLI,
project context and storage, generation engines, and browser visualization app.
The skills invoke that CLI through the agent's local shell tools, or, with
Renku Cloud, through the `renku_command` tool.

How the plugins are installed and refreshed, and how generation review is
routed, is described in
[Plugin installation and review routing](docs/plugin-installation-and-review-routing.md).
Which files each plugin uses in Codex and Claude Code, locally and in Renku
Cloud, is in [Renku plugins](docs/renku-plugins.md).

## Install skills for other agents

For Cursor and other agents, install the skills yourself using the independent
[skills tool](https://github.com/vercel-labs/skills). Install
[Renku Studio](https://gorenku.com/download/?utm_source=github&utm_medium=referral&utm_campaign=always-on&utm_content=skills-readme) first and confirm `renku about`
works in a terminal. You also need your own Node.js/npm and Git installation;
Renku's private tools are not added to your terminal PATH. Your agent must
support local command execution and Agent Skills.

The examples below use Cursor. Replace `cursor` with your agent's identifier
from the [supported agents list](https://github.com/vercel-labs/skills#supported-agents).
Keep the agent selection explicit instead of selecting all agents. `npx` may
download the skills tool and ask for confirmation.

For one project, open a terminal in the folder your agent will work in and run:

```bash
npx skills add GoRenku/studio-skills --agent cursor --skill '*' --copy
```

Choose project scope if prompted, review the destination, and confirm. Keep
your agent working in that folder so it can discover the installed skills.

For all projects, add `--global` if your agent supports global installation:

```bash
npx skills add GoRenku/studio-skills --agent cursor --skill '*' --copy --global
```

The `--copy` option installs regular files instead of symbolic links. Start a
new agent conversation, check that the skills are available, and begin with
`movie-director` through your agent's skill interface.

To update, rerun the same command with the same agent and scope; for project
skills, run it from the same project folder. Renku's update commands manage
Claude/Codex plugins; they do not update skills installed for other agents. See the
[website guide](https://gorenku.com/agent-skills/?utm_source=github&utm_medium=referral&utm_campaign=always-on&utm_content=skills-readme) for more details.

## Models and providers

The [bundled media model table](docs/bundled-media-models.md) shows which image,
video, and audio models are included for each provider and which generation
modes are listed. The table is a curated selection, not the providers' full
model inventories.

## Add a model for your own use

With a Studio runtime that provides `renku generation models`, ask your Renku
agent to use the [Model Researcher](skills/model-researcher/SKILL.md) skill. For
example:

> Add `<exact model route>` on `<provider>` to my personal media model library.
> Research the model and save useful prompting advice if available.

Give the exact provider and model version when you know them. The agent checks
the provider route, saves its name and exact ID through the `renku generation models`
command, and can keep optional Markdown advice in your personal library.
This works without an active Project. You can then ask the
[Media Producer](skills/media-producer/SKILL.md) to use the model in any of your
Projects when the provider supports its execution protocol.

Your personal model library and notes are stored on your device, outside the
Studio runtime and plugin installations. They are shared across your Projects,
and updating either installation does not replace them.
The agent can show you the actual library and notes paths. Saving a model does
not supply a provider API key or confirm that a paid generation will succeed;
enter the selected provider's key in Studio **Settings → Provider API keys**
before generating. For the exact command sequence, see the
[personal model workflow](skills/model-researcher/references/workflow.md).

## Repository layout

- `skills/`: skill instructions (`SKILL.md`) and supporting references, samples,
  scripts, evaluations, and agent metadata where needed.
- `.codex-plugin/` and `.agents/plugins/`: Codex plugin and marketplace manifests.
- `.claude-plugin/`: Claude Code plugin and marketplace manifests.
- `.codex-plugin-cloud/`, `.claude-plugin-cloud/` and `cloud.mcp.json`: the
  Renku Cloud plugin variant, assembled by `scripts/build-cloud-plugin.mjs`.
- `scripts/`: repository validation and maintainer release tooling;
  `scripts/cloud-evals/` holds the Renku Cloud agent evals.
- `docs/`: technical integration notes.

## Try changes in Codex

Codex runs a plugin from its own copy, made at install, so edits here reach
Codex only after a refresh. These commands use Codex's public plugin commands
and need a personal marketplace named `renku-local`
(`~/.agents/plugins/marketplace.json`) whose `renku` plugin points at this
folder.

| Command | Purpose |
| --- | --- |
| `pnpm codex:local` | Refresh Codex's copy of the Renku plugin from this folder and switch to it; removes Renku Cloud. |
| `pnpm codex:cloud` | Build the Renku Cloud plugin, then refresh and switch to it; removes the local plugin. |
| `pnpm codex:watch` | Refresh whichever of the two is installed each time a skill or plugin file changes. |

Only one Renku plugin is installed at a time: both name their MCP server
`renku` and carry the same skills. After a refresh, start a new Codex chat;
restart the Codex desktop app if it still shows the old skills. The cloud
plugin takes only files git knows about, so `git add` a new skill file first.
When `renku` is linked to a Studio checkout, Studio changes need only a Studio
build and a new chat, not a refresh.

## Validation

This is a dependency-free, single-package repository. Node.js runs the validation
scripts; pnpm 11.7.0 is pinned in [`package.json`](package.json). No dependency
installation is needed.

| Command | Purpose |
| --- | --- |
| `pnpm test` | Validate media-generation skills, image/video prompt guides, media-purpose evaluations, and run supporting-script and release-tool tests. |
| `pnpm test:media-generation` | Run the media-generation checks without the release-tool tests. |
| `pnpm release:test` | Test release tooling only; does not create or publish a release. |
| `pnpm build:cloud-plugin` | Assemble the Renku Cloud plugin in `dist/renku-cloud-marketplace/`; check it with `claude plugin validate`. |
| `pnpm eval:cloud` | Run the agent evals in Renku Cloud; uses model time, so run on demand and before a release. |

These checks do not evaluate every creative workflow. Review affected skill
instructions, CLI examples, and evaluation scenarios against Studio's current
implementation as part of each change. Release creation and publishing are
maintainer responsibilities.

### Agent evals in Renku Cloud

`pnpm eval:cloud` runs Claude Code (`claude -p`) and the Codex CLI
(`codex exec`) with the Renku Cloud plugin against a local Renku Cloud: the
Studio checkout's Renku Cloud Worker run locally and a fake media provider, on
loopback with no sign-in. Each case in `scripts/cloud-evals/cases/` names the design
cases it proves, its apps, its starting project, the person's request and its
checks. Pass or fail comes from the project afterwards and the recorded Renku
and provider calls, never from the transcript.

Build the Studio checkout first (`pnpm build` in `../studio`), and be signed
in to Claude Code and Codex. `--list` shows the cases; `--case <name|id>` and
`--app claude-code|codex` choose runs; `--studio <path>` points at another
checkout. Transcripts, records and check results stay in the folder the run
prints. Cases that need Blender or whisper are skipped where they are not
installed.

## Technical references

- [Contributor guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Studio source and contributor entrypoint](https://github.com/GoRenku/studio)
- [Studio CLI reference](https://github.com/GoRenku/studio/blob/main/docs/cli/commands.md)
- [Studio architecture](https://github.com/GoRenku/studio/blob/main/docs/architecture/README.md)
- [Codex permissions for Renku skills](docs/codex-renku-permissions.md)
