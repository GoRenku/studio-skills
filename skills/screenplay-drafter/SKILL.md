---
name: screenplay-drafter
description: Create and revise Renku Studio screenplay JSON as the persisted screenplay source of truth. Use when a user wants help figuring out a story, gathering the needed brief, developing a script, screenplay, short film, feature, story arc, cast, locations, dialogue, narration, scene settings, action lines, or Renku screenplay create/apply JSON for the screenplay CLI.
---

# Screenplay Drafter

Use this skill to help a user move from story idea or revision request to a playable screenplay authored as Renku Studio screenplay JSON, so Renku Studio can render and visualize the screenplay.

Screenplay craft and Renku persistence go hand in hand. Think like a screenwriter, then encode the result in valid Renku screenplay data so the authored project stays current.

## Start Here

1. Decide what kind of work the user is asking for:

   - New screenplay from a rough idea.
   - New screenplay from a detailed brief.
   - Revision of an existing screenplay.
   - Focused craft help, such as scene structure, dialogue, cast, locations, narration, or story arc.

   For focused craft help, still keep Renku as the target artifact. Diagnose the story problem, decide the craft change, then express the accepted change as `screenplayCreate` or `screenplayOperations` JSON. If the user is choosing between alternatives, describe the options briefly and make clear which Renku change each option would become.

2. Gather or infer the story brief before writing JSON.

   Minimum useful inputs:

   - Scenario overview, more detailed than a logline.
   - Target format and length, such as 5-minute short, short film, feature, pilot, or custom page/minute target.
   - Intended audience and content boundaries.
   - Tone, genre, and any style references.
   - Main cast members, relationships, wants, needs, and pressure points.
   - Time period, world rules, and relevant background context.
   - Primary locations and why they matter dramatically.
   - Main conflict, stakes, dramatic question, and consequences.
   - Required moments, themes, research constraints, or production constraints.

   Ask only for missing choices that materially change the story. If the user wants momentum or asks you to proceed, make clear assumptions and record them in `screenplay.assumptionsMade`.

3. Gather supporting information when the premise depends on facts.

   - Use the user's supplied material first.
   - For historical, biographical, technical, legal, cultural, or place-specific stories, identify what must be true for the script to work.
   - Keep sourced facts separate from dramatized inventions.
   - Put sources or source notes in `screenplay.researchSources` when available.
   - Put invented bridges, unresolved facts, and creative guesses in `screenplay.assumptionsMade`.

4. Shape the story before writing pages.

   Use a three-act structure by default unless the user's format calls for something else. For very short scripts, keep the act model lightweight but still identify:

   - Hook.
   - Inciting incident or first turn.
   - Midpoint, escalation, or major reversal.
   - Climax.
   - Resolution.

   Length guidance:

   - One screenplay page roughly equals one screen minute.
   - Very short: 1-3 pages.
   - 5-minute short: about 5 pages.
   - 10-minute short: about 10 pages.
   - Short film: roughly 5-30 pages.
   - Feature: roughly 80-120 pages.

5. Draft playable scenes.

   - Give each scene a want, obstacle, reveal, reversal, or decision.
   - Keep action visual, present tense, and production-readable.
   - Use dialogue for behavior, pressure, conflict, and subtext.
   - Avoid novelistic interiority unless it is expressed through action, dialogue, narration, or voice-over.
   - Use narration, title cards, supers, shots, and transitions only when they help the script.

6. Use screenplay conventions, even though the final artifact is JSON.

   - Treat each scene setting as the source for a rendered slugline, such as `INT. DINER - NIGHT`, `EXT. ROOFTOP - DAWN`, or a special heading such as `OVER BLACK.`
   - Use action blocks for visible or audible screen action. Keep them lean, present tense, and free of unfilmable internal thoughts.
   - Use dialogue blocks for spoken lines only. The speaker comes from `castMemberReference`; use `extension` for `V.O.`, `O.S.`, or similar delivery notes.
   - Use parentheticals sparingly for playable behavior or delivery that is not already clear from the line.
   - Use `shot`, `super`, `title_card`, `special_heading`, and `transition` blocks when the script needs those formal elements.
   - Avoid camera-direction clutter unless a shot instruction is essential to the story, rhythm, or later generation workflow.

7. Express the authored screenplay or revision as Renku Studio screenplay JSON and validate it.

   Renku owns durable IDs. Agents author temporary keys for new records, run the Renku commands, then use Renku's generated IDs for later edits.

## Project Preflight

Screenplay commands operate on the current Renku authoring project. Resolve that
project before writing, validating, creating, or applying screenplay JSON.

The user must either provide an existing Renku project name or let the skill
create a new project. Treat a user-supplied project ID as the Renku CLI
`<project-name>`.

1. For an existing project, open the provided Renku project name:

```bash
renku project open <project-name> --json
```

2. For a new project, derive or ask for a kebab-case project name and title, then create it:

```bash
renku create <project-name> --title <title> --json
```

`renku create` opens the created project as the current authoring project. Do
not run `renku project open` again after a successful create.

