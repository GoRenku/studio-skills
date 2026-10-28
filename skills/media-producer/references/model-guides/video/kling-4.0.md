# Kling 4.0

Use this guide for Kling 4.0 on Fal.ai, Pika, Replicate, and WaveSpeed.
Choose the operation from the intended input roles, then inspect that route's
live schema. A reference for appearance is different from a binding first frame.
Read the selected provider's reference-input adapter for exact mentions.

## Choose the operation

These are the bundled routes checked on 2026-10-27:

| Provider | Input role | Exact API id |
| --- | --- | --- |
| Fal.ai | Text | `kling/v4/text-to-video` |
| Fal.ai | First frame, optional middle/end frames | `kling/v4/image-to-video` |
| Fal.ai | Images, videos, elements, or voice identities | `kling/v4/reference-to-video` |
| Pika | Text | `kling/kling-4.0/text-to-video` |
| Pika | First frame, optional middle/end frames | `kling/kling-4.0/image-to-video` |
| Pika | Multimodal references or a base video | `kling/kling-4.0/omni-video` |
| Replicate | Text, keyframes, references, or a base video | `kwaivgi/kling-v4.0` |
| WaveSpeed | Text | `kwaivgi/kling-v4.0/text-to-video` |
| WaveSpeed | First frame, optional middle/end frames | `kwaivgi/kling-v4.0/image-to-video` |
| WaveSpeed | Multimodal references | `kwaivgi/kling-v4.0/reference-to-video` |
| WaveSpeed | Edit a source clip | `kwaivgi/kling-v4.0/video-edit` |
| WaveSpeed | Continue a source clip | `kwaivgi/kling-v4.0/video-extend` |

