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

For a longer opening-frame animation, numbered clip blocks can make one
continuous pass easier to audit:

```text
The supplied opening image is the exact first frame. Preserve the pilot's face,
orange suit, cockpit geometry, and cyan instrument light.
CLIP 1 — 0-4s: one locked medium as she reaches for the overhead switch.
CLIP 2 — 4-8s: the same camera eases forward while the canopy closes.
CLIP 3 — 8-12s: hold on her profile as runway lights begin moving behind her.
Sound: switch click, canopy motor, engine idle; no music or dialogue.
No cuts, morphing, added crew, text, or changes to the opening composition.
```

For a first/end-frame request, the corresponding example is one physical move:

```text
The opening image is the exact first frame and the ending image is the required
last frame. In one continuous lateral track, the dancer crosses the marked
floor and turns into the final pose. Preserve her identity, blue costume, stage
geography, screen direction, and amber side light. Reach the ending framing by
movement rather than morphing. Footsteps and fabric only; no music, cuts, text,
or extra performers.
```

## Checks

- Is each frame assigned to the correct singular native field?
- Are preservation details explicit enough to survive prompt expansion?
- Does the transition fit the selected duration?
- If audio is enabled, does the prompt deliberately define sound or silence?
- If expansion returns actual-prompt evidence, do both frame obligations and
  every preservation constraint remain explicit?
