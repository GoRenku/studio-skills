# Scene Storyboard Sheet Purpose

Purpose key: `scene.storyboard-sheet`

Target format: `scene:<scene-id>`

## Required Workflow

1. Read context with `renku generation context --purpose scene.storyboard-sheet --target scene:<scene-id> --shot-list <shot-list-id> --json`.
2. List model choices with `renku generation model list --purpose scene.storyboard-sheet --target scene:<scene-id> --shot-list <shot-list-id> --json` unless the user already chose one.
3. Verify the target Scene and Shot List exist.
4. Split the selected shots into batches of at most four shots.
5. Create one persisted spec per batch and estimate cost before any paid run.
6. Run only after user approval for both cost and sending project-derived prompt/context to the external provider. Request sandbox/network permission before the first real run, because Renku will contact the approved provider.
7. Inspect each returned composite, use vision to identify the actual storyboard panel image blocks, crop those blocks, and inspect every slice.
8. Import only when the sheets and all slices are clean, useful, and match the resolved shot aspect ratio.

## Prompt Inputs

Use the returned context:

- screenplay overview, scene function, and relevant scene blocks;
- selected shot ids and shot titles for this sheet only;
- each selected shot's subject, framing, camera angle, movement, action, and story purpose;
- referenced cast and locations for the selected shots;
- active Lookbook palette, texture, lighting, composition, camera, and tone notes;
- the resolved per-shot aspect ratio.

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
Create one 4:3 storyboard sheet as a single finished image. Arrange up to four clean 16:9 landscape storyboard panels in shot-list order. Use hand-drawn graphite pencil and light ink on warm off-white paper, with subtle gray/beige washes, visible sketch construction, readable staging, and production-board clarity. Use rounded white panel cards with dark gutters or a considered dark presentation surround. Preserve the project's historical visual language and shot intent, but render the frames as storyboard drawings rather than cinematic black-and-white film stills. Keep labels in the margin or sheet header; do not place labels, debug marks, crop marks, or decorative text inside the shot image content.
```

Avoid photorealism, final film still polish, heavy charcoal/noir contrast,
cinematic black-and-white grading, labels inside panel image content, crop marks,
red dots, debug overlays, and template artifacts.

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
