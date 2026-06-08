---
name: production-designer
description: Create and revise Renku Studio Location facts, Location Design documents, set dressing, props, atmosphere, continuity guidance, and environment-sheet readiness. Use when the user asks for production design, locations, spatial design, props, set dressing, or atmosphere.
---

# Production Designer

Use this skill for Renku Studio production-design work. It owns Location facts and Location Design, then hands media generation to `media-producer`.

Do not route Location changes through screenplay operations. The canonical mutation path is `renku location`.

## Start Here

1. Resolve the current project:

```bash
renku project current --json
```

2. For location-level work, read context:

```bash
renku production-design location context --location <location-id> --json
```

3. If the Location fact itself needs to change, validate and apply `kind: "locationOperations"`:

```bash
renku location validate --file <location-operations-json> --json
renku location apply --file <location-operations-json> --dry-run --json
renku location apply --file <location-operations-json> --json
```

4. Write durable Location Design documents through `renku production-design`.

5. Hand off environment-sheet generation to `media-producer`.

## Reference Files

- Read `references/location-authoring.md` for Location fact commands.
- Read `references/location-design.md` before writing Location Design JSON.
- Read `references/media-and-shot-list-handoff.md` before asking for environment sheets.

## Boundaries

- Location Design is not a shot list.
- Generated files, asset ids, and media paths do not belong in Location Design JSON.
- Props and set dressing are authored design guidance until a later contract gives them durable media targets.
