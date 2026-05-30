# Scene Shot List JSON Contract

Scene Shot Lists are validated JSON documents persisted through `renku screenplay shot-list`.

## Shape

```json
{
  "kind": "sceneShotList",
  "sceneId": "scene_control_room",
  "title": "Ada confronts the empty control room",
  "summary": "A concise coverage summary.",
  "coverageStrategy": "How the shots build the scene.",
  "lookbookInfluence": "How the active Lookbook is translated into coverage.",
  "shots": [],
  "openQuestions": []
}
```

Each shot:

```json
{
  "shotId": "shot_001",
  "title": "Empty room establishes the absence",
  "storyBeat": "Ada enters expecting someone and finds the room abandoned.",
  "narrativePurpose": "Establish geography, absence, and emotional distance.",
  "description": "Wide static frame from the doorway with Ada small against the consoles.",
  "shotType": "wide",
  "cameraAngle": "eye level",
  "cameraMovement": "static",
  "framing": "centered doorway frame with deep background symmetry",
  "lensIntent": "moderate wide lens feel",
  "aspectRatio": "1:1",
  "subject": "Ada and the empty control room",
  "action": "Ada pauses in the doorway before stepping inside.",
  "dialogue": [
    {
      "blockIndex": 2,
      "lineIndexes": [0],
      "castMemberId": "cast_ada",
      "purpose": "Let the line land as a test of the empty room."
    }
  ],
  "coveredBlockIndexes": [0, 1, 2],
  "castMemberIds": ["cast_ada"],
  "locationIds": ["location_control_room"],
  "audioNotes": "Room tone and distant machinery carry the silence.",
  "productionNotes": "Avoid warm fill; the absence should feel institutional."
}
```

`aspectRatio` is optional. Omit it unless the user or coverage strategy intentionally departs from the project aspect ratio.

## Required Rules

- `kind` must be `sceneShotList`.
- `sceneId` must be the target scene id.
- `shots` must contain at least one shot.
- `shotId` values must be unique inside the document.
- Shot labels are derived from array order; do not store labels such as `Shot 1`.
- `coveredBlockIndexes` refer to the current scene's ordered blocks.
- `castMemberIds` and `locationIds` must reference current project records.
- Dialogue references with `lineIndexes` must point at dialogue blocks.
- Unknown fields are rejected.
- Required text fields must be non-empty.

## Do Not Store

- Absolute local paths.
- Generated image paths.
- Storyboard image paths.
- Crop boxes, grid cells, extraction methods, or extraction confidence.
- Setup minutes.
- Equipment checkout lists.
- Crew assignments.
- Call-sheet timing.
- Company moves.

Storyboard images are attached later through `renku media import --purpose scene.storyboard-sheet`.
