# Seedance 2.5 draft workflow on fal.ai

Researched 2026-11-04. Read the [Seedance 2.5 index](index.md) and its selected
operation guide for the existing prompt and reference workflow. Inspect the
exact selected route's schema before preparing inputs. Drafting is a native
option on the generation route, not a separate text/image/reference generation
model.

## Draft and completion

Fal's current [text](https://fal.ai/models/bytedance/seedance-2.5/text-to-video/api),
[image](https://fal.ai/models/bytedance/seedance-2.5/image-to-video/api), and
[reference](https://fal.ai/models/bytedance/seedance-2.5/reference-to-video/api)
routes expose `draft: true`. It forces 480p, the lowest supported resolution,
even when `resolution` requests something higher. The output includes a video
and `draft_id`. Merely selecting `resolution: "480p"` does not enable the draft
workflow or promise a completion ID.

Execute and Recover retain the exact returned `draft_id` as
`generationProvenance.receipt.draft_id`, alongside `receipt.requestId`.
Import the preview through its normal destination with the returned
`provenancePath`; this saves the receipt with the retained AssetFile in the
Project database. A video left only in `tmp/` is not a saved Project draft.
Do not rebuild the receipt, put the id in a title, or ask the user to keep it.

In Renku Cloud, fal.ai's MCP result carries the `draft_id`. Record it as the
job's `draftId` and keep it as `draft_id` beside `requestId` in the receipt,
then import the preview with that job and receipt, as the fal.ai provider
Skill's Renku Cloud Generation section describes.

After reviewing the preview, use
[`bytedance/seedance-2.5/draft/complete`](https://fal.ai/models/bytedance/seedance-2.5/draft/complete/api)
to regenerate that task at 1080p. The completion input requires `draft_id`; it
does not take a rewritten prompt or replacement reference inputs. Its optional
controls are 1080p resolution and codec. It is a separate generation request
that needs its own estimate and the normal generation approval workflow.

The current non-US input documentation says the ID remains valid for 14 days
and only for the original caller. US draft routes use 7 days and the matching
`bytedance/seedance-2.5/us/draft/complete` route. Older fal tutorials mention
7 days without distinguishing the variants; prefer the exact route's current
schema and do not mix regional completion routes or accounts.

## Finish a saved draft in a later conversation

When the user says "finish this draft" or selects a saved preview:

1. Resolve the exact Project and retained video from current Studio selection,
   generation context, or the user's explicit reference. Read its full
   `generationProvenance` from
   `renku asset list --project <project-name> --owner <owner-key> --include-generation-provenance --json`,
   following pagination as needed. Without `--include-generation-provenance`
   the listing leaves provenance out. Generation context identifies files but
   intentionally omits provenance; do not treat either omission as a missing
   receipt. Match its exact AssetFile id, not the newest file or a similar title.
   If the intended draft is ambiguous, ask which one. In Renku Cloud, a draft
   whose session ended before its import is not an Asset yet:
   `renku generation job list --unfinished` shows its recorded `draftId`.
   Import that preview first, as Media Producer's Renku Cloud guide describes.
2. Read its saved provider, exact model, request, and `receipt.draft_id`.
   Verify that this is the user's intended Seedance draft and select the matching
   non-US or US completion route using the saved route, not today's default
   model. `receipt.requestId` identifies the original provider job; it is not
   the completion id. A missing or empty `draft_id` means this file cannot be
   completed through this workflow. Explain the missing reference without
   inventing an id or silently running a fresh generation.
3. Prepare a new video request using the saved `draft_id` and the completion
   route's current schema. Its top-level prompt is `null`: the native request
   does not accept a prompt. Do not upload the preview, resend its references,
   or add a local-file marker to this request. The provider task supplies the
   original generation inputs. Use the original fal account; do not store keys
   or treat a saved id as authorization to change accounts.
4. Follow the existing estimate, review, and Ask Before Generating workflow for
   this separate paid request. No extra acceptance step is required merely
   because the source is a draft. If fal rejects an expired or unavailable id,
   explain that the preview remains saved and ask whether the user wants a
   fresh generation; do not automatically resubmit or change the route.
5. Review and import the completed output as a new file with its own exact
   provenance. Resolve the destination through Media Producer's existing
   purpose guidance and current owner relationships. For a Shot Plan draft,
   use the same Shot Plan's `shot-plan.video-generation` destination and the
   existing [Clip/Take attachment workflow](../../../shot-plan-video/scene-segmentation.md)
   when applicable, retaining the source's exact Previs revision and Clip
   relationship and using `--source-take` when the draft has an identified Take.
   Preserve the draft, its receipt, and existing selections unless the user requests a selection
   change. Completion is not `video.edit`: that purpose requires the source
   file in the executed request, which this completion route does not accept.
   If the source has no applicable existing destination, resolve that with the
   user before paid execution rather than inventing an attachment purpose.

The saved preview and receipt survive Studio restarts and new conversations;
provider-side completion eligibility still expires. Never delete or discard a
draft merely because its completion window has passed. Keep ids out of ordinary
user-facing messages: describe the selected video and the completion outcome.

Illustrative native settings, not complete requests:

```json
{"draft": true, "resolution": "480p", "duration": "6"}
```

After selecting a returned preview, illustrative completion input:

```json
{"draft_id": "<the actual returned draft_id>", "resolution": "1080p"}
```

Do not execute these illustrative fragments or invent a draft ID. If a prompt,
reference, duration, or creative direction needs changing, generate a new draft
with the revised inputs rather than expecting completion to edit the task.
Completion regenerates the task; these sources do not guarantee identical
pixels or that flaws in the preview will be repaired.

## Preparing and reviewing the creative request

Fal's [worked draft-first ad tutorial](https://fal.ai/learn/tools/how-to-generate-ai-videos-using-claude-and-mcp)
uses text-to-video for an invented product and reference-to-video when the
product must match a photo. It recommends trying a short opening beat before a
longer take and reviewing with sound; speech and effect timing problems can be
missed on mute. The author's demonstrated workflow is useful evidence, not a
guarantee about our own prompts or exact current pricing.

The [BytePlus-authored Seedance 2.5 guide](https://fal.ai/learn/devs/how-to-use-seedance-2-5)
starts from subject and event, adding environment, camera, visual treatment, and
audio where needed. Separate the jobs of appearance images, motion video, and
audio rather than letting every reference govern everything.

Original, untested text-to-video prompt for a six-second draft:

```text
One continuous medium shot in a closed watch repair shop at dusk. A watchmaker
slides a sealed envelope under the door, withdraws her hand, then waits as
three quiet knocks come from outside. The camera slowly pushes toward her
hands. Warm desk lamp, cool window light. Sound: paper scraping, distant
traffic, then three knocks. No music or speech.
```

Agent recommendation: review the envelope's path, hand contact, camera movement,
final hold, and knock timing separately. If the actions feel rushed, remove a
beat or allow more time in a new draft. For image-to-video, let the first frame
supply appearance and describe the subsequent movement. For reference-to-video,
assign reference roles through the
[Fal reference-input adapter](../../../../../fal-ai-media-provider/references/adapters/reference-inputs.md)
after input order is final. A reference image does not itself
bind the opening frame.

The guide and API pages above were read on 2026-11-04. Automated tests cover
execution/recovery receipt capture, the saved provenance handoff, and opaque
receipt persistence and retrieval after Project reopening. No paid draft or
completion was submitted; the creative examples and provider-side completion
were not execution tested in this update.
