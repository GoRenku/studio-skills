# Character Arc CLI Workflow

Character arcs are written right after a Screenplay Analysis, in the same
request. A re-analysis rewrites them.

## 1. Make The Project Current

`renku cast arc` commands work on the current authoring project. Open the
project explicitly, and confirm the analysis context you read is for the
same project:

```bash
renku project open <project-name> --json
```

## 2. Read What Exists

The analysis context lists every Cast Member with its current arc
(`characterArc`, or `null`), plus `role`, `want`, `need`, `arc` and
`description` when they are set. Many projects leave them empty, so read the
screenplay itself for the evidence:

```bash
renku screenplay analyze context --json
```

Print the arc contract (JSON Schema) instead of guessing field names:

```bash
renku cast arc schema --json
```

## 3. Author The Complete Set

Write ONE `characterArcs` document under `tmp/operations/character-arcs.json`
that holds the COMPLETE set of arcs. The write replaces every arc in the
project: any Cast Member not listed loses its arc. That is intended, because
the latest analysis decides who has an arc.

```json
{
  "kind": "characterArcs",
  "arcs": [
    { "castMemberId": "<cast id>", "arc": { "kind": "characterArc", "...": "..." } }
  ]
}
```

Each person has one arc. Ages are Looks of one Cast Member, so a younger age
never gets an arc of its own.

See `samples/character-arcs.json` for a full example. Its ids are
placeholders; use real ids from the context.

## 4. Validate, Then Write

```bash
renku cast arc validate --file tmp/operations/character-arcs.json --json
renku cast arc write --file tmp/operations/character-arcs.json --json
```

Validation reports every issue at once, with its location. Common fixes:

- turning points out of screenplay order;
- a `flat` arc without `truthHeld`, or a change arc without `need` and
  `falseBelief`;
- an unknown Scene id;
- a `characterSheetAssetFileId` that is not an available character sheet of
  that Cast Member.

## 5. Report

From the write report, tell the user which Cast Members got arcs (`written`)
and which lost one (`cleared`), with each arc type in plain words (Grows,
Holds firm, and so on).

## Adding Character Sheets Later

When character sheets are picked for costumes after the arcs were written:

1. Read the current arcs (`renku cast arc list --json`, then
   `renku cast arc show --cast <id> --json` for each).
2. Add the matching `characterSheetAssetFileId`s.
3. Write the complete set again.

## Useful Reads

```bash
renku cast arc list --json
renku cast arc show --cast <cast-member-id> --json
```

`freshness: "needsRefresh"` means the screenplay changed after the arcs were
written. Re-analyze to refresh them.
