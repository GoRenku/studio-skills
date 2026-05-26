# Cast Character Sheet Purpose

Purpose key: `cast.character-sheet`

Target format: `cast:<cast-member-id>`

Read context and model choices first:

```bash
renku generation context --purpose cast.character-sheet --target cast:<cast-member-id> --json
renku generation model list --purpose cast.character-sheet --target cast:<cast-member-id> --json
```

Character sheet generation requires an active Lookbook. The sheet should
synthesize:

- the screenplay and story function;
- the cast member's description, role, want, need, arc, and voice notes;
- period and setting signals;
- the active Lookbook's palette, lighting, composition, texture, and camera
  language.

Best current models:

- `fal-ai/openai/gpt-image-2`
- `fal-ai/nano-banana-2`
- `fal-ai/xai/grok-imagine-image` as a cheaper alternative when its limits are
  acceptable

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

Prompt for a reusable design reference, not a single glamour portrait. Good
prompts call out full-body reference, face, wardrobe, materials, expression
range, posture, props, and period-specific visual details.

Import the selected take:

```bash
renku media import --purpose cast.character-sheet --target cast:<cast-member-id> --source generated/media/<file> --json
```
