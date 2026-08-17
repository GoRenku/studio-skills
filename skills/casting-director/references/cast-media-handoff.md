# Cast Media Handoff

`casting-director` prepares facts and Cast Design. `media-producer` owns
generation specs, estimates, approved runs, inspection, and supported focused
attachments.

Current cast media purposes:

```bash
renku generation context --purpose cast.character-sheet --target cast:<cast-member-id> --json
renku generation context --purpose cast.profile --target cast:<cast-member-id> --json
renku generation context --purpose cast.voice-sample --target cast:<cast-member-id> --json
```

For Cast Members with `isVoiceOver: true`, hand off profile image requests to
`media-producer` as `cast.profile` only. The profile image is a symbolic
navigation Profile Asset, not a Character Sheet or physical character
reference. Do not request `cast.character-sheet` for a voice-over Cast Member
unless the user first changes that Cast Member into a visible on-screen role.
Voice identity and sample audio remain separate Cast Voice / `cast.voice-sample`
work.

Before handoff, read `renku cast design context --cast <cast-member-id> --json` and summarize:

- cast facts that matter;
- active Cast Design guidance;
- known or intended height for visible on-screen cast members;
- one short role or identity synopsis for the block below the face close-up;
- target wardrobe state for the requested sheet;
- character-owned accessories that must remain consistent, if any;
- current character sheet/profile candidates and the exact request-scoped continuity choice, when any;
- existing same-character sheets that should be used as continuity references;
- ad hoc user-collected cast reference images that should be offered as
  optional generation references, such as likeness, accessory, costume, or
  historical source images;
- existing Cast Voices and sample assets when voice media is requested;
- active Lookbook context;
- intended Production or Storyboard rendering mode and the exact prior
  Character Sheet that supplies canonical content, when preparing a Storyboard
  continuity variant;
- whether the request asks for media generation or only design writing.

When an accepted `cast.profile` output should become the Cast Member's current
Profile, ask `media-producer` to import with `--select` in the same mutation.
Character Sheets remain request-scoped candidates: never create a global
Character Sheet selection.

For `cast.character-sheet`, hand off the facts listed above and point Media
Producer to `references/cast-character-sheets.md`, the normative owner of the
universal layout and visual QA. If the user wants a reusable final continuity
sheet and height is missing, ask before handoff unless the user explicitly
chooses to proceed without it. Do not invent height, weight, gender, synopsis
facts, or accessories just because the visual template can display those
fields.

When the user supplies a portrait, uploaded image, or says "in this likeness":

- treat likeness preservation as a binding user constraint;
- capture the visual identity anchors in Cast Design before media handoff;
- hand off the image as an exact `asset-file` reference when it is already a
  registered project asset, or as an exact `project-file` reference when it is
  only an available project-relative file. Ask `media-producer` to assign it to
  an actual media field returned by the selected model descriptor;
- do not silently downgrade the image to a loose text description when a
  selected endpoint accepts the exact reference;
- do not ask media-producer to combine references into one local collage; Renku
  can pass multiple references to capable image models;
- do not import a historical portrait as the final character sheet unless the
  user explicitly wants that source image to be the cast sheet.

There is no focused attachment purpose for a durable generic Cast reference
image. If the user asks to register one independently of a generation request,
report that capability gap. Do not disguise the file as a character
sheet/profile or invent provenance.

Do not run paid generation yourself. Ask `media-producer` to create or update
the persisted generation spec, show the saved spec in the generation preview
dialog, let the user adjust references, and estimate cost only after the
preview is accepted. After a voice sample is generated and approved, attach it
through `renku cast voice attach`; do not import it with `renku media import`.
