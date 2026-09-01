# Audio And Voice Routing

Use this guidance after selecting an exact canonical model and reading the
selected provider adapter.

## Durable Cast Voice Records

A Cast Voice always has a playable sample Asset and may carry opaque
provider-owned identity JSON. Core stores and returns that identity without
interpreting it. The selected provider Skill decides whether it can use the
identity or the sample file for the current request.

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

Seedance audio references are request-scoped conditioning inputs. A Shot Video
request may select clean Cast Voice samples or selected Shot Plan Dialogue
Audio Takes as exact conditioning references when the provider adapter and live
schema expose an audio field.

The prompt names each provider token with a narrow role such as
narrator voice, speaker character, ambience, or sound character. Conditioning
audio is not exact editorial synchronization; exact waveform, word
timing, or lip sync required a purpose-built workflow.
