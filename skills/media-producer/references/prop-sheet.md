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

For a Production Prop Sheet, select the Production Lookbook Sheet as appearance
authority. For a Storyboard continuity Prop Sheet, select the current
Storyboard Lookbook Sheet as sole appearance authority and the exact accepted
Production Prop Sheet as canonical content authority. Preserve silhouette,
construction, scale, materials, markings, moving parts, condition, and relevant
state while changing only the rendering language. Do not copy Production
photographic lighting, finish, or realism.

Follow `image-output-review.md`. Review Storyboard variants for canonical
construction/state, selected Storyboard appearance, absence of Production
style leakage, useful downstream coverage, consistent scale and defining
features, and absence of an unrequested scene or poster treatment.

Attach only through focused purposes:

```bash
renku media import --purpose prop.sheet --target prop:<prop-id> --source <path> --title <title> --summary <card-summary> --receipt <run-json> --json
renku media import --purpose prop.sheet --target prop:<prop-id> --source <path> --title <title> --summary <variant-summary> --reference-name <variant-name> --tag storyboard --source-spec <spec-id> --json
renku media import --purpose prop.hero --target prop:<prop-id> --source <path> --title <title> --summary <card-summary> --receipt <run-json> --select --json
```

Prop Sheets are request-scoped and never use global selection. Use `--select`
for a Hero only when the user accepts it as the current compact Prop image.
Keep `--summary` when substituting `--source-spec` for generated media. Describe
the visible variant or continuity role rather than repeating a reference name
or tag. Never reparent a Location Asset or automatically promote generated
media.
