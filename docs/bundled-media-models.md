# Bundled media models by provider

This is the model selection supplied by the Studio Skills source checkout on
2026-09-24. A filled cell means the bundled catalog includes an entry for those
operations on that provider. It does **not** mean a generation was run or that
your account has access. Runtime validation, provider access, and your saved
API key still determine whether a particular request can run.

An em dash means the model is not in this provider's **bundled catalog**. It
does not mean the provider cannot offer it. You can ask the
[Model Researcher](../skills/model-researcher/SKILL.md) to add an exact route to
your personal library without changing the shared catalog. See the
[README instructions](../README.md#add-a-model-for-your-own-use).

## Images

**Generate** makes an image from text. **Edit** uses an existing image as an
input. A single provider endpoint may handle both.

| Model | Fal.ai | Pika | WaveSpeed | Replicate |
| --- | --- | --- | --- | --- |
| GPT Image 2 | Generate, Edit | Generate, Edit | Generate, Edit | Generate, Edit |
| Nano Banana 2 | Generate, Edit | Generate, Edit | Generate, Edit | Generate, Edit |
| Nano Banana Pro | Generate, Edit | Generate, Edit | Generate, Edit | Generate, Edit |
| Grok Imagine Image | Generate, Edit | Generate, Edit | Generate, Edit | Generate, Edit |
| Seedream 5.0 Pro | Generate, Edit | Generate, Edit | Generate, Edit | Generate, Edit |
| FLUX Kontext Pro | Generate, Edit | — | Generate, Edit | Generate, Edit |
| Z-Image Turbo | Generate, Edit | — | Generate, Edit | Generate¹ |

¹ Replicate's Z-Image Turbo route is the PrunaAI deployment of the model.

## Video

**Text** starts from a prompt. **Image** animates a starting image.
**First/last** also supplies an ending image. **References** guide generation
with source media; the accepted media types vary by route. **Edit** changes an
existing video. **Keyframes** places multiple images along a FLUX 3 clip.
**Extend** continues a source video. **Enhance** re-renders a FLUX 3 draft from
its saved draft cache. **3D previs** turns a Blender/previs clip into finished
footage. These are distinct choices even when one provider uses a single
endpoint for several of them.

| Model | Fal.ai | Pika | WaveSpeed | Replicate |
| --- | --- | --- | --- | --- |
| Seedance 2.5 | Text, Image, First/last, References | Text, Image, First/last, References | Text, Image, First/last, References | Text, Image, First/last, References |
| Seedance 2.0 | Text, Image, First/last, References | Text, Image, First/last, References | Text, Image, First/last, References | Text, Image, First/last, References |
| Seedance 2.0 Mini | Text, Image, First/last, References | Text, Image, First/last, References | Text, Image, First/last, References | Text, Image, First/last, References |
| Seedance 2.0 Fast | Text, Image, First/last, References | Text, Image, First/last, References | Text, Image, First/last, References | Text, Image, First/last, References |
| MiniMax Hailuo 3 | Text, Image, First/last, References | Text, Image, First/last, References | Text, Image, First/last, References | Text, Image, First/last, References |
| MiniMax H3 Max | Text, Image, First/last, References, 3D previs | — | — | — |
| MiniMax H3 Max Turbo | Text, Image, First/last | — | — | — |
| Gemini Omni Flash 1.1 | Text, Image, First/last, References, Edit | Text, Image, First/last, References, Edit | Text, Image, First/last, References, Edit | Text, Image, First/last, References, Edit |
| Wan 3.0 Prime | Text, Image, First/last, References | Text, Image, First/last, References | Text, Image, First/last, References | Text, Image |
| Veo 3.1 | Text, Image, First/last, References, Extend | Text, References, Extend | Text, Image, First/last, References, Extend | Text, Image, First/last, References |
| Veo 3.1 Fast | Text, Image, First/last, References, Extend | Text, References, Extend | Text, Image, First/last, References, Extend | Text, Image, First/last, References |
| Veo 3.1 Lite | Text, Image | Image | Text, Image, First/last | Text, Image, First/last |
| FLUX 3 | Text, Image, First/last, Keyframes, Extend, Edit | Text, Image, First/last, Keyframes, Extend | Text, Image, First/last, Extend | Text, Image, First/last, Keyframes, Extend |
| FLUX 3 Draft | Text, Image, First/last, Keyframes, Extend, Enhance | — | Text, Image, First/last, Extend | Text² |

² Replicate offers Draft as a text-only option on its FLUX 3 endpoint rather
than a separate route.

For Seedance 2.5 and 2.0 on WaveSpeed, the text-to-video route also accepts
reference inputs. On Replicate, one Seedance model endpoint covers all four
listed modes. Select the mode that matches your inputs; the agent checks that
provider's live schema before preparing the request.

Fal.ai's H3 Max 3D previs route uses a source 3D render or Blender video as its
motion and camera guide. H3 Max Director is an interactive real-time API and is
not listed as a bundled generation route. Pika's published Veo 3.1 Lite route
accepts an opening image; its Standard and Fast text routes accept reference
images. Fal.ai's FLUX 3 Edit route is labeled FAST by that provider. The FLUX 3
Draft row lists only published draft modes for each provider.

## Audio

**Speech** turns text into spoken audio. **Music** creates music from a prompt.
Voice sample retrieval gets an existing voice sample; it is not a generation
model.

| Model or capability | Fal.ai | Pika | WaveSpeed | Replicate | ElevenLabs |
| --- | --- | --- | --- | --- | --- |
| Seed Audio 1.0 | Speech | Speech | Speech | — | — |
| MiniMax Speech 2.8 HD | — | — | — | Speech | — |
| Eleven v3 | — | — | — | — | Speech |
| Eleven Multilingual v2 | — | — | — | — | Speech |
| Eleven Turbo v2.5 | — | — | — | — | Speech |
| Eleven Music | — | — | — | — | Music |
| ElevenLabs voice sample retrieval | — | — | — | — | Voice sample |

## Exact route IDs

The tables summarize the bundled selection. Provider IDs, exact API route IDs,
and documentation links live in the current
[Fal.ai](../skills/fal-ai-media-provider/references/supported-routes.json),
[Pika](../skills/pika-media-provider/references/supported-routes.json),
[WaveSpeed](../skills/wavespeed-media-provider/references/supported-routes.json),
[Replicate](../skills/replicate-media-provider/references/supported-routes.json),
and [ElevenLabs](../skills/elevenlabs-media-provider/references/supported-routes.json)
indexes. The installed plugin may have a different selection until a new
release is installed.
