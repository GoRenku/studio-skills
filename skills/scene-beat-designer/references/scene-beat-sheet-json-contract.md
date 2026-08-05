# Scene Beat Sheet JSON Contract

Scene Beat Sheets are persisted through `renku screenplay beat-sheet`.

```json
{
  "sceneId": "scene_control_room",
  "title": "Ada confronts the empty control room",
  "summary": "Absence turns expectation into suspicion.",
  "narrativeProgression": "Ada's confidence gives way to unease.",
  "lookbookInfluence": "Institutional coldness and restrained practical light.",
  "beats": [
    {
      "id": "beat_001",
      "title": "The room answers with absence",
      "description": "Ada stands just inside the empty control room. Dormant consoles surround her, the far doorway remains dark, and cold indicator lights make the silence feel institutional.",
      "narrativeDevelopment": "Ada enters expecting a response and realizes the room has been abandoned.",
      "narrativePurpose": "Turn anticipation into unease while establishing the room's emptiness as meaningful.",
      "castMemberIds": ["cast_ada"],
      "locationIds": ["location_control_room"],
      "propIds": ["prop_status_key"],
      "screenplayBlockIds": ["screenplay_block_entry", "screenplay_block_silence"]
    }
  ]
}
```

Each Beat has exactly these nine fields:

```json
{
  "id": "beat_001",
  "title": "The room answers with absence",
  "description": "Ada stands just inside the empty control room. Dormant consoles surround her, the far doorway remains dark, and cold indicator lights make the silence feel institutional.",
  "narrativeDevelopment": "Ada enters expecting a response and realizes the room has been abandoned.",
  "narrativePurpose": "Turn anticipation into unease while establishing the room's emptiness as meaningful.",
  "castMemberIds": ["cast_ada"],
  "locationIds": ["location_control_room"],
  "propIds": ["prop_status_key"],
  "screenplayBlockIds": ["screenplay_block_entry", "screenplay_block_silence"]
}
```

Rules:

- `id` is the durable Beat id; do not add `beatId`.
- Beat ids are unique within the document.
- `description` records visual setting, meaningful placement, spatial relationships, important elements, and atmosphere. It must not prescribe camera or Shot execution.
- `narrativeDevelopment` states what changes or becomes newly understood.
- `narrativePurpose` explains why that change matters to the scene or story.
- Cast Member, Location, Prop, and Screenplay Block ids must resolve in the
  current Project and Scene.
- Use stable `screenplayBlockIds`; array indexes are not identities.
- Unknown fields are rejected.
- Do not add subject, action, dialogue, audio notes, production notes, framing, lens, angle, movement, or aspect-ratio fields.

Operations use an explicit base:

```json
{
  "sceneId": "scene_control_room",
  "baseBeatSheetId": "scene_beat_sheet_control_room_v1",
  "activate": true,
  "operations": [
    {
      "operation": "beat.update",
      "beat": {
        "id": "beat_001",
        "title": "The room answers with absence",
        "description": "Ada stands among dormant consoles while the far doorway remains dark.",
        "narrativeDevelopment": "Ada realizes the room has been abandoned.",
        "narrativePurpose": "Turn anticipation into unease.",
        "castMemberIds": ["cast_ada"],
        "locationIds": ["location_control_room"],
        "propIds": ["prop_status_key"],
        "screenplayBlockIds": ["screenplay_block_entry", "screenplay_block_silence"]
      }
    }
  ]
}
```

Supported operations:

- `beats.insert`
- `beats.replace`
- `beat.update`
- `beats.delete`
- `beatSheet.replace`
