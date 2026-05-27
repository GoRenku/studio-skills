---
name: media-producer
description: Generate purpose-specific media for Renku Studio projects by reading Renku generation context, creating persisted generation specs, honoring user-selected controls exactly, estimating cost, running through Studio engines, and importing finished files separately.
---

# Media Producer

Use this skill when the user wants to create media for a Renku Studio purpose, such as a Lookbook demonstration image, cast character sheet, cast profile image, location environment sheet, future scene mood frame, or future narration audio.

This is not a generic image prompt skill. Renku is the context engine: first ask Renku what the media is for, then create or update a persisted spec that captures the user's binding choices.

## Start Here

1. Resolve the current Renku project, target purpose, and target id.
2. Read purpose context:

```bash
renku generation context --purpose <purpose-key> --target <target> --json
```

3. Inspect purpose-specific model choices if the user has not already chosen one:

```bash
renku generation model list --purpose <purpose-key> --target <target> --json
```

4. Create a Media Generation Spec JSON with the user's binding choices.
5. Persist the spec:

```bash
renku generation spec create --file <spec-json> --json
```

6. Estimate cost and get the approval token:

```bash
renku generation estimate --spec <spec-id> --json
```

7. Run generation only after the user has approved the model and cost. Do not ask for a separate content-disclosure approval; Renku approval is cost approval for the bound provider request. Use `--simulate` when validating shape without paid provider calls.

```bash
renku generation run --spec <spec-id> --approval-token <approval-token> --json
```

8. Inspect generated images before import. For Lookbook images, decide which Lookbook sections the image actually demonstrates. For cast images, choose the strongest take for the cast asset role. For location environment sheets, inspect the composite, use vision to identify the four scenic view blocks, crop only those four blocks, and inspect the four slices before import.
9. Import the finished file for the purpose:

```bash
renku media import --purpose <purpose-key> --target <target> --source <project-relative-path> --sections <agent-reviewed-sections> --json
```

Use `--sections` only for `lookbook.image`. Cast image imports do not use section tags.

## Target Resolution

Use the current open authoring project. Do not add `--project` to normal
generation, screenplay lookup, or import commands.

Confirm the current project when needed:

```bash
renku project current --json
```

When the user says "selected location" or "selected cast member", read Studio
focus:

```bash
renku studio current --json
```

- If `context.kind` is `location`, use `context.id` as
  `location:<location-id>`.
- If `context.kind` is `castMember`, use `context.id` as
  `cast:<cast-member-id>`.
- If `context.kind` is `locations`, use `context.locations` as the location
  list to resolve from.
- If `context.kind` is `cast`, use `context.cast` as the cast list to resolve
  from.

When the user names a location, get the current project's full location list:

```bash
renku screenplay location list --json
```

Match against each Location's `id`, `handle`, and `name`. The match does not
need to be exact; compare normalized words and obvious partial matches from the
full list. If there is one clear match, use `location:<id>`. If there are
multiple plausible matches, ask the user to choose. If there is no match, say
the Location must be added to the screenplay before generating location media.

When the user names a cast member, use the same pattern:

```bash
renku screenplay cast list --json
```

Match against each Cast member's `id`, `handle`, and `name`. If there is one
clear match, use `cast:<id>`. If there are multiple plausible matches, ask the
user to choose. If there is no match, say the Cast member must be added to the
screenplay before generating cast media.

## Binding Rules

- The persisted spec is binding.
- Do not change model choice, take count, seed, image frame, sheet frame, view frame, detail, output format, or future advanced controls after the user has selected them.
- Do not use external generation CLIs.
- Do not generate with a paid provider before estimating cost and getting explicit cost approval.
- Generation and import are separate steps. Do not assume a generated file is attached until `renku media import` succeeds.
- For Lookbook images, section placement is based on post-generation agent visual inspection. Do not copy `focusSections` into `--sections` without checking the actual image.
- For cast profile edit models, `sourceAssetId` is binding and must point to a cast-attached character sheet image.
- For location environment sheets, the target Location must already exist and the active Lookbook is required.

## Lookbook Image Purpose

Purpose key: `lookbook.image`

Target format: `lookbook:<lookbook-id>`

For Lookbook demonstration images:

