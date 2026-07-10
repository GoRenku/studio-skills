# Shot Video Take Renku Workflow

Use this for deterministic final `shot.video-take` lifecycle work: authoring
state, preflight, preview, validation, estimate, approval, run, import, and
post-run QA.

Do not use this as a creative prompt guide. Load the provider-visible and
model-specific prompt references before drafting final provider prompt text.

## Authoring Context

Before creating, estimating, approving, or running a final `shot.video-take`
spec, re-read persisted take context:

```bash
renku take authoring context --take <take-id> --json
```

Final generation uses persisted take state, not memory from an earlier
authoring apply response. If the persisted model, input mode, route parameters,
reference choices, composition, motion, or prompt draft no longer match the
prompt assumptions, revise the authoring document before paid generation.

For multi-cut takes, include the selected shot only when editing one shot's
direction:

```bash
renku take authoring context --take <take-id> --selected-shot <shot-id> --json
```

## Authoring Changes

When changing take-owned state, write a full
`sceneShotVideoTakeAuthoring` document that preserves:

- `takeId`;
- `sceneId`;
- `sourceShotListId`;
- `baseTakeUpdatedAt`;
- unchanged directions;
- unchanged selected inputs;
- unchanged production fields.

Validate before applying:

```bash
renku take authoring validate --file shot-video-take-authoring.json --json
renku take authoring apply --file shot-video-take-authoring.json --json
```

If validation reports a stale `baseTakeUpdatedAt`, re-read authoring context and
rebuild from the fresh state. Do not replay an old document as a patch.

Validation output contains `prior` and `current`; apply output also contains
`prior` and `current`. Compare them before proceeding so accidental overwrites
are visible.

## Production Proposal

Write a `ShotVideoTakeAgentProposal` into
`document.production.agentProposal`.

Use:

- `inputModeId`, not `intentId`;
- `basedOnInputModeId`, not `basedOnIntentId`.

The proposal must include:

- `basedOnInputModeId`;
- `basedOnModelChoice`;
- `basedOnShotIds`;
- `dependencyDrafts[]` for every generated shot dependency that preflight needs;
- `finalPromptDraft` for `shot.video-take`.

If preflight reports `CORE_SHOT_VIDEO_DEPENDENCY_DRAFT_MISSING` or
`CORE_SHOT_VIDEO_FINAL_PROMPT_DRAFT_MISSING`, do not generate. Author the
missing dependency draft or prompt first.

Mechanical readiness is not prompt-quality readiness. Mechanical readiness
means Core has the required inputs, model, route, parameters, and prompt field.
Prompt-quality readiness means the final prompt names provider references,
preserves input constraints, and passes shared and route-specific checklists.
Report both when the user asks whether a take is ready.

## Final Spec Lifecycle

For every persisted final `shot.video-take` spec:

1. Validate:

```bash
renku generation spec validate --file <spec-json> --json
```

2. Persist:

```bash
renku generation spec create --file <spec-json> --json
```

3. Preview:

```bash
renku generation preview show --spec <spec-id> --json
```

4. Wait for user review in the agent harness.
5. If the user changes prompt, model, route, parameters, source image, or
   reference choices, revise the same spec or authoring state, show preview
   again, and continue only after approval. If the user dismisses the Studio UI
   dialog or asks to see the generation preview again, rerun the same preview
   command; preview display is repeatable and does not estimate, run, or mutate
   durable media.
6. Estimate:

```bash
renku generation estimate --spec <spec-id> --json
```

7. Ask the user to approve cost and sending the preview-approved provider
   context transfer.
8. Run only after approval:

```bash
renku generation run --spec <spec-id> --approve-live-provider-run --json
```

9. Inspect generated media before final import.
10. Import with `shot.video-take`.

For final `shot.video-take` generation, show the persisted final spec through
`renku generation preview show --spec <spec-id> --json` before estimate/run.
Core owns the preview envelope, provider token order, logical references,
configuration, and diagnostics. Do not hand-author final video preview JSON.

## Preview Replay

When the user says "show the generation preview again", "present me the
generation preview again", "I dismissed the preview", or similar, show the same
final video preview again.

Use the known spec id when available:

```bash
renku generation preview show --spec <spec-id> --json
```

If the spec id is not known, resolve the working take first, then list final
video specs for that take:

```bash
renku studio current --json
renku take authoring context --take <take-id> --json
renku generation spec list --purpose shot.video-take --target scene:<scene-id> --take <take-id> --json
```

Show the preview only when a single relevant current spec is unambiguous. If
multiple specs could match, ask which spec to preview instead of guessing.

After replaying the preview, return to the same review gate. Do not estimate or
run until the user explicitly approves the preview and then separately approves
the estimate/cost and provider context transfer.

## Provider Field Failures

If validation, estimate, or run fails because the provider rejects an
unsupported field such as `negative_prompt`, do not only remove the field and
continue. Re-read provider preview and the final prompt. Move essential negative
constraints into the main prompt when the route lacks a separate negative
field, then rerun the prompt-quality checklist before paid approval.

## Import

Final video import attaches the video output to the take and preserves ordered
shot rows:

```bash
renku media import \
  --purpose shot.video-take \
  --target take:<take-id> \
  --source tmp/media/<shot-video-output>.mp4 \
  --receipt <run-json> \
  --json
```

Each take has one attached final video. If the target take has no video, Core
attaches the imported file to that take. If the target take already has a video,
Core creates the next iteration take, preserves ordered shot ids, selected
inputs, model, parameters, and authored prompt state, then attaches the file to
the returned take.

If authoring changes were applied after the source take already had a video,
Core may already have returned the next active `takeId`; continue with that id
for spec creation, generation, and final import.

Use the import report fields `sourceTake`, `take`,
`createdRegeneratedTake`, and `video` in the user-facing summary.

Do not write output rows, add alternate videos to one take, manually copy take
settings, use a manual duplicate/regenerate button, or import final video into
a generic asset slot.

## Post-Run QA

Do not call a final take successful merely because the provider returned a file
or import attached it. Inspect or scrub the clip when the environment supports
it.

For storyboard-reference videos, compare output against:

- agent-owned storyboard brief;
- visible storyboard strategy;
- artifact suppression;
- geography;
- object/character counts;
- camera liveliness;
- ending behavior;
- narration/dialogue placement.

If import attached a weak output, say so plainly and recommend targeted
regeneration rather than presenting it as final.
