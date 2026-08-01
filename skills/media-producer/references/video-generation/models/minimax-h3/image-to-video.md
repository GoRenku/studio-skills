# MiniMax H3 Image-To-Video

Read `index.md` first. Use this only for `minimax/h3/image-to-video`. Assign the
binding opening frame to `providerField: "image_url"`. Assign a binding final
frame to `providerField: "end_image_url"` only when the selected input mode is
first-and-last-frame.

The provider does not document prompt tokens for these singular frame fields.
Describe them as the supplied opening image and supplied ending image; do not
invent `Image 1` or `@Image1` mentions.

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

- Treat `image_url` as the exact start and `end_image_url` as the required
  destination.
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

- Is every supplied frame assigned to the exact singular provider field?
- Is the last frame a destination rather than a style reference?
- Does the requested motion plausibly connect the two states in the duration?
- Does the prompt avoid unsupported reference numbering?
