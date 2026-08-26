# Kling Video Prompt Research

This file preserves Kling provider research. Kling is not active in the
current Studio video catalog.

Keep the common provider-native request workflow, reference placement, and provider-visible
prompt rules in the shared video-generation files. Apply the guidance below
only after confirming the named field in the selected endpoint's current
provider facts.

## Endpoint And Field Rules

- Assign a first frame only to a current native field such as `start_image_url` or
  `image_url`; assign a last frame only to `end_image_url` when present.
- Kling O3 reference-to-video endpoints expose `image_urls`. Assign each exact
  reference image to that field, then use its native request array order for
  `@ImageN` numbering.
- Kling O3 video-to-video/reference endpoints expose the singular `video_url`
  source field and document it as `@Video1`. They may also expose `image_urls`
  for optional `@ImageN` references.
- Historical Kling V3 guidance used `@ElementN` for element-bound image or
  video media. Video-backed elements could bind transient voice control while
  image-set elements could not.
- Historical native voice control used a transient provider `voice_id`; it did
  not create a durable Cast Voice registration. Exact generated dialogue still
  required a supported route or a lipsync/composition workflow.
- Use `negative_prompt` only for an endpoint whose current provider facts include
  it, such as Kling V3 image-to-video. Otherwise keep critical exclusions in
  the main prompt.
- Current direct Kling operations do not expose file-backed audio or element
  media fields. Do not assign Dialogue Audio to Kling, invent `@AudioN` or
  `@ElementN`, or fabricate nested provider media values. Choose another
  endpoint when exact audio/reference support is required.

Validate and inspect `generation preview show` before using any token. The
reviewed native request, not guide order or filenames, is the evidence for
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
- `https://fal.ai/models/fal-ai/kling-video/o3/standard/video-to-video/edit/llms.txt`
- `https://fal.ai/models/fal-ai/kling-video/o3/pro/video-to-video/edit/llms.txt`
- `https://fal.ai/models/fal-ai/kling-video/create-voice/llms.txt`
- `https://kling.ai/quickstart/klingai-video-3-model-user-guide`
- `https://kling.ai/quickstart/klingai-video-3-omni-model-user-guide`

Maintenance check: if a prompt contains `@Image` or `@Video`, confirm the
corresponding exact reference appears in the validated native request and the
selected provider guide exposes its field before paid execution.
