# Screenplay JSON Contract

Use this reference before writing create or update JSON.

## Top-Level Documents

Initial create input keeps Cast Member and Location arrays empty. Those facts are authored first through `renku cast` and `renku location`.

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

Canonical read output from `renku screenplay show --json` uses durable `id` fields, `locationIds` in scene settings, and `castMemberId` for dialogue speaker references.

## Cast Members And Locations

Screenplay JSON references existing Cast Members and Locations. It does not create or update them.

Before screenplay create/apply, create missing facts through:

```bash
renku cast apply --file <cast-operations-json> --json
renku location apply --file <location-operations-json> --json
```

Scene settings reference Locations by durable id:

```json
{
  "interiorExterior": "EXT",
  "timeOfDay": "DAWN",
  "locationReferences": [{ "id": "location_theodosian_walls" }]
}
```

Action blocks can reference existing Cast Members and Locations:

```json
{
  "type": "action",
  "text": "@urban studies @theodosian-walls through the smoke.",
  "castMemberReferences": [{ "id": "cast_urban" }],
  "locationReferences": [{ "id": "location_theodosian_walls" }]
}
```

Dialogue blocks reference the speaker by durable Cast Member id:

```json
{
  "type": "dialogue",
  "castMemberReference": { "id": "cast_urban" },
  "text": "The wall will answer us."
}
```

Use `{ "key": "..." }` only for new acts, sequences, or scenes created inside the same screenplay command. Do not use keys for Cast Members or Locations in screenplay JSON.

## Operation Kinds

Supported screenplay operation families are screenplay metadata, act, sequence, and scene operations. Cast Member and Location fact operations belong to `renku cast` and `renku location`.
