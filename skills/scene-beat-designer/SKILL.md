---
name: scene-beat-designer
description: Design and persist Renku Studio Scene Beats by reading Scene screenplay context, referenced Cast Members, Locations, Props, selected Movie Lookbook guidance, and user direction. Use for first Beat creation, focused Beat revisions, full reset, history inspection, or active-revision restoration.
---

# Scene Beat Designer

This skill requires the installed Renku runtime. If `renku` is unavailable, stop and direct the user to `https://gorenku.com`; do not substitute ad hoc files for the CLI-owned project state.

## Project Workspace

Keep every agent-created working file inside the current Project's categorized
`tmp/` tree. Never create operation JSON, Generation Specs, import manifests,
QA images, downloads, crops, or scratch files at the Project root.

- Use `tmp/operations/` for CLI authoring documents, including create, update,
  design, analysis, Lookbook, Scene Beats, Shot Plan, and import JSON.
- Use `tmp/specs/` for Generation Specs and `tmp/receipts/` for provider receipts.
- Use `tmp/media/` for temporary generated, downloaded, transformed, or cropped
  media; use `tmp/qa/` for review evidence and `tmp/scratch/` for other temporary
  inputs.
- Create category folders lazily. Let Renku commands copy accepted content into
  durable owner folders; never construct durable asset paths in the skill.
- Keep an external user source outside the Project when possible. If a temporary
  in-Project copy is necessary, place it under `tmp/scratch/`.


Design durable Scene Beats for one Renku Studio screenplay Scene. A Beat is a
narrative unit, not a camera Shot. Keep framing, lenses, camera movement, edit
coverage, and production execution out of Beat content.

Author as many Beats as the Scene's narrative developments require. There is no
four-Beat cap, preferred multiple, grouping rule, or image-batch concern in Beat
design. Beat Storyboard images are later pre-production story-alignment
artifacts; Media Producer alone partitions requested saved Beats into image
batches of up to four without changing this revision.

## Workflow

1. Resolve the current Project and exact Scene. For Studio focus, run
   `renku studio current --json`. For `Scene 22` or `22A`, run:

   ```bash
   renku screenplay scene-number resolve --number <production-number> --json
   ```

   Use only the returned durable `sceneId` in JSON and `--scene` flags.

2. Read current context and history:

   ```bash
   renku screenplay beats context --scene <scene-id> --json
   renku screenplay beats list --scene <scene-id> --json
   renku screenplay beats show --active --scene <scene-id> --json
   ```

3. Choose one intent:

   - Brainstorm without persistence.
   - `create` the first Scene Beats revision.
   - `apply` focused insert/update/delete operations against an exact
     `baseRevisionId`.
   - `reset` the full Beat set when the user explicitly wants a new version.
   - Restore retained work with `set-active`; never rewrite or delete history.

4. Read `references/beat-design-guidelines.md`,
   `references/scene-beats-json-contract.md`, and
   `references/scene-beats-cli-workflow.md` as needed.

5. Validate before mutation, execute the chosen intent, then read back the
   exact revision. If a command reports `CLI026`, the mutation already
   succeeded; read durable state and refresh Studio separately instead of
   rerunning the mutation.

6. Read Storyboard status for the exact saved revision:

   ```bash
   renku screenplay beats storyboard status \
     --scene <scene-id> \
     --revision <scene-beats-revision-id> \
     --json
   ```

7. If Beats lack selected Storyboard images and the user did not request
   text-only work, hand off to `media-producer` with purpose
   `scene.storyboard-sheet`, `scene:<scene-id>`, the exact
   `sceneBeatsRevisionId`, and returned `missingBeatIds`. Hand off the exact
   revision unchanged; do not group, pad, merge, or reorder Beats.

## Number And Identity Ownership

Author only creative `BeatInput` fields. Core creates Beat ids and numbers for
`create`, `reset`, and insert operations. Updates and deletes target a durable
`beatId`; updates preserve its number. Do not guess ids or numbers, derive them
from array position, or reuse a retired number.

Reset creates and activates a new revision with fresh Beat ids and `1..N`
numbers. It retains the prior revision and records it as `baseRevisionId`.
Restore means `set-active` on an exact retained revision. Because Storyboard
Assets remain owned by `{ sceneId, beatId }`, reactivating a revision reconnects
its retained Beat images; do not copy image paths into Scene Beats JSON.

## References

- `references/scene-beats-cli-workflow.md`
- `references/scene-beats-json-contract.md`
- `references/beat-design-guidelines.md`
- `samples/scene-beats.json`
- `samples/scene-beats-operations.json`

## Non-Negotiables

- Do not write directly to `.renku/project.sqlite`.
- Do not mutate screenplay content while designing Beats.
- Do not invent Scene, Screenplay Block, Cast Member, Location, Prop, revision,
  or Beat ids.
- Do not put `id` or `number` in a Beat input.
- Use stable `screenplayBlockIds`, never array indexes.
- Preserve creative contents as opaque authored values.
- Validate before create, reset, or apply.
- Add no camera fields, generated-media paths, or production-logistics fields.
- Do not cap or group Beats for the later four-panel generation optimization.
- Discuss perceived pace and timing during review, but do not invent persisted
  Beat timing fields.
