# Comfy Router Reference Input Adapter

Use the exact live schema for native fields and media cardinality. Comfy Router
passes each model's own request shape through, so reference fields differ by
model family rather than by operation.

- Put source, reference, opening, and ending markers only in exact live-schema
  fields. Examples as of 2026-11-03: GPT Image puts edit sources in `image`;
  Seedance and MiniMax Hailuo 3 add `content[]` items with an `image_url`,
  `video_url`, or `audio_url` and a `role` such as `first_frame`,
  `last_frame`, or `reference_image`; Nano Banana puts a marker at
  `contents[].parts[].inlineData.data` with the file's MIME type in the sibling
  `inlineData.mimeType`; Veo uses `instances[].image.bytesBase64Encoded` with
  its sibling `mimeType`; FLUX Kontext uses `input_image` through
  `input_image_4`; Seedream uses `image`.
- Renku sends each marked file inline when it executes: bare base64 where the
  field's schema declares base64 content, otherwise a data URI. Do not encode
  files or write sibling MIME fields from guesses; copy the marker's `mimeType`.
- Comfy Router caps the whole request body, and inline media counts against it.
  Prefer few, reasonably sized references; a very large video reference can be
  refused for size.
- Preserve final request order and meaningful review labels.
- Do not invent `@ReferenceN`, `@ImageN`, `Image N`, or another mention merely
  because the canonical model guide contains neutral placeholders.
- If Comfy Router later documents an exact mention contract, update this
  adapter rather than copying model prompt guidance into the provider skill.
