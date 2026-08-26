# MiniMax H3 Text-To-Video

Read `index.md` first. Use this only for `minimax/h3/text-to-video`, when no
exact media file should control the result.

## Prompt contract

Include:

- subject, location, and visible action;
- opening composition and intended final state;
- camera scale, angle, lens feel, and movement;
- action order and pacing that fit the selected duration;
- environment motion, lighting progression, and sound intent;
- concrete continuity constraints and critical exclusions.

Do not mention images, videos, audio references, files, Studio state, or
provider tokens when the route receives none.

## Template

```text
[Subject] [performs specific visible action] in [specific setting and time].
Camera: [opening scale and angle], [one clear movement], ending on [final framing].
Timing: [opening beat], then [development], ending with [final action state].
Environment and light: [secondary motion and lighting change].
Sound: [ambience, effects, and exact dialogue only when known].
Continuity: keep [identity, wardrobe, props, geography] stable.
Do not include: [critical visible exclusions].
```

## Checks

- Does the prompt describe one achievable 5–15 second result?
- Are camera and action progression concrete?
- Are unknown dialogue, music, and sound omitted rather than invented?
- Are there no reference mentions without actual reference inputs?
