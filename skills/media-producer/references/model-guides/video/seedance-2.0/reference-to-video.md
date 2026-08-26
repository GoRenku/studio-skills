# Seedance Reference-To-Video

Use this for a Seedance reference-to-video operation when exact references are
assigned through the provider adapter, but none is a storyboard image.

Do not use this when a storyboard/reference image is attached. Use
`storyboard-reference-to-video.md`.

## Prompt Contract

- Name every supplied token and its role.
- Derive exact mentions from final modality-local request order using the
  provider adapter.
- Keep each role narrow.
- Compose one coherent result.
- Do not let references compete as alternate first frames, alternate
  geographies, or alternate character designs.
- Put critical exclusions in the main prompt.

## Template

```text
REFERENCES
<IMAGE_1> is only [character/location/style/prop] continuity for [specific visible traits].
<VIDEO_1> is only [motion/performance/camera rhythm] reference.
<AUDIO_1> is only [voice/ambience/sound-character] reference.

Create one coherent video: [subject/action/location].
Camera: [movement and framing].
Motion: [subject and environment movement].
Sound: [native audio guidance if relevant].
Continuity: preserve [specific constraints].
Do not include: [critical exclusions].
```

Replace the angle-bracket placeholders with exact adapter-supplied mentions.

## Checks

- Does every token have a role?
- Is each role scoped narrowly?
- Does the output remain one scene or sequence?
- Are visible traits described instead of app names or filenames?
