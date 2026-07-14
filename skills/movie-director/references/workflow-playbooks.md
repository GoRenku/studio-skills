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
3. If the user wants new imagery, dispatch `cast.video-character-sheet` or `cast.profile` work to `media-producer`.
4. Read back director context to confirm readiness changed.

## Location Production Design Prompt

1. Dispatch Location facts and Location Design to `production-designer`.
2. If the user wants new imagery, dispatch `location.sheet` to `media-producer`.
3. Read back director context to confirm readiness changed.

## Scene To Shot List To Storyboard Images

1. Read director context, preferably with a selected scene.
2. If no selected Movie Lookbook exists, dispatch to `lookbook-designer` first unless the user explicitly wants text-only shot work.
3. If no selected Storyboard Lookbook exists and storyboard images are requested or implied by a saved shot-list revision, dispatch to `lookbook-designer` to create/select one unless the user explicitly asked for text-only/no-media work.
4. If the selected Storyboard Lookbook has a `lookbook.storyboard-sheet`, pass
   that exact candidate to `media-producer` as non-blocking guidance. Do not
   require a sheet before Scene Storyboard generation.
5. If no active Scene Shot List exists or the user asks to revise coverage, dispatch to `scene-shot-designer`.
6. If storyboard images are missing or stale after the shot-list pass, dispatch to `media-producer` with `scene.storyboard-sheet` unless the user explicitly asked for text-only/no-media work.

## Storyboard References To Shot Video Take

1. Confirm active shot list and storyboard readiness through `renku director context --json`.
2. Create or choose the Shot Video Take for the exact ordered shot ids. If the user says "this take", first read `renku studio current --json` and confirm the focused scene/take candidate before mutation or paid generation.
3. Dispatch Shot Video Take generation to `media-producer` with `take:<take-id>`. If the user asks for a "multi-shot storyboard", dense motion-control image, choreography sheet, or storyboard reference image for the take, treat that as agent-authored `video-prompt-sheet` guidance, not Scene Shot List storyboard work. The image remains opaque Studio media; panels, motion maps, captions, timing marks, or diagrams are agent-authored prompt strategies rather than Studio schema.
4. Have `media-producer` read `renku generation context --purpose shot.video-take --target take:<take-id> --json`, choose a current direct provider/model endpoint, and author one exact `GenerationSpec` from the user's intent and selected references.
5. When a storyboard reference image is included in the final request, require
   media-producer to report prompt-quality readiness separately from mechanical
   readiness before estimate/run.
6. Require `media-producer` to preview the exact request before estimate. A
   draft may use `renku generation preview show --file <generation-spec-json>
   --json`; after persistence, use `renku generation preview show --spec
   <spec-id> --json` so Core builds the provider preview for the saved
   `shot.video-take` request.
7. Keep generation behind the media-producer estimate review and explicit live provider approval.
