# Lookbook Sheets

Use `lookbook.video-sheet` for final-video visual language and `lookbook.storyboard-sheet` for storyboard drawing language. Both target `lookbook:<lookbook-id>`, allow multiple attached sheets, and currently recommend 4:3, high quality, and GPT Image 2 through context.

Resolve target ids by role. There is no Lookbook collection or selection state:

```bash
renku lookbook show --kind production --json
renku lookbook show --kind storyboard --json
```

`lookbook.video-sheet` requires the returned Production id. `lookbook.storyboard-sheet` requires the returned Storyboard id.

```bash
renku generation context --purpose lookbook.video-sheet --target lookbook:<lookbook-id> --json
renku generation context --purpose lookbook.storyboard-sheet --target lookbook:<lookbook-id> --json
renku generation model list --purpose <purpose> --json
```

The sheet contents are opaque. Panel count, labels, layout, notation, and coverage remain prompt and agent/user review choices, not Studio schema.

A `lookbook.storyboard-sheet` is the preferred candidate for the `visual-language/storyboard-lookbook-sheet` slot in `scene.storyboard-sheet` context. If none is available, context returns non-blocking guidance. Create or attach one when the user wants stronger storyboard consistency, then re-read Scene context. Do not call it a dependency or substitute a Video Lookbook Sheet.

After inspection, attach through the matching focused purpose:

```bash
renku media import --purpose lookbook.video-sheet --target lookbook:<lookbook-id> --source <project-relative-path> --title <title> --receipt <run-json> --json
renku media import --purpose lookbook.storyboard-sheet --target lookbook:<lookbook-id> --source <project-relative-path> --title <title> --receipt <run-json> --json
```

Omit `--receipt` for external or Codex-generated files.
