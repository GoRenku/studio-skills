# MiniMax H3 Image-To-Video

Use this for an H3 request whose supplied image anchors the opening frame. The
published H3 format puts an image-alignment instruction before the normal
visual-and-audio timeline. The H3 provider route determines how the image is
passed; do not write an image token unless its adapter supplies one.

## Opening-image prompt

Start from the visible arrangement in the image. Describe the first movement
that follows, then how the action develops and settles. Pick the few details
that matter to preserve—such as a person's clothing, an object in their hand,
or the direction of light—rather than repeating a full inventory of the image.

```text
Opening alignment: use the supplied image as the starting state at 0.00 s.

integrated_multimodal_description: [Shot 1] [Establish the visible scene and
composition. Describe one physical action, the camera's movement, and the
resulting state. Preserve the selected identity and scene anchors as the scene
develops.]

overall_soundscape: [Ambience and physical sounds caused by the action.]

non_diegetic_music: [Audience-only score, or N/A.]
```

The alignment line is an original paraphrase of the documented image role.
If the selected endpoint requires the official prompt format, follow the
linked guide's alignment rules and the selected adapter's exact input roles.

## First-and-last-frame prompt

For a route that accepts both frames, describe the transition instead of
restating two still-image inventories. MiniMax's official guidance recommends
a continuous single-shot path as a useful default for interpolation; choose
another shot structure only when the intended action calls for it. The model
may still vary details, so phrase preservation as direction rather than a
guarantee.

```text
Frame alignment: supplied opening image at 0.00 s; supplied ending image at
[duration] s. Both belong to Shot 1.

integrated_multimodal_description: [Shot 1] [Describe the physical action and
camera path from the opening arrangement toward the ending composition. Name
the identity, object, and spatial details that should remain recognizable.]

overall_soundscape: [Sounds that progress with the action.]

non_diegetic_music: [Audience-only score, or N/A.]
```

Use the endpoint's effective duration and the adapter's exact input roles.
Avoid claiming the supplied endpoint frame will be reproduced pixel for pixel.

## Example

Original, untested example for an opening-image request:

```text
Opening alignment: use the supplied image as the starting state at 0.00 s.

integrated_multimodal_description: [Shot 1] A close view of a red paper kite
resting on a grassy hill. A child's hand lifts the wooden spool; the kite rises
into a steady breeze while the camera tilts up to keep it in frame. Keep the
red kite and pale clouded sky recognizable as it climbs.

overall_soundscape: Wind moves through the grass. The spool clicks, then line
whirs out softly as the kite lifts.

non_diegetic_music: N/A
```

Sources reviewed 2026-09-30:

- [MiniMax H3 base video prompt guide](https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/docs/VIDEO_PROMPT_WRITING_GUIDE_base_en.md)
- [Fal H3 image-to-video route](https://fal.ai/models/minimax/h3/image-to-video/api)
