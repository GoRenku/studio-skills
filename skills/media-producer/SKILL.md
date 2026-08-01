---
name: media-producer
description: Generate, revise, preview, estimate, run, inspect, and attach purpose-specific Renku Studio image, audio, and video media through the context-first GenerationSpec contract. Use for generic image creation or editing, project videos authored from Shot Plans, Lookbook assets, Cast sheets/profiles/voice samples, Location sheets/heroes, Prop sheets/heroes, Scene Storyboard Sheets, dialogue audio, external media attachment, and generation approval workflows.
---

# Media Producer

Use Renku as the project metadata and attachment boundary. Treat prompts and media as opaque creative artifacts: inspect them in the agent/user loop, but never turn creative judgment into Studio runtime validation.

Use the normal Renku-managed generation workflow unless the user explicitly
asks for Codex built-in image generation. A request to create an image does not
by itself authorize or select Codex generation. The accepted `shot.image`
workflow is the narrow exception: when the user has not selected an execution
path, propose Codex built-in GPT-Image-2. Once the user selects that execution
path, show the saved Preview for visibility and continue without a separate
generation-approval stop.

## Core workflow

1. Resolve the exact current project, purpose, and target. Never invent ids.
2. Read the Core-owned context:

```bash
renku generation context --purpose <purpose> --target <target> --json
```

3. Read model descriptors when choosing an endpoint:

```bash
renku generation model list --purpose <purpose> --json
```

4. For an image purpose, read `references/image-prompt-authoring.md`. Load one
   exact route guide through `references/image-model-guide-registry.json` and
   the relevant purpose guide below before writing the prompt. Fail before
   authoring when the selected exact route has no guide. Use generation guidance
   for every image purpose except `image.edit`; use revise-source guidance for
   every new `image.edit` request.
5. Inspect every candidate in every relevant guide slot, including the underlying image files when the choice is visual. Choose the exact candidate that best serves the request, or choose none. Author only that choice in one generic `GenerationSpec`; the guide never chooses for you. Presence means inclusion. Preserve the exact section, slot, and optional subject from the guide, set `providerField` only when deliberately routing the exact file to a real media field from the selected model descriptor, assign exact stable `promptMention` values to image references used by the prompt, and use `{ "kind": "additional" }` only for an extra exact opaque reference.
6. Keep Core-fixed settings out of agent policy. Treat recommendations as editable guidance and author them only when explicitly chosen. Leave untouched provider defaults absent.
7. Validate and show Preview before generation:

```bash
renku generation validate --file <spec.json> --json
renku generation spec create --file <spec.json> --json
renku generation preview show --spec <spec-id> --json
```

Always save before opening Studio Preview. The saved Preview is the shared
editable review surface: prompt changes, reference selections, model choices,
settings, and the Update button all operate on that saved request. Opening a
file-only Preview first creates a read-only dialog and is not part of this
workflow.

Before authoring a spec, open the relevant file in `samples/` and preserve the
current envelope exactly: `executionKind`, `purpose`, `target`, `model`,
`values`, `references`, optional `authoredFrom`, and optional `title`.
Model-specific inputs belong under `values`. For the current Codex built-in
image-generation workflow, use exactly
`values: { "prompt": "..." }`. Keep every reviewed generation requirement,
including `16:9`, composition, quality, format direction, and creative
constraints, inside that exact prompt. Keep selected images as logical
`references`; do not duplicate tool settings as extra external values. Do not
reconstruct the contract from memory or from an earlier Renku project.

When the user changes only how an existing saved request will be executed,
preserve its prompt, title, and selected references exactly. Put every retained
generation requirement into that unchanged prompt and remove provider-specific
structured values so the current Codex request has exactly `values: { prompt }`.
Change only the execution kind and actual provider/model. In particular,
switching to Codex must not rewrite or reorganize the prompt, add bookkeeping
labels such as `Use case` or `Asset type`, or replace the actual model name with
a tool or capability name.

When several independent saved requests should be reviewed together, show them in one ordered Preview interaction:

```bash
renku generation preview show --spec <first-spec-id> --spec <second-spec-id> --json
```

