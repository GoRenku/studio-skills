# Renku

Renku is a Codex and Claude Code plugin library for movie-making workflows.

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
  references/beat-sheet-cli-workflow.md
  references/scene-beat-sheet-json-contract.md
  references/beat-design-guidelines.md
  samples/scene-beat-sheet.json
  samples/scene-beat-sheet-operations.json
```

Scene Beat Designer helps agents create durable Renku Studio Scene Beat Sheets and hand missing or stale Beat storyboard images to Media Producer.

It uses:

- the Renku CLI to read Beat Sheet context, validate Beat JSON, write history entries, and set the active Beat Sheet;
- active Lookbook text, referenced Cast Members, referenced Locations, and user direction to design narrative Beats;
- schema-validated `kind: "sceneBeatSheet"` JSON documents;
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
Studio media. It reads the Core-owned purpose context and current model
descriptors, authors one generic `GenerationSpec`, assigns every exact
reference through `providerField`, validates and previews the exact request, and
estimates it before asking for paid-run approval. After generation, it inspects
the output and uses only the focused attachment command for the requested
purpose; generation never implies attachment.

## Install In Codex

For local development, add this repository as a Codex plugin marketplace:

```bash
codex plugin marketplace add GoRenku/renku --ref main
```

Then open Codex's plugin directory and install `renku` from the `Renku` marketplace.

For reliable Studio refreshes, media imports, temporary file work, and optional
live generation providers, configure a Renku Codex permission profile:

- [Codex Permissions For Renku Skills](docs/codex-renku-permissions.md)

## Install In Claude Code

From Claude Code:

```text
/plugin marketplace add GoRenku/renku
/plugin install renku@renku
/reload-plugins
```

Then ask Claude Code to use the relevant Renku skill, such as Screenplay Drafter.
