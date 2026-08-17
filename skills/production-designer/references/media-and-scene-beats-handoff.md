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
- suggested board sections, such as hero establishing view, reverse angle,
  high-angle overview, layout map, material swatches, lighting studies, key
  landmarks, environmental props, and scale references;
- state or time variants that matter, such as day, night, damaged, intact,
  crowded, empty, before, after, seasonal, or weather-specific;
- key landmarks, entrances, windows, sightlines, movement paths, props, scale
  anchors, materials, palette, lighting behavior, and historical or genre
  guardrails;
- whether a Location Hero Image is needed for overview/detail display;
- active Lookbook context;
- intended Production or Storyboard rendering mode;
- for a Storyboard continuity sheet, the exact accepted Production Location or
  Prop Sheet that supplies canonical geography, construction, scale, and state
  while the current Storyboard Lookbook Sheet supplies appearance;
- whether the user asked for media generation or only design writing.

When an accepted `location.hero` output should become the Location's current
Hero, ask `media-producer` to import it with `--select` in the same mutation.
Location Sheets remain request-scoped candidates: never create a global
Location Sheet selection.

For a Prop handoff, provide the exact Prop id, active Prop Design, every
same-Prop Sheet candidate, an explicit reference choice or none, and whether
the user wants a Hero selected. Never reparent Location media or infer a Prop
from `recurringObjects`.

Do not run paid generation yourself. Do not store generated media paths in Location Design. When Scene Beat illustration needs environment references, name the exact full Location Sheets by description instead of asking for front/right/back/left slices.
