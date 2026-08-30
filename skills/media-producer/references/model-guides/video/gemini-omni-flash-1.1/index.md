# Gemini Omni Flash 1.1 Video Prompt Guide

Use this when the selected video model family is Gemini Omni Flash 1.1.

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
| Video edit | `video-edit.md` |

## Universal Prompt Rules

- Describe visible action, camera behavior, physical progression, lighting, and
  desired sound in direct natural language.
- Fit one coherent action or a deliberately ordered short sequence into the
  selected duration. Do not overload a short clip with unrelated events.
- State dialogue, ambience, effects, or silence when they matter. The model
  generates native audio, but exact external audio is not an input on the
  currently exposed Gemini Omni Flash 1.1 routes.
- Treat opening, ending, reference, and source-video inputs according to their
  selected operation. Do not turn a binding frame or edit source into a loose
  style reference.
- Use only the exact reference mentions supplied by the Fal adapter. Gemini's
  reference mentions are zero-based and differ from other Fal video models.
- Put critical visible exclusions in the main prompt because these routes do
  not expose a separate negative-prompt field.

## Route Constraints

Read the selected route's live schema for duration, resolution, aspect ratio,
required source fields, and current reference limits. Provider facts can change
without changing the model's prompt craft.

## Sources and Confidence

Confidence: medium. Fal provides first-party route schemas and practical product
examples, but no deep Gemini Omni Flash 1.1 prompt guide was available when this
guide was written.

- `https://fal.ai/gemini-omni`
- `https://fal.ai/models/google/gemini-omni-flash/v1.1/text-to-video/api`
- `https://fal.ai/models/google/gemini-omni-flash/v1.1/image-to-video/api`
- `https://fal.ai/models/google/gemini-omni-flash/v1.1/reference-to-video/api`
- `https://fal.ai/models/google/gemini-omni-flash/v1.1/edit/api`

Sources and live schemas reviewed: 2026-08-29.
