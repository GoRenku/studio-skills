# Gemini Omni Flash 1.1 Reference-To-Video

Read `index.md` first. Use this when exact images or short videos should guide
the result without acting as a binding first frame.

The Fal adapter supplies zero-based `<IMAGE_REF_N>` and `<VIDEO_REF_N>` mentions
from final modality-local native array order. Replace the neutral placeholders
below only after validating and inspecting the reviewed request.

## Prompt Contract

- Give every supplied image and video one narrow role.
- Use images for subject identity, product geometry, wardrobe, location,
  composition, or visual style.
- Use videos for performance, motion, physics, camera path, rhythm, or scene
  behavior.
- State the one coherent output after assigning roles.
- Resolve precedence when two references could redefine the same trait.
- Do not invent audio references. The current Gemini Omni Flash 1.1 reference
  route exposes image and video arrays but no reference-audio field.

## Template

```text
REFERENCES
<IMAGE_1> is only [subject/product/location/composition/style] continuity for
[specific visible traits].
<IMAGE_2> is only [a different narrow visual role].
<VIDEO_1> is only [performance/motion/physics/camera/rhythm] reference.

Create one coherent video: [subject, action, setting, and final state].
Camera: [opening framing, movement, and final framing].
Timing: [ordered action beats that fit the selected duration].
Environment and light: [secondary motion and lighting progression].
Sound: [native ambience, effects, music or silence, and exact dialogue when known].
Continuity: preserve [identity, wardrobe, props, geography, and screen direction].
Do not include: [critical visible exclusions].
```

## Checks

- Was each neutral placeholder replaced with the exact adapter-supplied,
  zero-based Gemini mention?
- Does every reference have one narrow, non-competing role?
- Are all requested references present in the reviewed native request?
- Is there no audio mention or field unsupported by the live schema?
- Does the output remain one result rather than a montage of references?
