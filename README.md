# Renku

Renku is a Codex and Claude Code plugin library for movie-making workflows.

This repo is meant to grow into a collection of filmmaking skills for writing, development, pre-production, production planning, and related creative workflows.

The first included skill is `screenplay-drafter`, which creates structured YAML screenplay drafts in formal screenplay format.

## Included Skills

### Screenplay Drafter

```text
skills/screenplay-drafter/
  SKILL.md
  agents/openai.yaml
  references/screenplay-yaml-schema.md
```

Screenplay Drafter helps writers move from a rough story idea to:

- A proposed title, logline, summary, and dramatic question
- A story arc with acts and key inflection points
- Characters, wants, needs, voice notes, and arcs
- Locations with slugline-ready names and visual notes
- Screenplay scenes made from renderer-friendly blocks: scene headings, action, dialogue, voiceover, montage headings, transitions, and notes

The output is YAML so a later renderer can turn it into a traditional screenplay document.

Invoke it in Codex with:

```text
$screenplay-drafter
```

Example prompt:

```text
$screenplay-drafter help me create a 5-minute family fantasy short about a child who discovers an abandoned mountain tunnel connected to a forgotten railway.
```

## Install In Codex

For local development, add this repository as a Codex plugin marketplace:

```bash
codex plugin marketplace add GoRenku/renku --ref main
```

Then open Codex's plugin directory and install `renku` from the `Renku` marketplace.

## Install In Claude Code

From Claude Code:

```text
/plugin marketplace add GoRenku/renku
/plugin install renku@renku
/reload-plugins
```

Then ask Claude Code to use the relevant Renku skill, such as Screenplay Drafter.
