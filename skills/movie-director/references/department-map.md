# Department Map

Use this map to classify user intent and choose the next specialist. When a request spans departments, choose the earliest missing prerequisite unless the user explicitly asks to jump to a later department.

| User intent | Department | Specialist | First CLI read |
| --- | --- | --- | --- |
| Create or revise story, screenplay, scene, dialogue, narration, scene settings, action lines | Screenwriting | `screenplay-drafter` | `renku screenplay status --json` |
| Critique structure, diagnose pacing, plan revisions, analyze acts/sequences/scenes | Screenplay Analysis | `screenplay-analyst` | `renku screenplay analyze context --json` |
| Create/revise Cast Member facts, appearance, performance, costume, voice casting notes | Casting | `casting-director` | `renku cast design context --cast <cast-member-id> --json` |
| Create/revise Location facts, spatial design, set dressing, props, atmosphere | Production Design | `production-designer` | `renku production-design location context --location <location-id> --json` |
| Analyze reference folders, extract visual principles from images | Cinematography / Visual Language | `inspiration-analyzer` | `renku inspiration show --folder <folder-id> --json` |
| Create, revise, or connect the project's Production Lookbook or Storyboard Lookbook to Inspiration folders | Cinematography / Visual Language | `lookbook-designer` | `renku lookbook show --kind <production\|storyboard> --json` |
| Design or revise scene coverage and shot composition/movement/cast/location intent | Directing / Shot Design | `scene-shot-designer` | `renku screenplay shot-list context --scene <scene-id> --json` |
| Generate or import media | Media Production | `media-producer` | `renku generation context --purpose <purpose> --target <target> --json` |

## Default Production Order

1. Project brief and constraints.
2. Cast Member and Location facts when scenes will reference them.
3. Screenplay draft.
4. Screenplay analysis and targeted revision.
5. Inspiration folders and Inspiration Analysis.
6. Project Production Lookbook.
7. Project Storyboard Lookbook, with its `lookbook.storyboard-sheet` available
   as non-blocking guidance when one exists.
8. Cast Design and Location Design.
9. Cast Character Sheets, Cast Profiles, and Location Sheets.
10. Scene Shot Lists.
11. Per-shot storyboard images.
12. Exact Shot Video Take references and guide media.
13. Shot video takes.
14. Selects, production export, and future post/editorial work.

## Current Gaps

- Costume-variant media and voice media are not first-class. Keep their notes in Cast Design.
- Prop media and set-dressing media are not first-class. Keep their notes in Location Design.
- Sound, music, editorial, and final assembly do not have complete specialist workflows yet.
