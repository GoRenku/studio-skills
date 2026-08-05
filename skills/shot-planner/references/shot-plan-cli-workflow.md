# Shot Plan CLI Workflow

## Read

```bash
renku screenplay beat-sheet context --scene <scene-id> --json
renku screenplay beat-sheet show --active --scene <scene-id> --json
renku shot-plan list --scene <scene-id> --json
renku shot-plan show --shot-plan <shot-plan-id> --json
```

Carry Beat coverage by durable Beat id. When grounding Shot prose, use the
Beat's stable `screenplayBlockIds` and referenced Cast Member, Location, and
Prop ids from current context; never reconstruct Block identity from an index.

## Validate And Create

```bash
renku shot-plan validate --file <shot-plan-create.json> --json
renku shot-plan create --file <shot-plan-create.json> --json
```

Creation accepts zero, one, or several initial Shots.

## Focused Iteration

```bash
renku shot-plan validate --file <shot-plan-update.json> --json
renku shot-plan update --shot-plan <shot-plan-id> --file <shot-plan-update.json> --json

renku shot-plan validate --file <shot.json> --json
renku shot-plan shot add --shot-plan <shot-plan-id> --file <shot.json> --json
renku shot-plan shot update --shot-plan <shot-plan-id> --shot <shot-id> --file <shot.json> --json
renku shot-plan shot move --shot-plan <shot-plan-id> --shot <shot-id> --position <one-based-position> --json
renku shot-plan shot remove --shot-plan <shot-plan-id> --shot <shot-id> --json
```

`--position 1` means the first Shot. Core stores zero-based positions.
Recover a removed Shot through `renku trash list` and `renku trash restore`.

## Plan Operations

```bash
renku shot-plan copy --shot-plan <shot-plan-id> --json
renku shot-plan delete --shot-plan <shot-plan-id> --json
```

Copy creates new Shot ids and independently copies only each selected image
into new Asset, AssetFile, and Shot-owned path identities. Delete is
recoverable.
