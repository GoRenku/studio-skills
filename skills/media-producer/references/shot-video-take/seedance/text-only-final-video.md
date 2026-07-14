# Seedance Text-Only Final Video

Use this when the selected direct Seedance text-to-video endpoint has no
file-backed media fields and no exact media reference should control the final
video.

## Prompt Contract

Include:

- subject and action;
- camera movement and framing;
- temporal progression from beginning to end;
- sound or ambience when native audio matters;
- look, location, period, materials, palette, and performance;
- critical exclusions in the main prompt.

Do not include provider tokens. Do not say "selected", "current", "Studio", or
"reference" when no provider reference exists.

## Template

```text
[Subject] [does specific action] in [specific place and time].
Camera: [shot scale, angle, lens feel, movement, start and end framing].
Action timing: [what happens first, middle, end].
Sound: [ambient bed, key effects, dialogue/narration only if exact words are known].
Look and continuity: [period, material, wardrobe, palette, light, texture].
Do not include: [critical exclusions].
```

## Checks

- Does the prompt create one coherent video, not a moodboard?
- Does the camera do something concrete?
- Are period/geography constraints visible, not abstract?
- Are unknown dialogue, music, and sound effects omitted rather than invented?
