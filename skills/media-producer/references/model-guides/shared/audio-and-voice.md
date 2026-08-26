# Audio And Voice Routing

Use this guidance after selecting an exact canonical model and reading the
selected provider adapter.

## Durable Cast Voice Records

ElevenLabs TTS registrations carried capability `dialogue-audio-tts` and were
used by Scene Dialogue Audio generation. Kling and Seedance video controls did
not become durable Cast Voice Provider Registrations.

## Kling

When a Kling workflow requires an exact generated Scene Dialogue Audio track,
use a currently supported endpoint or a separate lipsync, talking-head, or
composition workflow. Do not create a durable Cast Voice registration for a
transient video-provider voice id.

Direct Kling endpoints that exposed no file-backed audio field did not accept a
Dialogue Audio reference, `<AUDIO_N>`, or invented nested media value. Exact audio
or dialogue support required a currently supported endpoint or a separate
lipsync, talking-head, or composition workflow.

## Seedance

Seedance audio references are request-scoped conditioning inputs, not durable
provider registrations. A Shot Video request may select clean Cast Voice
samples or Scene Dialogue Audio as exact conditioning references when the
provider adapter and live schema expose an audio field.

The prompt names each provider token with a narrow role such as
narrator voice, speaker character, ambience, or sound character. Conditioning
audio is not exact editorial synchronization; exact waveform, word
timing, or lip sync required a purpose-built workflow.
