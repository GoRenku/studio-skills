# Prop Authoring

Use `renku prop` for durable reusable production Props. Keep a Location Design
`recurringObjects` entry local when it does not need independent design
history, Assets, generation, or Studio navigation.

```bash
renku prop list --json
renku prop show <prop-id> --json
renku prop context --prop <prop-id> --json
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
        "description": "A monumental bronze siege cannon.",
        "visualNotes": "Dark bronze, massive timber carriage, worn iron fittings."
      }
    }
  ]
}
```

Adds use `key`; updates use durable `id`. Handles must be unique across Cast
Members, Locations, and Props. Always validate and dry-run before mutation.
Deletion is blocked by Prop Assets or Prop Design history. Do not scan
screenplay or prompt prose to infer Props.
