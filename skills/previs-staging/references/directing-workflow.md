# Directing A Staging

Read current Studio selection and explicit Project identity, then the Scene,
active Beats, the selected plan and the relevant Cast, Location and Prop
designs and media through Renku. Verify the returned Project and Scene identity
before interpreting an empty response. Inspect actual sheets; their text alone
does not establish geography, proportions or appearance. Resolve ambiguous
spatial choices with the director when they change the shot.

Create a plan with `renku shot-plan create`:

```json
{"kind":"shotPlanCreate","type":"previs","sceneId":"<exact-scene-id>","title":"Harbor walk and talk","coverage":null,"shots":[]}
```

## Translate direction into marks

- Say which way "left" means for the current request (screen-left of the master
  view, actor-left, or a world direction) when it matters.
- Keep approach, arrival, settled hold and turn distinct. A conversation starts
  after the arrival mark, not at the beginning of the walk.
- Put each physical change on a mark at the frame where it is complete, with
  `blendFrames` for how long it takes. When the moment it begins matters (a
  slow turn, a lean as a line starts), put the `cue` on its own mark at that
  onset frame. Leave holds and small adjustments without cues.
- How a figure starts is its first mark. The director can drag, Option-drag to
  turn, or set poses in the Staging tab; at the start of the shot those edits
  change the first mark, later they add marks.
- Camera changes inside a shot are camera marks with a `cue`; cuts are `cuts`.
- When the director asks how to do it by hand in the Staging tab: right-click
  a camera's row on the timeline for Add coverage here, Cut to this camera
  here, Start a camera move here and Remove this move, or use "Add coverage
  from …" on the camera panel. A move is made by starting it at one moment,
  then changing the camera at a later one.
- "Also get Loukas's close on the whisper" or "let the Urban close roll a
  little longer" is extra `coverage` for that camera, not a cut: the edit stays
  as the director edited it.
- Lines come from the actual Scene dialogue. For "Mara says the third turn at
  8 seconds", resolve the third turn and its exact text and put the line at
  frame 192. A different speaker in the Scene or in the selected audio is a real
  conflict to raise with the director. Do not invent speech or time-stretch audio.

## The description

The staging's `description` is saved with each recorded revision and is what
the AI video handoff reads. Treat it as the complete, model-neutral creative
direction for the staging as it is now:

- Rewrite it whole on every iteration; never append a change log. Describe the
  resulting film in time order: setting, subjects, opening composition, action,
  camera and cuts, dialogue with timing, and ending.
- Resolve shorthand ("the original wide", "same as before") into the actual
  composition, speakers and lines. Do not invent creative facts.
- Keep change history, tool details and provider instructions out of it.
- Keep it consistent with the marks, cuts and lines. Before recording, reread it
  as an outside reader would.
- Describe the edit. Extra coverage needs no second description: a coverage
  video's generation takes its direction from that video, with the
  description, cues and lines for its stretch.

## Working with the director

The director may move figures, change poses, edit cuts, add or rename cameras,
or drag extra coverage in the Staging tab while you work. Their edits are saved
immediately. Always `show` before changing the staging, and treat a version
conflict as "someone else changed it": read again and reapply only your change.
When you change a shared set or stand-in, say so, because it changes other
scenes too.

## Review

Record a revision, then extract frames at the start, each arrival, each cut,
each turn and the final frame into `tmp/qa/` and look at them. Check that
figures do not stand inside furniture, that a seated figure's chair is under
them, that cameras frame what the edit is for, and that cue notes happen on
screen at their frames. Look at the start and end of each coverage video too:
it should frame what the director wanted the extra stretch for. Distinguish
checks you ran from visual judgment.
