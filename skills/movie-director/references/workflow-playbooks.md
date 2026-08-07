# Workflow Playbooks

Use these playbooks when a user asks for an outcome rather than naming a single
department. Always preserve explicit user choices. Pass Generation Context
`workflowPolicy` to `media-producer`; do not recreate path, Preview,
confirmation, or concurrency defaults in this coordinator. Every Renku-managed
run still uses its exact estimate token regardless of the conversational
confirmation preference.

For Codex runs, remember that local Studio HTTP notification is network access. Before dispatching any specialist step that will mutate Renku state while Studio is running, make sure the mutating CLI command is run with sandbox/network permission. If `CLI026` appears, do not rerun non-idempotent mutations just to notify Studio.

## Idea To First Screenplay

1. Ask only for missing brief details that materially affect the screenplay.
2. If scenes need named Cast Members or Locations, dispatch those facts to `casting-director` and `production-designer` first.
3. Dispatch screenplay drafting to `screenplay-drafter` using durable Cast Member and Location ids.
4. Read back `renku screenplay status --json`.
5. Recommend screenplay analysis before visual production.

## Final Draft FDX To Enriched Project

1. Read `renku director context --json` and retain
   `projectSettings.screenplayImport` for follow-up dispatch.
2. Confirm the current Screenplay is empty and dispatch the absolute `.fdx`
   path to `screenplay-drafter`.
3. Read back the canonical Screenplay and import candidates. The deterministic
   importer stops here and returns evidence to this coordinator.
4. If `createContinuitySubjects` is enabled, compare candidate
   cues/headings/tags with existing Project facts, resolve ambiguity with the
   user, dispatch accepted facts to `casting-director` and
   `production-designer`, then dispatch exact reference bindings back to
   `screenplay-drafter`. Never match by name alone.
5. If `generateContinuityImages` is enabled, dispatch `cast.profile`,
   `location.hero`, or `prop.hero` only after each accepted subject is ready.
6. If `runScreenplayAnalysis` is enabled, dispatch `screenplay-analyst` after
   import and accepted bindings settle.
7. If `generateSceneBeatSheets` is enabled, dispatch `scene-beat-designer` for
   each Scene after its required project context is ready.
8. If `generateBeatStoryboardImages` is enabled, dispatch
   `scene.storyboard-sheet` only for Scenes that already have an active Beat
   Sheet.

Enabled stages continue without another “start this stage?” question after the
user requested import. Disabled stages are not proactively dispatched. Explicit
task direction may override a stage for the current request without changing
Project Settings. Analysis and continuity media may overlap after their own
prerequisites; storyboard work never starts before its Scene has an active Beat
Sheet. A missing prerequisite stops only the dependent stage and is reported
clearly.

Never report ScriptNotes or formatting as missing content, and never attempt a
second import, merge, or overwrite.

## Cast Refinement Prompt

1. Dispatch Cast Member fact and Cast Design work to `casting-director`.
2. Read back `renku cast design context --cast <cast-member-id> --json`.
3. If the user wants new imagery, dispatch `cast.character-sheet` or `cast.profile` work to `media-producer`.
4. Read back director context to confirm readiness changed.

## Location Production Design Prompt

1. Dispatch Location facts and Location Design to `production-designer`.
2. If the user wants new imagery, dispatch `location.sheet` to `media-producer`.
3. Read back director context to confirm readiness changed.

## Scene To Beat Sheet To Storyboard Images

1. Read director context, preferably with a selected scene.
2. If no Production Lookbook exists, dispatch to `lookbook-designer` first unless the user explicitly wants text-only Beat work.
3. If no Storyboard Lookbook exists and storyboard images are requested or implied by a saved Beat Sheet revision, dispatch to `lookbook-designer` to create one unless the user explicitly asked for text-only/no-media work.
4. If the Storyboard Lookbook has a `lookbook.storyboard-sheet`, pass
   that exact candidate to `media-producer` as non-blocking guidance. Do not
   require a sheet before Scene Storyboard generation.
5. If no active Scene Beat Sheet exists or the user asks to revise Beats, dispatch to `scene-beat-designer`.
6. If storyboard images are missing or stale after the Beat Sheet pass, dispatch to `media-producer` with `scene.storyboard-sheet` unless the user explicitly asked for text-only/no-media work.
7. When the user wants cinematic coverage, dispatch the current Scene, Beat
   Sheet, and deliberately chosen visual context to `shot-planner`.
