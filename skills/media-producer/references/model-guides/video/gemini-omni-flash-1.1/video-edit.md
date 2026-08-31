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
- Prefer concise conversational phrasing: one direct change followed by
  explicit preservation. Negative wording should identify observable unwanted
  changes, not become a long alternate scene description.

## Template

```text
[Make one specific edit].
Preserve exactly: [timing, performance, camera movement, framing, identity,
objects, environment, lighting, and audio that must not change].
The changed result should show: [concrete visible properties of the edit].
Do not change: [critical exclusions].
```

```text
Make the phone in the performer's right hand invisible. Keep everything else
the same: timing, hand motion, face, wardrobe, camera path, framing, background,
lighting, and original audio. Reconstruct only the small background area behind
the phone. Do not add another object, alter the fingers, or introduce a cut.
```

Model continuation is not the same as local edit. Google documents 10-second
continuation increments, with the last 10 seconds used for continuity and a
live total-duration bound. Use a continuation-capable route only when its live
schema exposes that input. Describe whether the scene and audio continue or a
deliberate cut occurs, and treat timecode zero as the start of the new segment.
The current checked Fal route index exposes edit but not continuation, so do
not send a continuation request to `video_url` merely because both use a source
video.

## Checks

- Is the exact source video assigned to `video_url`?
- Is the change unambiguous and observable?
- Does preservation language cover every unaffected part that matters?
- Does the prompt avoid asking the edit route to create an unrelated new clip?
