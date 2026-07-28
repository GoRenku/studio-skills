# Workflow Playbooks

Use these playbooks when a user asks for an outcome rather than naming a single department. Always preserve explicit user choices and avoid paid generation until `media-producer` has produced an estimate and collected explicit live provider approval.

For Codex runs, remember that local Studio HTTP notification is network access. Before dispatching any specialist step that will mutate Renku state while Studio is running, make sure the mutating CLI command is run with sandbox/network permission. If `CLI026` appears, do not rerun non-idempotent mutations just to notify Studio.

## Idea To First Screenplay

1. Ask only for missing brief details that materially affect the screenplay.
2. If scenes need named Cast Members or Locations, dispatch those facts to `casting-director` and `production-designer` first.
3. Dispatch screenplay drafting to `screenplay-drafter` using durable Cast Member and Location ids.
4. Read back `renku screenplay status --json`.
5. Recommend screenplay analysis before visual production.

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
