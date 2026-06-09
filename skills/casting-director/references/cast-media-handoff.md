# Cast Media Handoff

`casting-director` prepares facts and Cast Design. `media-producer` owns generation specs, estimates, approved runs, inspection, and imports.

Current cast media purposes:

```bash
renku generation context --purpose cast.character-sheet --target cast:<cast-member-id> --json
renku generation context --purpose cast.profile --target cast:<cast-member-id> --json
renku generation context --purpose cast.voice-sample --target cast:<cast-member-id> --json
```

Before handoff, read `renku cast design context --cast <cast-member-id> --json` and summarize:

- cast facts that matter;
- active Cast Design guidance;
- selected character sheet/profile media;
- existing Cast Voices and sample assets when voice media is requested;
- active Lookbook dependency;
- whether the request asks for media generation or only design writing.

Do not run paid generation yourself. Ask `media-producer` to create or update the persisted generation spec and estimate cost. After a voice sample is generated and approved, attach it through `renku cast voice attach`; do not import it with `renku media import`.
