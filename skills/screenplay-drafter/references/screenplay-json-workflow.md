# Screenplay JSON Workflow

Use this reference for command order and validation when creating or revising Renku Studio screenplay data.

## Current Project

Screenplay commands operate on the current authoring project.
The user must either provide an existing Renku project name or let the skill
create a new project. Treat user-facing "project ID" as the CLI
`<project-name>`.

For an existing project:

```bash
renku project open urban-basilica --json
```

For a new project:

```bash
renku create urban-basilica --title "Basilica" --json
```

`renku create` opens the new project as the current authoring project and its
JSON report includes `currentProject`. Do not run `renku project open` after a
successful create.

If a screenplay command fails because no current project is set, open an
existing project or create a new project first.

Before any screenplay create/apply command, inspect screenplay state:

```bash
renku screenplay status --json
```

Route from the status result:

- `exists: false`: use `renku screenplay create`.
- `exists: true`: use `renku screenplay show --json`, then `renku screenplay apply`.

## Create A First Screenplay

Use this path only when `renku screenplay status --json` reports `exists: false`.
Author a JSON document with `kind: "screenplayCreate"`.

```bash
renku screenplay validate --file samples/urban-basilica/create-screenplay.json --json
renku screenplay create --file samples/urban-basilica/create-screenplay.json --json
```

For a cautious pass:

```bash
renku screenplay create --file samples/urban-basilica/create-screenplay.json --dry-run --json
```

The create report includes `generatedIds`. Save those mappings mentally or read them again with `renku screenplay show --json` before later edits.

## Revise An Existing Screenplay

Use this path whenever `renku screenplay status --json` reports `exists: true`.
Read the current canonical state first:

```bash
renku screenplay show --json
```

Use durable IDs from that output in update, delete, move, parent, and placement fields.
For top-level screenplay metadata edits, use `screenplay.update` and include every `screenplay` field you want to keep.
Do not create a new full screenplay over an existing project screenplay.

```bash
renku screenplay validate --file samples/urban-basilica/updates/update-scene-full-replacement.json --json
renku screenplay apply --file samples/urban-basilica/updates/update-scene-full-replacement.json --json
```

Use `--dry-run` for broad edits:

```bash
renku screenplay apply --file <operations-json> --dry-run --json
```

Always use `--dry-run` before top-level `screenplay.update`, full scene
replacement, deletes, moves, or broad restructuring.

The update samples in `samples/urban-basilica/updates/` use placeholder durable
IDs such as `cast_urban`, `act_act-1`, `location_edirne-foundry`,
`sequence_seq-004`, and `scene_scene-003`. Replace them with IDs from
`generatedIds` or the latest `renku screenplay show --json` output before
applying a sample to a real project.

`add-act-with-new-sequence.json` demonstrates adding a new act, sequence, and scene through focused operations.

## Read Helpers

```bash
renku screenplay status --json
renku screenplay cast list --json
renku screenplay cast show <cast-member-id> --json
renku screenplay location list --json
renku screenplay location show <location-id> --json
renku screenplay act list --json
renku screenplay act show <act-id> --json
renku screenplay sequence list --act <act-id> --json
renku screenplay sequence show <sequence-id> --json
renku screenplay scene list --sequence <sequence-id> --json
renku screenplay scene show <scene-id> --json
```

## Handling Reports

Successful mutation reports include:

- `valid: true`;
- `warnings`;
- `changes`;
- `generatedIds` for newly created records;
- `resourceKeys` for Studio refresh.

Warnings do not block the command. Errors do block the command and are written as structured diagnostics. Fix all error issues before retrying.
