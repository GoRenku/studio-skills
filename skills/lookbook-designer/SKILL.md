---
name: lookbook-designer
description: Create or revise Renku Studio Production Lookbooks and Storyboard Lookbooks from project context, user direction, and optional Inspiration analyses, then validate and persist the Lookbook through the Renku CLI.
---

# Lookbook Designer

Use this skill to create or revise a Renku Studio Visual Language Lookbook as a durable project direction.

Renku has two Lookbook types:

- A Production Lookbook is the movie's cinematic visual language: thesis, palette, tone and mood, composition, lighting, texture, and camera guidance.
- A Storyboard Lookbook is the drawing/reference language for storyboard generation: style brief, line and finish, value and accent, panel and notation, continuity and clarity, and guardrails.

Do not blur the two. Production Lookbooks guide the finished-film look. Storyboard Lookbooks guide how storyboard panels are drawn and must be practical enough to turn into image-generation instructions.

## Start Here

1. Resolve the Renku project.
2. Read the Production and Storyboard role resources.
3. Decide whether the user wants the Production role, the Storyboard role, media import, or brainstorming only.
4. Gather source context from the user's direction, Inspiration folders, existing analyses, raw folder images, named references, screenplay context, or existing Lookbooks.
5. Write a complete `kind: "productionLookbook"` or `kind: "storyboardLookbook"` JSON document.
6. Validate through the Renku CLI.
7. Apply through the Renku CLI. Apply creates an unauthored role or updates the existing role while preserving its id.
8. Read back and confirm what changed.

Ask only when a missing choice materially changes the Lookbook. If the user wants momentum, make a clear assumption and proceed.

## Project Preflight

For an existing project:

```bash
renku project open <project-name> --json
```

Read both project Lookbook roles:

```bash
renku lookbook show --kind production --json
renku lookbook show --kind storyboard --json
```

An unauthored role returns `CORE_LOOKBOOK_NOT_AUTHORED`; that means the role is empty, not unselected. Read an authored role before revising it:

```bash
renku lookbook show --kind <production|storyboard> --json
```

## Decide The Role

Author the Production Lookbook when the user asks for the film visual direction or describes references for the final moving image.

Author the Storyboard Lookbook when the user asks how storyboards should be drawn, wants storyboard style consistency, or needs a reference sheet for `scene.storyboard-sheet` generation.

Revise an authored role only when the user asks to change that project direction. Preserve continuity: keep what still works and intentionally change the requested parts. There are no same-role alternatives and no selection step.

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

Apply:

```bash
renku lookbook apply --file <lookbook-json> --json
```

Read back:

```bash
renku lookbook show --kind <production|storyboard> --json
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
- Give every Production Lookbook `pattern` and `observation` a stable, Lookbook-unique `id` (e.g. `composition-clinical-symmetry`) so example images can be anchored to the exact point. Storyboard sections are single-point and take no `id`.
- Do not attach example images by editing Lookbook JSON.
- Use `media-producer` for generating purpose-specific Lookbook images and sheets.
- Use `renku media import --purpose lookbook.image --target lookbook:<lookbook-id>` only when attaching a file that is not already a Lookbook image. Capture `ownerRecord.id` from the import report, then apply placement through `renku lookbook image set-placement --image <ownerRecord.id> ...`.
- For Production Lookbook point evidence, pass `--anchor <point-id>` to `lookbook image set-placement` and include the point-owning section in `--sections`. Additional sections remain section-level placements, e.g. `--sections thesis,texture --anchor texture-cannon-material-states` shows the image under Thesis and beside that Texture point.
- Production `thesis` is a single-image slot. Placing an image with `--sections thesis` replaces the previous Thesis placement without discarding that previous image or removing its other placements. Other Production section and point placements append until the slot has 10 images.
- Use `renku lookbook image set-placement --image <lookbook-image-id> --sections <section>[,<section>] [--anchor <point-id>] --json` to retag or re-anchor an existing Lookbook image with the same placement rules.
- Never discard and re-import a Lookbook image merely to change its section or point placement. `renku lookbook image discard` is only for intentional removal requested by the user.
- Validate before apply.
- Read the existing Lookbook before updating it.
- Do not invent source Inspiration folder IDs. Use IDs returned by the CLI.
- Do not write theoretical Storyboard Lookbook prose that cannot become visible image-generation instructions.

## Quality Bar

- Make the Lookbook a project direction, not a reference summary.
- Synthesize sources into the user's movie.
- Write for both the user and generation agents.
- For Production Lookbooks, use concrete cinematography language: color separation, exposure, contrast, shadow behavior, blocking, lens feel, movement, texture, and production surface.
- For Storyboard Lookbooks, use concrete drawing and board language: line weight, finish level, value range, accent color, panel layout, notation, silhouette clarity, crop behavior, continuity checks, and what to avoid.
- Include repeatable principles and patterns.
- Treat named references and source influences with careful language unless the user supplied confirmed facts.
