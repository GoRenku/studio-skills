# Cast Voice Sample Generation

Use this reference for `cast.voice-sample`, the purpose that generates playable Cast Voice sample audio for a Cast Member.

## Commands

```bash
renku generation context --purpose cast.voice-sample --target cast:<cast-member-id> --json
renku generation model list --purpose cast.voice-sample --target cast:<cast-member-id> --json
renku generation spec validate --file <cast-voice-sample-spec-json> --json
renku generation spec create --file <cast-voice-sample-spec-json> --json
renku generation estimate --spec <spec-id> --json
renku generation run --spec <spec-id> --approval-token <approval-token> --json
```

## Workflow

1. Read generation context for the Cast Member.
2. Confirm the desired Cast Voice reference name, purpose, ElevenLabs provider voice id, model, language, and sample text with the user.
3. Create a persisted spec using only direct ElevenLabs models returned by `generation model list`.
4. Estimate before paid generation and get the approval token.
5. Run generation only after approval.
6. Inspect or play the generated audio enough to confirm it is the intended sample.
7. Hand the generated file path and generation receipt to `casting-director` for `renku cast voice attach`.

Do not attach voice samples with `renku media import`. Do not store generated audio paths in Cast Design JSON.

## Current Direct Models

- `elevenlabs/eleven_v3`
- `elevenlabs/eleven_multilingual_v2`
- `elevenlabs/eleven_turbo_v2_5`

## Sample

See `samples/cast-voice-sample-spec.json`.
