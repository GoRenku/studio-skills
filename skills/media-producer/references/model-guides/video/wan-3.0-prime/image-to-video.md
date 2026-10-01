# Wan 3.0 Prime Image-To-Video

Read `index.md` first. Use this for both opening-image animation and
first/last-frame generation. Put frames only in the singular native fields
confirmed by the live schema. They are implicit; do not invent numbered
mentions.

## Opening-image direction

- Treat the supplied image as the route's opening-frame anchor. Describe what
  happens next instead of asking the model to recreate the still in words.
- Name only the visible traits that matter to the shot: face, wardrobe, object
  geometry, composition, location, lighting, or finish. These are prompt
  priorities, not a guarantee that details will remain unchanged.
- Describe motion, camera evolution, timing, and sound rather than recreating a
  new still in words.

```text
The supplied opening image anchors the opening state. Keep [identity,
wardrobe, objects, composition, location geometry, lighting, and visual finish].

TIMELINE
0-[N]s: [first physical action and camera behavior].
[N]-[end]s: [development and final held state].

Sound: [ambience, effects, exact dialogue when known, music or silence].
Do not include: [critical visible exclusions].
```

## First-and-last-frame direction

- Use the ending image as the intended destination, not as a loose style cue.
- Describe the physically plausible path between both frames.
- Preserve identity, props, geography, screen direction, line of action,
  lighting logic, and visual finish.
- Reject morphing unless morphing is the intended effect.

```text
The supplied opening image anchors the opening state. The supplied ending
image guides the intended final state.

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
The supplied image anchors the opening composition. Keep the pilot's face,
orange suit, cockpit geometry, and cyan instrument light.
CLIP 1 — 0-4s: one locked medium as she reaches for the overhead switch.
CLIP 2 — 4-8s: the same camera eases forward while the canopy closes.
CLIP 3 — 8-12s: hold on her profile as runway lights begin moving behind her.
Sound: switch click, canopy motor, engine idle; no music or dialogue.
No cuts, morphing, added crew, text, or changes to the opening composition.
```

For a first/end-frame request, the corresponding example is one physical move:

```text
The opening image anchors the start and the ending image guides the intended
destination. In one continuous lateral track, the dancer crosses the marked
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

The prompt-shape and prompt-expansion advice follows [Fal's Wan 3 prompting
tutorial](https://fal.ai/learn/tools/how-to-use-wan-3), reviewed 2026-09-30.
Examples in this guide are original and untested. Exact endpoint behavior and
frame input requirements remain route-specific.
