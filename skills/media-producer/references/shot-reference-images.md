# Shot Reference Images

Use this when the user or agent explicitly names an ad hoc reference image need during the Codex/Claude flow. The purpose is `shot.reference-image`; the input kind is `reference-image`.

Ad hoc reference images are not a reference sheet format. They are specific reusable visual dependencies, such as:

- a prop insert reference for one shot;
- a lighting continuity reference for a multi-shot take;
- a hand pose or costume detail;
- a camera-facing environment detail;
- a visual effects state that first/last frames must honor.

## Requirements

Every generated `shot.reference-image` spec must include:

- `purpose`: `shot.reference-image`;
- `dependencyKind`: `reference-image`;
- `outputInputKind`: `reference-image`;
- `referenceMode`: normally `movie-lookbook`;
- authored `prompt`;
- authored `title` naming the reference intent;
- exact target scene, take id, and ordered shot ids.

Use `referenceMode: "storyboard-lookbook"` only when the user explicitly asks
for storyboard, hand-drawn, sketch, animatic, or Storyboard Lookbook aesthetics
for this reference image. Do not use storyboard mode merely because a Storyboard
Lookbook or scene storyboard sheet exists.

If the reference need is vague, ask the user to name what the image is for. Do not generate a generic helpful reference.

If the user wants Codex built-in image generation, use the same authored
reference intent to prompt `$imagegen`, save the selected image inside the
project, inspect it, and import it without `--receipt`. If the current image
tool cannot accept actual image references, disclose that selected Movie
Lookbook, Location Sheet, and Character Sheet files cannot be used as image
conditioning through that path; prefer Renku-managed reference-capable
generation when the reference image must use those selected sheets directly. Do
not imitate those references through local compositing, recoloring, filters, or
other post-processing.

## Multiple References

Multiple `reference-image` inputs may be generated/imported for the same single-shot or multi-shot take. Keep each one separate and title each by intent. Examples:

- `Bronze trigger hand pose`
- `Rainy alley sodium-light continuity`
- `Robe embroidery insert`

After import, these appear in the Studio shot References tab alongside first frames, last frames, and video prompt sheets.

## Import

```bash
renku media import --purpose shot.reference-image --target scene:<scene-id> --take <take-id> --source generated/media/<reference>.png --title <reference-intent-title> --selection select --receipt <run-json> --json
```

Omit `--receipt` when the reference image came from Codex built-in image
generation or another non-Renku source.
