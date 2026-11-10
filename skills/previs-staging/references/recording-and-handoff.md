# Recording And AI Handoff

```bash
renku shot-plan staging record --project <name> --shot-plan <id> --json
```

`record` renders the edit (every frame in order through the cut cameras), then
each coverage video, in Google Chrome in the background, using Studio's own
renderer. It uses a running Studio, or starts one for the recording, and prints
the new revision:

```json
{ "revision": { "id": "previs_revision_…", "number": 3, "renderPath": "scenes/…/previs-….mp4", "sourceDirectory": "scenes/…/r003",
                "coverageVideos": [ { "id": "previs_coverage_…", "cameraKey": "loukas-close", "cameraLabel": "Loukas close", "startFrame": 576, "endFrame": 720, "assetFileId": "<id>" } ] },
  "segmentCount": 6, "cueCount": 10 }
```

The revision keeps `staging.json` (the staging with the exact set and stand-ins
it used), `description.md` and `playback.json` (shot segments from cuts, Action
and Camera cues from mark notes, Dialogue cues from lines). Each video is a
silent H.264 MP4 at the staging's size and frame rate. The director can also
press Record in the Staging tab; both produce the same kind of revision.

Failures:

- `CLI_STAGING_CHROME_MISSING`: Chrome is not installed or cannot start. Ask
  the director to press Record in the Staging tab.
- `CORE_STAGING_RECORDING_STALE`: the staging, set or a stand-in changed while
  recording. Record again.
- `CORE_STAGING_RECORDING_COVERAGE_MISMATCH`: the recorded coverage videos do
  not match the staging's extra coverage and full-length cameras. Record
  again; if it repeats, report the diagnostic.
- `CLI_STAGING_RECORDING_TIMEOUT`: the recorder page did not finish. Check the
  staging in Studio, then record again.

Staging plans accept revisions only from their staging; `shot-plan previs
register` refuses them.

## The videos of a revision

One recording saves one revision holding:

- **the edit**: the whole staging filmed through the cuts; and
- **one coverage video for each camera run with extra coverage**, filmed whole
  through that camera alone. Urban close on air 12.9–19.4 s and rolling from
  12.5 to 20.0 s gives one 7.5 s video; and
- **one coverage video for each full-length camera**, the whole staging through
  that camera, in place of its extra coverage videos. A camera the cuts keep on
  air throughout gets none.

A run fully inside the edit gets no video of its own; the generation workflow
excerpts it from the edit. The revision is saved only when every video is
recorded, and `coverageVideos` is empty when the staging has no extra coverage
and no full-length camera. A full-length video runs from `startFrame` 0 to the
staging's `frameCount`, for example `Revision 3 · The two men and the drawing
0.0–42.0 s`.

Each video has a plain name that Studio, the director and you all use:
`Revision 3 · Edit` and `Revision 3 · Loukas close 24.0–30.0 s` (the camera
label, then `startFrame` and `endFrame` in seconds with one decimal). The
director switches between a revision's videos with the chips on its row in the
Previs tab.

## AI video

A staging revision is an ordinary registered Previs revision. Give
`media-producer` the director-reviewed `revision.id` and follow its Previs
handoff (`references/shot-plan-video/blender-previs.md` in that skill), which
works the same for Blender and staging revisions. The blocky stand-ins and set
are a spatial, motion and camera guide only; appearance comes from the Cast,
Location and Prop references.

Name the video in the handoff, for example "Revision 3 · Edit" or "Revision 3 ·
Loukas close 24.0–30.0 s" with its coverage video id. When the director has
not said which video, say so; `media-producer` asks. Never pass on the newest
revision or video as a guess.

The edit is the main path to the scene's AI video; a coverage video gives one
camera's angle beside it. Generating the whole scene shot by shot from every
camera is an experiment: do not suggest it, and do it only when the director
asks.
