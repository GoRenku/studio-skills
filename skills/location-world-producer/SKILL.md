---
name: location-world-producer
description: Generate and manage a Renku Studio 3D Location World from four reviewed standard flat same-space images through World Labs Marble Auto Layout. Use when the user asks for a 3D Location, Gaussian splat, SPZ World, multi-view Location reconstruction, regeneration of a Location World, or rollback to an earlier Location World.
---

# Location World Producer

Require the installed Renku runtime. If `renku` is unavailable, stop and direct
the user to `https://gorenku.com`; do not construct Project state manually.

Create one durable 3D World for an exact Location from four reviewed standard
flat images of the same coherent space. Use World Labs Auto Layout. Do not
independently generate, synthesize, relabel, upload, download, or attach a
panorama in this skill. World Labs nevertheless converts every multi-image
World request into a panorama internally and bills that usage event before
World generation; its World response also contains a panorama URL. Renku cannot
disable that provider behavior and persists only the returned SPZ. If the user
requires no panorama generation or no panorama charge, stop: World Labs
multi-image input cannot satisfy that requirement. Delegate the authoritative
Location Sheet and any image generation to `$media-producer`, review the exact
four inputs and exact World prompt with the user, then submit one explicitly
confirmed paid Marble request through the focused Renku command.

## Project Workspace

Keep every agent-created working file inside the current Project's categorized
`tmp/` tree. Never create operation JSON, generated media, review evidence, or
scratch files at the Project root.

- Keep the four source images under
  `tmp/media/location-world/<location-handle>/`. Never import or attach them.
- Keep the generation document under `tmp/operations/`.
- Reserve `tmp/specs/` for Generation Specs and `tmp/receipts/` for provider
  receipts created by Media Producer.
- Use `tmp/qa/` for review evidence and `tmp/scratch/` for other temporary
  inputs.
- Never construct the durable SPZ path. Core owns its Location folder, name,
  Asset, file, and current selection.
- Treat prompts and pixels as opaque runtime inputs. Visual consistency review
  belongs only to the agent/user loop.

## Workflow

1. Resolve the current Project and exact Location id. Read Location production
   design context and useful existing Location media.
2. Read [references/workflow.md](references/workflow.md) completely.
3. Establish and show one canonical Location contract in clear prose. It must
   describe both geometry and appearance: one-space boundary, named sides,
   every permanent opening and fixed landmark, major furniture placement and
   circulation, intended nearby camera area, construction, materials, wear,
   lighting sources, period-specific dressing, and grounded exclusions. Do not
   invent a second geometry schema or reduce this contract to a few labels.
4. Use an accepted Production Location Sheet as the spatial and visual source.
   If no acceptable sheet exists, load `$media-producer` and create or revise
   one. For an interior World source, require exactly four equal-format
   perspective panels plus one clean authoritative top-down plan. The four
   views must show the same space with stable geometry, materials, lighting,
   furniture, and dressing; the plan must agree with every view. Exclude
   swatches, prop studies, human-scale panels, lighting studies, and filler.
5. Derive exactly four standard flat World inputs from the four accepted
   perspective panels. Crop panel image content only; exclude the plan,
   captions, borders, and sheet background. Never stretch a view or disguise a
   small or soft crop by upscaling it. Normalize all four to the same aspect
   ratio and exact resolution only by safe crop and downscale operations.
6. Present a labeled montage of the exact four files that will be uploaded.
   Inspect them together for one room, visible overlap, sharp spatial detail,
   stable lighting and color, fixed opening counts and positions, unchanged
   furniture geometry, matching surface character, and absence of borders or
   anachronisms. Reject the set before Marble if any check fails.
7. Write and show the exact non-empty World prompt. Describe geometry first,
   then construction and surfaces, fixed furniture and dressing, light and
   atmosphere, and grounded prohibitions. Do not shorten the prompt to geometry
   alone and do not expect the source images to prevent plausible-looking
   inventions.
8. Copy [samples/location-world-generation.json](samples/location-world-generation.json)
   into `tmp/operations/` and replace every placeholder with exact returned
   values. Preserve `source.kind: "multiImage"` and the exact four reviewed
   paths. Renku submits World Labs reconstruction/Auto Layout without azimuths.
9. Immediately before Marble submission, show the exact Location, complete
   prompt, four ordered paths, file dimensions, fixed `marble-1.1` model, Auto
   Layout behavior, prompt-recaption disablement, and the current provider
   billing breakdown. State explicitly that one `/worlds:generate` request from
   multi-image input includes a paid panorama-generation usage event followed
   by the paid World-generation event, and that every World response includes
   a provider panorama even though Renku saves only the SPZ. Ask the user to
   approve this exact paid request. Do not run Marble without that explicit
   confirmation. If the user asks for World-only billing, stop instead.
10. Run the command once:

```bash
renku location world generate \
  --file tmp/operations/location-world-generation.json \
  --json
```

11. Read the exact selection back with:

```bash
renku location world show --location <location-id> --json
```

Report the selected Asset and tell the user to inspect the Location's **3D
World** tab. Review geometry and appearance separately. Do not repeat a paid
request automatically after a provider or creative-quality failure.

## Rollback

List retained candidates for the exact Location, inspect the current selection,
and select the user-chosen prior Asset through the common history mechanism:

```bash
renku asset list \
  --project <project-name> \
  --owner location:<location-id> \
  --type location_world \
  --json

renku location world show --location <location-id> --json

renku asset select \
  --project <project-name> \
  --target location-world:<location-id> \
  --asset <location-world-asset-id> \
  --json
```

Never edit SQLite, infer the current World from list order, delete the newer
candidate, or create a World-specific rollback command.
