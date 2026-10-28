# Nano Banana 2.1 Prompt Guide

Nano Banana 2.1 is separate from [Nano Banana 2.0](nano-banana.md) and Pro.
Use the shared guide's generation, typography and reference-role practices;
the [Google prompt guide] is family guidance, not a guarantee of identical
provider inputs.

## Generation and editing

Fal.ai's [comparison tutorial] demonstrates both generation and editing with
2.1, including a storyboard. It reports improvements alongside remaining
errors: inspect exact text, product details and continuity rather than
treating a successful request as a correct image. The tutorial also documents
1K–4K output and a medium thinking setting on Fal.ai. These are route controls,
not words to add to a prompt; consult the selected schema.

For reference composition, put the main subject first and identify other
references by position. [WaveSpeed's edit guidance] recommends one to three
references for simple edits. This is provider advice, not a hard input limit.
Pika, for example, currently accepts up to 16 source images, while the
Fal.ai, Replicate and WaveSpeed schemas describe up to 14.

Original prompts, untested:

- Generation: `A wide establishing photograph of a disused seaside ticket
  hall at dawn. A single clerk stands behind the central wooden counter.
  Cool window light, faded blue paint, straight verticals, restrained film
  grain. The sign above the counter reads “FERRY TICKETS” in cream capitals.`
- Reference composition: `Place the clerk from image 1 behind the counter
  in image 2. Use image 2 for the room and framing; preserve the clerk's face
  and coat. Early morning window light, with matching shadows.`
- Focused edit: `Change only the sign to “LAST DEPARTURE”. Keep its position,
  cream capital lettering, the clerk, counter, camera angle and light.`

Agent recommendation: if the clerk's clothing drifts, use fewer references
and restate which image owns identity and clothing. If lettering misses,
repeat only the exact replacement copy and its location. Review the output
before carrying it into the next edit.

## Codex panel

All four edit routes fit the region-free
[image edit panel](../../image-edit-panels.md), with an optional style reference.

```json
{
  "purpose": "image-edit",
  "routes": [
    { "provider": "fal-ai", "model": "google/nano-banana-2.1/edit", "regionModes": null, "styleReference": true, "controlPointers": ["/resolution"] },
    { "provider": "pika", "model": "google/gemini-nano-banana-2.1/image-to-image", "regionModes": null, "styleReference": true, "controlPointers": ["/resolution"] },
    { "provider": "replicate", "model": "google/nano-banana-2.1", "regionModes": null, "styleReference": true, "controlPointers": ["/resolution"] },
    { "provider": "wavespeed-ai", "model": "google/nano-banana-2.1/edit", "regionModes": null, "styleReference": true, "controlPointers": ["/resolution"] }
  ]
}
```

Resolution is the iteration control, in an "Output" group; use its live
schema's default and options.
Map `wholeImageInstruction` to `prompt`, naming changes and preservation.
Put the base first, the optional style reference second with a style-only
role, then other deliberately selected references. Use `image_urls` on Fal.ai
and Pika, `image_input` on Replicate, and `images` on WaveSpeed, with
Media Producer's `$file` markers. Set resolution from draft `values`.
For edits, use Fal.ai `aspect_ratio: "auto"`, Pika `aspect_ratio: "auto"`,
Replicate `aspect_ratio: "match_input_image"`, and omit WaveSpeed's
`aspect_ratio` so each follows its base. Pika defaults to square unless
overridden. Provider placement and mention rules remain in
[Fal.ai reference inputs](../../../../fal-ai-media-provider/references/adapters/reference-inputs.md),
[Pika reference inputs](../../../../pika-media-provider/references/adapters/reference-inputs.md),
[Replicate reference inputs](../../../../replicate-media-provider/references/adapters/reference-inputs.md),
and [WaveSpeed reference inputs](../../../../wavespeed-media-provider/references/adapters/reference-inputs.md).

## Sources

Prompting research and route schemas checked 2026-10-28. Source examples
were read; the original examples above were not generated.

- Craft: [Google prompt guide], [Fal.ai comparison tutorial],
  [WaveSpeed edit guidance].
- Routes: [Fal.ai generation](https://fal.ai/models/google/nano-banana-2.1/api)
  and [edit](https://fal.ai/models/google/nano-banana-2.1/edit/api);
  [Pika catalog](https://api.dev.pika.art/catalog/apis), exact
  `google/gemini-nano-banana-2.1/text-to-image` and
  `google/gemini-nano-banana-2.1/image-to-image`;
  [Replicate](https://replicate.com/google/nano-banana-2.1);
  [WaveSpeed generation](https://wavespeed.ai/models/google/nano-banana-2.1/text-to-image)
  and [edit](https://wavespeed.ai/models/google/nano-banana-2.1/edit).

[Google prompt guide]: https://deepmind.google/models/gemini-image/prompt-guide/
[comparison tutorial]: https://fal.ai/learn/devs/nano-banana-2-1-vs-nano-banana-2
[Fal.ai comparison tutorial]: https://fal.ai/learn/devs/nano-banana-2-1-vs-nano-banana-2
[WaveSpeed's edit guidance]: https://wavespeed.ai/docs/docs-api/google/google-nano-banana-2.1-edit
[WaveSpeed edit guidance]: https://wavespeed.ai/docs/docs-api/google/google-nano-banana-2.1-edit
