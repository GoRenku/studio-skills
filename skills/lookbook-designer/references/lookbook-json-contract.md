# Lookbook JSON Contract

Lookbook input is a tagged JSON document.

Required top-level shape:

```json
{
  "kind": "lookbook",
  "lookbook": {
    "thesis": {
      "statement": "Project visual-language thesis.",
      "principles": ["Repeatable visual principle."]
    },
    "palette": {
      "description": "How color works.",
      "colors": [
        {
          "hex": "#39FF75",
          "name": "Acid tenderness",
          "meaning": "Care that has become unstable."
        }
      ],
      "observations": [{ "text": "Specific palette observation." }]
    },
    "toneMood": {
      "tone": "short tonal phrase",
      "moodTags": ["charged"],
      "description": "Contrast, saturation, exposure, and emotional temperature."
    },
    "composition": {
      "description": "Overall compositional strategy.",
      "patterns": [{ "name": "Pattern name", "description": "How it works." }]
    },
    "lighting": {
      "description": "Overall lighting strategy.",
      "patterns": [{ "name": "Lighting pattern", "description": "How it works." }]
    },
    "texture": {
      "description": "Surface, grain, atmosphere, and material strategy.",
      "observations": [{ "text": "Specific texture observation." }]
    },
    "camera": {
      "description": "Camera strategy.",
      "movement": [{ "name": "Movement rule", "description": "When and why the camera moves." }],
      "motion": [{ "name": "Motion rule", "description": "How motion behaves." }],
      "framing": [{ "name": "Framing rule", "description": "How frames are built." }]
    }
  },
  "sourceInspirationFolderIds": ["inspiration_folder_abc"]
}
```

Rules:

- Unknown fields are errors.
- Missing required sections are errors.
- Arrays required by the schema must not be empty.
- `sourceInspirationFolderIds` is optional.
- If `sourceInspirationFolderIds` is present on update, it replaces existing source relationships.
- If `sourceInspirationFolderIds` is omitted on update, existing source relationships are preserved.
- If `sourceInspirationFolderIds` is `[]`, existing source relationships are cleared.
- Do not include `imageFiles` anywhere.
- Attach generated examples with `renku lookbook image ...` commands.
