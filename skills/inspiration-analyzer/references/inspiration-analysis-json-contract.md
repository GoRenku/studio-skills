# Inspiration Analysis JSON Contract

Author a tagged document:

```json
{
  "kind": "inspirationAnalysis",
  "analysis": {
    "thesis": {
      "statement": "3-5 sentence thesis of the folder's visual language.",
      "principles": ["Imperative cinematography principle."],
      "imageFiles": ["frame-001.png"]
    },
    "palette": {
      "description": "How color operates as a strategy.",
      "colors": [
        {
          "hex": "#4F6B72",
          "name": "Industrial cyan",
          "meaning": "What this color does visually or narratively."
        }
      ],
      "observations": [
        {
          "text": "Specific color observation.",
          "imageFiles": ["frame-001.png"]
        }
      ]
    },
    "toneMood": {
      "tone": "short tonal phrase",
      "moodTags": ["lonely", "humid", "procedural"],
      "description": "How contrast, exposure, saturation, and emotional temperature behave.",
      "imageFiles": ["frame-001.png"]
    },
    "composition": {
      "description": "Overall compositional strategy.",
      "patterns": [
        {
          "name": "Memorable pattern name",
          "description": "How it works.",
          "imageFiles": ["frame-001.png"]
        }
      ]
    },
    "lighting": {
      "description": "Overall lighting approach.",
      "patterns": [
        {
          "name": "Memorable technique name",
          "description": "How it is used.",
          "imageFiles": ["frame-001.png"]
        }
      ]
    },
    "texture": {
      "description": "Surface, grain, tactility, lens/filter feel, production texture.",
      "observations": [
        {
          "text": "Specific texture observation.",
          "imageFiles": ["frame-001.png"]
        }
      ]
    },
    "inspiredBy": {
      "description": "Visual-lineage note.",
      "items": [
        {
          "category": "movie",
          "name": "Reference name",
          "confidence": "medium",
          "why": "Specific shared visual strategy.",
          "imageFiles": ["frame-001.png"]
        }
      ]
    }
  }
}
```

Rules:

- The folder ID comes from `--folder`, not the JSON.
- Use folder-local filenames in `imageFiles`.
- Do not use absolute paths or project-relative paths in `imageFiles`.
- Unknown fields are errors.
- Required missing fields are errors.
- Empty strings are errors.
- Referenced `imageFiles` must exist in the Inspiration folder.
