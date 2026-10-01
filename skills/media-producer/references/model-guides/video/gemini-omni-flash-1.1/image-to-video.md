# Gemini Omni Flash 1.1 Image-To-Video

Read `index.md` first. Use this for both opening-image animation and
first/last-frame interpolation. Put images only in the singular native fields
confirmed by the live schema. Those fields are implicit; do not invent numbered
mentions for them.

## Opening-image direction

- Treat the supplied image as the intended opening composition. Describe the
  motion that follows instead of asking the model to redraw the still.
- Describe what moves, how it moves, and how the camera evolves instead of
  re-describing a different scene to generate.
- State which face, wardrobe, object geometry, composition, location, light
  direction, and visual finish must remain stable.
- Describe synchronized sound when it matters.

```text
The supplied opening image establishes [identity,
wardrobe, props, composition, location geometry, and light direction].

Motion: [subject action and secondary environment motion].
Camera: [movement from opening composition to final framing].
Timing: [opening beat, development, and final state].
Sound: [ambience, effects, music or silence, and exact dialogue when known].
Do not include: [critical visible exclusions].
```

## First-and-last-frame direction

- Treat the first image as the opening anchor and the second as the intended
  destination.
- Describe a physically plausible action and camera path between them.
- Preserve identity, props, geography, screen direction, and line of action.
- Reject morphing when it is not the intended transition.

```text
The supplied opening image establishes the opening composition. The supplied
ending image guides the intended final composition.

Transition: [physical action path from the opening state to the ending state].
Keep [identity, props, geography, screen direction, and line of action]
continuous. Reach the ending composition through physical movement and camera
motion, not morphing.
Camera: [opening framing, movement, and ending framing].
Sound: [ambience and key events].
Do not include: [critical visible exclusions].
```

## Checks

- Is each image assigned to the correct singular native field?
- Is the ending image a destination rather than a style reference?
- Does the prompt focus on motion and preservation rather than recreating the
  source image?
- Does the transition plausibly fit the selected duration?

The format follows Google's prompt guide for image and frame roles. The
preservation language is a creative instruction, not a guarantee of exact frame
reproduction. This file's examples are original and untested; use only frame
inputs exposed by the selected route's live schema.
