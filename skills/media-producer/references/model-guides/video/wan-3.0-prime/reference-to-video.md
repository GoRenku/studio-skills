# Wan 3.0 Prime Reference-To-Video

Read `index.md` first. Use this when images, videos, audio, a document, or a
public webpage should guide one generated video without acting as a binding
first frame.

The Fal adapter supplies one-based `Image N`, `Video N`, and `Audio N` mentions
from final modality-local native array order. Documents and public webpages use
singular native fields and have no numbered mention.

## Prompt Contract

- Give every supplied reference one narrow role.
- Use images for subject identity, wardrobe, product geometry, location, prop,
  composition, or visual style.
- Use videos for performance, motion, physics, camera path, or rhythm.
- Use audio for a voice, score, ambience, rhythm, or sound texture; align output
  duration and described beats to the useful part of that reference.
- For a document or public webpage, name the exact sections or facts to use and
  what to omit. The source provides facts; the prompt provides creative
  direction.
- Resolve precedence when references compete and describe one coherent output,
  not a montage of source material.

## Template

```text
REFERENCES
<IMAGE_1> is only [subject/location/product/composition/style] continuity for
[specific visible traits].
<IMAGE_2> is only [a different narrow visual role].
<VIDEO_1> is only [performance/motion/physics/camera/rhythm] reference.
<AUDIO_1> is only [voice/score/ambience/rhythm/sound-texture] reference.
The supplied [document/public page] provides only [specific facts or sections];
omit [irrelevant material].

Create one coherent video: [subject, action, setting, and final state].
Camera: [one setup per beat, movement, and final framing].
Timing: [ordered or timecoded beats fitting the selected duration].
Environment and light: [secondary motion and lighting progression].
Sound: [how the audio reference informs the result plus physical sound events].
Continuity: preserve [identity, wardrobe, props, geography, and screen direction].
Do not include: [critical visible exclusions].
```

Include only lines backed by actual native inputs. Replace neutral placeholders
with exact adapter-supplied mentions after inspecting the reviewed request.

## Checks

- Does every media mention match final modality-local native request order?
- Does every reference have one narrow, non-competing role?
- If a document or webpage is supplied, are its facts separated from the
  prompt's creative direction and are the live schema requirements satisfied?
- Does audio timing fit the selected output duration?
- Does the output remain one coherent video rather than a reference montage?
