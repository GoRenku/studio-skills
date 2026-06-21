---
name: lookbook-designer
description: Create or revise Renku Studio Movie Lookbooks and Storyboard Lookbooks from project context, user direction, and optional Inspiration analyses, then validate and persist the Lookbook through the Renku CLI.
---

# Lookbook Designer

Use this skill to create or revise a Renku Studio Visual Language Lookbook as a durable project direction.

Renku has two Lookbook types:

- A Movie Lookbook is the movie's cinematic visual language: thesis, palette, tone and mood, composition, lighting, texture, and camera guidance.
- A Storyboard Lookbook is the drawing/reference language for storyboard generation: style brief, line and finish, value and accent, panel and notation, continuity and clarity, and guardrails.

Do not blur the two. Movie Lookbooks guide the finished-film look. Storyboard Lookbooks guide how storyboard panels are drawn and must be practical enough to turn into image-generation instructions.

## Start Here

1. Resolve the Renku project.
2. Read existing Lookbooks.
3. Decide whether the user wants a Movie Lookbook, a Storyboard Lookbook, an update, a typed selection change, media import, or brainstorming only.
4. Gather source context from the user's direction, Inspiration folders, existing analyses, raw folder images, named references, screenplay context, or existing Lookbooks.
5. Write a complete `kind: "movieLookbook"` or `kind: "storyboardLookbook"` JSON document.
6. Validate through the Renku CLI.
7. Create or update through the Renku CLI.
8. Select the Lookbook for its type only when intended.
9. Read back and confirm what changed.

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

## Decide Type, Create, Or Update

Create a Movie Lookbook when the user asks for a new film visual direction, compares cinematic looks, or describes references for the final moving image.

Create a Storyboard Lookbook when the user asks how storyboards should be drawn, wants storyboard style consistency, or needs a reference sheet for `scene.storyboard-sheet` generation.

Update an existing Lookbook only when the user asks to revise that Lookbook or the currently selected Lookbook of that type. Preserve continuity: keep what still works and intentionally change the requested parts.

Select a Lookbook only when the user asks for it or clearly wants that Lookbook to become the current project direction for its type:

```bash
renku lookbook select --type movie --lookbook <lookbook-id> --json
renku lookbook select --type storyboard --lookbook <lookbook-id> --json
```

Use `clear-selection` only when the user wants to remove the selected Lookbook for one type:

```bash
renku lookbook clear-selection --type movie --json
renku lookbook clear-selection --type storyboard --json
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
renku lookbook create --file <lookbook-json> --json
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
- Use the sample JSON files as structural examples only.

## Non-Negotiables

- Do not write directly to `.renku/project.sqlite`.
- Do not add or depend on image lists in Inspiration CLI results. Use returned folder paths and shell commands.
- Do not register Inspiration folder images as assets.
- Do not store `imageFiles` in Lookbook JSON.
- Do not attach example images by editing Lookbook JSON.
- Use `media-producer` for generating purpose-specific Lookbook images and sheets.
- Use `renku media import --purpose lookbook.image --target lookbook:<lookbook-id>` for placing an existing generated or uploaded image into the Lookbook.
- Validate before create or update.
- Read the existing Lookbook before updating it.
- Do not select a Lookbook unless the user asked or the workflow explicitly requires it.
- Do not invent source Inspiration folder IDs. Use IDs returned by the CLI.
- Do not write theoretical Storyboard Lookbook prose that cannot become visible image-generation instructions.

## Quality Bar

- Make the Lookbook a project direction, not a reference summary.
- Synthesize sources into the user's movie.
- Write for both the user and generation agents.
- For Movie Lookbooks, use concrete cinematography language: color separation, exposure, contrast, shadow behavior, blocking, lens feel, movement, texture, and production surface.
- For Storyboard Lookbooks, use concrete drawing and board language: line weight, finish level, value range, accent color, panel layout, notation, silhouette clarity, crop behavior, continuity checks, and what to avoid.
- Include repeatable principles and patterns.
- Treat named references and source influences with careful language unless the user supplied confirmed facts.
