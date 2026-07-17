---
name: scene-beat-designer
description: Design and persist Renku Studio Scene Beat Sheets by reading scene screenplay context, referenced cast and locations, selected Movie Lookbook guidance, and user direction.
---

# Scene Beat Designer

Use this skill to design durable Scene Beat Sheets for individual Renku Studio screenplay scenes.

A Beat is a narrative unit, not a camera Shot. It records what meaning develops, why that development matters, and the visual setting, meaningful placement, spatial relationships, important elements, and atmosphere needed to illustrate it. It does not prescribe framing, lenses, camera movement, edit coverage, or other Shot execution.

## Workflow

1. Resolve the current project and exact scene. If the user refers to the current Studio selection, run `renku studio current --json`.
2. Read Beat Sheet context:

   ```bash
   renku screenplay beat-sheet context --scene <scene-id> --json
   ```

3. Decide whether the user wants brainstorming, a first saved Beat Sheet, a revision against an explicit base, or restoration of an earlier history row.
4. Read `references/beat-design-guidelines.md` and `references/scene-beat-sheet-json-contract.md`.
5. Use a full `sceneBeatSheet` document for a first sheet or an intentional full replacement. Use `sceneBeatSheetOperations` for focused edits against an explicit `baseBeatSheetId`.
6. Validate before mutation:

   ```bash
   renku screenplay beat-sheet validate --file <beat-sheet-json> --json
   renku screenplay beat-sheet validate-operations --file <operations-json> --json
   ```

7. Write or apply:

   ```bash
   renku screenplay beat-sheet write --file <beat-sheet-json> --json
   renku screenplay beat-sheet apply --file <operations-json> --json
   ```

8. Read back the active sheet and storyboard status:

   ```bash
   renku screenplay beat-sheet show --active --scene <scene-id> --json
   renku screenplay beat-sheet storyboard status \
     --scene <scene-id> \
     --beat-sheet <beat-sheet-id> \
     --json
   ```

9. If saved changes leave missing or stale Beat storyboard images and the user did not request text-only work, hand off to `media-producer` with purpose `scene.storyboard-sheet`.

## Studio Notifications

Beat Sheet mutations and storyboard imports should refresh an open Studio app through its local notification endpoint. When localhost access needs approval, obtain it before the first mutation. If a command reports `CLI026`, the mutation already succeeded; do not rerun it merely to refresh Studio. Read back state and use a separate refresh step.

## Storyboard Handoff

This skill owns Beat design, not media generation. Give `media-producer`:

- purpose `scene.storyboard-sheet`;
- target `scene:<scene-id>`;
- the exact `beatSheetId`;
- the missing or stale Beat ids from storyboard status.

Storyboard panels illustrate Beats. They may make agent-chosen visual decisions for a specific generated image, but the Beat Sheet must remain free of camera and Shot execution fields.

## References

- `references/beat-sheet-cli-workflow.md`
- `references/scene-beat-sheet-json-contract.md`
- `references/beat-design-guidelines.md`
- `samples/scene-beat-sheet.json`
- `samples/scene-beat-sheet-operations.json`

## Non-Negotiables

- Do not write directly to `.renku/project.sqlite`.
- Do not mutate screenplay scenes while designing Beats.
- Do not invent scene, Cast Member, Location, Beat Sheet, or Beat ids.
- Each Beat has exactly the eight contract fields documented in the JSON contract.
- Do not add subject, action, dialogue coverage, audio notes, production notes, camera fields, or generated media paths.
- Preserve prompts and creative artifact contents as opaque values.
- Validate before write or apply.