```bash
renku generation context --purpose lookbook.image --target lookbook:<lookbook-id> --json
renku generation model list --purpose lookbook.image --target lookbook:<lookbook-id> --json
```

Use the returned Lookbook as the source of truth for visual language. The image should demonstrate a specific behavior of that language, such as palette under horror lighting, camera framing for intimacy, texture behavior in a rain scene, or the contrast between a happy beginning and a darker ending.

Do not expose a large option form to the user. Have a short creative conversation, then turn the result into a spec.

The first Lookbook Image spec shape is:

```json
{
  "purpose": "lookbook.image",
  "target": { "kind": "lookbook", "id": "lookbook_abc" },
  "modelChoice": "fal-ai/nano-banana-2",
  "prompt": "A horror hallway showing the Lookbook palette under dread lighting.",
  "focusSections": ["palette", "lighting", "texture"],
  "takeCount": 1,
  "seed": null,
  "imageFrame": "project",
  "detail": "standard",
  "outputFormat": "png",
  "title": "Horror palette hallway"
}
```

After generation, inspect each generated image before import. Compare the visible result against the Lookbook sections and choose only the sections the image clearly demonstrates. Treat `focusSections` as intent, not truth.

Import the result with the agent-reviewed sections:

```bash
renku media import --purpose lookbook.image --target lookbook:<lookbook-id> --source generated/media/<file> --sections palette,lighting --json
```

## Cast Character Sheet Purpose

Purpose key: `cast.character-sheet`

Target format: `cast:<cast-member-id>`

Read context and model choices first:

```bash
renku generation context --purpose cast.character-sheet --target cast:<cast-member-id> --json
renku generation model list --purpose cast.character-sheet --target cast:<cast-member-id> --json
```

Character sheets are reusable design references. They should synthesize the story, the specific character, the time period, and the active Lookbook. The active Lookbook is required.

Best current model choices:

- `fal-ai/openai/gpt-image-2`
- `fal-ai/nano-banana-2`
- `fal-ai/xai/grok-imagine-image` as a cheaper alternative when its limits are acceptable

Spec shape:

```json
{
  "purpose": "cast.character-sheet",
  "target": { "kind": "castMember", "id": "cast_ada" },
  "modelChoice": "fal-ai/nano-banana-2",
  "prompt": "A full character sheet for Ada...",
  "takeCount": 1,
  "seed": null,
  "imageFrame": "project",
  "detail": "standard",
  "outputFormat": "png",
  "title": "Ada character sheet"
}
```

Import the selected take:

```bash
renku media import --purpose cast.character-sheet --target cast:<cast-member-id> --source generated/media/<file> --json
```

## Cast Profile Purpose

Purpose key: `cast.profile`

Target format: `cast:<cast-member-id>`

Read context and model choices first:

```bash
renku generation context --purpose cast.profile --target cast:<cast-member-id> --json
renku generation model list --purpose cast.profile --target cast:<cast-member-id> --json
```

Profile images should ideally depend on a character sheet first. Prefer edit models when there is a selected character sheet and the user wants continuity. Text-to-image profile generation is valid when no source sheet exists.

Best current model choices:

- `fal-ai/openai/gpt-image-2`
- `fal-ai/nano-banana-2`
- `fal-ai/xai/grok-imagine-image` as a cheaper alternative when its limits are acceptable
- edit variants of those models when `sourceAssetId` is available

Text-to-image spec shape:

```json
{
  "purpose": "cast.profile",
  "target": { "kind": "castMember", "id": "cast_ada" },
  "modelChoice": "fal-ai/nano-banana-2",
  "prompt": "A square profile portrait of Ada...",
  "takeCount": 1,
  "seed": null,
  "imageFrame": "1:1",
  "detail": "standard",
  "outputFormat": "png",
  "title": "Ada profile"
}
```

Edit spec shape:

```json
{
  "purpose": "cast.profile",
  "target": { "kind": "castMember", "id": "cast_ada" },
  "modelChoice": "fal-ai/nano-banana-2/edit",
  "sourceAssetId": "asset_character_sheet",
  "prompt": "Create a square profile portrait derived from the attached character sheet...",
  "takeCount": 1,
  "seed": null,
  "imageFrame": "1:1",
  "detail": "standard",
  "outputFormat": "png",
  "title": "Ada profile from sheet"
}
```

