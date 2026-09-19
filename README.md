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
| Installation | [Install Renku](skills/install-renku/SKILL.md) |
| Direction | [Movie Director](skills/movie-director/SKILL.md) |
| Screenplay | [Drafter](skills/screenplay-drafter/SKILL.md), [Analyst](skills/screenplay-analyst/SKILL.md), [Supporting Material Importer](skills/screenplay-supporting-material-importer/SKILL.md), [PDF to FDX](skills/screenplay-pdf-to-fdx/SKILL.md) |
| Visual language | [Inspiration Analyzer](skills/inspiration-analyzer/SKILL.md), [Lookbook Designer](skills/lookbook-designer/SKILL.md) |
| Cast and sets | [Casting Director](skills/casting-director/SKILL.md), [Production Designer](skills/production-designer/SKILL.md), [Location World Producer](skills/location-world-producer/SKILL.md) |
| Scene and shot planning | [Scene Beat Designer](skills/scene-beat-designer/SKILL.md), [Shot Planner](skills/shot-planner/SKILL.md), [Blender Shot Planner](skills/blender-shot-planner/SKILL.md) |
| Media workflow | [Media Producer](skills/media-producer/SKILL.md) |
| Model research and curation | [Model Researcher](skills/model-researcher/SKILL.md) |
| Provider execution | [Fal.ai](skills/fal-ai-media-provider/SKILL.md), [ElevenLabs](skills/elevenlabs-media-provider/SKILL.md), [Pika](skills/pika-media-provider/SKILL.md), [Replicate](skills/replicate-media-provider/SKILL.md), [WaveSpeed](skills/wavespeed-media-provider/SKILL.md) |

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

### Personal media models

`model-researcher` adds or refreshes a three-field personal route and optional
Markdown shared across Projects. Use a runtime exposing `renku generation models`;
the first supporting release version will be recorded when published. Runtime and
plugin releases remain independent. Personal content lives at CLI-returned global
paths outside either installation. Media Producer discovers personal routes and
prepares requests using current schemas and optional bundled/personal advice.

For maintainer curation, explicitly ask Model Researcher to add or refresh a
model in the Studio Skills distribution. Its
[bundled authoring workflow](skills/model-researcher/references/bundled-authoring.md)
edits the source checkout's existing route indexes and model guides, validates
the changes, and leaves them ready for review and the normal plugin release.
Personal additions remain the default; bundled authoring does not change the
personal library or publish a release.
