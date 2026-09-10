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
and resolved Dialogue Takes whenever the selected live route is audio-capable.
Resolve workflow-selected first, then a sole unselected Take; stop on multiple
unselected or missing Takes with the exact Scene Narrative direction. Canonical
model guidance uses neutral input placeholders. For Fal.ai, its provider
adapter resolves Seedance placeholders to `@ImageN`, MiniMax H3 placeholders to
spaced `Image N` / `Audio N` syntax, and Wan placeholders to its distinct
one-based spaced mentions. Native audio is authored only when the canonical
model guide supports it and the selected provider route exposes it. Never
invent reference audio for an audio-incapable route.

## video-cross-provider-h3 — One model guide, several providers

Fal.ai, Pika, and WaveSpeed all expose MiniMax H3. Every route resolves to the
same `minimax-h3` key and the same canonical model guide. Only the provider
adapter and live request schema may differ. Pika must not inherit Fal.ai's
mention syntax when its own adapter does not document one.

## video-fal-h3-max-reference-budget — Combined reference limit

Use Fal.ai `minimax/h3-max/reference-to-video` with deliberately selected
image, video, and audio references. The selected files fit each modality's
individual live-schema limit but initially add up to 13 files.

Expected behavior:

- resolves the exact H3 Max route to the canonical `minimax-h3`
  reference-to-video guide and Fal.ai adapter;
- derives spaced `Image N`, `Video N`, and `Audio N` mentions from final
  modality-local request order without adding `@`;
- reads the live schema and stops before Preview because the combined reference
  count exceeds 12, even though no modality exceeds its individual maximum;
- proceeds after the selection is reduced to at most 12 total references; and
- does not turn the dated count in the adapter into a substitute for the live
  schema.


## Previs reference-video cases

For attachment contract verification, use isolated local media without buying a
generation. Register two revisions; hand off the older one and attach with its
exact `--previs-revision` id. Repeat for a derivative input. The take must appear
only beside that revision, retain safe provenance, and stay Project-owned. An
unpaired take must remain unpaired. Reject a revision from another plan before
any write; do not substitute latest. `samples/shot-plan-video/video-review.json`
is the provider review envelope; supply revision context separately on import.

Use `references/shot-plan-video/blender-previs.md`. Prepare requests, not paid runs.
Use current route schema fixtures, keeping each route's native fields and types.
Source check: Fal API pages for H3 Max, Seedance 2.5, Seedance 2.0 and Wan 3.0 Prime,
2026-09-08. Record the schema used with each eval request.

| Case | Expected preparation/review |
| --- | --- |
| No explicit model, reviewed 15s previs plus sheets | H3 Max exact reference route; `reference_video_urls`, `reference_image_urls`, integer duration; spaced modality mentions. |
| Explicit Seedance 2.5, 17s master and selected speech | Native `video_urls`, `image_urls`, `audio_urls`; string duration `"17"`; adapter mentions from final order. No unnecessary retime. |
| Explicit Seedance 2.0, no dialogue | Its exact reference route, native modality arrays; no invented audio or forced dialogue. Check current duration bounds. |
| Explicit Wan 3.0 | Name the actual Prime route, use `reference_*_urls`, integer duration and its own audio/prompt expansion fields. |
| Reverse character sheet order | Renumber native mentions; proxy mapping follows exact files, not remembered ordinals. |
| More/longer selected audio than route permits | Expose conflict; do not drop, concatenate or time-stretch selected dialogue. |
| 17s master to 15s derivative with locked 3s hold | Show 15/17 map and 2.647s resulting hold; resolve direction before preparing derivative. |
| Required modality absent in a chosen route | Ask about route/input scope; native output audio is not uploaded-audio support. |
| Mara turn3 at 8s | Resolve “Then do not go to him.” in Harbor; same timing in directing params, gesture/reaction, playback cue and prompt. Conflicting speaker requires clarification. |

For all cases, keep the same exact Shot Plan/revision and selected audio identities;
inspect appearance sheets, omit a separate Lookbook image only for this workflow,
and preserve authored prompt plus safe provenance through existing Core attachment.
Review the accepted Harbor output without buying a replacement; explicitly separate
appearance/motion observations from unverified speech or voice fidelity.

Prepared native examples are in `previs-native-requests.json`. Their inert URLs are
not provider inputs to submit; request fields/types were checked against the dated
API sources. Live configuration/limits and actual media still require the normal
workflow before execution.

## Direction timeline cases

- Continuous revision: one segment, explicit Dialogue and Action points; no
  invented dialogue from gestured conversation or caption headings.
- Two segments with a mid-turn cut: preserve one Dialogue occurrence and express
  the cut using the chosen provider's native capabilities and exact revision.
- Retimed derivative: retain the time map and avoid claiming AI alignment from
  matching duration; no automatic retiming or additional paid calls for this eval.
