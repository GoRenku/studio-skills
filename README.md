# Renku

Renku is an agent-first movie-making product for Codex. This repository contains
the agent plugin; the separately installed Renku runtime supplies the required CLI and local
browser Studio.

This repo is meant to grow into a collection of filmmaking skills for writing, development, pre-production, production planning, and related creative workflows.

The included skills cover screenplay drafting, Visual Language Inspiration
analysis, Lookbook design, media production, and scene shot design.

## Included Skills

### Screenplay Drafter

```text
skills/screenplay-drafter/
  SKILL.md
  agents/openai.yaml
  references/screenplay-yaml-schema.md
```

Screenplay Drafter helps writers move from a rough story idea to:

- Project metadata, logline, summary, dramatic question, and themes
- A story arc with acts and key inflection points
- Cast folders with front-matter Markdown for names, roles, wants, needs, voice notes, arcs, and long descriptions
- Location folders with front-matter Markdown for names, time periods, descriptions, and visual notes
- Act YAML files made from scene settings and renderer-friendly blocks: action with optional `@id` mentions, dialogue with `cast_id`, voiceover, montage headings, title cards, supers, transitions, and notes

The output is a small screenplay package so a later renderer can turn it into a traditional screenplay document.

Invoke it in Codex with:

```text
$screenplay-drafter
```

Example prompt:

```text
$screenplay-drafter help me create a 5-minute family fantasy short about a child who discovers an abandoned mountain tunnel connected to a forgotten railway.
```

### Screenplay PDF to FDX

```text
skills/screenplay-pdf-to-fdx/
  SKILL.md
  agents/openai.yaml
  references/conversion-manifest.md
  scripts/
```

Screenplay PDF to FDX reconstructs a conventionally formatted screenplay PDF
as editor-ready Final Draft XML when ordinary PDF import garbles the screenplay
structure. It renders every page for review, extracts line geometry, builds FDX
from a reviewed semantic manifest, reconciles the source text, and validates the
result before delivery.

Invoke it in Codex with:

```text
$screenplay-pdf-to-fdx
```

Example prompt:

```text
$screenplay-pdf-to-fdx convert the downloaded Sintel screenplay PDF to a validated FDX without changing the screenplay text.
```

### Inspiration Analyzer

```text
skills/inspiration-analyzer/
  SKILL.md
  agents/openai.yaml
  references/inspiration-analysis-cli-workflow.md
  references/inspiration-analysis-json-contract.md
  references/cinematography-analysis-guidelines.md
  samples/analysis.json
```

Inspiration Analyzer helps agents analyze a Renku Studio Visual Language
Inspiration folder from the user's stored image files.

It uses:

- the Renku CLI to open the project, find the Inspiration folder, validate the
  analysis JSON, and persist it;
- the folder name as a hint when it appears to name a movie, director,
  cinematographer, photographer, painter, period, location, or visual movement;
- normal filesystem commands to inspect the image files inside the folder;
- a schema-validated `kind: "inspirationAnalysis"` JSON document.

Invoke it in Codex with:

```text
$inspiration-analyzer
```

Example prompt:

```text
$inspiration-analyzer analyze the Blade Runner 2049 Inspiration folder in my current Renku project.
```

### Lookbook Designer

```text
skills/lookbook-designer/
  SKILL.md
  agents/openai.yaml
  references/lookbook-cli-workflow.md
  references/lookbook-json-contract.md
  references/lookbook-design-guidelines.md
  references/using-inspiration-sources.md
  samples/create-lookbook.json
  samples/update-lookbook.json
  samples/source-inspirations.json
  samples/reference-driven-lookbook.json
```

Lookbook Designer helps agents create or revise Renku Studio Visual Language
Lookbooks from user direction, Inspiration folders, Inspiration analyses, raw
folder images, named references, screenplay context, or existing Lookbooks.

It uses:

- the Renku CLI to show, validate, apply, discard, and read the two project Lookbook roles;
- Inspiration commands to discover source folders and analyses;
- normal shell commands inside returned folder paths to inspect grabs;
- schema-validated Production and Storyboard Lookbook JSON documents;
- Lookbook image commands for generated example placement.

Invoke it in Codex with:

```text
$lookbook-designer
```

