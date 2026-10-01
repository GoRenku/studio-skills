# Grok Imagine Image Prompt Guide

Applies to Grok Imagine Image generation and editing through a supported
provider route. xAI's current Imagine API names `grok-imagine-image-2.0` for
generation and editing and documents multi-image editing with up to five source
images. That does not prove a hosted route named Grok Imagine Image serves
version 2.0. Reference count and input shape still depend on the selected route's
live schema; this family guide does not add a route or API contract.

## Generation

- Lead with the main subject and action, then add setting, composition,
  lighting, materials, palette, and finish where they shape the result.
- State aspect-ratio-sensitive framing when it matters creatively, while
  keeping the raw aspect-ratio value in the provider-native field.
- Keep a simple request short. Use compact labeled groups for a dense board or
  exact visible-text requirements only when they make the relationships easier
  to review.

## Revise source or combine references

- For an edit, name the visible change and its location, then state the
  surrounding content that must stay intact.
- Give each selected input a distinct role, such as source scene, subject
  appearance, or style. When a model-facing mention is needed, use only the
  exact marker supplied by the provider adapter.
- For a composite, say what moves into which scene and describe the placement
  and interaction. xAI's current docs show combining source images and describe
  their role in natural language; assigning a clear role to each one is a
  Renku recommendation, not a special prompt token.

Illustrative prompts, not generated or tested:

- Generation: `A red fox pauses at the edge of a snowy orchard at dusk, viewed
  from low among the grasses. Blue twilight fills the snow while one distant
  farmhouse window glows amber; quiet natural-history photograph.`
- Edit: `In the supplied storefront photo, replace only the blue awning with a
  faded red-and-cream striped awning. Preserve the shop sign, window positions,
  wet pavement, and camera perspective.`
- Composite: `Place the supplied brass desk lamp on the writing table in the
  supplied attic room. Match the room's warm window light and keep the papers
  and chair in place.`

If a multi-image edit blends the wrong elements, simplify the request and
clarify which source contributes each subject or visual property. xAI documents
the operation and examples; the sources reviewed here do not supply a detailed
image-prompting cookbook. This troubleshooting advice is Renku guidance.

Reviewed 2026-09-30 against xAI's [Imagine overview] and [multi-image editing
documentation]. xAI documents model identity, editing, and the current
five-image limit; the prompt roles and examples above are Renku
recommendations.

[Imagine overview]: https://docs.x.ai/developers/model-capabilities/imagine
[multi-image editing documentation]: https://docs.x.ai/developers/model-capabilities/images/multi-image-editing
