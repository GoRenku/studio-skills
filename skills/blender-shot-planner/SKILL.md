---
name: blender-shot-planner
description: Create and iteratively direct a Blender Previs Shot Plan for a Renku Studio Scene. Use for 3D blocking, camera moves, character positions, gesture and dialogue timing, procedural previs renders, or director feedback on an existing Previs plan.
---

# Blender Shot Planner

## Renku Cloud

Renku runs in Renku Cloud when this skill comes from the `renku-cloud`
plugin (its folder is inside that plugin; Claude Code lists it as
`renku-cloud:<skill>`), or when the Renku tools `renku_command`,
`renku_upload`, `renku_download`, `renku_view` and `renku_guide` are
present. An app may show them with a prefix, such as
`mcp__plugin_renku-cloud_renku__renku_command`. In Renku Cloud, never run a
`renku` command on the computer, even when one is installed there.

When this skill comes from `renku-cloud` and the Renku tools are missing, the
person has not signed in to Renku Cloud yet. Tell them how, and stop until
they have: in Claude Code, type `/mcp` and sign in to
`plugin:renku-cloud:renku`; in the Claude app, open Renku Cloud's Connectors
tab in Customize → Plugins and select Add, then Connect; in the ChatGPT app,
select Connect on Renku Cloud; in the Codex CLI, run `codex mcp login renku`.

In Renku Cloud this section applies and takes precedence over any instruction
below to stop when `renku` is unavailable.

- Run the `renku ...` commands a step needs as one `renku_command` batch:
  `{"commands": [{"args": ["shot-plan", "list", "--scene", "<scene-id>", "--json"]}], "onFailure": "stop"}`.
  There is no shell, so no pipes, redirects or `$(...)`. A command that needs
  an id from an earlier answer goes in a second batch.
- Your workbench is on your computer: the documents you write, saved answers,
  notes and scripts. Send a document a command reads in that command's
  `files`, keyed by the `tmp/` path the command names.
- An answer over 100,000 characters, or any answer when `saveAnswers` is true,
  comes back as a download link. Fetch it with `curl` and read it with jq,
  sed or a script on your computer.
- Files go up in one `renku_upload` call; use the path each upload reports.
  Library files come down in one `renku_download` call, a folder as one
  `.tar`. Read this skill's own files from the installed plugin. The
  permission steps below do not apply to Renku commands.

For Blender previs:

- Blender, its Python, FFmpeg and FFprobe run on your computer, as locally.
  Keep the plan's editable source and frames there; the library's
  `previs/source/` is not edited in the cloud.
- To continue a plan, read
  `shot-plan previs show --shot-plan <id> --revision latest --json` and
  download that revision's `sourceDirectory` in one `renku_download` call.
  Unpack the `.tar` and build from it.
- Look at sheets with `renku_view`, or download the originals to judge
  geography and proportions at full size. Download selected dialogue audio to
  listen to it.
- To register a render, pack the candidate folder (source snapshot, built
  `.blend`, `description.md`, `playback.json`) as a `.tar`. In one
  `renku_upload` call, send it with `unpack: true` and `folder`
  `tmp/operations/previs/<plan-id>`, and send the MP4 as a file with `folder`
  `tmp/media/previs/<plan-id>`. Then run `shot-plan previs register` with
  `--source-directory <unpacked folder>`, `--render <uploaded MP4>` and
  `--title <render title>`, using the paths the upload reports.
- Frames, excerpts and retimed copies for the AI handoff are made on your
  computer; `media-producer` uploads them and registers them in one
  `shot-plan reference import` list. It imports the AI take with `--job` and
  `--receipt` beside `--previs-revision <id>`.

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
   Rewrite the description as the complete current cinematic direction on every
   iteration, following `references/directing-workflow.md`; never append a change log.
5. For an AI video, read `references/ai-handoff.md` and hand the reviewed revision
   to `media-producer`. Blender renders and AI takes are different Assets.

Keep creative interpretation in the director/agent loop. Playback metadata is
a Core-validated direction timeline: explicit Dialogue, Action and Camera points,
frame timing and shot segments whose starts define cuts. Read the full contract
and samples in `references/plan-files-and-generations.md`. Do not burn legends, timecodes or captions into the MP4.

For verification scenarios and exploration evidence, use `evals/director-iteration.md`.

## Efficient Command Use

Use supported `--project <project-name>` on Shot Plan and screenplay commands. Reuse resolved Project/Plan/revision context for a simple directed iteration; refresh after relevant edits or user review. Keep focused revision registration, exact Clip/Take identities, rendering, QA, and requested changes intact. A mutation report replaces read-back only when it contains the needed result.

Consult the relevant CLI reference/help once if syntax is unknown, then reuse verified syntax for this task. Do not discover syntax by attempting mutations. Do not invent `project list`. If a known permission denial blocks cache/output/config or local-network access, explain the requirement and use the authorized host permission flow; do not repeat the denied attempt, read secrets, disable cache persistence, or change permissions. `CLI026` means the mutation succeeded: report the notification warning without replaying the mutation.

## Project Workspace

Keep temporary files out of the Project root: CLI documents in `tmp/operations/`,
frames/intermediates in `tmp/media/`, review evidence in `tmp/qa/`, and other scratch
inputs in `tmp/scratch/`. Generation working evidence uses
`tmp/operations/media-generation/`. Retained authoring files instead belong in the
Core-provided Shot Plan `previs/source/`; registration retains source revisions and
renders. See `references/plan-files-and-generations.md` for the complete layout.
