# Staging Documents And Commands

## Space and time

- Metres. `x` points to the right of the master view, `y` up, `z` toward the
  master camera, so `-z` is "north" (deeper into the shot).
- A floor position is `[x, z]`; an object or camera position is `[x, y, z]`.
- Facing and turns are degrees counterclockwise seen from above: `0` faces north
  (`-z`), `90` faces west (`-x`), `-90` faces east (`+x`), `180` faces the camera.
- Time is in frames. Most stagings use 24 fps: frame 48 is 2.0 s. Every frame
  in a document must be below `frameCount`.

## Commands

```bash
renku shot-plan create --project <name> --file tmp/operations/previs/create.json --json
renku shot-plan staging schema
renku shot-plan staging show   --project <name> --shot-plan <id> --json
renku shot-plan staging write  --project <name> --shot-plan <id> --file tmp/operations/previs/staging.json --expected-version <new|n> --json
renku shot-plan staging record --project <name> --shot-plan <id> --json
renku shot-plan reference import --project <name> --shot-plan <id> --source <project-relative-image> --media-kind image --title "<title>" --json
```

`show` returns the resolved staging (`staging.staging` is the document you
edit), its `version`, the shared set and stand-ins it uses, and
`nextRevisionNumber`. The first write uses `--expected-version new`.

## The document

```json
{
  "frameRate": { "numerator": 24, "denominator": 1 },
  "frameCount": 240,
  "output": { "width": 1280, "height": 720 },
  "locationId": "<location id or null>",
  "cast": [ { "castMemberId": "<id>", "marks": [ ... ] } ],
  "extras": [ { "key": "net-mender", "label": "Net mender", "standIn": { "height": 1.45, "color": "#299F94", "details": [] }, "marks": [ ... ] } ],
  "props": [ { "propId": "<id>", "marks": [ ... ] } ],
  "dressing": [ ... ],
  "cameras": [ ... ],
  "cuts": [ ... ],
  "coverage": [ ... ],
  "dialogue": [ ... ],
  "description": "<Markdown>"
}
```

Keys (`extras[].key`, `dressing[].key`, `cameras[].key`) are lowercase words
joined by hyphens. Mark, line and cut ids must be unique in the whole staging;
coverage ids must be unique within `coverage`.
`samples/staging-cuts.json` is a complete fictional example.

### Figure marks (cast and extras)

Each figure needs at least one mark; its first mark sets `position` and is how
the figure starts. Marks are listed in frame order. Everything a mark sets is
reached at its frame: a walk travels from the previous position mark, and
pose, turn and look changes blend in over `blendFrames` just before the mark.

| Field | Meaning |
|---|---|
| `position` | An arrival: the figure walks from its previous position mark and arrives here at this frame. Walking steps and facing the way of travel happen by themselves. To hold, then walk, add a mark with the same position where the walk should start. |
| `facing` or `turnTo` | Be turned to a fixed facing, or toward a figure, prop, dressing piece or camera (tracking it). Never both on one mark. |
| `body` | `stand`, `sit`, `kneel`. |
| `torso` | `upright`, `lean`. A lean bends toward what the figure looks at; a seated lean half rises from the chair. |
| `arms` | `rest`, `point`, `reach`, `raiseArm`, `gesture` (talking), `working` (busy hands). |
| `lookAt` | A target, or `null` to look ahead. Turns the head within a natural range. |
| `blendFrames` | How long before this frame the pose, turn and look changes begin. Default 0.6 s. |
| `cue` | A direction note. It becomes an Action cue in the Previs tab. |

Targets: `{"kind":"cast","castMemberId":…}`, `{"kind":"extra","key":…}`,
`{"kind":"prop","propId":…}`, `{"kind":"dressing","key":…}`,
`{"kind":"camera","key":…}`. A target must be part of this staging.

### Props and dressing

