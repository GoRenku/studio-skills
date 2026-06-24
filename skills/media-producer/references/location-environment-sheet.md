# Location Sheet And Location Hero Purposes

Purpose keys:

- `location.environment-sheet`
- `location.hero`

Target format: `location:<location-id>`

## Location Sheet Workflow

1. Read context with `renku generation context --purpose location.environment-sheet --target location:<location-id> --json`.
2. Verify the target Location exists in the screenplay location list.
3. For Renku-managed generation, list model choices with `renku generation model list --purpose location.environment-sheet --target location:<location-id> --json` unless the user already chose a model.
4. Write a persisted spec with a concise `description`. The description is stored on the imported Location Sheet and shown in Studio cards.
5. Estimate cost and ask for explicit approval before any paid run.
6. Inspect the returned full image as one production reference board.
7. Import the approved full image with `--source`, `--title`, and `--summary`.

If the user wants Codex built-in image generation for a Location Sheet, use the
same context and prompt inputs, generate with `$imagegen`, save the selected
image as `generated/media/<location-handle>-sheet.png`, inspect it, and import
it with the same `location.environment-sheet` command without `--receipt`. Do
not copy the file directly into `locations/<handle>/environment-sheets/`; the
CLI/Core import copies the staging file into that canonical folder and registers
the Location Sheet asset.

Location Sheets are not sliced. Do not create or import `view_front`,
`view_right`, `view_back`, or `view_left` files. Do not ask for a mandatory
front/right/back/left layout unless the user specifically wants that design
inside the single full sheet.

Example import:

```bash
renku media import \
  --purpose location.environment-sheet \
  --target location:<location-id> \
  --source generated/media/theodosian-walls-sheet.png \
  --title "Theodosian Walls Location Sheet" \
  --summary "Siege-facing wall, Ottoman field, gate damage, and city-edge context." \
  --receipt generation-run.json \
  --json
```

Omit `--receipt` when the image came from Codex built-in image generation,
manual upload, or any non-Renku generation source.

## Location Sheet Prompt Inputs

Use the returned context:

- screenplay overview, story function, and scene usage;
- target location name, description, time period, and visual notes;
- active Location Design spatial thesis, architecture, set dressing, materials,
  atmosphere, props, and continuity;
- selected Movie Lookbook palette, texture, lighting, composition, and camera
  rules;
- selected location references and anti-references when present;
- historical basis, dramatized elements, research sources, and assumptions.

Prompt for one useful full-image reference board. It can contain maps,
elevations, material samples, annotated details, distant establishing context,
or multiple arranged views when that serves the Location. Keep the prompt tied
to the Location Design and the current production need.

## Location Hero Workflow

Use `location.hero` when the Location needs a compact overview/detail image.
The hero image is not a shot-generation reference. It must be grounded in an
explicit source Location Sheet asset owned by the same Location.

1. Choose the source Location Sheet asset with the user or from the current
   task brief.
2. Create a `location.hero` spec with `sourceLocationSheetAssetId`.
3. Estimate and run only after approval.
4. Inspect the hero image as display media.
5. Import generated hero media with `--source-sheet`.

For Codex built-in image generation, do not create a `location.hero` spec,
estimate, run, or receipt. Still read context first:

```bash
renku generation context --purpose location.hero --target location:<location-id> --json
```

Choose a source Location Sheet from `environmentSheetTakes` or
`sourceLocationSheetAsset` in that context. If there is no source Location Sheet
asset, stop and tell the user a Location Sheet must be generated or imported
before creating a Location Hero Image. A Location Hero without
`--source-sheet` is invalid.

Prompt `$imagegen` to create one clean 16:9 representative Location Hero Image
derived from the chosen source sheet. The hero should be a readable overview or
detail display image, not a multi-panel sheet, contact sheet, labels, captions,
diagram, shot frame, or new Location Sheet.

Save the chosen Codex output as
`generated/media/<location-handle>-hero.png`, then import it:

```bash
renku media import \
  --purpose location.hero \
  --target location:<location-id> \
  --source generated/media/<location-handle>-hero.png \
  --source-sheet <location-sheet-asset-id> \
  --title "<Location Name> hero" \
  --summary "<one-line hero summary>" \
  --json
```

Do not manually copy the Codex output into `locations/<handle>/heroes/`. The
import command validates the source Location Sheet, copies the staging file into
`locations/<handle>/heroes/<hero-slug>/hero.<ext>`, registers the
`location_hero` asset, and selects it as the current hero.

Example spec:

```json
{
  "purpose": "location.hero",
  "target": { "kind": "location", "id": "location_theodosian_walls" },
  "sourceLocationSheetAssetId": "asset_theodosian_walls_siege_sheet",
  "modelChoice": "fal-ai/nano-banana-2/edit",
  "prompt": "Create a wide representative hero image for the Theodosian Walls from the supplied Location Sheet. Preserve the wall massing, field direction, gate damage, and late medieval siege atmosphere.",
  "description": "Wide hero image grounded in the siege-facing Location Sheet.",
  "takeCount": 1,
  "seed": null,
  "heroFrame": "16:9",
  "outputFormat": "png",
  "title": "Theodosian Walls hero"
}
```

Example import:

```bash
renku media import \
  --purpose location.hero \
  --target location:<location-id> \
  --source generated/media/theodosian-walls-hero.png \
  --source-sheet asset_theodosian_walls_siege_sheet \
  --title "Theodosian Walls hero" \
  --summary "Wide display image grounded in the siege-facing Location Sheet." \
  --receipt generation-run.json \
  --json
```

Omit `--receipt` when the hero image came from Codex built-in image generation,
manual upload, or any non-Renku generation source.

## Historical Guardrails

When the context is historical, include concrete exclusions that match the time
period, geography, and location type. For a 1400s setting, relevant exclusions
might include telegraph poles, electrical wires, asphalt roads, cars, modern
signage, glass curtain walls, industrial streetlights, or railway
infrastructure.

Do not dump a generic anachronism list into every prompt. Choose exclusions
from the context. If the context is too thin to write meaningful guardrails,
ask for the missing location details or suggest adding them to the Location
record.
