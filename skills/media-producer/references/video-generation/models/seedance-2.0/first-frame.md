# Seedance First-Frame Video

Use this when the selected direct Seedance image-to-video descriptor exposes
required `image_url` and an opening image anchors the video. Assign the exact
First Frame selection to `providerField: "image_url"`. If the descriptor also
exposes `end_image_url`, assign an exact Last Frame only when it is binding.

## Prompt Contract

- Use an opening-image token only if the selected endpoint documentation or
  generated provider payload establishes one. Otherwise describe the opening
  frame without inventing `@Image1`.
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
