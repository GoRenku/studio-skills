# Cast Voice Sample

Use `cast.voice-sample` to generate playable sample audio for a Cast Member.

```bash
renku generation context --purpose cast.voice-sample --target cast:<cast-member-id> --json
renku generation model list --purpose cast.voice-sample --json
renku generation validate --file tmp/specs/cast-voice-sample.json --json
renku generation spec create --file tmp/specs/cast-voice-sample.json --json
renku generation preview show --spec <spec-id> --json
renku generation estimate --spec <spec-id> --json
renku generation run --spec <spec-id> --approval-token <approval-token> --json
```

Choose only a direct audio endpoint returned by current context/model descriptors. Confirm the exact sample text, provider voice handle, language, and editable voice settings with the user. Keep provider field names in `values` exactly as returned; do not translate them into skill-owned names.

After generation:

1. inspect or play the output enough to confirm it is the intended sample;
2. read the exact run receipt with `generation run show`;
3. hand the accepted output and receipt to `casting-director`;
4. validate and attach a current `castVoiceAttachment` document with `renku cast voice attach`.

Do not use `renku media import` for Cast Voice samples. Do not store sample paths or provider registrations in Cast Design JSON.

See `samples/cast-voice-sample-spec.json` for the generic spec shape, but always derive current endpoint fields from `generation model list`.
