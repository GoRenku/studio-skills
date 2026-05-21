# Screenplay JSON Workflow

Use this reference for command order and validation when creating or revising Renku Studio screenplay data.

## Current Project

Screenplay commands operate on the current authoring project.

```bash
renku create urban-basilica --title "Basilica"
renku project open urban-basilica --json
renku project current --json
```

If a screenplay command fails because no current project is set, open the project first.

## Create A First Screenplay

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

Read the current canonical state first:

```bash
renku screenplay show --json
```

Use durable IDs from that output in update, delete, move, parent, and placement fields.
For top-level screenplay edits such as `storyArc`, use `screenplay.update` and
include every `screenplay` field you want to keep.

```bash
renku screenplay validate --file samples/urban-basilica/updates/update-scene-full-replacement.json --json
renku screenplay apply --file samples/urban-basilica/updates/update-scene-full-replacement.json --json
```

Use `--dry-run` for broad edits:

```bash
renku screenplay apply --file <operations-json> --dry-run --json
```

The update samples in `samples/urban-basilica/updates/` use placeholder durable
IDs such as `cast_urban`, `act_act-1`, `location_edirne-foundry`,
`sequence_seq-004`, and `scene_scene-003`. Replace them with IDs from
`generatedIds` or the latest `renku screenplay show --json` output before
applying a sample to a real project.

`add-act-and-update-story-arc-with-mixed-references.json` deliberately mixes
existing act IDs with a newly added act key inside `storyArc.acts[].actReference`.
That is valid because the new act is created in the same apply request.

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
