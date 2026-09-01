# Cast Voice Sample

Use `cast.voice-sample` to generate playable sample audio for a Cast Member.

## Configure this generation in Codex

Before authoring the request, always use `@Visualize` to show a compact inline
configuration component in Codex. Read and follow
[inline-generation-configuration.md](inline-generation-configuration.md) for
its fresh-instance behavior, visible values, balanced presentation, and exact
handoff. Start with the Project Settings audio provider as the visible
default. Let the user inspect or change the provider, model, and useful native
controls for this one generation. This state is transient: never write the
user's choice back to Project Settings.

For Seed Audio sample creation, show provider, model, output format, sample
rate, speed, volume, pitch, and multilingual when the live Fal schema exposes
them. Do not show a reference-voice picker because the first Seed sample is
created from text description only. For ElevenLabs sample retrieval, show the
selected Cast Voice identity and the supported retrieval operation rather than
inventing speech-generation controls.

```bash
renku generation context --purpose cast.voice-sample --target cast:<cast-member-id> --json
renku generation validate --file tmp/operations/media-generation/cast-voice-sample.json --json
renku generation preview show --file tmp/operations/media-generation/cast-voice-sample.json --json
renku generation execute --file tmp/operations/media-generation/cast-voice-sample.json --output tmp/media/cast-voice-sample --json
```

Use the returned Cast/design/voice/Project-language facts as evidence. Combine
the user's direct voice direction with the Cast Member's voice-casting notes.
Choose a supported direct-audio model and input mode conversationally, then
read the selected provider operation for its current native request fields and
constraints. Do not expect model alternatives or provider controls in Core
context and do not copy them into a second Skill-owned schema.

## Create a Seed Audio reference sample

Read `model-guides/audio/seed-audio-1.0.md`. Create the first reference voice
from text description only; do not condition it on another voice sample.
Author approximately 70–85 natural words that the character actually speaks,
targeting about 30 seconds at natural conversational pace. Count the spoken
script separately before Preview: voice direction, speaker description, scene
setting, and prompt instructions do not count toward this word budget. If the
spoken script is short, expand it with meaningful in-character speech; never
make up the missing duration with stretched pauses, sparse delivery, repeated
ellipses, or an artificially slow pace. Require:

- one speaker only;
- one consistent emotion and timbre;
- no music or second voice;
- minimal background sound and a steady microphone perspective; and
- natural pacing that demonstrates the intended identity without a dramatic
  emotional arc.

If the user's direction conflicts with the Cast voice notes, surface the
conflict and ask which direction should win before generation.

After generation:

1. inspect or play the output enough to confirm it is the intended sample;
2. preserve the exact safe provenance returned by generation execution;
3. hand the accepted output and exact safe provenance to `casting-director`;
4. validate and attach a current `castVoiceFileAttachment` document with
   `renku cast voice attach`.

Do not use `renku media import` for Cast Voice samples. Do not store sample
paths or provider identities in Cast Design JSON. The attachment's optional
`voiceIdentity` is opaque provider-owned JSON:

- Seed Audio samples omit it because the sample file itself is the reusable
  reference.
- ElevenLabs samples use the provider's durable identity, for example
  `{"provider":"elevenlabs","voiceId":"<exact-id>"}`.

Use the selected provider's supported-route index, resolve its `modelKey`
through the canonical model catalog, and use the exact operation guide for the
request shape.
