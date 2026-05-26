---
name: media-producer
description: Generate purpose-specific media for Renku Studio projects by reading Renku generation context, creating persisted generation specs, honoring user-selected controls exactly, estimating cost, running through Studio engines, and importing finished files separately.
---

# Media Producer

Use this skill when the user wants to create media for a Renku Studio purpose, such as a Lookbook demonstration image, future character portrait, future character sheet, future scene mood frame, or future narration audio.

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

8. For Lookbook images, inspect the generated image yourself before import and decide which Lookbook sections it actually demonstrates. Treat `focusSections` as generation intent, not placement truth.
9. Import the finished file for the purpose with only the agent-reviewed section tags:

```bash
renku media import --project <project-name> --purpose <purpose-key> --target <target> --source <project-relative-path> --sections <agent-reviewed-sections> --json
```

## Binding Rules

- The persisted spec is binding.
- Do not change model choice, take count, seed, image frame, detail, output format, or future advanced controls after the user has selected them.
- Do not use external generation CLIs.
- Do not generate with a paid provider before estimating cost and getting explicit approval.
- Generation and import are separate steps. Do not assume a generated file is attached until `renku media import` succeeds.
- For Lookbook images, section placement is based on post-generation agent visual inspection. Do not copy `focusSections` into `--sections` without checking the actual image.

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

## Quality Bar

- Make the output serve the purpose context, not just the literal prompt.
- Before import, visually inspect every generated Lookbook image and assign only sections with concrete visible evidence.
- Do not tag all Lookbook sections unless the image visibly and specifically demonstrates every section.
- If an image does not clearly demonstrate any Lookbook section, do not import it automatically; explain the problem and ask whether to regenerate or import it unsectioned.
- Prefer concrete cinematic language over abstract mood words.
- Keep the user in control of model choice and binding controls.
- Return the generated file path, run record, and import result in your final answer.

## Reference Files

- `references/workflow.md`
- `references/lookbook-image.md`
- `references/future-purpose-sketches.md`
- `samples/lookbook-image-spec.json`
