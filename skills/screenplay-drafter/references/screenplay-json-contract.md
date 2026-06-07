# Screenplay JSON Contract

Use this reference before writing create or update JSON.

## Top-Level Documents

Initial create input:

```json
{
  "kind": "screenplayCreate",
  "screenplay": {},
  "cast": [],
  "locations": [],
  "acts": []
}
```

Focused revision input:

```json
{
  "kind": "screenplayOperations",
  "operations": []
}
```

Focused scene replacement input:

```json
{
  "kind": "screenplaySceneRevision",
  "scene": {
    "id": "scene_control_room",
    "sequenceId": "sequence_opening",
    "title": "Ada enters the control room",
    "setting": {},
    "storyFunction": [],
    "blocks": []
  }
}
```

Canonical read output from `renku screenplay show --json` uses:

- `kind: "screenplay"`;
- durable `id` fields on cast, locations, acts, sequences, and scenes;
- `locationIds` in scene settings;
- `castMemberId` for dialogue speaker references.

Canonical output does not include temporary `key` values or authoring reference objects.

## Screenplay Fields

`screenplay` requires `title` and may include:

- `intendedAudience`;
- `targetLengthLabel`;
- `estimatedMinutes`;
- `genrePrimary`;
- `genreSecondary`;
- `tone`;
- `ratingIntent`;
- `boundaries`;
- `logline`;
- `summary`;
- `premiseOverview`;
- `centralConflict`;
- `dramaticQuestion`;
- `themes`;
- `historicalBasis`;
- `dramatizedElements`;
- `status`;
- `researchSources`;
- `assumptionsMade`.

Keep list-like fields as arrays of strings.

## Three-Act Structure

Use real Renku acts, sequences, scenes, `purpose`, and `storyFunction` fields
to represent the screenplay's initial three-act structure.

For initial screenplay generation, create three acts by default unless the
user's requested format calls for a different structure. Use act titles and
purposes to express the dramatic shape, and use sequence purpose or scene
`storyFunction` values for critical beats such as `hook`, `inciting_incident`,
`first_turn`, `midpoint`, `crisis`, `climax`, and `resolution`.

## Cast And Locations

New create/add records use `key` and must not include `id`:

```json
{
  "key": "urban",
  "handle": "urban",
  "name": "Urban",
  "role": "protagonist"
}
```

Existing records use `id` and must not include `key`:

```json
{
  "id": "cast_urban",
  "handle": "urban",
  "name": "Urban",
  "role": "protagonist"
}
```

Handles are persisted mention names. Use lower-case slug style and keep handles unique across both cast and locations.

## Acts, Sequences, Scenes

Acts contain `sequences`. Sequences contain `scenes`. Scenes require:

- `title`;
- `setting`;
- `blocks`.

Create/add examples use `key`:

```json
{
  "key": "scene-001",
  "title": "Bombardment",
  "setting": {
    "interiorExterior": "EXT",
    "timeOfDay": "DAWN",
    "locationReferences": [{ "key": "theodosian-walls" }]
  },
  "storyFunction": ["hook"],
  "blocks": []
}
```

Update examples use durable `id`:

```json
{
  "id": "scene_existing",
  "title": "Bombardment",
  "setting": {
    "interiorExterior": "EXT",
    "timeOfDay": "DAWN",
    "locationReferences": [{ "id": "location_existing" }]
  },
  "storyFunction": ["hook"],
  "blocks": []
}
```

`scene.update` is a full scene replacement. Include the whole setting and whole blocks array.

## Blocks

Text block types:

- `action`;
- `parenthetical`;
- `transition`;
- `special_heading`;
- `title_card`;
- `super`;
- `shot`;
- `note`.

Text blocks use `text` and may include explicit relationship references:

```json
{
  "type": "action",
  "text": "@urban studies @theodosian-walls through the smoke.",
  "castMemberReferences": [{ "key": "urban" }],
  "locationReferences": [{ "key": "theodosian-walls" }]
}
```

Dialogue blocks use `lines` and a speaker reference:

```json
{
  "type": "dialogue",
  "castMemberReference": { "key": "urban" },
  "extension": "V.O.",
  "parenthetical": "low",
  "lines": ["No furnace is innocent."]
}
```

Do not add block IDs.

## References

Reference objects must contain exactly one of:

- `id`, for an existing durable target;
- `key`, for a target created in the same JSON command.

Use `{ "key": "..." }` only when the target appears as a new record in the same create/apply document.

Use `{ "id": "..." }` when the target already exists in the current screenplay.

Mixed references are valid:

```json
{
  "operation": "scene.add",
  "sequenceId": "sequence_existing",
  "scene": {
    "key": "apprentice-warning",
    "title": "The Apprentice Notices The Crack",
    "setting": {
      "locationReferences": [{ "id": "location_existing_foundry" }]
    },
    "blocks": [
      {
        "type": "dialogue",
        "castMemberReference": { "key": "new-apprentice" },
        "lines": ["The mold is splitting."]
      }
    ]
  }
}
```

## Operations

Supported operation names:

- `screenplay.update`;
- `castMember.add`, `castMember.update`, `castMember.delete`, `castMember.move`;
- `location.add`, `location.update`, `location.delete`, `location.move`;
- `act.add`, `act.update`, `act.delete`, `act.move`;
- `sequence.add`, `sequence.update`, `sequence.delete`, `sequence.move`;
- `scene.add`, `scene.update`, `scene.delete`, `scene.move`.

Add operations for sequences and scenes require an existing parent ID:

- `sequence.add` uses `actId`;
- `scene.add` uses `sequenceId`.

`screenplay.update` replaces the whole top-level `screenplay` object. Start from
`renku screenplay show --json`, keep the fields you still want, then edit the
target fields such as `logline`, `summary`, `centralConflict`, or `dramaticQuestion`.

Move operations require source and target parents:

- `sequence.move` uses `sequenceId`, `fromActId`, `toActId`, and `placement`;
- `scene.move` uses `sceneId`, `fromSequenceId`, `toSequenceId`, and `placement`.

## Placement

Placement uses durable sibling IDs:

```json
{ "beforeId": "scene_before_this" }
```

```json
{ "afterId": "scene_after_this" }
```

```json
{ "position": "only" }
```

Use `position: "only"` only when the target parent is empty.
