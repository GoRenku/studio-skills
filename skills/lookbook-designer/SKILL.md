---
name: lookbook-designer
description: Create or revise Renku Studio Production Lookbooks and Storyboard Lookbooks from project context, user direction, and optional Inspiration analyses, then validate and persist the Lookbook through the Renku CLI.
---

# Lookbook Designer

This skill requires the installed Renku runtime. If `renku` is unavailable, stop and direct the user to `https://gorenku.com`; do not substitute ad hoc files for the CLI-owned project state.

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


Use this skill to create or revise a Renku Studio Visual Language Lookbook as a durable project direction.

Renku has two Lookbook types:

- A Production Lookbook is the movie's cinematic visual language: thesis, palette, tone and mood, composition, lighting, texture, and camera guidance.
- A Storyboard Lookbook is the sole appearance language for Beat Storyboard
  generation: style brief, line and finish, value and accent, and guardrails.
  It may be photorealistic, realistic, illustrative, graphic, painterly,
  hand-drawn, abstract, or another deliberate visual system.

Do not blur the two. Production Lookbooks guide the finished-film look.
Storyboard Lookbooks guide how Beat Storyboards are rendered and must be
  practical enough to turn into image-generation instructions. They may also
  define project-wide notation and continuity-clarity conventions, but they do
  not own panel staging, Shot coverage, camera direction, or Scene-specific
  continuity decisions.

## Start Here

For media-only generation from an existing Lookbook, resolve the requested role
and target if unknown, then route directly to `media-producer`. Its briefing
contains the authored definition and media; do not run the authoring preflight
below unless the task also changes the Lookbook definition.

1. Resolve the Renku project.
2. Read the Production and Storyboard role resources.
3. Decide whether the user wants the Production role, the Storyboard role, media import, or brainstorming only.
4. Gather source context from the user's direction, Inspiration folders, existing analyses, raw folder images, named references, screenplay context, or existing Lookbooks.
5. Write a complete `kind: "productionLookbook"` or `kind: "storyboardLookbook"` JSON document.
6. Use separate validation only for validation-only intent or a review pause.
7. Apply through the Renku CLI, which validates before writing. Apply creates an unauthored role or updates the existing role while preserving its id.
8. Confirm the returned Lookbook and changes; read back only for missing detail or uncertain state.

Ask only when a missing choice materially changes the Lookbook. If the user wants momentum, make a clear assumption and proceed.

When a Storyboard image request exposes an unauthored Storyboard Lookbook,
pause dependent work and ask whether the user wants to create the visual
language themselves first or have you propose one. Wait for their choice. If
they choose your proposal, present a concrete visual direction and obtain
confirmation before `lookbook apply` or media generation. Include a concrete
proposal in the initial question when available; one reply may confirm both
agent authoring and that direction. Reuse an already confirmed direction.
A broad Storyboard request, a generic `continue`, or a
preference for momentum does not authorize choosing this Project direction;
the assumption guidance above does not apply to this missing prerequisite.

## Project Preflight

For an existing project:

Use the known project name with `--project <project-name>`; no `project open` is needed.

Read both project Lookbook roles:

```bash
renku lookbook show --kind production --project <project-name> --json
renku lookbook show --kind storyboard --project <project-name> --json
```

An unauthored role returns `CORE_LOOKBOOK_NOT_AUTHORED`; that means the role is empty, not unselected. Reuse the authored role already read; refresh after relevant changes:

```bash
renku lookbook show --kind <production|storyboard> --project <project-name> --json
```

## Decide The Role

Author the Production Lookbook when the user asks for the film visual direction or describes references for the final moving image.

Author the Storyboard Lookbook when the user asks how Beat Storyboards should
look, wants Storyboard appearance consistency, or needs the appearance Sheet
required by `scene.storyboard-sheet` generation.

Revise an authored role only when the user asks to change that project direction. Preserve continuity: keep what still works and intentionally change the requested parts. There are no same-role alternatives and no selection step.

