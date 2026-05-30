# Lookbook Image Purpose

Purpose key: `lookbook.image`

Target format: `lookbook:<lookbook-id>`

The image demonstrates how a Lookbook's visual language behaves in a concrete situation. Examples:

- a horror scene using the Lookbook palette,
- a happy opening scene using the same texture and lighting rules,
- a camera-angle study for intimacy or distance,
- a texture and exposure sheet for rain, smoke, glass, skin, cloth, or architecture.

Read context and model choices first:

```bash
renku generation context --purpose lookbook.image --target lookbook:<lookbook-id> --json
renku generation model list --purpose lookbook.image --target lookbook:<lookbook-id> --json
```

Persist a spec before estimating or running:

```bash
renku generation spec create --file lookbook-image-spec.json --json
renku generation estimate --spec <spec-id> --json
renku generation run --spec <spec-id> --approval-token <approval-token> --json
```

Run only after the user explicitly approves both the estimated cost and sending
project-derived prompt/context to the provider.

For the real `renku generation run`, request sandbox/network permission before
the first attempt. The permission request should say that Renku will contact the
approved provider and send the approved project-derived prompt/context.

Inspect each generated image before import. Compare the visible image against the Lookbook sections and choose only the sections it clearly demonstrates. Treat `focusSections` as generation intent, not placement truth.

Import finished media with the agent-reviewed section tags:

```bash
renku media import --purpose lookbook.image --target lookbook:<lookbook-id> --source generated/media/<file> --sections palette,lighting --json
```

Use section tags only when the image clearly demonstrates those sections. Prefer one to three sections for a single image. Do not tag all sections unless the image visibly and specifically demonstrates every section. If no section is clear, do not import automatically; explain why and ask whether to regenerate or import it unsectioned.
