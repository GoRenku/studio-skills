# Lookbook CLI Workflow

Use JSON output for every command.

1. Open or confirm the project:

```bash
renku project open <project-name> --json
renku project current --json
```

2. Read current Lookbooks:

```bash
renku lookbook list --json
```

3. Read a target Lookbook before updating:

```bash
renku lookbook show --lookbook <lookbook-id> --json
```

4. Validate before writing:

```bash
renku lookbook validate --file lookbook.json --json
```

5. Create or update:

```bash
renku lookbook create --name "Lookbook Name" --file lookbook.json --json
renku lookbook update --lookbook <lookbook-id> --file lookbook.json --json
```

6. Set active only when intended:

```bash
renku lookbook set-active --lookbook <lookbook-id> --json
```

7. Import example images after files exist in the project:

```bash
renku media import --purpose lookbook.image --target lookbook:<lookbook-id> --source <project-relative-path> --sections palette,lighting --json
renku lookbook image set-sections --image <lookbook-image-id> --sections camera,texture --json
renku lookbook card-image set --lookbook <lookbook-id> --image <lookbook-image-id> --json
```

Use `--image` for Lookbook image IDs. Use `--file` only for JSON input files. Use `--source` for project-relative media source files.

Source Inspiration relationships:

```bash
renku lookbook inspiration list --lookbook <lookbook-id> --json
renku lookbook inspiration set --lookbook <lookbook-id> --file source-inspirations.json --json
```

Successful mutation reports include `resourceKeys`. Treat those as Studio refresh keys, not as creative content.
