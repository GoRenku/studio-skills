# Muse Image Prompt Guide

Meta's Muse Image generates from text and edits or combines references.
[Meta's guide] describes conversational refinement and automatic grounding.
The bundled Fal.ai, Pika and WaveSpeed routes use one-shot requests: for a
follow-up, explicitly supply the approved previous image again. Do not assume
that these routes retain Meta Responses API conversation state.

## Prompt craft

[Fal.ai's worked examples] show distinct instructions for restyling a room,
rendering a sketch, photographing a product and placing a person in a scene.
Specify the transformation as well as the desired result. For composition,
assign each reference a role such as person, product, room or palette.
For edits, name both the element to change and the elements to preserve.
For designed graphics, supply literal copy, hierarchy and readable placement.

Original examples, untested:

- Generation: `A landscape travel poster of a quiet mountain observatory
  at blue hour. A copper dome fills the lower right; stars occupy the upper
  half. The title “AFTER THE SUN” sits at top left in large cream serif type.
  Restrained screen-print texture, navy and rust palette.`
- Composition: `Use the ceramic teapot in image 1 as the product, the room
  in image 2 as the setting, and image 3 only for its muted color palette.
  Place the teapot on the near edge of the table, with soft window light.`
- Edit: `Change only the teapot glaze to pale celadon. Preserve its shape,
  handle, spout, table, framing and window reflections.`

Agent recommendation: if the references blend into a new object, simplify
the set and repeat which reference owns product shape. If an edit changes
other areas, return to the approved base and narrow the preservation
instruction. Fal.ai describes precise preservation, but inspect the output;
do not promise pixel-identical results from a prompt.

## Output and provider differences

Muse chooses its output resolution. Fal.ai's `aspect_ratio` and Pika's
`size` describe shape, not a pixel-resolution request; larger numbers with
the same ratio do not buy extra detail. WaveSpeed exposes aspect presets.
The model chooser therefore leaves detail overrides empty on all three.
Use the selected live schema for image count, shape and format.

## Codex panel

The edit routes fit the region-free
[image edit panel](../../image-edit-panels.md) with an optional style reference.

```json
{
  "purpose": "image-edit",
  "routes": [
    { "provider": "fal-ai", "model": "meta/muse-image/edit", "regionModes": null, "styleReference": true, "controlPointers": [] },
    { "provider": "pika", "model": "meta/muse-image-1.0/image-to-image", "regionModes": null, "styleReference": true, "controlPointers": [] },
    { "provider": "wavespeed-ai", "model": "meta/muse-image/edit", "regionModes": null, "styleReference": true, "controlPointers": [] }
  ]
}
```

There is no useful resolution or quality control on these routes.
Map `wholeImageInstruction` to `prompt`. Put the base first, then the optional
style reference with an explicit style-only role, then other selected
references. Place `$file` markers in `image_urls` on Fal.ai and Pika and
`images` on WaveSpeed. Omit Fal.ai and WaveSpeed `aspect_ratio`; use Pika
`size: "auto"` to let the model choose the shape from the brief and base.
This is not a promise of exact dimension preservation. Follow the
[Fal.ai](../../../../fal-ai-media-provider/references/adapters/reference-inputs.md),
[Pika](../../../../pika-media-provider/references/adapters/reference-inputs.md)
and [WaveSpeed](../../../../wavespeed-media-provider/references/adapters/reference-inputs.md)
reference adapters for placement and mention syntax.

## Sources

Researched 2026-10-28. [Meta's guide] supplies the conversational model and
[Fal.ai's worked examples] supply practical edit and reference advice.
Original examples above are agent recommendations, not measured results.

Route references: [Fal.ai generation](https://fal.ai/models/meta/muse-image/text-to-image/api)
and [edit](https://fal.ai/models/meta/muse-image/edit/api);
[Pika catalog](https://api.dev.pika.art/catalog/apis), exact
`meta/muse-image-1.0/text-to-image` and `meta/muse-image-1.0/image-to-image`;
[WaveSpeed generation](https://wavespeed.ai/models/meta/muse-image/text-to-image)
and [edit](https://wavespeed.ai/models/meta/muse-image/edit).
Live schemas were inspected. No published Replicate route was found in the
Meta catalog or targeted searches; do not invent an endpoint there.

[Meta's guide]: https://dev.meta.ai/docs/image-generation
[Fal.ai's worked examples]: https://fal.ai/muse-image
