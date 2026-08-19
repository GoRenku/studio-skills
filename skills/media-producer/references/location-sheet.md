# Location Sheet And Hero

Use `location.sheet` with `location:<location-id>` for one or more reusable
reference boards. Read current context rather than hard-coding settings; it
currently recommends 16:9, high quality, and GPT Image 2.

Use `location.hero` for the compact Location overview image. Core fixes 16:9
and currently recommends medium quality and Nano Banana 2. Inspect every
eligible `source/location-sheet` candidate and choose the exact source
explicitly, or choose none. The first candidate has no special status.

```bash
renku generation context --purpose location.sheet --target location:<location-id> --json
renku generation context --purpose location.hero --target location:<location-id> --json
renku generation model list --purpose <purpose> --json
```

For `location.hero`, preserve the exact source slot placement returned by context and assign the included Location Sheet to an actual image media `providerField` from the selected endpoint.

For a Production Location Sheet, select the Production Lookbook Sheet as the
appearance authority. For a Storyboard continuity Location Sheet, select the
current Storyboard Lookbook Sheet as sole appearance authority and the exact
accepted Production Location Sheet as canonical content authority. Preserve
geography, landmarks, entrances, sightlines, movement paths, construction,
scale, materials, and relevant state while changing only rendering medium,
linework, value treatment, finish, lighting behavior, texture, and detail
density. Do not copy Production photographic finish into the Storyboard
variant.

Read `location-sheet-board-design.md` when authoring or reviewing a Location Sheet. Inspect the output as one opaque production reference image. Do not require runtime slices, view labels, panel schemas, or semantic content validation.

For a standard Production Location Sheet, make spatial continuity the default:
use a focused set of consistent views and one authoritative plan. Keep material,
lighting, palette, and atmosphere visible inside those views. Do not add swatch
grids, prop studies, human-scale panels, or decorative filler unless the user
explicitly requests them.

When the user intends to generate a 3D Location World, state that production
job in the prompt and follow the World-ready rules in
`location-sheet-board-design.md`: four equal-size/equal-aspect same-space
perspective panels, one matching plan, one nearby unobstructed camera area,
recognizable overlap, stable spatial and appearance continuity, and enough
native detail for sharp temporary crops. Generate one coherent composite sheet,
not four unrelated requests. After acceptance, hand the exact sheet to
`$location-world-producer`; that skill owns temporary cropping, World Labs
input review, and the paid Auto Layout request.

Follow `image-output-review.md`. Review Location continuity for canonical
geography/state, Storyboard appearance when requested, absence of Production
style leakage, useful downstream coverage, consistent scale and landmarks, and
absence of an unrequested poster treatment.

After acceptance, attach through the matching focused purpose. Every generated
Location Sheet and Hero includes readable summary metadata. A Storyboard
continuity variant also includes exact tag membership:

```bash
renku media import --purpose location.sheet --target location:<location-id> --source <project-relative-path> --title <title> --summary <card-summary> --receipt <run-json> --json
renku media import --purpose location.sheet --target location:<location-id> --source <project-relative-path> --title <title> --summary <variant-summary> --reference-name <variant-name> --tag storyboard --source-spec <spec-id> --json
renku media import --purpose location.hero --target location:<location-id> --source <project-relative-path> --title <title> --summary <card-summary> --receipt <run-json> --select --json
```

Use `--source-spec <spec-id>` for Codex-generated files. Omit both provenance
flags for external files with no saved generation request. Location Sheets are
request-scoped candidates and never use global selection. Omit Hero
`--select` only when the user explicitly wants an additional unselected Hero
candidate. Keep `--summary` when substituting `--source-spec` for generated
media. Describe the visible variant or continuity role rather than repeating a
reference name or tag. Do not crop a Location Sheet into runtime-owned
directional slices. Temporary flat-image crops for World Labs belong only to
`$location-world-producer` and are never imported as Location Assets.
