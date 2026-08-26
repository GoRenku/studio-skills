# Lookbook Sheets

Use `lookbook.video-sheet` for final-video visual language and
`lookbook.storyboard-sheet` for arbitrary Beat Storyboard appearance language.
Both target `lookbook:<lookbook-id>`, allow multiple attached sheets, and
return advisory 4:3 and high-quality guidance through context. A
Storyboard Sheet may demonstrate photorealistic, realistic, illustrative,
graphic, painterly, hand-drawn, abstract, or another deliberate language; do
not assume linework or drawing.

Resolve target ids by role. There is no Lookbook collection or selection state:

```bash
renku lookbook show --kind production --json
renku lookbook show --kind storyboard --json
```

`lookbook.video-sheet` requires the returned Production id.
`lookbook.storyboard-sheet` requires the returned Storyboard id. Once the
purpose and exact target are known, read `generation context`; do not assemble
the Lookbook's images, sheets, Inspiration sources, or other relationships with
additional discovery commands.

The sheet contents are opaque. Panel count, labels, layout, notation, and coverage remain prompt and agent/user review choices, not Studio schema.

Lookbook Sheets are request-scoped candidates. Never pass `--select` and never
create a global selected Lookbook Sheet. Put the exact chosen AssetFile only in
the consuming provider request.

A Storyboard Lookbook Sheet appears as an advisory appearance candidate in
`scene.storyboard-sheet` context. Prefer an accepted usable Sheet when visual
continuity matters, but do not treat its absence as a Core authorization gate.
The user or agent may choose another source or proceed without one after
considering the creative tradeoff.

After inspection, attach through the matching focused purpose:

```bash
renku media import --purpose lookbook.video-sheet --target lookbook:<lookbook-id> --source <project-relative-path> --title <title> --provenance <provenance-json> --json
renku media import --purpose lookbook.storyboard-sheet --target lookbook:<lookbook-id> --source <project-relative-path> --title <title> --provenance <provenance-json> --json
```

Use the same `--provenance` contract for Codex-generated files. Omit it for
external files with no generation provenance.
