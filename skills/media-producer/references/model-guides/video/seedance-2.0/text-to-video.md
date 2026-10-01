# Seedance Text-To-Video

Use this when the selected Seedance text-to-video operation has no
file-backed media fields and no exact media reference should control the final
video.

Read the [2.0 construction and evidence notes](index.md). Use only the details
needed for this take; the template is a starting point, not a required format.

## Prompt Contract

Include:

- subject and action;
- camera movement and framing;
- temporal progression from beginning to end;
- sound or ambience when native audio matters;
- look, location, period, materials, palette, and performance;
- critical exclusions in the main prompt.

Do not include reference mentions. Do not say "selected", "current", "Studio", or
"reference" when no provider reference exists.

## Template

```text
[Subject] [does specific action] in [specific place and time].
Camera: [shot scale, angle, lens feel, movement, start and end framing].
Action timing: [what happens first, middle, end].
Sound: [ambient bed, key effects, dialogue/narration only if exact words are known].
Look and continuity: [period, material, wardrobe, palette, light, texture].
Do not include: [critical exclusions].
```

## Worked examples

Original compact example, not generated or tested:

```text
A tram conductor in a dark wool coat stands beside the closed carriage door.
In one fixed medium shot, she pulls the brass handle with her right hand,
opens the door toward herself, and steps aside while holding it open.
Her shoulders settle after the effort. Cool dawn light, worn painted metal.
Sound: the handle clicks, the hinge creaks, distant street noise; no dialogue
or music. Keep the same conductor, carriage, and door mechanism.
```

The action has a physical cause and an ending state. The held door explains
what remains true after the subject steps aside.

Original edited sequence, not generated or tested:

```text
One conductor in the same dark wool coat throughout, inside a stationary tram.
Shot 1: fixed medium shot. She checks the empty platform through the open door,
then turns toward the carriage; her right hand still holds the door handle.
Shot 2: cut to a close view of that hand. She draws the door closed until the
latch catches, then releases the handle. One clear metallic click.
Shot 3: cut to an eye-level medium shot inside. She looks down the aisle,
exhales, and says quietly, "We're ready." Quiet carriage ambience, no music.
Natural motion; preserve her coat, the brass handle, and the tram interior.
```

Shot labels establish edits and action order. They avoid making an unsupported
promise about exact segment durations; see the [2.0 timing limit](index.md).

## Focused rewrites

These are agent suggestions rather than diagnosed model failures:

- An action repeats: specify its completion and what the subject does next.
- The camera behaves erratically: choose one move for the current shot and
  remove directions that compete with it.
- Emotion is exaggerated: replace an abstract intensity label with the desired
  face, breath, or body behavior.
- A multi-shot result merges actions: make each shot's subject, action, and
  transition explicit; reduce beat density if the selected duration is too short.

## Checks

- Does the prompt create one coherent video, not a moodboard?
- Does the camera do something concrete?
- Are period/geography constraints visible, not abstract?
- Are unknown dialogue, music, and sound effects omitted rather than invented?
