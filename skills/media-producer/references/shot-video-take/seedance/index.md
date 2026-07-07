# Seedance Shot Video Take

Use this when the final `shot.video-take` model family is Seedance.

Read:

- `../provider-visible-prompting.md`;
- `../prompt-quality-checklist.md`;
- `route-matrix.md`;
- exactly one route file for the active input mode.

Load `native-audio.md` only when native Seedance audio, narration, dialogue,
ambience, or audio references matter.

## Route Files

- text-only: `text-only-final-video.md`
- image-to-video / first-frame: `image-to-video-final-video.md`
- first-and-last-frame: `first-last-frame-final-video.md`
- storyboard/reference image input: `storyboard-reference-final-video.md`
- generic reference-to-video without storyboard:
  `generic-reference-final-video.md`
- native audio: `native-audio.md`

## Universal Seedance Rules

- Describe visible action, camera behavior, temporal progression, and sound when
  sound matters.
- Use provider tokens only when those inputs are actually present.
- Assign every supplied reference a narrow provider-facing role.
- Avoid decorative tag piles.
- Avoid hidden Studio/app language.
- Avoid relying on a separate negative field unless the active route supports
  it; put critical negatives into the main prompt.
- Match selected duration to shot count and action density.
- Treat native audio timing as best-effort unless using an exact-sync workflow.

## Current Priority

Seedance 2.0 is the optimized default for current Shot Video Take testing. Do
not make Seedance the only conceptual model: keep common workflow and provider
visibility rules model-neutral so future model folders can be added cleanly.
