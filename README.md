# Renku Studio Skills

Filmmaking skills for agents working with Renku Studio: screenplay development,
visual design, casting, shot planning, and media production.

**For installation, tutorials, and usage, start at [gorenku.com](https://gorenku.com).**
To contribute to this repository, read [CONTRIBUTING.md](CONTRIBUTING.md).

## Relationship to Studio

This repository supplies the Renku agent plugin. Codex provides the agent
harness; the separately installed
[Studio runtime](https://github.com/GoRenku/studio) provides the `renku` CLI,
project context and storage, generation engines, and browser visualization app.
The skills invoke that CLI through the agent's local shell tools.

The split is deliberate: creative workflow guidance belongs here; domain
validation and durable project mutations belong in Studio core. Changes to CLI
commands or document contracts need coordinated updates in both repositories.
The plugin does not bundle the Studio runtime.

## Skill map

Each link opens the skill's instructions and its references. These are the
maintained workflow entrypoints, rather than a second set of tutorials here.

| Area | Skills |
| --- | --- |
| Direction | [Movie Director](skills/movie-director/SKILL.md) |
| Screenplay | [Drafter](skills/screenplay-drafter/SKILL.md), [Analyst](skills/screenplay-analyst/SKILL.md), [Supporting Material Importer](skills/screenplay-supporting-material-importer/SKILL.md), [PDF to FDX](skills/screenplay-pdf-to-fdx/SKILL.md) |
| Visual language | [Inspiration Analyzer](skills/inspiration-analyzer/SKILL.md), [Lookbook Designer](skills/lookbook-designer/SKILL.md) |
| Cast and sets | [Casting Director](skills/casting-director/SKILL.md), [Production Designer](skills/production-designer/SKILL.md), [Location World Producer](skills/location-world-producer/SKILL.md) |
| Scene and shot planning | [Scene Beat Designer](skills/scene-beat-designer/SKILL.md), [Shot Planner](skills/shot-planner/SKILL.md), [Blender Shot Planner](skills/blender-shot-planner/SKILL.md) |
| Media workflow | [Media Producer](skills/media-producer/SKILL.md) |
| Model research and curation | [Model Researcher](skills/model-researcher/SKILL.md) |
| Provider execution | [Fal.ai](skills/fal-ai-media-provider/SKILL.md), [ElevenLabs](skills/elevenlabs-media-provider/SKILL.md), [Pika](skills/pika-media-provider/SKILL.md), [Replicate](skills/replicate-media-provider/SKILL.md), [WaveSpeed](skills/wavespeed-media-provider/SKILL.md) |

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
- `scripts/`: repository validation and maintainer release tooling.
- `docs/`: technical integration notes.

## Validation

This is a dependency-free, single-package repository. Node.js runs the validation
scripts; pnpm 11.7.0 is pinned in [`package.json`](package.json). No dependency
installation is needed.

| Command | Purpose |
| --- | --- |
| `pnpm test` | Validate media-generation skills, image/video prompt guides, media-purpose evaluations, and run supporting-script and release-tool tests. |
| `pnpm test:media-generation` | Run the media-generation checks without the release-tool tests. |
| `pnpm release:test` | Test release tooling only; does not create or publish a release. |

These checks do not evaluate every creative workflow. Review affected skill
instructions, CLI examples, and evaluation scenarios against Studio's current
implementation as part of each change. Release creation and publishing are
maintainer responsibilities.

## Technical references

- [Contributor guide](CONTRIBUTING.md)
- [Studio source and contributor entrypoint](https://github.com/GoRenku/studio)
- [Studio CLI reference](https://github.com/GoRenku/studio/blob/main/docs/cli/commands.md)
- [Studio architecture](https://github.com/GoRenku/studio/blob/main/docs/architecture/README.md)
- [Codex permissions for Renku skills](docs/codex-renku-permissions.md)
