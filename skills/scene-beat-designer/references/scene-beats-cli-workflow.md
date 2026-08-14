# Scene Beats CLI Workflow

```bash
renku project open <project-name> --json
renku screenplay scene-number resolve --number <production-number> --json
renku screenplay beats context --scene <scene-id> --json
renku screenplay beats list --scene <scene-id> --json
renku screenplay beats show --active --scene <scene-id> --json
renku screenplay beats show --revision <revision-id> --json
```

For first creation or an explicit full reset:

```bash
renku screenplay beats validate --file tmp/operations/scene-beats.json --json
renku screenplay beats create --file tmp/operations/scene-beats.json --json
renku screenplay beats reset --file tmp/operations/scene-beats.json --json
```

For a focused immutable revision:

```bash
renku screenplay beats validate-operations --file tmp/operations/scene-beats-operations.json --json
renku screenplay beats apply --file tmp/operations/scene-beats-operations.json --dry-run --json
renku screenplay beats apply --file tmp/operations/scene-beats-operations.json --json
```

Restore any retained revision by changing only the active pointer:

```bash
renku screenplay beats set-active \
  --scene <scene-id> \
  --revision <revision-id> \
  --json
```

Read exact-revision Storyboard status:

```bash
renku screenplay beats storyboard status \
  --scene <scene-id> \
  --revision <revision-id> \
  --json
```

Use durable Scene, revision, Beat, Block, Cast Member, Location, and Prop ids
returned by Core. Production numbers are human addressing references, not ids.
Beat numbers are stable Core-authored labels, not array positions.
