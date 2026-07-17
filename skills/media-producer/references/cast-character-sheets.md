# Cast Character Sheets

Use `cast.character-sheet` for reusable Cast identity and continuity guidance across storyboard and final-video generation. It targets `cast:<cast-member-id>`, allows multiple attached sheets, and currently recommends 16:9, high quality, and GPT Image 2 through context.

```bash
renku generation context --purpose cast.character-sheet --target cast:<cast-member-id> --json
renku generation model list --purpose cast.character-sheet --json
```

This purpose exposes a singleton Production Lookbook Sheet slot and a
same-character Character Sheet continuity slot. Use those named placements for
those exact roles. Use Additional References only for agent-attached likeness,
costume, accessory, historical-source, or other request-specific files that do
not belong to a named slot.

If any image reference is selected, choose an endpoint whose descriptor exposes
an appropriate image media field and assign the reference to that exact
`providerField`. If no image reference is selected, use text-to-image language
and an endpoint that does not require image inputs.

## Prompt and review ownership

Use Cast facts, current Cast Design, user direction, and provider-visible references to author a useful sheet. Keep pose layout, view count, captions, height presentation, costume coverage, and likeness review in the prompt and agent/user QA. Do not represent them as Studio schema or runtime validation.

Never mention a Lookbook, Cast Design, asset, sheet, or internal project title
as though the model knows it. When the exact Production Lookbook Sheet is
selected, refer to it by provider-visible role such as “the provided style
reference” and state the visible traits to use. When it is not selected,
translate the relevant Lookbook direction into concrete palette, lighting,
texture, composition, and material language in the prompt.

For visible on-screen Cast Members, prefer a focused identity/continuity sheet over a concept-art collage. For voice-only Cast Members, do not require a physical Character Sheet; use the separate symbolic Profile guidance when requested.

## Attachment

After inspection, attach through the focused purpose:

```bash
renku media import --purpose cast.character-sheet --target cast:<cast-member-id> --source <project-relative-path> --title <title> --receipt <run-json> --json
```

Omit `--receipt` for external or Codex-generated files. Do not use retired generic Cast reference imports.
