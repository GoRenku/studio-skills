# FLUX 3 Image Prompt Guide

Use FLUX 3 Image for text-to-image creation and for editing an exact source
image, including region-level edits. Black Forest Labs designed it to take a
layout of bounding boxes inside the prompt, so it can place, replace, recolor,
move, or remove marked elements while leaving the rest of the image close to
the source. The selected provider route and its live schema decide the native
fields, image order, and limits; the provider adapter owns how images are
placed. This guide owns only the model-facing prompt.

## Generation

- Lead with the medium or style, then the subjects and where they sit, then
  light, colour, and background. A workable order is subject, location, style,
  camera, lighting, colours, then extra elements.
- Describe only what should be visible. Quality words such as "beautiful" or
  "masterpiece" add nothing.
- Say positions in words ("left third", "in the foreground") even when you
  also give boxes.
- FLUX 3 has no negative prompt. Describe what should be there: "an empty
  promenade", not "no crowds".
- For readable text, quote the exact words, say where they go, and describe
  case, colour, and weight. Give each line of text its own box when position
  matters.
- With no reference images, set the aspect ratio explicitly; `auto` gives 1:1.

## Editing

- The edit base is image 1. Name the target precisely enough that only one
  thing matches, say what it becomes, then list what must stay. For example:
  "Keep the rest of the image completely unchanged, preserving his face, his
  beard and the embroidered robes."
- Use hex codes when a colour must be exact.
- When refining, change one thing per request and chain edits from the result.
- Give every reference a role by its image number: "the helmet in image 2",
  "in the style of image 3, keeping the composition of image 1". Use the same
  words for an image every time.
- Never use project-internal words in the prompt. Words such as "the selected
  image", "the pick", "Take 3", "the Props section", or Renku ids mean nothing
  to the model. Resolve them to real images in the request first, then describe
  each by what it shows and its image number.

## Bounding boxes

Boxes live inside the prompt. Write the instruction with inline `<id>` tags,
then one space, then a single JSON array with one row per tag. There is no
separate box field.

- **Ids:** lowercase with a number suffix, such as `crown_1` or `region_2`.
  Every tag in the text needs a row with the same `id`.
- **Coordinates:** `[top, left, bottom, right]` as integers on a 0–1000 grid,
  origin top-left, each axis scaled to the image. Vertical comes first.
  `[0, 0, 500, 500]` is the top-left quarter.
- **References in rows:** `ref_image_0` is image 1 (the edit base),
  `ref_image_1` is image 2, and so on.

Text-to-image rows are `{"id", "bbox", "desc"}`. Edit rows are
`{"id", "from", "src_bbox", "tgt_bbox", "desc"}`, where `desc` says how the
element should look after the edit:

| Purpose | `from` | `src_bbox` | `tgt_bbox` |
| --- | --- | --- | --- |
| Keep an element exactly in place (anchor) | `"ref_image_0"` | its box | the same box |
| Add, replace or recolor in an area | `null` | `null` | the area |
| Remove an element and fill the space | `"ref_image_0"` | its box | `null` |
| Move or resize an element | `"ref_image_0"` | its box | the new box |
| Bring an element from another image | `"ref_image_N"` | its box in that image | where it goes |

Also say every addition and removal in the instruction text, not only in the
rows. Add anchor rows for nearby elements that must not move.

Example edit, verified on Fal.ai on 2026-10-11 with the source portrait as
image 1 and a helmet prop photo as image 2:

```text
In <ref_image_0>, replace the jeweled crown <crown_1> with the conical steel siege helmet from image 2, with its engraved brass band and mail aventail, sitting at the same angle on his head. Remove the painted icon of a robed saint on the left wall <icon_1> and continue the plain weathered stone wall in its place. Keep the rest of the image completely unchanged, preserving his face and expression <face_1>, his beard, hair and embroidered robes, the lighting and the background. [{"id": "crown_1", "from": null, "src_bbox": null, "tgt_bbox": [0, 262, 300, 738], "desc": "A conical dark steel siege helmet ... matching image 2."}, {"id": "icon_1", "from": "ref_image_0", "src_bbox": [36, 0, 548, 128], "tgt_bbox": null, "desc": "A faded painted icon of a robed saint on the stone wall."}, {"id": "face_1", "from": "ref_image_0", "src_bbox": [300, 330, 640, 680], "tgt_bbox": [300, 330, 640, 680], "desc": "The man's face with dark eyes, a long nose and a full dark beard, unchanged."}]
```

The icon was removed cleanly and the background, robes and lighting held. The
helmet arrived with its mail and nose guard reaching outside its box, over the
sides of the face. Plan for that:

- Boxes guide placement and scale; they are not masks. An element can extend
  past its box, and shadows, reflections and nearby light may change.
- An element brought from a reference keeps its own construction. If parts of
  it must not cover something, say so in the instruction and anchor what must
  stay visible.
- New elements in very small boxes often fail to appear. Give them room.
- The grid stretches with the output aspect ratio. Keep `auto` so the output
  matches the source the boxes were drawn on.

## Settings

- Iterate at 1K and finish at 2K or 4K. Changing resolution recomposes the
  image, so treat a resolution change as a new edit, not an upscale. 4K can take
  several minutes.
- There is no seed; repeat runs differ.
- When the route offers prompt expansion, leave it off for region edits: an
  expanded prompt can rewrite tags or the box array.

Reviewed 2026-10-11 against Black Forest Labs' [bounding boxes], [layout],
[unified prompting basics], [technical prompting], and [multi-reference
editing] guides, and Fal.ai's [edit-image] and [text-to-image] API schemas.
Current provider fields and limits remain owned by each live route schema.

[bounding boxes]: https://docs.bfl.ai/flux_3/flux3_image_bounding_boxes
[layout]: https://docs.bfl.ai/flux_3/flux3_image_layout
[unified prompting basics]: https://docs.bfl.ai/guides/prompting_unified_basics
[technical prompting]: https://docs.bfl.ai/guides/prompting_unified_technical
[multi-reference editing]: https://docs.bfl.ai/guides/prompting_editing_multi_reference
[edit-image]: https://fal.ai/models/blackforestlabs/flux-3/edit-image/api
[text-to-image]: https://fal.ai/models/blackforestlabs/flux-3/text-to-image/api
