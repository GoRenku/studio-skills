# Media Handoff

`production-designer` prepares Location Design. Other skills own downstream work:

- `media-producer` owns `location.environment-sheet` generation specs, estimates, approved runs, inspection, and imports.
- `media-producer` also owns `location.hero` generation/import when a Location needs a compact overview/detail image derived from an approved Location Sheet.

Environment-sheet context:

```bash
renku generation context --purpose location.environment-sheet --target location:<location-id> --json
```

Before handoff, summarize:

- Location facts;
- active Location Design guidance;
- existing Location Sheets and the specific sheet descriptions that matter for the current production need;
- whether a Location Hero Image is needed for overview/detail display;
- active Lookbook dependency;
- whether the user asked for media generation or only design writing.

Do not run paid generation yourself. Do not store generated media paths in Location Design. When shot guidance needs environment references, name the exact full Location Sheets by description instead of asking for front/right/back/left slices.
