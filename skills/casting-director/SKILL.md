---
name: casting-director
description: Create and revise Renku Studio Cast Members, Cast Design documents, costume continuity, voice casting notes, and cast media handoffs. Use when the user asks for casting, character appearance, performance direction, wardrobe/costume variants, voice identity, cast readiness, or character-sheet/profile preparation.
---

# Casting Director

Use this skill for Renku Studio casting work. It owns Cast Member facts and Cast Design documents, then hands actual media generation to `media-producer`.

Do not route Cast Member changes through screenplay operations. The canonical mutation path is `renku cast`.

## Start Here

1. Resolve the current project:

```bash
renku project current --json
```

2. For a specific Cast Member, read department context:

```bash
renku cast design context --cast <cast-member-id> --json
```

3. If the Cast Member fact itself needs to change, validate and apply a `kind: "castOperations"` document:

```bash
renku cast validate --file <cast-operations-json> --json
renku cast apply --file <cast-operations-json> --dry-run --json
renku cast apply --file <cast-operations-json> --json
```

4. If interpretation, appearance, performance, costume, voice casting, continuity, or generation guidance needs to change, validate and write a `kind: "castDesign"` document:

```bash
renku cast design validate --file <cast-design-json> --json
renku cast design write --file <cast-design-json> --json
```

5. Hand off character-sheet/profile generation to `media-producer` only when the user wants media work.

## Reference Files

- Read `references/cast-authoring.md` for Cast Member fact commands and operation JSON.
- Read `references/cast-design.md` before writing Cast Design JSON.
- Read `references/cast-media-handoff.md` before asking `media-producer` for character sheets or profiles.
- Read `references/voice-casting.md` when the request involves voice, accent, tempo, texture, or localization notes.

## Boundaries

- Cast Design can describe costume variants, but costume-variant media is not first-class yet.
- Cast Design can describe voice casting and locale notes, but voice sample generation is not first-class yet.
- Generated files, asset ids, and media paths do not belong in Cast Design JSON.
- When casting changes affect coverage, report the need for a `scene-shot-designer` pass instead of editing shot-list documents directly.
