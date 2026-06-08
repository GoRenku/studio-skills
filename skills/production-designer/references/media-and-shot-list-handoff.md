# Media Handoff

`production-designer` prepares Location Design. Other skills own downstream work:

- `media-producer` owns `location.environment-sheet` generation specs, estimates, approved runs, inspection, slicing, and imports.

Environment-sheet context:

```bash
renku generation context --purpose location.environment-sheet --target location:<location-id> --json
```

Before handoff, summarize:

- Location facts;
- active Location Design guidance;
- selected environment-sheet media;
- active Lookbook dependency;
- whether the user asked for media generation or only design writing.

Do not run paid generation yourself. Do not store generated media paths in Location Design.
