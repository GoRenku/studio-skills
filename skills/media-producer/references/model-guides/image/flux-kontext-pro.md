# FLUX Kontext Pro Image Prompt Guide

Use FLUX.1 Kontext [pro] for source-guided image creation and editing when the
selected route exposes those inputs. Black Forest Labs documents text-to-image,
image-conditioned generation, targeted edits, reference-style transfer, and
multi-turn refinement for the Kontext family. Exact input fields and reference
limits belong to the selected provider route, not this guide.

## Prompt craft

For text-to-image, BFL's agent-facing FLUX guide recommends a descriptive
sentence that leads with the subject and action, then adds style, context,
lighting, and technical visual cues. Treat this as general FLUX-family advice,
not a Kontext Pro-only formula. For Kontext edits, name the visible target and
the new state, then identify what must stay stable. BFL's Kontext guidance
favors simple, direct instructions, explicit preservation constraints, and
building from a simple change toward more complex edits. It also recommends
changing one element at a time when refining, which makes a missed instruction
easier to diagnose.

Describe identity, composition, typography, geometry, materials, light, and
background only where they matter to the requested change. If replacing text,
give the exact wording and describe how it should sit in the existing design;
do not ask the model to infer an unstated label or redesign the whole surface.

For a new image guided by a reference, say which visual property the reference
contributes, such as a character's appearance or a painting's style. For a
composite, state the desired scale, placement, overlap, and interaction. These
role assignments are Renku recommendations: exact image ordering and any
prompt-visible markers still come from the selected provider adapter.

Illustrative prompts, not generated or tested:

- Focused edit: `Replace the paper cup in the foreground with a clear glass of
  water. Keep the hand position, table, window light, and camera framing
  unchanged.`
- Iterative refinement: first request a small change such as `Turn the shop
  sign from green to cream, preserving its lettering and the rest of the
  storefront.` If the edit succeeds but needs warmer light, ask for that as a
  separate follow-up rather than combining unrelated changes.
- Text replacement: `Change the menu heading to “LUNCH TODAY” in the same
  narrow cream lettering, aligned to the existing sign. Keep the menu frame,
  wall, and camera view unchanged.`

## Limits and recovery

BFL reports that very long edit sequences can accumulate artifacts, and that
instructions may occasionally be missed. When an edit drifts, restate the
specific invariant and reduce the next request to one visible change. If the
image has degraded after repeated edits, return to the original source and
reapply only the edits that still matter. This recovery sequence is a Renku
recommendation based on BFL's published failure notes; it is not a guaranteed
repair method.

Keep aspect ratio, output format, safety, seed, and other configuration in the
provider-native fields exposed by the live schema rather than prompt prose.

Reviewed 2026-09-30 against Black Forest Labs' [FLUX.1 Kontext announcement],
[model page], and [FLUX prompting guide]. The prompting guide covers FLUX.1
and FLUX.2 family craft; it does not establish that every recommendation is
unique to Kontext Pro. BFL documents the capabilities and reported
limitations; examples and recovery advice above are Renku recommendations and
have not been generated against a live route.

[FLUX.1 Kontext announcement]: https://bfl.ai/blog/flux-1-kontext
[model page]: https://bfl.ai/models/flux-kontext
[FLUX prompting guide]: https://github.com/black-forest-labs/skills/blob/master/skills/flux-image-best-practices/AGENTS.md
