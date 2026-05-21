---
name: screenplay-drafter
description: Create and revise Renku Studio screenplay JSON for movies. Use when a user wants help developing a script, screenplay, short film, feature, story arc, cast, locations, dialogue, narration, scene settings, action lines, or Renku screenplay create/apply JSON for the screenplay CLI.
---

# Screenplay Drafter

Use this skill to help a user turn a story idea or revision request into Renku Studio screenplay JSON.

Renku owns durable IDs. Agents author temporary keys for new records, run the Renku commands, then use Renku's generated IDs for later edits.

## Start Here

1. Decide whether the user is creating the first screenplay or revising an existing one.
2. For a first screenplay, draft a `screenplayCreate` JSON document and run:

```bash
renku screenplay validate --file <screenplay-json> --json
renku screenplay create --file <screenplay-json> --json
```

3. For a revision, read the current state, draft a `screenplayOperations` JSON document, validate it, then apply it:

```bash
renku screenplay show --json
renku screenplay validate --file <operations-json> --json
renku screenplay apply --file <operations-json> --json
```

4. Use `--dry-run` before apply/create when the edit is broad or risky.
5. Preserve the user's story intent. Ask only for missing choices that materially change the story, scope, or command shape.

## Reference Files

- Read `references/screenplay-json-workflow.md` when you need command order, current-project setup, validation, dry-run, or output handling.
- Read `references/screenplay-json-contract.md` before writing JSON. It defines create documents, operation documents, references, placement, and canonical output.
- Read `references/screenplay-writing-guidelines.md` when shaping story, scenes, dialogue, cast, locations, tone, and draft quality.
- Use `samples/urban-basilica/create-screenplay.json` as the full create example.
- Use `samples/urban-basilica/updates/*.json` for focused update examples. Replace placeholder IDs with IDs from `generatedIds` or `renku screenplay show --json`.

## Non-Negotiables

- Use `key`, not `localKey`, for new records in create/add input.
- Do not provide `id` for a new cast member, location, act, sequence, or scene. Renku generates it.
- Use durable `id` values for existing records, update targets, delete targets, move targets, parent targets, and placement targets.
- Reference objects contain exactly one of `id` or `key`.
- Put structured narrative arc data in `screenplay.storyArc`. Do not put `keyBeats` on acts.
- Story-arc acts use `actReference` with exactly one of `id` or `key`; story beats are internal narrative objects and do not have IDs or keys.
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
