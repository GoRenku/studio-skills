# Workflow Playbooks

Use these playbooks when a user asks for an outcome rather than naming a single
department. Always preserve explicit user choices. Media Producer reads the
current Project workflow policy and deterministic domain context itself; do not
recreate Project relationships, Preview, confirmation, or concurrency defaults
in this coordinator.

For Codex runs, remember that local Studio HTTP notification is network access. Before dispatching any specialist step that will mutate Renku state while Studio is running, make sure the mutating CLI command is run with sandbox/network permission. If `CLI026` appears, do not rerun non-idempotent mutations just to notify Studio.

## Idea To First Screenplay

1. Ask only for missing brief details that materially affect the screenplay.
2. If the user supplied supporting source files, dispatch their exact import to
   `screenplay-supporting-material-importer`. This step does not require an FDX
   or non-empty Screenplay.
3. If scenes need named Cast Members or Locations, dispatch those facts to
   `casting-director` and `production-designer` first. Their source-driven pass
   reads the complete Screenplay when one exists plus all active supporting
   material.
4. Dispatch screenplay drafting to `screenplay-drafter` using durable Cast
   Member and Location ids. The drafter also reads all active supporting
   material before initial screenplay creation.
5. Read back `renku screenplay status --json`.
6. Recommend screenplay analysis before visual production.

## Supporting Material To Durable Authoring

1. Dispatch every supplied file to `screenplay-supporting-material-importer`.
2. Stop after import unless the user also requested an initial or later
   enrichment pass. Import alone changes no creative facts.
3. For initial screenplay creation or an explicit source-driven revision,
   dispatch the source set to `screenplay-drafter`. Do not attempt this revision
   when the Screenplay is FDX-backed.
4. For enrichment, dispatch Cast descriptions and `CastMember.arc` to
   `casting-director`; dispatch Location and Prop descriptions to
   `production-designer`.
5. Each owning specialist reads `renku screenplay show --json`, all active
   `screenplay_supporting_material` Assets, and current durable facts before
   proposing focused updates.
6. After those updates, pass only the canonical Screenplay, durable facts, and
   designs downstream.
   Never include supporting-material paths or copied source content in analysis,
   media, sheet, Beat, Shot, Lookbook, storyboard, or generation handoffs.

## Final Draft FDX To Enriched Project

1. Read `renku director context --json` and retain
   `projectSettings.screenplayImport` for follow-up dispatch.
2. Confirm the current Screenplay is empty or already FDX-backed and dispatch
   the absolute `.fdx` path to `screenplay-drafter`. Never convert a populated
   Renku-authored Screenplay.
3. Read back the canonical Screenplay and import candidates. The deterministic
   importer stops here and returns evidence to this coordinator.
4. If `createContinuitySubjects` is enabled, compare candidate
   cues/headings/tags with existing Project facts, resolve ambiguity with the
   user, dispatch accepted facts to `casting-director` and
   `production-designer`. Never match by name alone, and do not dispatch
   Screenplay reference bindings for an FDX-backed Screenplay.
5. If `generateContinuityImages` is enabled, dispatch `cast.profile`,
   `location.hero`, or `prop.hero` only after each accepted subject is ready.
6. If `runScreenplayAnalysis` is enabled, dispatch `screenplay-analyst` after
   import and accepted bindings settle.
7. If `generateSceneBeats` is enabled, dispatch `scene-beat-designer` for
   each Scene after its required project context is ready.
8. If `generateBeatStoryboardImages` is enabled, dispatch
   new `scene.storyboard-sheet` work only for Scenes that already have an active
   Scene Beats revision. A later request to change an exact generated image is
   a new Media Producer operation decision, not automatic Storyboard
   regeneration.

Enabled stages continue without another “start this stage?” question after the
user requested import. Disabled stages are not proactively dispatched. Explicit
task direction may override a stage for the current request without changing
Project Settings. Analysis and continuity media may overlap after their own
prerequisites; storyboard work never starts before its Scene has an active
Scene Beats revision. A missing prerequisite stops only the dependent stage and is reported
clearly.

Treat `imported`, `refreshed`, and `unchanged` as the only FDX outcomes. Valid
changed sources are accepted automatically; never request a diff, removal
approval, or token. Confirm the result is a flat source-ordered Scene list.
Final Draft planning markers and outline lanes do not become Renku Acts or
Sequences and must not guide analysis membership. Never report ScriptNotes or
formatting as missing content, and never treat refresh as a merge or partial
overwrite.

## Cast Refinement Prompt

1. If this is a source-driven initial or refresh pass, make all active
   supporting material discoverable to `casting-director`; otherwise do not add
   it as incidental context.
2. Dispatch Cast Member fact and Cast Design work to `casting-director`.
3. Read back `renku cast design context --cast <cast-member-id> --json`.
4. If the user wants new imagery, dispatch `cast.character-sheet` or `cast.profile` work to `media-producer` using durable Cast context only.
5. Read back director context to confirm readiness changed.

## Location Production Design Prompt

1. If this is a source-driven initial or refresh pass, make all active
   supporting material discoverable to `production-designer`; otherwise do not
   add it as incidental context.
2. Dispatch Location facts and Location Design to `production-designer`.
3. If the user wants new imagery, dispatch `location.sheet` to `media-producer` using durable Location context only.
4. Read back director context to confirm readiness changed.

## Scene To Scene Beats To Storyboard Images

1. Read director context, preferably with a selected scene.
2. A Production Lookbook may inform finished-film and production-planning work,
   but it is not an appearance input for Beat Storyboards.
3. If no Storyboard Lookbook exists and Storyboard images are requested or
   implied by a saved Scene Beats revision, dispatch to `lookbook-designer` to
   create one unless the user explicitly asked for text-only/no-media work.
4. Require one exact usable `lookbook.storyboard-sheet` before Scene
   Storyboard generation. If it is missing, dispatch its preparation and
   acceptance; never substitute Production Lookbook styling or prose-only
   appearance guidance.
5. If no active Scene Beats exists or the user asks to revise Beats, dispatch to `scene-beat-designer`.
6. If Storyboard images are missing after the Scene Beats pass, dispatch to
   `media-producer` with the exact unchanged revision id, missing Beat ids, and
   `scene.storyboard-sheet`. Media Producer alone batches requested image work
   into groups of up to four.
7. If the user asks to change an existing Beat image, pass the exact image and
   requested preservation constraints to `media-producer`. Do not preselect
   `scene.storyboard-sheet`; Media Producer chooses between a new/recomposed
   candidate and `image.edit` for that turn.
8. When the user wants camera coverage or other production planning, dispatch
   the current Scene, Beat revision, and deliberately chosen visual context to
   `shot-planner`. Do not route story-visualization requests through Shot
   Planner or `shot.image`.
