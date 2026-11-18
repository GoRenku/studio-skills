---
name: shot-planner
description: Create, inspect, and iteratively revise Renku Studio Scene Shot Plans and individual Shots through the focused CLI. Use when the user asks for a shot list, coverage plan, cinematic breakdown, Shot title or description changes, Shot reordering/removal, or Beat coverage changes. For media generation for an existing Shot or Shot Plan, use media-producer.
---

# Shot Planner

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
  `{"commands": [{"args": ["shot-plan", "show", "--shot-plan", "<id>", "--json"]}], "onFailure": "stop"}`.
  There is no shell, so no pipes, redirects or `$(...)`, and a selection
  argument needs no quoting. A command that needs an id from an earlier
  answer goes in a second batch.
- Your workbench is on your computer: the documents you write, saved answers
  and notes. Send a document a command reads in that command's `files`, keyed
  by the `tmp/` path the command names.
- An answer over 100,000 characters, or any answer when `saveAnswers` is true,
  comes back as a download link. Fetch it with `curl` and read it with jq,
  sed or a script on your computer.
- Read this skill's own files, including `samples/`, from the installed
  plugin. The permission steps below do not apply to Renku commands.

For Shot Plans:

- Look at Shot images and visual references with `renku_view`.
- Selected Shot images and plan videos come through `media-producer`. It
  imports a provider's output with `--job` and `--receipt`, the recorded job
  and the provider's reply, and a Codex built-in image with its request as
  `--provenance`, so Core still places the file from its provenance. Ask for
  `--select` on that import when the image should become the Shot's current
  image.

This skill authors the **Shot List** type (`shot-list`). For 3D blocking and director iteration, use `previs-staging` to author a **Previs** plan (`previs`), or `blender-shot-planner` when the user asks for Blender. All are Scene Shot Plans.

This skill requires the installed Renku runtime. If `renku` is unavailable, stop and direct the user to `https://gorenku.com`; do not substitute ad hoc files for the CLI-owned project state.

## Efficient Command Use

Use `--project <project-name>` on Shot Plan commands. Reuse current Scene/Beat/Plan context during one unchanged iteration, and consume returned exact Plan/Shot identities. Create/update/shot add/shot update validate before writing; separate validate is for validation-only requests or a review pause. Put related fields in the existing authoring document instead of one mutation per field. Refresh after relevant edits, revision conflicts, or intervening user review; read back when the report lacks needed detail. Do not confuse Shot, Clip, Take, or revision ids.

Consult the relevant CLI reference/help once if syntax is unknown, then reuse verified syntax for this task. Do not discover syntax by attempting mutations. Do not invent `project list`. If a known permission denial blocks cache/output/config or local-network access, explain the requirement and use the authorized host permission flow; do not repeat the denied attempt, read secrets, disable cache persistence, or change permissions. `CLI026` means the mutation succeeded: report the notification warning without replaying the mutation.

## Project Workspace

Keep temporary agent working files inside the current Project's categorized
`tmp/` tree. Retained Previs authoring source belongs in the canonical Shot Plan
`previs/source/` directory; Core registers completed source revisions and renders.
Never create operation JSON, Generation Specs, import manifests,
QA images, downloads, crops, or scratch files at the Project root.

- Use `tmp/operations/` for CLI authoring documents, including create, update,
  design, analysis, Lookbook, Scene Beats, Shot Plan, and import JSON.
- Use `tmp/operations/media-generation/` for Media Producer review and
  provenance documents.
- Use `tmp/media/` for temporary generated, downloaded, transformed, or cropped
  media; use `tmp/qa/` for review evidence and `tmp/scratch/` for other temporary
  inputs.
- Create category folders lazily. Let Renku commands copy accepted content into
  durable owner folders; never construct durable asset paths in the skill.
- Keep an external user source outside the Project when possible. If a temporary
  in-Project copy is necessary, place it under `tmp/scratch/`.


Author the mutable Scene-owned Shot Plan as the director and cinematographer's
production-planning artifact. Convert story intent into deliberate camera
coverage: ordered Shots, Beat coverage, framing, optics, movement, focus,
lighting intent, blocking, and approximate duration when relevant. Keep durable
state behind Renku CLI commands and creative interpretation in the agent/user
loop.

