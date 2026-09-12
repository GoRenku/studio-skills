# Complete scene coverage across generation limits

Use for a Scene that needs multiple video requests or a continuation after an
incomplete output. Skills own these creative decisions; Engines owns provider
capabilities and execution. Core records clips, selection and attribution only.

## Plan the whole performance

Read the exact plan/revision and selected Dialogue Takes. Establish all requested
words, speakers and actions in order, authored cuts, off-screen speech and the
ending. Distinguish locked runtime/performance/camera choices from estimates.
Matching Previs timestamps is optional unless explicitly locked; missing words,
wrong speakers and mouth/audio mismatch are different concerns.

Read the selected route's live output durations, discrete choices, reference
durations/counts/combined budget and supported modalities. Partition only when
needed, into as many requests as the material requires. Do not assume two equal
clips or a fixed duration limit. Prefer phrase endings, natural pauses or action
boundaries; a Dialogue turn can span both a camera cut and a request boundary.
Never cut a word. Leave practical performance/transition room instead of filling
each request to its ceiling. Without a recording, duration remains an estimate.

Keep a short working coverage table in `tmp/operations/media-generation/`: intended
passages/actions, speaker, provisional boundaries, exact source intervals and
observed completion. This is editorial evidence, not a parallel screenplay or
selection store. Account for every required occurrence once in final coverage;
intentional scripted repetition is not a duplicate to remove. No-dialogue scenes
use action coverage; a scene fitting one request needs no artificial split.

## Prepare excerpts without changing the performance

For authorized multi-clip work, extract the assigned intervals from the exact
selected audio files without changing speed, voices or wording. Preserve original
Takes and selection. Keep separate selected recordings separate; resolve ambiguous
overlapping performances rather than concatenate or choose an unselected candidate.
Prepare excerpts in `tmp/media/`; record source Asset/File, start/end samples or
seconds, and submitted offset in request evidence. Out-of-clip material must still
appear in the complete coverage plan. Excerpting is not permission to drop speech.

Before request authoring, import every chosen new image, video, or audio
derivative with `renku shot-plan reference import` as described in
`../workflow.md`. Supply the exact Plan/revision, retain extraction facts in
the Asset summary, and use the returned registered path in the request. This
includes final-frame continuation images and voice-delivery excerpts. Existing
registered sources stay at their current paths. Verify all intended inputs are
available in Preview before requesting confirmation.

Prepare matching Previs excerpts and local camera/action timing. If generation
drifts, rebuild the next excerpt/timing from the remaining performance, not a stale
master-time slice. Record any derivative map; retain source revision identity and
never overwrite registered Previs. Distinguish reference context overlap from
material intended to appear again in the output. Respect live reference limits.

## Review before continuing

Execute the approved request once. Inspect the whole returned clip, especially
speaking passages, cuts, featured props and ending. Record:

- actual last complete phrase/action, missing suffixes, internal omissions and
  unintended repeated occurrences;
- audible speaker/voice, visible speaker or listener, mouth synchronization;
- ending pose, movement, gaze, hand/prop state, camera, appearance and sound;
- actual file duration and the exact boundary used for continuation.

ASR locates words approximately; it does not verify voice identity or lip-sync.
Listen and inspect with available tools. If a required judgment cannot be made,
provide a focused user audition instead of claiming verification. A plausible
first/final frame or correct transcript alone does not make a clip ready.

Use the selected raw take's actual ending as continuation context. Supply its
exact final frame or another supported native continuation input and describe
continuing motion and speech explicitly. A frame cannot encode velocity or sound.
A reference-image mention is conditioning, not a guaranteed first-frame lock.
Do not silently switch routes to obtain a different capability.

The next request is self-contained: remaining exact words/speaker, opening state,
local cuts/actions, final appearance and actual references in final array order.
Never rely on “continue clip 1” or an earlier request the model cannot see.

## Reconcile incomplete results

