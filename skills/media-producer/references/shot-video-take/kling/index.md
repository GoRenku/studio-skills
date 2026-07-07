# Kling Shot Video Take

Use this when the final `shot.video-take` model family is Kling.

This file preserves Kling-specific token and transient voice-control guidance.
Keep common take workflow, dependency handling, and provider-visible prompt
rules in the parent `shot-video-take/` files.

## Token Rules

Core maps logical Renku inputs to provider payload fields. Prompt drafts must
match that logical mapping.

- Determine actual token order from `providerPreview`, especially prepared
  provider inputs or payload fields.
- Do not infer numbering from filenames, memory, UI card order, or old run
  payloads.
- Kling V3 image/video element prompts reference element-bound media with
  `@ElementN`.
- Kling native voice control uses a transient provider `voice_id` created by
  Core from selected scene dialogue audio during `shot.video-take` estimate/run.
  Write the words to be spoken in the final prompt; select the dialogue audio as
  a logical input instead of creating or storing a durable Cast Voice Provider
  Registration.
- Kling O3 top-level image references use `@ImageN`.
- Kling O3 video-to-video source-video routes use `@Video1` for the source
  video, then optional `@ImageN` and `@ElementN` only when those logical inputs
  exist.
- Video-backed Kling elements may bind selected scene dialogue audio for
  transient voice control. Image-set elements may not use voice control.

Example:

```text
@Element1 enters from frame left and says softly, "We keep moving." Keep the
voice calm and close-mic, matching @Audio1 as the dialogue audio reference.
```

When the user needs exact generated dialogue audio synchronized to video, route
the work to a lipsync, talking-head, or composition workflow instead of relying
on transient Kling voice control.

## Maintenance Provenance

These prompt-token and audio/voice rules were reviewed on June 14, 2026 from:

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

Maintenance check: if a prompt contains `@Audio`, `@Image`, `@Element`, or
`@Video`, confirm the corresponding Renku input exists in preflight and that the
active route supports that provider field before estimating or running.