Do not use Shot Planner to create or regenerate Beat Storyboards. Those are
pre-production narrative-alignment images owned by logical Scene Beats and
generated through `scene.storyboard-sheet`. A selected Shot Image belongs to
one exact production Shot and uses `shot.image`; never substitute one ownership
model for the other.

## Workflow

For media-only work on an existing Shot or Shot Plan, resolve the exact target
if unknown, then route directly to `media-producer`. Skip plan-authoring reads
below unless the user also asks to change the plan. Generation context owns the
current media briefing; Previs revision/source reads remain required where used.

1. Resolve the current project and exact Scene or selected Shot Plan:

```bash
renku studio current --json
renku director context --selection '<current-selection-json>' --json
```

If the user names a production scene number, resolve it with
`renku screenplay scene-number resolve`.

2. Read only the context needed:

```bash
renku screenplay beats context --scene <scene-id> --project <project-name> --json
renku screenplay beats show --active --scene <scene-id> --project <project-name> --json
renku shot-plan list --scene <scene-id> --project <project-name> --json
renku shot-plan show --shot-plan <shot-plan-id> --project <project-name> --json
```

Read `references/shot-plan-cli-workflow.md` for create and iteration commands.
Use the active Scene Beats revision's stable `screenplayBlockIds` and its referenced Cast
Member, Location, and Prop ids. Read those Project subjects, the Lookbook,
nearby Scenes, and exact visual assets only when the creative choice requires
them. Read exact subject handles from current context before using `@handle`
references in Shot prose.

3. Read `references/shot-writing-guidelines.md` before authoring prose and
`references/shot-brief-vocabulary.md` before authoring a brief. Use
`references/shot-plan-json-contract.md` and copy the closest file from
`samples/`.

4. Let the mutation validate; use separate validation for validation-only intent or a review pause. Use focused Shot commands for later edits;
never read-modify-write the complete plan.

5. Read the exact Shot Plan back after mutation. There is no final, ready, or
done state.

6. For selected Shot imagery, read
`references/selected-image-workflow.md` and hand generation to
`media-producer`. When the accepted output should become the selected image,
import it with `--select` as one intent.

7. When the user asks to generate video from the current plan, hand off the
   exact Shot Plan id to `media-producer`. Do not create video state on the
   plan. The media workflow reads context with `--purpose
   shot-plan.video-generation --target shot-plan:<shot-plan-id>` and attaches
   accepted outputs as independent Project video Assets. Exact provenance lets Core place
   the accepted file in the corresponding human-readable Scene/Plan folder;
   never calculate that folder from a displayed number.

## Identity Rules

- Use exact ids from CLI or Studio selection.
- Resolve a user-facing Plan or Shot number by exact match against the Core
  report, then use the returned durable id. Never derive a Shot label from
  `position + 1`; moves preserve stable Shot numbers.
- Never author or choose Plan or Shot numbers. Core allocates and reserves them.
- Never guess a Shot Plan or Shot from a title fragment.
- Ask which plan is intended when several plans exist and selection is absent.

## Boundaries

- Keep Markdown, brief intent, prompts, and images opaque to Studio runtime.
- Use relevant Shot description sections, exact context-provided `@handle`
  references, and deliberate strong Markdown as described in the writing
  guidelines. Omit empty sections.
- Do not invent technical optics, lighting, timing, or movement choices.
- Use `optics.focusTarget` for one primary optical subject, plane, or distance,
  never as a list of everyone or everything that should remain legible. Put
  shared spatial legibility and deep-focus intent in `optics.intent`.
- When the Shot planning choice is known, persist it in the matching brief
  field instead of leaving the glanceable Camera or Optics group empty while
  mentioning the same choice only in the description.
- Keep plan and Shot titles concise. Coverage already owns Beat relationships,
  so do not append Scene titles, coverage labels, framing, or
  other technical qualifiers to a title.
- Keep duration approximate; do not create a timeline.
- Do not author video-generation state or a completion status.
- Do not write `.renku/project.sqlite` directly.
