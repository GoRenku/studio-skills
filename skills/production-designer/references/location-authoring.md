# Location Authoring

Use `renku location` for Location facts.

```bash
renku location list --json
renku location show <location-id> --json
renku location context --location <location-id> --json
renku location validate --file <location-operations-json> --json
renku location apply --file <location-operations-json> --dry-run --json
renku location apply --file <location-operations-json> --json
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
- Handles are lower-case, stable, and unique across Cast Members and Locations.
- Delete operations fail when the Location is still referenced by screenplay scenes.
- Screenplay scenes reference Locations by durable id; do not create Locations through screenplay JSON.