3. Before any screenplay mutation, inspect screenplay state:

```bash
renku screenplay status --json
```

Use the status result to choose the command path:

- `exists: false`: create the first screenplay with `screenplayCreate` and `renku screenplay create`.
- `exists: true`: revise the existing screenplay with `screenplayOperations` and `renku screenplay apply`.
- `exists: true` and only one existing scene changes: use
  `screenplaySceneRevision` with `renku screenplay scene revise --scene <scene-id>`.

Use `renku screenplay revision list`, `renku screenplay revision show`, and
`renku screenplay revision restore` when the user asks to inspect or restore
screenplay history.

## Create A First Screenplay

Use this path only after `renku screenplay status --json` reports `exists: false`.

1. Build a `screenplayCreate` JSON document from the developed brief.
2. Include the creative development in the top-level `screenplay` object:

   - `title`
   - `intendedAudience`
   - `targetLengthLabel`
   - `estimatedMinutes`
   - `genrePrimary` and `genreSecondary`
   - `tone`
   - `ratingIntent`
   - `boundaries`
   - `logline`
   - `summary`
   - `premiseOverview`
   - `centralConflict`
   - `dramaticQuestion`
   - `themes`
   - `historicalBasis`
   - `dramatizedElements`
   - `researchSources`
   - `assumptionsMade`

3. Add cast, locations, acts, sequences, scenes, and blocks that support the screenplay's dramatic shape.

   For a short piece, draft the full requested scope when feasible. For a feature, pilot, or broad long-form idea, do not attempt a full draft unless the user explicitly asks; create the developed arc plus the opening pages, requested scene sequence, or next useful writing unit.

4. Validate and create:

```bash
renku screenplay validate --file <screenplay-json> --json
renku screenplay create --file <screenplay-json> --json
```

5. Use `--dry-run` before create when the edit is broad or risky.

## Revise An Existing Screenplay

Use this path whenever `renku screenplay status --json` reports `exists: true`.

1. Read the current state first:

```bash
renku screenplay show --json
```

2. Understand the requested story change before choosing operations:

   - What story problem is being solved?
   - Which cast, locations, acts, sequences, scenes, or blocks are affected?
   - Does the revision change continuity, structure, tone, audience promise, or running time?
   - Do `summary`, `centralConflict`, `dramaticQuestion`, `themes`, or `assumptionsMade` need to change too?

3. Draft a focused `screenplayOperations` JSON document.
4. Validate and apply:

```bash
renku screenplay validate --file <operations-json> --json
renku screenplay apply --file <operations-json> --json
```

5. Use `--dry-run` before apply when the edit is broad or risky.
6. Preserve the user's story intent. Ask only for missing choices that materially change the story, scope, or command shape.

## Reference Files

- Read only the reference files needed for the task.
- Read `references/screenplay-writing-guidelines.md` before creating a new screenplay, giving focused craft help, or making a substantial story, scene, cast, location, dialogue, tone, or structure revision.
- Read `references/screenplay-json-contract.md` before writing JSON. It defines create documents, operation documents, references, placement, and canonical output.
- Read `references/screenplay-json-workflow.md` when you need project preflight, command order, validation, dry-run, or output handling.
- Use `samples/urban-basilica/create-screenplay.json` as the full create example.
- Use `samples/urban-basilica/updates/*.json` for focused update examples. Replace placeholder IDs with IDs from `generatedIds` or `renku screenplay show --json`.

## Non-Negotiables

- Use `key`, not `localKey`, for new records in create/add input.
- Do not provide `id` for a new cast member, location, act, sequence, or scene. Renku generates it.
- Use durable `id` values for existing records, update targets, delete targets, move targets, parent targets, and placement targets.
- Run project preflight and `renku screenplay status --json` before any screenplay create/apply.
- Do not run `renku screenplay create` when status reports `exists: true`; use `renku screenplay apply`.
- Do not replace an existing screenplay with a fresh full create document. Read the current screenplay and apply focused operations.
- Reference objects contain exactly one of `id` or `key`.
- Represent the initial three-act structure through real `acts`, `sequences`, `scenes`, `purpose`, and `storyFunction` fields.
- Use `locationReferences`, `castMemberReferences`, and `castMemberReference` in create/apply input.
- Expect canonical `renku screenplay show --json` output to use durable `id`, `locationIds`, and `castMemberId`, without authoring keys or reference objects.
- `screenplay.update` replaces the top-level `screenplay` object. Include every screenplay field you want to keep.
- Do not invent block IDs. Scene updates replace the scene's full `blocks` array.

## Quality Bar

- Make the story playable: clear wants, obstacles, stakes, turns, and consequences.
- Keep action visual, present tense, and production-readable.
- Use dialogue for behavior, pressure, and subtext, not exposition that can be shown.
- Keep cast and location handles stable, lower-case, and unique across cast and locations.
- Record important assumptions in `screenplay.assumptionsMade` when the user asks you to proceed with incomplete information.
