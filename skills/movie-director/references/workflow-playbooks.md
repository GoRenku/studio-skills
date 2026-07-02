# Workflow Playbooks

Use these playbooks when a user asks for an outcome rather than naming a single department. Always preserve explicit user choices and avoid paid generation until `media-producer` has produced an estimate and approval token.

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
2. If the user wants new imagery, dispatch `location.environment-sheet` to `media-producer`.
3. Read back director context to confirm readiness changed.

## Scene To Shot List To Storyboard Images

1. Read director context, preferably with a selected scene.
2. If no selected Movie Lookbook exists, dispatch to `lookbook-designer` first unless the user explicitly wants text-only shot work.
3. If no selected Storyboard Lookbook exists and storyboard images are requested or implied by a saved shot-list revision, dispatch to `lookbook-designer` to create/select one unless the user explicitly asked for text-only/no-media work.
4. If the selected Storyboard Lookbook has no `lookbook.sheet`, dispatch to `media-producer` for `lookbook.sheet` before final scene storyboard generation.
5. If no active Scene Shot List exists or the user asks to revise coverage, dispatch to `scene-shot-designer`.
6. If storyboard images are missing or stale after the shot-list pass, dispatch to `media-producer` with `scene.storyboard-sheet` unless the user explicitly asked for text-only/no-media work.

## Storyboard References To Shot Video Take

1. Confirm active shot list and storyboard readiness through `renku director context --json`.
2. Create or choose the Shot Video Take for the exact ordered shot ids. If the user says "this take", first read `renku studio current --json` and confirm the focused scene/take candidate before mutation or paid generation.
3. Dispatch shot-video dependency planning to `media-producer` with the take id. If the user asks for a "multi-shot storyboard" for the take, treat that as `shot.video-prompt-sheet`, not scene shot-list storyboard work.
4. Use `renku take authoring context --take <take-id> --json`, then have `media-producer` validate and apply a `sceneShotVideoTakeAuthoring` document before creating final specs.
5. When a selected video prompt sheet is part of the final route, require
   media-producer to report prompt-quality readiness separately from mechanical
   readiness before estimate/run.
6. Keep generation behind the media-producer estimate and approval token.
7. When regenerating from a take that already has a final video, keep the source
   take intact. Final `shot.video-take` import creates a copied regeneration
   take with the same shot order and production settings, then attaches the new
   video to that copied take.
