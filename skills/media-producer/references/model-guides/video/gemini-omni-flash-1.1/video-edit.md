# Gemini Omni Flash 1.1 Video Edit

Read `index.md` first. Use this only when one exact source video should be
changed through the Fal edit route.

Put the source marker in the singular native `video_url` field. The source is
implicit; do not invent a video mention.

## Prompt Contract

- State the requested change first as a direct instruction.
- Name exactly what must remain unchanged: timing, performance, camera path,
  framing, identity, objects, background, lighting, or audio.
- Describe visible replacement details concretely when changing an object,
  wardrobe, setting, lighting, or style.
- Keep unrelated fixes out of the request so preservation intent stays clear.
- If the requested result needs a different duration or a new shot structure,
  choose a generation route instead of treating it as a local edit.

## Template

```text
[Make one specific edit].
Preserve exactly: [timing, performance, camera movement, framing, identity,
objects, environment, lighting, and audio that must not change].
The changed result should show: [concrete visible properties of the edit].
Do not change: [critical exclusions].
```

## Checks

- Is the exact source video assigned to `video_url`?
- Is the change unambiguous and observable?
- Does preservation language cover every unaffected part that matters?
- Does the prompt avoid asking the edit route to create an unrelated new clip?
