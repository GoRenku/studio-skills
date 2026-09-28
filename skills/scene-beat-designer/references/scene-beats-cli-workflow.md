# Scene Beats CLI Workflow
## Efficient Command Use

Use `--project <project-name>` on screenplay beats commands when the project is known. Read current Beat context once; list/show only for missing revision detail. Create, reset, and apply validate before writes. Separate validation is for validation-only intent or a review pause; retain a meaningful apply --dry-run when reviewing a proposed change. Use returned exact revision and Beat identities for the next step. Refresh context after relevant edits or intervening user review, and keep Storyboard/media review separate.

Consult the relevant CLI reference/help once if syntax is unknown, then reuse verified syntax for this task. Do not discover syntax by attempting mutations. Do not invent `project list`. If a known permission denial blocks cache/output/config or local-network access, explain the requirement and use the authorized host permission flow; do not repeat the denied attempt, read secrets, disable cache persistence, or change permissions. `CLI026` means the mutation succeeded: report the notification warning without replaying the mutation.


```bash
# Use --project <project-name> on these commands; no project open is needed.
renku screenplay scene-number resolve --number <production-number> --project <project-name> --json
renku screenplay beats context --scene <scene-id> --project <project-name> --json
renku screenplay beats list --scene <scene-id> --project <project-name> --json
renku screenplay beats show --active --scene <scene-id> --project <project-name> --json
renku screenplay beats show --revision <revision-id> --project <project-name> --json
```

For first creation or an explicit full reset:

```bash
# Optional validation-only or review step:
renku screenplay beats validate --file tmp/operations/scene-beats.json --project <project-name> --json
renku screenplay beats create --file tmp/operations/scene-beats.json --project <project-name> --json
renku screenplay beats reset --file tmp/operations/scene-beats.json --project <project-name> --json
```

For a focused immutable revision:

```bash
# Optional validation-only or review step:
renku screenplay beats validate-operations --file tmp/operations/scene-beats-operations.json --project <project-name> --json
renku screenplay beats apply --file tmp/operations/scene-beats-operations.json --dry-run --project <project-name> --json
renku screenplay beats apply --file tmp/operations/scene-beats-operations.json --project <project-name> --json
```

Restore any retained revision by changing only the active pointer:

```bash
renku screenplay beats set-active --project <project-name> \
  --scene <scene-id> \
  --revision <revision-id> \
  --json
```

Read exact-revision Storyboard status:

```bash
renku screenplay beats storyboard status --project <project-name> \
  --scene <scene-id> \
  --revision <revision-id> \
  --json
```

Use durable Scene, revision, Beat, Block, Cast Member, Location, and Prop ids
returned by Core. Production numbers are human addressing references, not ids.
Beat numbers are stable Core-authored labels, not array positions.
