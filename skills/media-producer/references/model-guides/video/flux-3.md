# FLUX 3 Video Prompt Guide

FLUX 3 creates video and synchronized audio. Choose the documented provider
route for the inputs you have; its image-model relatives use different routes.

- Direct a scene rather than inventorying objects: say what happens, how the
  subject moves, what the camera does, and what is heard. Use concrete actions
  and audible sources. Keep a simple shot brief short.
- For multiple shots, put beats in time order and use an explicit cut cue where
  the camera angle changes. Keep the number of beats plausible for the duration.
- With an opening image, describe the movement while naming framing, identity,
  and lighting that should remain stable.
- With first and last images, describe the physical motion connecting the two.
  Multi-keyframe routes can anchor intermediate states; follow the selected
  route's schema for image count and timing fields.
- For extension, describe what happens immediately after the source video's
  final moments, including continuing camera motion, appearance, sound, and
  lighting. The source tail supplies the visual and audio context.
- Fal.ai's FAST edit route re-renders an existing clip while preserving its motion,
  timing, and framing. Give a targeted change instruction and name the visual
  facts to retain; do not use the extension prompt pattern for editing.
- Draft routes are for checking an idea before committing to full quality.
  Provider draft controls and input restrictions differ; Replicate exposes a
  `draft` field for text-only requests on its single FLUX 3 endpoint.
- Fal.ai Draft Enhance requires the `draft_cache` artifact returned by a prior
  draft run. Use that artifact for the approved draft; a preview video alone is
  not the same input. Check the live schema before preparing the request.

Fal's keyframe route uses `frame_index` at 24 fps; Pika's image route accepts a
`keyframes` array with optional `at_s` on every entry; Replicate's one route
uses the order of its `images` array. Do not copy one route's notation into
another. Read the live schema for every request.

Sources reviewed 2026-09-24:

- https://fal.ai/learn/tools/how-to-use-flux-3
- https://fal.ai/models/blackforestlabs/flux-3/edit-video/api
- https://fal.ai/models/blackforestlabs/flux-3/draft-enhance/api
- https://dev.pika.art/llms/black-forest-labs/flux-3-video/image-to-video
- https://wavespeed.ai/collections/flux-3
- https://replicate.com/black-forest-labs/flux-3/versions/3047b701b1050b47ccea249bf647208439e17e6b4aa399618a57335cac0169a7/api
