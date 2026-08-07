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

Before Screenplay create/apply, make sure referenced Cast Members, Locations,
and Props exist:

```bash
renku cast list --json
renku location list --json
renku prop list --json
```

Create or revise missing facts through the owning command families:

```bash
renku cast validate --file <cast-operations-json> --json
renku cast apply --file <cast-operations-json> --json
renku location validate --file <location-operations-json> --json
renku location apply --file <location-operations-json> --json
renku prop validate --file <prop-operations-json> --json
renku prop apply --file <prop-operations-json> --json
```

Then use durable subject ids in separate Screenplay references. Keep the exact
authored screenplay text free of `@handle` tokens.

For FDX import, reverse the order: import the deterministic screenplay first,
then use its candidate evidence alongside existing facts. Do not pre-create
facts by guessing from cue or heading strings.

## Import Final Draft FDX

Use only when Screenplay status is entirely empty:

```bash
renku screenplay import-fdx --file /absolute/path/to/script.fdx --json
```

The JSON report returns exact source provenance, counts, character-cue and
Scene-heading candidates, and optional tagged-subject evidence. It creates no
Cast Member, Location, Prop, or Screenplay reference. Return this evidence to
`movie-director`, which consumes `projectSettings.screenplayImport`, resolves
ambiguous identity with the user, and dispatches only enabled follow-up stages.
Add focused references with `renku screenplay apply` only after the coordinator
returns accepted durable ids.

Do not describe ScriptNotes, formatting, or editor state as warnings. Do not
retry the command as overwrite/merge; a Project can retain only one FDX import
in the current workflow.

## Create A First Screenplay

Use this path only when Screenplay status reports zero opening elements,
Sections, Scenes, Blocks, and references. Author the complete `opening`,
`scenes`, `sections`, `structure`, and `references` object without a `kind`.

```bash
renku screenplay create --file samples/urban-basilica/create-screenplay.json --json
```

## Revise An Existing Screenplay

Use this path whenever Screenplay status reports any authored content.
Read the current canonical state first:

```bash
renku screenplay show --json
```

Use durable IDs from that output in update, delete, move, parent, placement,
and reference fields. Use request-local keys only for new values in the same
atomic request.

When the user names a production scene number, resolve it first:

```bash
renku screenplay scene-number resolve --number <production-number> --json
```

Carry only the returned durable `sceneId` into persisted screenplay JSON.

```bash
renku screenplay apply --file samples/urban-basilica/updates/update-scene-full-replacement.json --json
```

## Read Helpers

```bash
renku screenplay status --json
renku screenplay show --json
renku cast list --json
renku cast show <cast-member-id> --json
renku location list --json
renku location show <location-id> --json
renku prop list --json
renku screenplay structure --json
renku screenplay section show <section-id> --json
renku screenplay scene show <scene-id> --json
renku screenplay scene-number list --json
renku screenplay scene-number resolve --number <production-number> --json
```

## Handling Reports

Successful mutation reports include `valid`, `warnings`,
`screenplayRevisionId`, `generatedIdentities`, and `resourceKeys`. Warnings do
not block the command. Errors block the command and are written as structured
diagnostics.
