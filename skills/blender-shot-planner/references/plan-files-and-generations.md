# Plan files and media

Use paths returned by Core. Example of its Scene-local organization:

```text
scenes/03/01-shot-plan/
  previs/
    source/
      build_previs.py
      scene.json
      description.md
      playback.json
    revisions/r003/
      build_previs.py
      scene.json
      scene.blend
      playback.json
      description.md
    renders/
      previs-gxxx.mp4
  s03-p01-video-gn6p.mp4

tmp/media/previs/<plan-id>/<attempt>/frames/
tmp/operations/previs/<plan-id>/
tmp/qa/previs/<plan-id>/
```

`source/` is editable authoring work. Each completed revision retains the exact
Python, dependencies authored for the plan, parameters and built `.blend` used by
that render. Keep relative media/render paths in Blender where practical. A prior
configuration alone cannot reconstruct code that changed; label recovered
historical source honestly.

Build a stable revision candidate directory under project `tmp/` containing the
source snapshot, built `.blend`, optional `description.md` and `playback.json`. Keep frame sequences
outside that candidate directory. Register the completed unannotated MP4:

```bash
renku shot-plan previs register --project <name> --shot-plan <id> --file tmp/operations/previs/register.json --json
renku shot-plan previs show --project <name> --shot-plan <id> --json
```

Request file (paths are project-relative):

```json
{"sourceDirectory":"tmp/operations/previs/<plan-id>/candidate","renderPath":"tmp/media/previs/<plan-id>/<attempt>/previs.mp4"}
```

Core snapshots that directory into `previs/revisions/rNNN`, copies/hashes the
video into its allocated render path, and persists the revision plus video Asset.
An identical source/video retry reuses the revision. Read the returned paths;
do not calculate a revision number or write registered destinations yourself.
Register every completed full render. Diagnostic stills and short previews stay
temporary. Avoid putting caches/logs/MP4s into the source snapshot directory.

The video Asset is `shot_plan_previs`, origin `rendered`, with exact Shot Plan
authorship. AI takes continue through `shot-plan.video-generation`, stored with
normal `shot_plan_video` naming and provider provenance. No `generations/` tree,
model-named take folder or duplicate `review.mp4` is needed.

## Direction timeline

`description.md` is exact authored Markdown for this revision. Author it and
`playback.json` from the same directing decisions, in `previs/source/`. Include
them in a stable candidate and register; never edit retained historical files.

`playback.json` is a Core-validated domain contract:

```json
{
  "frameRate": {"numerator":24,"denominator":1},
  "frameCount":336,
  "segments":[{"id":"tracking","startFrame":0,"label":"Following Mara"}],
  "subjects":[{"key":"mara","label":"Mara","color":"#D98278"}],
  "cues":[
    {"id":"mara-line","kind":"dialogue","startFrame":192,"endFrame":264,"speaker":"mara","text":"<exact resolved line>"},
    {"id":"mara-turn","kind":"action","startFrame":264,"subject":"mara","text":"Mara turns toward the doorway."},
    {"id":"camera-stop","kind":"camera","startFrame":288,"text":"Camera stops tracking."}
  ]
}
```

Positions are zero-based integer frames, ends exclusive. Verify rate/count from
the authored constant-frame-rate render. Seconds = frame × denominator / numerator;
24000/1001 is supported without rounding the rate. Cue and segment starts must
be inside frameCount; Dialogue ends must exceed their starts and may equal
frameCount. Never silently turn provisional caption seconds into measured frames:
record the rounding choice and verify event frames, retaining uncertainty.

A Dialogue is one speech turn, with explicit local `speaker` and exact line text.
Only Dialogue has optional `endFrame` and optional exact recording
`audio: {assetId, assetFileId, offsetSeconds?}`. Without an end it is seekable but
cannot audition. Do not infer an end from the next turn or video boundary.
An Action is a physical direction change with optional local `subject`, no end
or audio. A Camera is a camera direction change, with no subject/end/audio.
A held gaze, looping animation, location, caption heading or gestured conversation
is not automatically speech or an interval cue. Author useful onset/arrival/stop
points deliberately; never export all animation controls or classify prose.

Segments are uninterrupted camera views. First starts at zero, later strictly
increasing starts are cuts to incoming views; do not store cuts/end fields again.
A continuous render has one segment. Dialogue may cross a cut without splitting.
Keep ids stable for unchanged directions across revisions. Subjects resolve locally;
ids are unique, labels nonempty and colors six-digit hex. Simultaneous points and
overlapping dialogue are valid. Studio only auditions the explicitly chosen turn.

Missing timeline is valid. Supplied invalid timeline fails registration before
writes. Optional malformed/unavailable recording yields a localized warning while
video stays usable. Creative text remains opaque to Core. Never burn cues into
video. Use the continuous/cut examples in `../samples/` and carry the exact
registered revision into the AI handoff.

## Temporary frames

Keep PNG sequences while iterating. They speed interrupted-render continuation,
encoding-only retries and reuse of unchanged intervals. Blender does not use old
PNGs to accelerate a changed frame; rerender affected images. Use a new cache or
explicitly invalidate affected frames when geometry, lighting, camera, timing or
render settings change. Reuse requires matching inputs, not matching filenames.

The user clears project `tmp/` in Project Settings with a simple confirmation.
There is no automatic expiry or post-render deletion. After cleanup, rebuild
caches from retained source; permanent source, `.blend` and registered videos stay.
Temporary request/QA files are disposable; durable AI provenance stays on Assets.
