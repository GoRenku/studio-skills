# Shot Plan Video Forward Test Cases

- Resolve the exact Shot Plan and carry only weak `authoredFrom` context.
- Copy the selected provider operation's `apiId` into the review document and
  generation commands, use its `modelKey` to read the canonical model guide
  once, then apply the matching provider adapter.
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
and approved Dialogue Takes. Canonical model guidance uses neutral input
placeholders. For Fal.ai, its provider adapter resolves Seedance placeholders
to `@ImageN` and MiniMax H3 placeholders to spaced `Image N` / `Audio N`
syntax. Native audio is authored only when the canonical model guide supports
it and the selected provider route exposes it.

## video-cross-provider-h3 — One model guide, several providers

Fal.ai, Pika, and WaveSpeed all expose MiniMax H3. Every route resolves to the
same `minimax-h3` key and the same canonical model guide. Only the provider
adapter and live request schema may differ. Pika must not inherit Fal.ai's
mention syntax when its own adapter does not document one.
