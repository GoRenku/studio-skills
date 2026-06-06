# Shot Multi-Shot Storyboard Sheet

Use this when creating `shot.multi-shot-storyboard-sheet` for an ordered contiguous production group. The output is one readable planning sheet, not a moodboard.

## Required Context

Read:

```bash
renku generation context --purpose shot.video-take --target scene:<scene-id> --shot-list <shot-list-id> --shots <shot-id[,shot-id...]> --json
```

Use `context.target.shotIds` and `context.shots` exactly in order. Do not add, remove, reorder, or merge shots.

## Per-Shot Extraction

For each shot, extract:

1. `shotSpecs` values when present: shot size, subject framing, angle, dutch, movement, directions, track, rig, lens, millimeters, focus, location view, cast references, lookbook reference, custom reference images, custom composition, custom movement.
2. Prompt-facing fields: `shotType`, `cameraAngle`, `cameraMovement`, `framing`, `lensIntent`.
3. Story fields: `storyBeat`, `narrativePurpose`, `description`, `subject`, `action`.
4. Continuity: `castMemberIds`, `locationIds`, `referencedCast`, `referencedLocations`, `activeLookbook`.
5. Notes: `audioNotes`, `productionNotes`, dialogue references only when the exact text is known.

## Prompt Structure

Use a prompt like this, filled with actual shot data:

```text
Create a single storyboard planning sheet for this ordered shot group.

Layout:
- one panel per shot in exact order;
- each panel has a numbered image frame;
- each panel has compact readable metadata below or beside the image;
- include camera arrows or motion marks when movement is specified;
- keep text concise and legible.

Panel metadata:
- Shot / angle
- Camera / movement
- Lens / focus
- Action / description
- Dialogue / VO, only if known
- Audio / SFX / music, only if known
- Transition, only if provided
- Model-facing note
```

Then list each shot as a compact structured block. Include selected composition and motion values explicitly. If values are absent, omit the row or say only what is known; do not invent exact duration, transition, dialogue, music, or SFX.

## Layout Options

Choose one, based on user direction or scene needs:

- Production grid: dense, table-like, good for action or 8-12 shots.
- Clean storyboard strip: fewer shots, strong readability.
- Annotated hand-drawn planning sheet: camera arrows, lens notes, continuity callouts.

## Quality Check Before Import

Reject and regenerate if:

- panel order differs from `target.shotIds`;
- the sheet invents extra shots;
- labels are too small to read;
- selected camera movement or composition is ignored;
- character or location continuity conflicts with context;
- it becomes a moodboard rather than one panel per shot.

Import only after inspection:

```bash
renku media import --purpose shot.multi-shot-storyboard-sheet --target scene:<scene-id> --shot-list <shot-list-id> --shots <shot-id[,shot-id...]> --source generated/media/<sheet>.png --selection select --receipt <run-json> --json
```
