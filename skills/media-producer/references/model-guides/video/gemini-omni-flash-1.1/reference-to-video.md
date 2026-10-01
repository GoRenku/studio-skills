# Gemini Omni Flash 1.1 Reference-To-Video

Read `index.md` first. Use this when exact images or short videos should guide
the result without acting as a binding first frame.

Google's model guide supports role tags for images and videos. The selected Fal
adapter supplies the exact executable zero-based mentions from final
modality-local native array order. Replace the neutral role markers below only
after validating and inspecting the reviewed request.

## Prompt Contract

- Give every supplied image and video one narrow role.
- Use images for subject identity, product geometry, wardrobe, location,
  composition, or visual style.
- Google's current API guide describes video references mainly as likeness
  references for a person or object; it says audio in those references is
  ignored and multiple-video reasoning is unsupported. Do not assume a source
  clip will supply its motion or soundtrack: describe the desired action and
  sound in the prompt, and check the selected hosted route's limits.
- State the one coherent output after assigning roles.
- Resolve precedence when two references could redefine the same trait.
- Do not invent audio references. The current Gemini Omni Flash 1.1 reference
  route exposes image and video arrays but no reference-audio field.

## Template

```text
REFERENCES
[IMAGE_REFERENCE_1] is only [subject/product/location/composition/style] continuity for
[specific visible traits].
[IMAGE_REFERENCE_2] is only [a different narrow visual role].
[VIDEO_REFERENCE_1] is only [performance/motion/physics/camera/rhythm] reference.

Create one coherent video: [subject, action, setting, and final state].
Camera: [opening framing, movement, and final framing].
Timing: [ordered action beats that fit the selected duration].
Environment and light: [secondary motion and lighting progression].
Sound: [native ambience, effects, music or silence, and exact dialogue when known].
Continuity: preserve [identity, wardrobe, props, geography, and screen direction].
Do not include: [critical visible exclusions].
```

## Checks

- Was each neutral role marker replaced with the exact adapter-supplied,
  zero-based Gemini mention from final request order?
- Does every reference have one narrow, non-competing role?
- Are all requested references present in the reviewed native request?
- Is there no audio mention or field unsupported by the live schema?
- Does the output remain one result rather than a montage of references?

The role guidance follows Google's [Omni prompt guide](https://ai.google.dev/gemini-api/docs/omni#using-tags-in-prompts-to-set-image-and-video-roles), reviewed 2026-09-30. Examples elsewhere in this guide are original and untested. Google API limits do not automatically apply to Fal's route; its live schema remains decisive.
