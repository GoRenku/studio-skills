# MiniMax H3 Reference-To-Video

Read `index.md` first. Use this only for
`minimax/h3/reference-to-video`.

Assign exact media by modality:

- images to `reference_image_urls`;
- videos to `reference_video_urls`;
- audio to `reference_audio_urls`.

Inspect the generated `providerPayload`, then derive modality-local mentions
from its array order. Use spaces exactly as documented: `Image 1`, `Image 2`,
`Video 1`, `Video 2`, `Audio 1`, and so on. Do not add `@` and do not continue
numbering across modalities.

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
Image 1 is only [subject/location/prop/composition/style] continuity for
[specific visible traits].
Image 2 is only [different narrow visual role].
Video 1 is only [motion/performance/camera/physics/rhythm] reference.
Audio 1 is only [voice/ambience/music-character/sound-texture] reference.

Create one coherent video: [subject, action, setting, and intended final state].
Camera: [opening framing, movement, and final framing].
Timing: [ordered action beats that fit the selected duration].
Environment and light: [secondary motion and lighting progression].
Sound: [how Audio 1 informs the result, plus any exact known sound events].
Continuity: preserve [identity, wardrobe, props, geography, screen direction].
Do not include: [critical visible exclusions].
```

Include only mention lines backed by actual provider inputs. Add more numbered
lines only when the corresponding arrays contain those entries.

## Constraints to check before Preview

- At most 9 images, 3 videos, and 3 audio clips.
- At most 12 reference files across all three arrays.
- Each video and audio clip is 2–15 seconds.
- Combined video duration is at most 15 seconds; combined audio duration is at
  most 15 seconds.
- Audio is never the only reference modality.

## Checks

- Does every mention match the exact modality-local payload order?
- Does every supplied reference have a narrow, non-competing role?
- Does the prompt use `Image 1`, not `@Image1`?
- Does the request satisfy per-modality and combined limits?
- Does the output remain one coherent result rather than a reference montage?
