# Lookbook JSON Contract

Lookbook input is a tagged JSON document. Use one of the current Lookbook kinds: `movieLookbook` or `storyboardLookbook`.

## Movie Lookbook

```json
{
  "kind": "movieLookbook",
  "movieLookbook": {
    "name": "Cold Civic Glow",
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
      "observations": [{ "id": "palette-cold-glow", "text": "Specific palette observation." }]
    },
    "toneMood": {
      "tone": "short tonal phrase",
      "moodTags": ["charged"],
      "description": "Contrast, saturation, exposure, and emotional temperature."
    },
    "composition": {
      "description": "Overall compositional strategy.",
      "patterns": [{ "id": "composition-pattern-name", "name": "Pattern name", "description": "How it works." }]
    },
    "lighting": {
      "description": "Overall lighting strategy.",
      "patterns": [{ "id": "lighting-pattern", "name": "Lighting pattern", "description": "How it works." }]
    },
    "texture": {
      "description": "Surface, grain, atmosphere, and material strategy.",
      "observations": [{ "id": "texture-observation", "text": "Specific texture observation." }]
    },
    "camera": {
      "description": "Camera strategy.",
      "movement": [{ "id": "camera-movement-rule", "name": "Movement rule", "description": "When and why the camera moves." }],
      "motion": [{ "id": "camera-motion-rule", "name": "Motion rule", "description": "How motion behaves." }],
      "framing": [{ "id": "camera-framing-rule", "name": "Framing rule", "description": "How frames are built." }]
    }
  },
  "sourceInspirationFolderIds": ["inspiration_folder_abc"]
}
```

Valid Movie Lookbook image sections are `thesis`, `palette`, `toneMood`, `composition`, `lighting`, `texture`, and `camera`.

### Point ids (Movie Lookbooks)

Every `pattern` (in `composition`, `lighting`, and `camera.movement`/`motion`/`framing`) and every `observation` (in `palette` and `texture`) carries a stable `id` that is unique within the Lookbook. Use a readable `<section>-<slug>` form, e.g. `composition-clinical-symmetry`, `palette-biological-green`, `camera-controlled-drift`.

These ids let a generated example image be anchored to the exact point it demonstrates at import time:

```bash
renku media import --purpose lookbook.image --target lookbook:<movie-lookbook-id> --source <file> --sections composition --anchor composition-clinical-symmetry --json
renku media import --purpose lookbook.image --target lookbook:<movie-lookbook-id> --source <file> --sections thesis,texture --anchor texture-cannon-material-states --json
```

`--anchor` requires `--sections` to include the section that owns the point. That owning section becomes point-level evidence; any additional `--sections` values stay section-level evidence. For example, `--sections thesis,texture --anchor texture-cannon-material-states` makes one image appear under the Movie thesis and beside the texture point. An image imported without `--anchor` stays section-level evidence. `thesis` and `toneMood` have no sub-points, so place them with `--sections` only unless they are an additional broad placement alongside some other anchored point. Storyboard Lookbook sections are single-point and never use point ids or `--anchor`.

Movie `thesis` is single-image placement. A new Thesis placement replaces the previous Thesis placement without discarding that previous image or stripping its other placements. Other Movie section and point placements can hold up to 10 images.

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
- Give every Movie Lookbook `pattern` and `observation` a stable, Lookbook-unique `id` (see "Point ids" above). Storyboard sections are single-point and take no `id`.
- Attach generated examples with `renku media import --purpose lookbook.image ...`, using `--sections thesis` for Movie thesis hero evidence and `--anchor <point-id>` to pin an image to a specific pattern or observation when the point-owning section is included in `--sections`.
