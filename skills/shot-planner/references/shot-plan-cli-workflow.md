# Shot Plan CLI Workflow

## Efficient Command Use

Use `--project <project-name>` on Shot Plan commands. Reuse current Scene/Beat/Plan context during one unchanged iteration, and consume returned exact Plan/Shot identities. Create/update/shot add/shot update validate before writing; separate validate is for validation-only requests or a review pause. Put related fields in the existing authoring document instead of one mutation per field. Refresh after relevant edits, revision conflicts, or intervening user review; read back when the report lacks needed detail. Do not confuse Shot, Clip, Take, or revision ids.

Consult the relevant CLI reference/help once if syntax is unknown, then reuse verified syntax for this task. Do not discover syntax by attempting mutations. Do not invent `project list`. If a known permission denial blocks cache/output/config or local-network access, explain the requirement and use the authorized host permission flow; do not repeat the denied attempt, read secrets, disable cache persistence, or change permissions. `CLI026` means the mutation succeeded: report the notification warning without replaying the mutation.

## Read

```bash
renku screenplay beats context --scene <scene-id> --project <project-name> --json
renku screenplay beats show --active --scene <scene-id> --project <project-name> --json
renku shot-plan list --scene <scene-id> --project <project-name> --json
renku shot-plan show --shot-plan <shot-plan-id> --project <project-name> --json
```

Carry Beat coverage by durable Beat id. When grounding Shot prose, use the
Beat's stable `screenplayBlockIds` and referenced Cast Member, Location, and
Prop ids from current context; never reconstruct Block identity from an index.

## Validate And Create

```bash
# Optional validation-only or review step:
renku shot-plan validate --file tmp/operations/shot-plan-create.json --project <project-name> --json
renku shot-plan create --file tmp/operations/shot-plan-create.json --project <project-name> --json
```

Creation accepts zero, one, or several initial Shots.

## Focused Iteration

```bash
# Optional validation-only or review step:
renku shot-plan validate --file tmp/operations/shot-plan-update.json --project <project-name> --json
renku shot-plan update --shot-plan <shot-plan-id> --file tmp/operations/shot-plan-update.json --project <project-name> --json

# Optional validation-only or review step:
renku shot-plan validate --file tmp/operations/shot.json --project <project-name> --json
renku shot-plan shot add --shot-plan <shot-plan-id> --file tmp/operations/shot.json --project <project-name> --json
renku shot-plan shot add --shot-plan <shot-plan-id> --file tmp/operations/shot.json --placement start --project <project-name> --json
renku shot-plan shot add --shot-plan <shot-plan-id> --file tmp/operations/shot.json --placement before --shot <anchor-shot-id> --project <project-name> --json
renku shot-plan shot update --shot-plan <shot-plan-id> --shot <shot-id> --file tmp/operations/shot.json --project <project-name> --json
renku shot-plan shot move --shot-plan <shot-plan-id> --shot <shot-id> --position <one-based-position> --project <project-name> --json
renku shot-plan shot remove --shot-plan <shot-plan-id> --shot <shot-id> --project <project-name> --json
```

`--position 1` means the first Shot. Core stores zero-based positions.
For add, `--placement` is `start`, `end`, `before`, or `after`; `before` and
`after` require the durable anchor in `--shot`. Core allocates the stable Shot
number. Append uses the next whole number, insertion uses a suffix, move keeps
the number, and removal never releases it.
Recover a removed Shot through `renku trash list` and `renku trash restore`.

## Plan Operations

```bash
renku shot-plan copy --shot-plan <shot-plan-id> --project <project-name> --json
renku shot-plan delete --shot-plan <shot-plan-id> --project <project-name> --json
```

Copy receives the next Scene-local Plan number and restarts copied Shot numbers
at `1..N` in authored order. It creates new Shot ids and independently copies only each selected image
into new Asset, AssetFile, and Shot-owned path identities. Delete is
recoverable.
