# Kling Video Provider Research

Kling is not active in the current Studio video catalog. Keep this note as
provider research, not as a route recommendation or a claim that Kling is
available through Renku.

## Separate Kling product features from hosted API routes

Kling's current VIDEO 3.0 product guide describes native sound, multi-shot
direction, and element-based character references. Those product capabilities
do not establish that a particular hosted endpoint exposes matching input
fields. Choose the route first; use its current provider documentation and live
schema to decide which source media and controls can actually be sent.

The provider-field notes below record a prior review of Fal's model endpoints.
Treat them as a dated observation about those endpoints only, not general Kling
rules:

- The reviewed Kling O3 reference-to-video endpoints used an `image_urls`
  array; the O3 video-to-video routes used a singular `video_url` source, with
  optional images on some endpoints. The reviewed guides used `@ImageN` and
  `@Video1` syntax. Reconfirm fields and ordering before relying on them.
- The reviewed Kling V3 guidance used `@ElementN` for element-bound media.
  Voice behavior described by Kling's product guide may depend on its element
  workflow and may not be exposed by a hosted API route.
- Prior Fal V3 notes described a provider `voice_id` as transient voice control,
  not a durable Studio Cast Voice registration. They also cautioned that exact
  generated dialogue depends on a route that exposes the necessary controls.
  Those API-specific findings need a fresh provider-source check before use.
- Use `negative_prompt` only where the selected endpoint documents that field.
- Do not invent audio references, nested media objects, or element fields for
  an endpoint that does not expose them. If exact dialogue audio or reference
  media is essential, select a route that documents those inputs.

The official VIDEO 3.0 guide describes controls in Kling's product. Fal's
endpoint documentation defines a separate API surface. The older Fal LLM
endpoint references below were checked on 2026-06-14; they could not be fetched
for this 2026-09-30 refresh, so their request-field details remain unverified
today. The Kling product guide was reviewed 2026-09-30. No execution or live
schema checks were performed.

## Prompt reference discipline

When a selected route does provide reference mentions, give each supplied item
one job, such as appearance or movement. Check that each mentioned item exists
in the reviewed native request and follows that endpoint's final input order.
This is a general workflow recommendation; it does not imply that a Kling route
is currently available.

Example, untested and illustrative only:

```text
[IMAGE_REFERENCE] guides the courier's coat and hairstyle. [VIDEO_REFERENCE]
guides the pace of the walk. Create one dusk scene in a station passage, ending
when the courier stops at the closed door. Describe the desired camera movement
and sound in the prompt itself.
```

Replace placeholders only with exact mentions exposed by the selected route.
Otherwise omit the reference line.

## Sources

Reviewed 2026-09-30:

- [Kling VIDEO 3.0 Model User Guide](https://kling.ai/quickstart/klingai-video-3-model-user-guide) — product capabilities and product workflow; not proof of hosted API fields
- [Fal Kling V3 standard image-to-video documentation](https://fal.ai/models/fal-ai/kling-video/v3/standard/image-to-video/llms.txt) — field details previously reviewed 2026-06-14; not fetchable during this refresh
- [Fal Kling V3 Pro image-to-video documentation](https://fal.ai/models/fal-ai/kling-video/v3/pro/image-to-video/llms.txt) — field details previously reviewed 2026-06-14; not fetchable during this refresh
- [Fal Kling O3 reference-to-video documentation](https://fal.ai/models/fal-ai/kling-video/o3/standard/reference-to-video/llms.txt) — field details previously reviewed 2026-06-14; not fetchable during this refresh
- [Fal Kling O3 Pro reference-to-video documentation](https://fal.ai/models/fal-ai/kling-video/o3/pro/reference-to-video/llms.txt) — field details previously reviewed 2026-06-14; not fetchable during this refresh
- [Fal Kling O3 standard video-to-video reference documentation](https://fal.ai/models/fal-ai/kling-video/o3/standard/video-to-video/reference/llms.txt) — field details previously reviewed 2026-06-14; not fetchable during this refresh
- [Fal Kling O3 video-to-video edit documentation](https://fal.ai/models/fal-ai/kling-video/o3/standard/video-to-video/edit/llms.txt) — field details previously reviewed 2026-06-14; not fetchable during this refresh
- [Fal Kling O3 Pro video-to-video edit documentation](https://fal.ai/models/fal-ai/kling-video/o3/pro/video-to-video/edit/llms.txt) — field details previously reviewed 2026-06-14; not fetchable during this refresh
- [Fal Kling create-voice documentation](https://fal.ai/models/fal-ai/kling-video/create-voice/llms.txt) — field details previously reviewed 2026-06-14; not fetchable during this refresh
