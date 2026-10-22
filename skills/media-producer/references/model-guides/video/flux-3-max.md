# FLUX 3 Max Video Prompt Guide

FLUX 3 Max is fal Research's post-trained FLUX 3 video model, developed with
Black Forest Labs. Use this guide for Max; the base
[FLUX 3 guide](flux-3.md) covers different operation routes.

## Choose the Fal.ai operation

All three routes belong to the `flux-3-max` video model family:

| Intended input | Exact route | Direction to write |
| --- | --- | --- |
| Text, without a starting image | `blackforestlabs/flux-3-max/text-to-video` | Establish the scene, then direct its action, camera, and sound |
| Starting image, optionally an ending image | `blackforestlabs/flux-3-max/image-to-video` | Direct what changes after the opening, or how it reaches the ending |
| Images anchored at chosen frame positions | `blackforestlabs/flux-3-max/keyframes-to-video` | Explain the movement between the supplied compositions |

The optional ending image is part of Max's image-to-video request, not a
separate first/last-frame route. Do not infer a Max draft, enhance, edit, or
extend operation from the base model's routes. Read the selected live schema
for current fields and constraints before authoring a native request.

## Start with visible action

Fal's [Max launch examples](https://fal.ai/flux-3-max) establish a shot's
setting and photographic treatment around a concrete sequence of actions.
For text-to-video, supply the appearance and composition that an opening
image would otherwise establish. Give the shot a readable ending rather than
only a mood or an inventory of objects.

Original, untested text-to-video example:

```text
One continuous eight-second medium shot inside a small watch repair shop at
dusk. A watchmaker in a blue apron turns a brass desk lamp toward an open
pocket watch, lowers a magnifier to her eye, then pauses over its mechanism.
The camera slowly pushes toward her hands. Cool window light and a warm pool
of lamplight, restrained natural color. Sound: a lamp switch click, faint
ticking, distant street traffic; no music.
```

Agent recommendation: the lamp adjustment, inspection, and pause give this
insert a small progression and a resting point for an edit. If it feels rushed,
remove an action before adding more descriptive text.

## Animate the image rather than replace it

Fal's [Max prompting tutorial](https://fal.ai/learn/tools/flux-3-max-prompting-guide)
reports observations from its image-to-video experiments. It recommends a
camera direction and speed, ordered main action, secondary environmental
motion, light behavior, and a short sound description. The starting image
already supplies appearance, so spend most words on change. These are useful
authoring choices, not required headings or a guarantee of output quality.

Original, untested example for a supplied still of a florist holding a ribbon
around a bouquet:

```text
The camera holds at the opening waist-height angle. The florist draws the
ribbon snug around the stems, ties one bow, then lets her hands rest on the
counter. A leaf trembles as the stems settle. Keep the soft window light
steady. One continuous shot. Sound: ribbon sliding, a light tap on the wooden
counter, quiet room ambience.
```

Agent recommendation: this directs the hands already present in the image
without introducing a new opening pose, costume, or location. Keep appearance
reminders selective when a particular detail must remain recognizable.

For a start/end pair, describe the physical transition between the actual
poses. For example, if the supplied ending shows the finished bouquet lying on
the counter, replace the last action with lowering it and releasing the stems.
This is an authoring recommendation; an ending image does not establish how
every intermediate frame will look.

## Direct movement between keyframes

The [Max keyframe API](https://fal.ai/models/blackforestlabs/flux-3-max/keyframes-to-video/api)
describes images pinned to frame positions, with the prompt directing movement
between them. Its reviewed schema uses `keyframes` entries containing
`image_url` and `frame_index`. Frame positions refer to a 24 fps video; current
documentation allows up to ten images with unique positions no later than
`duration * 24`. Recheck the selected schema rather than copying these dated
limits into a new request.

Original, untested example: three supplied images show a closed music box,
the lid halfway raised, and the lid open, all from the same camera position:

```text
One continuous locked close-up. The hand lifts the music-box lid slowly from
closed through the half-open position to fully open, then releases it. The
small dancer inside begins to turn as the lid rises and keeps turning after
the hand withdraws. Keep the tabletop and afternoon light steady. Sound: a
soft hinge creak followed by a delicate mechanical melody.
```

Agent recommendation: place those images at the intended opening, middle,
and ending positions through the native request, then use prose for the action
between them. Array order alone does not express Max's frame positions. Choose
anchors with a plausible path between poses; incompatible viewpoints may need
a deliberate cut or different images, not stronger continuity adjectives.
This example is agent-authored guidance, not a tested Max keyframe result.

## Iterate from a specific symptom

- **An unwanted cut:** Fal's Max tutorial reports occasional angle changes in
  its takes and recommends explicitly requesting one continuous shot. As an
  agent recommendation, also remove conflicting camera instructions before
  retrying.
- **Too little subject motion:** agent recommendation: replace vague direction
  such as making a scene lively with one visible verb and an ending state,
  such as folding the note and placing it beside the cup.
- **The shot is too busy:** agent recommendation: retain the main action and
  one supporting motion; keep the camera fixed for the next comparison.
- **A transition misses the intended pose:** agent recommendation: inspect the
  chosen anchors and frame positions, then simplify the action between them.
  More prose cannot guarantee interpolation or identity preservation.

Sound descriptions direct generated audio. They do not supply an uploaded
voice reference or establish a reusable cast voice. Use the selected schema's
audio control when the user wants a silent clip.

## Research and verification

Prompting sources reviewed 2026-10-22:

- [Fal: FLUX 3 Max Prompting Guide](https://fal.ai/learn/tools/flux-3-max-prompting-guide): provider-authored image-to-video observations and worked examples; these are not a keyframe evaluation.
- [Fal: FLUX 3 Max launch](https://fal.ai/flux-3-max): model identity and demonstrated text-to-video shot direction.

Exact route references reviewed 2026-10-22:

- [Text-to-video API](https://fal.ai/models/blackforestlabs/flux-3-max/text-to-video/api)
- [Image-to-video API](https://fal.ai/models/blackforestlabs/flux-3-max/image-to-video/api)
- [Keyframes-to-video API](https://fal.ai/models/blackforestlabs/flux-3-max/keyframes-to-video/api)

The keyframe schema was also inspected through Renku's schema command. All
examples here are original and untested; no paid generation verified their
visual results. Provider schemas remain the authority for request structure.
