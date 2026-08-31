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

Single-shot example:

```text
In a single scene and one continuous unbroken shot with no cuts, a tabby cat
sits on a sunlit sill, turns toward a bird call, and slowly raises one paw as
the camera makes a gentle push-in. Dust drifts through the side light. Sound:
soft wind and distant birds, no dialogue or music. Keep the same cat, sill,
garden, and morning light throughout. No captions or logos.
```

Timecoded text example:

```text
[0-3s] A hand sets a cream card on a black table.
[3-6s] The camera glides closer as gold letters reading "OPEN AT MIDNIGHT"
appear sharp and correctly spelled.
[6-10s] Hold the readable card while a clock chimes once.
Sound: paper contact, quiet room tone, one clock chime; no dialogue or music.
One continuous overhead shot, no cuts, extra hands, or additional text.
```

## Checks

- Is the physical progression concrete rather than only described as
  "cinematic" or "dynamic"?
- Can the action and camera move finish within the selected duration?
- Is sound direction present when audio matters and omitted when unknown?
- Are there no reference mentions without actual reference inputs?
- Is every required on-screen word quoted exactly and given enough held time to
  inspect for readability?
