---
name: movie-director
description: Coordinate Renku Studio movie-making workflows across screenplay, analysis, visual language, casting, locations, scene shot design, media generation, and production readiness. Use when the user wants a top-level filmmaking sidekick, asks what to do next, wants to make or revise a movie across multiple departments, needs help choosing which Renku Studio skill to use, or asks for director-like guidance that dispatches to specialist skills such as screenplay-drafter, screenplay-analyst, inspiration-analyzer, lookbook-designer, casting-director, production-designer, scene-shot-designer, and media-producer.
---

# Movie Director

Use this skill as the top-level Renku Studio coordinator for making a movie. It routes work to specialist skills, keeps dependencies visible, and helps the user advance without pretending unsupported departments are complete.

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
for the next command. For existing Shot Video Take prompt-sheet work, it must
identify an existing take id before routing to `media-producer`. If Studio
current shows only a scene, shot list, new-take form, unrelated tab, or no take
id, stop and ask the user to open the take or provide the take id. Do not infer
a take, scene, shot, cast member, location, lookbook, or dialogue from nearby
project data.


## Codex Sandbox And Studio Notifications

Renku CLI mutations notify the running Studio app through local HTTP at the Studio server URL, normally `http://localhost:5173`. In Codex, localhost HTTP is still network access. When Studio is running and a workflow will mutate project state, import media, apply shot-list operations, set active rows, or run generation/import commands that should refresh Studio, request sandbox/network permission before the first mutating command.

If a command reports `CLI026`, the mutation already succeeded but Studio was not notified. Do not blindly rerun non-idempotent mutations such as shot-list apply/write or media import. Instead, report the warning, refresh/read back state, and use a separate Studio notification/recovery step if one is available with local network permission.

## Reference Files

- Read `references/department-map.md` when classifying user intent or choosing a specialist.
- Read `references/workflow-playbooks.md` for multi-step requests such as idea-to-movie, selected-scene generation, cast refinement, or location work.
- Read `references/cli-coverage-and-gaps.md` when deciding whether a request is fully supported today or needs an honest gap explanation.
- Read `references/specialist-handoff-checklists.md` before handing work to a specialist skill or reading back completion state.

## Routing Loop

Use this loop for every request:

1. **Orient**: identify the open project, current Studio selection, and the minimum state needed for the request.
2. **Diagnose**: decide whether the next step is screenplay, analysis, visual language, casting, production design, shot design, media generation, or production readiness.
3. **Dispatch**: use the specialist skill that owns the artifact. Do not directly write screenplay, analysis, Lookbook, Scene Shot List, or media generation JSON when the specialist skill owns that workflow.
4. **Verify**: read back the durable state with the CLI.
5. **Advance**: name the next supported step and any unresolved dependency.

## Specialist Ownership

- Use `screenplay-drafter` for screenplay creation and screenplay revisions.
- Use `screenplay-analyst` for critique, three-act analysis, structure notes, and revision guidance.
- Use `casting-director` for Cast Member facts, Cast Design, costume continuity, voice casting notes, and cast media readiness.
- Use `production-designer` for Location facts, Location Design, props, set dressing, atmosphere, and production-design media readiness.
- Use `inspiration-analyzer` for Visual Language Inspiration folder analysis.
- Use `lookbook-designer` for durable Movie Lookbook and Storyboard Lookbook creation, revision, typed selection, and Inspiration source linkage.
- Use `scene-shot-designer` for Scene Shot Lists and shot-list iteration.
- Use `media-producer` for all Renku media generation specs, estimates, approved runs, inspection, slicing, and media imports.
- Treat take-owned "multi-shot storyboard" or video prompt-sheet requests as
  `shot.video-prompt-sheet` media work. Route them to `media-producer` with
  `take:<take-id>` after reading
  `renku take authoring context --take <take-id> --json`; do not send this work
  to `scene-shot-designer`.

Not first-class today:

- Costume-variant media and voice media. Keep their design notes in Cast Design and hand off only existing cast media purposes to `media-producer`.
- Prop media, set-dressing media, sound, music, editorial, and final assembly skills.

## Non-Negotiables

- Do not write directly to `.renku/project.sqlite`.
- Do not invent project, scene, shot, cast, location, asset, shot-list, Lookbook, or generation ids.
- Do not run paid generation without a Renku estimate and explicit approval token.
- Preserve explicit user choices for models, parameters, selected assets, shot ids, input modes, costs, and approvals.
- Do not use obsolete command aliases or compatibility paths.
- Do not hide missing prerequisites with guesses or fallbacks.
