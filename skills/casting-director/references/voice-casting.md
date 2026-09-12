# Voice Casting

Before ensemble dialogue generation, compare a new voice with the existing voices
it will converse with. Assess audible resonance, texture, cadence and articulation;
pitch or written direction alone does not establish contrast. If listening is not
available, provide the user a focused comparison and leave identity/contrast
unverified. Do not infer quality or select a voice merely from a matching transcript.

Creative voice direction lives inside Cast Design. Playable sample audio lives
in Cast Voice records. An optional provider-owned voice identity may live on a
Cast Voice as opaque JSON. Core never interprets its provider or model fields.

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
or attach an existing playable sample with `renku cast voice attach`. An
ElevenLabs attachment includes its exact opaque voice identity; a Seed Audio
sample is file-backed and needs no additional identity. Do not store generated
sample paths or provider identities in Cast Design JSON.

The user selects one default Cast Voice in the Cast Assets media grid. Media
Producer starts each generation from that default and may use a different
sample only for the current transient request through the Codex configuration
component.
