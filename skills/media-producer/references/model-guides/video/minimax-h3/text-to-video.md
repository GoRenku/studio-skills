# MiniMax H3 Text-To-Video

Use this for a text-only H3 request when no supplied image, video, or audio
should guide the result. MiniMax's official base guide recommends three
sections. Keep them concise: the first carries the visual and audible events
that happen in the scene; the next two describe continuous location sound and
audience-only score.

## Prompt structure

```text
integrated_multimodal_description: [Shot 1] [visual style, framing, subject,
setting, action, and camera movement in playback order. Add a later [Shot N]
only when there is an intentional cut. Put known dialogue and sounds caused by
the visible scene here.]

overall_soundscape: [Continuous ambience and physical sounds across the clip.]

non_diegetic_music: [Background score the characters cannot hear, or N/A.]
```

These section labels follow MiniMax's published H3 prompt-writing format.
They belong in prompt text; the selected route's schema defines native fields.

## Practical direction

- Start with the image the viewer should see, then describe a small sequence of
  actions in the order they happen. Avoid asking one short clip to perform
  several unrelated scene changes.
- Give camera movement an observable path and endpoint. Use a cut only when a
  new view adds information; if the camera should simply reveal more of the same
  place, direct a pan, track, or push instead.
- Describe physical sound in the soundscape. Put dialogue and sound tied to an
  event in the timeline. Use `N/A` for score when the user wants no added music.
- For exact dialogue, preserve the supplied words and identify who speaks.
  MiniMax's base guide recommends stable speaker IDs when speech continues
  across shots; do not add a line the user did not provide.

## Example

This original example has not been generated or tested.

```text
integrated_multimodal_description: [Shot 1] Live-action, a wide view of a
small greenhouse at dusk. A gardener in a green work jacket sets a clay pot on
the bench, checks the new leaves, and turns the pot toward the open window. The
camera tracks slowly along the bench and settles on the leaves. The gardener
(S1) says: <d>[English] That one finally made it.</d>

overall_soundscape: Light rain ticks against the glass. The pot scrapes over
wood, and a loose vent taps once in the breeze.

non_diegetic_music: N/A
```

If another shot is requested, make the transition and cut time clear, then
restate only the appearance details needed to keep continuity. For a first or
last image, use the image-to-video guide instead.

Sources reviewed 2026-09-30:

- [MiniMax H3 base video prompt guide](https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/docs/VIDEO_PROMPT_WRITING_GUIDE_base_en.md)
- [Fal H3 text-to-video route](https://fal.ai/models/minimax/h3/text-to-video/api)
