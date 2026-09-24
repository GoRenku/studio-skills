# MiniMax H3 Max Prompt Guide

Use this for Fal.ai H3 Max and H3 Max Turbo. H3 Max is post-trained from H3;
do not assume the base H3 guide describes its response to prompts.

## Text and audio

- Give the subject one concrete action, then specify the camera, setting, light,
  and what changes during the clip. Specific nouns and verbs carry more useful
  direction than a long list of visual adjectives.
- When an action must land at a particular moment, write short timed beats whose
  ranges fit the requested duration. Repeat a character's defining appearance
  across cuts when the same person must remain recognizable.
- Describe audible sources with the visual action: footsteps on a named surface,
  room tone, impacts, weather, or speech. Put spoken lines in double quotes and
  give the delivery and speaker. State whether music or on-screen text is wanted.

## Starting and ending frames

- With an opening image, describe the movement that follows and the parts of the
  image that must stay stable, such as framing, lighting, identity, and setting.
- With both starting and ending images, direct the physical transition between
  those binding endpoints. The image-to-video route handles both modes. Turbo
  also has text-to-video and image-to-video routes, including the optional end
  image; it has no documented reference-to-video route.

## References and 3D previs

- On standard H3 Max reference-to-video, refer to supplied files by their final
  modality-local order, such as `Image 1`, `Video 1`, or `Audio 1`. Give each a
  distinct role. Follow the selected provider adapter for exact input ordering.
- On `3d-to-video`, the source Blender/previs clip defines camera, object count,
  movement, and timing. Use the optional prompt to clarify what simple proxy
  shapes represent; use optional images for appearance. Do not ask the prompt
  to contradict the source motion or camera path.

## Route details

Check the live route schema for duration, resolution, prompt expansion, reference
limits, and accepted image/video/audio combinations. Standard H3 Max exposes
prompt expansion; an expansion pass may rewrite the prompt, so a repeated seed
alone is not a guarantee of identical output. Turbo's available fields should
be checked separately rather than assumed identical.

Sources reviewed 2026-09-24:

- https://fal.ai/learn/tools/how-to-use-minimax-h3-max
- https://fal.ai/models/minimax/h3-max-turbo/text-to-video/api
- https://fal.ai/models/minimax/h3-max-turbo/image-to-video/api
- https://fal.ai/models/minimax/h3-max/3d-to-video/api
