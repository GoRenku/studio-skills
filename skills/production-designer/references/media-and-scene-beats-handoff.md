# Media Handoff

`production-designer` prepares Location Design. Other skills own downstream work:

- `media-producer` owns `location.sheet` generation specs, estimates, approved
  runs, inspection, and focused attachment.
- `media-producer` also owns `location.hero` generation/import when a Location needs a compact overview/detail image derived from an approved Location Sheet.
- `media-producer` owns `prop.sheet` and `prop.hero` for durable Props.

Location Sheet context:

```bash
renku generation context --purpose location.sheet --target location:<location-id> --json
```

Before handoff, summarize:

- Location facts;
- active Location Design guidance;
- existing Location Sheets and the specific sheet descriptions that matter for the current production need;
- every current same-Location Sheet candidate, with an explicit request-scoped choice or none for continuity rather than an origin-level selection;
- the Location type, such as interior, exterior, threshold, landscape, urban,
  vehicle-like, abstract, or mixed;
- the production questions a new Location Sheet must answer for Scene Beat illustration and future Shot planning;
- one explicit spatial plan: named or relative sides, the opening on each side,
  fixed landmarks, the main furniture or movement axis, and which sides oppose
  each other;
- the focused view set needed to prove that plan, normally an establishing
  view, its matched reverse, two perpendicular side views, and one authoritative
  top-down plan for an interior;
- state or time variants that matter, such as day, night, damaged, intact,
  crowded, empty, before, after, seasonal, or weather-specific;
- key landmarks, entrances, windows, sightlines, movement paths, major fixed
  furniture, construction and surface condition, palette, actual light sources,
  lighting behavior, and historical or genre guardrails;
- exact appearance locks needed across every view: door and window construction,
  floor/wall/ceiling materials and wear, major furniture design and condition,
  built-ins, sparse dressing, and grounded anachronism exclusions;
- whether a Location Hero Image is needed for overview/detail display;
- active Lookbook context;
- intended Production or Storyboard rendering mode;
- for a Storyboard continuity sheet, the exact accepted Production Location or
  Prop Sheet that supplies canonical geography, construction, scale, and state
  while the current Storyboard Lookbook Sheet supplies appearance;
- whether the user asked for media generation or only design writing.

Default a Location Sheet to spatial views plus the plan. Do not propose
material swatches, prop studies, object close-ups, lighting-study panels,
palette cards, human-scale figures, or other filler unless the user explicitly
asks for that separate production question. Apply materials, lighting, and
atmosphere inside the spatial views instead.

Before handoff, compare the proposed plan with every selected spatial
reference and the user's corrections. If they disagree, show or describe the
simple plan for resolution and do not generate the sheet yet.

When the Location Sheet will feed `location-world-producer`, say so explicitly.
Request four equal-size, equal-aspect perspective panels suitable for clean
cropping, plus the authoritative plan. Place small captions outside the image
panels. Choose one unobstructed camera area or compact nearby cluster from the
plan so the four perspectives can cover different directions with recognizable
overlap. This camera area guides source-image authoring; do not claim that World
Labs accepts a pivot coordinate.

Do not ask `media-producer` for four unrelated inventions. The accepted sheet is
the common spatial and visual authority. `location-world-producer` will crop
only the four perspective panels, normalize those flat images to identical
dimensions, review them, and submit them through Auto Layout. The top-down plan
and the composite sheet are never World Labs image inputs.

When an accepted `location.hero` output should become the Location's current
Hero, ask `media-producer` to import it with `--select` in the same mutation.
Location Sheets remain request-scoped candidates: never create a global
Location Sheet selection.

For a Prop handoff, provide the exact Prop id, active Prop Design, every
same-Prop Sheet candidate, an explicit reference choice or none, and whether
the user wants a Hero selected. Never reparent Location media or infer a Prop
from `recurringObjects`.

Do not run paid generation yourself. Do not store generated media paths in Location Design. When Scene Beat illustration needs environment references, name the exact full Location Sheets by description instead of asking for front/right/back/left slices.
