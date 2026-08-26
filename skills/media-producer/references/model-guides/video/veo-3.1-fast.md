# Veo 3.1 Fast Prompt Guide

Use Veo 3.1 Fast for text-to-video, opening-image video, and first/last-frame
video through any supported provider route. The live schema decides which of
those operations and controls are currently available.

## Prompt Guidance

- Describe subject action, camera motion, environmental change, timing, visual
  continuity, and requested native audio as observable events.
- For text-only generation, keep one coherent scene or clearly ordered sequence
  that fits the selected duration.
- For an opening-image input, treat the supplied image as the binding initial
  state and focus the prompt on motion, camera evolution, and what must remain
  stable.
- Do not invent reference roles or prompt mentions for implicit frame inputs.

## First And Last Frames

A first-and-last-frame request should describe one continuous transition
between the two supplied states, name the intended action and camera evolution,
preserve identity and geography, and avoid inventing intermediate cuts or new
subjects. Reject morphing when physical movement is intended.

## Provenance

Recovered from the Veo 3.1 first/last-frame research example and Veo 3.1 Fast
route guidance retained before the model-first refactor. Provider request fields
and current constraints remain owned by adapters and the live schema.
