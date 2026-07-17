# Retained Audio And Voice Routing

> **Status: retained design reference.** Do not execute this workflow while
> Shot Video authoring is unavailable. Revalidate provider capabilities,
> descriptor fields, Core behavior, and CLI contracts before reuse.

## Durable Cast Voice Records

ElevenLabs TTS registrations carried capability `dialogue-audio-tts` and were
used by Scene Dialogue Audio generation. Kling and Seedance video controls did
not become durable Cast Voice Provider Registrations.

## Kling

The last supported Shot Video workflow selected or generated the desired Scene
Dialogue Audio through the Shot Video flow. Core converted it to a transient
Kling `voice_id` during `shot.video-take` estimate or run and cached that id for
short-term reuse. The transient id did not belong in Cast Design or a durable
Cast Voice Provider Registration.

Direct Kling endpoints that exposed no file-backed audio field did not accept a
Dialogue Audio reference, `@AudioN`, or invented nested media value. Exact audio
or dialogue support required a currently supported endpoint or a separate
lipsync, talking-head, or composition workflow.

## Seedance

Seedance audio references were per-generation conditioning inputs, not durable
provider registrations. A Shot Video request could select clean Cast Voice
samples or Scene Dialogue Audio as exact `audio_urls` references when the
selected endpoint descriptor exposed that field.

The prompt named each generated provider token with a narrow role such as
narrator voice, speaker character, ambience, or sound character. Conditioning
audio was not treated as exact editorial synchronization; exact waveform, word
timing, or lip sync required a purpose-built workflow.
