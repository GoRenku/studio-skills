# Shot Video Take Media Production

Use this reference for final AI video takes for one shot or one ordered contiguous shot group. Core owns context, validation, preflight, spec persistence, provider mapping, runs, imports, reusable dependency relationships, and final take attachment. The skill owns creative dependency analysis and model-specific prompt drafting.

Never write `.renku/project.sqlite` directly. Never override the user-selected input mode, model, parameters, or shot group. Never submit raw provider payload JSON; submit logical Renku specs and production plans. Never rely on fallback prompts. Paid generation requires an authored prompt and, for ad hoc reference images, an authored title naming the reference intent.

## Purposes

- `shot.first-frame`: carefully authored opening still for a shot video take.
- `shot.last-frame`: carefully authored closing still for a first/last-frame workflow.
- `shot.reference-image`: ad hoc shot or group reference image generated only for a named reference need.
- `shot.multi-shot-storyboard-sheet`: one storyboard planning sheet for an ordered contiguous shot group.
- `shot.video-take`: final video take attached to the ordered shot group.

Use `fal-ai/openai/gpt-image-2` as the default image dependency model unless the user or model report chooses another supported dependency image model.

## Resolve Context

1. Confirm the current project with `renku project current --json` when needed.
2. Resolve the scene id from Studio focus or screenplay navigation.
3. Resolve the active or specified Scene Shot List id.
4. Resolve the selected shot id, or an ordered contiguous shot id list for a group.
5. Read bounded context:

```bash
renku generation context \
  --purpose shot.video-take \
  --target scene:<scene-id> \
  --shot-list <shot-list-id> \
  --shots <shot-id>[,<shot-id>...] \
  --json
```

Use `context.shots` as the ordered source of truth. Prefer `shot.shotSpecs` values when present, then the prompt-facing shot fields: `shotType`, `cameraAngle`, `cameraMovement`, `framing`, `lensIntent`, `subject`, `action`, `audioNotes`, and `productionNotes`.

## Model And Input Workflow

Read model choices for the chosen input mode:

```bash
renku generation model list \
  --purpose shot.video-take \
  --target scene:<scene-id> \
  --shot-list <shot-list-id> \
  --shots <shot-id>[,<shot-id>...] \
  --intent <input-mode-id> \
  --json
```

Read reusable dependency candidates:

```bash
renku generation input list \
  --purpose shot.video-take \
  --target scene:<scene-id> \
  --shot-list <shot-list-id> \
  --shots <shot-id>[,<shot-id>...] \
  --json
```

Select a reusable dependency only when the user wants reuse and it matches the current ordered shot ids:

```bash
renku generation input select \
  --purpose shot.video-take \
  --target scene:<scene-id> \
  --shot-list <shot-list-id> \
  --shots <shot-id>[,<shot-id>...] \
  --input <shot-video-take-input-id> \
  --json
```

Clear a selected slot before regenerating it:

```bash
renku generation input clear \
  --purpose shot.video-take \
  --target scene:<scene-id> \
  --shot-list <shot-list-id> \
  --shots <shot-id>[,<shot-id>...] \
  --kind <input-kind> \
  --subject-kind <subject-kind> \
  --subject-id <subject-id> \
  --json
```

## Production Proposal And Preflight

Write a `ShotVideoTakeAgentProposal` into the production group JSON. Use `inputModeId`, not `intentId`. Use `basedOnInputModeId`, not `basedOnIntentId`.

The proposal must include:

- `basedOnInputModeId`
- `basedOnModelChoice`
- `basedOnShotIds`
- `dependencyDrafts[]` for every generated shot dependency that preflight needs
- `finalPromptDraft` for `shot.video-take`

Run preflight before creating or estimating the final video spec:

```bash
renku generation production update \
  --purpose shot.video-take \
  --target scene:<scene-id> \
  --shot-list <shot-list-id> \
  --shots <shot-id>[,<shot-id>...] \
  --file shot-video-take-production-group.json \
  --json

renku generation preflight \
  --purpose shot.video-take \
  --target scene:<scene-id> \
  --shot-list <shot-list-id> \
  --shots <shot-id>[,<shot-id>...] \
  --file shot-video-take-production-group.json \
  --json
```

