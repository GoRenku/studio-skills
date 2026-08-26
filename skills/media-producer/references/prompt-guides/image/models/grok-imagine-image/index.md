# Grok Imagine Image Prompt Guide

Applies to:

- `fal-ai/xai/grok-imagine-image`
- `fal-ai/xai/grok-imagine-image/edit`

## Generation

- Use a direct visual description with the subject, setting, composition,
  lighting, materials, palette, and finish that the user needs.
- State aspect-ratio-sensitive framing in the prompt when it is creatively
  important, while keeping the raw aspect-ratio value in Config.
- Keep simple requests short. Use compact groups only for dense production
  boards or exact visible-text requirements.

## Revise source

- Refer to selected inputs by exact `@ReferenceN` token and give each one a
  distinct visual role.
- Use natural-language edit instructions: name the change, its location, and
  the surrounding content that must remain intact.
- When several references are selected, state which image is the source and
  which images supply appearance, location, or style continuity.

## Provenance

Reviewed 2026-07-18 against xAI's current Imagine overview, image generation,
and image editing documentation. The official API supports natural-language
editing and up to three reference images:

- https://docs.x.ai/developers/model-capabilities/imagine
- https://docs.x.ai/developers/model-capabilities/images/generation
- https://docs.x.ai/developers/model-capabilities/images/editing
