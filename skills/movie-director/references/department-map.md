# Department Map

`blender-shot-planner` owns Scene-specific Previs source, procedural render revisions and director iteration. `shot-planner` owns Shot Lists. `media-producer` owns AI takes from either.

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
| Import research, notes, documents, images of text, or other supporting screenplay context without changing screenplay content | Source Import | `screenplay-supporting-material-importer` | `renku project current --json` |
| Critique structure, diagnose pacing, plan revisions, derive analytical Act segments or Scene groups | Screenplay Analysis | `screenplay-analyst` | `renku screenplay analyze context --json` |
| Create/revise Cast Member facts, appearance, performance, costume, voice casting notes | Casting | `casting-director` | `renku cast design context --cast <cast-member-id> --json` |
| Create/revise Location facts, spatial design, set dressing, props, atmosphere | Production Design | `production-designer` | `renku production-design location context --location <location-id> --json` |
| Create/revise durable Prop facts, Prop Design, or Prop media readiness | Production Design | `production-designer` | `renku production-design prop context --prop <prop-id> --json` |
| Analyze reference folders, extract visual principles from images | Cinematography / Visual Language | `inspiration-analyzer` | `renku inspiration show --folder <folder-id> --json` |
| Create, revise, or connect the project's Production Lookbook or Storyboard Lookbook to Inspiration folders | Cinematography / Visual Language | `lookbook-designer` | `renku lookbook show --kind <production\|storyboard> --json` |
| Design or revise narrative-appropriate Scene Beats; create or materially recompose their Storyboard imagery for pre-production alignment | Directing / Beat Design | `scene-beat-designer`, then `media-producer` for `scene.storyboard-sheet` | `renku screenplay beats context --scene <scene-id> --json` |
| Create or iteratively revise director/cinematographer production camera coverage, a Shot List, individual Shots, order, or selected Shot imagery | Directing / Shot Planning | `shot-planner` | `renku shot-plan list --scene <scene-id> --json` |
| Change one exact existing image while preserving its unaffected content, regardless of its current or intended owner | Media Production | `media-producer` for image operation routing and `image.edit` | Resolve the exact source Asset and AssetFile from current context |
| Create or revise Blender 3D blocking, camera, gestures or dialogue timing | Directing / Previs | `blender-shot-planner` | `renku shot-plan previs show --shot-plan <shot-plan-id> --json` |
| Create one Dialogue Audio Take for one Turn or one consecutive Turn range in a Shot Plan | Media Production / Dialogue | `media-producer` for `shot-plan.dialogue-audio` | `renku generation context --purpose shot-plan.dialogue-audio --target shot-plan:<shot-plan-id> --json` |
| Edit or continue one exact registered video while preserving unaffected content | Media Production | `media-producer` for `video.edit` | Resolve the exact source video Asset and AssetFile from current context |
| Generate or import media | Media Production | `media-producer` | `renku generation context --purpose <purpose> --target <target> --json` |

## Default Production Order

1. Direct Project brief, story metadata, and constraints.
2. Import any user-supplied supporting material; this may also happen later.
3. Cast Member, Location, and Prop facts when Scenes will reference them.
4. Screenplay import or draft, followed by collaborative fact/reference binding.
5. Screenplay analysis and targeted revision.
6. Inspiration folders and Inspiration Analysis.
7. Project Production Lookbook.
8. Project Storyboard Lookbook and one accepted
   `lookbook.storyboard-sheet` before Beat Storyboard generation.
9. Cast Design, Location Design, and Prop Design.
10. Cast Character Sheets, Cast Profiles, Location Sheets, and Prop Sheets.
11. Scene Beats, with cardinality determined only by narrative development.
12. Per-Beat Storyboard images, batched only at generation time in consecutive
    groups of up to four without changing the saved revision.
13. Scene Shot Plans and selected Shot Images when production camera coverage
    is useful.
14. Shot Plan video generation, Dialogue Audio continuity, and source-derived
    video edits when requested.
15. Future post/editorial assembly work.

## Current Gaps

- Costume-variant media is not first-class. Keep its notes in Cast Design.
- Location-local set-dressing media is not first-class. Keep its notes in
  Location Design unless the object is deliberately authored as a Prop.
- Sound, music, editorial, and final assembly do not have complete specialist workflows yet.
