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

## Lightweight playback metadata

`description.md` is the model-neutral authored Markdown shown by Studio for this
exact revision. Derive it and `playback.json` from the same directing choices.
Edit the authoring copies under `previs/source/`, include both in the revision
candidate, and register; never modify the retained historical files.

`playback.json` supplies the Studio director's monitor display envelope:

```json
{
  "subjects":[{"key":"mara","label":"Mara","color":"#D98278"},{"key":"door","label":"Door","color":"#80AABB"}],
  "cues":[
    {"startSeconds":8,"endSeconds":11,"subject":"mara","text":"<exact resolved line>","audio":{"assetId":"<recorded-asset-id>","assetFileId":"<exact-file-id>","offsetSeconds":0}},
    {"startSeconds":11,"subject":"door","text":"Door opens."},
    {"startSeconds":12,"text":"Hold the frame."}
  ]
}
```

Seconds are relative to the beginning of this revision's video. Subjects identify
proxies; a cue describes what the player may show during that interval. The agent
can include useful dialogue/action cues. `subject` uses the same local key as the
parameters; no separate speakerId is needed. There are no Cast/Beat/turn foreign
keys or runtime creative checks. Missing annotations do not block registration.
Start-only cues are points; an end makes a range. Overlaps, unknown local subjects,
objects and subjectless cues remain visible. Times are finite nonnegative seconds;
ends exceed starts, keys are unique, and colors use six-digit hex. Text is opaque.
Audio is optional: use exact recorded Asset/file ids, never a selected-take lookup,
local path or URL. Offset defaults to zero. Unavailable audio leaves video usable.
Studio validates this display envelope at read time; registration retains exact
bytes even when optional annotations are missing or invalid. Never burn cues into
the video. Carry the registered revision id into the AI attachment handoff.

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
