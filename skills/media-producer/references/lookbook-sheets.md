# Lookbook Sheets

Use `lookbook.video-sheet` for final-video visual language and
`lookbook.storyboard-sheet` for arbitrary Beat Storyboard appearance language.
Both target `lookbook:<lookbook-id>`, allow multiple attached sheets, and
currently recommend 4:3, high quality, and GPT Image 2 through context. A
Storyboard Sheet may demonstrate photorealistic, realistic, illustrative,
graphic, painterly, hand-drawn, abstract, or another deliberate language; do
not assume linework or drawing.

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

Lookbook Sheets are request-scoped candidates. Never pass `--select` and never
create a global selected Lookbook Sheet. Put the exact chosen AssetFile only in
the consuming GenerationSpec reference.

A `lookbook.storyboard-sheet` is a candidate for the
`visual-language/storyboard-lookbook-sheet` slot in `scene.storyboard-sheet`
context. Core keeps that request-scoped slot optional and unselected. The agent
workflow nevertheless requires one exact usable Sheet for every Beat
Storyboard request. If none is available, create or attach one and obtain
acceptance before continuing. Never substitute a Video/Production Lookbook
Sheet or use Production Lookbook prose as an independent appearance source.

After inspection, attach through the matching focused purpose:

```bash
renku media import --purpose lookbook.video-sheet --target lookbook:<lookbook-id> --source <project-relative-path> --title <title> --receipt <run-json> --json
renku media import --purpose lookbook.storyboard-sheet --target lookbook:<lookbook-id> --source <project-relative-path> --title <title> --receipt <run-json> --json
```

Use `--source-spec <spec-id>` for Codex-generated files. Omit both provenance flags for external files with no saved generation request.
