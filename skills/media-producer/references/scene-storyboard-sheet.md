# Scene Storyboard Sheet Purpose

Purpose key: `scene.storyboard-sheet`

Target format: `scene:<scene-id>`

## Required Workflow

1. Read context with `renku generation context --purpose scene.storyboard-sheet --target scene:<scene-id> --shot-list <shot-list-id> --json`.
2. If context fails because there is no selected Storyboard Lookbook, stop and dispatch to `lookbook-designer` to create/select one. Do not substitute the selected Movie Lookbook.
3. If dependency planning reports a missing `lookbook-sheet` for the selected Storyboard Lookbook, generate or import `lookbook.sheet` for that Storyboard Lookbook first.
4. List model choices with `renku generation model list --purpose scene.storyboard-sheet --target scene:<scene-id> --shot-list <shot-list-id> --json` unless the user already chose one.
5. Verify the target Scene and Shot List exist.
6. Split the selected shots into batches of at most four shots.
7. Create one persisted spec per batch and estimate cost before any paid run.
8. Run only after user approval for both cost and sending project-derived prompt/context to the external provider. Request sandbox/network permission before the first real run, because Renku will contact the approved provider.
9. Inspect each returned composite, use vision to identify the actual storyboard panel image blocks, crop those blocks, and inspect every slice.
10. Import only when the sheets and all slices are clean, useful, and match the resolved shot aspect ratio.

## Prompt Inputs

Use the returned context:

- screenplay overview, scene function, and relevant scene blocks;
- selected shot ids and shot titles for this sheet only;
- each selected shot's subject, framing, camera angle, movement, action, and story purpose;
- referenced cast and locations for the selected shots;
- selected Movie Lookbook palette, texture, lighting, composition, camera, and tone notes when available;
- selected Storyboard Lookbook style brief, line/finish, value/accent, panel/notation, continuity/clarity, and guardrails;
- selected Storyboard Lookbook sheet as the required visual style reference dependency;
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

## Dependency Planning

`scene.storyboard-sheet` has a required `lookbook-sheet` dependency whose subject is the selected Storyboard Lookbook id.

If the selected Storyboard Lookbook has no sheet, use `lookbook.sheet` for that Storyboard Lookbook before creating the final scene storyboard spec. Do not satisfy the dependency with a Movie Lookbook sheet, a generic Lookbook image, or an unselected Storyboard Lookbook sheet.

Supported reference-capable routes receive the selected Storyboard Lookbook sheet as an image/reference input. If a route cannot use the reference sheet, do not pretend the sheet is applied; choose a supported route or explain the limitation.

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

Renku generates one provider image for each storyboard sheet. The agent then
uses vision to locate the actual storyboard panel image blocks for the selected
shots. Crop only those image blocks.

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
another paid generation.

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
      "source": "generated/media/foundry-storyboard-sheet-1-shot-001.png",
      "sourcePurpose": "scene.storyboard-sheet"
    },
    {
      "shotId": "shot_005",
      "source": "generated/media/foundry-storyboard-sheet-2-shot-005.png",
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
