# Seedance 2.0 Video Prompt Guide

Use this for the selected Seedance 2.0 route. For 2.5, read
[its guide](../seedance-2.5/index.md); prompting behavior is not identical.

Use the linked advice relevant to the request. Input roles and the selected
route's live schema determine which details apply. Shared advice covers
[prompt input visibility](../../shared/prompt-input-visibility.md) and
[video quality](../../shared/video-quality-checklist.md).

## Endpoint Prompt Guides

[Input roles and duration](operation-selection.md) explain how the advice applies.

- text-to-video: [text-to-video.md](text-to-video.md)
- image-to-video / opening frame: [image-to-video.md](image-to-video.md)
- first-and-last-frame: [first-last-frame-to-video.md](first-last-frame-to-video.md)
- storyboard/reference image input: [storyboard-reference-to-video.md](storyboard-reference-to-video.md)
- generic reference-to-video without storyboard:
  [reference-to-video.md](reference-to-video.md)
- native audio: [native-audio.md](native-audio.md)

## Model-specific construction

BytePlus's [Seedance 2.0 series prompt guide](https://docs.byteplus.com/en/docs/modelark/seedance-2-0-prompt-guide)
recommends stable subject labels tied to visible traits, concrete body movement,
and ordered shot sections for complex sequences. Describe emotion through
observable performance, such as a held breath or tightened grip. Start with one
camera movement per shot, rather than stacking incompatible moves.

The guide warns that precise segment timing is unstable in 2.0 and recommends
letting ordered shots establish pacing. Preserve director-authored times as
intent, but do not claim exact execution or transplant 2.5's timestamp behavior.
Place dialogue beside its action; keep ambience and music roles distinct.

Renku recommendation: use a compact paragraph for a simple action and add
structure only when identities, cuts, dependent actions, or sound require it.
The operation guides below include original examples, not tested recipes.

## Renku authoring rules

- Describe visible action, camera behavior, temporal progression, and sound when
  sound matters.
- Use provider tokens only when those inputs are actually present.
- Assign every supplied reference a narrow provider-facing role.
- Avoid decorative tag piles.
- Avoid hidden Studio/app language.
- Put critical exclusions in the main prompt unless the selected operation's
  current provider facts expose another deliberate place for them.
- Match selected duration to shot count and action density.
- Tie native audio timing to concrete shots, panels, or beats unless using an
  exact-sync workflow.

The provider route and live schema decide which operations and media fields are
available. They do not replace this model prompt guidance.

## Sources and scope

Prompting sources read 2026-09-30:

- [BytePlus: Dreamina Seedance 2.0 series prompt guide](https://docs.byteplus.com/en/docs/modelark/seedance-2-0-prompt-guide):
  maker guidance with generated examples, including subject mapping, ordered
  shots, performance, reference roles, and timing limitations.
- [ByteDance: Seedance 2.0 official launch](https://seed.bytedance.com/en/blog/seedance-2-0-official-launch),
  published 2026-02-12: multimodal capability demonstrations.
- [Fal: Seedance 2.0 prompting guide](https://fal.ai/learn/tools/seedance-2-0-prompting-guide):
  provider guidance; its request syntax does not establish another provider's
  fields or mention format.

The storyboard workflow is Renku guidance built around the selected inputs and
directing intent. Its panel and continuity instructions are requests to the
model, not vendor guarantees. Standard, Fast, and other tiers still require
their own selected route contract; shared craft does not establish equal fidelity.
