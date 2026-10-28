# GPT Image 2.5 Flare and Shared Prompt Guide

Use this guide for the GPT Image 2.5 API family on a supported external
provider: Flare and Sunburst. For Codex's built-in image tool, use the
[ChatGPT Images 2.5 guide](chatgpt-images-2.5.md) instead; that tool does not
expose which API variant it uses. The provider route owns request fields and
reference syntax; this guide owns only the model-facing prompt.

OpenAI describes **Sunburst** as the base model, optimized for quality, and
**Flare** as the small model, optimized for speed, with image quality
comparable to GPT Image 2. Both improve on precise editing and subject
preservation. OpenAI suggests trying Sunburst when quality is the concern, then
the same prompt and inputs on Flare, and switching to Flare only when its
quality still meets the brief.

The model chooser exposes Flare and [Sunburst](gpt-image-2.5-sunburst.md)
separately in both image lanes on all four providers. This guide supplies
shared craft and canonical edit-panel descriptions for both variants.

## Generation

OpenAI's [image prompting guide] recommends describing the intended image,
subject, composition, style and constraints. Quote exact copy and state its
hierarchy and position. Keep native size and quality in request fields.

Original generation example, untested: `An editorial photograph of a bakery
before opening. A baker rolls dough at the left of frame; the right third is
a quiet cream wall for later title placement. Cool dawn through the front
window, warm practical lamps, natural flour texture, eye-level view.`
The reserved space is a composition requirement, not invented title text.

Original typography example, untested: `Design a portrait night-ferry poster.
Put “THE LAST CROSSING” at the top in large ivory capitals and “Departures
after dusk” below in smaller type. A lit ferry sits low on dark blue water.
Keep both lines separate and legible.`

Agent recommendation: if wording is wrong, edit just the failed line using
its exact copy and location, preserving the approved layout. For cutouts,
choose a route exposing transparency and use PNG or WebP; see the
[Fal.ai generation schema].

## Editing

- Separate the change from the constraints: say "change only …", then list
  what must stay the same, such as identity, layout, lighting or typography.
- Refine one thing at a time. Edit from the previous result, request a single
  change and restate the details to preserve. Inspect each result before adding
  more instructions.
- Number each input image and give it one role, such as the image to edit,
  style, clothing or background, and say how they combine. Use exact
  provider-adapter mentions only when the adapter supplies them.
- Repeated edits can drift. When an area must stay pixel-identical, plan to
  composite the approved edit rather than relying on the prompt alone.
- Never use project-internal words in the prompt. Words such as "the selected
  image", "Take 3" or Renku ids mean nothing to the model; describe each image
  by what it shows and its number.

Illustrative edit prompt, not generated or tested: `In image 1, change only the
banner color to deep crimson, matching the palette and painted texture of the
style sheet in image 2. Keep the man's face, his armor, the composition and the
evening light unchanged.`

## Codex panel

GPT Image 2.5 Flare Edit and Sunburst Edit are region-free routes of the Codex
[image edit panel](../../image-edit-panels.md): the user describes the change
for the whole image and may add a style reference.

```json
{
  "purpose": "image-edit",
  "routes": [
    { "provider": "fal-ai", "model": "openai/gpt-image-2.5/flare/edit", "regionModes": null, "styleReference": true, "controlPointers": ["/quality"] },
    { "provider": "fal-ai", "model": "openai/gpt-image-2.5/sunburst/edit", "regionModes": null, "styleReference": true, "controlPointers": ["/quality"] },
    { "provider": "pika", "model": "openai/gpt-image-2.5-flare/image-to-image", "regionModes": null, "styleReference": true, "controlPointers": ["/quality"] },
    { "provider": "pika", "model": "openai/gpt-image-2.5-sunburst/image-to-image", "regionModes": null, "styleReference": true, "controlPointers": ["/quality"] },
    { "provider": "replicate", "model": "openai/gpt-image-2.5-flare", "regionModes": null, "styleReference": true, "controlPointers": ["/quality"] },
    { "provider": "replicate", "model": "openai/gpt-image-2.5-sunburst", "regionModes": null, "styleReference": true, "controlPointers": ["/quality"] },
    { "provider": "wavespeed-ai", "model": "openai/gpt-image-2.5-flare/edit", "regionModes": null, "styleReference": true, "controlPointers": ["/quality"] },
    { "provider": "wavespeed-ai", "model": "openai/gpt-image-2.5-sunburst/edit", "regionModes": null, "styleReference": true, "controlPointers": ["/quality"] }
  ]
}
```

**Controls.** Quality is the iteration control in an "Output" group, with
options and defaults from the live schema (checked 2026-10-28). Masks stay outside this panel's
whole-image interaction vocabulary.

**Mapping the consumed draft.** Turn `wholeImageInstruction` into a focused
edit following “Editing” above. Put the base first, the optional style
reference second with a style-only role, then other resolved references.
Place `$file` markers in `image_urls` on Fal.ai and Pika, `input_images`
on Replicate, and `images` on WaveSpeed. Set `quality` from draft `values`.
For edits use Fal.ai `image_size: "auto"`, Pika `size: "auto"`, Replicate
`aspect_ratio: "auto"`, and omit WaveSpeed's `aspect_ratio`. Pika's `size`
overrides its separate aspect and resolution controls; this panel leaves
resolution at the model's automatic choice. This avoids square defaults on
Pika and Replicate without making unsupported dimension-preservation promises.

Follow the [Fal.ai](../../../../fal-ai-media-provider/references/adapters/reference-inputs.md),
[Pika](../../../../pika-media-provider/references/adapters/reference-inputs.md),
[Replicate](../../../../replicate-media-provider/references/adapters/reference-inputs.md)
and [WaveSpeed](../../../../wavespeed-media-provider/references/adapters/reference-inputs.md)
adapters for reference placement and mention syntax.

Reviewed 2026-10-28 against OpenAI's [image prompting guide] and Fal.ai's
[Flare edit] and [Sunburst edit] API schemas. The edit practices above are
OpenAI's published recommendations; the example is illustrative and untested.
Current provider fields and limits remain owned by each live route schema.

Additional route references: [Pika catalog](https://api.dev.pika.art/catalog/apis),
`openai/gpt-image-2.5-flare/{text-to-image,image-to-image}` and
`openai/gpt-image-2.5-sunburst/{text-to-image,image-to-image}`;
[Replicate Flare](https://replicate.com/openai/gpt-image-2.5-flare) and
[Sunburst](https://replicate.com/openai/gpt-image-2.5-sunburst), each serving
both modes through `input_images`;
[WaveSpeed's tutorial](https://wavespeed.ai/blog/ai-models/gpt-image-2-5-flare-and-sunburst-now-on-wavespeedai/)
links both variants' generation and edit routes. Native fields and panel
defaults were inspected in live schemas; no paid generation was run.

[Fal.ai generation schema]: https://fal.ai/models/openai/gpt-image-2.5/flare/text-to-image/api
[image prompting guide]: https://developers.openai.com/api/docs/guides/image-prompting
[Flare edit]: https://fal.ai/models/openai/gpt-image-2.5/flare/edit/api
[Sunburst edit]: https://fal.ai/models/openai/gpt-image-2.5/sunburst/edit/api
