# Z-Image Turbo Prompt Guide

Use Z-Image Turbo for text-to-image work. Fal.ai and WaveSpeed also publish
image-to-image routes; check the selected route's live schema for its required
source image and any edit controls. Do not transfer fields or behavior from one
provider route to another.

## Prompting Z-Image Turbo

The Tongyi-MAI model team says Turbo works best with long, detailed prompts and
does not use a negative-prompt path in its few-step inference setup. Keep those
facts scoped to Z-Image Turbo; do not assume they apply to other Z-Image models
or every third-party wrapper. See the team's [Z-Image Turbo prompting discussion]
and the [Z-Image research paper].

- Write a coherent positive description of the desired image: subject, action,
  setting, composition, light, color, materials, and finish where useful.
- Include framing and aspect-ratio-sensitive composition when it affects the
  picture. Keep the raw aspect-ratio value in provider-native configuration if
  the selected route exposes it.
- Put required visible text and placement in the prompt, then check the output.
- Do not rely on a negative-prompt field to suppress an unwanted element on
  Turbo. Describe the desired scene directly—for example, request `an empty
  station platform` rather than relying on `no people`. This positive phrasing
  is Renku advice based on the team's documented absence of negative prompting.
- If a longer prompt misses an important element, make the subject and its
  spatial relationship more explicit before adding more decorative detail.

Illustrative prompts, not generated or tested:

- Simple: `A red enamel kettle on a small stove in a cabin kitchen, morning
  sunlight across the wooden counter, intimate still-life photograph.`
- More controlled: `A red enamel kettle sits in the left third of a narrow
  wooden counter in a quiet cabin kitchen. Its cream handle faces the camera
  and stays distinct against a pale blue tile wall; a folded linen towel rests
  to its right. Steam curls above the spout into a narrow shaft of morning
  light entering from a small window on the right, casting a soft diagonal
  shadow across the counter. Use a close, eye-level still-life composition
  with natural color, visible enamel and wood grain, and an otherwise clear
  counter.`

On an image-to-image route, name the requested change and the source features
that should remain. On a text-only route, do not imply that a source image is
present. If the output contains something unwanted, rewrite the positive scene
description to make the intended composition clearer; a negative-prompt field
is not a supported recovery strategy for Turbo.

Reviewed 2026-09-30 against Tongyi-MAI's [Z-Image Turbo prompting discussion],
the [Z-Image research paper], and current provider route pages. The prompting
recommendation and no-negative-prompt note come from the model team; examples
and rewrite advice are Renku recommendations and have not been generated.
Provider parameters remain owned by the live schema.

[Z-Image Turbo prompting discussion]: https://huggingface.co/Tongyi-MAI/Z-Image-Turbo/discussions/8
[Z-Image research paper]: https://arxiv.org/abs/2511.22699
