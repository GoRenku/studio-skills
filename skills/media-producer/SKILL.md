---
name: media-producer
description: Generate, revise, preview, estimate, run, inspect, and attach purpose-specific Renku Studio image and audio media through the context-first GenerationSpec contract. Use for generic image creation or editing, Lookbook assets, Cast sheets/profiles/voice samples, Location sheets/heroes, Scene Storyboard Sheets, dialogue audio, external media attachment, and generation approval workflows.
---

# Media Producer

Use Renku as the project metadata and attachment boundary. Treat prompts and media as opaque creative artifacts: inspect them in the agent/user loop, but never turn creative judgment into Studio runtime validation.

Use the normal Renku-managed generation workflow unless the user explicitly
asks for Codex built-in image generation. A request to create an image does not
by itself authorize or select Codex generation.

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

4. Inspect every candidate in every relevant guide slot, including the underlying image files when the choice is visual. Choose the exact candidate that best serves the request, or choose none. Author only that choice in one generic `GenerationSpec`; the guide never chooses for you. Presence means inclusion. Preserve the exact section, slot, and optional subject from the guide, set `providerField` only when deliberately routing the exact file to a real media field from the selected model descriptor, and use `{ "kind": "additional" }` only for an extra exact opaque reference.
5. Keep Core-fixed settings out of agent policy. Treat recommendations as editable guidance and author them only when explicitly chosen. Leave untouched provider defaults absent.
6. Validate and show Preview before paid work:

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
`values`, `references`, and optional `title`. Model-specific inputs belong under
`values`. For agent-external image requests, save every concrete generation
property that was chosen or used, including aspect ratio, resolution or size,
quality, output format, and image count when known. Do not bury those properties
only in prompt prose, and do not invent unknown values. Do not reconstruct the
contract from memory or from an earlier Renku project.

When the user changes only how an existing saved request will be executed,
preserve its prompt, title, selected references, and model-independent values
exactly. Change only the execution kind, actual provider/model, and fields that
exist solely to route the old provider request. In particular, switching to
Codex must not rewrite or reorganize the prompt, add bookkeeping labels such as
`Use case` or `Asset type`, or replace the actual model name with a tool or
capability name.

When several independent saved requests should be reviewed together, show them in one ordered Preview interaction:

```bash
renku generation preview show --spec <first-spec-id> --spec <second-spec-id> --json
```

Do not mix `--file` and `--spec`. Each entry remains an independent spec, estimate, approval, and run.

7. Update the same saved spec when the request changes, then validate and show it again. Preview is a review stop, not permission to generate. Do not start Codex or provider generation merely because the dialog opened; wait for the user's explicit approval.
8. Estimate the exact saved request. Ask for explicit approval of the cost and provider transfer, then pass the returned token unchanged:

```bash
renku generation estimate --spec <spec-id> --json
renku generation run --spec <spec-id> --approval-token <approval-token> --json
renku generation run show --run <run-id> --json
```

Use `--simulate` with the run command for a non-paid execution check. The token approves the current provider/model price from pricing inputs; changing a pricing input requires a new estimate and may produce a new token. Creative or reference changes still require validation, a new Preview, a fresh estimate review, and explicit live-run confirmation even when the price token stays the same.

Read `references/workflow.md` for exact reference, output reuse, Preview, and attachment rules.

## Exact files and attachment

- Use an `asset-file` reference only for a registered asset and exact asset-file id returned by context or `generation reference list`.
- Use a normalized project-relative `project-file` reference for an unattached Renku output, Codex-generated image, uploaded file, or other safe project file that only needs to guide the next request.
- Never invent an asset/file id, receipt, or provenance record.
- Import finished media only through a currently supported focused purpose. Pass `--receipt` only for an exact output of a matching Renku run.
- When the user explicitly requests Codex generation, save an `agent-external` spec before generation and pass its returned id with `--source-spec` when importing the accepted image.
- Never copy files manually into canonical Cast, Location, Lookbook, or Scene folders. Core owns durable paths and relationships.
- Inspect generated media before attachment. Paid regeneration requires a revised Preview, estimate, and explicit approval.

## Purpose routing

Shot Video authoring is temporarily unavailable. Do not issue or route to
`shot.first-frame`, `shot.last-frame`, `shot.video-prompt`, or
`shot.video-take`, and do not infer replacement commands. The material under
`references/shot-video-take/`, `samples/shot-video-take/`, and
`evals/shot-video-take/` is retained only for the next workflow design. Do not
load it as an executable current workflow; revalidate its purpose keys, target
shape, commands, and JSON contracts before reactivation.

Before authoring Lookbook media, resolve the role id directly:

```bash
renku lookbook show --kind production --json
renku lookbook show --kind storyboard --json
```

Use the returned current role id. Do not list alternatives or look for selection state. `lookbook.video-sheet` accepts only the Production role and `lookbook.storyboard-sheet` accepts only the Storyboard role.

- `image.create` -> `project`
- `image.edit` -> `asset:<asset-id>`
- `lookbook.image`, `lookbook.video-sheet`, `lookbook.storyboard-sheet` -> `lookbook:<lookbook-id>`
- `cast.character-sheet`, `cast.profile`, `cast.voice-sample` -> `cast:<cast-member-id>`
- `location.sheet`, `location.hero` -> `location:<location-id>`
- `scene.storyboard-sheet` -> `scene:<scene-id>`
- `scene.dialogue-audio` -> `scene:<scene-id>:dialogue:<scene-dialogue-id>`

Load only the relevant reference:

- Cast sheets: `references/cast-character-sheets.md`
- Cast profiles: `references/cast-profile.md` or `references/voice-over-profile-image.md`
- Cast voice samples: `references/cast-voice-sample.md`
- Location media: `references/location-sheet.md`
- Lookbook media: `references/lookbook-image.md` or `references/lookbook-sheets.md`
- Scene Storyboard generation and agent-owned splitting: `references/scene-storyboard-sheet.md`
- Reference-aware image prompting: `references/reference-visible-image-prompting.md`

For `cast.character-sheet` and `location.sheet`, inspect all same-owner prior sheet candidates as optional continuity references. Choose a useful prior sheet only when it supports the current creative direction; no prior sheet is required, and the first candidate has no special status.

Do not reconstruct a second request-planning system or automatic provider
mapping in the skill. One spec is one explicit provider request.

## Scene Storyboard Sheet

Keep splitting agent-owned. Read the exact Scene Beat Sheet and use `facts.contextText` only as opaque authored narrative context. For each one-to-four-Beat request, choose the relevant Cast and Location owners, inspect their exact references, and include them with the style reference. Stop for explicit user direction when needed continuity media is unavailable; do not silently proceed with weaker context. Generate the accepted 2x2, at-most-four-panel composite, inspect the returned image with vision, choose crop boxes for that exact image, inspect every crop, and attach only accepted Beat images. Never add fixed-coordinate, OCR, border-detection, grid-slicing, or runtime auto-split behavior.

## Safety and permissions

Provider-backed generation needs explicit user approval and network permission. Local Studio notifications may also require localhost network permission. If notification fails after a successful mutation, read durable state and refresh Studio; do not rerun a non-idempotent import.
