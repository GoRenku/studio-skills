# Wan 3.0 Prime Video Prompt Guide

Use this when the selected video model family is Wan 3.0 Prime.

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

## Universal Prompt Rules

- Use concrete, matchable detail: a named camera behavior, directed light,
  specific color or material, and movement with pace.
- Give each beat one camera setup. Use timecoded beats when several events must
  land within a longer generation.
- Include a deliberate sound line when native audio is enabled. Write spoken
  lines exactly in quotes and name their delivery only when dialogue is known.
- Prefer physical actions and sound events over vague adjectives such as
  "cinematic" or "epic".
- Keep non-negotiable details explicit because prompt expansion may rewrite the
  authored prompt. Review the returned `actual_prompt` as receipt evidence when
  the provider returns it; never replace the authored prompt silently.
- Apply the Project's prompt-expansion preference only through the selected
  route's live schema. With expansion on, compare returned actual-prompt
  evidence against identity, camera, timing, sound, and exclusions. With it
  off, preserve the same explicit constraints; do not shorten the prompt merely
  because rewriting is disabled.
- Use only exact reference mentions from the selected Fal adapter and final
  modality-local request order.

## Route Constraints

Read the selected route's live schema for duration, resolution, aspect ratio,
audio, prompt expansion, thinking, required frames, reference limits, and
document or public-page requirements. Do not copy those changing provider facts
into a request from this guide.

## Sources and Confidence

Confidence: high. Fal publishes a detailed Wan 3 workflow and prompt guide plus
the exact Prime route schemas.

- `https://fal.ai/learn/tools/how-to-use-wan-3`
- `https://fal.ai/models/alibaba/wan-3.0-prime/text-to-video/api`
- `https://fal.ai/models/alibaba/wan-3.0-prime/image-to-video/api`
- `https://fal.ai/models/alibaba/wan-3.0-prime/reference-to-video/api`

Sources and live schemas reviewed: 2026-08-29.
