---
name: screenplay-drafter
description: Create, import, and revise Renku Studio screenplays as the persisted screenplay source of truth. Use when a user wants to import a Final Draft .fdx file, develop a script, screenplay, short film, feature, story arc, dialogue, narration, scene settings, action lines, or author Renku screenplay create/apply JSON.
---

# Screenplay Drafter

Use this skill to help a user move from story idea or revision request to a playable screenplay authored as Renku Studio screenplay JSON, so Renku Studio can render and visualize the screenplay.

Screenplay craft and Renku persistence go hand in hand. Think like a screenwriter, then encode the result in valid Renku screenplay data so the authored project stays current.

## Start Here

1. Decide what kind of work the user is asking for:

   - New screenplay from a rough idea.
   - New screenplay from a detailed brief.
   - Deterministic import of an existing Final Draft `.fdx` screenplay.
   - Revision of an existing screenplay.
   - Focused craft help, such as scene structure, dialogue, cast, locations, narration, or story arc.

   For focused craft help, still keep Renku as the target artifact. Diagnose the story problem, decide the craft change, then express the accepted change as a complete Screenplay input or a focused `operations` batch. If the user is choosing between alternatives, describe the options briefly and make clear which Renku change each option would become.

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

   Ask only for missing choices that materially change the story. If the user wants momentum or asks you to proceed, make clear assumptions and record them in direct Project information fields through `renku info set`.

3. Gather supporting information when the premise depends on facts.

   - Use the user's supplied material first.
   - For historical, biographical, technical, legal, cultural, or place-specific stories, identify what must be true for the script to work.
   - Keep sourced facts separate from dramatized inventions.
   - Put sources or source notes in Project `researchSources` when available.
   - Put invented bridges, unresolved facts, and creative guesses in Project
     `assumptions`, `openQuestions`, and `nextSteps`.

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

   - Author the exact Scene `heading`, such as `INT. DINER - NIGHT`, `EXT. ROOFTOP - DAWN`, or `OVER BLACK.`
   - Use action blocks for visible or audible screen action. Keep them lean, present tense, and free of unfilmable internal thoughts.
   - Use Dialogue blocks with an authored `characterName`, ordered `parts`, and
     `extensions` such as `V.O.` or `O.S.`. Bind the cue to a Cast Member with
     a separate `speaker` reference.
   - Use parentheticals sparingly for playable behavior or delivery that is not already clear from the line.
   - Use `shot`, `super`, `titleCard`, `specialHeading`, and `transition` blocks when the script needs those formal elements.
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

If the user identifies an existing scene by production number, such as
`Scene 22` or `22A`, resolve it before reading or authoring the mutation:

```bash
renku screenplay scene-number resolve --number <production-number> --json
```

Use the returned durable `sceneId` in Screenplay operation JSON and `--scene`
flags. A Scene may carry an exact authored `productionNumber`, but that value
is not identity or canonical order. Do not infer an id from a Section, title,
or array position.

Use the status result to choose the command path:

- all counts are zero and the user supplied an `.fdx`: import it with
  `renku screenplay import-fdx --file <absolute-fdx-path> --json`.
- all counts are zero and the screenplay will be authored in Renku: create it
  with `renku screenplay create`.
- any count is nonzero: revise the existing Screenplay with a focused
  `operations` batch and `renku screenplay apply`.

Use `renku screenplay revision list`, `renku screenplay revision show`, and
`renku screenplay revision restore` when the user asks to inspect or restore
screenplay history.

## Import A Final Draft Screenplay

Use this path only for a readable absolute `.fdx` path and an empty Screenplay:

```bash
renku screenplay import-fdx --file /absolute/path/to/script.fdx --json
```

Treat the returned character cues, Scene Headings, and tagged subjects as
evidence, not Project identities. After import:

1. Read the canonical Screenplay plus existing Cast Members, Locations, and
   Props.
2. Ask the user when a cue alias, composite setting, or mentioned object is
   ambiguous.
3. Use `casting-director` and `production-designer` to create or update facts.
4. Add focused Screenplay `reference.*` operations only after the durable fact
   ids exist.

Do not ask the importer to create or match facts. Do not report formatting or
ScriptNotes as omissions; they remain only in the retained source. There is no
re-import, merge, overwrite, or provenance-deletion workflow in this iteration.