[Replicate](https://replicate.com/kwaivgi/kling-v4.0) uses one route, selecting
the operation from the supplied inputs. `base_video` selects editing and fixes
output length and aspect ratio to that clip. Images are numbered across frame
and reference fields, not just within the reference array; follow its adapter.
Its inspected schema has no uploaded audio, voice identity, or audio toggle.

Fal's current [catalog](https://fal.ai/explore/kling) and
[image API](https://fal.ai/models/kling/v4/image-to-video/api) document generation
routes. Its [edit API](https://fal.ai/models/kling/v4/video-to-video/edit/api)
explicitly still says API access is coming soon; that operation is excluded
from bundled discovery. The older [launch page](https://fal.ai/kling-4) describes
early access. A listed route is not proof of account access or a completed run.

Pika's [API catalog](https://dev.pika.art/models/kling/kling-4.0) lists three
operations despite its [consumer page](https://pika.art/model/kling-4-0) still
saying coming soon. The [Omni playground](https://dev.pika.art/models/kling/kling-4.0/omni-video/playground)
shows base-video and reference inputs. Recheck its live schema for exact native
fields and mentions; do not copy another provider's syntax into Pika.

[WaveSpeed's current release notes](https://wavespeed.ai/blog/ai-news/kling-4-0-is-coming-what-we-know-and-how-to-prepare-on-wavespeedai/)
document five operations. Extend returns the original clip joined to the new
segment. Reference audio is supported on its reference route, while video edit
keeps source sound by default. Inspect the selected schema before changing sound
or duration behavior.

The reviewed hosted routes document 720p/1080p generation, generally 3–30
seconds. Do not infer hosted 4K/HDR, two-minute extension, or a callable Flash
route from the model developer's product announcements. Flash is not included
in this addition. Current schemas own limits and defaults, not this guide.

## Start with a concrete event

The [official Kling 4.0 user guide](https://kling.ai/quickstart/kling-4-model-user-guide)
recommends visible details over abstract adjectives, positive direction over
long negative lists, and explicit roles for assets. Begin with subject, place,
action, and emotion; add camera, timing, audio, and preservation only where they
affect the take. More words are not automatically better.

Original, untested text-to-video example:

```text
One continuous eight-second waist-height shot in a closed watch repair shop.
A watchmaker slides an envelope under the door, withdraws her hand, and waits.
The camera slowly moves closer as she listens. A brass desk lamp lights her
hands; blue evening light falls across the floor. Sound: paper scraping,
distant traffic, then three quiet knocks from the other side. No music.
```

Agent recommendation: the envelope, pause, and knocks establish a visible
progression with a clear ending. If eight seconds feels crowded, remove a beat
before adding more prose.

## Frames, reference roles, and shot order

Kling's official guide distinguishes keyframes that anchor visual moments from
Omni references that contribute identity, setting, motion, or style. State what
each contributes. Use a storyboard as direction for finished footage rather
than asking to film the sheet itself. Product-mode features do not establish
every provider's available fields.

Fal's [60-example prompting guide](https://fal.ai/learn/devs/kling-4-prompting-guide)
demonstrates both compact briefs and detailed sequences. Its motion-reference
examples separate the source action or camera path from replacement appearance;
its frame examples direct movement between supplied images. For image-to-video,
spend the prompt on what happens after the visible opening. With an ending
frame, describe how the subject reaches that state.

Original, untested example for an opening frame of a courier holding a sealed
parcel, with an ending frame showing it resting on the counter:

```text
The courier lowers the parcel onto the counter, releases both hands, then
steps back. The clerk reaches toward it only after the courier lets go.
One continuous locked medium shot. Keep the window light steady.
Sound: cardboard touches wood, coat fabric, quiet room tone.
```

For longer scenes, Fal's examples connect events through action and cuts.
Its [text API](https://fal.ai/models/kling/v4/text-to-video/api) supports
`multi_prompt` with per-shot durations whose sum determines clip length.
Use that structure only where exposed. An agent recommendation for a single
take is to say so and remove competing cut instructions; timestamps express
intent, not guaranteed frame accuracy.

Original, untested reference brief; replace bracketed placeholders through the
selected provider adapter after final input order is known:

```text
[CAST_IMAGE] defines the courier's face and raincoat.
[LOCATION_IMAGE] defines the arcade's stone columns and wet floor.
[MOTION_VIDEO] supplies only the walking pace and camera path.
The courier crosses the arcade, slows at the shuttered shop, then looks back.
Preserve the courier's appearance through the turn. The camera follows at
shoulder height without cutting. Rain outside, shoes on stone, no music.
```

Agent recommendation: separate source responsibilities before adding camera
detail. A motion reference should not silently replace the intended cast or set.

## Dialogue and sound

The official guide describes audio inputs as voice-profile references, not
uploaded music or sound-effect tracks. Describe ambience and effects in prose.
Native generated speech does not establish exact Dialogue Audio playback.

Luma's [worked Kling 4.0 tutorial](https://lumalabs.ai/learning-center/articles/kling-4-complete-guide)
separates speaker, quoted line, vocal delivery, ambience, effects, and music.
Its published two-speaker example reports an eight-second take with both lines;
that is evidence for its demonstrated workflow, not a guarantee for these
providers. Apply voice references only through the selected hosted route's
documented inputs. Follow shared [audio and voice routing](../shared/audio-and-voice.md).

Original, untested dialogue example:

```text
The clerk glances at the parcel, then meets the courier's eyes.
Clerk, quiet Spanish, cautious: "¿Lo ha visto alguien?"
The courier waits a beat, then replies in Spanish, breathless: "Todavía no."
Hold a medium two-shot. Sound: rain against the glass and a faint clock tick.
No background music or subtitles.
```

## Edit narrowly and iterate from the symptom

Luma's targeted-edit examples specify the change and the source properties to
preserve. Agent recommendation: for a background replacement, name the new
setting and retain the performance, prop handling, and camera path explicitly.
For extension, describe the next action from the actual final state rather than
repeating the opening. Use an extension route only where documented.

These are agent rewrite recommendations, not measured model defects:

- **The clip copies the motion source's costume:** restrict that reference to
  motion and name the appearance reference separately.
- **An unwanted cut interrupts a take:** request continuous movement and remove
  language that asks for another angle.
- **The sheet appears in the video:** describe the intended finished scene and
  the sheet's planning role; avoid asking the camera to show the reference.
- **Dialogue is rushed:** shorten the lines or allocate more time to speech,
  reducing simultaneous action for the next comparison.
- **An edit changes too much:** retain one requested change and explicitly name
  the source performance and composition to preserve.

## Research and verification

Prompting sources and linked provider documentation were read 2026-10-27.
The maker's guide supplies model-level advice; Fal and Luma supply substantive
worked examples. Luma's controls are not assumed to exist on our providers.
Replicate's live schema was inspected through `renku generation schema show`;
the other providers were checked against public route documentation. All new
examples are original and untested. No paid generation established output
quality or account access, and no comparative quality ranking is claimed.
