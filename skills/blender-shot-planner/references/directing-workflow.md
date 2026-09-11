# Directing a Scene

Read current Studio selection and explicit Project identity, then the Scene,
active Beats, selected plan and relevant subject designs/media through Renku.
Verify returned Project and Scene identity before interpreting an empty response.
A mismatched context is a lookup problem, not permission to invent story content.
Inspect actual character/location sheets; their text alone does not establish
geography, proportions or appearance. Resolve ambiguous spatial choices with the
director when they materially change the shot.

Create with `renku shot-plan create --project <name> --file tmp/operations/previs/create.json --json`:

```json
{"kind":"shotPlanCreate","type":"previs","sceneId":"<exact-scene-id>","title":"Harbor approach","coverage":null,"shots":[]}
```

Use active coverage from context when relevant. Core allocates plan numbers.
Read back with `shot-plan show`; use `shot-plan previs show --shot-plan <id>` for
canonical source paths and revision history. Continue the exact plan on revisions.

## Translate direction into useful controls

Expose the coordinates, character positions, camera target/lens and timing that
this shot needs. Explain world axes and what “left” means for the current request
(screen-left, actor-left or a world coordinate). Keep approach, arrival, settled
hold and turn distinct: a three-second conversation starts after arrival, not at
the beginning of an approach. Some new actions need Python changes, not just numbers.

For “Mara says the third turn at 8 seconds”, resolve the actual third Scene dialogue
turn and exact line. Store that same directing decision in the plan's parameters:

```json
{"dialogue":[{"turn":3,"subject":"mara","text":"<exact resolved line>","startSeconds":8}]}
```

This is an example of scene-specific parameters, not a required universal schema.
The Python uses it for speaking gestures, gaze and reactions; the agent carries
it into the AI prompt and audio placement intent. Derive playback cues from that
same decision. Do not maintain separate conflicting timing copies. A different
speaker in the Scene or selected audio is a real conflict to clarify. Do not invent
speech, select another performance or time-stretch audio to conceal it.

## Write a self-contained revision description

Treat `description.md` as the complete, model-neutral creative direction for this
revision. On every iteration, integrate the latest feedback into the whole
description, preserve still-applicable decisions, and remove superseded or
contradictory prose. Describe the resulting film in temporal order, not the edits
that produced it. A reader must understand it without the conversation, earlier
revisions, review notes, source code or unseen media.

State the relevant setting, subjects, opening composition, action, camera/cuts,
dialogue and timing, and ending explicitly from known context. Resolve shorthand
such as “the original wide”, “accepted turns 2–5”, “same as before” and “the new
drawing” into the actual composition, speaker/lines, behavior and prop appearance.
Do not invent missing creative facts to make the description sound complete.

For example, replace “The earlier Urban reaction during Constantine’s question is
removed” with the resulting direction: “Cut to Constantine in close-up at 10.583 s.
At 11.375 s, he asks ‘What would you require?’ Remain on Constantine through the
question, then cut to Urban at 12.917 s.” Describe the bombard drawing's visible
details directly rather than saying it replaces an old schematic.

Keep change explanations, approval history, transcription/QA methods, Blender
packing details and provider execution instructions in the conversation or
existing working evidence, outside the cinematic description. Keep exact revision
ids, reference files, audio offsets and delivery time maps in the agent handoff;
the description still states the intended on-screen action and speech timing.
Model-specific syntax and reference binding belong to Media Producer.

Before registration, reread the full description as an outside model: can each
instruction be understood from this text alone? Rewrite context-dependent phrases,
check that the latest feedback is integrated without losing retained direction,
and keep the description consistent with this revision's cues and rendered intent.
This is agent editorial review, not a Studio runtime validator or keyword ban.

## Review

Keep the model-neutral `description.md` and display cues aligned with the same
directing decisions before registering each completed render. Changed timings
belong to a new revision candidate; historical Description and cue files stay
unchanged. Use objects and subjectless points when useful. Exact optional recorded
audio references audition existing files; they do not authorize creating speech.

Compare initial, arrival, settled exchange, turn and final frames plus continuous
motion. Check final frame explicitly, not just periodic samples. Distinguish code
checks from visual judgment; listen before claiming audio or dialogue correctness.
Keep feedback concrete: which subject, which instant, position, framing, action and
what should remain. Record the director's accepted choices in concise plan notes.

### Author direction points

Resolve speech from actual Scene dialogue context. Give each authored turn a
stable cue id, local speaker, exact line and frame start; set its end only when
explicitly directed. Mark physical onset/arrival changes as Action, and in-shot
camera changes as Camera. Do not export animation hold intervals or review
captions. A gestured conversation is Action unless spoken lines were authored.
Author ordered segments for actual cuts; preserve a single turn across a cut.
Verify frame count/rate and inspect event frames before registration. Recovered
caption timing remains planned until verified; record any rounding explicitly.
