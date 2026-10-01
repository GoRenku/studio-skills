# MiniMax H3 Video Prompt Guide

Use this when the selected `shot-plan.video-generation` family is MiniMax H3.
The model's official writing guides use an audiovisual timeline, not a keyword
list. Choose the operation first, then use the matching guide below. These
formats are prompt-writing guidance; the selected route's live schema and
provider adapter still determine request fields and reference mentions.

Use shared [prompt input visibility](../../shared/prompt-input-visibility.md)
and [video quality](../../shared/video-quality-checklist.md) guidance when it
applies.

## Operation Guides

| Operation | Guide |
| --- | --- |
| Text-to-video | [text-to-video.md](text-to-video.md) |
| Image-to-video and first/last-frame video | [image-to-video.md](image-to-video.md) |
| Reference-to-video | [reference-to-video.md](reference-to-video.md) |

## Write the timeline around observable changes

MiniMax's base prompt guide separates the playback description, ambient and
physical sound, and audience-only music. That separation helps keep spoken
content in the scene description, scene sounds in the soundscape, and score in
the music section of the prompt. These are prompt-writing sections, not native
request fields; the selected route's live schema defines the request. Describe
each beat as a visible change: who moves, what they touch, where the camera
moves, and what state the shot reaches. Add a cut only when the viewpoint or
scene should change; a small reframing can often be described as camera motion.

For a reference workflow, distinguish a reference that contributes an
appearance or motion trait from an image that anchors a particular shot. The
official full-reference guide makes this distinction; use the actual route's
adapter syntax for any mentions and never assume every H3 endpoint accepts all
reference types.

## Route Constraints

Read the selected provider's live schema for duration, resolution, aspect
ratio, reference counts, per-file limits, combined limits, and valid reference
combinations. Do not transfer capabilities among H3, H3 Max, and H3 Max Turbo.

The examples in the operation guides are original, untested prompt-writing
examples. MiniMax's official guides describe formats for H3 model workflows;
they do not certify identical behavior through every hosted provider route.

## Sources

MiniMax official H3 prompt guides and the currently linked route schemas were
reviewed 2026-09-30:

- [MiniMax H3 base video prompt guide](https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/docs/VIDEO_PROMPT_WRITING_GUIDE_base_en.md)
- [MiniMax H3 full-reference prompt guide](https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/docs/VIDEO_PROMPT_WRITING_GUIDE_ref_en.md)
- [Fal H3 text-to-video](https://fal.ai/models/minimax/h3/text-to-video/api)
- [Fal H3 image-to-video](https://fal.ai/models/minimax/h3/image-to-video/api)
- [Fal H3 reference-to-video](https://fal.ai/models/minimax/h3/reference-to-video/api)