## Create A First Screenplay

Use this path only after `renku screenplay status --json` reports zero opening
elements, Sections, Scenes, Blocks, and references.

1. Store story and development metadata on Project through `renku info set`.
2. Build a complete Screenplay JSON object with `opening`, `scenes`, optional
   `sections`, `structure`, and `references`. The command context supplies the
   create intent; do not add a `kind` envelope.
3. Ensure Cast Members, Locations, and Props already exist through their owning
   specialist/CLI commands. Author plain screenplay text, then bind those
   Project subjects through separate Screenplay references. Do not put
   `@handle` tokens into screenplay prose.

   For a short piece, draft the full requested scope when feasible. For a feature, pilot, or broad long-form idea, do not attempt a full draft unless the user explicitly asks; create the developed arc plus the opening pages, requested scene sequence, or next useful writing unit.

4. Create through Core validation:

```bash
renku screenplay create --file <screenplay-json> --json
```

## Revise An Existing Screenplay

Use this path whenever Screenplay status contains any authored content.

1. Read the current state first:

```bash
renku screenplay show --json
```

2. Understand the requested story change before choosing operations:

   - What story problem is being solved?
   - Which Project subjects, Sections, Scenes, Blocks, dialogue parts, or references are affected?
   - Does the revision change continuity, structure, tone, audience promise, or running time?
   - Do Project `synopsis`, `centralConflict`, `dramaticQuestion`, `themes`, or `assumptions` need to change too?

3. Draft a focused `{ "operations": [...] }` JSON document.
4. Apply through Core validation:

```bash
renku screenplay apply --file <operations-json> --json
```

5. Preserve the user's story intent. Ask only for missing choices that materially change the story, scope, or command shape.

## Reference Files

- Read only the reference files needed for the task.
- Read `references/screenplay-writing-guidelines.md` before creating a new screenplay, giving focused craft help, or making a substantial story, scene, cast, location, dialogue, tone, or structure revision.
- Read `references/screenplay-json-contract.md` before writing JSON. It defines create documents, operation documents, references, placement, and canonical output.
- Read `references/screenplay-json-workflow.md` when you need project preflight, command order, validation, dry-run, or output handling.
- Use `samples/urban-basilica/create-screenplay.json` as the full create example.
- Use `samples/urban-basilica/updates/*.json` for focused update examples. Replace placeholder IDs with IDs from `generatedIdentities` or `renku screenplay show --json`.

## Non-Negotiables

- Do not create, update, delete, or move Cast Members, Locations, or Props through Screenplay JSON. Use the owning specialist/CLI commands first.
- Use `key`, not `localKey`, for new records in create/add input.
- Do not provide `id` for a new Opening Element, Scene, nested Block/dialogue value, Section, structure entry, or reference. Renku generates those ids.
- Use durable `id` values for existing records, update targets, delete targets, move targets, parent targets, and placement targets.
- Run project preflight and `renku screenplay status --json` before any screenplay create/apply.
- Run project preflight and confirm an empty Screenplay before FDX import.
- Never re-run FDX import for a Project that already has an import record.
- Do not run `renku screenplay create` when any Screenplay content exists; use `renku screenplay apply`.
- Do not replace an existing screenplay with a fresh full create document. Read the current screenplay and apply focused operations.
- Reference objects contain exactly one of `id` or `key`.
- Treat Scenes as canonical. Acts and Sequences are optional non-owning Sections; a flat ordered Scene list is valid.
- Author plain text and use separate references whose subjects are durable Cast Member, Location, or Prop ids and whose targets use Scene/Block/dialogue ids or request-local keys.
- Expect canonical reads to contain durable IDs only. Mutation reports return `generatedIdentities`.
- Existing nested IDs preserve identity during `scene.update`; keys create new nested values, and omitted nested values are deleted after final-state dependency validation.

## Quality Bar

- Make the story playable: clear wants, obstacles, stakes, turns, and consequences.
- Keep action visual, present tense, and production-readable.
- Use dialogue for behavior, pressure, and subtext, not exposition that can be shown.
- Keep Cast Member, Location, and Prop handles stable in their owning Project fact commands; do not embed them in screenplay prose.
- Record important assumptions in direct Project fields when the user asks you to proceed with incomplete information.
