# Veo 3.1 Fast Prompt Guide

Use Veo 3.1 Fast for the operations exposed by the selected provider route.
These include text-to-video, opening-image video, first/last-frame video,
reference images, and extension across the bundled providers; no one provider
necessarily exposes every mode. The live schema decides the actual controls.

## Prompt Guidance

- Describe subject action, camera motion, environmental change, timing, visual
  continuity, and requested native audio as observable events.
- For text-only generation, keep one coherent scene or clearly ordered sequence
  that fits the selected duration.
- For an opening-image input, treat the supplied image as the binding initial
  state and focus the prompt on motion, camera evolution, and what must remain
  stable.
- Do not invent reference roles or prompt mentions for implicit frame inputs.
- For explicit reference images, assign each a clear identity or appearance
  role using the selected provider's input order. For extension, direct what
  happens immediately after the source clip while preserving its visual and
  audio continuity.

## First And Last Frames

A first-and-last-frame request should describe one continuous transition
between the two supplied states, name the intended action and camera evolution,
preserve identity and geography, and avoid inventing intermediate cuts or new
subjects. Reject morphing when physical movement is intended.

## Provenance

Recovered from the Veo 3.1 first/last-frame research example and Veo 3.1 Fast
route guidance retained before the model-first refactor. Provider request fields
and current constraints remain owned by adapters and the live schema.

Provider routes reviewed 2026-09-24:

- https://fal.ai/models/fal-ai/veo3.1/fast/reference-to-video/api
- https://dev.pika.art/llms/google/veo-3.1-fast/text-to-video
- https://wavespeed.ai/veo-3-1-api
- https://replicate.com/google/veo-3.1-fast
