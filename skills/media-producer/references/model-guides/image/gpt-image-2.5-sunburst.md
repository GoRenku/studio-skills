# GPT Image 2.5 Sunburst Prompt Guide

Sunburst is the quality-focused GPT Image 2.5 variant. OpenAI recommends it
when editing precision matters; Flare is the faster everyday choice. Both
generate from text and edit from references. See the shared
[GPT Image 2.5 guide](gpt-image-2.5.md) for prompt construction, preservation
instructions, exact routes, and the canonical Codex image-edit panel block.

For a detail-critical deliverable, an agent recommendation is to name the
features that will be inspected: engraved lines, fabric weave, tiny lettering,
or the joint between two materials. WaveSpeed's tutorial specifically
recommends describing materials and texture when testing Sunburst. Avoid
assuming the variant name alone communicates those requirements.

Original generation example, untested: `An editorial close-up of a brass
astrolabe on dark linen. Show the fine engraved degree marks, worn edges and
individual threads in the cloth. Side light from a tall window; shallow
depth of field, with the central scale in focus.`

Original edit example, untested: `In image 1, replace only the outer leather
strap with the woven strap in image 2. Preserve the watch face, engraved
numerals, hand positions, reflections and framing.` The reference has one
specific role, and the protected fine details are named explicitly.

If the strap edit also changes the numerals, the agent recommendation is to
return to the last approved base and narrow the instruction before increasing
quality. Higher quality is a rendering control, not a repair for an ambiguous
reference role. Check lettering and geometry visually after every revision.

Researched 2026-10-28: OpenAI's [Sunburst model documentation] and
[WaveSpeed's worked tutorial]. This guide's examples are agent-authored, not
provider demonstrations or measured comparisons.

[Sunburst model documentation]: https://developers.openai.com/api/docs/models/gpt-image-2.5-sunburst
[WaveSpeed's worked tutorial]: https://wavespeed.ai/blog/ai-models/gpt-image-2-5-flare-and-sunburst-now-on-wavespeedai/
