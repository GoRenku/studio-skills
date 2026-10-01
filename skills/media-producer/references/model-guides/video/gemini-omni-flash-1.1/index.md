# Gemini Omni Flash 1.1 Video Prompt Guide

Use this when the selected video model family is Gemini Omni Flash 1.1.

Use the linked advice relevant to the request. Input roles and the selected
route's live schema determine which details apply. Shared advice covers
[prompt input visibility](../../shared/prompt-input-visibility.md) and
[video quality](../../shared/video-quality-checklist.md).

## Operation Guides

| Operation | Guide |
| --- | --- |
| Text-to-video | [text-to-video.md](text-to-video.md) |
| Image-to-video and first/last-frame video | [image-to-video.md](image-to-video.md) |
| Reference-to-video | [reference-to-video.md](reference-to-video.md) |
| Video edit | [video-edit.md](video-edit.md) |

## Universal Prompt Rules

- Describe visible action, camera behavior, physical progression, lighting, and
  desired sound in direct natural language.
- Google says Omni Flash may invent multiple shots when a prompt does not
  constrain shot structure. When a single take matters, say that it is one
  scene and one continuous shot with no cuts; if cuts are wanted, give the
  beats in order.
- Fit one coherent action or a deliberately ordered short sequence into the
  selected duration. Do not overload a short clip with unrelated events.
- State dialogue, ambience, effects, or silence when they matter. The model
  generates native audio, but exact external audio is not an input on the
  currently exposed Gemini Omni Flash 1.1 routes.
- Treat opening, ending, reference, and source-video inputs according to their
  selected operation. Do not turn a binding frame or edit source into a loose
  style reference.
- Use only the exact reference mentions supplied by the Fal adapter. Gemini's
  reference mentions are zero-based and differ from other Fal video models.
- Put critical visible exclusions in the main prompt because these routes do
  not expose a separate negative-prompt field.
- When one uninterrupted shot is required, say all three ideas plainly:
  single scene, single continuous shot, and no cuts.
- Use concise conversational edit instructions. State the change first and
  explicitly preserve everything else that matters. Google's edit examples
  favor a short change instruction and warn that extra scene description can
  introduce unwanted edits.
- Timing can be described in ordinary language or time ranges; the Google guide
  does not require a special timestamp grammar. Name audio when you care about
  it because Omni otherwise attempts to create a suitable track by default.

## Route Constraints

Read the selected route's live schema for duration, resolution, aspect ratio,
required source fields, and current reference limits. Suggest Omni when the
request benefits from cheap 360p exploration, 4K delivery, video references,
conversational editing, or continuation, but execute only capabilities exposed
by the installed route. Treat 4K as an upscale of generated output, not native
recovery of detail absent from the generation.

Google documents model continuation in 10-second increments up to 40 seconds
total. Uploaded continuation input has additional duration, dialogue, and
regional constraints. The current checked Fal route index has no continuation
operation, so stop rather than forcing continuation through its edit route.
The checked Google and Fal reference routes do not accept uploaded audio
references; native generated audio does not change that fact.

## Sources and Confidence

Confidence: high for model prompt craft from Google's official Omni guide;
Fal's live schemas remain the authority for fields available through Renku's
installed Fal provider. Google’s prompt examples are product guidance, not
evidence of guaranteed shot, dialogue, or text outcomes. Operation examples in
the linked files are original and have not been generation-tested.

- [Google Gemini API: Generate and edit videos with Gemini Omni Flash](https://ai.google.dev/gemini-api/docs/omni#prompt-guide)
- `https://fal.ai/gemini-omni`
- `https://fal.ai/models/google/gemini-omni-flash/v1.1/text-to-video/api`
- `https://fal.ai/models/google/gemini-omni-flash/v1.1/image-to-video/api`
- `https://fal.ai/models/google/gemini-omni-flash/v1.1/reference-to-video/api`
- `https://fal.ai/models/google/gemini-omni-flash/v1.1/edit/api`

Google prompt guidance reviewed 2026-09-30. Fal schemas and route pages last
reviewed 2026-08-30; read the live schema again for each request.
