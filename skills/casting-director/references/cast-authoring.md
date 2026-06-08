# Cast Authoring

Use `renku cast` for Cast Member facts.

```bash
renku cast list --json
renku cast show <cast-member-id> --json
renku cast context --cast <cast-member-id> --json
renku cast validate --file <cast-operations-json> --json
renku cast apply --file <cast-operations-json> --dry-run --json
renku cast apply --file <cast-operations-json> --json
```

Operation document:

```json
{
  "kind": "castOperations",
  "operations": [
    {
      "operation": "castMember.add",
      "castMember": {
        "key": "ada",
        "handle": "ada",
        "name": "Ada",
        "role": "protagonist"
      }
    }
  ]
}
```

Rules:

- New Cast Members use `key`, not `id`.
- Existing Cast Members use durable `id`.
- Handles are lower-case, stable, and unique across Cast Members and Locations.
- Delete operations fail when the Cast Member is still referenced by screenplay scenes.
- Screenplay scenes reference Cast Members by durable id; do not create Cast Members through screenplay JSON.
