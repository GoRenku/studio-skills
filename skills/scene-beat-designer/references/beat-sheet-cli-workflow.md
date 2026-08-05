# Beat Sheet CLI Workflow

```bash
renku project open <project-name> --json
renku screenplay scene-number resolve --number <production-number> --json
renku screenplay beat-sheet context --scene <scene-id> --json
renku screenplay beat-sheet list --scene <scene-id> --json
renku screenplay beat-sheet show --active --scene <scene-id> --json
```

For a full document:

```bash
renku screenplay beat-sheet validate --file <beat-sheet.json> --json
renku screenplay beat-sheet write --file <beat-sheet.json> --json
```

For focused revision:

```bash
renku screenplay beat-sheet validate-operations --file <operations.json> --json
renku screenplay beat-sheet apply --file <operations.json> --dry-run --json
renku screenplay beat-sheet apply --file <operations.json> --json
```

For an older history row:

```bash
renku screenplay beat-sheet set-active \
  --scene <scene-id> \
  --beat-sheet <beat-sheet-id> \
  --json
```

After a write or apply:

```bash
renku screenplay beat-sheet storyboard status \
  --scene <scene-id> \
  --beat-sheet <beat-sheet-id> \
  --json
```

Use durable Beat ids from the active document. Do not resolve display labels by guessing.
Production numbers are transient addressing references; persisted Beat Sheet
documents continue to contain only durable `sceneId` values.

Use the exact stable Block ids and referenced Cast Member, Location, and Prop
ids returned by Beat Sheet context. Do not translate Block order into indexes.
