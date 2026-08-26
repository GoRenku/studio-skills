# Seedance Image-To-Video

Use this when the selected Seedance image-to-video operation receives an opening
image that anchors the video. Put exact markers only in fields supplied by the
provider adapter and confirmed by the live schema. Include an ending image only
when it is supported and binding.

## Prompt Contract

- Use an opening-image mention only if the provider adapter establishes one.
  Otherwise describe the supplied opening frame without inventing a token.
- Treat the image as the opening state, not as loose inspiration.
- Do not re-describe the image as a new scene to create.
- Say what moves, what the camera does, how sound evolves, and what must remain
  stable.
- Forbid drift from source image layout, identity, period, props, and geography.

## Template

```text
The supplied opening image is the first frame. Begin from its exact composition,
subject identity, wardrobe, props, location layout, light direction, and period
details.

Animate only the intended motion: [subject motion, environmental motion, camera
movement].

Camera: [movement from start to end, shot scale, angle, parallax].
Sound: [ambient bed and key events, if native audio matters].
Continuity: keep [identity/layout/props/geography] stable.
Do not include: [critical exclusions].
```

## Checks

- Does the prompt tell Seedance to preserve the source image layout?
- Does it avoid asking for a different scene?
- Are moving and non-moving elements separated clearly?
- Are critical negatives in the main prompt?
