# Cast Character Sheets

Use `cast.video-character-sheet` for final-video continuity and `cast.storyboard-character-sheet` for storyboard drawing continuity. Both target `cast:<cast-member-id>`, allow multiple attached sheets, and currently recommend 16:9, high quality, and GPT Image 2 through context.

```bash
renku generation context --purpose cast.video-character-sheet --target cast:<cast-member-id> --json
renku generation context --purpose cast.storyboard-character-sheet --target cast:<cast-member-id> --json
renku generation model list --purpose <purpose> --json
```

These purposes currently have no named guide slot. Put optional exact likeness, costume, accessory, or continuity files in Additional References and assign every included file to a media `providerField` from the selected endpoint.

## Prompt and review ownership

Use Cast facts, current Cast Design, user direction, and provider-visible references to author a useful sheet. Keep pose layout, view count, captions, height presentation, costume coverage, and likeness review in the prompt and agent/user QA. Do not represent them as Studio schema or runtime validation.

For visible on-screen Cast Members, prefer a focused identity/continuity sheet over a concept-art collage. For voice-only Cast Members, do not require a physical Character Sheet; use the separate symbolic Profile guidance when requested.

## Attachment

After inspection, attach through the matching focused purpose:

```bash
renku media import --purpose cast.video-character-sheet --target cast:<cast-member-id> --source <project-relative-path> --title <title> --receipt <run-json> --json
renku media import --purpose cast.storyboard-character-sheet --target cast:<cast-member-id> --source <project-relative-path> --title <title> --receipt <run-json> --json
```

Omit `--receipt` for external or Codex-generated files. Do not use retired generic Cast reference imports.
