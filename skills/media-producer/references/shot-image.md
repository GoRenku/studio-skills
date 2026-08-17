# Shot Image

Use `shot.image` only for one candidate image owned by the exact Shot. Read the
current Shot Plan and Shot from the `shot-planner` handoff and preserve the
project aspect ratio as the recommended request setting.

Choose the path through explicit current user direction, an already-authored
saved-spec path, then the Project's **Use Codex for image generation** setting.
Do not add a Shot Image-specific setting. If Codex is selected but the harness
lacks `codex.gpt-image-2`, ask rather than falling back to paid Renku execution.

Use the standard saved-spec workflow. Display Preview when its Project setting
is on or the user explicitly asks. Honor the selected execution method's
Project confirmation setting. For Renku-managed execution, always obtain the
exact current estimate token before the run, even when conversational
confirmation is off.
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
