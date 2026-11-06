# Kling 4.0 Flash on fal.ai

Researched 2026-11-04. This is Flash-specific guidance; regular Kling 4.0
features do not establish the controls of these routes. Inspect the selected
route's current schema before preparing a request.

## Route and input choices

The live fal catalog and API pages list four routes:

- [Text to video](https://fal.ai/models/kling/v4/flash/text-to-video/api):
  `kling/v4/flash/text-to-video`, with a required prompt.
- [Image to video](https://fal.ai/models/kling/v4/flash/image-to-video/api):
  `kling/v4/flash/image-to-video`, with a required `start_image_url` and optional
  prompt. This is a binding first frame; Flash does not accept an end frame.
- [Reference to video](https://fal.ai/models/kling/v4/flash/reference-to-video/api):
  `kling/v4/flash/reference-to-video`, with a prompt and optional images, videos,
  elements, or first frame.
- [Video editing](https://fal.ai/models/kling/v4/flash/video-to-video/api):
  `kling/v4/flash/video-to-video`, with a required source video and edit prompt.

Use the [Fal reference-input adapter](../../../../fal-ai-media-provider/references/adapters/reference-inputs.md)
for native placement, reference mentions, and the edit route's source-video
numbering. A reference for appearance is different from a binding first frame.

The documented output is 720p, with whole-second durations from 3 to 20 seconds.
Reference and edit routes support up to 10 reference images and 7 elements,
including at most 3 video elements. Reference video and element video durations
share a 20-second total; editing includes the source in that total. Flash elements
do not accept voices. Do not copy regular Kling 4.0 keyframe, voice-id,
`multi_prompt`, or audio-toggle fields into Flash requests: use the live schema.

Also follow shared [reference inputs](../shared/reference-inputs.md) and
[video review](../shared/video-quality-checklist.md) guidance.

## Prompt craft

Fal's [Kling 4 prompting guide](https://fal.ai/learn/devs/kling-4-prompting-guide)
includes Flash reference examples as well as family-level advice. Its Flash
examples describe an ordered progression, camera coverage, and each subject's
performance. Its practical recommendations assign each reference a specific
job and distinguish subject movement from camera movement. These are published
examples and author recommendations, not guarantees of consistent output.

For text-to-video, begin with subject, place, and a visible event. Add the
camera's start, movement, and ending view. For an opening image, spend the prompt
on what happens after that frame and retain only the appearance details that
need protection. Use prose for an intended sequence; the current Flash routes
do not expose the regular model's structured multi-shot field.

Original, untested opening-image example:

```text
One continuous six-second medium shot. The courier lowers the parcel onto
the counter, releases it, and steps back. The clerk reaches for it after the
courier's hands withdraw. The camera stays locked. Keep the opening frame's
raincoat, parcel shape, and cool window light. Sound: cardboard on wood,
coat fabric, rain outside. No music.
```

Agent recommendation: a visible handoff and clear action order make this easier
to review than several simultaneous actions and camera moves.

Original, untested reference example:

```text
@Image1 defines the courier's face and coat. @Image2 defines the arcade.
@Video1 supplies only the walking pace and following camera movement.
The courier crosses the arcade, slows at the shuttered shop, then looks back.
Preserve the courier's appearance through the turn. One continuous shot.
Sound: footsteps on wet stone and distant rain.
```

For editing, put one requested change first and explicitly preserve timing,
camera motion, performance, and unaffected objects. For example, an original,
untested instruction: "In @Video1, replace the shop's blue awning with the
striped awning in @Image1. Preserve the courier, parcel handoff, camera path,
and action timing." This is an agent recommendation based on fal's narrow-edit
guidance; it has not been executed here.

If a take cuts unexpectedly, remove conflicting angle changes and request one
continuous shot. If the motion reference changes the costume, restrict it to
movement and identify the appearance reference separately. These are suggested
rewrites, not measured Flash defects. Review sound and any intended lettering
alongside the movement; do not assume exact dialogue playback or voice binding.

## Availability and verification

The live fal catalog and four API pages were read on 2026-11-04. The text route's
schema was also retrieved through `renku generation schema show`. No generation
was submitted, so discovery and schema retrieval do not prove account access,
execution success, or output quality.

[WaveSpeed's own availability article](https://wavespeed.ai/blog/video-model-access/kling-4-0-flash/)
explicitly excludes Flash, and its current catalog lists regular Kling 4.0.
[Pika's catalog](https://dev.pika.art/models) and
[Replicate's publisher catalog](https://replicate.com/kwaivgi) did not list Flash
when checked. This research supports adding fal routes only; it does not assert
that no other service can ever offer Flash.
