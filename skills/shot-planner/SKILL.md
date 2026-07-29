---
name: shot-planner
description: Create, inspect, and iteratively revise Renku Studio Scene Shot Plans and individual Shots through the focused CLI. Use when the user asks for a shot list, coverage plan, cinematic breakdown, Shot title or description changes, Shot reordering/removal, Beat coverage changes, or a selected Shot image.
---

# Shot Planner

Author the mutable Scene-owned Shot Plan. Keep durable state behind Renku CLI
commands and keep creative interpretation in the agent/user loop.

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
renku screenplay beat-sheet context --scene <scene-id> --json
renku screenplay beat-sheet show --active --scene <scene-id> --json
renku shot-plan list --scene <scene-id> --json
renku shot-plan show --shot-plan <shot-plan-id> --json
```

Read `references/shot-plan-cli-workflow.md` for create and iteration commands.
Read Cast, Location, Lookbook, nearby Scene, and exact visual assets only when
the creative choice requires them. Read exact Cast Member and Location handles
from current context before using `@handle` references.

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

## Identity Rules

- Use exact ids from CLI or Studio selection.
- Resolve a user-facing one-based Shot number against the current ordered
  report. Never persist that number as identity.
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
  so do not append Scene titles, Beat numbers, coverage labels, framing, or
  other technical qualifiers to a title.
- Keep duration approximate; do not create a timeline.
- Do not author video-generation state or a completion status.
- Do not write `.renku/project.sqlite` directly.
