# Seedance Route Matrix

Use this after take context and provider preview identify the final Seedance
input mode.

## Text-Only

Load `text-only-final-video.md` when no image, video, or audio reference
controls the result.

Prompt shape:

```text
[Subject and action].
Camera: [specific camera movement and framing].
Sound: [key sound events and ambient bed, if native audio matters].
Look and continuity: [period, location, material, palette, performance].
Do not include: [critical exclusions].
```

Do not invent `@Image1` or say "selected reference."

## Image-To-Video / First Frame

Load `image-to-video-final-video.md` when a starting image anchors the shot.

The image anchors identity, layout, period, props, and starting composition.
The prompt should focus on motion, camera, audio, and what must remain stable.

## First-And-Last Frame

Load `first-last-frame-final-video.md` when both endpoints are binding.

The prompt should treat the first frame as start state and the last frame as
required destination state. It should describe the transition path, not an
unrelated new scene.

## Storyboard Reference

Load `storyboard-reference-final-video.md` when a storyboard/reference image is
attached as a reference-to-video input.

This is the highest-risk route. The prompt must inspect the image, classify the
storyboard, map every visible panel/beat in order, and write an operating manual
for Seedance.

## Generic Reference-To-Video

Load `generic-reference-final-video.md` when reference-to-video uses images,
videos, or audio, but none is a storyboard/reference image.

Every reference gets a narrow role. Compose one coherent result. Do not let
references compete as alternate first frames or alternate geographies.

## Native Audio

Load `native-audio.md` when audio matters. Seedance audio references are
conditioning, not exact editorial tracks.

## Duration Guidance

- Single shot, simple action: keep prompt compact and give one clear movement
  arc.
- Multi-shot edited sequence: use explicit `Shot 1`, `Shot 2`, `Shot 3` labels.
- Continuous multi-beat take: describe ordered waypoints in one physical camera
  path; avoid wording that makes Seedance blend panels into a collage.
- Dense action, narration, or many beats need enough duration for the requested
  temporal structure. If selected duration is too short, warn before estimate.
