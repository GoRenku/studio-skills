# Cast Authoring
## Efficient Command Use

Cast facts and Cast Design commands require the current authoring project; their --project flag does not retarget these operations. Establish that selection once when needed. Cast Voice commands support explicit --project. Use one castOperations document for related edits and retain a meaningful dry run when reviewing changes. Apply and design write validate before persistence; a separate validate is for validation-only intent or a review pause. Use returned changes and identities for confirmation, reading again only for missing detail. Keep the immediate pre-enrichment source/fact reads and post-enrichment verification.

Consult the relevant CLI reference/help once if syntax is unknown, then reuse verified syntax for this task. Do not discover syntax by attempting mutations. Do not invent `project list`. If a known permission denial blocks cache/output/config or local-network access, explain the requirement and use the authorized host permission flow; do not repeat the denied attempt, read secrets, disable cache persistence, or change permissions. `CLI026` means the mutation succeeded: report the notification warning without replaying the mutation.


Use `renku cast` for Cast Member facts.

```bash
renku cast list --json
renku cast show <cast-member-id> --json
renku cast context --cast <cast-member-id> --json
# Optional validation-only or review step:
renku cast validate --file tmp/operations/cast-operations.json --json
renku cast apply --file tmp/operations/cast-operations.json --dry-run --json
renku cast apply --file tmp/operations/cast-operations.json --json
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
