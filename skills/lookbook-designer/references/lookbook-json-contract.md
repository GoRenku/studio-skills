# Lookbook JSON Contract

Lookbook input is a tagged JSON document. Use one of the current Lookbook kinds: `movieLookbook` or `storyboardLookbook`.

## Movie Lookbook

```json
{
  "kind": "movieLookbook",
  "name": "Cold Civic Glow",
  "movieLookbook": {
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

Valid Movie Lookbook image sections are `thesis`, `palette`, `toneMood`, `composition`, `lighting`, `texture`, and `camera`.

## Storyboard Lookbook

A Storyboard Lookbook describes a drawing/illustration **style**, not shot
direction. Camera, composition, panel notation, screen direction, and continuity
are directed later in the flow and must not appear here.

Each section keeps a required `text` field that is the prompt-facing source of
truth. Every other field is optional and drives the Studio style widgets. Omit a
field when it does not fit the style. The style is not assumed to be graphite or
monochrome: `styleKind` is free-form and `palette`/`accents`/`valueSteps` work for
full colour, cartoon, realistic, or sketch styles too.

```json
{
  "kind": "storyboardLookbook",
  "storyboardLookbook": {
    "name": "Sepia Graphite Siege Boards",
    "styleBrief": {
      "text": "Overall storyboard style: medium, substrate, palette, and intent. This text is sent to the image model.",
      "styleKind": "graphite hand-drawn",
      "palette": [
        { "hex": "#ede7d6", "name": "Paper", "meaning": "Warm off-white substrate." },
        { "hex": "#2b2a28", "name": "Line", "meaning": "Graphite contour." },
        { "hex": "#a8763c", "name": "Bronze", "meaning": "Restrained accent on metal and fire." }
      ],
      "tags": ["1452 siege", "tactile", "heavy"]
    },
    "lineAndFinish": {
      "text": "Line weight, mark type, finish level, and visible construction.",
      "marks": [
        { "label": "contour", "thickness": 5 },
        { "label": "interior", "thickness": 2.5 },
        { "label": "guide", "thickness": 1 }
      ],
      "hatching": "Sparse cross-hatch in shadow only."
    },
    "valueAndAccent": {
      "text": "Value range, contrast, and where the accent is allowed.",
      "valueSteps": ["#ede7d6", "#b8b2a2", "#807c73", "#4a4844", "#232220"],
      "contrast": "high",
      "accents": [
        { "hex": "#a8763c", "name": "Bronze", "meaning": "Metal and fire only." }
      ]
    },
    "guardrails": {
      "text": "Concrete things the storyboard style must avoid.",
      "forbidden": ["photorealistic film stills", "fantasy spectacle", "ornate costume plates"],
      "favored": ["grounded siege imagery"]
    }
  },
  "sourceInspirationFolderIds": []
}
```

Optional field reference:

- `styleBrief.styleKind` (string), `styleBrief.palette` (ColorSwatch[]),
  `styleBrief.tags` (string[]).
- `lineAndFinish.marks` (`{ label, thickness }[]`, thickness is a relative
  number), `lineAndFinish.hatching` (string). Omit `marks` for styles with no
  linework (e.g. realistic).
- `valueAndAccent.valueSteps` (array of `#rrggbb` stops, light to dark),
  `valueAndAccent.contrast` (string), `valueAndAccent.accents` (ColorSwatch[]).
- `guardrails.forbidden` (string[]), `guardrails.favored` (string[]).

Valid Storyboard Lookbook image sections are `styleBrief`, `lineAndFinish`,
`valueAndAccent`, and `guardrails`.

Rules:

- Unknown fields are errors.
- Missing required sections are errors.
- Arrays required by the schema must not be empty.
- `name` is required for create and update documents.
- `sourceInspirationFolderIds` is optional.
- If `sourceInspirationFolderIds` is present on update, it replaces existing source relationships.
- If `sourceInspirationFolderIds` is omitted on update, existing source relationships are preserved.
- If `sourceInspirationFolderIds` is `[]`, existing source relationships are cleared.
- Do not include `imageFiles` anywhere.
- Attach generated examples with `renku media import --purpose lookbook.image ...`.
