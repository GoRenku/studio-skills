# Seedance 2.5 image-to-video and first/last frames

Read [index.md](index.md). Inspect the exact submitted frames. Use this for
opening-frame animation or a transition to a submitted ending frame, only when
the selected route exposes those inputs. Frames go in their native fields;
do not invent numbered reference mentions for implicit frame inputs.

## Animate the existing state

Renku recommendation: spend the prompt on change over time rather than describing
a different picture. Choose the movement, the camera's evolution, and the few
source details whose drift would damage the shot. An instruction to preserve a
face or rigid object is an intention to review, not a model guarantee.

Original opening-frame example, not generated or tested:

```text
Begin from the supplied opening frame. The archivist remains seated at the
same desk, with the same face, dark cardigan, lamp, and ledger.
She lifts her gaze from the ledger toward the door on frame right, then
rests her pen beside the open page. A slow straight push-in ends on her
reaction; do not orbit or change the room layout. The lamp stays steady.
Sound: paper movement and faint corridor footsteps, no speech or music.
```

This changes gaze and framing while preserving the source scene. It avoids
asking for a new costume, location, or lighting setup during the animation.

## Reach an ending frame through movement

Treat an ending frame as a destination only when it is submitted as an ending
frame. Describe a plausible path from the opening state to that destination.
For a reference image with a desired pose, instead use the reference guide;
prose alone does not create a binding frame input.

Original first/last-frame example, not generated or tested:

```text
The supplied opening image is the starting state; the supplied ending image
is the destination. In one continuous shot, the actor rises from the chair,
walks around its left side, and stops at the window in the ending pose.
The camera translates right into the ending composition. Preserve her face,
gray jacket, chair, window, floor pattern, and overcast daylight.
Reach the destination by walking and camera movement rather than dissolving
or morphing. Sound: chair creak, three measured footsteps, held room tone;
no dialogue or music.
```

Renku rewrite suggestions: if the transition morphs, clarify the physical path
and simplify incompatible poses or camera demands. If the end arrives too soon,
give the approach and settled ending separate time budgets that fit the selected
duration. If background geography drifts, identify the stable landmarks rather
than adding more decorative style words.

Sources read 2026-09-30: ByteDance's
[2.5 introduction](https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5)
shows frame-controlled generation; the
[BytePlus guide](https://fal.ai/learn/devs/how-to-use-seedance-2-5) distinguishes
frame generation from references and discusses source-dependent parameters.
Their application controls do not establish every provider's API. Live schemas
own current inputs and bounds; the examples and repairs here are agent guidance.
