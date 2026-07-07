# Seedance Image-To-Video / First-Frame Final Video

Use this when a starting image anchors the video.

## Prompt Contract

- Name the starting image token if the provider preview exposes one.
- Treat the image as the opening state, not as loose inspiration.
- Do not re-describe the image as a new scene to create.
- Say what moves, what the camera does, how sound evolves, and what must remain
  stable.
- Forbid drift from source image layout, identity, period, props, and geography.

## Template

```text
@Image1 is the opening frame. Begin from its exact composition, subject
identity, wardrobe, props, location layout, light direction, and period details.

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
- Are critical negatives in the main prompt when the route lacks a negative
  field?