Preflight is the authoritative dependency checklist. Read `inputsToCreate`, `inputPlanItems`, `plan.dependencyMap`, `prompts`, and `finalTake.canCreateSpec`.

If preflight reports `CORE_SHOT_VIDEO_DEPENDENCY_DRAFT_MISSING` or `CORE_SHOT_VIDEO_FINAL_PROMPT_DRAFT_MISSING`, do not generate. Author the missing spec or prompt first.

## Dependency Authoring

Use the specific references for dependency prompts:

- First/last frames: `shot-first-last-frame.md`
- Multi-shot sheets: `shot-multi-shot-storyboard-sheet.md`
- Ad hoc reference images: `shot-reference-images.md`

Do not invent exact dialogue, duration, music, or transitions when absent. If exact dialogue is needed, read the screenplay scene before drafting.

## Spec Lifecycle

For every dependency and final video spec:

1. Validate: `renku generation spec validate --file <spec-json> --json`.
2. Persist: `renku generation spec create --file <spec-json> --json`.
3. Estimate: `renku generation estimate --spec <spec-id> --json`.
4. Ask the user to approve cost and provider context transfer.
5. Run only after approval: `renku generation run --spec <spec-id> --approval-token <approval-token> --json`.
6. Inspect generated media before import.
7. Import with the concrete purpose.

Dependency import defaults to selecting the imported input for the current group:

```bash
renku media import \
  --purpose shot.first-frame \
  --target scene:<scene-id> \
  --shot-list <shot-list-id> \
  --shots <shot-id>[,<shot-id>...] \
  --source generated/media/<output>.png \
  --receipt <run-json> \
  --selection select \
  --json
```

Use the matching concrete purpose for `shot.last-frame`, `shot.reference-image`, and `shot.multi-shot-storyboard-sheet`. The Studio References tab shows imported/generated first frames, last frames, ad hoc reference images, and multi-shot storyboard sheets for the relevant shot or group.

Final video import attaches the video take to the production group and ordered shot rows:

```bash
renku media import \
  --purpose shot.video-take \
  --target scene:<scene-id> \
  --shot-list <shot-list-id> \
  --shots <shot-id>[,<shot-id>...] \
  --source generated/media/<shot-video-output>.mp4 \
  --receipt <run-json> \
  --json
```

## Example: Single Shot, First/Last Frame Take

Scenario: the user asks for a take for Shot 3, input mode is `first-last-frame`, and no suitable first or last frame is selected.

1. Read context, model choices, and reusable inputs.
2. Author `shot.first-frame` and `shot.last-frame` dependency drafts from the selected shot design and references.
3. Validate, create, estimate, approve, run, inspect, and import each dependency.
4. Update production group with `inputModeId`, video model, parameters, selected inputs, dependency drafts, and final prompt draft.
5. Run preflight. It must show no missing first/last-frame inputs before final video generation.
6. Create, estimate, approve, run, inspect, and import the final `shot.video-take`.

Expected result: dependency assets are reusable later, final video is attached to Shot 3, and approval binds to the exact prompt, parameters, first frame, and last frame files.

## Example: Multi-Shot Group With Storyboard Sheet

Scenario: the user groups Shot 3 and Shot 4 and the final generation should be one provider call.

1. Read context and model choices for the selected multi-shot input mode.
2. Read reusable inputs. Reuse a `multi-shot-storyboard-sheet` only when it matches exactly `shot_003,shot_004` in that order.
3. If regenerating, clear the slot.
4. Create `shot.multi-shot-storyboard-sheet` from `shot-multi-shot-storyboard-sheet.md`.
5. Validate, create, estimate, approve, run, inspect, and import the storyboard sheet.
6. Write the production proposal and final prompt as one continuous video while preserving shot boundaries.
7. Run preflight. Core maps logical prepared inputs to provider fields and returns diagnostics if a selected logical role is unsupported.
8. Create, estimate, approve, run, inspect, and import one final `shot.video-take` spec. Do not run separate final videos per shot.

Expected result: the storyboard sheet is reusable for the same ordered group, visible in the References tab for every included shot, one video asset is attached to both ordered shots, and changing model/prompt/parameters/inputs requires a new preflight and estimate.
