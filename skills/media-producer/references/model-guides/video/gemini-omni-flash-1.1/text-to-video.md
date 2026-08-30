# Gemini Omni Flash 1.1 Text-To-Video

Read `index.md` first. Use this only when no exact media input should control
the result.

## Prompt Contract

Include:

- the subject, setting, and visible action;
- opening composition and intended final state;
- one clear camera path or an explicitly ordered short sequence;
- physical interaction and secondary environment motion;
- lighting and visual finish;
- desired ambience, effects, music, silence, and exact dialogue only when known;
- critical continuity constraints and visible exclusions.

Do not mention references, files, source frames, Studio state, or provider
tokens when the route receives none.

## Template

```text
[Subject] [performs a concrete visible action] in [specific setting and time].
Camera: [opening scale and angle], [movement], ending on [final framing].
Action: [ordered physical progression that fits the selected duration].
Environment and light: [secondary motion and lighting behavior].
Sound: [ambience, effects, music or silence, and exact dialogue when known].
Continuity: keep [identity, wardrobe, props, and geography] stable.
Do not include: [critical visible exclusions].
```

## Checks

- Is the physical progression concrete rather than only described as
  "cinematic" or "dynamic"?
- Can the action and camera move finish within the selected duration?
- Is sound direction present when audio matters and omitted when unknown?
- Are there no reference mentions without actual reference inputs?
