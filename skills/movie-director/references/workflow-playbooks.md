# Workflow Playbooks

Use these playbooks when a user asks for an outcome rather than naming a single department. Always preserve explicit user choices and avoid paid generation until `media-producer` has produced an estimate and approval token.

## Idea To First Screenplay

User shape:

```text
I have an idea for a short film. Help me make it into a movie.
```

Steps:

1. Ask only for missing brief details that materially affect the screenplay.
2. Dispatch screenplay drafting to `screenplay-drafter`.
3. Read back screenplay status:

```bash
renku screenplay status --json
```

4. Recommend `screenplay-analyst` for critique before visual production.
5. Recommend Inspiration and Lookbook work before cast/location/shot media.

## Screenplay Critique To Revision

Steps:

1. Read current director context:

```bash
renku director context --json
```

2. If no screenplay exists, dispatch to `screenplay-drafter`.
3. If no active analysis exists, dispatch to `screenplay-analyst`.
4. For revisions, send the analysis findings and target scene/sequence ids to `screenplay-drafter`.
5. Read back screenplay status and any shot-list impact reported by the CLI.

## References To Active Lookbook

Steps:

1. List Inspiration folders:

```bash
renku inspiration list --json
```

2. Dispatch folder analysis to `inspiration-analyzer` when references are unanalyzed.
3. Dispatch Lookbook creation or revision to `lookbook-designer`.
4. Activate the Lookbook through the Lookbook workflow.
5. Read back:

```bash
renku lookbook list --json
```

## Cast Member To Character Sheet And Profile

Steps:

1. Confirm the cast member exists:

```bash
renku screenplay cast list --json
```

2. If cast facts must change, explain that cast authoring currently uses the screenplay fallback and dispatch to `screenplay-drafter`.
3. Dispatch visual generation to `media-producer` with `cast.character-sheet`.
4. After a selected character sheet exists, dispatch `cast.profile` if the user wants profile images or edit-based continuity.
5. Read back director context and confirm the cast readiness changed.

## Location To Environment Sheet And Selected Views

Steps:

1. Confirm the location exists:

```bash
renku screenplay location list --json
```

2. If location facts must change, explain that location authoring currently uses the screenplay fallback and dispatch to `screenplay-drafter`.
3. Confirm an active Lookbook exists.
4. Dispatch `location.environment-sheet` generation to `media-producer`.
5. Ensure media-producer inspects the composite, slices the four views, and imports only usable views.
6. Read back director context and confirm the production-design readiness changed.

## Scene To Shot List To Storyboard Images

Steps:

1. Read director context, preferably with a selected scene:

```bash
renku director context --json
```

2. If no active Lookbook exists, dispatch to `lookbook-designer` first unless the user explicitly wants text-only shot work.
3. If no active Scene Shot List exists, dispatch to `scene-shot-designer`.
4. If storyboard images are missing, dispatch to `media-producer` with `scene.storyboard-sheet`.
5. Read back:

```bash
renku screenplay shot-list storyboard status --scene <scene-id> --shot-list <shot-list-id> --json
```

## Storyboard References To Shot Video Take

Steps:

1. Confirm active shot list and storyboard readiness through `renku director context --json`.
2. Dispatch shot-video dependency planning to `media-producer`.
3. Use `renku generation preflight --purpose shot.video-take ... --json` before creating final specs.
4. Keep generation behind the media-producer estimate and approval token.
5. Inspect generated video takes before import or selection.

## Scene Rewrite To Updated Shots

Steps:

1. Dispatch the rewrite to `screenplay-drafter`.
2. Read the screenplay command report for shot-list impact.
3. Dispatch affected Scene Shot List revisions to `scene-shot-designer`.
4. Treat stale storyboard images as media dependencies and dispatch missing or stale storyboard work to `media-producer`.
5. Do not preserve old shot-list assumptions when the screenplay scene changed materially.

## Cast Refinement Prompt

User shape:

```text
Make Ada feel more severe, older, and less polished. Update the character sheet.
```

Current behavior:

1. Separate durable cast facts from generated visual media.
2. Explain that cast authoring is not first-class yet.
3. Use `screenplay-drafter` for cast fact changes.
4. Use `media-producer` for the character-sheet update.
5. Read back director context to confirm selected cast media is present.

## Location And Staging Prompt

User shape:

```text
The control room should feel cramped and ceremonial. Stage it for a tense two-person confrontation.
```

Current behavior:

1. Separate location description from scene staging and shot coverage.
2. Use `screenplay-drafter` only for durable location or scene text changes.
3. Use `media-producer` for environment-sheet media when the location exists and the Lookbook is active.
4. Use `scene-shot-designer` when staging changes affect coverage or blocking.
5. Explain that durable staging documents are not first-class yet.
