# Shot Plan CLI Workflow

## Read

```bash
renku screenplay beats context --scene <scene-id> --json
renku screenplay beats show --active --scene <scene-id> --json
renku shot-plan list --scene <scene-id> --json
renku shot-plan show --shot-plan <shot-plan-id> --json
```

Carry Beat coverage by durable Beat id. When grounding Shot prose, use the
Beat's stable `screenplayBlockIds` and referenced Cast Member, Location, and
Prop ids from current context; never reconstruct Block identity from an index.

## Validate And Create

```bash
renku shot-plan validate --file tmp/operations/shot-plan-create.json --json
renku shot-plan create --file tmp/operations/shot-plan-create.json --json
```

Creation accepts zero, one, or several initial Shots.

## Focused Iteration

```bash
renku shot-plan validate --file tmp/operations/shot-plan-update.json --json
renku shot-plan update --shot-plan <shot-plan-id> --file tmp/operations/shot-plan-update.json --json

renku shot-plan validate --file tmp/operations/shot.json --json
renku shot-plan shot add --shot-plan <shot-plan-id> --file tmp/operations/shot.json --json
renku shot-plan shot add --shot-plan <shot-plan-id> --file tmp/operations/shot.json --placement start --json
renku shot-plan shot add --shot-plan <shot-plan-id> --file tmp/operations/shot.json --placement before --shot <anchor-shot-id> --json
renku shot-plan shot update --shot-plan <shot-plan-id> --shot <shot-id> --file tmp/operations/shot.json --json
renku shot-plan shot move --shot-plan <shot-plan-id> --shot <shot-id> --position <one-based-position> --json
renku shot-plan shot remove --shot-plan <shot-plan-id> --shot <shot-id> --json
```

`--position 1` means the first Shot. Core stores zero-based positions.
For add, `--placement` is `start`, `end`, `before`, or `after`; `before` and
`after` require the durable anchor in `--shot`. Core allocates the stable Shot
number. Append uses the next whole number, insertion uses a suffix, move keeps
the number, and removal never releases it.
Recover a removed Shot through `renku trash list` and `renku trash restore`.

## Plan Operations

```bash
renku shot-plan copy --shot-plan <shot-plan-id> --json
renku shot-plan delete --shot-plan <shot-plan-id> --json
```

Copy receives the next Scene-local Plan number and restarts copied Shot numbers
at `1..N` in authored order. It creates new Shot ids and independently copies only each selected image
into new Asset, AssetFile, and Shot-owned path identities. Delete is
recoverable.
