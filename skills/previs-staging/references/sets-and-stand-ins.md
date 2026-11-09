# Sets And Stand-ins

These are shared documents. A Location has one set layout, used by every
staging at that Location. A Cast Member and a Prop each have one stand-in. Write
them before the staging that uses them; a staging write fails while one is
missing.

```bash
renku location set-layout schema
renku location set-layout show  --project <name> --location <id> --json
renku location set-layout write --project <name> --location <id> --file tmp/operations/previs/set-layout.json --expected-version <new|n> --json
renku cast stand-in schema
renku cast stand-in write --project <name> --cast <cast-member-id> --file tmp/operations/previs/stand-in.json --expected-version <new|n> --json
renku prop stand-in schema
renku prop stand-in write --project <name> --prop <prop-id> --file tmp/operations/previs/prop.json --expected-version <new|n> --json
```

## Location set layout

Build the set from the Location's sheets and description: inspect the spatial
or plan sheet and the hero image, not only text. Keep it rough and readable:
walls, openings, the main furniture and anything the action uses. A council
chamber fits in about a hundred blocks; never model ornament.

```json
{ "objects": [
  { "key": "council-table", "label": "Council table", "blocks": [
    { "shape": "box", "position": [0, 0.94, 0], "size": [1.8, 0.15, 5], "color": "#67503A" },
    { "shape": "box", "position": [-0.68, 0.45, -1.95], "size": [0.16, 0.9, 0.18], "color": "#4F3E2F" } ] } ] }
```

- An object is one selectable piece the director recognizes (walls, table,
  chairs, windows). Give it a plain label.
- Shapes: `box`, `cylinder` (width is the diameter), `sphere`, `wedge` (a ramp
  that is full height on its north side). `position` is the centre, `size` is
  width, height and depth, `yaw` turns it in degrees.
- Put the floor at `y = 0` (a thin box just below it). Place the main action
  area near the origin and the master view looking north.
- Muted, distinct colors help: the stand-ins should stand out from the set.

When a scene needs a change to the shared set (a door that was missing, a table
in the wrong place), change the set layout itself and tell the director that
every scene at the Location changes with it. The director can also unlock the
set in Studio and drag pieces.

## Stand-ins

```json
{ "height": 1.86, "color": "#DCA637", "details": ["beard", "apron"] }
```

Take height and the one or two most recognizable details from the character
sheet: `beard`, `goatee`, `crown`, `apron`, `longHair`, `hat`, `helmet`. Choose
colors that tell the cast apart in a wide shot. Extras are written inside the
staging with the same fields and belong to that plan only.

A Prop stand-in is a few blocks around the Prop's floor origin. Plan-only items,
like a drawing on a table or one scene's crates, are dressing in the staging,
not Props.
