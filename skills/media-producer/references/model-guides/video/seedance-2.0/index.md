# Seedance 2.0 Video Prompt Guide

Use this when the final `shot-plan.video-generation` model family is Seedance.

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

## Universal Seedance Rules

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
