# Seedream 5.0 Pro Image Prompt Guide

Use Seedream 5.0 Pro for image creation, editing, multi-image composition, and
reference-guided visual reasoning when the selected provider route exposes the
required inputs. The provider route and live schema decide which images and
controls are actually available; this guide owns the model-facing prompt.

## Generation

- Write a concrete visual brief covering subject, composition, environment,
  architecture or geography, light, palette, materials, camera or image-making
  language, and meaningful exclusions.
- Use its visual reasoning for dense Lookbook and Location compositions,
  cultural and period detail, material specificity, and relationships between
  several visible subjects.
- Describe required readable text, hierarchy, and placement explicitly.
- Keep one-image requests direct. Use short labeled sections only when a board,
  composite, or multi-subject request benefits from them.

## Editing And References

- For a source-preserving edit, distinguish the source canvas from supporting
  references. State the exact change and the source traits that must survive.
- For multi-image composition, give each supplied image one narrow role and
  state the desired spatial relationship instead of relying on input order.
- Preserve identities, geography, construction, materials, typography, or
  layout explicitly when they are continuity constraints.
- Do not imply that a reference is visible unless the provider adapter actually
  includes it in the request.

## Provenance

Recovered from the Seedream research and model heuristics present before the
provider refactor. The earlier material reviewed Fal.ai's Seedream 5 overview,
its exposed v5 Lite route, and the Seedream 4.0 model-family paper. Those sources
establish prompting direction, not the current 5.0 Pro transport contract:

- https://fal.ai/seedream-5.0
- https://fal.ai/models/fal-ai/bytedance/seedream/v5/lite/text-to-image
- https://arxiv.org/abs/2509.20427
