# Screenplay Analysis CLI Workflow

Use the CLI as the only metadata boundary.

## 1. Resolve The Project

If the user named a project:

```bash
renku project open <project-name> --json
```

If the project is already current, continue.

## 2. Read Analysis Context

```bash
renku screenplay analyze context --json
```

The context includes project identity, screenplay metadata, ordered acts, sequences, scenes, blocks, cast labels, location labels, default criteria, and active analysis summary.

Do not scrape the Studio UI for analysis data.

## 3. Author JSON

Write a complete `kind: "screenplayAnalysis"` document using `screenplay-analysis-json-contract.md`.

## 4. Validate

```bash
renku screenplay analyze validate --file <analysis-json> --json
```

Fix every structured error. Unknown fields are rejected.

## 5. Write

```bash
renku screenplay analyze write --file <analysis-json> --json
```

The write command creates a new history row and makes it active.

## 6. Confirm

```bash
renku screenplay analyze show --active --json
```

Report the active analysis id, the short summary, and the highest-impact critique.

## Useful Reads

```bash
renku screenplay analyze list --json
renku screenplay analyze show --analysis <analysis-id> --json
```

## Rules

- `validate` never writes.
- `write` always creates a new analysis row.
- `set-active` changes only the active pointer.
- Suggestions are critique only and do not create screenplay rows.
