# FLUX 3 Video Prompt Guide

FLUX 3 combines video and audio generation. Use the operation and exact route
that match the supplied media; provider endpoints expose different fields and
controls.

## Build a shot the camera can show

Black Forest Labs' current FLUX 3 video skills divide prompt work by job—new
shot direction, keyframes and continuation, dialogue, and diagnosis. Fal's
worked tutorial gives four useful prompt shapes: a short phrase for exploration,
a natural-language shot, labeled fields for controlled revisions, and timed
beats when events must land in sequence. These are authoring options, not a
required syntax. Keep only the detail that helps direct the result; a long
inventory can obscure the subject's action and camera path.

An original, untested compact example:

```text
A brass alarm clock rings on a cluttered bedside table in morning light.
The camera slowly pushes closer as a hand presses its top button, then holds
on the released button. The ringing stops; quiet room tone, no music.
```

If the order or timing matters, rewrite it as a small number of beats. Give
each beat one camera setup and repeat a defining character or object detail
across cuts when it must remain recognizable. Use an explicit cut cue only
where the viewpoint changes.

## Controlled shot example

For a standalone insert, BFL's prompt-writing workflow recommends a visible
cause, physical response, and payoff, with one compatible camera contract.
Translate that into concrete details rather than stacking mood words:

```text
Locked macro view of a cold glass on a rain-dark windowsill. A drop runs down
the pane and strikes the glass rim; the glass gives one small, visible tremor,
then settles. Keep the window, glass, and camera fixed in one continuous shot.
Grey dawn light; a faint rain patter and one clear glass tick, no music.
```

Original, untested example. The drop provides a visible cause, the tremor is a
readable response, and the settled glass gives an edit point. If the event is
hard to read, bring its source and contact point into the same view or simplify
the material action. If the shot drifts, remove the camera move before adding
more continuity adjectives. BFL presents this as a text-only insert workflow;
use supplied media when the composition itself must be anchored.

## Keyframes and continuation examples

On a route that accepts an ordered set of supplied frames, write transitions
between the actual images rather than inventing a new opening. The following
original, untested prose assumes the opening and closing frames show the same
red paper boat on a puddle; it does not prescribe any provider's frame syntax:

```text
Keep the camera at the same curb-height angle. The red paper boat drifts from
the drain toward the center of the puddle as a small ripple reaches it; it turns
halfway and settles facing the curb. Preserve the overcast light and wet street
around it. No cut or camera reset.
```

The prompt gives a modest, physically legible path between two compositions.
If the supplied frames differ too much for that path, simplify the requested
motion or choose new endpoints; prose cannot guarantee exact intermediate
frames. For a route that continues source video, prompt only what happens next:

```text
Continue the bicycle's existing roll along the empty lane. The camera keeps
the same low trailing view as the rider brakes beside a red post and lowers one
foot to the pavement. Tire hiss fades into the quiet street; no new music.
```

This original, untested continuation example starts from the clip's ending and
names the motion, view, and sound that carry forward. Do not use continuation
wording on a text-only route; select the provider's actual continuation mode.

## Choose the prompt for the input

- **Opening image:** describe what begins moving and the framing or appearance
  details that matter to keep recognizable. Do not describe a replacement
  opening composition.
- **First and last images:** direct the action and camera path between the
  endpoints. A transition prompt should explain how the subject reaches the
  ending state, rather than merely restating both stills.
- **Keyframes:** treat each image as a composition anchor, then direct the
  changes between anchors. Retain repeated identity and setting details in the
  prose where needed. Read the selected route's schema for its timing notation.
- **Continuation:** start with the next event after the source clip's final
  moments and say what should continue—movement, framing, light, and sound.
- **Editing:** give one local change first, then say what the edit should leave
  alone. Fal's FAST edit route is described as retaining source motion, timing,
  and framing; that behavior belongs to that route, not every FLUX 3 endpoint.

## Draft and enhance

Draft workflows are useful for comparing uncertain shot direction before a
full-quality pass. On Fal's Draft Enhance route, the returned `draft_cache` is
the input for enhancement; the preview video alone is not interchangeable.
Replicate and other providers expose different draft controls, so check each
selected route's live schema. Keep the accepted prompt and chosen draft linked
in the workflow so enhancement follows the intended version.

## Route Constraints

Fal's keyframe endpoint uses `frame_index`; Pika's image route uses a `keyframes`
array with optional `at_s`; Replicate's reviewed endpoint uses array order.
These are provider contracts, not reusable prompt notation. Check current
schemas for input counts, modes, duration, audio, and draft requirements.

## Sources

Model-specific prompt material reviewed 2026-09-30:

- [Black Forest Labs official skills repository](https://github.com/black-forest-labs/skills), including its [FLUX 3 video router](https://github.com/black-forest-labs/skills/blob/master/skills/flux-3-video/SKILL.md) and specialized prompt-writing workflow
- [Black Forest Labs: FLUX 3 Cinematic Inserts](https://github.com/black-forest-labs/skills/blob/master/skills/flux-3-cinematic-inserts/SKILL.md)
- [Black Forest Labs: FLUX 3 Keyframes and Continuation](https://github.com/black-forest-labs/skills/blob/master/skills/flux-3-keyframes-continuation/SKILL.md)
- [Fal: How to Use FLUX 3](https://fal.ai/learn/tools/how-to-use-flux-3)
- [Black Forest Labs FLUX 3 video model page](https://bfl.ai/models/flux-3-video)

Provider-specific route references last checked 2026-09-24:

- [Fal FAST edit](https://fal.ai/models/blackforestlabs/flux-3/edit-video/api)
- [Fal Draft Enhance](https://fal.ai/models/blackforestlabs/flux-3/draft-enhance/api)
- [Pika FLUX 3 image-to-video](https://dev.pika.art/llms/black-forest-labs/flux-3-video/image-to-video)
- [WaveSpeed FLUX 3](https://wavespeed.ai/collections/flux-3)
- [Replicate FLUX 3](https://replicate.com/black-forest-labs/flux-3/versions/3047b701b1050b47ccea249bf647208439e17e6b4aa399618a57335cac0169a7/api)
