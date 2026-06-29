# Shot Video Take Media Production

Use this reference for final AI video takes for one Shot Video Take: either a single shot or an ordered multi-shot selection. Core owns take state, context, validation, preflight, spec persistence, provider mapping, runs, imports, reusable dependency relationships, and output attachment. The skill owns creative dependency analysis and model-specific prompt drafting.

Never write `.renku/project.sqlite` directly. Never override the user-selected input mode, model, parameters, shot ids, reference choices, or take. Take-tab edits must update take-owned state through `renku take authoring apply`; do not use Studio routes or generic state patches. Never submit raw provider payload JSON; submit logical Renku specs and production plans. Never rely on fallback prompts. Paid generation requires an authored prompt and, for ad hoc reference images, an authored title naming the reference intent.

Shot-video work starts by establishing the working take. Explicit user references win: use an explicit `takeId` or production scene/shot/take reference. If the user says "this take" or gives no durable reference, read `renku studio current --json`; treat focus as a candidate and confirm before mutating project state, preparing paid generation, or importing final media.

## Purposes

- `shot.first-frame`: carefully authored opening still for a shot video take.
- `shot.last-frame`: carefully authored closing still for a first/last-frame workflow.
- `shot.reference-image`: ad hoc reference image generated only for a named single-shot or multi-shot take need.
- `shot.multi-shot-storyboard-sheet`: one storyboard planning sheet for an ordered multi-shot take.
- `shot.video-take`: final video output attached to the take while preserving its ordered shot ids.

For image dependencies, use Codex built-in image generation when the user asks
for Codex, `$imagegen`, built-in GPT-Image 2, or no-extra-cost image generation.
Use Renku-managed image models such as `fal-ai/openai/gpt-image-2` only when the
user chooses app-side/provider generation or wants Renku generation records and
cost estimates. Final `shot.video-take` video generation remains Renku-managed.

## Resolve Context

1. Confirm the current project with `renku project current --json` when needed.
2. Resolve the scene id from Studio focus or screenplay navigation.
3. Resolve the active or specified Scene Shot List id.
4. Resolve the selected shot id, or an ordered shot id list for a multi-shot take.
5. Create a take when one does not already exist:

```bash
renku take create \
  --scene <scene-id> \
  --shot-list <shot-list-id> \
  --shots <shot-id>[,<shot-id>...] \
  --json
```

The create command returns a `SceneShotVideoTakeCreateReport`. Read the working
take from `overview.take`; use `overview.take.takeId` for later `--take`
commands. Do not call `take show` immediately after create unless you need to
refresh the take from storage later.

6. List or show takes when resolving an existing working take:

```bash
renku take list --scene <scene-id> --json
renku take show --take <take-id> --json
```

7. Read the canonical authoring context for the take:

```bash
renku take authoring context --take <take-id> --json
```

For multi-cut takes, include the selected shot when the user is editing one shot's
direction:

```bash
renku take authoring context --take <take-id> --selected-shot <shot-id> --json
```

Use `document.shotIds` and `context.shots` as the ordered selected-shot source
of truth. Use `document.structure` for editable Composition, Motion, Cast,
Location, Lookbook, References, and Dialogue direction. Continuous takes edit
`structure.sharedDirection`; multi-cut takes edit
`structure.directionsByShotId[shotId]`. Use `context.displayShots` only for
surrounding shot-list context. Use prompt-facing shot fields such as `shotType`,
`subject`, `action`, `audioNotes`, and `productionNotes` as baseline coverage,
not as mutable take state.

When changing take-owned state, write a full `sceneShotVideoTakeAuthoring`
document that preserves the returned `takeId`, `sceneId`, `sourceShotListId`,
`baseTakeUpdatedAt`, unchanged directions, and unchanged production fields.
Studio-edited state is user intent. If a model, input mode, parameter,
reference choice, composition, motion, or prompt draft should survive your
proposal, copy it into the document explicitly. Missing fields are not merge
requests.
Validate before applying:

```bash
renku take authoring validate --file shot-video-take-authoring.json --json
renku take authoring apply --file shot-video-take-authoring.json --json
```

Core validates shot membership, structure mode, reference ownership, route
compatibility, prompt drafts, and stale-write protection. If validation reports
a stale `baseTakeUpdatedAt`, re-read authoring context and rebuild the document
from the fresh state instead of replaying the old file.

Validation output contains `prior` for the persisted baseline and `current` for
the proposed state. Compare them before applying so accidental overwrites are
visible. Apply output contains `prior` for the pre-write state and `current` for
the applied state. That comparison is informational only; do not treat it as a
merge or repair layer.

Read the model report before drafting provider-reference tokens. Use provider
labels such as `@Image1`, `@Element1`, `@Video1`, and `@Audio1` only when the
Renku preflight context contains the corresponding logical input. Do not invent
provider labels as prompt decoration.

## Model And Input Workflow

Read model choices for the chosen input mode:

