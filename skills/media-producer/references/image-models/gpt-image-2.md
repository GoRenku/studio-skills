# GPT Image 2 Prompt Guide

Applies to:

- `fal-ai/openai/gpt-image-2`
- `fal-ai/openai/gpt-image-2/edit`
- the Codex external GPT Image 2 workflow, whose execution envelope stays
  separate

## Generation

- Lead with the intended artifact and its primary subject.
- Describe composition, camera/viewpoint, environment, lighting, materials,
  palette, and required text explicitly when those details matter.
- Use short labeled groups for production boards or other dense requests. Keep
  a single-scene request as direct prose.
- State important spatial relationships and exact visible text. Avoid relying
  on vague style adjectives to carry layout requirements.

## Revise source

- Name each selected image by its exact `@ReferenceN` token and give it one
  clear role.
- State what must change and what must remain unchanged. For a localized edit,
  constrain the change instead of redescribing the entire image.
- Describe identity, layout, material, lighting, or typography continuity that
  must survive the edit.

## Provenance

Reviewed 2026-07-18 against OpenAI's current GPT Image 2 model page, Image
Generation guide, and GPT Image Generation Models Prompting Guide:

- https://developers.openai.com/api/docs/models/gpt-image-2
- https://developers.openai.com/api/docs/guides/image-generation
- https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide
