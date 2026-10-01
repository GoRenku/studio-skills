# Seedance Image-To-Video

Use this when the selected Seedance image-to-video operation receives an opening
image that anchors the video. Put exact markers only in fields supplied by the
provider adapter and confirmed by the live schema. Include an ending image only
when it is supported and binding.

Read [index.md](index.md) for 2.0-specific construction and evidence. The image
already supplies appearance and composition; concentrate prose on the change
that should happen from that state.

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

## Worked motion brief

Original example for an opening image of a woman seated beside a window, not
generated or tested:

```text
Begin from the supplied opening frame. The seated woman turns her head toward
the window, pauses, and places her left palm flat on the table. Her right hand
remains beside the cup; the cup stays still. The camera slowly pushes closer
along its existing viewing angle, ending on her face and left hand.
Keep her face, blue cardigan, chair, table, window position, and light direction.
Environmental motion: the curtain edge moves gently; other objects stay still.
Quiet room tone and a soft sleeve rustle; no speech, music, cuts, or new objects.
```

The brief separates subject movement, camera movement, and things that stay
still. It does not reconstruct the photographed scene as a different setting.
Do not copy these particulars if they contradict the actual opening image.

Agent revision suggestions: if the scene is redesigned, remove new setting or
wardrobe descriptions and name the few invariants that matter. If movement is
unclear, specify the moving body part and the state it reaches. If subject and
camera motion are both too complex, simplify one before adding more prose.

## Checks

- Does the prompt tell Seedance to preserve the source image layout?
- Does it avoid asking for a different scene?
- Are moving and non-moving elements separated clearly?
- Are critical negatives in the main prompt?
