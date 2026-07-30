# Seedance 2.0 Video Generation

Use this when the final `shot-plan.video-generation` model family is Seedance.

Read:

- `../../provider-visible-prompting.md`;
- `../../prompt-quality-checklist.md`;
- `endpoint-selection.md`;
- exactly one prompt guide matching the selected endpoint's actual media
  fields.

Load `native-audio.md` only when native Seedance audio, narration, dialogue,
ambience, or audio references matter.

## Endpoint Prompt Guides

- text-only: `text-only.md`
- image-to-video / opening frame: `first-frame.md`
- first-and-last-frame: `first-last-frame.md`
- storyboard/reference image input: `storyboard-reference.md`
- generic reference-to-video without storyboard:
  `reference.md`
- native audio: `native-audio.md`

## Universal Seedance Rules

- Describe visible action, camera behavior, temporal progression, and sound when
  sound matters.
- Use provider tokens only when those inputs are actually present.
- Assign every supplied reference a narrow provider-facing role.
- Avoid decorative tag piles.
- Avoid hidden Studio/app language.
- Put critical negatives into the main prompt because the current Seedance 2.0
  descriptors do not expose a separate negative-prompt field.
- Match selected duration to shot count and action density.
- Tie native audio timing to concrete shots, panels, or beats unless using an
  exact-sync workflow.

## Current Priority

Use only the exact Seedance endpoint returned by current context and selected by
the user or agent. Keep common workflow and provider visibility rules in the
model-neutral parent files.
