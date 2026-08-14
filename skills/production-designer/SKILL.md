---
name: production-designer
description: Create and revise Renku Studio Location and Prop facts, Location Design and Prop Design documents, set dressing, atmosphere, continuity guidance, and Location/Prop media readiness. Use when the user asks for production design, locations, spatial design, props, set dressing, or atmosphere.
---

# Production Designer

This skill requires the installed Renku runtime. If `renku` is unavailable, stop and direct the user to `https://gorenku.com`; do not substitute ad hoc files for the CLI-owned project state.

## Project Workspace

Keep every agent-created working file inside the current Project's categorized
`tmp/` tree. Never create operation JSON, Generation Specs, import manifests,
QA images, downloads, crops, or scratch files at the Project root.

- Use `tmp/operations/` for CLI authoring documents, including create, update,
  design, analysis, Lookbook, Scene Beats, Shot Plan, and import JSON.
- Use `tmp/specs/` for Generation Specs and `tmp/receipts/` for provider receipts.
- Use `tmp/media/` for temporary generated, downloaded, transformed, or cropped
  media; use `tmp/qa/` for review evidence and `tmp/scratch/` for other temporary
  inputs.
- Create category folders lazily. Let Renku commands copy accepted content into
  durable owner folders; never construct durable asset paths in the skill.
- Keep an external user source outside the Project when possible. If a temporary
  in-Project copy is necessary, place it under `tmp/scratch/`.


Use this skill for Renku Studio production-design work. It owns Location and
Prop facts plus their department designs, then hands media generation to
`media-producer`.

Do not route continuity-subject changes through screenplay operations. The
canonical mutation paths are `renku location` and `renku prop`.

## Start Here

1. Resolve the current project:

```bash
renku project current --json
```

2. For location-level work, read context:

```bash
renku production-design location context --location <location-id> --json
```

For Prop work, read:

```bash
renku prop context --prop <prop-id> --json
renku production-design prop context --prop <prop-id> --json
```

3. If a fact needs to change, validate and dry-run the matching
   `locationOperations` or `propOperations` document before applying it.

```bash
renku location validate --file tmp/operations/location-operations.json --json
renku location apply --file tmp/operations/location-operations.json --dry-run --json
renku location apply --file tmp/operations/location-operations.json --json
```

When this work follows FDX import, use exact Scene-heading, tag, and screenplay
text candidates as evidence. Ask the user before splitting or merging composite
settings, or promoting a mentioned object into a durable Prop. Author accepted
facts through `renku location`/`renku prop`, then hand their durable ids back
for focused Screenplay setting, mention, or presence references. Never ask the
importer to create or bind those facts.

4. Write durable Location Design or Prop Design documents through
   `renku production-design`.

5. Hand off Location Sheet/Hero or Prop Sheet/Hero generation to
   `media-producer`.

## Reference Files

- Read `references/location-authoring.md` for Location fact commands.
- Read `references/location-design.md` before writing Location Design JSON.
- Read `references/prop-authoring.md` for Prop fact commands.
- Read `references/prop-design.md` before writing Prop Design JSON.
- Read `references/media-and-scene-beats-handoff.md` before asking for Location Sheets.

## Boundaries

- Location Design is not a shot list.
- Generated files, asset ids, and media paths do not belong in Location Design JSON.
- Keep location-local set dressing in `recurringObjects`. Do not infer or
  promote those entries into first-class Props.
- Prop Sheets are request-scoped references; Prop Heroes are the only
  canonical Prop image selection.
- FDX candidates are non-authoritative evidence. Do not infer facts from them
  automatically and do not report ScriptNotes or formatting exclusions.
