# Shot Plan JSON Contract

Use only these tagged current documents. Temporary JSON under `tmp/operations/`
is an authoring input, not durable browser state.

## Create

```json
{
  "kind": "shotPlanCreate",
  "sceneId": "scene_exact",
  "title": "Bombardment",
  "coverage": {
    "beatSheetId": "scene_beat_sheet_exact",
    "beatIds": ["beat_1", "beat_2"]
  },
  "shots": []
}
```

## Update Plan Details

```json
{
  "kind": "shotPlanUpdate",
  "title": "Bombardment",
  "coverage": null
}
```

## Shot

```json
{
  "kind": "shot",
  "title": "Window shockwave",
  "description": "Opaque Markdown description.",
  "brief": {}
}
```

Do not add ids, positions, status, image paths, selected image ids, prompts, or
model settings to these documents. Command flags own durable targets.
