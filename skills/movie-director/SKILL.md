---
name: movie-director
description: Coordinate Renku Studio movie-making workflows across screenplay, analysis, visual language, casting, locations, scene Beat design, Shot planning, media generation, and production readiness. Use when the user wants a top-level filmmaking sidekick, asks what to do next, wants to make or revise a movie across multiple departments, needs help choosing which Renku Studio skill to use, or asks for director-like guidance that dispatches to specialist skills such as screenplay-drafter, screenplay-analyst, inspiration-analyzer, lookbook-designer, casting-director, production-designer, scene-beat-designer, shot-planner, and media-producer.
---

# Movie Director

This skill requires the installed Renku runtime. If `renku` is unavailable, stop and direct the user to `https://gorenku.com`; do not substitute ad hoc files for the CLI-owned project state.

## Project Workspace

Keep every agent-created working file inside the current Project's categorized
`tmp/` tree. Never create operation JSON, Generation Specs, import manifests,
QA images, downloads, crops, or scratch files at the Project root.

- Use `tmp/operations/` for CLI authoring documents, including create, update,
  design, analysis, Lookbook, Scene Beats, Shot Plan, and import JSON.
- Use `tmp/specs/` for Generation Specs and `tmp/receipts/` for provider receipts.
- Use `tmp/media/` for temporary generated, downloaded, transformed, or cropped
  media; use `tmp/qa/` for review evidence and `tmp/scratch/` for other temporary
  inputs.
- Create category folders lazily. Let Renku commands copy accepted content into
  durable owner folders; never construct durable asset paths in the skill.
- Keep an external user source outside the Project when possible. If a temporary
  in-Project copy is necessary, place it under `tmp/scratch/`.


Use this skill as the top-level Renku Studio coordinator for making a movie. It routes work to specialist skills, keeps prerequisites visible, and helps the user advance without pretending unsupported departments are complete.

This skill should coordinate. It should not replace specialist skills or write their durable artifacts directly.

## Start Here

1. Resolve the current authoring project:

```bash
renku project current --json
```

2. For broad, cross-department, "current", "selected", "continue", or "what next" requests, read director readiness first:

```bash
renku director context --json
```

If a deterministic Studio selection is already available, use:

```bash
renku director context --selection '<studio-selection-json>' --json
```

3. Classify the user's request by department and current readiness.
4. Load only the reference file needed for the next decision.
5. Dispatch durable artifact work to the owning specialist skill.
6. Read back durable state through Renku CLI after the specialist completes.
7. Suggest the next concrete department step.

When the user asks about "this", "current", "selected", "open", "the thing on
screen", or a similar Studio-focused object, treat Studio current context as a
required input before specialist dispatch:

```bash
renku studio current --json
```

Continue only when Studio current returns the object kind and durable id needed
for the next command. Do not infer a scene, Beat, Cast Member, Location,
Lookbook, or dialogue from nearby project data.

When the user addresses a scene as `Scene 22`, `22A`, or another production
number, resolve it before specialist dispatch:

```bash
renku screenplay scene-number resolve --number <production-number> --json
```

Pass the returned durable `sceneId` to the specialist. The production number may
remain in human-facing handoff prose, but must not become duplicate persisted
artifact metadata.


## Codex Sandbox And Studio Notifications

Renku CLI mutations notify the running Studio app through local HTTP at the Studio server URL, normally `http://localhost:5173`. In Codex, localhost HTTP is still network access. When Studio is running and a workflow will mutate project state, import media, apply Scene Beats revision operations, set active rows, or run generation/import commands that should refresh Studio, request sandbox/network permission before the first mutating command.

If a command reports `CLI026`, the mutation already succeeded but Studio was not notified. Do not blindly rerun non-idempotent mutations such as Scene Beats apply/create/reset or media import. Instead, report the warning, refresh/read back state, and use a separate Studio notification/recovery step if one is available with local network permission.

## Reference Files

- Read `references/department-map.md` when classifying user intent or choosing a specialist.
- Read `references/workflow-playbooks.md` for multi-step requests such as idea-to-movie, selected-scene generation, cast refinement, or location work.
- Read `references/cli-coverage-and-gaps.md` when deciding whether a request is fully supported today or needs an honest gap explanation.
- Read `references/specialist-handoff-checklists.md` before handing work to a specialist skill or reading back completion state.

## Routing Loop

Use this loop for every request:

1. **Orient**: identify the open project, current Studio selection, and the minimum state needed for the request.
2. **Diagnose**: decide whether the next step is screenplay, analysis, visual language, casting, production design, Beat design, media generation, or production readiness.
3. **Dispatch**: use the specialist skill that owns the artifact. Do not directly write screenplay, analysis, Lookbook, Scene Beats, or media generation JSON when the specialist skill owns that workflow.
4. **Verify**: read back the durable state with the CLI.
5. **Advance**: name the next supported step and any unresolved prerequisite.

## Specialist Ownership

- Use `screenplay-drafter` for deterministic FDX import, screenplay creation,
  and screenplay revisions.
- Use `screenplay-analyst` for critique, three-act analysis, structure notes,
  and revision guidance. The Studio destination is **Analysis > Screenplay
  Analysis**.
- Use `casting-director` for Cast Member facts, Cast Design, costume continuity, voice casting notes, and cast media readiness.
- Use `production-designer` for Location and Prop facts, Location Design, Prop
  Design, set dressing, atmosphere, and production-design media readiness.
- Use `inspiration-analyzer` for Visual Language Inspiration folder analysis.
- Use `lookbook-designer` for durable Production Lookbook and Storyboard Lookbook creation, revision, and Inspiration source linkage.
- Use `scene-beat-designer` for Scene Beats and Beat iteration.
- Use `shot-planner` for Scene Shot Plans, individual Shot iteration, order,
  Beat coverage, and selected-image coordination.
- Use `media-producer` for all Renku media generation specs, managed estimates
  and approved runs, Codex external generation, inspection, slicing, and
  supported focused attachments.

Not first-class today:

- Shot Video authoring and its First Frame, Last Frame, and Video Prompt image
  inputs. Do not route to `shot.first-frame`, `shot.last-frame`,
  `shot.video-prompt`, or `shot.video-take`, and do not infer replacement
  commands.
- Costume-variant media and voice media. Keep their design notes in Cast Design and hand off only existing cast media purposes to `media-producer`.
- Set-dressing media, sound, music, editorial, and final assembly skills.

## Non-Negotiables

- Do not write directly to `.renku/project.sqlite`.
- Do not invent project, scene, Beat, Cast Member, Location, Prop, asset, Scene Beats revision, Lookbook, or generation ids or numbers.
- Do not run Renku-managed paid generation without Renku estimate review and
  the exact returned approval token. Use Generation Context `workflowPolicy`
  to decide whether either execution lane also needs a conversational
  confirmation; do not impose a separate skill-owned default.
- Preserve explicit user choices for provider/model, authored values, exact
  references, Beat ids, costs, and approvals.
- Do not use obsolete command aliases or compatibility paths.
- Do not hide missing prerequisites with guesses or fallbacks.
