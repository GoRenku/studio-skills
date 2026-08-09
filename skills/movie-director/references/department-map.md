# Department Map

Use this map to classify user intent and choose the next specialist. When a request spans departments, choose the earliest missing prerequisite unless the user explicitly asks to jump to a later department.

Before using any scene-scoped row below, resolve user-facing `Scene 22` / `22A`
references with:

```bash
renku screenplay scene-number resolve --number <production-number> --json
```

Then pass the returned durable `sceneId` to the owning specialist.

| User intent | Department | Specialist | First CLI read |
| --- | --- | --- | --- |
| Import Final Draft FDX, or create/revise story, screenplay, scene, dialogue, narration, scene settings, action lines | Screenwriting | `screenplay-drafter` | `renku screenplay status --json` |
| Critique structure, diagnose pacing, plan revisions, derive analytical Act segments or Scene groups | Screenplay Analysis | `screenplay-analyst` | `renku screenplay analyze context --json` |
| Create/revise Cast Member facts, appearance, performance, costume, voice casting notes | Casting | `casting-director` | `renku cast design context --cast <cast-member-id> --json` |
| Create/revise Location facts, spatial design, set dressing, props, atmosphere | Production Design | `production-designer` | `renku production-design location context --location <location-id> --json` |
| Create/revise durable Prop facts, Prop Design, or Prop media readiness | Production Design | `production-designer` | `renku production-design prop context --prop <prop-id> --json` |
| Analyze reference folders, extract visual principles from images | Cinematography / Visual Language | `inspiration-analyzer` | `renku inspiration show --folder <folder-id> --json` |
| Create, revise, or connect the project's Production Lookbook or Storyboard Lookbook to Inspiration folders | Cinematography / Visual Language | `lookbook-designer` | `renku lookbook show --kind <production\|storyboard> --json` |
| Design or revise scene narrative Beats and their illustration context | Directing / Beat Design | `scene-beat-designer` | `renku screenplay beats context --scene <scene-id> --json` |
| Create or iteratively revise a Scene Shot Plan, individual Shots, coverage, order, or selected Shot imagery | Directing / Shot Planning | `shot-planner` | `renku shot-plan list --scene <scene-id> --json` |
| Generate or import media | Media Production | `media-producer` | `renku generation context --purpose <purpose> --target <target> --json` |

## Default Production Order

1. Direct Project brief, story metadata, and constraints.
2. Cast Member, Location, and Prop facts when Scenes will reference them.
3. Screenplay import or draft, followed by collaborative fact/reference binding.
4. Screenplay analysis and targeted revision.
5. Inspiration folders and Inspiration Analysis.
6. Project Production Lookbook.
7. Project Storyboard Lookbook, with its `lookbook.storyboard-sheet` available
   as non-blocking guidance when one exists.
8. Cast Design, Location Design, and Prop Design.
9. Cast Character Sheets, Cast Profiles, Location Sheets, and Prop Sheets.
10. Scene Beats.
11. Per-Beat storyboard images.
12. Scene Shot Plans and selected Shot images when useful.
13. Future Shot video authoring and post/editorial work.

## Current Gaps

- Costume-variant media and voice media are not first-class. Keep their notes in Cast Design.
- Location-local set-dressing media is not first-class. Keep its notes in
  Location Design unless the object is deliberately authored as a Prop.
- Sound, music, editorial, and final assembly do not have complete specialist workflows yet.
