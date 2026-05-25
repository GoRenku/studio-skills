---
name: lookbook-designer
description: Create or revise Renku Studio Visual Language Lookbooks from project context, user direction, and optional Inspiration analyses, then validate and persist the Lookbook through the Renku CLI.
---

# Lookbook Designer

Use this skill to create or revise a Renku Studio Visual Language Lookbook as a durable project direction.

A Lookbook is not a neutral analysis. It is the movie's working visual language: thesis, palette, tone and mood, composition, lighting, texture, and camera guidance that a user and later generation agents can apply consistently.

## Start Here

1. Resolve the Renku project.
2. Read existing Lookbooks.
3. Decide whether the user wants a new Lookbook, an update, active-state change, example-image attachment, or brainstorming only.
4. Gather source context from the user's direction, Inspiration folders, existing analyses, raw folder images, named references, screenplay context, or existing Lookbooks.
5. Write a complete `kind: "lookbook"` JSON document.
6. Validate through the Renku CLI.
7. Create or update through the Renku CLI.
8. Read back and confirm what changed.

Ask only when a missing choice materially changes the Lookbook. If the user wants momentum, make a clear assumption and proceed.

## Project Preflight

For an existing project:

```bash
renku project open <project-name> --json
```

Read existing Lookbooks:

```bash
renku lookbook list --json
```

For updates, read the target Lookbook first:

```bash
renku lookbook show --lookbook <lookbook-id> --json
```

## Decide Create Or Update

Create a new Lookbook when the user asks for a new visual direction, compares multiple possible looks, or describes a fresh reference blend.

Update an existing Lookbook only when the user asks to revise that Lookbook or the active Lookbook. Preserve continuity: keep what still works and intentionally change the requested parts.

Set active only when the user asks for it or clearly wants the Lookbook to become the project direction:

```bash
renku lookbook set-active --lookbook <lookbook-id> --json
```

## Use Inspiration Sources

If the user names one or more Inspiration folders:

```bash
renku inspiration list --json
renku inspiration show --folder <folder-id> --json
renku inspiration analysis show --folder <folder-id> --json
```

Use the returned folder name, folder path, and analysis. Do not expect image lists from the CLI. The folder path is enough.

To inspect grabs, use shell commands inside the returned path:

```bash
cd "<folder.absolutePath>"
find . -maxdepth 1 -type f
```

If an Inspiration folder has no analysis, either ask to run `inspiration-analyzer` first or inspect the folder images directly when the user wants momentum.

## Validate And Persist

Create a JSON file that matches `references/lookbook-json-contract.md`.

Validate:

```bash
renku lookbook validate --file <lookbook-json> --json
```

Create:

```bash
renku lookbook create --name <name> --file <lookbook-json> --json
```

Update:

```bash
renku lookbook update --lookbook <lookbook-id> --file <lookbook-json> --json
```

Read back:

```bash
renku lookbook show --lookbook <lookbook-id> --json
```

## Reference Files

- Read `references/lookbook-cli-workflow.md` for command order and report handling.
- Read `references/lookbook-json-contract.md` before writing JSON.
- Read `references/using-inspiration-sources.md` when the user names Inspiration folders or existing analyses.
- Read `references/lookbook-design-guidelines.md` before writing or revising visual language.
- Use `samples/create-lookbook.json`, `samples/update-lookbook.json`, `samples/source-inspirations.json`, and `samples/reference-driven-lookbook.json` as structural examples only.

## Non-Negotiables

- Do not write directly to `.renku/project.sqlite`.
- Do not add or depend on image lists in Inspiration CLI results. Use returned folder paths and shell commands.
- Do not register Inspiration folder images as assets.
- Do not store `imageFiles` in Lookbook JSON.
- Do not attach example images by editing Lookbook JSON.
- Use Lookbook image commands for generated example placement.
- Validate before create or update.
- Read the existing Lookbook before updating it.
- Do not overwrite a user's Lookbook unless the user asked for that Lookbook to be updated.
- Do not set a Lookbook active unless the user asked or the workflow explicitly requires it.
- Do not invent source Inspiration folder IDs. Use IDs returned by the CLI.

## Quality Bar

- Make the Lookbook a project direction, not a reference summary.
- Synthesize sources into the user's movie.
- Write for both the user and generation agents.
- Use concrete cinematography language: color separation, exposure, contrast, shadow behavior, blocking, lens feel, movement, texture, and production surface.
- Include repeatable principles and patterns.
- Treat named references and source influences with careful language unless the user supplied confirmed facts.
