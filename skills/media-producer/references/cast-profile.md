# Cast Profile Purpose

Purpose key: `cast.profile`

Target format: `cast:<cast-member-id>`

Read context and model choices first:

```bash
renku generation context --purpose cast.profile --target cast:<cast-member-id> --json
renku generation model list --purpose cast.profile --target cast:<cast-member-id> --json
```

Profile images should ideally derive from a character sheet first. Use
text-to-image when no source sheet exists or the user wants a looser
interpretation. Use edit models when the user wants continuity with a selected
character sheet.

Best current models:

- `fal-ai/openai/gpt-image-2`
- `fal-ai/nano-banana-2`
- `fal-ai/xai/grok-imagine-image` as a cheaper alternative when its limits are
  acceptable
- edit variants of those models when `sourceAssetId` is available

Text-to-image spec:

```json
{
  "purpose": "cast.profile",
  "target": { "kind": "castMember", "id": "cast_ada" },
  "modelChoice": "fal-ai/nano-banana-2",
  "prompt": "A square profile portrait of Ada...",
  "takeCount": 1,
  "seed": null,
  "imageFrame": "1:1",
  "detail": "standard",
  "outputFormat": "png",
  "title": "Ada profile"
}
```

Edit spec:

```json
{
  "purpose": "cast.profile",
  "target": { "kind": "castMember", "id": "cast_ada" },
  "modelChoice": "fal-ai/nano-banana-2/edit",
  "sourceAssetId": "asset_character_sheet",
  "prompt": "Create a square profile portrait derived from the attached character sheet...",
  "takeCount": 1,
  "seed": null,
  "imageFrame": "1:1",
  "detail": "standard",
  "outputFormat": "png",
  "title": "Ada profile from sheet"
}
```

For edit specs, `sourceAssetId` must point to an image attached to the cast
member with the `character_sheet` role.

Import the selected take:

```bash
renku media import --purpose cast.profile --target cast:<cast-member-id> --source generated/media/<file> --json
```
