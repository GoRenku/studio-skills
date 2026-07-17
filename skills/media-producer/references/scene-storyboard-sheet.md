# Scene Storyboard Sheet Purpose

Purpose: `scene.storyboard-sheet`

Target: `scene:<scene-id>`

## Required Workflow

1. Read generation context:

   ```bash
   renku generation context \
     --purpose scene.storyboard-sheet \
     --target scene:<scene-id> \
     --json
   ```

2. Read the exact Scene Beat Sheet:

   ```bash
   renku screenplay beat-sheet context --scene <scene-id> --json
   renku screenplay beat-sheet show --active --scene <scene-id> --json
   ```

3. Treat `facts.contextText` as opaque authored narrative context.
4. Split selected Beats into batches of one to four in Beat Sheet order.
5. For each batch, identify only the Cast Members and Locations referenced by those Beats. Inspect and deliberately choose exact reference files.
6. Inspect the Storyboard Lookbook guidance and any selected Cast/Location references before generation.
7. Author one generic generation spec per batch. Validate and show every request in Preview before estimate/run.
8. Inspect each returned composite with vision, identify the actual storyboard panel image blocks, crop them, and inspect every crop.
9. Import only accepted Beat images.

## Prompt Inputs

Use:

- scene narrative context;
- selected Beat ids and titles;
- Beat description, narrative development, and narrative purpose;
- referenced Cast Members and Locations;
- exact selected continuity files;
- Production Lookbook visual language when useful;
- Storyboard Lookbook style and guardrails.

The Beat Sheet decides the narrative moments to illustrate. It does not define camera Shots. Any framing or composition chosen for a generated panel is an agent-owned choice for that artifact, not Beat persistence.

## Sheet Layout

- one 4:3 composite;
- one to four panels;
- Beats arranged in Beat Sheet order;
- clean panel image areas suitable for vision-guided cropping;
- labels only in margins or headers, never inside the panel image content.

Do not use fixed crop coordinates, OCR, marker detection, border detection, or runtime auto-splitting.

## Import Shape

```json
{
  "kind": "sceneStoryboardImagesImport",
  "beatSheetId": "scene_beat_sheet_foundry_v1",
  "title": "Foundry storyboard package",
  "beats": [
    {
      "beatId": "beat_001",
      "source": "tmp/media/foundry-storyboard-sheet-1-beat-001.png",
      "sourcePurpose": "scene.storyboard-sheet"
    },
    {
      "beatId": "beat_005",
      "source": "tmp/media/foundry-storyboard-sheet-2-beat-005.png",
      "sourcePurpose": "scene.storyboard-sheet"
    }
  ]
}
```

Import with:

```bash
renku media import \
  --purpose scene.storyboard-sheet \
  --target scene:<scene-id> \
  --beat-sheet <beat-sheet-id> \
  --file <import.json> \
  --json
```

For one source file, pass exactly one `--beats <beat-id>`.

Every Beat id must belong to the target Beat Sheet. Files must be project-relative. Do not persist crop boxes, extraction confidence, grid layout, composite sheet files, or other agent-side mechanics.
