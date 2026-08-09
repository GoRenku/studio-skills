# Scene Beats JSON Contract

Create and reset input contains only a Scene id and ordered creative Beat
inputs. Core authors durable Beat ids and numbers:

```json
{
  "sceneId": "scene_control_room",
  "beats": [
    {
      "title": "The room answers with absence",
      "description": "Ada stands among dormant consoles while the far doorway remains dark.",
      "narrativeDevelopment": "Ada realizes the room has been abandoned.",
      "narrativePurpose": "Turn anticipation into unease.",
      "castMemberIds": ["cast_ada"],
      "locationIds": ["location_control_room"],
      "propIds": ["prop_status_key"],
      "screenplayBlockIds": ["screenplay_block_entry"]
    }
  ]
}
```

Each Beat input has exactly those eight fields. Unknown fields are rejected.
Do not add `id`, `number`, subject/action fields, dialogue coverage, media
paths, audio notes, production notes, framing, lens, angle, movement, or aspect
ratio.

Focused operations use an exact base revision:

```json
{
  "sceneId": "scene_control_room",
  "baseRevisionId": "scene_beats_revision_control_room_v1",
  "activate": true,
  "operations": [
    {
      "operation": "beat.update",
      "beatId": "beat_001",
      "beat": {
        "title": "The room answers with absence",
        "description": "Ada stands among dormant consoles while the sealed doorway remains dark.",
        "narrativeDevelopment": "Ada recognizes deliberate abandonment.",
        "narrativePurpose": "Transform unease into suspicion.",
        "castMemberIds": ["cast_ada"],
        "locationIds": ["location_control_room"],
        "propIds": ["prop_status_key"],
        "screenplayBlockIds": ["screenplay_block_entry"]
      }
    }
  ]
}
```

Supported operations are:

- `beats.insert` with `placement` and one or more Beat inputs;
- `beat.update` with `beatId` and one Beat input; and
- `beats.delete` with `beatIds`.

Placement is `start`, `end`, `before`, or `after`; `before` and `after` carry a
durable `beatId`. There is no replace operation. Use explicit `reset` for a
complete new Beat set.
