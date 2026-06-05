# Shot Video Take Media Production

Use this reference for final AI video takes for one shot or one ordered contiguous shot group. Core owns context, validation, preflight, spec persistence, provider mapping, runs, imports, reusable dependency relationships, and final take attachment. The skill owns creative dependency analysis and model-specific prompt drafting.

Never write `.renku/project.sqlite` directly. Never override the user-selected intent, model, parameters, or shot group. Never submit raw provider payload JSON; submit logical Renku specs and production plans.

## Purposes

- `shot.first-frame`: generate a first frame dependency.
- `shot.last-frame`: generate a last frame dependency.
- `shot.reference-sheet`: generate a single-shot model-facing reference sheet.
- `shot.multi-shot-storyboard-sheet`: generate one storyboard/reference sheet for an ordered contiguous shot group.
- `shot.video-take`: generate and attach the final video take.

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

The context is intentionally scene-scoped. If broader movie context is needed, ask through another command or skill step.

## Model And Input Workflow

Read model choices for the chosen intent:

```bash
renku generation model list \
  --purpose shot.video-take \
  --target scene:<scene-id> \
  --shot-list <shot-list-id> \
  --shots <shot-id>[,<shot-id>...] \
  --intent <intent-id> \
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

## Production Proposal

Write a `ShotVideoTakeAgentProposal` into the production group JSON. Include dependency drafts for prerequisites and a final prompt draft for `shot.video-take`. Run preflight before creating or estimating the final video spec:

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

Preflight must be valid before trusting final video estimates. If preflight reports missing inputs, create or select those inputs first.

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

## Example 1: Single Shot, First/Last Frame Take

Scenario: the user asks for a take for Shot 3, intent is `first-last-frame`, no suitable first or last frame is selected.

1. Read context.

```bash
renku generation context \
  --purpose shot.video-take \
  --target scene:<scene-id> \
  --shot-list <shot-list-id> \
  --shots shot_003 \
  --json
```

2. Read model choices.

```bash
renku generation model list \
  --purpose shot.video-take \
  --target scene:<scene-id> \
  --shot-list <shot-list-id> \
  --shots shot_003 \
  --intent first-last-frame \
  --json
```

3. Read reusable inputs.

```bash
renku generation input list \
  --purpose shot.video-take \
  --target scene:<scene-id> \
  --shot-list <shot-list-id> \
  --shots shot_003 \
  --json
```

4. If reuse is desired, select compatible first and last frame inputs. Otherwise create `shot.first-frame` and `shot.last-frame` specs using `fal-ai/openai/gpt-image-2` unless the user chose another image dependency model.

5. Validate, create, estimate, approve, and run each dependency spec.

```bash
renku generation spec validate --file shot-first-frame-spec.json --json
renku generation spec create --file shot-first-frame-spec.json --json
renku generation estimate --spec <first-frame-spec-id> --json
renku generation run --spec <first-frame-spec-id> \
  --approval-token <first-frame-approval-token> \
  --json
```

Repeat for `shot.last-frame`.

6. Import each dependency output.

```bash
renku media import \
  --purpose shot.first-frame \
  --target scene:<scene-id> \
  --shot-list <shot-list-id> \
  --shots shot_003 \
  --source generated/media/<first-frame-output>.png \
  --receipt <first-frame-run-json> \
  --selection select \
  --json
```

Repeat for `shot.last-frame`.

7. Update production group with intent, video model, parameters, selected inputs, and final prompt draft.

```bash
renku generation production update \
  --purpose shot.video-take \
  --target scene:<scene-id> \
  --shot-list <shot-list-id> \
  --shots shot_003 \
  --file shot-video-take-production-group.json \
  --json
```

8. Run preflight. It must show no missing first/last-frame inputs.

```bash
renku generation preflight \
  --purpose shot.video-take \
  --target scene:<scene-id> \
  --shot-list <shot-list-id> \
  --shots shot_003 \
  --file shot-video-take-production-group.json \
  --json
```

9. Create, estimate, approve, run, inspect, and import the final `shot.video-take`.

Expected result: dependency assets are reusable later, final video is attached to Shot 3, and approval binds to the exact prompt, parameters, first frame, and last frame files.

## Example 2: Multi-Shot Group With Storyboard Sheet

Scenario: the user groups Shot 3 and Shot 4, intent is `multi-shot`, and the final generation should be one provider call.

1. Read context.

```bash
renku generation context \
  --purpose shot.video-take \
  --target scene:<scene-id> \
  --shot-list <shot-list-id> \
  --shots shot_003,shot_004 \
  --json
```

2. Confirm model choices for `multi-shot`.

```bash
renku generation model list \
  --purpose shot.video-take \
  --target scene:<scene-id> \
  --shot-list <shot-list-id> \
  --shots shot_003,shot_004 \
  --intent multi-shot \
  --json
```

3. Read reusable inputs. Reuse a `multi-shot-storyboard-sheet` only when it matches exactly `shot_003,shot_004` in that order.

4. If regenerating, clear the slot.

```bash
renku generation input clear \
  --purpose shot.video-take \
  --target scene:<scene-id> \
  --shot-list <shot-list-id> \
  --shots shot_003,shot_004 \
  --kind multi-shot-storyboard-sheet \
  --subject-kind production-group \
  --subject-id <production-group-id> \
  --json
```

5. Create `shot.multi-shot-storyboard-sheet`. Prompt for one readable sheet with one panel per shot, shot labels, action beats, composition notes, camera movement notes, cast continuity, location/view notes, and compact model-facing instructions.

6. Validate, create, estimate, approve, run, inspect, and import the storyboard sheet.

```bash
renku generation spec validate --file shot-multi-shot-storyboard-sheet-spec.json --json
renku generation spec create --file shot-multi-shot-storyboard-sheet-spec.json --json
renku generation estimate --spec <storyboard-sheet-spec-id> --json
renku generation run --spec <storyboard-sheet-spec-id> \
  --approval-token <storyboard-sheet-approval-token> \
  --json

renku media import \
  --purpose shot.multi-shot-storyboard-sheet \
  --target scene:<scene-id> \
  --shot-list <shot-list-id> \
  --shots shot_003,shot_004 \
  --source generated/media/<storyboard-sheet-output>.png \
  --receipt <storyboard-sheet-run-json> \
  --selection select \
  --json
```

7. Write the production proposal and final prompt as one continuous video while preserving the shot boundaries. Example prompt fragment:

```text
Shot 3: Urban reads the bronze barrel by touch, smoke sliding behind him.
Shot 4: Mara and Urban are divided by bronze, their eyelines separated by the weapon's mass.
```

8. Run preflight. Core maps logical prepared inputs to provider fields and returns diagnostics if a selected logical role is unsupported.

9. Create, estimate, approve, run, inspect, and import one final `shot.video-take` spec. Do not run separate final videos per shot.

Expected result: the storyboard sheet is reusable for the same ordered group, one video asset is attached to both ordered shots, and changing model/prompt/parameters/inputs requires a new preflight and estimate.
