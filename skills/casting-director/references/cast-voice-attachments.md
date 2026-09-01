# Cast Voice Attachments

Use this reference when a Cast Member needs a durable playable voice sample.

A Cast Voice is Cast Member-owned project data. It stores the reference name,
purpose, linked sample audio asset, sample provenance, default-selection state,
and an optional opaque provider-owned voice identity. Core stores that identity
without interpreting provider or model fields. Cast Voice data does not belong
in Cast Design JSON.

## Commands

```bash
renku cast voice list --cast <cast-member-id> --json
renku cast voice show --cast <cast-member-id> --voice <cast-voice-id-or-name> --json
renku cast voice validate --file tmp/operations/cast-voice-attachment.json --json
renku cast voice attach --file tmp/operations/cast-voice-attachment.json --json
renku cast voice remove --cast <cast-member-id> --voice <cast-voice-id-or-name> --json
```

Use `validate` before `attach`. After attachment, run `list` to verify the Cast
Voice and sample Asset are present. The first attached voice becomes the Cast
Member's default. Additional default selection is user-owned in the Cast Assets
media-card UI.

## Attachment Rules

- `kind` must be `castVoiceFileAttachment`.
- `castMemberId`, `name`, `purpose`, and `sample` are required.
- `voiceIdentity` is optional opaque JSON. Provider Skills own its shape.
- An ElevenLabs sample uses an exact identity such as
  `{"provider":"elevenlabs","voiceId":"<exact-id>"}`.
- A Seed Audio sample omits `voiceIdentity`; its audio Asset is the reusable
  reference.
- `sample.sourceProjectRelativePath` must point at an existing project-relative audio file.
- Supported sample file extensions are `.mp3`, `.wav`, and `.m4a`.
- If the sample came from generation, include its exact safe
  `sample.generationProvenance` so provider/model/media-kind mismatches fail
  before attachment.
- Cast Voice sample deletion happens by removing the Cast Voice, not by deleting the asset directly.

## Sample

See `samples/cast-voice-attachment.json`.
