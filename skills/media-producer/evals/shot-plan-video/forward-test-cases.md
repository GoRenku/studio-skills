# Shot Plan Video Forward Test Cases

- Resolve the exact Shot Plan and carry only weak `authoredFrom` context.
- Route selected Fal.ai text, image, or reference mode to the matching indexed
  provider guide.
- Put exact local files at their native provider fields and preserve order.
- Preview and confirmation remain conversational; execution is one provider
  request and recovery never changes creative input.
- Attach the accepted video as an independent Project Asset with exact
  generation provenance; it is not owned by and does not freeze the Shot Plan.

## video-first-frame — First frame

Use `shot-plan.video-first-frame`, store the accepted image as the exact Plan's
First Frame candidate, and use that candidate only in a matching native input
field when authoring video.

## video-first-last — First-and-last frames

Use `shot-plan.video-first-frame` and `shot-plan.video-last-frame`, then author
the selected provider's image-to-video request. Preserve frame order and do not
invent reference mention tokens for implicit endpoint inputs.

## video-storyboard-reference — Continuous waypoint Storyboard

Use `shot-plan.video-storyboard` for a continuous waypoint canvas and
`shot-plan.video-reference` for generic visual evidence. Keep these distinct
from an edited Scene Storyboard image and store each beside the exact Plan.

## video-reference-dialogue — Reference video with dialogue and native audio

Use `shot-plan.video-generation` with the exact Storyboard, continuity images,
and approved Dialogue Takes. Seedance uses retained `@ImageN` guidance;
MiniMax H3 uses retained spaced `Image N` / `Audio N` guidance. Native audio is
authored only when the chosen model guide supports it.