Do not mix `--file` and `--spec`. Each entry remains an independent spec and
execution. Estimates, approval tokens, and GenerationRuns apply only to
Renku-managed entries.
If the combined Preview command fails, report that the complete review handoff
could not be opened and stop. Never substitute one Preview command per request:
later single-request notifications replace the earlier dialog session. Do not
estimate or ask for managed-provider approval until the combined Preview
succeeds.

8. Update the same saved draft when the request changes, then validate and show
   it again. For Renku-managed execution, Preview remains a review stop and the
   live provider run still requires explicit cost/provider approval. For
   Codex `agent-external` image generation, the user's Codex execution choice
   already authorizes use of the built-in image tool: after Preview is
   delivered, read the saved request, freeze it, and invoke Codex without
   asking for separate generation approval. If the user changes or steers the
   request before invocation, update and show Preview again. After live
   submission, the saved request is permanently frozen; author a new spec for
   any changed request.
9. For Renku-managed execution only, estimate the exact saved request. Ask for
   explicit approval of the cost and provider transfer, then pass the returned
   token unchanged:

```bash
renku generation estimate --spec <spec-id> --json
renku generation run --spec <spec-id> --approval-token <approval-token> --json
renku generation run show --run <run-id> --json
```

Use `--simulate` with the run command for a non-paid execution check. The token approves the current provider/model price from pricing inputs; changing a pricing input requires a new estimate and may produce a new token. Creative or reference changes still require validation, a new Preview, a fresh estimate review, and explicit live-run confirmation even when the price token stays the same.

Read `references/workflow.md` for exact reference, output reuse, Preview, and attachment rules.
For `image.edit`, follow its complete source-resolution, request-review,
execution, separate output-acceptance, and destination-import sequence. Studio's
Generation Request dialog is inspection only; it never starts or approves an
edit.

## Exact files and attachment

- Use an `asset-file` reference only for a registered asset and exact asset-file id returned by context or `generation reference list`.
- Use a normalized project-relative `project-file` reference for an unattached Renku output, Codex-generated image, uploaded file, or other safe project file that only needs to guide the next request.
- Never invent an asset/file id, receipt, or provenance record.
- Import finished media only through a currently supported focused purpose. Pass `--receipt` only for an exact output of a matching Renku run.
- When the user selects Codex generation, save and show an `agent-external`
  spec, read it after Preview, freeze it immediately before invoking Codex
  without a separate approval stop, and pass its id with `--source-spec` when
  importing the accepted image.
- Never copy files manually into canonical Cast, Location, Prop, Lookbook, or Scene
  folders. Core owns durable paths and exclusive Asset membership.
- When an accepted Profile, Location/Prop Hero, Lookbook Image, Shot Image, or grouped
  Storyboard import should become canonical immediately, pass `--select` on
  that import. Use `renku asset select` only to choose an already imported
  candidate.
- Never create global selection for Character Sheets, Location Sheets, Prop Sheets,
  Lookbook Sheets, or Dialogue Audio Takes. Their exact choices belong only in
  the consuming GenerationSpec references.
- Inspect generated media before attachment. A Renku-managed paid regeneration
  requires a revised Preview, estimate, and explicit approval. A Codex
  regeneration follows the built-in tool workflow without a Renku approval
  token or an extra approval question.

## Purpose routing

Use `shot-plan.video-generation` with target `project` for a video authored
from a Shot Plan. Read the current context through:

```bash
renku generation context \
  --purpose shot-plan.video-generation \
  --target project \
  --authored-from-shot-plan <exact-shot-plan-id> \
  --json
```

Include the same weak association in the request:

```json
"authoredFrom": { "kind": "shotPlan", "id": "<exact-shot-plan-id>" }
```

This is information-only context. It does not target or snapshot the plan,
attach the result to it, or make the plan immutable. Set exactly one
`shotPlanVideoInputMode`: `text-only`, `first-frame`, `first-last-frame`, or
`reference`. Read `references/shot-plan-video/index.md` and
`references/shot-plan-video/workflow.md`, then load the exact selected video
route guide through `references/video-model-guide-registry.json`.

Import an accepted `shot-plan.video-generation` output only with an exact matching managed
receipt or frozen agent-external source Spec. It becomes an independent Project
Asset under `videos/`; manual video import without generation provenance is not
this purpose.

