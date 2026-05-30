# Shot List CLI Workflow

Use the Renku CLI for every metadata mutation. Do not edit project SQLite directly.

## Resolve The Project

Open a project when the user names one:

```bash
renku project open <project-name> --json
```

Check the current authoring project when needed:

```bash
renku project current --json
```

## Resolve The Scene

Prefer an explicit scene id from the user or Studio selection. If the user gives a human scene description, list screenplay structure first and pick only when the match is unambiguous.

```bash
renku screenplay show --json
renku screenplay scene list --sequence <sequence-id> --json
renku screenplay scene show <scene-id> --json
```

## Read Context

```bash
renku screenplay shot-list context --scene <scene-id> --json
```

Read:

- project title and default aspect ratio;
- act, sequence, and scene labels;
- setting, story function, and ordered blocks;
- dialogue blocks and speakers;
- referenced cast and locations;
- active Lookbook text;
- active shot-list summary when present.

Use visual references only when the user asks:

```bash
renku screenplay shot-list context --scene <scene-id> --include-visual-references --json
```

## Validate Before Write

```bash
renku screenplay shot-list validate --file <shot-list-json> --json
```

Fix all errors. Warnings are allowed, but treat them as useful review notes.

Common warnings:

- a shot covers no screenplay block;
- dialogue blocks are uncovered;
- a shot has dialogue references that do not cite covered blocks;
- a cast member or location is outside the scene references and needs a note.

## Write And Confirm

```bash
renku screenplay shot-list write --file <shot-list-json> --json
renku screenplay shot-list show --active --scene <scene-id> --json
```

`write` creates a new history row and makes it active. Use `set-active` only to restore an earlier row:

```bash
renku screenplay shot-list list --scene <scene-id> --json
renku screenplay shot-list set-active --scene <scene-id> --shot-list <shot-list-id> --json
```

## Report Back

Summarize:

- shot count;
- coverage strategy;
- important visual choices;
- any unresolved open questions;
- whether the shot list is now active.
