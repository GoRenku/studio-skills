# Seedance 2.5

Use this for the selected Seedance 2.5 route. ByteDance describes a joint
audio/video model with longer generation and richer multimodal referencing
than 2.0. That does not establish a provider's available operations or guarantee
continuity, motion transfer, or speech synchronization. Check the selected
route's live schema and provider adapter for fields, bounds, and exact mentions.

## Choose the relevant craft guide

| Input role | Guide |
| --- | --- |
| A scene created from text | [text-to-video.md](text-to-video.md) |
| An opening image, optionally a required ending image | [image-to-video.md](image-to-video.md) |
| Images, motion video, Previs, or audio used as references | [reference-to-video.md](reference-to-video.md) |
| Dialogue, voice references, ambience, effects, or music | [native-audio.md](native-audio.md) |

Also read shared [input visibility](../../shared/prompt-input-visibility.md)
and [video review](../../shared/video-quality-checklist.md) guidance. A reference
image guides appearance; it is not an exact opening frame unless submitted
through that operation's frame input.

## Prompt construction

BytePlus's [current 2.5 prompt guide](https://docs.byteplus.com/en/docs/modelark/seedance-2-5-prompt-guide)
documents integer-second timestamp direction, contrasting it with 2.0's ordered
shot labels. Use coarse, continuous ranges rather than dense timing instructions.
This describes supported direction, not frame-accurate execution.

BytePlus's [developer-authored guide](https://fal.ai/learn/devs/how-to-use-seedance-2-5)
starts with subject and event, adding environment, visual treatment, camera/cuts,
and sound as needed. A simple action does not need every section. Its longer
examples connect stages through visible end states and separate each reference's
job; they do not require every supplied asset to appear in every scene.

Fal's [demonstrated prompting article](https://fal.ai/learn/devs/seedance-2-5-prompting-guide)
adds useful production detail: allocate time to consequential actions, preserve
object ownership through handoffs or occlusion, and give the camera a position
and an event that starts its movement. Treat these as the author's observed
practices, not guarantees or required prompt syntax.

Renku recommendation: identify the few decisions that matter to this take and
give them priority. A prompt asking for a complicated performance, a fast camera
orbit, a prop exchange, and continuous dialogue may be easier to improve by
reducing competing actions than by adding more adjectives. Keep frame geometry,
identity, motion, and sound responsibilities distinct.

## Evidence and review

Original examples in these operation guides illustrate request authoring; none
was generated in this refresh. Timing ranges communicate intent, not frame-accurate
execution. Review appearance, action order, camera, ending state, and audio
separately. A successful source example does not test our rewritten prompt.

Prompting sources read 2026-09-30:

- [BytePlus: Dreamina Seedance 2.5 prompt guide](https://docs.byteplus.com/en/docs/modelark/seedance-2-5-prompt-guide):
  primary guidance on timing, reference interpretation, and known generation
  symptoms; read the rendered document, not only its API/navigation shell.
- [BytePlus: How to use Seedance 2.5](https://fal.ai/learn/devs/how-to-use-seedance-2-5),
  published 2026-08-07: developer guidance on construction, references, and notation.
- [Fal: Seedance 2.5 prompting guide and real examples](https://fal.ai/learn/devs/seedance-2-5-prompting-guide),
  published 2026-08-07: provider-author practices demonstrated with generated clips.
- [ByteDance: Introducing Seedance 2.5](https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5),
  published 2026-07-31: maker capability examples, not an independent performance study.

The [text](https://fal.ai/models/bytedance/seedance-2.5/text-to-video/api),
[image](https://fal.ai/models/bytedance/seedance-2.5/image-to-video/api), and
[reference](https://fal.ai/models/bytedance/seedance-2.5/reference-to-video/api)
API pages establish request contracts; they are not the prompting evidence above.