## Use Inspiration Sources

If the user names Inspiration folders, list only when the exact folder id is unknown; show includes the analysis:

```bash
renku inspiration list --project <project-name> --json
renku inspiration show --folder <folder-id> --project <project-name> --json
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

For validation-only requests or a review pause, validate without writing:

```bash
renku lookbook validate --file tmp/operations/lookbook.json --project <project-name> --json
```

Apply:

```bash
renku lookbook apply --file tmp/operations/lookbook.json --project <project-name> --json
```

Read back only if the mutation report lacks needed detail, the outcome is uncertain, or relevant state changed:

```bash
renku lookbook show --kind <production|storyboard> --project <project-name> --json
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
- Use the registered folder-owned AssetFile IDs; follow Media Producer for new reference imports.
- For generation review, pass direct image paths from an active Inspiration
  folder as `$file` references. Media Producer review supports these without
  per-image Asset registration; check reference availability diagnostics.
- Do not store `imageFiles` in Lookbook JSON.
- Give every Production Lookbook `pattern` and `observation` a stable, Lookbook-unique `id` (e.g. `composition-clinical-symmetry`) so example images can be anchored to the exact point. Storyboard sections are single-point and take no `id`.
- Do not attach example images by editing Lookbook JSON.
- Use `media-producer` for generating purpose-specific Lookbook images and sheets.
- Use `renku media import --purpose lookbook.image --target
  lookbook:<lookbook-id> --select` when attaching an accepted file that should
  also become the canonical card image. Omit `--select` for an unselected
  example. Capture `ownerRecord.id` from the import report for placement; use
  common `assetFile.id` only for later `renku asset select`.
- For Production Lookbook point evidence, pass `--anchor <point-id>` to `lookbook image set-placement` and include the point-owning section in `--sections`. Additional sections remain section-level placements, e.g. `--sections thesis,texture --anchor texture-cannon-material-states` shows the image under Thesis and beside that Texture point.
- Production `thesis` is a single-image slot. Placing an image with `--sections thesis` replaces the previous Thesis placement without discarding that previous image or removing its other placements. Other Production section and point placements append until the slot has 10 images.
- Use `renku lookbook image set-placement --image <lookbook-image-id> --sections <section>[,<section>] [--anchor <point-id>] --project <project-name> --json` to retag or re-anchor an existing Lookbook image with the same placement rules.
- For Storyboard Lookbooks, default an image to one section. Keep the canonical overall-style image in `styleBrief` only, and narrow any earlier multi-section placement after accepting a dedicated section example. Never repeat an image merely to avoid an empty section.
- Never discard and re-import a Lookbook image merely to change its section or point placement. `renku lookbook image discard` is only for intentional removal requested by the user.
- Apply validates before writing; keep separate validation for validation-only requests or review.
- Read the existing Lookbook before updating it.
- Do not invent source Inspiration folder IDs. Use IDs returned by the CLI.
- Do not write theoretical Storyboard Lookbook prose that cannot become visible image-generation instructions.

## Quality Bar

- Make the Lookbook a project direction, not a reference summary.
- Synthesize sources into the user's movie.
- Write for both the user and generation agents.
- For Production Lookbooks, use concrete cinematography language: color separation, exposure, contrast, shadow behavior, blocking, lens feel, movement, texture, and production surface.
- For Storyboard Lookbooks, use concrete appearance language: realism level,
  medium, form treatment, line behavior when present, finish, value range,
  color and accent behavior, texture, detail density, and what to avoid. A
  realistic/no-linework Lookbook remains valid; describe its tonal modeling and
  finish without inventing marks. Project-wide notation and continuity-clarity
  conventions may live in the Lookbook. Keep panel staging, camera, Shot
  coverage, crop behavior, and Scene-specific continuity decisions out.
- Include repeatable principles and patterns.
- Treat named references and source influences with careful language unless the user supplied confirmed facts.
