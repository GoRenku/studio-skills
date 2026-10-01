# Seedance First-And-Last-Frame Video

Use this only when the selected Seedance route supports opening and ending image
inputs and both endpoints are binding. Put their exact markers in the fields
supplied by the provider adapter and confirmed by the live schema.

Read [index.md](index.md). Endpoint inputs establish the intended states; a
prompt still needs to explain a plausible journey between them. Requested
continuity and matching are not a guarantee of pixel-exact output.

## Prompt Contract

- Treat first frame as the start state.
- Treat last frame as the required destination state.
- Describe the transition path, physical continuity, camera movement, and sound.
- Do not ask for unrelated geography between frames.
- Do not let the model solve the transition by morphing architecture, bodies,
  props, or identities unless transformation is explicitly desired.

## Template

```text
The supplied opening image is the first frame. Start from its exact subject
identity, composition, location layout, light direction, props, and period
details.

The supplied ending image is the required final frame. End at its composition
and action state.

Transition: [physical action path from start to end]. Keep [identity, props,
geography, line of action] continuous. The change should happen through real
motion and camera movement, not morphing.

Camera: [start framing, movement, endpoint framing].
Sound: [ambient bed and key events, if relevant].
Do not include: [critical exclusions].
```

## Worked transition

Original example, not generated or tested. Assume both images show the same
woman and room: she starts seated at the table and ends standing by the window.

```text
Start from the supplied opening frame and end at the supplied ending frame.
The woman places both palms on the table, rises from the chair, and walks
around the table's right side toward the window. She stops at the window,
turns her shoulders toward the light, and settles into the ending pose.
The camera tracks slowly to its right without crossing the table, arriving
at the ending image's angle. Keep the same woman, cardigan, furniture, cup,
and room layout; the cup remains on the table. One continuous take with
footsteps and room tone, no speech or music. Reach the end through walking
and camera motion, without transforming the furniture or dissolving her body.
```

This describes a route through space and a deliberate camera destination.
Before using it, inspect whether the actual images permit that route. Incompatible
geography or a completely different costume cannot be resolved reliably by
asking for continuity in prose.

Agent revision suggestions: for an unwanted dissolve, replace a vague “becomes”
transition with physical waypoints. If movement never settles into the end pose,
give the final action a clear stop. If reaching the destination requires too
many actions for the allowed duration, simplify the intended journey or choose
a more suitable pair of frames with the user.

## Checks

- Is the end frame a destination, not a second style reference?
- Does the prompt explain how motion reaches the destination?
- Does it forbid unwanted morphing?
- Does it keep geography and line of action stable?
