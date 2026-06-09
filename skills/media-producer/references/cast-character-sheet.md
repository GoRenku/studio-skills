# Cast Character Sheet Purpose

Purpose key: `cast.character-sheet`

Target format: `cast:<cast-member-id>`

Read context and model choices first:

```bash
renku generation context --purpose cast.character-sheet --target cast:<cast-member-id> --json
renku generation model list --purpose cast.character-sheet --target cast:<cast-member-id> --json
```

Character sheet generation requires an active Lookbook. The sheet should
synthesize:

- the screenplay and story function;
- the cast member's description, role, want, need, arc, and voice notes;
- period and setting signals;
- the active Lookbook's palette, lighting, composition, texture, and camera
  language.
- active Cast Design `generationGuidance`, `continuity`, likeness anchors,
  costume variants, and explicit user constraints.

Best current models:

- `fal-ai/openai/gpt-image-2` for realistic, high-caliber, tactile
  production-reference sheets, especially when matching an existing realistic
  cast-sheet style.
- `fal-ai/nano-banana-2` when layout control, seed support, or a more
  design-board-like sheet is more important than painterly realism. Do not use
  it by default when the project's approved sheets are realistic and the user
  expects that caliber.
- `fal-ai/xai/grok-imagine-image` as a cheaper alternative when its limits are
  acceptable

Spec shape:

```json
{
  "purpose": "cast.character-sheet",
  "target": { "kind": "castMember", "id": "cast_ada" },
  "modelChoice": "fal-ai/nano-banana-2",
  "prompt": "A full character sheet for Ada...",
  "takeCount": 1,
  "seed": null,
  "imageFrame": "project",
  "detail": "standard",
  "outputFormat": "png",
  "title": "Ada character sheet"
}
```

Prompt for a reusable design reference, not a single glamour portrait. Good
prompts call out full-body reference, face, wardrobe, materials, expression
range, posture, grooming, hands, and period-specific visual details.

For props, include only character-owned identity props from Cast Design or the
cast member's role. Do not add scene, location, technical, weapon, or plot props
merely because they are important to the story. If the context tempts you to
include a prop that belongs to another department, omit it unless the user asked
for it explicitly.

When the user supplies a portrait or says "in this likeness":

- preserve the supplied likeness as a binding constraint;
- include precise face, grooming, silhouette, and wardrobe anchors;
- use an image/edit route or imported source asset if the selected model and
  current Renku purpose support it;
- if the available `cast.character-sheet` model choices are text-to-image only,
  state that limitation before estimating or running, then make the prompt's
  likeness anchors unusually concrete.

Style and quality gate:

- before writing the spec, inspect existing approved character sheets for the
  project when available and match their production-reference caliber;
- avoid cartoon, game-character, comic-book, glossy generic concept-art, or
  clean digital illustration styling unless the active Lookbook explicitly asks
  for it;
- translate the active Lookbook into concrete instructions: lighting source,
  lens/framing behavior, texture, palette, weathering, materials, and historical
  surface detail;
- after generation, inspect the image before import. If a take is cartoony
  against a realistic Lookbook, contains garbled dominant labels, misses the
  likeness, or includes irrelevant props, do not import it automatically. Give
  the user a concrete QA assessment and recommend whether to accept it with
  caveats or approve a revised paid regeneration.

Import the selected take:

```bash
renku media import --purpose cast.character-sheet --target cast:<cast-member-id> --source generated/media/<file> --reference-name <stable-reference-name> --reference-purpose "<descriptive purpose>" --title "<visible card title>" --json
```

Reference metadata rules:

- `--reference-name` is required. Name the character plus continuity context,
  for example `mehmed-ii-palace-main`, `mehmed-ii-armored-siege`, or
  `mara-workshop-apprentice`. Do not use generated filenames, spec ids, run
  ids, or labels like `character-sheet-v2`.
- `--reference-purpose` is optional. Prefer a short production phrase such as
  `main palace character sheet`, `armored siege costume reference`, or
  `likeness and court wardrobe reference`. Do not use generic values like
  `character-sheet` unless that is truly the only known context.
- If the character may need multiple wardrobe/state variants and the requested
  context is ambiguous, clarify before import. A palace court sheet, armor
  sheet, disguise sheet, and injury-state sheet should get distinct names and
  purposes.
- Set `--title` to the visible Studio card title. Example:
  `Mehmed II Palace Main Character Sheet`.

To fix metadata on an already imported character sheet without generating or
duplicating media, update the existing asset relationship in place:

```bash
renku asset reference-update <asset-id> --target cast:<cast-member-id> --reference-name mehmed-ii-palace-main --reference-purpose "main palace character sheet" --title "Mehmed II Palace Main Character Sheet" --json
```
