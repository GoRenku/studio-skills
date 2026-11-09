# AI video from a Previs Shot Plan

Keep the director-selected registered `revisions[].id` throughout the handoff.
After normal Preview, approval, output inspection and provenance steps, attach:

```bash
renku media import --project <name> --purpose shot-plan.video-generation --target shot-plan:<id> --source <output-path> --provenance <safe-provenance.json> --previs-revision <revision-id> --json
```

The flag associates the independent Project Asset with that exact revision. Keep
it for derivative provider inputs; never guess latest revision. The id does not
belong in the provider request or review JSON. Video edits inherit it from their
source Asset through the existing edit attachment path. A take for a numbered
clip, including every take from a coverage video, attaches with `--clip <id>`
instead, as `scene-segmentation.md` describes.

Prepared input derivatives must also be registered before Preview. Follow
`../workflow.md`'s `shot-plan reference import` step for extracted frames,
Previs clips and audio excerpts, with this exact revision. Use returned AssetFile
paths in the request. Temporary preparation alone does not attach a reference.

Use this workflow when the reviewed input is a Blender procedural previs or a
staged previs recorded by `previs-staging`; a staged revision keeps its
`staging.json`, description and timeline instead of Blender source.
Read `workflow.md`, `../video-reference-continuity.md`, the selected model operation
and provider adapter. Read generation context for the exact existing plan;
reuse a complete current report already read for this request. Refresh after
registering new chosen derivatives or another relevant state change:

```bash
renku generation context --project <name> --purpose shot-plan.video-generation --target shot-plan:<id>
renku shot-plan previs show --project <name> --shot-plan <id> --json
```

Choose the director-reviewed revision and video from the returned registered
video Assets; newest is not automatically selected. A Blender revision only
ever has its cut (`render`); a staged revision may also hold `coverageVideos`.
Identify the exact video with [the previs video chooser](../previs-video-chooser.md):
the user is watching it in Studio, names it in chat, or you ask. Say its name
back before anything is paid for. Empty Shots are normal for a Previs plan.
The source parameters accompanying that revision carry authored dialogue and action
timing; use those decisions alongside current Scene context.

## Inputs and roles

Simple Previs is only a spatial/motion/camera guide. Its proxy surfaces, faces,
wardrobe textures, light treatment and prop scribbles must not define final
appearance. Establish a reviewed finished-look image in the relevant composition
before video execution: reuse suitable existing media or prepare it through the
authorized image workflow. Identity/design comes from subject references and
finish from the intended visual language; realism is not mandatory for every film.
Inspect featured props and close-ups at their screen scale. Supply independent
appearance evidence when the master image does not adequately depict them, without
requiring a separate sheet for every incidental object or detailed Blender props.

- Send the chosen previs video, or an excerpt of it, unannotated as an actual
  native video reference for blocking, geography, camera path, action order and
  intended timing. Its `$file` marker's `reviewLabel` is the video's name, such
  as "Revision 2 · Loukas close 24.0–30.0 s"; an excerpt adds its scene times.
- Inspect character/location sheets and supply the relevant exact images for
  identity, costume, architecture, materials and final appearance. Map each proxy
  to its intended subject; proxy colors are not wardrobe instructions.
- Include a featured prop sheet when needed. Avoid redundant references.
- Use selected Shot Plan Dialogue Takes according to `../video-reference-continuity.md`.
  Preserve exact selected files and roles; no newest-unselected substitution,
  concatenation, silent truncation or replacement speech. No dialogue is valid.
- This workflow does not upload a separate Lookbook image: the sheets already carry
  its visuals. Relevant Lookbook text may become concrete light/palette/texture
  wording. A named unseen Lookbook alone cannot instruct the provider. Other
  Media Producer workflows keep their own Lookbook-reference guidance.

Finalize modality-local array order before writing the adapter's native reference
mentions. A character/location sheet is an appearance input, not a storyboard or
opening-frame contract. A contact sheet or first frame cannot replace the motion
video. Local Renku IDs and paths are internal evidence, not prompt reference tokens.

## Routes

Use H3 Max by default for this workflow, without changing Project Settings.
Explicit model choice wins; continue existing provider/Preview/confirmation policy.

| Model | Fal route | Canonical operation |
| --- | --- | --- |
| H3 Max | `minimax/h3-max/reference-to-video` | `../model-guides/video/minimax-h3-max.md` |
| Seedance 2.5 | `bytedance/seedance-2.5/reference-to-video` | `../model-guides/video/seedance-2.5/reference-to-video.md` |
| Seedance 2.0 | `bytedance/seedance-2.0/reference-to-video` | `../model-guides/video/seedance-2.0/reference-to-video.md` |
| Wan 3.0 | `alibaba/wan-3.0-prime/reference-to-video` | `../model-guides/video/wan-3.0-prime/reference-to-video.md` |

Check the exact current route schema for simultaneous video/image/audio inputs,
counts, duration, bytes, dimensions, output settings and prompt expansion. Native
sound output does not establish uploaded-audio support. If required references
cannot fit, explain the conflict and obtain a route/input choice; do not drop audio
or change models silently. The four routes are alternatives, not equal timing or
quality guarantees.

