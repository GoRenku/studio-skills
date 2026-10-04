# Selected Image Workflow

Delegate generation to `media-producer` with:

- purpose `shot.image`;
- target `shot:<shot-id>`;
- current Shot Plan/Shot identities already resolved;
- user direction and deliberately chosen references already known.

Media Producer obtains the complete current Shot/Plan briefing, references,
aspect ratio and policy. Do not reconstruct them through department reads.
Follow its shared provider precedence: explicit user direction, then the saved
Image provider in the briefing. Use its current model guidance.

Keep the sequence explicit:

1. save the native request and show Preview when policy or user direction requires;
2. follow Media Producer's existing external-provider confirmation policy;
   Codex execution has no separate generation approval stop;
3. execute through the selected path;
4. inspect the exact output;
5. automatically attach without asking for output acceptance; when the image
   should become the Shot's current image, import and select it atomically:

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
renku asset select --project <project-name> --target shot:<shot-id> --asset-file <asset-file-id> --json
renku asset clear-selection --project <project-name> --target shot:<shot-id> --json
renku shot-plan shot image discard --shot-plan <plan-id> --shot <shot-id> --asset-file <asset-file-id> --json
```

Discarding the selected candidate clears the Shot selection. Do not add a
pre-clear call unless clearing without discard is the user's separate intent.
