# Scene Storyboard Sheet Purpose

Purpose: `scene.storyboard-sheet`

Target: `scene:<scene-id>`

## Required Workflow

If the user names a production reference such as `Scene 22` or `22A`, resolve it
before building the target:

```bash
renku screenplay scene-number resolve --number <production-number> --json
```

Use the returned durable `sceneId` in the generation target, Scene Beats revision reads,
and persisted Generation Spec. Do not add a duplicate production-number field.

1. Read generation context:

   ```bash
   renku generation context \
     --purpose scene.storyboard-sheet \
     --target scene:<scene-id> \
     --json
   ```

2. Resolve and read the exact Scene Beats revision. Do not rely on an active
   revision id from an earlier handoff without reading it back:

   ```bash
   renku screenplay beats context --scene <scene-id> --json
   renku screenplay beats show --revision <scene-beats-revision-id> --json
   renku screenplay beats storyboard status --scene <scene-id> --revision <scene-beats-revision-id> --json
   ```

3. Treat `facts.contextText` as opaque authored narrative context.
4. Split selected Beats into batches of one to four in Scene Beats revision order.
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

The Scene Beats revision decides the narrative moments to illustrate. It does not define camera Shots. Any framing or composition chosen for a generated panel is an agent-owned choice for that artifact, not Beat persistence.

## Sheet Layout

- one 4:3 composite;
- one to four panels;
- Beats arranged in Scene Beats revision order;
- clean panel image areas suitable for vision-guided cropping;
- labels only in margins or headers, never inside the panel image content.

Do not use fixed crop coordinates, OCR, marker detection, border detection, or runtime auto-splitting.

## Import Shape

```json
{
  "sceneBeatsRevisionId": "scene_beats_revision_foundry_v1",
  "title": "Foundry storyboard package",
  "select": true,
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
  --revision <scene-beats-revision-id> \
  --file <import.json> \
  --json
```

For one source file, pass exactly one `--beats <beat-id>`.

The grouped document must state one explicit `select` choice. Use `true` when
these accepted crops should become the current images for their Beats. Use
`false` when deliberately importing additional candidates without changing
existing selections. Do not import and then issue one selection command per
Beat.

Every Beat id must belong to the target Scene Beats revision. Files must be
project-relative. Each imported crop becomes an ordinary Asset owned by its
logical Scene Beat. Do not persist crop boxes, extraction confidence, grid
layout, composite sheet files, or other agent-side mechanics.

Core keeps every accepted import batch in the Scene-local numbered iteration
folder. Never move, flatten, rename, or reuse an existing iteration folder.
Reactivating an older Scene Beats revision reconnects its retained Beat ids and
images without copying files.
