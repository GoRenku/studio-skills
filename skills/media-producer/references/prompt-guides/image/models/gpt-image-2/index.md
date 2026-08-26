# GPT Image 2 Prompt Guide

Applies to:

- `fal-ai/openai/gpt-image-2`
- `fal-ai/openai/gpt-image-2/edit`
- the default Codex built-in GPT Image 2 workflow, whose execution envelope
  stays separate from Engines

These model identities do not choose the Studio purpose. In particular,
`fal-ai/openai/gpt-image-2/edit` is also a reference-capable route for new
focused generations such as `scene.storyboard-sheet`. Use `purpose:
image.edit` only when `image-operation-routing.md` selected one exact source
image as the canvas for a source-preserving modification.

## Execution Selection

For every image purpose, including `image.edit`, the Project has one
image-generation setting. Codex is on by default. An explicit user choice for
the current request or explicit user choice takes
precedence. When Codex is selected, the harness must expose
`codex.gpt-image-2`.

Save one temporary review document with provider `codex`, model `gpt-image-2`,
media kind `image`, the exact top-level prompt, and the exact built-in invocation
request. Put local image markers at their actual invocation fields and invoke
the built-in tool with the reread final prompt and every selected reference.

The current Codex envelope exposes no exact size or quality field. Put the
high-resolution full-composite requirement in the prompt, inspect actual output
dimensions, and do not invent `image_size`, `quality`, `num_images`,
`input_fidelity`, or a pixel guarantee. Codex execution creates no durable job
state and invents no provider receipt.

When the Project setting is off or the user explicitly selects Renku, use
`fal-ai/openai/gpt-image-2/edit`. Put provider-visible images in `image_urls`
and use only fields supported by the current descriptor. Choose a custom
`image_size` that respects the route's current edge, total-pixel, aspect-ratio,
and multiple constraints; recheck those constraints instead of hardcoding a
timeless size. Leave authored quality absent when Core fixes it to `high`.
Leave `num_images` absent when one output is intended. Omit `input_fidelity`:
GPT Image 2 processes every image input at high fidelity automatically.

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

- Name each selected image by its exact provider-documented indexed token and give it one
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

Reviewed 2026-08-16 against OpenAI's current Codex image-generation guide, GPT
Image 2 model page, Image Generation guide, and GPT Image Generation Models
Prompting Guide:

- https://learn.chatgpt.com/docs/image-generation
- https://developers.openai.com/api/docs/models/gpt-image-2
- https://developers.openai.com/api/docs/guides/image-generation
- https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide
