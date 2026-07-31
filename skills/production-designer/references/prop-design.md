# Prop Design

Read Prop context and write strict `kind: "propDesign"` JSON through:

```bash
renku production-design prop context --prop <prop-id> --json
renku production-design prop validate --file <prop-design-json> --json
renku production-design prop write --file <prop-design-json> --json
```

The design envelope contains:

```json
{
  "kind": "propDesign",
  "propId": "<prop-id>",
  "title": "Field Cannon Prop Design",
  "design": {
    "designThesis": "Monumental engineering made physically credible.",
    "formAndSilhouette": [],
    "materialsAndSurfaces": [],
    "constructionAndFunction": [],
    "scaleAndHandling": [],
    "statesAndVariants": [],
    "continuity": [],
    "propSheetGuidance": [],
    "generationGuidance": []
  }
}
```

Keep generated paths, Asset ids, provider inputs, and prompt text out of Prop
Design. The document supplies authored design direction; `media-producer`
authors and reviews exact generation requests separately.
