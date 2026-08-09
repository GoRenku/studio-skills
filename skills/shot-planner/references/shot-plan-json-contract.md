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
    "sceneBeatsRevisionId": "scene_beats_revision_exact",
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
  "description": "## Intent\n\nIsolate @witness as the blast reaches them.\n\n## Camera & Optics\n\nUse a **Medium Close-Up** with **Shallow Focus**.\n\n## End Condition\n\nEnd when the glass gives way.",
  "brief": {
    "optics": {
      "focalLengthMm": 85,
      "depthOfField": "shallow",
      "focusTarget": "@witness"
    }
  }
}
```

Do not add ids, numbers, positions, status, image paths, selected image ids,
prompts, or model settings to these documents. Command flags own durable
targets, and Core owns Plan/Shot numbering.
`optics.depthOfField` accepts only `"shallow"` or `"deep"`.
