# MiniMax H3 Video Prompt Guide

Use this when the selected `shot-plan.video-generation` family is MiniMax H3.

Read:

- `../../shared/prompt-input-visibility.md`;
- `../../shared/video-quality-checklist.md`;
- exactly one operation guide matching the selected route.

## Operation Guides

| Operation | Guide |
| --- | --- |
| Text-to-video | `text-to-video.md` |
| Image-to-video and first/last-frame video | `image-to-video.md` |
| Reference-to-video | `reference-to-video.md` |

## Universal H3 prompt rules

- Describe one coherent result with concrete subject action, camera behavior,
  temporal progression, environment motion, lighting, and sound intent.
- Match action density and shot count to the selected duration.
- Treat supplied first and last frames as binding endpoints, not loose style
  references.
- On reference-to-video, use only exact mentions supplied by the selected
  provider adapter. Derive every ordinal from final modality-local request order,
  never from filenames, selection order, or memory.
- Give every supplied reference one narrow role and keep competing references
  from redefining the same subject, location, motion, or sound.
- Put critical visible exclusions in the main prompt unless the selected route's
  live schema exposes another deliberate place for them.

## Route Constraints

Read the selected provider's live schema for duration, resolution, aspect ratio,
reference counts, per-file limits, combined limits, and valid reference
combinations. These provider facts can change without changing how H3 should be
prompted.

## Sources and confidence

Confidence: medium. Earlier endpoint research used Fal.ai schemas. General
prompt structure follows
MiniMax's first-party filmmaking guidance, which recommends explicit camera,
lighting, movement, and structured direction; MiniMax has not published a deep
H3-specific prompt guide yet.

- `https://fal.ai/models/minimax/h3/text-to-video/api`
- `https://fal.ai/models/minimax/h3/image-to-video/api`
- `https://fal.ai/models/minimax/h3/reference-to-video/api`
- `https://fal.ai/models/minimax/h3-max/reference-to-video/api`
- `https://www.minimax.io/news/a-new-era-of-ai-filmmaking`

Sources reviewed: 2026-09-01. Provider request details were intentionally moved
to provider adapters and live schemas.