Import the selected take:

```bash
renku media import --purpose cast.profile --target cast:<cast-member-id> --source generated/media/<file> --json
```

## Location Environment Sheet Purpose

Purpose key: `location.environment-sheet`

Target format: `location:<location-id>`

Read context and model choices first:

```bash
renku generation context --purpose location.environment-sheet --target location:<location-id> --json
renku generation model list --purpose location.environment-sheet --target location:<location-id> --json
```

Location environment sheets require an active Lookbook and an existing
screenplay Location. If the intended historical place is not in the location
list, ask the user or screenplay agent to add the Location first instead of
generating from free text.

Best current models:

- `fal-ai/openai/gpt-image-2`
- `fal-ai/nano-banana-2`
- `fal-ai/xai/grok-imagine-image` as a cheaper alternative when its limits are acceptable

Spec shape:

```json
{
  "purpose": "location.environment-sheet",
  "target": { "kind": "location", "id": "location_sea_walls" },
  "modelChoice": "fal-ai/openai/gpt-image-2",
  "prompt": "A polished one-call 2x2 location environment sheet for the sea walls location...",
  "takeCount": 1,
  "seed": null,
  "sheetFrame": "4:3",
  "viewFrame": "16:9",
  "detail": "standard",
  "outputFormat": "png",
  "title": "Sea walls environment sheet"
}
```

The persisted prompt is the final provider prompt for this purpose. It must ask
for one polished 2x2 sheet with `0 front`, `90 right`, `180 back`, and
`270 left` scenic panels plus a bottom Lookbook texture/material/lighting strip.
Do not mention provider-facing templates, masks, uploaded grids, red markers, or
preserving a provided layout image.

The provider returns one composite image. After generation, use vision to find
the four actual scenic image blocks, then crop exactly those four blocks into
front, right, back, and left view files. Do not crop the bottom texture strip;
it stays only in the composite sheet.

When four clean scenic blocks cannot be identified, when labels or gutters
pollute a slice, or when the sheet contains red dots, obvious template artifacts,
or diagnostic marks, do not import it. Show the composite to the user, say the
generation is not good enough for a location sheet, and ask whether to
regenerate. Do not repair bad takes with marker detection, border detection,
OCR, rough quadrants, or other crop heuristics.

Import the selected sheet:

```bash
renku media import --purpose location.environment-sheet --target location:<location-id> --file location-environment-sheet-import.json --json
```

The import file must explicitly list `composite`, `view_front`, `view_right`,
`view_back`, and `view_left`. Do not use source-only import for this purpose.

Use `references/location-environment-sheet.md` for prompt structure,
historical guardrails, and extraction expectations.

## Quality Bar

- Make the output serve the purpose context, not just the literal prompt.
- Before import, visually inspect every generated Lookbook image and assign only sections with concrete visible evidence.
- For cast character sheets, include full-body, face, wardrobe, expression, pose, material, and period cues when the prompt asks for a sheet.
- For cast profiles, keep the prompt focused on a single recognizable portrait and preserve continuity with the character sheet when using an edit model.
- For location environment sheets, preserve one composite with four usable azimuth views and a bottom Lookbook texture/lighting guideline strip. Crop only the four scenic views; do not crop or import the texture strip separately.
- Do not tag all Lookbook sections unless the image visibly and specifically demonstrates every section.
- If an image does not clearly demonstrate any Lookbook section, do not import it automatically; explain the problem and ask whether to regenerate or import it unsectioned.
- Prefer concrete cinematic language over abstract mood words.
- Keep the user in control of model choice and binding controls.
- Return the generated file path, run record, and import result in your final answer.

## Reference Files

- `references/workflow.md`
- `references/lookbook-image.md`
- `references/cast-character-sheet.md`
- `references/cast-profile.md`
- `references/location-environment-sheet.md`
- `references/character-images.md`
- `references/future-purpose-sketches.md`
- `samples/lookbook-image-spec.json`
- `samples/cast-character-sheet-spec.json`
- `samples/cast-profile-spec.json`
- `samples/location-environment-sheet-spec.json`
