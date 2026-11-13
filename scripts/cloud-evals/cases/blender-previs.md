---
cases: [H3, E7, K3]
apps: [claude-code, codex]
fixture: small-film-library
requires: [blender]
request: |
  Make a quick Blender previs for the "Arrival previs" plan of the first scene
  in my Renku project: a ground plane, a box standing in for the ferry and a
  camera pushing in slowly. Write the Blender Python script yourself, render 24
  frames at 320×180 with Blender at {blender}, and turn the frames into an MP4
  with ffmpeg on my computer. Then register it as a new Previs revision of that
  plan, with its source folder holding the script and the .blend file.
checks:
  - check: previs-revisions
    shotPlan: "{previsPlan}"
    withRender: true
    min: 1
  - check: renku-calls
    tool: renku_upload
    min: 1
---

# Blender previs on the agent's computer

Blender renders frames on the agent's computer and ffmpeg turns them into a
video (E7). The source folder goes up as an archive unpacked on arrival and
the render as a file, then `shot-plan previs register` makes the revision
(H3). It runs only where Blender is installed.
