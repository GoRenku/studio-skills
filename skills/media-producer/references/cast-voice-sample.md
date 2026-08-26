# Cast Voice Sample

Use `cast.voice-sample` to generate playable sample audio for a Cast Member.

```bash
renku generation context --purpose cast.voice-sample --target cast:<cast-member-id> --json
renku generation validate --file tmp/operations/media-generation/cast-voice-sample.json --json
renku generation preview show --file tmp/operations/media-generation/cast-voice-sample.json --json
renku generation execute --file tmp/operations/media-generation/cast-voice-sample.json --output tmp/media/cast-voice-sample --json
```

Use the returned Cast/design/voice/Project-language facts as evidence. Choose a
supported direct-audio model and input mode conversationally, then read the
selected provider operation for its current native request fields and
constraints. Do not expect model alternatives or provider controls in Core
context and do not copy them into a second Skill-owned schema.

After generation:

1. inspect or play the output enough to confirm it is the intended sample;
2. preserve the exact safe provenance returned by generation execution;
3. hand the accepted output and exact safe provenance to `casting-director`;
4. validate and attach a current `castVoiceAttachment` document with `renku cast voice attach`.

Do not use `renku media import` for Cast Voice samples. Do not store sample paths or provider registrations in Cast Design JSON.

Use the `elevenlabs-media-provider` supported-model index and exact operation
guide for the request shape.
