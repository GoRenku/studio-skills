# Veo 3.1 Prompt Guide

Use the selected Veo 3.1 provider route and tier. Standard, Fast, and Lite do
not expose identical modes on every provider; the route and its live schema
decide the available inputs.

- Describe the subject, setting, visible action, camera movement, composition,
  light, and intended sound as concrete events. Keep the action within the
  selected clip duration.
- For an opening image, treat it as the initial state. Prompt the motion and
  camera development while preserving visual details that matter.
- For first/last frames, direct one plausible transition between both images.
  Keep identity and scene geography consistent.
- For reference images, say what each contributes to identity or appearance.
  Follow provider-specific reference ordering and count from the live schema.
- For video extension, direct what happens next while maintaining the source
  clip's motion, lighting, characters, and sound.

Pika's Standard and Fast text routes accept reference images, while its Lite
route is image-to-video only in the published catalog. WaveSpeed exposes
dedicated Standard and Fast reference and extension routes. Replicate's
Standard and Fast endpoints accept reference images; its Lite endpoint accepts
an optional first image and last frame. Fal's Lite routes cover text and image.

Sources reviewed 2026-09-24:

- https://fal.ai/models/fal-ai/veo3.1
- https://dev.pika.art/llms/google/veo-3.1/text-to-video
- https://wavespeed.ai/veo-3-1-api
- https://replicate.com/google/veo-3.1
- https://replicate.com/google/veo-3.1-lite
