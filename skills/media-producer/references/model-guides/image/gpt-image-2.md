# GPT Image 2 Prompt Guide

Use this guide for GPT Image 2 regardless of whether execution uses the Codex
built-in capability or a supported external provider. The provider route owns
request fields and reference syntax. Use image-edit prompting only when image
operation routing selected one exact source as the canvas for a
source-preserving modification; a reference-capable provider route can also
create a new image.

## Generation

- Lead with the intended artifact and its primary subject.
- Describe composition, camera/viewpoint, environment, lighting, materials,
  palette, and required text explicitly when those details matter.
- Use short labeled sections in a stable order for dense multi-reference or
  multi-panel requests. Keep a simple single-image request as direct prose.
- State important spatial relationships and exact visible text. Avoid relying
  on vague style adjectives to carry layout requirements.
- For people, state scale, placement, pose, gaze, expression, and interaction
  when they determine success. For Props, state holder, placement, state,
  scale, and interaction. For Locations, state stable geography and landmarks.
- Describe each storyboard panel as one concrete, action-focused visible Beat.
  Four panels are regions inside one generated composite, not four output
  variants.

## Reference Roles

- Name each selected image with the exact mention supplied by the provider
  adapter, when the model-facing prompt needs to distinguish it, and give it one
  clear, non-overlapping role.
- State what must remain unchanged and what must change. For Scene Storyboards,
  the Storyboard Lookbook reference alone controls target appearance;
  Character, Location, and Prop references preserve canonical subject/design
  facts while their source rendering style changes to the Storyboard Lookbook
  style.
- Put the Storyboard Lookbook first, then exact batch-relevant Character,
  Location, and Prop references in deliberate stable order.
- When the Studio purpose is `image.edit`, constrain the change instead of
  redescribing the whole image. Describe identity, layout, material, lighting,
  or typography continuity that must survive.

## Provenance

Reviewed 2026-08-16 against OpenAI's Codex image-generation guide, GPT
Image 2 model page, Image Generation guide, and GPT Image Generation Models
Prompting Guide:

- https://learn.chatgpt.com/docs/image-generation
- https://developers.openai.com/api/docs/models/gpt-image-2
- https://developers.openai.com/api/docs/guides/image-generation
- https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide
