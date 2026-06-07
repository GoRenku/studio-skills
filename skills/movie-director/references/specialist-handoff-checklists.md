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
- scene rewrites;
- current fallback for cast fact mutations;
- current fallback for location fact mutations.

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

- Lookbook creation;
- Lookbook revision;
- Lookbook activation;
- linking Inspiration source folders.

Pass:

- project story/tone context;
- relevant Inspiration Analysis ids or folder ids;
- existing active Lookbook id when revising;
- user visual preferences and exclusions.

Verify:

```bash
renku lookbook list --json
renku lookbook show --lookbook <lookbook-id> --json
```

## `scene-shot-designer`

Use for:

- Scene Shot List creation;
- shot-list revisions;
- coverage changes driven by staging, blocking, scene rewrite, or visual-language changes.

Pass:

- scene id;
- active Lookbook state;
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
- media-producer owns `scene.storyboard-sheet` generation, inspection, slicing, and import.

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
5. Use `scene-shot-designer` when staging changes affect shot coverage.

Do not create fake department JSON or sidecar files to fill the gap.
