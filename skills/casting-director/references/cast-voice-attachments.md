# Cast Voice Attachments

Use this reference when a Cast Member needs a durable provider voice reference.

A Cast Voice is Cast Member-owned project data. It stores the reference name, purpose, provider, model, provider voice id, and linked sample audio asset. Cast Voice data does not belong in Cast Design JSON.

## Commands

```bash
renku cast voice list --cast <cast-member-id> --json
renku cast voice show --cast <cast-member-id> --voice <cast-voice-id-or-name> --json
renku cast voice validate --file <cast-voice-attachment-json> --json
renku cast voice attach --file <cast-voice-attachment-json> --json
renku cast voice remove --cast <cast-member-id> --voice <cast-voice-id-or-name> --json
```

Use `validate` before `attach`. After attachment, run `list` to verify the Cast Voice and sample asset are present.

## Attachment Rules

- `kind` must be `castVoiceAttachment`.
- `castMemberId`, `name`, `purpose`, `provider`, `model`, `voiceId`, and `sample` are required.
- Use direct ElevenLabs provider ids for current voice samples.
- Current direct models are `eleven_v3`, `eleven_multilingual_v2`, and `eleven_turbo_v2_5`.
- `sample.sourceProjectRelativePath` must point at an existing project-relative audio file.
- Supported sample file extensions are `.mp3`, `.wav`, and `.m4a`.
- If the sample came from Renku generation, include the generation receipt so provider/model mismatches fail early.
- Cast Voice sample deletion happens by removing the Cast Voice, not by deleting the asset directly.

## Sample

See `samples/cast-voice-attachment.json`.
