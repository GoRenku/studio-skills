# Department Map

Use this map to classify user intent and choose the next specialist. When a request spans departments, choose the earliest missing dependency unless the user explicitly asks to jump to a later department.

## Current Supported Departments

| User intent | Department | Specialist | First CLI read |
| --- | --- | --- | --- |
| Create a story, screenplay, scene, dialogue, narration, cast facts, or location facts | Screenwriting | `screenplay-drafter` | `renku screenplay status --json` or `renku screenplay show --json` |
| Critique structure, diagnose pacing, plan revisions, analyze acts/sequences/scenes | Screenplay Analysis | `screenplay-analyst` | `renku screenplay analyze context --json` |
| Analyze reference folders, extract visual principles from images | Cinematography / Visual Language | `inspiration-analyzer` | `renku inspiration list --json` then `renku inspiration show --folder <folder-id> --json` |
| Create, revise, activate, or connect a Lookbook to Inspiration folders | Cinematography / Visual Language | `lookbook-designer` | `renku lookbook list --json` |
| Generate Lookbook images or Lookbook sheets | Media Production | `media-producer` | `renku generation context --purpose lookbook.image --target lookbook:<lookbook-id> --json` |
| Design a scene's shot list, revise coverage, update shot composition/movement/cast/location intent | Directing / Shot Design | `scene-shot-designer` | `renku screenplay shot-list context --scene <scene-id> --json` |
| Generate storyboard images for a Scene Shot List | Media Production | `media-producer` after `scene-shot-designer` | `renku generation context --purpose scene.storyboard-sheet --target scene:<scene-id> --shot-list <shot-list-id> --json` |
| Generate first frame, last frame, reference image, multi-shot storyboard input, or final shot video take | Media Production | `media-producer` | `renku generation preflight --purpose shot.video-take --target scene:<scene-id> --shot-list <shot-list-id> --shots <shot-id[,shot-id...]> --json` |
| Generate cast character sheets or profile images | Media Production | `media-producer` after cast exists | `renku generation context --purpose cast.character-sheet --target cast:<cast-member-id> --json` |
| Generate location environment sheets | Media Production | `media-producer` after location exists | `renku generation context --purpose location.environment-sheet --target location:<location-id> --json` |

## Partially Supported Departments

### Casting

Current durable route:

- Use `screenplay-drafter` when cast facts must be added or revised.
- Use `media-producer` for `cast.character-sheet` and `cast.profile` after the cast member exists.

Explain the gap:

- There is no first-class `casting-director` skill yet.
- There is no cast-specific authoring CLI yet.
- Cast fact mutations currently go through `renku screenplay apply` with `castMember.*` operations.

Do not claim full support for casting comparison, costume continuity, voice variants, or casting boards.

### Production Design

Current durable route:

- Use `screenplay-drafter` for location facts when the screenplay source of truth must change.
- Use `media-producer` for `location.environment-sheet` after the location exists.
- Use `scene-shot-designer` when staging or blocking affects coverage.

Explain the gap:

- There is no first-class `production-designer` skill yet.
- There is no production-design authoring CLI for set dressing, props, durable staging, or blocking constraints yet.
- Location fact mutations currently go through `renku screenplay apply` with `location.*` operations.

### Voice, Sound, Music, Editorial, And Post

Current support is weak or absent.

- Future voice casting stays under casting until a later architecture decision splits it out.
- Sound, music, captioning, dubbing, editing, trims, and final assembly do not have complete specialist workflows yet.
- Use production export only when the user asks for handoff-ready selected assets.

## Default Dependency Order

1. Project brief and constraints.
2. Screenplay draft.
3. Screenplay analysis and targeted revision.
4. Cast and location foundation.
5. Inspiration folders and Inspiration Analysis.
6. Active Lookbook.
7. Cast character sheets, cast profiles, and location environment sheets.
8. Scene Shot Lists.
9. Per-shot storyboard images.
10. Shot reference images, first/last frames, and multi-shot storyboard inputs.
11. Shot video takes.
12. Selects, production export, and future post/editorial work.
