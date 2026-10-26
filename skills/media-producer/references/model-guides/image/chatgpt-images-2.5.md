# ChatGPT Images 2.5 (Codex)

Use this guide when the selected image provider is Codex and the active harness
exposes built-in image generation. The tool accepts a prompt and selected image
references but does not expose an exact Flare or Sunburst model selector. Use
`chatgpt-images-2.5` as the review and provenance family identity unless the
tool reports a more exact identity. Never claim a particular API variant from
this family label.

## What is documented

OpenAI announced ChatGPT Images 2.5 for ChatGPT, ChatGPT Work, and Codex, and
describes improved reference-subject preservation, focused edits, and
consistency across multiple editing turns. The API separately exposes GPT Image
2.5 Flare and Sunburst. Those API names do not identify which variant the
built-in Codex tool uses. See OpenAI's [Images 2.5 announcement] and [image
prompting guide] for the current family and API guidance. For the Flare and
Sunburst API routes on an external provider, use the
[GPT Image 2.5 guide](gpt-image-2.5.md).

## Renku prompting recommendations

- Lead with the intended image or edit and the subject that should dominate it.
- State composition, spatial relationships, lighting, materials, style, and
  exact visible text when they matter to acceptance.
- For an edit, name the exact source image, the requested change, and the
  important details to preserve. Supply the selected image through the tool;
  prompt text does not carry the image itself.
- Give each of several selected references one distinct role. Use exact
  provider-adapter mentions only when that adapter provides them.
- For iterative edits, change one important thing at a time and restate a
  constraint if it drifts. Inspect the returned image after each edit; the
  product announcement describes improved consistency, not a guarantee.

Illustrative prompts, not generated or tested:

- Creation: `A quiet coastal train station at dawn, one red bicycle beside the
  entrance, wide eye-level view, cool blue stone and a single warm platform
  light.`
- Edit: `In the supplied poster, change only the date to “18 OCTOBER”. Keep the
  title, lettering style, alignment, colors, and paper texture as they are.`

Use the shared image prompting guide and the purpose guide for the particular
Studio artifact. Review the actual output; do not infer that it met the brief.

Reviewed 2026-09-30 against OpenAI's [Images 2.5 announcement] and [image
prompting guide]. The announcement is product documentation; the prompt
patterns above are Renku recommendations for this harness, not an evaluation of
its hidden model variant.

## Codex panel

The built-in tool is a route of the Codex
[image edit panel](../../image-edit-panels.md), offered only in Codex Desktop:

```json
{
  "purpose": "image-edit",
  "routes": [
    { "provider": "codex", "model": "chatgpt-images-2.5", "regionModes": null, "styleReference": true, "controlPointers": [] }
  ]
}
```

**Route Description.** This route has no `generation models list` entry and no
provider schema. Use `label: "GPT Image 2.5"`, `providerLabel: "Codex
(built-in)"` and empty controls (`{ "groups": [] }`); the panel shows plan
usage automatically for the Codex built-in provider. The tool has no mask
parameter, so the panel shows no regions.

**Mapping the consumed draft.** Write the review document with
`provider: "codex"`, `model: "chatgpt-images-2.5"` and the built-in fields:

- `referenced_image_paths`: the base image first, then the style reference
  when present, then each resolved reference, as `$file` markers with
  meaningful `reviewLabel`s. The tool takes at most five images.
- `prompt`: the whole-image instruction as an edit of image 1, the style
  reference's style-only role ("match the palette, lighting and rendering
  style of image 2, keeping the composition of image 1") and a sentence naming
  what must stay unchanged.

[Images 2.5 announcement]: https://openai.com/index/introducing-chatgpt-images-2-5/
[image prompting guide]: https://developers.openai.com/api/docs/guides/image-prompting
