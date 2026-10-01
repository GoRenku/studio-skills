# Veo 3.1 Fast Prompt Guide

Use this when the selected provider exposes a Veo 3.1 Fast route. The Fast name
identifies a route tier; the sources reviewed here do not establish a separate
creative prompt grammar from Veo 3.1. Apply the same shot-planning principles,
then verify that the selected Fast endpoint supports the requested operation.
Read [veo-3.1.md](veo-3.1.md) for the full craft guidance and the distinction
between Google surfaces' dialogue-punctuation advice.

## Keep the direction legible

Write one clear shot with a subject, an action that can finish in the requested
duration, a camera move, and the visible final state. Add a second beat only
when it changes the scene or viewpoint. Include sound only as needed, tying
effects to visible causes and naming the ambience or music that matters.

For a quick text-to-video brief:

```text
Medium side view of a potter shaping a bowl at a wheel. The camera makes a
slow quarter-orbit as the clay rises, then settles on the finished rim. Cool
window light from frame left; quiet studio room tone and the wheel's low hum.
```

Original, untested example. It is not a measured Fast-versus-standard comparison.

When a brief result feels generic, replace mood labels with a visible action and
its ending. For example, revise “A dramatic runner in cinematic rain, dynamic
camera” to “Low side-tracking view of a runner splashing through one shallow
puddle; the camera eases to a stop as the runner exits frame right. Rain streaks
through a hard streetlamp beam; water slaps the pavement.” This original,
untested rewrite narrows the event, direction, and sound source. If the intended
result is one shot, state that it is continuous; if the route's short duration
cannot hold all the requested beats, remove beats instead of compressing them
into a vague montage.

## Match the prompt to the input role

- For an opening image, describe the motion that begins from the depicted state
  and name the few visible traits that should stay recognizable.
- For first/last frames, give one plausible transition between the two
  compositions. Keep identity and screen direction in mind; do not promise exact
  preservation.
- For reference images, state what each image contributes. Use only mentions
  supplied by the selected adapter and avoid making an appearance reference
  behave like a binding first frame.
- For an extension, describe what happens immediately after the source clip's
  ending. State whether the shot and sound continue or a cut begins, using the
  route's actual source-video operation.

## Route Constraints

The bundled providers do not expose identical Fast operations. Check the live
schema for available inputs, duration, reference limits, and extension fields.
Do not infer feature parity from the shared model name or transfer provider
notation between routes.

## Sources

General Veo craft guidance and current Google surface distinctions reviewed
2026-09-30:

- [Google Cloud: The ultimate prompting guide for Veo 3.1](https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1/)
- [Google DeepMind: How to create effective prompts with Veo](https://deepmind.google/models/veo/prompt-guide/)
- [Google Cloud: Best practices for generating videos](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/best-practice)

Fast provider route references previously checked 2026-09-24:

- [Fal Veo 3.1 Fast reference-to-video](https://fal.ai/models/fal-ai/veo3.1/fast/reference-to-video/api)
- [Pika Veo 3.1 Fast text-to-video](https://dev.pika.art/llms/google/veo-3.1-fast/text-to-video)
- [WaveSpeed Veo 3.1](https://wavespeed.ai/veo-3-1-api)
- [Replicate Veo 3.1 Fast](https://replicate.com/google/veo-3.1-fast)
