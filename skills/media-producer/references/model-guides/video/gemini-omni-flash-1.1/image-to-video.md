# Gemini Omni Flash 1.1 Image-To-Video

Read `index.md` first. Use this for both opening-image animation and
first/last-frame interpolation. Put images only in the singular native fields
confirmed by the live schema. Those fields are implicit; do not invent numbered
mentions for them.

## Opening-Image Contract

- Treat the opening image as the exact first frame.
- Describe what moves, how it moves, and how the camera evolves instead of
  re-describing a different scene to generate.
- State which face, wardrobe, object geometry, composition, location, light
  direction, and visual finish must remain stable.
- Describe synchronized sound when it matters.

```text
The supplied opening image is the exact first frame. Preserve [identity,
wardrobe, props, composition, location geometry, and light direction].

Motion: [subject action and secondary environment motion].
Camera: [movement from opening composition to final framing].
Timing: [opening beat, development, and final state].
Sound: [ambience, effects, music or silence, and exact dialogue when known].
Do not include: [critical visible exclusions].
```

## First-And-Last-Frame Contract

- Treat the first image as the exact opening and the second as the required
  destination.
- Describe a physically plausible action and camera path between them.
- Preserve identity, props, geography, screen direction, and line of action.
- Reject morphing when it is not the intended transition.

```text
The supplied opening image is the exact first frame. The supplied ending image
is the required final frame.

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
