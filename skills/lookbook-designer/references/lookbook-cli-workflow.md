# Lookbook CLI Workflow

Use JSON output for every command.

1. Open or confirm the project:

```bash
renku project open <project-name> --json
renku project current --json
```

2. Read both project roles:

```bash
renku lookbook show --kind production --json
renku lookbook show --kind storyboard --json
```

3. Read an authored role before revising it:

```bash
renku lookbook show --kind <production|storyboard> --json
```

4. Validate before writing:

```bash
renku lookbook validate --file lookbook.json --json
```

5. Apply. The document carries the Lookbook role and authored name. Apply creates an unauthored role or updates the current role in place:

```bash
renku lookbook apply --file lookbook.json --json
```

6. Read the role back:

```bash
renku lookbook show --kind <production|storyboard> --json
```

7. Import example images after files exist in the project. Selection may be
   atomic with import; placement remains separate. `media import` returns
   `asset.id` for common selection and `ownerRecord.id` for Lookbook placement.
   Tag each image with the clearest style aspect it demonstrates so Studio can
   show it next to the right widget. Production aspects are `thesis`, `palette`, `toneMood`,
   `composition`, `lighting`, `texture`, `camera`. Storyboard aspects are
   `styleBrief`, `lineAndFinish`, `valueAndAccent`, `guardrails`. Prefer one
   aspect for a dedicated evidence image, but reuse and place the same accepted
   image in multiple sections when it genuinely demonstrates them. Section
   placement does not authorize a different visual style, and a Lookbook does
   not need a separate generated image for every section. When a Production Lookbook
   image clearly demonstrates one specific pattern or observation, anchor it to
   that point with `--anchor <point-id>` and include the point-owning section in
   `--sections` so it renders beside that point. Additional `--sections` values
   remain broad section placements. Use `--sections thesis` for a Production thesis
   hero image; when the same image is also exact point evidence, use a mixed
   placement such as `--sections thesis,texture --anchor
   texture-cannon-material-states`. Set the `styleBrief` image (the overall
   look) as the Storyboard card image so it becomes the detail-page hero.

For a Storyboard Lookbook image series, establish and accept the `styleBrief`
image first. When generating later examples that must match it, use an accepted
image from that exact Lookbook as a visible style reference through
`media-producer`; prose alone is not a continuity mechanism. Preserve its
medium, line quality, finish, simplification, and tonal restraint while changing
only the subject or section property being demonstrated. If no suitable visual
anchor can be attached, stop or label the result as exploration rather than
claiming it belongs to the matching set.

```bash
renku media import --purpose lookbook.image --target lookbook:<production-lookbook-id> --source <project-relative-path> --select --json
# Read ownerRecord.id from the JSON report, then choose the intended placement:
renku lookbook image set-placement --image <ownerRecord.id> --sections thesis --json
renku lookbook image set-placement --image <ownerRecord.id> --sections composition --anchor composition-clinical-symmetry --json
renku lookbook image set-placement --image <ownerRecord.id> --sections thesis,texture --anchor texture-cannon-material-states --json

renku media import --purpose lookbook.image --target lookbook:<storyboard-lookbook-id> --source <project-relative-path> --select --json
# Read ownerRecord.id from this import report before placement:
renku lookbook image set-placement --image <ownerRecord.id> --sections styleBrief --json
```

Keep `--select` only when the imported image should become the Lookbook's
canonical card image. For an existing candidate, use its common Asset id:

```bash
renku asset select --project <project-name> --target lookbook:<lookbook-id> --asset <asset-id> --json
renku asset clear-selection --project <project-name> --target lookbook:<lookbook-id> --json
```

Do not use `ownerRecord.id` for common selection, and do not add a
Lookbook-specific selection command.

Use `--image` for Lookbook image IDs. Use `--file` only for JSON input files. Use `--source` for project-relative media source files.

For an existing Lookbook image, use `renku lookbook image set-placement` to change section tags or point anchors. This command replaces the image placement set, so include every section and optional point anchor the image should keep. Do not use `renku lookbook image discard` plus `renku media import` as a retagging workflow. If `set-placement` is unavailable, stop and report the missing CLI support instead of creating duplicate media.

Production `thesis` is a single-image slot: placing a new image with `--sections thesis` replaces the previous Thesis placement without discarding that previous image or removing its other placements. Other Production section and point placements append until the slot has 10 images. When a multi-image slot is full, move or discard an existing Lookbook image before adding another one.

Source Inspiration relationships:

```bash
renku lookbook inspiration list --lookbook <lookbook-id> --json
renku lookbook inspiration set --lookbook <lookbook-id> --file source-inspirations.json --json
```

Successful mutation reports include `resourceKeys`. Treat those as Studio refresh keys, not as creative content.
