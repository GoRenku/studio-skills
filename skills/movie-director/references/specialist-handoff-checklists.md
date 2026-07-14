# Specialist Handoff Checklists

Use these checklists before dispatching to a specialist skill and after the specialist completes work. Keep the handoff brief, concrete, and grounded in Renku ids.

## Universal Handoff

Pass:

- current project name and title;
- relevant Renku ids, not guessed names;
- user goal and explicit constraints;
- current director readiness blockers;
- any user-selected provider/model, authored value, exact reference, cost,
  asset, shot, or approval choices.

After completion, read back durable state through the CLI. Do not trust a specialist's prose summary alone when a Renku command can verify the result.

## `screenplay-drafter`

Use for:

- new screenplay drafts;
- screenplay revisions;
- scene rewrites.

Pass:

- project brief, format, runtime, genre, tone, and user boundaries;
- current screenplay status or relevant screenplay excerpt;
- target act, sequence, scene, cast member, or location ids;
- any active analysis critique that should drive revision.

Verify:

```bash
renku screenplay status --json
renku screenplay show --json
```

For scene revisions, inspect command output for shot-list impact.

## `screenplay-analyst`

Use for:

- critique;
- three-act/sequence/scene diagnosis;
- revision recommendations that should not mutate the screenplay directly.

Pass:

- current project;
- user-specified analysis focus;
- any known constraints, such as runtime, audience, or genre.

Verify:

```bash
renku screenplay analyze list --json
renku screenplay analyze show --active --json
```

## `inspiration-analyzer`

Use for:

- analyzing a Visual Language Inspiration folder;
- turning reference images into durable Inspiration Analysis JSON.

Pass:

- folder id;
- user focus, such as color, lighting, texture, camera, or composition;
- whether the analysis should compare against an existing Lookbook.

Verify:

```bash
renku inspiration analysis show --folder <folder-id> --json
```

## `lookbook-designer`

Use for:

- Movie Lookbook creation or revision;
- Storyboard Lookbook creation or revision;
- typed Lookbook selection;
- linking Inspiration source folders.

Pass:

- project story/tone context;
- relevant Inspiration Analysis ids or folder ids;
- existing selected Movie or Storyboard Lookbook id when revising;
- user visual preferences and exclusions.

Verify:

```bash
renku lookbook list --json
renku lookbook show --lookbook <lookbook-id> --json
```


## `casting-director`

Use for:

- Cast Member fact creation or revision;
- Cast Design creation or revision;
- costume continuity and scoped costume variants;
- voice casting notes;
- cast character-sheet/profile readiness.

Pass:

- cast member id when one exists;
- user casting goal and constraints;
- relevant scene or sequence ids for costume scope;
- whether the user wants media generation or only design writing.

Verify:

```bash
renku cast list --json
renku cast design show --active --cast <cast-member-id> --json
```

## `production-designer`

Use for:

- Location fact creation or revision;
- Location Design creation or revision;
- props, set dressing, atmosphere, and continuity risks.

Pass:

- location id;
- user production-design goal and constraints;
- selected Movie Lookbook state when known;
- whether the user wants media generation or only design writing.

Verify:

```bash
renku production-design location show --active --location <location-id> --json
```

## `scene-shot-designer`

Use for:

- Scene Shot List creation;
- shot-list revisions;
- coverage changes driven by scene rewrite, user direction, or visual-language changes.

Pass:

- scene id;
- selected Movie Lookbook state;
- relevant cast and location ids;
- screenplay critique or user direction;
- whether the user wants saved shot-list state or only brainstorming.

Verify:

```bash
renku screenplay shot-list show --active --scene <scene-id> --json
renku screenplay shot-list storyboard status --scene <scene-id> --shot-list <shot-list-id> --json
```

Storyboard media handoff:

- scene-shot-designer supplies or revises the Scene Shot List.
- media-producer owns `scene.storyboard-sheet` generation, inspection, slicing,
  and import. A selected Storyboard Lookbook's exact
  `lookbook.storyboard-sheet` is useful non-blocking guidance when available;
  its absence does not block generation.

## `media-producer`

Use for:

- all Renku media generation specs;
- model discovery;
- cost estimates;
- approved generation runs;
- media inspection;
- slicing composite outputs;
- supported focused media attachments.

Pass:

- purpose key;
- target id, using exact `take:<take-id>` for Shot Video Take generation;
- current generation context plus the user's provider/model choice, authored
  values, and exact references;
- shot-list id and shot ids when relevant;
- any upstream creative work the user explicitly chose to complete first;
- approval constraints;
- for Shot Video Takes with an included prompt-sheet reference, ask for both
  mechanical readiness and prompt-quality readiness before estimate/run.

Verify:

```bash
renku generation context --purpose <purpose-key> --target <target> --json
renku generation spec show --spec <spec-id> --json
renku generation estimate --spec <spec-id> --json
renku director context --json
```

Use the purpose-specific focused attachment command documented by
`media-producer`; attachment flags differ between single-file project-relative
sources and grouped Scene Storyboard JSON. For Shot Video Take storyboard
references, tell media-producer whether the user
wants realistic panels or hand-drawn/sketch panels. Realistic storyboard panels
should carry the look, location, lighting, and continuity themselves by default.
Hand-drawn/sketch storyboard panels should include available Lookbook, Location
Sheet, and Character Sheet references as supporting context by default, clearly
scoped as references only. For Codex-generated storyboard references, stage the
file under project `tmp/media/` and let `media-producer` include that exact path
as a `project-file` reference in the `shot.video-take` spec. Do not invent an
asset id, receipt, or attachment merely to use the file as generation guidance.

Approval gate:

- Never run a paid provider without a Renku estimate and explicit user approval.
- Treat estimates as pricing-only. Before a real provider-backed run, require
  explicit approval for the estimated cost or unknown-cost state and sending the
  preview-approved project-derived prompt/context to the selected provider. If
  the agent changes any part of that request, show the preview again, estimate
  again, and get a fresh live-run approval gesture.
- Inspect generated media before importing it.
- For prompt-sheet-guided final videos, confirm the prompt names provider
  tokens, treats the sheet as ordered temporal waypoints, forbids sheet
  artifacts, preserves hard constraints, and describes native audio timing as
  best-effort unless an exact-sync workflow is selected.

## Cast And Production Design Fallbacks

When the request is cast or production-design authoring:

1. Explain the first-class department gap plainly.
2. Split durable facts from generated media.
3. Use `screenplay-drafter` only for supported cast/location fact changes.
4. Use `media-producer` for cast/location visual media.
5. Use `scene-shot-designer` when shot coverage needs to change.

Do not create fake department JSON or sidecar files to fill the gap.
