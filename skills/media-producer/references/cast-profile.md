# Cast Profile

Use `cast.profile` with target `cast:<cast-member-id>` for the compact Cast navigation image.

```bash
renku generation context --purpose cast.profile --target cast:<cast-member-id> --json
renku generation model list --purpose cast.profile --json
```

Core fixes the profile aspect ratio to 1:1, currently recommends medium quality and Nano Banana 2, and initializes `source/character-sheet` with the first matching Character Sheet when available. Recommendations remain guidance until explicitly chosen.

When the source slot is included:

- preserve the exact placement returned by context;
- use its exact asset/file identity;
- choose an endpoint that accepts image media;
- assign the selection to the endpoint's actual media `providerField`.

Use a create endpoint when no source sheet is selected. Use an edit/reference endpoint when continuity with an exact sheet matters. Do not keep a model allowlist in this reference.

For Cast Members with `isVoiceOver: true`, do not require a Character Sheet. Read `voice-over-profile-image.md` and create a symbolic display image rather than a physical likeness.

For Codex image generation, save the accepted file inside the project, inspect it, and import it without a receipt. For Renku generation, follow `workflow.md` and attach the exact accepted run output:

```bash
renku media import --purpose cast.profile --target cast:<cast-member-id> --source <project-relative-path> --title <title> --receipt <run-json> --json
```

Omit `--receipt` for external or Codex-generated files.
