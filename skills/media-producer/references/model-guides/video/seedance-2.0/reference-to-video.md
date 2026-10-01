# Seedance Reference-To-Video

Use this for a Seedance reference-to-video operation when exact references are
assigned through the provider adapter, but none is a storyboard image.

When a supplied image is a storyboard, use
[storyboard-reference-to-video.md](storyboard-reference-to-video.md). Ordinary
character or location reference images still belong in this guide.

Read [index.md](index.md) for the maker's subject-mapping advice. References can
provide different aspects of a scene; they are not competing opening frames.

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

## Worked role mapping

Original example, not generated or tested. The native request supplies two
character images and a motion video; replace the neutral markers with the
adapter's exact mentions.

```text
The woman with cropped hair and a blue coat in <IMAGE_1> is Mara.
The man with a gray beard and a brown jacket in <IMAGE_2> is Ivo.
Use those images for their appearances only. <VIDEO_1> supplies the low,
slow lateral camera track; do not copy its people, costumes, or street.
Create one continuous shot in a narrow brick passage at dawn. Mara holds one
folded map in her right hand. She gives it to Ivo, who receives it with his
left hand and keeps it. Mara's hands are then empty. The camera tracks beside
them and stops when Ivo opens the map. Quiet footsteps and paper rustle,
no dialogue or music. Keep both identities and the same passage throughout.
```

The stable names connect appearance to action, while the video has one specific
job. The handoff states who owns the prop before and after it moves.

Agent revision suggestions: if one subject acquires another's clothing, restate
the subject-to-image mapping and use the same names throughout. If the motion
video's setting leaks into the result, narrow its role and describe the intended
setting. If several images show one person, say they are views of the same
person rather than introducing additional cast.

## Checks

- Does every token have a role?
- Is each role scoped narrowly?
- Does the output remain one scene or sequence?
- Are visible traits described instead of app names or filenames?
