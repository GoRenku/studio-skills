# Wan 3.0 Prime Image-To-Video

Read `index.md` first. Use this for both opening-image animation and
first/last-frame generation. Put frames only in the singular native fields
confirmed by the live schema. They are implicit; do not invent numbered
mentions.

## Opening-Image Contract

- Treat the opening image as frame one.
- Name the visible traits that must not drift: face, wardrobe, object geometry,
  composition, location, lighting, and finish.
- Describe motion, camera evolution, timing, and sound rather than recreating a
  new still in words.

```text
The supplied opening image is the exact first frame. Hold its [identity,
wardrobe, objects, composition, location geometry, lighting, and visual finish].

TIMELINE
0-[N]s: [first physical action and camera behavior].
[N]-[end]s: [development and final held state].

Sound: [ambience, effects, exact dialogue when known, music or silence].
Do not include: [critical visible exclusions].
```

## First-And-Last-Frame Contract

- Treat the ending image as the required final state, not a style reference.
- Describe the physically plausible path between both frames.
- Preserve identity, props, geography, screen direction, line of action,
  lighting logic, and visual finish.
- Reject morphing unless morphing is the intended effect.

```text
The supplied opening image is the exact first frame. The supplied ending image
is the required final frame.

Transition: [ordered physical action and camera path between the two states].
Preserve [identity, props, geography, screen direction, line of action, light,
and finish]. Reach the ending composition through physical movement, not
morphing.
Sound: [ambience and events aligned to the transition].
Do not include: [critical visible exclusions].
```

## Checks

- Is each frame assigned to the correct singular native field?
- Are preservation details explicit enough to survive prompt expansion?
- Does the transition fit the selected duration?
- If audio is enabled, does the prompt deliberately define sound or silence?