```bash
renku generation model list \
  --purpose shot.video-take \
  --target scene:<scene-id> \
  --take <take-id> \
  --intent <input-mode-id> \
  --shots <shot-id>[,<shot-id>...] \
  --json
```

Read reusable dependency candidates:

```bash
renku generation input list \
  --purpose shot.video-take \
  --target scene:<scene-id> \
  --take <take-id> \
  --json
```

Select a reusable dependency only when the user wants reuse and it matches the current take:

```bash
renku generation input select \
  --purpose shot.video-take \
  --target scene:<scene-id> \
  --take <take-id> \
  --input <shot-video-take-input-id> \
  --json
```

Clear a selected slot before regenerating it:

```bash
renku generation input clear \
  --purpose shot.video-take \
  --target scene:<scene-id> \
  --take <take-id> \
  --kind <input-kind> \
  --subject-kind <subject-kind> \
  --subject-id <subject-id> \
  --json
```

## Production Proposal And Preflight

Write a `ShotVideoTakeAgentProposal` into the authoring document's
`production.agentProposal`. Use `inputModeId`, not `intentId`. Use
`basedOnInputModeId`, not `basedOnIntentId`.

The proposal must include:

- `basedOnInputModeId`
- `basedOnModelChoice`
- `basedOnShotIds`
- `dependencyDrafts[]` for every generated shot dependency that preflight needs
- `finalPromptDraft` for `shot.video-take`

Validate and apply the authoring document before creating or estimating the final
video spec:

```bash
renku take authoring validate --file shot-video-take-authoring.json --json
renku take authoring apply --file shot-video-take-authoring.json --json
```

The authoring context, validation `current`, and apply `current` snapshots
include the authoritative dependency checklist, preflight readiness, estimate,
and provider payload preview. Read `productionPlan.plan.lines`,
`productionPlan.references`, `preflight`, and `providerPreview`.

Before creating, estimating, approving, or running the final `shot.video-take`
spec, re-read the persisted authoring context:

```bash
renku take authoring context --take <take-id> --json
```

Final generation uses the persisted take state, not memory from an earlier
apply response. If the final persisted model, input mode, route parameters,
selected references, composition, motion, or prompt draft no longer match your
prompt assumptions, warn the user and revise the prompt or authoring document
before paid generation.

If preflight reports `CORE_SHOT_VIDEO_DEPENDENCY_DRAFT_MISSING` or `CORE_SHOT_VIDEO_FINAL_PROMPT_DRAFT_MISSING`, do not generate. Author the missing spec or prompt first.

## Dependency Authoring

Use the specific references for dependency prompts:

- First/last frames: `shot-first-last-frame.md`
- Multi-shot sheets: `shot-multi-shot-storyboard-sheet.md`
- Ad hoc reference images: `shot-reference-images.md`

Do not invent exact dialogue, duration, music, or transitions when absent. If exact dialogue is needed, read the screenplay scene before drafting.

## Provider Reference Tokens

Core maps logical Renku inputs to provider payload fields. Prompt drafts must
match that logical mapping:

- Seedance 2.0 reference audio uses `audio_urls` as per-generation voice/style
  conditioning. Prefer clean Cast Voice samples or selected scene dialogue audio
  and write the spoken line in the prompt. Do not promise exact timing,
  waveform, or word preservation.
- Kling V3 image/video element prompts reference element-bound media with
  `@ElementN`. Kling native voice control uses a transient provider `voice_id`
  created by Core from selected scene dialogue audio during `shot.video-take`
  estimate/run. Write the words to be spoken in the final prompt; select the
  dialogue audio as a logical input instead of creating or storing a durable
  Cast Voice Provider Registration.
- Kling O3 top-level image references use `@ImageN`.
- Kling O3 video-to-video source-video routes use `@Video1` for the source
  video, then optional `@ImageN` and `@ElementN` only when those logical inputs
  exist.
- Video-backed Kling elements may bind selected scene dialogue audio for
  transient voice control. Image-set elements may not use voice control.

Example Seedance final prompt:

```text
@Image1 defines the character look. Use @Audio1 as a voice style reference. The character says, "I never thought we would make it this far."
```

Example Kling final prompt:

```text
@Element1 enters from frame left and says softly, "We keep moving." Keep the voice calm and close-mic, matching the selected dialogue audio reference.
```

When the user needs exact generated dialogue audio synchronized to video, route
the work to a lipsync, talking-head, or composition workflow instead of a
Seedance native audio reference or Kling V3/O3 transient voice-control route.

## Provider Guidance Provenance

These prompt-token and audio/voice rules were reviewed on June 14, 2026 from:

