# Shot List CLI Workflow

Use the Renku CLI for every metadata mutation. Do not edit project SQLite directly.

When Studio is running, metadata mutations also need to notify Studio through local HTTP. In Codex, that means requesting sandbox/network permission before mutating commands. Treat `CLI026` as a notification failure after a successful mutation, not as permission to rerun the mutation.

## Resolve The Project

Open a project when the user names one:

```bash
renku project open <project-name> --json
```

Check the current authoring project when needed:

```bash
renku project current --json
```

When the user refers to the selected Studio view, read the focused Studio context before falling back to prose matching:

```bash
renku studio current --json
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
- selected Movie Lookbook text when available;
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

## Apply Structural Edits

Use operation documents as the default path for expand, replace, delete, range, and focused update requests against an existing shot-list version:

```bash
renku screenplay shot-list validate-operations --file <operations-json> --json
renku screenplay shot-list apply --file <operations-json> --dry-run --json
renku screenplay shot-list apply --file <operations-json> --json
```

Operation documents must include explicit `sceneId`, `baseShotListId`, and
`activate`. Do not depend on the currently active shot list after target
discovery. Resolve user-facing labels such as "Shot 3" to durable `shotId`
values from the explicit base shot list before writing the operation document.

After apply, always read storyboard status for the created shot-list id:

```bash
renku screenplay shot-list storyboard status --scene <scene-id> --shot-list <shot-list-id> --json
```

Use the status report to identify missing or stale storyboard images for
media-producer handoff. If the user did not explicitly request text-only/no-media work, continue to that handoff instead of merely reporting that storyboard images are missing. The media-producer pass is responsible for selected Storyboard Lookbook and Storyboard Lookbook sheet readiness.

## Write And Confirm

```bash
renku screenplay shot-list write --file <shot-list-json> --json
renku screenplay shot-list show --active --scene <scene-id> --json
```

`write` creates a new full shot-list history row and makes it active. Use it for the first shot list or for an intentional complete replacement document. When a full replacement is based on an existing list, include `baseShotListId` so unchanged storyboard images can be preserved. Use `set-active` only to restore an earlier row:

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
- whether the shot list is now active;
- storyboard readiness, including any media-producer handoff already completed or still needed.
