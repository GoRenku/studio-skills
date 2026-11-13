---
cases: [D4, E4, E5, K3]
apps: [claude-code, codex]
fixture: small-film-library
request: |
  The "Harbor coverage" shot plan in my Renku project has a video take called
  "Harbor take". Please:
  1. Without downloading the whole file, read the take's width, height and
     duration with ffprobe through its download link, and put them in the
     project at tmp/evals/take-measurements.json as
     {"width", "height", "durationSeconds"}.
  2. Take its first and last frames with ffmpeg on my computer and add them
     to the plan as its video first frame and video last frame.
  3. Cut the first 2 seconds as an excerpt, and make a copy of that excerpt
     slowed to half speed with its time map beside it, named
     <copy file name>.time-map.json, as {"source", "scale", "points"}. Put the
     time map in the project too, and register the excerpt and the slowed copy
     as references of the plan.
checks:
  - check: project-json
    path: tmp/evals/take-measurements.json
    fields: {width: 640, height: 360}
    approx: {durationSeconds: "12±0.2"}
  - check: assets
    owner: project
    type: shot_plan_video_first_frame
    min: 1
  - check: assets
    owner: project
    type: shot_plan_video_last_frame
    min: 1
  - check: assets
    owner: project
    type: shot_plan_video_reference
    min: 3
  - check: project-files
    pattern: "**/*.time-map.json"
    min: 1
  - check: renku-calls
    tool: renku_upload
    min: 1
    max: 2
---

# Measure a take through its link; frames and excerpts

ffprobe reads width, height and duration through a download link, which
serves byte ranges (D4). Frames (E4) and an excerpt with a time-scaled copy
and its time map (E5) are made with ffmpeg on the agent's computer and come
back in at most two uploads. The fixture take is the repository's 640×360,
12-second previs clip; the fixture plan already has one reference, the
dialogue recording.