## Direction and timing

Preserve the authored continuous view or hard-cut sequence, assigning motion/camera to video and appearance to
images. Describe ordered actions, spatial relationships and priorities, then sound
intent. Replace block geometry with the supplied appearances while preserving
geography and performance. Exclude reproduced proxy materials, sheet panels,
labels and unrequested action where relevant.

For “Mara says turn 3 at 8 seconds”, use the resolved exact line and 8-second onset
from this revision's directing parameters. Match the previs gesture/reaction and
playback cue to that same decision. Reconcile a conflicting Scene speaker or
selected audio performance with the director before execution; do not fabricate
speech to fit a prompt.

Preserve master timing. If the route needs a derivative, keep the master and record
revision, fps and the precise master-to-submitted time map in generation evidence.
For a 17-to-15 speed-up, submitted time = master time × 15/17; a three-second hold
becomes 2.647 seconds. Resolve changed locked timings first and map prompt/audio
intent to the submitted timebase. Never incidentally time-stretch selected speech.
Reference audio does not promise identical waveform, lip sync or onset timing.

Read `scene-segmentation.md` for multi-clip excerpts and adaptive continuation.
For off-screen speech, name the audible speaker, visible listener/reaction and
who must not articulate the line. Do not silently replace off-screen coverage
with an on-screen speaker. Unlocked Previs timing may differ in a usable take.

## Coverage videos

The edit stays the main path. A coverage video gives one camera's angle on its
stretch, beside the edit. Generating the whole scene shot by shot from every
camera is experimental: never suggest it; do it only when the director asks. A
camera run inside the edit has no coverage video of its own: excerpt it from the
cut as `scene-segmentation.md` describes.

For a coverage video such as "Revision 2 · Loukas close 24.0–30.0 s":

1. **Previs reference.** Use the coverage video's file
   (`coverageVideos[].video`), whole or in excerpts within the route's limits,
   exactly as for the edit. The whole file is already registered and keeps its
   path. Import every derivative (excerpt, frame, trimmed audio) with
   `shot-plan reference import --previs-revision <revision-id>`.
2. **Clip time.** The video starts at the stretch's start, so clip time is
   scene time minus the stretch start. It is one continuous camera: the edit's
   segments do not apply, and only cues inside the stretch do.
3. **Dialogue.** Trim each line that overlaps the stretch to the stretch, timed
   from the stretch start. Urban's line runs 12.9–26.6 s and the stretch is
   24.0–30.0 s, so the excerpt covers 24.0–26.6 s scene time, which is
   0.0–2.6 s in the clip and starts 11.1 s into his performance. Excerpt the
   selected Dialogue Take without changing its speed. If a stretch edge falls
   inside a word, tell the director instead of moving the edge yourself.
4. **Clip.** Create the clip for the coverage video before attaching a take:

   ```bash
   renku shot-plan clip create --project <name> --shot-plan <id> --previs-revision <revision-id> --coverage-video <coverage-video-id> --json
   ```

   Clip numbers stay unique across the revision: after the edit's Clips 1 and 2,
   the first clip from a coverage video is Clip 3.
5. **Attach** each take with `renku media import` and `--clip <clip-id>`, as in
   `scene-segmentation.md`; Core takes the revision from the clip. Keep the
   time map in the take's summary, for example "Previs revision 2 · Loukas
   close 24.0–30.0 s; clip time = scene time − 24.0 s."

## Execute and review

Use the existing Generation Spec, provider-native request, Preview, confirmation,
execution, recovery and Core attachment workflow. Keep exact Shot Plan authorship.
Core stores AI takes with normal video Asset naming; no model-named folder or new
generation purpose is introduced. Durable provenance belongs to the Asset;
request/receipt/QA working files remain in categorized project `tmp/`.
When a submitted derivative changes master timing, retain its source revision and
exact time map in the take's existing Asset summary through `--summary` on import
(or `renku asset update <asset-file-id> --project <name> --summary <text>`). For example:
“Previs revision 3; 17s→15s, submitted time = master time × 15/17.” This survives
tmp cleanup without extra folders, provider fields or a new metadata schema.

Review appearance, camera, event timing and audio separately. Inspect continuous
motion and the final frame. Listen before asserting speech/voice correctness.
Inspect every cut and featured insert for proxy reversion, not only the opening.
Do not carry failed appearance into a continuation without explicit user acceptance.
The accepted Harbor H3 take arrived around 8–9 seconds versus the submitted intent
near 7.06 seconds; conditioning helped but was not exact transfer. Disclose such
deviations and preserve a director-accepted result. Do not initiate paid retries
merely because a numerical timing comparison differs.

### Typed Previs direction handoff

Read `shot-plan previs show --json` for the chosen revision before authoring its
provider-native request. Preserve explicit segments/cuts and Dialogue turns,
including a turn crossing a cut. Action and Camera cues are onset directions,
not speech. Consult the selected provider's capabilities; do not add a common
provider timeline schema. Record derivative time maps and disclose that paired
AI output is not verified to match Previs speech/action timing. Keep exact
revision attachment, Preview approval and provider provenance unchanged.
