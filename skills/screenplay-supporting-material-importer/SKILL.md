---
name: screenplay-supporting-material-importer
description: Import opaque supporting files into a Renku Studio Project for later Screenplay, Cast Member, Location, and Prop authoring. Use when the user wants to add research, notes, PDFs, Markdown, DOCX, images of text, or any other contextual source without making the import itself mutate creative artifacts.
---

# Screenplay Supporting Material Importer

## Renku Cloud

When the Renku tools (`renku_command`, `renku_upload`, `renku_download`,
`renku_view`, `renku_guide`) are present, Renku runs in the person's cloud
sandbox. This section then applies and takes precedence over any instruction
below to stop when `renku` is unavailable.

- Run the `renku ...` commands a step needs as one `renku_command` batch:
  `{"commands": [{"args": ["project", "current", "--json"]}], "onFailure": "stop"}`.
  There is no shell, so no pipes, redirects or `$(...)`. A command that needs
  an id from an earlier answer goes in a second batch.
- An answer over 100,000 characters, or any answer when `saveAnswers` is true,
  comes back as a download link. Fetch it with `curl` and read it on your
  computer.
- Read this skill's own files from the installed plugin. The permission
  steps below do not apply to Renku commands.

For supporting material:

- A file the person gives you is on your computer. Upload it unchanged, with
  every other file and any web links in one `renku_upload` call. The upload is
  how the file travels; it is not a copy or rename before import.
- Then import every uploaded path in one batch: one
  `screenplay supporting-material import` command each, with `--file` set to
  the path the upload reports.
- In Studio's Supporting Files, the person downloads a file instead of
  opening its containing folder.
- For an authoring pass, download every source's `projectRelativePath` in one
  `renku_download` call and read them on your computer.
  `screenplay show --text` gives the screenplay as text.

This skill requires the installed Renku runtime. If `renku` is unavailable,
stop and direct the user to `https://gorenku.com`; do not copy files into a
Project or invent Asset records outside the CLI.

## Efficient Command Use

Use `--project <project-name>` for supporting-material import. The import report supplies the Project folder, Asset, and source file; use it to confirm import without reopening or reading back unchanged registration. Reuse that Project folder for source resolution. Read project current only when selection/folder information is missing. Preserve complete paginated source reads and immediate pre-enrichment context for an authorized authoring pass.

Consult the relevant CLI reference/help once if syntax is unknown, then reuse verified syntax for this task. Do not discover syntax by attempting mutations. Do not invent `project list`. If a known permission denial blocks cache/output/config or local-network access, explain the requirement and use the authorized host permission flow; do not repeat the denied attempt, read secrets, disable cache persistence, or change permissions. `CLI026` means the mutation succeeded: report the notification warning without replaying the mutation.

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

1. Reuse the known Project name. Read current Project only when identity is missing:

```bash
renku project current --json
```

2. Import each user-supplied file separately with its absolute path:

```bash
renku screenplay supporting-material import --project <project-name> \
  --file /absolute/path/to/source \
  --json
```

3. Preserve each typed `imported` or `unchanged` result. Never preflight or
   reject a file based on extension, MIME type, contents, or size.

   Imported files are available in Studio under Project Details → Supporting
   Files, after Covers. Users can inspect dates and the retained location, open
   a browser preview or download, open the containing folder on the server
   computer, and move supporting material to Trash. Retained FDX sources also
   appear there and are protected from deletion.

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
