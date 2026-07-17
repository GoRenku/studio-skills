# Cast Voice Attachments

Use this reference when a Cast Member needs a durable provider voice reference.

A Cast Voice is Cast Member-owned project data. It stores the reference name,
purpose, linked sample audio asset, and sample provenance. Provider-specific
durable handles live in Cast Voice Provider Registrations attached to that Cast
Voice. Cast Voice data does not belong in Cast Design JSON. Kling `voice_id`
values are transient shot-video run artifacts and must not be attached here.

## Commands

```bash
renku cast voice list --cast <cast-member-id> --json
renku cast voice show --cast <cast-member-id> --voice <cast-voice-id-or-name> --json
renku cast voice validate --file <cast-voice-attachment-json> --json
renku cast voice attach --file <cast-voice-attachment-json> --json
renku cast voice remove --cast <cast-member-id> --voice <cast-voice-id-or-name> --json
renku cast voice registrations list --voice <cast-voice-id-or-name> --json
renku cast voice registrations show --registration <registration-id> --json
renku cast voice registrations create --voice <cast-voice-id-or-name> --file <registration-json> --json
renku cast voice registrations remove --registration <registration-id> --json
```

Use `validate` before `attach`. After attachment, run `list` to verify the Cast Voice and sample asset are present. Use `registrations list` to verify provider handles.

## Attachment Rules

- `kind` must be `castVoiceAttachment`.
- `castMemberId`, `name`, `purpose`, `provider`, `model`, `voiceId`, and `sample` are required for the initial ElevenLabs attachment.
- `attach` creates the Cast Voice and its initial ElevenLabs provider registration with capability `dialogue-audio-tts`.
- Use direct ElevenLabs provider ids for current dialogue audio voices.
- Current direct models are `eleven_v3`, `eleven_multilingual_v2`, and `eleven_turbo_v2_5`.
- `sample.sourceProjectRelativePath` must point at an existing project-relative audio file.
- Supported sample file extensions are `.mp3`, `.wav`, and `.m4a`.
- If the sample came from Renku generation, include the generation receipt so provider/model mismatches fail early.
- Kling and Seedance video voice controls are not Cast Voice Provider
  Registrations. A future Shot workflow must define any transient provider
  voice ids or per-generation audio reference behavior.
- Cast Voice sample deletion happens by removing the Cast Voice, not by deleting the asset directly.

## Sample

See `samples/cast-voice-attachment.json`.

Provider registration JSON:

```json
{
  "provider": "elevenlabs",
  "registrationModel": "eleven_v3",
  "externalVoiceId": "elevenlabs_voice_ada",
  "capabilities": ["dialogue-audio-tts"],
  "sourceSampleAssetId": "asset_ada_voice_sample"
}
```
