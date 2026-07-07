# Seedance First-And-Last-Frame Final Video

Use this when both start and end images are binding.

## Prompt Contract

- Treat first frame as the start state.
- Treat last frame as the required destination state.
- Describe the transition path, physical continuity, camera movement, and sound.
- Do not ask for unrelated geography between frames.
- Do not let the model solve the transition by morphing architecture, bodies,
  props, or identities unless transformation is explicitly desired.

## Template

```text
@Image1 is the first frame. Start from its exact subject identity, composition,
location layout, light direction, props, and period details.

@Image2 is the required final frame. End at its composition and action state.

Transition: [physical action path from start to end]. Keep [identity, props,
geography, line of action] continuous. The change should happen through real
motion and camera movement, not morphing.

Camera: [start framing, movement, endpoint framing].
Sound: [ambient bed and key events, if relevant].
Do not include: [critical exclusions].
```

## Checks

- Is the end frame a destination, not a second style reference?
- Does the prompt explain how motion reaches the destination?
- Does it forbid unwanted morphing?
- Does it keep geography and line of action stable?
