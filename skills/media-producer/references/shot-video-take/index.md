# Shot Video Take Router

Use this first for any Shot Video Take media work. It routes the agent to the
minimum reference files needed for the active task.

Shot Video Take work includes:

- prepared input dependencies for a take;
- final `shot.video-take` video prompting;
- final video preview, estimate, run, import, and post-run QA.

Do not infer a take from nearby scenes, newest files, prior chat, or sample
projects. Resolve the working take first.

## Current-Take Gate

Explicit user references win. If the user gives a durable take id, use it. If
the user says "this take", "current", "selected", "open", "the take I am
working on", or gives no durable take reference, run:

```bash
renku studio current --json
```

Continue only when Studio current identifies an existing Shot Video Take id. If
it shows a scene, shot list, new-take form, unrelated tab, or no take id, stop
and ask the user to open the take or provide the take id.

## Required Context

Read the canonical authoring context before making dependency, model, prompt,
estimate, run, or import decisions:

```bash
renku take authoring context --take <take-id> --json
```

Use `document.shotIds` and `context.shots` exactly in order. Use
`document.structure.sharedDirection` for continuous takes and
`document.structure.directionsByShotId[shotId]` for multi-cut takes. Do not add,
remove, reorder, or merge selected shots.

Read model choices when choosing or confirming a final video model/input mode:

```bash
renku generation model list \
  --purpose shot.video-take \
  --target take:<take-id> \
  --intent <input-mode-id> \
  --shots <shot-id>[,<shot-id>...] \
  --json
```

Read reusable dependency candidates when selecting or replacing prepared inputs:

```bash
renku generation input list \
  --purpose shot.video-take \
  --target take:<take-id> \
  --json
```

## Load The Next Files

For final video lifecycle, spec, preview, estimate, run, and import, read:

- `renku-workflow.md`

For any final video provider prompt, read:

- `provider-visible-prompting.md`
- `prompt-quality-checklist.md`

For dependency creation, import, replacement, or handoff, read:

- `input-dependencies.md`

Then load only the relevant dependency file:

- storyboard/reference image dependency: `storyboard-reference-image.md`
- first-frame or last-frame dependency: `first-last-frame-dependencies.md`
- non-storyboard image/video/audio reference dependency:
  `generic-reference-inputs.md`

For Seedance final video prompting, read:

- `seedance/index.md`
- `seedance/route-matrix.md`

Then load exactly one route file:

- text-only: `seedance/text-only-final-video.md`
- image-to-video / first-frame: `seedance/image-to-video-final-video.md`
- first-and-last-frame: `seedance/first-last-frame-final-video.md`
- storyboard/reference image input:
  `seedance/storyboard-reference-final-video.md`
- non-storyboard reference-to-video:
  `seedance/generic-reference-final-video.md`

Load `seedance/native-audio.md` only when native Seedance audio, narration,
dialogue, ambience, or audio references matter.

For Kling final video prompting, read:

- `kling/index.md`

Use the common provider-visible and prompt-quality files with Kling too.

## Decision Order

1. Establish the take.
2. Read take authoring context.
3. Decide whether the task is dependency work or final video work.
4. For dependency work, load only the dependency router and matching dependency
   file.
5. For final video work, load the common workflow, provider-visible prompting,
   prompt-quality checklist, and active model route files.
6. Build or read provider preview before final prompt approval so provider
   tokens match actual prepared inputs.
7. Draft or revise the prompt.
8. Run the prompt-quality checklist before preview approval, estimate, or paid
   generation.

## Supported Purpose Keys

- `image.create` for generated first-frame, last-frame, reference-image, and video-prompt-sheet inputs
- `shot.input --kind first-frame|last-frame|reference-image|video-prompt-sheet` for imports
- `shot.video-take`

Use these concrete purpose/import keys directly. Do not use the retired Shot
image generation purpose names.

## Architecture Boundary

Core owns take state, context, validation, preflight, spec persistence, provider
mapping, runs, imports, reusable dependency relationships, video attachment, and
automatic iteration from already-videoed takes.

The skill owns creative dependency analysis, prompt drafting, visual inspection,
handoff notes, prompt-quality checks, and user-facing QA advice.

Never write `.renku/project.sqlite` directly. Never patch durable take state
through Studio routes or generic state mutations. Never submit raw provider
payload JSON. Submit logical Renku specs and authoring documents.
