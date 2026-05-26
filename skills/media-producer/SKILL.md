---
name: media-producer
description: Generate purpose-specific media for Renku Studio projects by reading Renku generation context, creating persisted generation specs, honoring user-selected controls exactly, estimating cost, running through Studio engines, and importing finished files separately.
---

# Media Producer

Use this skill when the user wants to create media for a Renku Studio purpose, such as a Lookbook demonstration image, cast character sheet, cast profile image, future scene mood frame, or future narration audio.

This is not a generic image prompt skill. Renku is the context engine: first ask Renku what the media is for, then create or update a persisted spec that captures the user's binding choices.

## Start Here

1. Resolve the Renku project and target purpose.
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

7. Run generation only after the user has approved the model and cost. Use `--simulate` when validating shape without paid provider calls.

```bash
renku generation run --spec <spec-id> --approval-token <approval-token> --json
```

8. Inspect generated images before import. For Lookbook images, decide which Lookbook sections the image actually demonstrates. For cast images, choose the strongest take for the cast asset role.
9. Import the finished file for the purpose:

```bash
renku media import --project <project-name> --purpose <purpose-key> --target <target> --source <project-relative-path> --sections <agent-reviewed-sections> --json
```

Use `--sections` only for `lookbook.image`. Cast image imports do not use section tags.

## Binding Rules

- The persisted spec is binding.
- Do not change model choice, take count, seed, image frame, detail, output format, or future advanced controls after the user has selected them.
- Do not use external generation CLIs.
- Do not generate with a paid provider before estimating cost and getting explicit approval.
- Generation and import are separate steps. Do not assume a generated file is attached until `renku media import` succeeds.
- For Lookbook images, section placement is based on post-generation agent visual inspection. Do not copy `focusSections` into `--sections` without checking the actual image.
- For cast profile edit models, `sourceAssetId` is binding and must point to a cast-attached character sheet image.

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
renku media import --project <project-name> --purpose lookbook.image --target lookbook:<lookbook-id> --source generated/media/<file> --sections palette,lighting --json
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
renku media import --project <project-name> --purpose cast.character-sheet --target cast:<cast-member-id> --source generated/media/<file> --json
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
renku media import --project <project-name> --purpose cast.profile --target cast:<cast-member-id> --source generated/media/<file> --json
```

## Quality Bar

- Make the output serve the purpose context, not just the literal prompt.
- Before import, visually inspect every generated Lookbook image and assign only sections with concrete visible evidence.
- For cast character sheets, include full-body, face, wardrobe, expression, pose, material, and period cues when the prompt asks for a sheet.
- For cast profiles, keep the prompt focused on a single recognizable portrait and preserve continuity with the character sheet when using an edit model.
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
- `references/character-images.md`
- `references/future-purpose-sketches.md`
- `samples/lookbook-image-spec.json`
- `samples/cast-character-sheet-spec.json`
- `samples/cast-profile-spec.json`