| Observation | Response |
| --- | --- |
| Usable prefix with an omitted suffix | Start the next request at the first missing complete phrase; rebuild its audio, visual timing and remaining duration. |
| Internal omission, wrong speaker, cut-off word or bad mouth sync | Report a focused repair/retry choice. Appending missing content after later dialogue cannot repair order. |
| Unwanted silent tail | Report its effect on the join. Do not automatically trim raw footage or fill it with replacement audio. |
| Remaining material exceeds pending request capacity | Repartition pending requests within authorized cost/scope; an extra request does not increase a locked scene runtime. |
| Required material cannot fit locked duration/speed | Explain the measured conflict and obtain the necessary creative decision; do not drop words, stretch speech or invent filler. |
| Missing required reference/modality | Resolve input or route choice before execution; do not invent fields or silently omit continuity. |

Unused nominal seconds do not establish suitable mouth movements for missing
speech. Track requested duration, returned duration and complete content separately.
Review the ordered raw clips at joins and across the full requested coverage.
Studio is a review surface, not an editing or assembly-export tool.

If the user explicitly requests an external edit, keep synchronized picture/sound
paired. Replacing generated speech with another recording is not a synchronization
repair. Import an edited output as a distinct candidate, preserve its source, and
recheck coverage, timing and its new ending before continuation. Do not add trim
ranges to Studio. Exact-sync requirements need a supported workflow and inspection,
not a promise that reference conditioning locks timing.

Persist essential derivative/source facts through existing Asset summary and safe
provenance; temporary working notes may be cleaned up. On resumption reread exact
state and media; do not guess missing observations. Report verified, failed and
unverified dimensions separately. No automatic paid retry loop, implicit selection
or invented “complete” state.

## Identify and select raw clips in Studio

Within the exact Shot Plan and Previs revision, use the stable `Clip N.M` label
(clip number, take number), for example `Clip 1.1: Initial`. A title helps a person
recognize a take; it is never the lookup key. Browsing a take in the player is not
selection. “Use Clip 1.1” authorizes selecting that exact take, not another paid run.
If the plan/revision scope is unclear, resolve it with the user before selecting.

```bash
renku shot-plan clip list --project <project> --shot-plan <plan-id> --previs-revision <revision-id> --json
renku shot-plan clip create --project <project> --shot-plan <plan-id> --previs-revision <revision-id> --json
renku shot-plan clip take resolve --project <project> --shot-plan <plan-id> --previs-revision <revision-id> --number 1.1 --json
renku shot-plan clip take select --project <project> --clip <resolved-clip-id> --take <resolved-take-id> --json
```

Create a slot for each planned raw clip. New registration does not select a take.
Attach a new output using the ordinary provenance-bearing `renku media import`
command for `shot-plan.video-generation`, adding `--clip <id>`, optional
`--take-title "Initial"`, and optional `--source-take <exact-take-id>`. Core derives
the revision from the clip and validates its relationship to the supplied target.
For an already attached file, use:

```bash
renku shot-plan clip take add --project <project> --clip <id> --asset <asset-id> --asset-file <file-id> --title "Initial" --json
```

Use `clip take update --take <id> --title <text>` for a short authored label and
`clip take clear --clip <id>` to clear selection. Neither operation renumbers takes.
Do not infer assignments for unassigned videos from Asset titles.

Before a dependent request, reread selection, inspect the exact selected file and
record its identity. Choose/extract provider inputs in the agent workflow; optional
source-take attribution records identity only and does not supply a video or frame
to the provider. Capture the actual input files in existing request provenance.
If selection changes while a request runs, retain the actual source attribution;
do not relabel the result as derived from the new selection. A later selection
change does not invalidate footage or automatically authorize regeneration.

The Generation player reviews selected whole files in order; it is not an editor.
Its duration may differ from Previs. Unlinked playback is independent; linking
compares equal elapsed seconds without stretching either file. A pending slot is
not missing dialogue evidence: inspect the media and screenplay before deciding
what content remains. UI selection itself never proves dialogue or visual quality.
