# Kling Video Generation Research

This file preserves Kling provider research. Kling is not active in the
current Studio video catalog.

Keep the common exact-spec workflow, reference placement, and provider-visible
prompt rules in the shared video-generation files. Apply the guidance below
only when the selected direct Kling endpoint descriptor exposes the named
field.

## Endpoint And Field Rules

- Assign a first frame only to a descriptor field such as `start_image_url` or
  `image_url`; assign a last frame only to `end_image_url` when present.
- Kling O3 reference-to-video endpoints expose `image_urls`. Assign each exact
  reference image to that field, then use its `providerPayload` array order for
  `@ImageN` numbering.
- Kling O3 video-to-video/reference endpoints expose the singular `video_url`
  source field and document it as `@Video1`. They may also expose `image_urls`
  for optional `@ImageN` references.
- Use `negative_prompt` only for an endpoint whose current descriptor includes
  it, such as Kling V3 image-to-video. Otherwise keep critical exclusions in
  the main prompt.
- Current direct Kling descriptors do not expose file-backed audio or element
  media fields. Do not assign Dialogue Audio to Kling, invent `@AudioN` or
  `@ElementN`, or fabricate nested provider media values. Choose another
  endpoint when exact audio/reference support is required.

Validate and inspect `generation preview show` before using any token. The
generated `providerPayload`, not guide order or filenames, is the evidence for
the request the provider will receive.

Example:

```text
@Video1 supplies only the source performance and camera rhythm. @Image1 supplies
only wardrobe and face continuity. Keep one coherent scene.
```

When the user needs exact generated dialogue audio synchronized to video, use a
lipsync, talking-head, or composition workflow instead.

## Maintenance Provenance

These prompt-token rules were reviewed on June 14, 2026 from:

- `https://fal.ai/models/fal-ai/kling-video/v3/standard/image-to-video/llms.txt`
- `https://fal.ai/models/fal-ai/kling-video/v3/pro/image-to-video/llms.txt`
- `https://fal.ai/models/fal-ai/kling-video/o3/standard/reference-to-video/llms.txt`
- `https://fal.ai/models/fal-ai/kling-video/o3/pro/reference-to-video/llms.txt`
- `https://fal.ai/models/fal-ai/kling-video/o3/standard/video-to-video/reference/llms.txt`
- `https://kling.ai/quickstart/klingai-video-3-model-user-guide`
- `https://kling.ai/quickstart/klingai-video-3-omni-model-user-guide`

Maintenance check: if a prompt contains `@Image` or `@Video`, confirm the
corresponding exact reference appears in the validated provider payload and the
selected endpoint descriptor exposes its assigned provider field before
estimating or running.
