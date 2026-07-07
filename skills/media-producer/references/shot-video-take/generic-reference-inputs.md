# Generic Shot Video Reference Inputs

Use this for non-storyboard reference inputs prepared for a Shot Video Take:

- `shot.reference-image`;
- imported or selected image references;
- imported or selected video references;
- imported or selected audio references.

Do not use this for storyboard/reference image dependencies. Use
`storyboard-reference-image.md` for `shot.video-prompt-sheet`.

## Ad Hoc Reference Images

Use `shot.reference-image` when the user or agent explicitly names an ad hoc
reference need during the agent flow. The input kind is `reference-image`.

Ad hoc reference images are not a reference sheet format. They are specific
reusable visual dependencies, such as:

- prop insert reference for one shot;
- lighting continuity reference for a multi-shot take;
- hand pose or costume detail;
- camera-facing environment detail;
- visual effects state that first/last frames must honor.

Every generated `shot.reference-image` spec must include:

- `purpose`: `shot.reference-image`;
- `dependencyKind`: `reference-image`;
- `outputInputKind`: `reference-image`;
- `referenceMode`: normally `movie-lookbook`;
- authored `prompt`;
- authored `title` naming the reference intent;
- exact target take id and ordered shot ids.

Use `referenceMode: "storyboard-lookbook"` only when the user explicitly asks
for storyboard, hand-drawn, sketch, animatic, or Storyboard Lookbook aesthetics
for this reference image. Do not use storyboard mode merely because a Storyboard
Lookbook or scene storyboard sheet exists.

If the reference need is vague, ask the user to name what the image is for. Do
not generate a generic helpful reference.

## Codex Built-In Image Generation

If the user wants Codex built-in image generation, use the same authored
reference intent to prompt `$imagegen`, save the selected image inside the
project, inspect it, and import it without `--receipt`.

If the current image tool cannot accept actual image references, disclose that
the project Movie Lookbook, Location Sheet, and Character Sheet files cannot be
used as image conditioning through that path. Prefer Renku-managed
reference-capable generation when the reference image must use those project
reference files directly. Do not imitate references through local compositing,
recoloring, filters, or other post-processing.

## Multiple References

Multiple `reference-image` inputs may be generated/imported for the same
single-shot or multi-shot take. Keep each one separate and title each by intent.

Examples:

- `Bronze trigger hand pose`;
- `Rainy alley sodium-light continuity`;
- `Robe embroidery insert`.

After import, these appear in the Studio shot References tab alongside first
frames, last frames, and storyboard reference images.

## Audio And Video References

When a final route can consume video or audio references, keep roles narrow:

- video reference: motion, timing, performance, camera rhythm, or texture only;
- audio reference: narrator voice, speaker voice character, ambience, sound
  character, or rhythm only.

Do not imply exact editorial sync unless the workflow provides exact-sync
composition, lipsync, or talking-head control.

## Handoff

After generation/import/selection, preserve a handoff note:

- reference token role expected later;
- exact visual/audio feature to preserve;
- what must not be copied from the reference;
- continuity constraints;
- known caveats.

## Import

```bash
renku media import \
  --purpose shot.reference-image \
  --target take:<take-id> \
  --source generated/media/<reference>.png \
  --title <reference-intent-title> \
  --selection select \
  --receipt <run-json> \
  --json
```

Omit `--receipt` when the reference image came from Codex built-in image
generation or another non-Renku source.
