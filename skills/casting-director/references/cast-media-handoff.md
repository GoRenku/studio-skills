# Cast Media Handoff

`casting-director` prepares facts and Cast Design. `media-producer` owns generation specs, estimates, approved runs, inspection, and imports.

Current cast media purposes:

```bash
renku generation context --purpose cast.character-sheet --target cast:<cast-member-id> --json
renku generation context --purpose cast.profile --target cast:<cast-member-id> --json
```

Before handoff, read `renku cast design context --cast <cast-member-id> --json` and summarize:

- cast facts that matter;
- active Cast Design guidance;
- selected character sheet/profile media;
- active Lookbook dependency;
- whether the request asks for media generation or only design writing.

Do not run paid generation yourself. Ask `media-producer` to create or update the persisted generation spec and estimate cost.
