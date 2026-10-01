# MiniMax H3 Reference-To-Video

Use this when supplied references should contribute selected content to one
new result. H3's official full-reference guide separates reference roles,
retention intent, the playback description, location sound, and audience-only
music. Use these ideas as prompt-writing guidance; check the selected endpoint
before assuming it accepts a particular media type or reference role.

The provider adapter supplies the actual media fields and any visible tokens.
Use exact mentions from the prepared request, derived from final
modality-local order. Do not copy the official guide's `<Subject N>`,
`<Picture N>`, `<Video N>`, or `<Audio N>` labels into a provider prompt unless
the selected route's adapter explicitly supplies that syntax.

## Give each reference one job

Describe a reference's role at the level needed for the intended shot:

- An image may anchor a specific composition or contribute selected traits
  such as a face, garment, prop, or location.
- A video may contribute a source edit, temporal structure, performance, or
  camera rhythm. Say which role applies.
- An audio input, when the selected route supports it, may contribute voice
  timbre, sound texture, music, or source audio. Do not imply that a video
  reference automatically supplies audio guidance.
- Resolve conflicts in the prompt by stating which reference controls the
  relevant trait.

For every reference, distinguish copied source content from traits that should
only influence a newly created result. The terms below are plain-language
guidance; they do not guarantee that the generated output will preserve a
reference exactly.

## Adapted prompt outline

This outline uses the ideas in MiniMax's official six-part reference format
without treating its model-internal labels as provider API tokens. Replace
`[REFERENCE]` only with syntax supplied by the selected adapter.

```text
SUBJECT DEFINITIONS
[REFERENCE] contributes [specific trait or source role] for [part of result].

TASK
Create [one coherent result and intended ending].

REFERENCE USE
Use [REFERENCE] for [narrow role]. Keep [selected characteristics] recognizable;
change [characteristics that should differ].

PLAYBACK DESCRIPTION
[Shot 1] [composition, subject, action, camera, lighting, and dialogue in
playback order. Add a later shot only for a deliberate cut.]

SOUND
[Location ambience and physical sounds, or silence.]

MUSIC
[Audience-only score, or N/A.]
```

The section labels above are a readable scaffold, not required route syntax.
When the endpoint expects MiniMax's full-reference output format, use its
official label and section rules while substituting only supported provider
mentions.

## Example

Original and untested. It illustrates two distinct roles; remove either role if
the route or reviewed request does not contain that input.

```text
SUBJECT DEFINITIONS
[IMAGE_REFERENCE] contributes the courier's dark coat and short silver hair.
[VIDEO_REFERENCE] contributes the measured walking pace and the camera's
side-on tracking rhythm.

TASK
Create one dusk scene in a quiet station passage, ending when the courier stops
at a closed door.

REFERENCE USE
Use [IMAGE_REFERENCE] for the courier's appearance and [VIDEO_REFERENCE] for
movement and camera rhythm. Let the station architecture come from this prompt.

PLAYBACK DESCRIPTION
[Shot 1] The courier walks beside tiled walls, slowing as a warm light appears
under the door. The camera tracks at waist height and settles when the courier
stops. The courier touches the brass handle but does not open the door.

SOUND
Soft shoe taps echo on tile; a low ventilation hum continues underneath.

MUSIC
N/A
```

Sources reviewed 2026-09-30:

- [MiniMax H3 full-reference prompt guide](https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/docs/VIDEO_PROMPT_WRITING_GUIDE_ref_en.md)
- [MiniMax H3 base video prompt guide](https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/docs/VIDEO_PROMPT_WRITING_GUIDE_base_en.md)
- [Fal H3 reference-to-video route](https://fal.ai/models/minimax/h3/reference-to-video/api)
