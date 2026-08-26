# Cast Profile

Use `cast.profile` with target `cast:<cast-member-id>` for the compact Cast navigation image.

Begin with `renku generation context --purpose cast.profile --target
cast:<cast-member-id> --json`. Use its exact Cast/design/Scene/voice facts,
Production Lookbook, policy/guidance, and same-Cast continuity suggestions.

Use a 1:1 profile composition. Inspect every current same-Cast Character Sheet
candidate and deliberately choose one or none; list order has no special status.

When a Character Sheet is included:

- resolve and inspect its exact registered file;
- choose an endpoint that accepts image media;
- place its local-file marker in the endpoint's actual native media field.

Use a create endpoint when no source sheet is chosen for this request. Use an
edit/reference endpoint when continuity with an exact candidate matters.

For Cast Members with `isVoiceOver: true`, do not require a Character Sheet. Read `voice-over-profile-image.md` and create a symbolic display image rather than a physical likeness.

For Codex or provider image generation, follow `workflow.md`, inspect the exact
accepted output, and attach it with exact safe provenance:

```bash
renku media import --purpose cast.profile --target cast:<cast-member-id> --source <project-relative-path> --title <title> --summary <card-summary> --provenance <provenance-json> --select --json
```

Use the same provenance contract for Codex-generated files. Omit provenance
for external files with no generation provenance. Omit `--select` only
when the user explicitly wants an additional unselected Profile candidate.
Always include `--summary` for a generated Profile and describe its useful
appearance in concise human-readable card copy.