- `https://fal.ai/models/fal-ai/kling-video/v3/standard/image-to-video/llms.txt`
- `https://fal.ai/models/fal-ai/kling-video/v3/pro/image-to-video/llms.txt`
- `https://fal.ai/models/fal-ai/kling-video/o3/standard/reference-to-video/llms.txt`
- `https://fal.ai/models/fal-ai/kling-video/o3/pro/reference-to-video/llms.txt`
- `https://fal.ai/models/fal-ai/kling-video/o3/standard/video-to-video/reference/llms.txt`
- `https://fal.ai/models/fal-ai/kling-video/o3/standard/video-to-video/edit/llms.txt`
- `https://fal.ai/models/fal-ai/kling-video/o3/pro/video-to-video/edit/llms.txt`
- `https://fal.ai/models/fal-ai/kling-video/create-voice/llms.txt`
- `https://kling.ai/quickstart/klingai-video-3-model-user-guide`
- `https://kling.ai/quickstart/klingai-video-3-omni-model-user-guide`
- `https://arxiv.org/abs/2604.14148`

Maintenance check: if a prompt contains `@Audio`, `@Image`, `@Element`, or
`@Video`, confirm the corresponding Renku input exists in preflight and that the
selected route supports that provider field before estimating or running.

## Spec Lifecycle

For every Renku-managed dependency and final video spec:

1. Validate: `renku generation spec validate --file <spec-json> --json`.
2. Persist: `renku generation spec create --file <spec-json> --json`.
3. Estimate: `renku generation estimate --spec <spec-id> --json`.
4. Ask the user to approve cost and provider context transfer.
5. Run only after approval: `renku generation run --spec <spec-id> --approval-token <approval-token> --json`.
6. Inspect generated media before import.
7. Import with the concrete purpose.

Dependency import defaults to selecting the imported media input for the current take:

```bash
renku media import \
  --purpose shot.first-frame \
  --target scene:<scene-id> \
  --take <take-id> \
  --source generated/media/<output>.png \
  --receipt <run-json> \
  --selection select \
  --json
```

Use the matching concrete purpose for `shot.last-frame`, `shot.reference-image`, and `shot.multi-shot-storyboard-sheet`. The Studio References tab shows imported/generated first frames, last frames, ad hoc reference images, and multi-shot storyboard sheets for the relevant take.

Omit `--receipt` when an image dependency came from Codex built-in image
generation or another non-Renku source.

Final video import attaches the video output to the take and preserves the ordered shot rows:

```bash
renku media import \
  --purpose shot.video-take \
  --target scene:<scene-id> \
  --take <take-id> \
  --source generated/media/<shot-video-output>.mp4 \
  --receipt <run-json> \
  --json
```

## Example: Single Shot, First/Last Frame Take

Scenario: the user asks for a take for Shot 3, input mode is `first-last-frame`, and no suitable first or last frame is selected.

1. Read authoring context, model choices, and reusable inputs.
2. Author `shot.first-frame` and `shot.last-frame` dependency drafts from the selected shot design and references.
3. Generate or import each dependency. If using Codex built-in image generation, prompt `$imagegen`, save the selected stills inside the project, inspect them, and import without receipts. If using Renku-managed image generation, validate, create, estimate, approve, run, inspect, and import each dependency.
4. Update the authoring document with `inputModeId`, video model, parameters, selected inputs, dependency drafts, and final prompt draft.
5. Validate and apply the authoring document. Compare validation `prior` versus
   `current`, then apply `prior` versus `current`. The returned preflight must
   show no missing first/last-frame inputs.
6. Re-read authoring context, confirm the final persisted settings still match
   the prompt, then create, estimate, approve, run, inspect, and import the
   final `shot.video-take`.

Expected result: dependency assets are reusable later, final video is attached to Shot 3, and final video approval binds to the exact prompt, parameters, first frame, and last frame files.

## Example: Multi-Shot Group With Storyboard Sheet

Scenario: the user creates a take for Shot 3 and Shot 4 and the final generation should be one provider call.

1. Read authoring context and model choices for the selected multi-shot input mode.
2. Read reusable inputs. Reuse a `multi-shot-storyboard-sheet` only when it matches exactly `shot_003,shot_004` in that order.
3. If regenerating, clear the slot.
4. Create `shot.multi-shot-storyboard-sheet` from `shot-multi-shot-storyboard-sheet.md`.
5. Generate or import the storyboard sheet. If using Codex built-in image generation, prompt `$imagegen`, save the selected sheet inside the project, inspect it, and import without a receipt. If using Renku-managed image generation, validate, create, estimate, approve, run, inspect, and import the storyboard sheet.
6. Write the take production proposal and final prompt into the authoring document as one continuous video while preserving shot boundaries.
7. Validate and apply the authoring document. Compare validation `prior` versus
   `current`, then apply `prior` versus `current`. Core maps logical prepared
   inputs to provider fields and returns diagnostics if a selected logical role
   is unsupported.
8. Re-read authoring context, confirm the final persisted settings still match
   the prompt, then create, estimate, approve, run, inspect, and import one
   final `shot.video-take` spec. Do not run separate final videos per shot.

Expected result: the storyboard sheet is reusable for the same ordered take, visible in the References tab for every included shot, one video output is attached to the take and both ordered shots, and changing model/prompt/parameters/inputs requires a new preflight and estimate.
