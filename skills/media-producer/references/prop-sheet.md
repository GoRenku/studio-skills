# Prop Sheet And Hero

Use `prop.sheet` with `prop:<prop-id>` for one production reference board and
`prop.hero` for the compact overview/detail image.

```bash
renku generation context --purpose prop.sheet --target prop:<prop-id> --json
renku generation context --purpose prop.hero --target prop:<prop-id> --json
renku generation model list --purpose <purpose> --json
```

Read `prop-sheet-board-design.md` before authoring. Inspect all same-Prop Sheet
candidates and choose one only when it supports continuity. No candidate is
required; order never implies selection. Preserve the exact `prop/prop-sheet`
placement for an included candidate.

Attach only through focused purposes:

```bash
renku media import --purpose prop.sheet --target prop:<prop-id> --source <path> --title <title> --receipt <run-json> --json
renku media import --purpose prop.hero --target prop:<prop-id> --source <path> --title <title> --receipt <run-json> --select --json
```

Prop Sheets are request-scoped and never use global selection. Use `--select`
for a Hero only when the user accepts it as the current compact Prop image.
Never reparent a Location Asset or automatically promote generated media.
