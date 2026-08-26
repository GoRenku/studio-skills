# MiniMax H3 Reference-To-Video

Read `index.md` first. Use this only for a MiniMax H3 reference-to-video
operation. Assign images, videos, and audio through the provider adapter, then
derive exact mentions from final modality-local request order. The adapter owns
whether mentions contain spaces, prefixes, or no visible token at all.

## Prompt contract

- Name every supplied mention and give it one narrow role.
- Use images for specific subject, location, prop, composition, or style
  continuity.
- Use videos for specific motion, performance, physics, camera path, or rhythm.
- Use audio for a specific voice, ambience, music character, or sound texture.
- State the single coherent output scene or sequence after assigning roles.
- Resolve precedence explicitly when multiple references could compete.
- Do not let reference media become alternate first frames or unrelated scenes.

## Template

```text
REFERENCES
<IMAGE_1> is only [subject/location/prop/composition/style] continuity for
[specific visible traits].
<IMAGE_2> is only [different narrow visual role].
<VIDEO_1> is only [motion/performance/camera/physics/rhythm] reference.
<AUDIO_1> is only [voice/ambience/music-character/sound-texture] reference.

Create one coherent video: [subject, action, setting, and intended final state].
Camera: [opening framing, movement, and final framing].
Timing: [ordered action beats that fit the selected duration].
Environment and light: [secondary motion and lighting progression].
Sound: [how <AUDIO_1> informs the result, plus known sound events].
Continuity: preserve [identity, wardrobe, props, geography, screen direction].
Do not include: [critical visible exclusions].
```

Replace angle-bracket placeholders with exact adapter-supplied mentions. Include
only lines backed by actual inputs. Read all count, duration, and modality
constraints from the live schema before Preview.

## Checks

- Does every mention match the exact modality-local native array order?
- Does every supplied reference have a narrow, non-competing role?
- Does every mention use the selected provider adapter's exact syntax?
- Does the request satisfy the live schema's current limits?
- Does the output remain one coherent result rather than a reference montage?
