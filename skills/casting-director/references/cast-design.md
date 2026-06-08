# Cast Design

Cast Design is a Cast Member-owned department document.

Use it for:

- interpretation;
- appearance;
- performance;
- costume and scoped costume variants;
- voice casting notes;
- continuity;
- generation guidance.

Commands:

```bash
renku cast design context --cast <cast-member-id> --json
renku cast design list --cast <cast-member-id> --json
renku cast design show --active --cast <cast-member-id> --json
renku cast design show --design <cast-design-id> --json
renku cast design validate --file <cast-design-json> --json
renku cast design write --file <cast-design-json> --json
renku cast design set-active --cast <cast-member-id> --design <cast-design-id> --json
```

Keep the document about casting. Do not store generated media paths or shot-list directions in Cast Design.

Costume variants can be scoped to the whole project, one sequence, or one scene. They are authored design guidance, not standalone media targets yet.
