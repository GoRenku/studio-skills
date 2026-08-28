# Location Sheet And Hero

Use `location.sheet` with `location:<location-id>` for one or more reusable
reference boards. Begin with its generation context and consume the exact
Location facts/design/Scene appearances, both Lookbooks, policy, advisory
output guidance, and relationship-derived suggestions.

Use `location.hero` for the compact Location overview image. Core suggests 16:9
and medium quality without choosing a model. Inspect every
eligible `source/location-sheet` candidate and choose the exact source
explicitly, or choose none. The first candidate has no special status.

For either purpose, the suggestions are non-binding. Choose another safe
Project or user-supplied source when it serves the request better.

For `location.hero`, place the deliberately selected Location Sheet's local-file
marker in an actual image-media field from the selected provider adapter and
live schema.

For `location.hero`, also use the Production Lookbook Sheet as the default
appearance authority whenever it is available. Keep the Location Sheet's role
limited to geography, architecture, scale, materials, and continuity; keep the
Lookbook Sheet's role limited to palette, lighting, texture, composition, and
finish. Do not silently replace the visible Lookbook reference with prose. If
the selected model cannot carry the chosen Location and Lookbook references,
stop and ask before dropping either authority or using a different model. The
user may explicitly request a deliberate visual departure.

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
renku media import --purpose location.sheet --target location:<location-id> --source <project-relative-path> --title <title> --summary <card-summary> --provenance <provenance-json> --json
renku media import --purpose location.sheet --target location:<location-id> --source <project-relative-path> --title <title> --summary <variant-summary> --reference-name <variant-name> --tag storyboard --provenance <provenance-json> --json
renku media import --purpose location.hero --target location:<location-id> --source <project-relative-path> --title <title> --summary <card-summary> --provenance <provenance-json> --select --json
```

Use the same `--provenance` contract for Codex-generated files. Omit provenance
flags for external files with no generation provenance. Location Sheets are
request-scoped candidates and never use global selection. Omit Hero
`--select` only when the user explicitly wants an additional unselected Hero
candidate. Keep `--summary` for generated
media. Describe the visible variant or continuity role rather than repeating a
reference name or tag. Do not crop a Location Sheet into runtime-owned
directional slices. Temporary flat-image crops for World Labs belong only to
`$location-world-producer` and are never imported as Location Assets.
