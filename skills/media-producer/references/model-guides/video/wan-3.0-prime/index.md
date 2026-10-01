# Wan 3.0 Prime Video Prompt Guide

Use this when the selected video model family is Wan 3.0 Prime.

Use the linked advice relevant to the request. Input roles and the selected
route's live schema determine which details apply. Shared advice covers
[prompt input visibility](../../shared/prompt-input-visibility.md) and
[video quality](../../shared/video-quality-checklist.md).

## Operation Guides

| Operation | Guide |
| --- | --- |
| Text-to-video | [text-to-video.md](text-to-video.md) |
| Image-to-video and first/last-frame video | [image-to-video.md](image-to-video.md) |
| Reference-to-video | [reference-to-video.md](reference-to-video.md) |

## Universal Prompt Rules

- Choose a prompt shape to fit the shot: a short phrase can explore a simple
  action; a natural-language brief suits one coherent shot; labeled sections or
  time ranges help when sequence, sound, or timing has to be explicit. Length
  alone does not make a prompt more controllable.
- Use matchable detail when it affects what appears: one camera behavior, a
  light source and direction, a specific material or color, and a physical
  action with a clear end state.
- Give each beat one camera setup. Add a cut only for a change of viewpoint or
  scene; use one continuous camera move when the place and action continue.
- Include a deliberate sound line when native audio is enabled. Name physical
  sources and connect sounds to visible actions. Include exact dialogue only
  when supplied; describe its delivery without inventing words.
- Prefer observable action and sound over a stack of mood adjectives. For a
  prompt that feels vague, add the missing event or camera choice before adding
  more style language.
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

## Evidence and scope

The prompt-shape suggestions and worked examples below draw on Fal's Wan 3
tutorial, a provider-authored guide with examples for the standard and Prime
routes. Treat the advice as practical guidance, not a controlled comparison or
an Alibaba-authored claim about model internals. Its tier comparison describes
Prime as faster and more expensive with the same exposed parameters; this is not
evidence of higher output quality. The prompt recommendations here are original
agent guidance and have not been generation-tested.

- [Fal: How to Use Wan 3](https://fal.ai/learn/tools/how-to-use-wan-3)
- `https://fal.ai/models/alibaba/wan-3.0-prime/text-to-video/api`
- `https://fal.ai/models/alibaba/wan-3.0-prime/image-to-video/api`
- `https://fal.ai/models/alibaba/wan-3.0-prime/reference-to-video/api`

Fal tutorial and listed route pages reviewed 2026-09-30; live schemas must be
checked again for each request.
