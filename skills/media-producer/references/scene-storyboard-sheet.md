# Scene Storyboard Sheet Purpose

Purpose key: `scene.storyboard-sheet`

Target format: `scene:<scene-id>`

## Required Workflow

1. Read context with `renku generation context --purpose scene.storyboard-sheet --target scene:<scene-id> --json`.
2. Read `renku screenplay shot-list context --scene <scene-id> --include-visual-references --json` and the exact saved Shot List being illustrated. Generation context supplies the provider-facing guide; Shot List context supplies authored Shot direction.
3. Include an exact `lookbook.storyboard-sheet` candidate when one is available and useful. If the guide notice says none is available, treat that as non-blocking guidance: offer a `lookbook-designer`/`media-producer` handoff to create one, but continue without it when the user wants to proceed. Do not substitute the selected Movie Lookbook.
4. Verify the target Scene and Shot List exist and split selected Shots into batches of at most four.
5. If the user chooses Codex image generation, use `$imagegen`, save each accepted composite inside the project, inspect it, crop only the storyboard image blocks, and import the accepted crops without receipts.
6. For Renku generation, read `renku generation model list --purpose scene.storyboard-sheet --json`, assign the exact Storyboard Lookbook Sheet to a real provider media field when included, and author one generic spec per batch.
7. Show the draft or saved spec in Preview and wait for user review before estimate or run.
8. Run only after approval of the current estimate and provider transfer. If prompt, endpoint, authored values, reference order, provider fields, or referenced files change, update the same spec, validate, show Preview again, re-estimate, and obtain fresh live-run confirmation. The price token may remain unchanged when pricing facts are unchanged.
9. Inspect each returned composite, use vision to identify the actual storyboard panel image blocks, crop those blocks, and inspect every crop.
10. Import only when the composite and all crops are clean, useful, and match the resolved Shot aspect ratio.

## Prompt Inputs

Use generation context plus the exact Shot List context:

- screenplay overview, scene function, and relevant scene blocks;
- selected shot ids and shot titles for this sheet only;
- each selected shot's subject, framing, camera angle, movement, action, and story purpose;
- referenced cast and locations for the selected shots;
- selected Movie Lookbook palette, texture, lighting, composition, camera, and tone notes when available;
- selected Storyboard Lookbook style brief, line/finish, value/accent, panel/notation, continuity/clarity, and guardrails;
- selected Storyboard Lookbook Sheet as the preferred exact visual-style reference;
- the resolved per-shot aspect ratio.

The scene and shot list decide what to draw. The selected Storyboard Lookbook definition and sheet decide how the storyboard drawing should look. The selected Movie Lookbook may inform cinematic intent, but it is not the storyboard style source of truth.

## Sheet Layout

Prompt for one composite image. Do not provide or reference a template image,
mask, uploaded grid, red marker sheet, crop script, debug layout, or ten-panel
contact sheet.

- one 4:3 storyboard sheet;
- one to four panels only;
- selected shots arranged in shot-list order;
- each panel uses the resolved shot frame, normally 16:9 for a movie project;
- labels stay in sheet headers or margins, never inside the shot image content.

Example prompt instruction:

```text
Create one 4:3 storyboard sheet as a single finished image. Arrange up to four clean 16:9 landscape storyboard panels in shot-list order. Match the selected Storyboard Lookbook sheet for line quality, finish level, value range, accent behavior, panel gutters, margin notation, and clarity rules. Preserve the scene's shot intent and cinematic visual language, but render the frames as storyboard drawings rather than final film stills. Keep labels in the margin or sheet header; do not place labels, debug marks, crop marks, or decorative text inside the shot image content.
```

Avoid photorealism, final film still polish, heavy charcoal/noir contrast unless the Storyboard Lookbook requires it, labels inside panel image content, crop marks, red dots, debug overlays, and template artifacts.

## Storyboard Lookbook Guidance

The `visual-language/storyboard-lookbook-sheet` slot initializes the first available Storyboard Lookbook Sheet. It is non-blocking guidance, not an execution requirement. If it is empty, create or attach `lookbook.storyboard-sheet` for the selected Storyboard Lookbook when the user wants stronger consistency. Do not substitute a Movie Lookbook sheet, generic Lookbook image, or unselected Storyboard Lookbook sheet.

Reference-capable endpoints receive the selected Storyboard Lookbook Sheet only
when the spec assigns it to a current media field. If the selected endpoint
cannot use that reference, do not pretend it is applied; choose another
endpoint or explain the limitation.

## Historical Guardrails

When the context is historical, include concrete exclusions that match the time
period, geography, locations, and visible props for the selected shots. For a
1400s setting, relevant exclusions might include:

- electrical wiring;
- modern road surfaces;
- contemporary signage;
- glass curtain walls;
- industrial streetlights;
- modern weapons, vehicles, or safety equipment.

Do not dump a generic anachronism list into every prompt. Choose exclusions from
the scene, locations, and selected shots. If the context is too thin to write
meaningful guardrails, ask for the missing scene or location details before
generating.

## Vision-Guided Cropping Expectations

Renku-managed generation or Codex built-in image generation creates one
composite image for each storyboard sheet. The agent then uses vision to locate
the actual storyboard panel image blocks for the selected shots. Crop only those
image blocks.

Crop around the image content, not the panel frame. Exclude labels, gutters,
decorative sheet background, borders, debug marks, and any non-shot content
unless the user explicitly asks to preserve borders. The crop boxes are selected
by vision for the specific returned image; they are not fixed coordinates and
are not discovered through border detection, marker detection, OCR, rough
quadrants, or grid slicing.

Do not import automatically when the image no longer provides clean useful
storyboard panels for the selected shots. Show the composite to the user,
explain that the generation is not good enough for a storyboard sheet, and ask
whether to accept it with caveats, revise the storyboard/spec, or approve
another Codex image iteration or Renku-managed paid generation.

## Import Expectations

Import the cropped shot images from the generated sheets as one semantic
storyboard image package. Do not import the temporary composite sheet files, and
do not stitch generated sheets together just to make import work.

Preferred import shape:

```json
{
  "kind": "sceneStoryboardImagesImport",
  "shotListId": "scene_shot_list_foundry_v1",
  "title": "Foundry storyboard package",
  "shots": [
    {
      "shotId": "shot_001",
      "source": "tmp/media/foundry-storyboard-sheet-1-shot-001.png",
      "sourcePurpose": "scene.storyboard-sheet"
    },
    {
      "shotId": "shot_005",
      "source": "tmp/media/foundry-storyboard-sheet-2-shot-005.png",
      "sourcePurpose": "scene.storyboard-sheet"
    }
  ]
}
```

Import expectations:

- at least one cropped shot image is required;
- the import `shotListId` must match the CLI `--shot-list`;
- one cropped file is required for every selected `shotId` being imported;
- duplicate `shotId`s across the import manifest are invalid;
- every imported `shotId` must belong to the target `shotListId`;
- an import may cover only selected shots, not every shot in the full shot list;
- all files must be project-relative and inside the project;
- source-only import is valid only for one cropped image and exactly one
  `--shots` id.

Studio stores the imported cropped images and shot relationships. Do not store
crop boxes, extraction confidence, grid layout, crop diagnostics, composite
sheet files, or other agent-side crop mechanics.