Example prompt:

```text
$lookbook-designer create the Production Lookbook from the Substance Inspiration folder, but use acid green to mean tenderness becoming contamination.
```


### Scene Beat Designer

```text
skills/scene-beat-designer/
  SKILL.md
  agents/openai.yaml
  references/scene-beats-cli-workflow.md
  references/scene-beats-json-contract.md
  references/beat-design-guidelines.md
  samples/scene-beats.json
  samples/scene-beats-operations.json
```

Scene Beat Designer helps agents create and revise durable Renku Studio Scene Beats and hand missing Beat storyboard images to Media Producer.

It uses:

- the Renku CLI to read Scene Beats context, validate creative Beat input, create/reset immutable revisions, and select an active revision;
- active Lookbook text, referenced Cast Members, referenced Locations, and user direction to design narrative Beats;
- schema-validated Scene Beats and focused operations JSON documents;
- `scene.storyboard-sheet` handoff for optional Beat storyboard images.

Invoke it in Codex with:

```text
$scene-beat-designer
```

Example prompt:

```text
$scene-beat-designer design the narrative Beats for the current scene and save them to the project.
```

### Media Producer

```text
skills/media-producer/
  SKILL.md
  references/
  samples/
```

Media Producer helps agents create, inspect, and import purpose-specific Renku
Studio media. Every request begins with the Core-owned deterministic generation
context for the exact purpose and target. That report supplies current Project
facts and advisory relationship-derived reference suggestions; it informs the
agent without limiting its creative choices. Media Producer then chooses a
provider model and input mode conversationally, reads the provider's current
native operation facts, authors one temporary review document, previews the
exact request when required, executes it through the selected provider Skill,
inspects the result, and uses only the focused attachment command for the
requested purpose. Generation never implies attachment.

The Pika Media Provider skill is an Image/Video execution lane for Media
Producer. It curates four initial operations, reads each selected operation's
raw live schema before request authoring, preserves annotated local references
for review, and delegates upload, submission, recovery, and download to Renku's
standalone Engines runtime.

### Location World Producer

```text
skills/location-world-producer/
  SKILL.md
  agents/openai.yaml
  references/workflow.md
  samples/location-world-generation.json
```

Location World Producer coordinates one reviewed equirectangular panorama or an
explicit same-space reconstruction image set, requires approval for one paid
World Labs Marble request, and reads back the selected durable SPZ World. It
reuses common Asset history for rollback and leaves source generation to Media
Producer.

## Install In Codex

Install the Renku runtime first:

```bash
curl -fsSL https://downloads.gorenku.com/install.sh | sh
```

On Windows PowerShell:

```powershell
irm https://downloads.gorenku.com/install.ps1 | iex
```

Add the released Renku marketplace channel once:

```bash
codex plugin marketplace add GoRenku/studio-skills --ref beta
```

Install Renku through either supported Codex host:

- In Codex CLI, enter `/plugins`, select the `renku` marketplace, open Renku,
  and install it. The equivalent direct command is
  `codex plugin add renku@renku`.
- In Codex in the ChatGPT desktop app, open the Plugins tab, select the
  personal `renku` marketplace, open Renku, and install it.

Start a new task or CLI session after installation so the Renku skills are
loaded. The skills invoke the separately installed `renku` command through the
host's normal local shell capability.

To refresh the released marketplace snapshot later, run:

```bash
codex plugin marketplace upgrade renku
```

After a marketplace refresh, inspect the installed Renku version in the plugin
browser. Reinstall Renku there if the installed version did not advance, then
start a new task or CLI session.

For reliable Studio refreshes, media imports, temporary file work, and optional
live generation providers, configure a Renku Codex permission profile:

- [Codex Permissions For Renku Skills](docs/codex-renku-permissions.md)

## Repository Validation And Release

This is a single-package skills repository with dependency-free Node.js scripts.
pnpm is used only to run those scripts; do not run `pnpm install` or add package
dependencies without deliberately revisiting the repository configuration and
committing a real lockfile.

Run validation with:

```bash
pnpm test
pnpm release:test
```

Prepare and publish releases with the existing `pnpm release`,
`pnpm release:minor`, `pnpm release:major`, and `pnpm release:publish` commands.
