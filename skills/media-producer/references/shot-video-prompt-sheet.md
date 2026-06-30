# Shot Video Prompt Sheet

Use this when creating `shot.video-prompt-sheet` for an ordered multi-shot take. The output is one readable AI-video prompt sheet that clarifies shot order, continuity, motion, and model-facing visual notes. It is not a scene-owned storyboard sheet and not a moodboard.

## Required Context

Read:

```bash
renku take authoring context --take <take-id> --json
```

Use `document.shotIds` and `context.shots` exactly in order. Do not add, remove,
reorder, or merge shots.

If the user wants Codex built-in image generation, or `agentMedia` prefers
`codexBuiltInWhenAvailable` and the image tool is available, use the context and
prompt structure below to prompt `$imagegen`, stage the selected planning sheet
under project `generated/media/`, inspect it, and import it with `renku media import`
without `--receipt`.

## Per-Shot Extraction

For each shot, extract:

1. Take-owned direction from `document.structure`: for continuous takes use `sharedDirection`; for multi-cut takes use `directionsByShotId[shotId]`. Extract composition, motion, cast, location, lookbook, reference images, dialogue, and custom notes only when present.
2. Baseline shot-list fields from `context.shots`: `storyBeat`, `narrativePurpose`, `description`, `subject`, and `action`.
3. Continuity: `referencedCast`, `referencedLocations`, `activeLookbook`, selected media inputs, and storyboard images.
4. Notes: `audioNotes`, `productionNotes`, dialogue references only when the exact text is known.

## Prompt Structure

Use a prompt like this, filled with actual shot data:

```text
Create a single storyboard planning sheet for this ordered take.

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

Do not import automatically when:

- panel order differs from `target.shotIds`;
- the sheet invents extra shots;
- labels are too small to read;
- selected camera movement or composition is ignored;
- character or location continuity conflicts with context;
- it becomes a moodboard rather than one panel per shot.

For any failed check, show or describe the sheet, explain the practical impact
on downstream shot/video work, and ask whether the user wants to accept it with
caveats, revise the prompt/spec, or approve a Codex image iteration or
Renku-managed paid generation. Do not regenerate automatically.

Import only after inspection:

```bash
renku media import --purpose shot.video-prompt-sheet --target take:<take-id> --source generated/media/<sheet>.png --selection select --receipt <run-json> --json

```

Omit `--receipt` when the sheet came from Codex built-in image generation or
another non-Renku source.

Use `--replace-selected` on the import command only when the user is correcting a prior selected video prompt sheet and wants the old selected sheet discarded in the same slot.
