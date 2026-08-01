# Selected Image Workflow

Delegate generation to `media-producer` with:

- purpose `shot.image`;
- target `shot:<shot-id>`;
- exact current Shot Plan and Shot report;
- deliberately selected Scene, Beat, Cast, Location, Lookbook, and visual references;
- the resolved project aspect ratio.

When the user has not selected an execution path, propose Codex built-in
GPT-Image-2 for this purpose. A user-selected Renku model or other supported
route overrides the preference.

Keep the sequence explicit:

1. save and show Generation Preview;
2. for Renku-managed execution, estimate and wait for explicit cost/provider
   approval; for Codex execution, continue without a separate generation
   approval stop;
3. execute through the selected path;
4. inspect the exact output;
5. wait for output acceptance;
6. when the accepted image should become the Shot's current image, import and
   select it atomically:

```bash
renku media import \
  --purpose shot.image \
  --target shot:<shot-id> \
  --source <project-relative-output> \
  --select \
  --json
```

Omit `--select` only when the accepted output should remain an unselected
candidate. To choose a previously imported candidate, use:

```bash
renku asset select --project <project-name> --target shot:<shot-id> --asset <asset-id> --json
renku asset clear-selection --project <project-name> --target shot:<shot-id> --json
renku shot-plan shot image discard --shot-plan <plan-id> --shot <shot-id> --asset <asset-id> --json
```

Discarding the selected candidate clears the Shot selection. Do not add a
pre-clear call unless clearing without discard is the user's separate intent.
