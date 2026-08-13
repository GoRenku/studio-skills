---
name: media-producer
description: Generate, revise, preview, estimate, run, inspect, and attach purpose-specific Renku Studio image, audio, and video media through the context-first GenerationSpec contract. Use for generic image creation or editing, project videos authored from Shot Plans, Lookbook assets, Cast sheets/profiles/voice samples, Location sheets/heroes, Prop sheets/heroes, Scene Storyboard Sheets, dialogue audio, external media attachment, and generation approval workflows.
---

# Media Producer

This skill requires the installed Renku runtime. If `renku` is unavailable, stop and direct the user to `https://gorenku.com`; do not substitute ad hoc files for the CLI-owned project state.

Use Renku as the project metadata and attachment boundary. Treat prompts and media as opaque creative artifacts: inspect them in the agent/user loop, but never turn creative judgment into Studio runtime validation.

Read `workflowPolicy` from Generation Context before choosing any unselected
execution path or deciding automatic Preview, conversational confirmation, or
batch concurrency. Apply precedence in this order: explicit user direction for
the current request, an execution path already authored on the saved
GenerationSpec, Project `workflowPolicy`, then ask. Never recreate a
purpose-specific or skill-local default. If policy prefers Codex but the current
harness lacks capability `codex.gpt-image-2`, ask for a path instead of silently
falling back to a paid Renku run.

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
7. Validate and save before generation. Automatically show the saved Preview
   when `workflowPolicy.displayPreview` is true. Always show it when the user
   explicitly requests Preview, even when automatic display is off:

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

8. Update the same saved draft when the request changes, then validate it and
   apply the Preview policy again. Before invoking either lane, pause for an
   additional conversational confirmation only when that lane's
   `requirePerRunConfirmation` is true. For Renku-managed execution, this
   preference never replaces exact estimate-token review. For Codex
   `agent-external` image generation, read the saved request, freeze it, and
   invoke Codex after the configured pause, if any. If the user changes or
   steers the request before invocation, update and revalidate; display Preview
   again when explicitly requested or enabled by policy. After live
   submission, the saved request is permanently frozen; author a new spec for
   any changed request.
9. For Renku-managed execution only, estimate the exact saved request and pass
   the returned token unchanged. The token gate always applies, including when
   `requirePerRunConfirmation` is false:

```bash
renku generation estimate --spec <spec-id> --json
renku generation run --spec <spec-id> --approval-token <approval-token> --json
renku generation run show --run <run-id> --json
```

Use `--simulate` with the run command for a non-paid execution check. The token approves the current provider/model price from pricing inputs; changing a pricing input requires a new estimate and may produce a new token. Creative or reference changes still require validation, policy-driven or explicitly requested Preview, and a fresh estimate review even when the price token stays the same.

For independent requests, schedule no more than the selected lane's
`concurrencyLimit`. A limit only permits overlap; it does not make dependent
requests independent. Each request retains its own saved spec, Preview
decision, exact estimate/token or external freeze, run/tool call, inspection,
and attachment. Do not build a queue, retry system, or dependency scheduler.

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
- When the selected path is Codex generation, save an `agent-external` spec,
  apply the Preview policy, read it again, freeze it immediately before
  invoking Codex, honor the Codex lane confirmation preference, and pass its id
  with `--source-spec` when importing the accepted image.
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
  requires revalidation, the current Preview decision, a fresh estimate/token,
  and the configured Renku lane confirmation. A Codex regeneration follows the
  built-in tool workflow and the configured Codex lane confirmation without a
  Renku approval token.

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

Import an accepted `shot-plan.video-generation` output only with an exact
matching managed receipt or frozen agent-external source Spec. It becomes an
independent Project Asset whose file Core places in the exact Scene/Shot Plan
folder derived from that frozen provenance. Manual video import without
generation provenance is not this purpose.

Use `shot-plan.video-first-frame`, `shot-plan.video-last-frame`,
`shot-plan.video-storyboard`, and `shot-plan.video-reference` for optional
Project-owned auxiliary images. These purposes require the same exact Shot Plan
association. `shot-plan.video-reference` creates a deliberately authored Plan
reference; do not copy an ordinary dependency merely because it was used as an
input. They are ordinary opaque image generation requests: Core owns the
purpose, candidate envelope, attachment destination, and provenance, while the
agent owns the creative prompt.

Before authoring Lookbook media, resolve the role id directly:

```bash
renku lookbook show --kind production --json
renku lookbook show --kind storyboard --json
```

Use the returned current role id. Do not list alternatives or look for selection state. `lookbook.video-sheet` accepts only the Production role and `lookbook.storyboard-sheet` accepts only the Storyboard role.

- `image.create` -> `project`
- `image.edit` -> `asset:<asset-id>`
- `shot-plan.video-generation`, `shot-plan.video-first-frame`,
  `shot-plan.video-last-frame`, `shot-plan.video-storyboard`,
  `shot-plan.video-reference` -> `project`
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
  --project <project-name>
```

Validate exact video-route guide and sample coverage after changing the video
catalog, guides, samples, or workflow:

```bash
node skills/media-producer/scripts/validate-video-prompt-guides.mjs \
  --project <project-name>
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

For generated Cast, Location, Prop, Lookbook, or sheet media, use the existing
request `title` as a concise semantic variation name when the purpose requires
one. Describe the variation for a person (for example, `winter campaign`), not
a version such as `v2` or a calculated filename. Core normalizes the name,
adds fixed role words, allocates the `gxxx` token, and chooses the durable path.

## Scene Storyboard Sheet

Keep splitting agent-owned. Read the exact Scene Beats revision named by the handoff, pass that same `sceneBeatsRevisionId` to Storyboard status and import, and use authored narrative context only as opaque text. Preserve Core-owned Scene-local Storyboard iteration folders. For each one-to-four-Beat request, choose the relevant Cast and Location owners, inspect their exact references, and include them with the style reference. Stop for explicit user direction when needed continuity media is unavailable; do not silently proceed with weaker context. Generate an at-most-four-panel composite on a canvas supported by the selected model, with every complete panel at the Project aspect ratio in a clean grid. For Codex built-in execution, save `model: { "provider": "codex", "model": "gpt-image-2" }` on every request; Codex currently exposes no other image model. Inspect the returned image with vision, choose crop boxes for that exact image, inspect every crop, and attach useful accepted Beat images without adding a pixel-level aspect-ratio rejection gate. Never add fixed-coordinate, OCR, border-detection, grid-slicing, or runtime auto-split behavior.

## Safety and permissions

Renku-managed provider generation needs its exact estimate token and network
permission; any additional conversational pause comes from `workflowPolicy`.
Codex built-in image generation uses Codex's own tool execution and permissions
plus its policy confirmation value; do not add a Renku price/provider approval
question. Local Studio
notifications may also require localhost network permission. If notification
fails after a successful mutation, read durable state and refresh Studio; do
not rerun a non-idempotent import.
