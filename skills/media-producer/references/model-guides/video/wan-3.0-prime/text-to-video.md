# Wan 3.0 Prime Text-To-Video

Read `index.md` first. Use this only when no exact media input should control
the result.

## Prompt Contract

- For a short single action, use a compact brief with subject, movement,
  setting, camera, light, and sound.
- For a longer or multi-beat result, use labeled sections or time ranges and
  align every beat to the selected duration.
- State one camera setup per beat and the transition between beats.
- Give sound a physical cause and specify dialogue, ambience, effects, music,
  or held silence when known.
- Put non-negotiable identity, geography, period, and visible exclusions in
  explicit language that will survive prompt expansion.

## Compact Template

```text
[Subject] [performs one physical action] in [specific setting and time], seen
through [camera scale, lens feel, and one movement]. [Directed light, material,
and secondary environment motion]. Sound: [ambience and physical effects],
[music or no music]. Keep [critical continuity] stable. Do not include:
[critical visible exclusions].
```

## Timecoded Template

```text
STYLE AND SETTING
[Concrete visual finish, subjects, location, light, and continuity anchors].

TIMELINE
0-[N]s: [camera setup, action, and physical sound event].
[N]-[N]s: [next setup or continuous move, action, and sound progression].
[N]-[end]s: [final action and held ending composition].

SOUND
[Ambience, effects, exact quoted dialogue and delivery when known, music or silence].

Do not include: [critical visible exclusions].
```

## Checks

- Does action density fit the selected duration?
- Is each beat grounded in one camera setup?
- Are concrete light, motion, and sound details doing the work instead of vague
  style adjectives?
- Are there no reference mentions without actual reference inputs?
