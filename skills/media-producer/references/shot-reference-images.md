# Shot Reference Images

Use this when the user or agent explicitly names an ad hoc reference image need during the Codex/Claude flow. The purpose is `shot.reference-image`; the input kind is `reference-image`.

Ad hoc reference images are not a reference sheet format. They are specific reusable visual dependencies, such as:

- a prop insert reference for one shot;
- a lighting continuity reference for a group;
- a hand pose or costume detail;
- a camera-facing environment detail;
- a visual effects state that first/last frames must honor.

## Requirements

Every generated `shot.reference-image` spec must include:

- `purpose`: `shot.reference-image`;
- `dependencyKind`: `reference-image`;
- `outputInputKind`: `reference-image`;
- authored `prompt`;
- authored `title` naming the reference intent;
- exact target scene, shot list, production group, and ordered shot ids.

If the reference need is vague, ask the user to name what the image is for. Do not generate a generic helpful reference.

## Multiple References

Multiple `reference-image` inputs may be generated/imported for the same shot or group. Keep each one separate and title each by intent. Examples:

- `Bronze trigger hand pose`
- `Rainy alley sodium-light continuity`
- `Robe embroidery insert`

After import, these appear in the Studio shot References tab alongside first frames, last frames, and multi-shot storyboard sheets.

## Import

```bash
renku media import --purpose shot.reference-image --target scene:<scene-id> --shot-list <shot-list-id> --shots <shot-id[,shot-id...]> --source generated/media/<reference>.png --title <reference-intent-title> --selection select --receipt <run-json> --json
```
