# Voice Casting

Creative voice direction lives inside Cast Design. Provider voice ids and playable sample audio live in Cast Voice records.

Useful fields to capture:

- voice identity;
- accent and dialect notes;
- tempo and rhythm;
- texture and age read;
- emotional range;
- locale-specific notes;
- anti-references.

If the user asks for voice media, write or confirm the voice casting guidance first. Then either hand `cast.voice-sample` generation to `media-producer` or attach an existing provider voice id and sample with `renku cast voice attach`. Do not store generated sample paths or provider voice ids in Cast Design JSON.
