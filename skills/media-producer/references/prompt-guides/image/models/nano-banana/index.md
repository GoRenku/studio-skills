# Nano Banana Image Prompt Guide

Applies to:

- `fal-ai/nano-banana-2`
- `fal-ai/nano-banana-2/edit`
- `fal-ai/nano-banana-pro`
- `fal-ai/nano-banana-pro/edit`

## Generation

- Describe the scene or artifact in concrete natural language: subject,
  action, environment, composition, camera, lighting, style, and finish.
- Use Nano Banana 2 for concise general image work and multi-reference
  continuity. Use Nano Banana Pro's stronger instruction following for dense
  production assets, precise text, or complex composition.
- Put required visible text in quotation marks and describe its placement and
  hierarchy.
- Use readable sections for a complex board; do not inflate a simple image
  request into a template.

## Revise source

- Identify each input with its exact `@ReferenceN` token and explain whether it
  supplies the source, identity, environment, style, or another visual role.
- Give direct change instructions, then list the visual facts that must remain
  consistent.
- For compositing, state how the referenced subjects relate spatially rather
  than asking the model to infer their roles from input order.

## Provenance

Reviewed 2026-07-18 against Google's current Nano Banana image-generation and
prompting guidance. Google documents Nano Banana 2 as the general workhorse and
Nano Banana Pro for complex professional asset production:

- https://ai.google.dev/gemini-api/docs/image-generation
- https://ai.google.dev/gemini-api/docs/prompting-strategies
