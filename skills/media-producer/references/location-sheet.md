# Location Sheet And Hero

Use `location.sheet` with `location:<location-id>` for one or more production reference boards. Read current context rather than hard-coding settings; it currently recommends 16:9, high quality, and GPT Image 2.

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

Read `location-sheet-board-design.md` when authoring or reviewing a Location Sheet. Inspect the output as one opaque production reference image. Do not require runtime slices, view labels, panel schemas, or semantic content validation.

After inspection, attach through the matching focused purpose:

```bash
renku media import --purpose location.sheet --target location:<location-id> --source <project-relative-path> --title <title> --receipt <run-json> --json
renku media import --purpose location.hero --target location:<location-id> --source <project-relative-path> --title <title> --receipt <run-json> --select --json
```

Use `--source-spec <spec-id>` for Codex-generated files. Omit both provenance
flags for external files with no saved generation request. Location Sheets are
request-scoped candidates and never use global selection. Omit Hero
`--select` only when the user explicitly wants an additional unselected Hero
candidate. Do not crop a Location Sheet into runtime-owned directional slices.
