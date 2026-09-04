---
name: screenplay-supporting-material-importer
description: Import opaque supporting files into a Renku Studio Project for later Screenplay, Cast Member, Location, and Prop authoring. Use when the user wants to add research, notes, PDFs, Markdown, DOCX, images of text, or any other contextual source without making the import itself mutate creative artifacts.
---

# Screenplay Supporting Material Importer

This skill requires the installed Renku runtime. If `renku` is unavailable,
stop and direct the user to `https://gorenku.com`; do not copy files into a
Project or invent Asset records outside the CLI.

## Project Workspace

Keep every agent-created working file inside the current Project's categorized
`tmp/` tree. Never create operation JSON, Generation Specs, import manifests,
QA images, downloads, crops, or scratch files at the Project root.

- Use `tmp/operations/` for CLI authoring documents, including create, update,
  design, analysis, Lookbook, Scene Beats, Shot Plan, and import JSON.
- Use `tmp/operations/media-generation/` for Media Producer review and
  provenance documents.
- Use `tmp/media/` for temporary generated, downloaded, transformed, or cropped
  media; use `tmp/qa/` for review evidence and `tmp/scratch/` for other temporary
  inputs.
- Create category folders lazily. Let Renku commands copy accepted content into
  durable owner folders; never construct durable asset paths in the skill.
- Keep an external user source outside the Project when possible. If a temporary
  in-Project copy is necessary, place it under `tmp/scratch/`.

Use this skill only to import source files and hand their durable Asset results
back to the user or owning authoring skill. Read `references/workflow.md` before
importing or coordinating an enrichment pass.

## Start Here

1. Resolve the current Project:

```bash
renku project current --json
```

2. Import each user-supplied file separately with its absolute path:

```bash
renku screenplay supporting-material import \
  --file /absolute/path/to/source \
  --json
```

3. Preserve each typed `imported` or `unchanged` result. Never preflight or
   reject a file based on extension, MIME type, contents, or size.

4. When the user asks to draft or explicitly revise the screenplay from these
   sources, hand off to `screenplay-drafter`. For character, location, or prop
   enrichment, hand off to `casting-director` or `production-designer`. This
   importer does not author or automatically update those artifacts.

## Boundaries

- Supporting material may be imported into any Renku Project before or after
  screenplay authoring. Do not require FDX ownership or any screenplay content.
- Never parse, convert, summarize, rename, or copy a source before import. Core
  retains the exact bytes and allocates the durable path.
- A changed edition is a new immutable source Asset. Do not replace an earlier
  source or treat matching filenames as identity.
- Raw supporting files stop after Screenplay, Cast Member, Location, and Prop
  authoring. Do not pass their paths or copied contents to Media Producer,
  Character Sheet, Cast Profile, Location/Prop media, Scene Beats, Shot Plans,
  Lookbooks, storyboards, generation context, or Screenplay Analysis.
