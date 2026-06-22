# Lookbook CLI Workflow

Use JSON output for every command.

1. Open or confirm the project:

```bash
renku project open <project-name> --json
renku project current --json
```

2. Read current Lookbooks:

```bash
renku lookbook list --json
```

3. Read a target Lookbook before updating:

```bash
renku lookbook show --lookbook <lookbook-id> --json
```

4. Validate before writing:

```bash
renku lookbook validate --file lookbook.json --json
```

5. Create or update. The JSON document carries the Lookbook type and name:

```bash
renku lookbook create --file lookbook.json --json
renku lookbook update --lookbook <lookbook-id> --file lookbook.json --json
```

6. Select the Lookbook for its type only when intended:

```bash
renku lookbook select --type movie --lookbook <lookbook-id> --json
renku lookbook select --type storyboard --lookbook <lookbook-id> --json
```

Clear one typed selection only when intended:

```bash
renku lookbook clear-selection --type movie --json
renku lookbook clear-selection --type storyboard --json
```

7. Import example images after files exist in the project. Tag each image with
   the single style aspect it demonstrates so Studio can show it next to the right
   widget. Movie aspects are `thesis`, `palette`, `toneMood`, `composition`,
   `lighting`, `texture`, `camera`. Storyboard aspects are `styleBrief`,
   `lineAndFinish`, `valueAndAccent`, `guardrails`. Prefer one aspect per image;
   do not tag every aspect on one image. When a Movie Lookbook image clearly
   demonstrates one specific pattern or observation, anchor it to that point with
   `--anchor <point-id>` and include the point-owning section in `--sections`
   so it renders beside that point. Additional `--sections` values remain broad
   section placements. Use `--sections thesis` for a Movie thesis hero image;
   when the same image is also exact point evidence, use a mixed placement such
   as `--sections thesis,texture --anchor texture-cannon-material-states`. Set
   the `styleBrief` image (the overall look) as the Storyboard card image so it
   becomes the detail-page hero.

```bash
renku media import --purpose lookbook.image --target lookbook:<movie-lookbook-id> --source <project-relative-path> --sections thesis --json
renku media import --purpose lookbook.image --target lookbook:<movie-lookbook-id> --source <project-relative-path> --sections composition --anchor composition-clinical-symmetry --json
renku media import --purpose lookbook.image --target lookbook:<movie-lookbook-id> --source <project-relative-path> --sections thesis,texture --anchor texture-cannon-material-states --json
renku media import --purpose lookbook.image --target lookbook:<storyboard-lookbook-id> --source <project-relative-path> --sections lineAndFinish --json
renku lookbook image set-placement --image <lookbook-image-id> --sections valueAndAccent --json
renku lookbook image set-placement --image <lookbook-image-id> --sections styleBrief --json
renku lookbook image set-placement --image <lookbook-image-id> --sections composition --anchor composition-clinical-symmetry --json
renku lookbook image set-placement --image <lookbook-image-id> --sections thesis,texture --anchor texture-cannon-material-states --json
renku lookbook card-image set --lookbook <storyboard-lookbook-id> --image <styleBrief-image-id> --json
```

Use `--image` for Lookbook image IDs. Use `--file` only for JSON input files. Use `--source` for project-relative media source files.

For an existing Lookbook image, use `renku lookbook image set-placement` to change section tags or point anchors. This command replaces the image placement set, so include every section and optional point anchor the image should keep. Do not use `renku lookbook image discard` plus `renku media import` as a retagging workflow. If `set-placement` is unavailable, stop and report the missing CLI support instead of creating duplicate media.

Movie `thesis` is a single-image slot: importing or placing a new image with `--sections thesis` replaces the previous Thesis placement without discarding that previous image or removing its other placements. Other Movie section and point placements append until the slot has 10 images. When a multi-image slot is full, move or discard an existing Lookbook image before adding another one.

Source Inspiration relationships:

```bash
renku lookbook inspiration list --lookbook <lookbook-id> --json
renku lookbook inspiration set --lookbook <lookbook-id> --file source-inspirations.json --json
```

Successful mutation reports include `resourceKeys`. Treat those as Studio refresh keys, not as creative content.
