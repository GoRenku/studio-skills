---
name: previs-staging
description: Stage and iteratively direct a Previs Shot Plan in Renku Studio's 3D Staging view, with blocky stand-ins on a rough Location set, positions, walks, poses, looks, cameras, camera moves, cuts and dialogue timing, then record it as a Previs revision. Use for any new previs unless the user asks for Blender by name, and for every revision of a plan that already has a staging.
---

# Previs Staging

Stage a Scene as a 3D previs the director can watch, adjust by hand in Studio's
Staging tab and keep directing through you. Everything you change is a whole,
Core-validated JSON document written with `renku`; there is no per-plan code.
The director sees your writes live in an open Staging tab, and you see theirs on
your next `show`.

1. Read `references/directing-workflow.md`. Resolve the exact Project, Scene and
   plan, read current story context and inspect the relevant sheet visuals.
2. Make sure the shared pieces exist: the Location's set layout and a stand-in
   for each Cast Member and Prop in the shot. Read
   `references/sets-and-stand-ins.md`. They are shared by every scene that uses
   them, so extend or correct them; never fork a copy for one plan.
3. Create a new `previs` Shot Plan and write its staging. Read
   `references/staging-documents.md` for coordinates, marks, cameras, cuts,
   extra coverage, lines and every command. A plan that already has Blender
   revisions stays with `blender-shot-planner`; stage the scene in a new plan
   instead.
4. Record a revision with `renku shot-plan staging record`, inspect event
   frames, and iterate with the director. One recording saves the edit video
   and a video of each camera run with extra coverage. Read
   `references/recording-and-handoff.md`.
5. For an AI video, hand `media-producer` the reviewed revision id and the
   name of the video the director chose (the edit or a coverage video); it
   continues as for a Blender previs.

Every write carries the version you read (`--expected-version`). A version
conflict means the director or another session changed the document: read it
again, apply your change to the new version and write again. Never overwrite
their edits from an old copy.

Keep creative interpretation in the director/agent loop. Studio validates the
document's structure and references, never the meaning of cue notes, lines or
the description.

## Efficient Command Use

Use `--project <project-name>` on every staging, set layout, stand-in and Shot
Plan command. Print each contract once with its `schema` command when you need
it, then reuse it. Read with `show`, change the JSON, write the whole document.
A write report already contains the resolved result, so do not read it back.
Do not discover syntax by attempting mutations. `CLI026` means the mutation
succeeded: report the notification warning without replaying the mutation.

## Project Workspace

Keep temporary files out of the Project root: staging, set layout and stand-in
documents you write in `tmp/operations/previs/`, extracted frames and other
intermediates in `tmp/media/`, review evidence in `tmp/qa/`, and other scratch
inputs in `tmp/scratch/`. Generation working evidence uses
`tmp/operations/media-generation/`. A staging plan keeps no files in its
`previs/source/` folder: Core stores the staging in the Project database and
each recorded revision keeps its own copy under `previs/revisions/`.
