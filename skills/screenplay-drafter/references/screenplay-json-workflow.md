# Screenplay JSON Workflow

Use this reference for command order and validation when creating or revising Renku Studio screenplay data.

## Current Project

Screenplay commands operate on the current authoring project.

```bash
renku project current --json
renku screenplay status --json
```

For an existing project, open it first:

```bash
renku project open <project-name> --json
```

For a new project, create it first:

```bash
renku create <project-name> --title <title> --json
```

`renku create` opens the new project as the current authoring project.

## Required Fact Preflight

Before screenplay create/apply, make sure referenced Cast Members and Locations exist:

```bash
renku cast list --json
renku location list --json
```

Create or revise missing facts through the owning command families:

```bash
renku cast validate --file <cast-operations-json> --json
renku cast apply --file <cast-operations-json> --json
renku location validate --file <location-operations-json> --json
renku location apply --file <location-operations-json> --json
```

Then use the durable ids in screenplay scene settings and dialogue blocks.

## Create A First Screenplay

Use this path only when `renku screenplay status --json` reports `exists: false`.
Author a `kind: "screenplayCreate"` document with `cast: []` and `locations: []`.

```bash
renku screenplay validate --file samples/urban-basilica/create-screenplay.json --json
renku screenplay create --file samples/urban-basilica/create-screenplay.json --json
```

For a cautious pass:

```bash
renku screenplay create --file samples/urban-basilica/create-screenplay.json --dry-run --json
```

## Revise An Existing Screenplay

Use this path whenever `renku screenplay status --json` reports `exists: true`.
Read the current canonical state first:

```bash
renku screenplay show --json
```

Use durable IDs from that output in update, delete, move, parent, placement, Cast Member reference, and Location reference fields.

```bash
renku screenplay validate --file samples/urban-basilica/updates/update-scene-full-replacement.json --json
renku screenplay apply --file samples/urban-basilica/updates/update-scene-full-replacement.json --json
```

Use `--dry-run` for broad edits:

```bash
renku screenplay apply --file <operations-json> --dry-run --json
```

## Read Helpers

```bash
renku screenplay status --json
renku screenplay show --json
renku cast list --json
renku cast show <cast-member-id> --json
renku location list --json
renku location show <location-id> --json
renku screenplay act list --json
renku screenplay sequence list --act <act-id> --json
renku screenplay scene list --sequence <sequence-id> --json
```

## Handling Reports

Successful mutation reports include `valid`, `warnings`, `changes`, `generatedIds`, and `resourceKeys`. Warnings do not block the command. Errors do block the command and are written as structured diagnostics.
