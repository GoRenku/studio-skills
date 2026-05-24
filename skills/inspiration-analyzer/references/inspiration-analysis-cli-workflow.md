# Inspiration Analysis CLI Workflow

Use this reference for command order and report handling.

## Current Project

Open the project first:

```bash
renku project open <project-name> --json
```

If a command fails because no current project is open, open the project and retry.

## Folder Discovery

List folders when the user did not provide a folder ID:

```bash
renku inspiration list --json
```

Show the selected folder:

```bash
renku inspiration show --folder <folder-id> --json
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

Validate without writing:

```bash
renku inspiration analysis validate --folder <folder-id> --file <analysis-json> --json
```

Write after validation passes:

```bash
renku inspiration analysis write --folder <folder-id> --file <analysis-json> --json
```

Read back:

```bash
renku inspiration analysis show --folder <folder-id> --json
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
