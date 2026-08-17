---
name: shot-planner
description: Create, inspect, and iteratively revise Renku Studio Scene Shot Plans and individual Shots through the focused CLI. Use when the user asks for a shot list, coverage plan, cinematic breakdown, Shot title or description changes, Shot reordering/removal, Beat coverage changes, or a selected Shot image.
---

# Shot Planner

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

1. Resolve the current project and exact Scene or selected Shot Plan:

```bash
renku studio current --json
renku director context --selection '<current-selection-json>' --json
```

If the user names a production scene number, resolve it with
`renku screenplay scene-number resolve`.

2. Read only the context needed:

```bash
renku screenplay beats context --scene <scene-id> --json
renku screenplay beats show --active --scene <scene-id> --json
renku shot-plan list --scene <scene-id> --json
renku shot-plan show --shot-plan <shot-plan-id> --json
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

4. Validate before every mutation. Use focused Shot commands for later edits;
never read-modify-write the complete plan.

5. Read the exact Shot Plan back after mutation. There is no final, ready, or
done state.

6. For selected Shot imagery, read
`references/selected-image-workflow.md` and hand generation to
`media-producer`. When the accepted output should become the selected image,
import it with `--select` as one intent.

7. When the user asks to generate video from the current plan, hand off the
   exact Shot Plan id to `media-producer`. Do not create video state on the
   plan. The media workflow reads context with
   `--authored-from-shot-plan <shot-plan-id>` and attaches accepted outputs as
   independent Project video Assets. Exact frozen provenance lets Core place
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
