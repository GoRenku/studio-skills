# Inspiration Analysis CLI Workflow

Use this reference for command order and report handling.

## Current Project

Resolve the project once from the user or current task context:

Use the known project name with `--project <project-name>`; no `project open` is needed.

If project identity is missing, resolve it once. Do not retry a known permission denial or change global selection for this workflow.

## Folder Discovery

List folders when the user did not provide a folder ID:

```bash
renku inspiration list --project <project-name> --json
```

Show the selected folder:

```bash
renku inspiration show --folder <folder-id> --project <project-name> --json
```

The report includes:

- `folder.id`
- `folder.name`
- `folder.projectRelativePath`
- `folder.absolutePath`
- `analysis`, which may be `null`
- `resourceKeys`

Renku does not list individual image files. Use the filesystem:

```bash
cd "<folder.absolutePath>"
find . -maxdepth 1 -type f
```

## Validate And Write

For validation-only requests or a review pause, validate without writing:

```bash
renku inspiration analysis validate --folder <folder-id> --file tmp/operations/inspiration-analysis.json --project <project-name> --json
```

For authorized authoring, write directly; Core performs the same validation before writing:

```bash
renku inspiration analysis write --folder <folder-id> --file tmp/operations/inspiration-analysis.json --project <project-name> --json
```

Read back only if the mutation report lacks needed detail, the outcome is uncertain, or relevant state changed:

```bash
renku inspiration analysis show --folder <folder-id> --project <project-name> --json
```

Successful write reports include:

- `valid: true`
- `warnings`
- `project`
- `changes`
- `folder`
- `analysis`
- `resourceKeys`

Errors are structured diagnostics. Fix every error before retrying.
