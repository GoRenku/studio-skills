---
name: blender-shot-planner
description: Create and iteratively direct a Blender Previs Shot Plan for a Renku Studio Scene. Use for 3D blocking, camera moves, character positions, gesture and dialogue timing, procedural previs renders, or director feedback on an existing Previs plan.
---

# Blender Shot Planner

Author a Scene-specific Blender previs that the director can watch and revise.
Use the Scene's actual character, location and prop sheets to make its geography,
staging and action legible. Preserve successful modeling and render quality when
changing direction. Ordinary reuse and adaptation of another plan's code is useful;
a shared previs platform is outside this workflow.

1. Read `references/directing-workflow.md`. Resolve the exact Project, Scene and
   Shot Plan, read current story context and inspect relevant sheet visuals.
2. Create a `previs` Shot Plan or continue the selected one. Read
   `references/plan-files-and-generations.md` for the CLI and durable folder layout.
   Shot List coverage authoring belongs to `shot-planner`.
3. Write or adapt this plan's Python and expose useful directing controls for
   positions, camera, timing and performance. Read `references/blender-authoring.md`
   before the first build. Choose geometry and implementation to suit this scene.
4. Review a small render, then the full motion and event frames. Apply director
   feedback to the existing plan, keeping accepted choices unless the direction
   changes them. Save exact source/config with each completed render revision.
5. For an AI video, read `references/ai-handoff.md` and hand the reviewed revision
   to `media-producer`. Blender renders and AI takes are different Assets.

Keep creative interpretation in the director/agent loop. Playback metadata is
a Core-validated direction timeline: explicit Dialogue, Action and Camera points,
frame timing and shot segments whose starts define cuts. Read the full contract
and samples in `references/plan-files-and-generations.md`. Do not burn legends, timecodes or captions into the MP4.

For verification scenarios and exploration evidence, use `evals/director-iteration.md`.

## Project Workspace

Keep temporary files out of the Project root: CLI documents in `tmp/operations/`,
frames/intermediates in `tmp/media/`, review evidence in `tmp/qa/`, and other scratch
inputs in `tmp/scratch/`. Generation working evidence uses
`tmp/operations/media-generation/`. Retained authoring files instead belong in the
Core-provided Shot Plan `previs/source/`; registration retains source revisions and
renders. See `references/plan-files-and-generations.md` for the complete layout.