Use `shot-plan.video-first-frame`, `shot-plan.video-last-frame`, and
`shot-plan.video-storyboard` for optional Project-owned auxiliary images. These
purposes require the same Shot Plan association. They are ordinary opaque image
generation requests; Core owns their purpose, candidate envelope, attachment
destination, and provenance, while the agent owns the creative prompt.

Before authoring Lookbook media, resolve the role id directly:

```bash
renku lookbook show --kind production --json
renku lookbook show --kind storyboard --json
```

Use the returned current role id. Do not list alternatives or look for selection state. `lookbook.video-sheet` accepts only the Production role and `lookbook.storyboard-sheet` accepts only the Storyboard role.

- `image.create` -> `project`
- `image.edit` -> `asset:<asset-id>`
- `shot-plan.video-generation`, `shot-plan.video-first-frame`,
  `shot-plan.video-last-frame`, `shot-plan.video-storyboard` -> `project`
- `lookbook.image`, `lookbook.video-sheet`, `lookbook.storyboard-sheet` -> `lookbook:<lookbook-id>`
- `cast.character-sheet`, `cast.profile`, `cast.voice-sample` -> `cast:<cast-member-id>`
- `location.sheet`, `location.hero` -> `location:<location-id>`
- `prop.sheet`, `prop.hero` -> `prop:<prop-id>`
- `scene.storyboard-sheet` -> `scene:<scene-id>`
- `shot.image` -> `shot:<shot-id>`
- `scene.dialogue-audio` -> `scene:<scene-id>:dialogue:<scene-dialogue-id>`

Load only the relevant reference:

- Cast sheets: `references/cast-character-sheets.md`
- Cast profiles: `references/cast-profile.md` or `references/voice-over-profile-image.md`
- Cast voice samples: `references/cast-voice-sample.md`
- Location media: `references/location-sheet.md`
- Prop media: `references/prop-sheet.md`
- Lookbook media: `references/lookbook-image.md` or `references/lookbook-sheets.md`
- Scene Storyboard generation and agent-owned splitting: `references/scene-storyboard-sheet.md`
- Shot images: `references/shot-image.md`
- Reference-aware image prompting: `references/reference-visible-image-prompting.md`
- Shot Plan video workflow: `references/shot-plan-video/index.md`
- Provider-visible video prompting:
  `references/video-generation/provider-visible-prompting.md`
- Video prompt review:
  `references/video-generation/prompt-quality-checklist.md`

Validate exact image-route guide and sample coverage after changing an image
route, guide, purpose sample, or prompt-authoring instruction:

```bash
node skills/media-producer/scripts/validate-image-prompt-guides.mjs \
  --project urban-basilica
```

Validate exact video-route guide and sample coverage after changing the video
catalog, guides, samples, or workflow:

```bash
node skills/media-producer/scripts/validate-video-prompt-guides.mjs \
  --project urban-basilica
```

The command compares the guide registry with the current image routes reported
by the installed Renku CLI. The registry maps identities to guide paths only;
it does not own model families, media capability, or configurable fields.

For `cast.character-sheet`, `location.sheet`, and `prop.sheet`, inspect all
same-owner prior sheet candidates as optional continuity references. Choose a
useful prior sheet only when it supports the current creative direction; no
prior sheet is required, and the first candidate has no special status.

Do not reconstruct a second request-planning system or automatic provider
mapping in the skill. One spec is one explicit provider request.

## Scene Storyboard Sheet

Keep splitting agent-owned. Read the exact Scene Beat Sheet and use `facts.contextText` only as opaque authored narrative context. For each one-to-four-Beat request, choose the relevant Cast and Location owners, inspect their exact references, and include them with the style reference. Stop for explicit user direction when needed continuity media is unavailable; do not silently proceed with weaker context. Generate the accepted 2x2, at-most-four-panel composite, inspect the returned image with vision, choose crop boxes for that exact image, inspect every crop, and attach only accepted Beat images. Never add fixed-coordinate, OCR, border-detection, grid-slicing, or runtime auto-split behavior.

## Safety and permissions

Renku-managed provider generation needs explicit user approval and network
permission. Codex built-in image generation uses Codex's own tool execution and
permissions; do not add a Renku price/provider approval question. Local Studio
notifications may also require localhost network permission. If notification
fails after a successful mutation, read durable state and refresh Studio; do
not rerun a non-idempotent import.
