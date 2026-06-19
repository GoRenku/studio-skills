# Workflow Playbooks

Use these playbooks when a user asks for an outcome rather than naming a single department. Always preserve explicit user choices and avoid paid generation until `media-producer` has produced an estimate and approval token.

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
2. If no active Lookbook exists, dispatch to `lookbook-designer` first unless the user explicitly wants text-only shot work.
3. If no active Scene Shot List exists or the user asks to revise coverage, dispatch to `scene-shot-designer`.
4. If storyboard images are missing, dispatch to `media-producer` with `scene.storyboard-sheet`.

## Storyboard References To Shot Video Take

1. Confirm active shot list and storyboard readiness through `renku director context --json`.
2. Create or choose the Shot Video Take for the exact ordered shot ids. If the user says "this take", first read `renku studio current --json` and confirm the focused scene/take candidate before mutation or paid generation.
3. Dispatch shot-video dependency planning to `media-producer` with the take id.
4. Use `renku generation preflight --purpose shot.video-take --target scene:<scene-id> --take <take-id> --json` before creating final specs.
5. Keep generation behind the media-producer estimate and approval token.
