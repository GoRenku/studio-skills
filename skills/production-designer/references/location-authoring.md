# Location Authoring
## Efficient Command Use

Location, Prop, production-design, and location world commands require current authoring selection; --project does not retarget them. Establish the requested project once, then reuse it during an unchanged iteration. Apply operation documents for related fact changes; retain meaningful dry-run review. Apply/design write enforce validation; separate validate is for validation-only intent or a review pause. Mutation reports confirm their returned changes, but read missing authored detail when needed. Keep immediate pre-enrichment reads and post-enrichment verification.

Consult the relevant CLI reference/help once if syntax is unknown, then reuse verified syntax for this task. Do not discover syntax by attempting mutations. Do not invent `project list`. If a known permission denial blocks cache/output/config or local-network access, explain the requirement and use the authorized host permission flow; do not repeat the denied attempt, read secrets, disable cache persistence, or change permissions. `CLI026` means the mutation succeeded: report the notification warning without replaying the mutation.


Use `renku location` for Location facts.

```bash
renku location list --json
renku location show <location-id> --json
renku location context --location <location-id> --json
# Optional validation-only or review step:
renku location validate --file tmp/operations/location-operations.json --json
renku location apply --file tmp/operations/location-operations.json --dry-run --json
renku location apply --file tmp/operations/location-operations.json --json
```

Operation document:

```json
{
  "kind": "locationOperations",
  "operations": [
    {
      "operation": "location.add",
      "location": {
        "key": "control-room",
        "handle": "control-room",
        "name": "Control Room",
        "timePeriod": "Late 1970s",
        "description": "A cramped civic control room under budget pressure."
      }
    }
  ]
}
```

Rules:

- New Locations use `key`, not `id`.
- Existing Locations use durable `id`.
- Handles are lower-case, stable, and unique across Cast Members, Locations,
  and Props.
- Delete operations fail when the Location is still referenced by screenplay scenes.
- Screenplay scenes reference Locations by durable id; do not create Locations through screenplay JSON.
