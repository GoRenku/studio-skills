# Seedance 2.5 reference-to-video

Read [index.md](index.md), and [native-audio.md](native-audio.md) when sound or
speech matters. Reference conditioning guides the result; it does not bind an
exact opening frame or promise exact movement or waveform transfer.

Assign every image, video and audio reference a specific role. Derive native
mentions from the provider adapter and final modality-local array order. Keep
appearance references separate from motion/camera and sound intent.

## Make reference responsibilities explicit

The [BytePlus guide](https://fal.ai/learn/devs/how-to-use-seedance-2-5) recommends
explicit subject-to-material mappings, including what should not transfer. If
several views show the same subject, say so rather than asking for several
subjects. A video that already conveys the desired performance need not have
every movement restated; redundant descriptions can conflict with it.

Renku recommendations:

- Name which subject each appearance image belongs to and which details matter.
- For motion footage, identify the portion or behavior to inherit and exclude
  the source performer, costume, background, or finish when those are unwanted.
- Distinguish final-style footage from proxy Previs. Previs geometry is spatial
  evidence; it does not supply the final face, costume, or surface treatment.
- Resolve competing roles. An environment image should not silently replace
  a camera path; a performance video should not redesign the appearance image.
- Select relevant references rather than filling the route's capacity. Use
  scene-specific mappings when an edited sequence draws on different subjects.

## Storyboards and ordered image states

The [primary BytePlus guide](https://docs.byteplus.com/en/docs/modelark/seedance-2-5-prompt-guide)
distinguishes multi-panel storyboards, which mainly guide plot, from separately
supplied ordered images, which can guide closer frame alignment. Neither
reference arrangement establishes the selected route's native frame inputs.

Renku recommendation: say whether a board represents edited shots or waypoints
along one continuous take. Translate missing camera, movement, and final-style
information into the prompt, without assuming that each panel will be reproduced
exactly. If separate images describe successive states, identify their order and
the physical change connecting them. Use actual frame inputs when the selected
operation and directing intent require those endpoints.

For Renku's detailed panel audit, motion translation, artifact suppression,
and continuity workflow, read
[the shared Seedance storyboard advice](../seedance-2.0/storyboard-reference-to-video.md).
That is agent-owned workflow guidance; use the 2.5 evidence above for this
version's reference and timing expectations.

## Previs and appearance

For Previs, describe one continuous shot with spatial relationships, ordered
actions and the director's important event times. Use the video for staging and
camera, sheets for final character/location appearance, and selected audio for
its stated performance role. Translate visual style into concrete visible traits.
Keep an authored edited sequence as edited when that is the directing intent;
the continuous-shot template below does not override it. Follow the existing
[Previs handoff](../../../shot-plan-video/blender-previs.md) for exact revisions,
chosen media, and timing maps.

```text
<VIDEO_1> supplies the blocking and camera path.
<IMAGE_1> supplies the first character's appearance; <IMAGE_2> supplies the location.
<AUDIO_1> supplies the selected dialogue performance.
Create one continuous shot: [action, geography, camera, ordered event times].
Preserve [priority continuity]. Sound: [exact line and intended onset, if requested].
Replace proxy geometry with the referenced appearances; omit labels and sheet panels.
```

This is an authoring template, not a tested request. These placeholders must
become the actual adapter mentions for supplied inputs.
Omit audio wording when there is no audio input or sound direction. Check duration
and reference limits before compressing a performance. Do not promise exact onset,
waveform preservation or motion transfer. Review motion and audio independently.

Original appearance/motion example, not generated or tested. Replace the neutral
markers with the selected adapter's exact mentions:

```text
<IMAGE_1> supplies only the dancer's face, cropped hair, and charcoal costume.
<VIDEO_1> supplies only the sidestep, planted turn, and low tracking camera.
Do not copy its performer, rehearsal room, clothes, or gray proxy surfaces.
<IMAGE_2> supplies the final stage: dark wooden floor, one amber side light,
and a black curtain. Keep the stage geography fixed.
The dancer from <IMAGE_1> performs that movement on the stage from <IMAGE_2>.
After the planted turn she holds her balance; the camera settles at waist
height. Natural full-body movement, one continuous shot. Sound: shoes and
fabric, no speech or music. No duplicate dancer or visible sheet layout.
```

The reference video carries the movement; the prompt identifies whose movement
it becomes and where it occurs. It does not unnecessarily rewrite the complete
performance into a competing timeline.

## Review and focused rewrites

Agent suggestions when the returned result misses the brief:

- Source-room leakage: narrow the video to performance/camera and explicitly
  assign environment to the intended location reference.
- Multiple versions of one subject: clarify that views show the same person or
  prop, then remove redundant images if they do not help this shot.
- Correct staging but proxy appearance: name the mapping from each featured
  proxy to its appearance image and the final material/light treatment.
- Competing motion: remove a prose movement that contradicts the intended video,
  keeping the required ending state and directing priorities.

Prompting sources read 2026-09-30:
[BytePlus's primary prompt guide](https://docs.byteplus.com/en/docs/modelark/seedance-2-5-prompt-guide),
[its developer-authored tutorial](https://fal.ai/learn/devs/how-to-use-seedance-2-5), and
[Fal's demonstrated reference examples](https://fal.ai/learn/devs/seedance-2-5-prompting-guide).
The [Fal API](https://fal.ai/models/bytedance/seedance-2.5/reference-to-video/api)
is the source for its request contract, not proof of reference fidelity.
