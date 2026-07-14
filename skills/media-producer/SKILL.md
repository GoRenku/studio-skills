---
name: media-producer
description: Generate, revise, preview, estimate, run, inspect, and attach purpose-specific Renku Studio image, audio, and video media through the context-first GenerationSpec contract. Use for generic image creation or editing, Lookbook assets, Cast sheets/profiles/voice samples, Location sheets/heroes, Scene Storyboard Sheets, dialogue audio, Shot Video Takes, external media attachment, and generation approval workflows.
---

# Media Producer

Use Renku as the project metadata and attachment boundary. Treat prompts and media as opaque creative artifacts: inspect them in the agent/user loop, but never turn creative judgment into Studio runtime validation.

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

4. Author one generic `GenerationSpec` from current context. Preserve stable guide placement ids. Assign every included reference to an actual media `providerField` from the selected model descriptor. Use `{ "kind": "additional" }` only for an extra exact reference.
5. Keep Core-fixed settings out of agent policy. Treat recommendations as editable guidance and author them only when explicitly chosen. Leave untouched provider defaults absent.
6. Validate and show Preview before paid work:

```bash
renku generation validate --file <spec.json> --json
renku generation preview show --file <spec.json> --json
renku generation spec create --file <spec.json> --json
renku generation preview show --spec <spec-id> --json
```

7. Update the same saved spec when the request changes, then validate and show it again.
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
- Never copy files manually into canonical Cast, Location, Lookbook, Scene, or Take folders. Core owns durable paths and relationships.
- Inspect generated media before attachment. Paid regeneration requires a revised Preview, estimate, and explicit approval.

## Purpose routing

- `image.create` -> `project`
- `image.edit` -> `asset:<asset-id>`
- `lookbook.image`, `lookbook.video-sheet`, `lookbook.storyboard-sheet` -> `lookbook:<lookbook-id>`
- `cast.video-character-sheet`, `cast.storyboard-character-sheet`, `cast.profile`, `cast.voice-sample` -> `cast:<cast-member-id>`
- `location.sheet`, `location.hero` -> `location:<location-id>`
- `scene.storyboard-sheet` -> `scene:<scene-id>`
- `scene.dialogue-audio` -> `scene:<scene-id>:dialogue:<scene-dialogue-id>`
- `shot.video-take` -> `take:<take-id>`

Load only the relevant reference:

- Cast sheets: `references/cast-character-sheets.md`
- Cast profiles: `references/cast-profile.md` or `references/voice-over-profile-image.md`
- Cast voice samples: `references/cast-voice-sample.md`
- Location media: `references/location-sheet.md`
- Lookbook media: `references/lookbook-image.md` or `references/lookbook-sheets.md`
- Scene Storyboard generation and agent-owned splitting: `references/scene-storyboard-sheet.md`
- Shot Video Takes: `references/shot-video-take/index.md`
- Reference-aware image prompting: `references/reference-visible-image-prompting.md`

## Shot Video Takes

Read `shot.video-take` context for the exact Take. Use the returned Shot, Lookbook, repeated Cast, repeated Location, dialogue, and Additional Reference placements. Provider requirements—not guide occupancy—decide which inputs are required.

Do not reconstruct a second request-planning system or automatic provider
mapping in the skill. One spec is one explicit provider request.

## Scene Storyboard Sheet

Keep splitting agent-owned. Generate the accepted 2x2, at-most-four-panel composite, inspect the returned image with vision, choose crop boxes for that exact image, inspect every crop, and attach only accepted shot images. Never add fixed-coordinate, OCR, border-detection, grid-slicing, or runtime auto-split behavior.

## Safety and permissions

Provider-backed generation needs explicit user approval and network permission. Local Studio notifications may also require localhost network permission. If notification fails after a successful mutation, read durable state and refresh Studio; do not rerun a non-idempotent import.
