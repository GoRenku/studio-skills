# MiniMax H3 Image-To-Video

Read `index.md` first. Use this only for a MiniMax H3 image-to-video operation.
Put binding opening and ending markers only in the native fields supplied by
the provider adapter and confirmed by the live schema.

When the provider adapter treats singular frame inputs implicitly, describe them
as the supplied opening and ending images without inventing numbered mentions.

## Opening-frame prompt contract

- Treat the opening image as the exact starting state, not loose inspiration.
- Describe intended subject, environment, and camera motion rather than
  re-describing a new scene to create.
- State which identity, composition, layout, props, wardrobe, light direction,
  and period details must remain stable.

```text
The supplied opening image is the exact first frame. Preserve its subject
identity, composition, wardrobe, props, location layout, light direction, and
period details.

Motion: [subject action and secondary environmental motion].
Camera: [movement from opening framing to final framing].
Timing: [beginning, development, and final state].
Sound: [ambience and key events when relevant].
Do not include: [critical visible exclusions].
```

## First-and-last-frame prompt contract

- Treat the opening input as the exact start and the ending input as the
  required destination.
- Explain the physically plausible action and camera path between them.
- Preserve identity, props, geography, screen direction, and line of action.
- Explicitly reject morphing when it is not the intended transition.

```text
The supplied opening image is the exact first frame. The supplied ending image
is the required final frame.

Transition: [physical action path from start to destination]. Keep [identity,
props, geography, screen direction, and line of action] continuous. Reach the
ending composition through real movement and camera motion, not morphing.
Camera: [start framing, movement, endpoint framing].
Sound: [ambience and key events when relevant].
Do not include: [critical visible exclusions].
```

## Checks

- Is every supplied frame assigned through the exact provider adapter field?
- Is the last frame a destination rather than a style reference?
- Does the requested motion plausibly connect the two states in the duration?
- Does the prompt avoid mention syntax not supplied by the adapter?
