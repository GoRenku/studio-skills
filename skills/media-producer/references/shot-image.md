# Shot Image

Use `shot.image` only for one candidate image owned by the exact Shot. Read the
current Shot Plan and Shot from the `shot-planner` handoff and preserve the
project aspect ratio as the recommended request setting.

When no execution path was chosen, propose Codex built-in GPT-Image-2. A user
choice of a current Renku image route overrides it.

Use the standard saved Preview workflow. For Codex execution, continue after
Preview without asking for separate generation approval. For Renku-managed
execution, estimate and obtain explicit cost/provider approval before the run.
After execution, inspect the exact output and wait for output acceptance. Then
import:

```bash
renku media import \
  --purpose shot.image \
  --target shot:<shot-id> \
  --source <project-relative-output> \
  --source-spec <frozen-agent-external-spec-id> \
  --select \
  --json
```

Use `--receipt` instead for an exact matching Renku-managed output. Keep
`--select` when the accepted output should become the Shot's current image.
Omit it only when the user wants another unselected candidate. To choose a
previously imported candidate, use `renku asset select --project <project>
--target shot:<shot-id> --asset <asset-id> --json`.
