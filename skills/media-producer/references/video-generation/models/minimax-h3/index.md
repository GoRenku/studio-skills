# MiniMax H3 Video Generation

Use this when the selected `shot-plan.video-generation` family is MiniMax H3.

Read:

- `../../provider-visible-prompting.md`;
- `../../prompt-quality-checklist.md`;
- exactly one route guide matching the selected endpoint.

## Exact fal.ai routes

| Route | Media fields | Route guide |
| --- | --- | --- |
| `minimax/h3/text-to-video` | none | `text-only.md` |
| `minimax/h3/image-to-video` | required `image_url`; optional `end_image_url` | `image-to-video.md` |
| `minimax/h3/reference-to-video` | `reference_image_urls`, `reference_video_urls`, `reference_audio_urls` | `reference.md` |

All three routes currently generate only 2K video and accept a 5–15 second
duration. Text and reference routes expose aspect ratio; image-to-video follows
the opening image's aspect ratio.

## Universal H3 prompt rules

- Describe one coherent result with concrete subject action, camera behavior,
  temporal progression, environment motion, lighting, and sound intent.
- Match action density and shot count to the selected 5–15 second duration.
- Treat supplied first and last frames as binding endpoints, not loose style
  references.
- On reference-to-video, use `Image 1`, `Image 2`, `Video 1`, and `Audio 1`
  exactly. H3 does not document Seedance-style `@Image1` tokens.
- Derive every number from modality-local array order in the generated
  `providerPayload`, never from filenames, selection order, or memory.
- Give every supplied reference one narrow role and keep competing references
  from redefining the same subject, location, motion, or sound.
- Put critical visible exclusions in the main prompt because these H3 routes do
  not expose a separate negative-prompt field.

## Current provider limits

- Reference images: at most 9.
- Reference videos: at most 3, each 2–15 seconds, combined duration at most 15
  seconds.
- Reference audio clips: at most 3, each 2–15 seconds, combined duration at
  most 15 seconds.
- References across images, videos, and audio: at most 12 files total.
- Audio cannot be the only reference modality; include at least one image or
  video when audio is present.

The 12-file combined ceiling does not permit 12 images: the current image-array
limit is 9.

## Sources and confidence

Confidence: medium. The endpoint contracts and reference syntax are directly
grounded in current fal.ai OpenAPI schemas. General prompt structure follows
MiniMax's first-party filmmaking guidance, which recommends explicit camera,
lighting, movement, and structured direction; MiniMax has not published a deep
H3-specific prompt guide yet.

- `https://fal.ai/models/minimax/h3/text-to-video/api`
- `https://fal.ai/models/minimax/h3/image-to-video/api`
- `https://fal.ai/models/minimax/h3/reference-to-video/api`
- `https://www.minimax.io/news/a-new-era-of-ai-filmmaking`

Sources reviewed: 2026-08-01.
