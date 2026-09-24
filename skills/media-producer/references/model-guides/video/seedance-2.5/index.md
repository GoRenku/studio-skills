# Seedance 2.5

Use the exact selected operation. Read `reference-to-video.md` for a multimodal
reference request, plus `../../shared/prompt-input-visibility.md`,
`../../shared/video-quality-checklist.md` and the provider adapter. The route's
live schema owns fields, bounds and mentions.

For text-to-video, describe the action, setting, camera and sound in the prompt.
For image-to-video, identify the opening frame and describe its motion. Add a
last frame only when the selected route exposes that field. For reference-to-video,
assign each supplied image, video or audio a distinct role; reference conditioning
does not lock an exact frame. Check the selected provider's schema for which of
these inputs can be combined.

Sources checked 2026-09-24:
[Fal text](https://fal.ai/models/bytedance/seedance-2.5/text-to-video/api),
[image](https://fal.ai/models/bytedance/seedance-2.5/image-to-video/api) and
[reference](https://fal.ai/models/bytedance/seedance-2.5/reference-to-video/api) APIs.
