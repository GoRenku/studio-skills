# Prop Authoring

Use `renku prop` for durable reusable production Props. Keep a Location Design
`recurringObjects` entry local when it does not need independent design
history, Assets, generation, or Studio navigation.

Prop commands require current authoring selection. Establish it once for the
requested Project; --project does not retarget these handlers. Use one operations
document for related changes. Apply validates before writing; separate validate
is for validation-only intent or a review pause. Keep a meaningful dry run for
change review and read missing detail when mutation reports are insufficient.

```bash
renku prop list --json
renku prop show <prop-id> --json
renku prop context --prop <prop-id> --json
# Optional validation-only or review step:
renku prop validate --file tmp/operations/prop-operations.json --json
renku prop apply --file tmp/operations/prop-operations.json --dry-run --json
renku prop apply --file tmp/operations/prop-operations.json --json
```

```json
{
  "kind": "propOperations",
  "operations": [
    {
      "operation": "prop.add",
      "prop": {
        "key": "field-cannon",
        "handle": "field-cannon",
        "name": "Field Cannon",
        "description": {
          "overview": "A monumental bronze siege cannon.",
          "storyUse": "Urban casts it in Scene 6 and it breaches the walls in Scene 9.",
          "formAndMaterials": "Bronze barrel on a timber carriage. Exact length and bore are unspecified.",
          "statesAndContinuity": "Freshly cast, then soot-blackened after the first firing; the crack near the muzzle must stay visible after Scene 8.",
          "sourceNotes": "Scenes 6, 8 and 9. Carriage design is interpretation."
        },
        "visualNotes": "Dark bronze, massive timber carriage, worn iron fittings."
      }
    }
  ]
}
```

`description` sections (all optional; include at least one, or omit `description`):

| Key | Studio heading | What belongs here |
|---|---|---|
| `overview` | (none; shown first) | What the object is, briefly |
| `storyUse` | In the story | Who uses it, where, and why it matters |
| `formAndMaterials` | Form and materials | Shape, parts and materials; what is unspecified |
| `statesAndContinuity` | States and continuity | How it changes, and what must stay the same |
| `sourceNotes` | Source (footnote) | Which Scenes the facts come from, and which statements are interpretation |

Section text is plain prose; separate paragraphs with a blank line. Never put
headings or capital-letter section titles inside section text.

Adds use `key`; updates use durable `id`. `prop.update` replaces the whole
record: include every field you want to keep, including the full
`description` object. Handles must be unique across Cast
Members, Locations, and Props. Always validate and dry-run before mutation.
Deletion is blocked by Prop Assets or Prop Design history. Do not scan
screenplay or prompt prose to infer Props.
