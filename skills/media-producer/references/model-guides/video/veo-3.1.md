# Veo 3.1 Prompt Guide

Use this for a Veo 3.1 route after selecting the provider and operation. Veo's
first-party guidance is unusually practical about cinematography and audio:
write what the viewer should see, how the camera changes the view, and what
should be heard. The exact reference roles, available inputs, and settings
still depend on the selected provider route.

## Shape a prompt as a shot

Start with the framing and subject, then state the action and its setting. Add
lighting and visual finish that change what the camera sees. Give the action a
beginning and a visible ending; for a short clip, reduce the number of events
before adding more adjectives. For audio, name audible sources and connect
effects to visible events. Use dialogue only when the words and speaker are
known.

```text
[Framing and camera path] on [subject] as [one physical action] in [place and
time]. [Lighting and visual finish]. Sound: [specific ambience and effects].
```

For a sequence, add time ranges only when timing or a cut matters:

```text
[0-3s] [Opening view and first action].
[3-6s] [Cut or continuous camera move, then next action].
[6-8s] [Final action and held view].
Sound: [events aligned to the action; dialogue only if supplied].
```

These original examples are untested. Use the live route's duration and
provider's prompt conventions.

## Worked single-shot example

```text
Medium close-up from table height, locked camera. A night-shift baker slides
one scored loaf onto a dark tray; the crust splits along the score and a thin
thread of steam rises. Hold on the loaf as the baker's hand leaves frame.
Warm oven light catches the crust while the bakery behind stays dim and still.
Sound: tray scrape, one dry crust crackle, low oven fan; no dialogue or music.
```

Original, untested example. The loaf, visible scoring, single physical change,
and held final image give the shot a clear event and stopping point. If the
result invents extra activity, remove secondary actions before adding more
style words. If it cuts away, say “one continuous shot, no cuts” and keep the
camera direction compatible with a single view. If the event feels inert, add
one visible cause or reaction rather than several unrelated beats.

## First/last frames and references

- With an opening image, name what changes next. Mention only the identity,
  wardrobe, props, and composition that should remain recognizable; the prompt
  guides generation and cannot guarantee pixel-level preservation.
- With first and last images, describe the physical path between them and the
  camera's path. Treat them as endpoints when the selected route binds them that
  way. Do not ask for a morph unless it is the intended action.
- With reference images, assign each image one role such as identity, prop, or
  setting. Use the selected adapter's exact ordering and mentions. Do not
  transfer reference syntax across providers.
- For continuation, say whether the scene continues or a deliberate new shot
  begins. Follow the selected route's source-video rules and its live schema.

## Dialogue punctuation depends on the surface

Google's Veo 3.1 Cloud prompt article demonstrates spoken dialogue in quotation
marks. Google's current Gemini Enterprise Agent Platform best-practices page
warns that quotation marks can cause visible text and recommends a colon after
the speaker instead. These recommendations address different Google surfaces;
they do not establish one punctuation rule for every Veo provider. For that
Google Cloud surface, follow its current best-practices page. On other routes,
follow their current model/provider instructions and describe spoken words
clearly without implying a typography guarantee.

## Route Constraints

Provider routes differ in tier, operation, and accepted reference types. Read
the selected route's live schema for duration, resolution, aspect ratio,
reference count, and frame or continuation inputs. A capability documented for
Google Cloud or one provider is not evidence that another adapter exposes it.

## Sources

Model-specific craft guidance reviewed 2026-09-30:

- [Google Cloud: The ultimate prompting guide for Veo 3.1](https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1/)
- [Google DeepMind: How to create effective prompts with Veo](https://deepmind.google/models/veo/prompt-guide/)
- [Google Cloud: Best practices for generating videos](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/best-practice)

Provider route references previously checked 2026-09-24:

- [Fal Veo 3.1](https://fal.ai/models/fal-ai/veo3.1)
- [Pika Veo 3.1 text-to-video](https://dev.pika.art/llms/google/veo-3.1/text-to-video)
- [WaveSpeed Veo 3.1](https://wavespeed.ai/veo-3-1-api)
- [Replicate Veo 3.1](https://replicate.com/google/veo-3.1)
