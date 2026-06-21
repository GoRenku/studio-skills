# Specialist Handoff Checklists

Use these checklists before dispatching to a specialist skill and after the specialist completes work. Keep the handoff brief, concrete, and grounded in Renku ids.

## Universal Handoff

Pass:

- current project name and title;
- relevant Renku ids, not guessed names;
- user goal and explicit constraints;
- current director readiness blockers;
- any user-selected model, cost, asset, shot, input mode, or approval choices.

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
- media-producer owns selected Storyboard Lookbook sheet readiness, `scene.storyboard-sheet` generation, inspection, slicing, and import.

## `media-producer`

Use for:

- all Renku media generation specs;
- model discovery;
- cost estimates;
- approved generation runs;
- media inspection;
- slicing composite outputs;
- media imports and selections.

Pass:

- purpose key;
- target id;
- exact user-selected generation controls;
- shot-list id and shot ids when relevant;
- dependency order from director context;
- approval constraints.

Verify:

```bash
renku generation context --purpose <purpose-key> --target <target> --json
renku generation spec show --spec <spec-id> --json
renku generation estimate --spec <spec-id> --json
renku director context --json
```

Use the purpose-specific `renku media import ...` command documented by `media-producer`; import flags differ between single-file sources and grouped import JSON.

Approval gate:

- Never run a paid provider without a Renku estimate and explicit user approval.
- Treat approval tokens as binding to the estimated spec and provider context.
- Inspect generated media before importing it.

## Cast And Production Design Fallbacks

When the request is cast or production-design authoring:

1. Explain the first-class department gap plainly.
2. Split durable facts from generated media.
3. Use `screenplay-drafter` only for supported cast/location fact changes.
4. Use `media-producer` for cast/location visual media.
5. Use `scene-shot-designer` when shot coverage needs to change.

Do not create fake department JSON or sidecar files to fill the gap.
