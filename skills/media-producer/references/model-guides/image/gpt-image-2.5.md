# GPT Image 2.5 Prompt Guide

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
    { "provider": "fal-ai", "model": "openai/gpt-image-2.5/sunburst/edit", "regionModes": null, "styleReference": true, "controlPointers": ["/quality"] }
  ]
}
```

**Controls.** Quality is the setting that trades speed for fidelity between
iterations, so it is the panel's only control, in an "Output" group, with the
live schema's options and default (checked 2026-10-11). Keep `image_size` at
its default `auto` so the edit keeps the source aspect. The routes' mask input
is outside the panel's interaction vocabulary and stays unused.

**Mapping the consumed draft.** Write the prompt from the draft's
`wholeImageInstruction` following "Editing" above, giving the style reference
a style-only role by its image number. Put the edit base first in `image_urls`,
then the style reference, then any resolved references, as `$file` markers
(see the Fal.ai
[reference input adapter](../../../../fal-ai-media-provider/references/adapters/reference-inputs.md)).
Set `quality` from the draft `values`.

Reviewed 2026-10-11 against OpenAI's [image prompting guide] and Fal.ai's
[Flare edit] and [Sunburst edit] API schemas. The edit practices above are
OpenAI's published recommendations; the example is illustrative and untested.
Current provider fields and limits remain owned by each live route schema.

[image prompting guide]: https://developers.openai.com/api/docs/guides/image-prompting
[Flare edit]: https://fal.ai/models/openai/gpt-image-2.5/flare/edit/api
[Sunburst edit]: https://fal.ai/models/openai/gpt-image-2.5/sunburst/edit/api
