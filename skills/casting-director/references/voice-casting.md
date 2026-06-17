# Voice Casting

Creative voice direction lives inside Cast Design. Playable sample audio lives
in Cast Voice records. Durable provider-specific reusable voice handles, such as
ElevenLabs ids, live in Cast Voice Provider Registrations attached to a Cast
Voice. Kling `voice_id` values are transient shot-video run artifacts and do not
belong in Cast Voice records.

Useful fields to capture:

- voice identity;
- accent and dialect notes;
- tempo and rhythm;
- texture and age read;
- emotional range;
- locale-specific notes;
- anti-references.

If the user asks for voice media, write or confirm the voice casting guidance
first. Then either hand `cast.voice-sample` generation to `media-producer`,
attach an existing ElevenLabs provider voice id and sample with
`renku cast voice attach`, or create an ElevenLabs provider registration for an
existing Cast Voice. Do not store generated sample paths, ElevenLabs ids, Kling
`voice_id` values, or provider-registration ids in Cast Design JSON.

Use the provider-registration split deliberately:

- ElevenLabs TTS registrations carry capability `dialogue-audio-tts` and are
  used by scene dialogue audio generation.
- Kling voice control is not a durable Cast Voice Provider Registration. For
  shot-video generation, Media Producer selects scene dialogue audio or a clean
  Cast Voice sample as a logical input; Core creates and caches the transient
  Kling `voice_id` during `shot.video-take` estimate/run.
- Seedance audio references are not provider registrations. They are
  per-generation clean voice/style references selected by shot-video workflows.
