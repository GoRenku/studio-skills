# Seedance Generic Reference-To-Video

Use this for Seedance reference-to-video when references are attached but none
is a storyboard/reference image.

Do not use this when a storyboard/reference image is attached. Use
`storyboard-reference-final-video.md`.

## Prompt Contract

- Name every supplied token and its role.
- Keep each role narrow.
- Compose one coherent result.
- Do not let references compete as alternate first frames, alternate
  geographies, or alternate character designs.
- Put critical exclusions in the main prompt when the route lacks a negative
  field.

## Template

```text
REFERENCES
@Image1 is only [character/location/style/prop] continuity for [specific visible traits].
@Video1 is only [motion/performance/camera rhythm] reference.
@Audio1 is only [voice/ambience/sound-character] reference.

Create one coherent video: [subject/action/location].
Camera: [movement and framing].
Motion: [subject and environment movement].
Sound: [native audio guidance if relevant].
Continuity: preserve [specific constraints].
Do not include: [critical exclusions].
```

## Checks

- Does every token have a role?
- Is each role scoped narrowly?
- Does the output remain one scene or sequence?
- Are visible traits described instead of app names or filenames?