A Prop uses its shared stand-in. Dressing belongs to this plan only: either
`blocks` (placed around the piece's position) or one `imageCard`. Object marks
set `position` (`[x, y, z]`, arrival), `yaw` (degrees) and, for image cards,
`unroll` from 0 (rolled up) to 1 (open). The first mark sets `position`.

An image card shows an image AssetFile of this plan: import it with
`shot-plan reference import` once the plan has a staging, then reference the
returned `assetFile.id`:

```json
{ "key": "drawing", "label": "Bombard drawing",
  "imageCard": { "assetFileId": "<id>", "size": [1.38, 0.95], "unrollFrom": "south" },
  "marks": [ { "id": "drawing-rolled", "frame": 0, "position": [0, 1.03, 0], "unroll": 0.07 },
             { "id": "drawing-open", "frame": 48, "unroll": 1 } ] }
```

### Cameras and cuts

A `fixed` camera has `position`, `aim` and `lens` (mm, 36 mm wide sensor). Its
camera marks are arrivals for `position`, `aim` and `lens`; to start a move,
add a mark that repeats the current values where the move begins. A `follow`
camera watches the midpoint of its `subjects` from `distance` behind and
`height` up, looking along `heading`, aiming at `aimHeight` and `lookAhead`
metres ahead; it has no camera marks. Camera mark `cue`s become Camera cues.

`cuts` choose the recorded camera: the first is at frame 0 and frames increase.
A cut's optional `label` names the shot segment in the Previs tab; otherwise the
camera label is used.

### Extra coverage

`coverage` is optional. Each stretch says a camera also films those frames,
whether or not the cuts show it; `endFrame` is exclusive, like a line's, and
may equal `frameCount`:

```json
"coverage": [ { "id": "coverage-loukas-close-576", "camera": "loukas-close", "startFrame": 576, "endFrame": 720 } ]
```

A camera's runs are its on-air spans from the cuts merged with its coverage
where they overlap or touch. Use coverage when the director wants a camera to
keep rolling past its cut, or a second angle on a moment the edit shows from
another camera. It never changes the edit.

- To let a camera roll on both sides of its cut, write one stretch over the
  whole run. Urban close on air at frames 310–466, rolling from 300 to 480:
  `{ "id": "coverage-urban-close-300", "camera": "urban-close", "startFrame": 300, "endFrame": 480 }`.
- Stretches of one camera must not overlap: join them into one stretch.
  Touching stretches are allowed and merge into one run.
- A stretch fully inside the camera's on-air spans adds nothing.
- When you remove a camera, remove its stretches too. When you move cuts,
  check that each stretch still films what the director asked for.

In the Staging tab the director drags a run's handles or draws on a camera's
row to add coverage; those edits arrive as `coverage` entries on your next
`show`.

### Full-length cameras

`fullLength` is optional on a camera. `true` means the camera also films the
whole staging as its own video, beside the edit. Leave the field out
otherwise. Use it when the director wants one camera's angle across the whole
scene, such as a master:

```json
{ "key": "shared-frame", "label": "The two men and the drawing", "lens": 153, "fullLength": true,
  "placement": { "kind": "fixed", "position": [ ... ], "aim": [ ... ] }, "marks": [ ... ] }
```

- The full-length video takes the place of that camera's extra coverage
  videos. Its `coverage` stretches stay in the staging and are filmed again
  when `fullLength` is removed.
- A camera the cuts keep on air for the whole staging gets no full-length
  video: the edit already is that video.
- It never changes the edit or the timeline.

Urban Basilica, "The Price of the Bombard" (1008 frames at 24 fps), with
coverage on `urban-single` at 212–314: turning on `fullLength` for
`shared-frame` records the edit, `shared-frame` 0–1008 and `urban-single`
212–314, which is 2,118 frames instead of 1,110.

The director turns full length on or off in the Record dialog's "Full-length
video" menu; those edits arrive as `fullLength` on your next `show`.

### Lines

```json
{ "id": "urban-gun", "speaker": {"kind":"cast","castMemberId":"<id>"}, "startFrame": 48, "endFrame": 155,
  "text": "<the exact Scene line>", "audio": { "assetFileId": "<audio id>", "offsetSeconds": 0.33 } }
```

Use the exact line from the Scene's dialogue. `audio` is optional: an existing
audio AssetFile and where in it the line starts. Studio plays it in the Staging
tab; recordings stay silent. The speaker nods slightly while the line plays.

## Errors

Every write is validated in full before anything is stored, and all issues come
back at once with JSON paths. Fix them and write again:
`CORE_STAGING_INVALID` (structure), `CORE_STAGING_KEY_DUPLICATE`,
`CORE_STAGING_FRAME_RANGE`, `CORE_STAGING_CUTS_INVALID`,
`CORE_STAGING_COVERAGE_INVALID` (unknown camera, or overlapping stretches of
one camera),
`CORE_STAGING_REFERENCE_MISSING` (unknown id, or a Cast Member, Prop or Location
without its stand-in or set), `CORE_STAGING_REFERENCE_KIND`,
`CORE_STAGING_SIZE_LIMIT`, `CORE_STAGING_VERSION_CONFLICT`,
`CORE_STAGING_PLAN_NOT_PREVIS`, `CORE_STAGING_PLAN_HAS_SCRIPT_REVISIONS`.
