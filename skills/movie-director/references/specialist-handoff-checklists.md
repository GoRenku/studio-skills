# Specialist Handoff Checklists

Use these checklists before dispatching to a specialist skill and after the specialist completes work. Keep the handoff brief, concrete, and grounded in Renku ids.

## Universal Handoff

Pass:

- current project name and title;
- relevant Renku ids, not guessed names;
- resolved production scene number and its durable `sceneId` when the user
  addressed the work as `Scene 22` or `22A`;
- user goal and explicit constraints;
- current director readiness blockers;
- any user-selected provider/model, authored value, exact reference, cost,
  asset, shot, or approval choices.
- the Core-produced `projectSettings` or Generation Context `workflowPolicy`
  when the handoff depends on import automation or generation workflow policy.

After completion, read back durable state through the CLI. Do not trust a specialist's prose summary alone when a Renku command can verify the result.

Resolve a production scene reference before dispatch:

```bash
renku screenplay scene-number resolve --number <production-number> --json
```

Persist only the durable `sceneId` in screenplay, analysis, Cast Design, Beat
Sheet, and generation JSON.

## `screenplay-drafter`

Use for:

- new screenplay drafts;
- screenplay revisions;
- scene rewrites.

Pass:

- direct Project brief fields, format, runtime, genre, tones, and user boundaries;
- current screenplay status or relevant screenplay excerpt;
- target optional Section, Scene, Cast Member, Location, or Prop ids;
- any active analysis critique that should drive revision.
- for FDX work, the absolute source path and confirmation that Screenplay
  status is empty;
- after import, exact candidate evidence and the identity questions that still
  require user judgment.

Verify:

```bash
renku screenplay status --json
renku screenplay show --json
```

For FDX import, also confirm the report's source hash/counts and that later fact
creation/binding used focused specialist and Screenplay commands. Do not ask a
specialist to expose ScriptNotes or to re-import over existing provenance.

For scene revisions, inspect command output for Scene Beats revision impact.

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

- Production Lookbook creation or revision;
- Storyboard Lookbook creation or revision;
- linking Inspiration source folders.

Pass:

- project story/tone context;
- relevant Inspiration Analysis ids or folder ids;
- the existing Lookbook id for the requested role when revising;
- user visual preferences and exclusions.

Verify:

```bash
renku lookbook show --kind production --json
renku lookbook show --kind storyboard --json
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
- relevant Scene ids for costume scope;
- whether the user wants media generation or only design writing.
- imported cue candidates and their Dialogue Turn ids when casting follows an
  FDX import; preserve ambiguity for user confirmation.

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
- durable Prop id and active Prop Design when the object needs independent
  continuity media.

Pass:

- location id;
- user production-design goal and constraints;
- Production Lookbook state when known;
- whether the user wants media generation or only design writing.
- imported Scene-heading/tag/text evidence when production design follows an
  FDX import; do not treat evidence as an already-authored fact.

Verify:

```bash
renku production-design location show --active --location <location-id> --json
renku production-design prop show --active --prop <prop-id> --json
```

## `scene-beat-designer`

Use for:

- Scene Beats creation;
- focused Scene Beats revisions and explicit full resets;
- narrative Beat changes driven by scene rewrite, user direction, or visual-language changes.

Pass:

- scene id;
- Production Lookbook state;
- relevant Cast Member, Location, and Prop ids plus stable Screenplay Block ids;
- screenplay critique or user direction;
- whether the user wants brainstorming, first creation, focused revision, full
  reset, or restoration through active-revision selection.

Verify:

```bash
renku screenplay beats show --active --scene <scene-id> --json
renku screenplay beats storyboard status --scene <scene-id> --revision <revision-id> --json
```

Storyboard media handoff:

- scene-beat-designer supplies or revises the Scene Beats.
- media-producer owns `scene.storyboard-sheet` generation, inspection, slicing,
  and import. The project Storyboard Lookbook's exact
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
- exact target id from generation context;
- current generation context plus the user's provider/model choice, authored
  values, and exact references;
- Scene Beats revision id and Beat ids for Scene Storyboard imports;
- any upstream creative work the user explicitly chose to complete first;
- approval constraints;
- the exact Generation Context `workflowPolicy`, unless the user explicitly
  overrode a path or workflow choice for this request;

Verify:

```bash
renku generation context --purpose <purpose-key> --target <target> --json
renku generation spec show --spec <spec-id> --json
renku generation estimate --spec <spec-id> --json
renku director context --json
```

## `shot-planner`

Use for Scene Shot Plans, individual Shot writing and order, Beat coverage, and
selected-image coordination.

Pass the exact Scene id, optional selected Shot Plan/Shot ids, current active
Scene Beats revision, relevant Cast Member/Location/Prop/Lookbook ids, stable Screenplay
Block ids, and user constraints.

Verify:

```bash
renku shot-plan list --scene <scene-id> --json
renku shot-plan show --shot-plan <shot-plan-id> --json
```

Use the purpose-specific focused attachment command documented by
`media-producer`; attachment flags differ between single-file project-relative
sources and grouped Scene Storyboard JSON.

Approval gate:

- Never run a Renku-managed paid provider without a Renku estimate and explicit
  user approval. Do not apply this approval gate to Codex built-in image
  generation.
- Treat estimates as pricing-only. Before a real Renku-managed provider run, require
  explicit approval for the estimated cost or unknown-cost state and sending the
  preview-approved project-derived prompt/context to the selected provider. If
  the agent changes any part of that request, show the preview again, estimate
  again, and get a fresh live-run approval gesture.
- Inspect generated media before importing it.

## Cast And Production Design Boundaries

Route Cast Member facts and designs to `casting-director`; route Location and
Prop facts and designs to `production-designer`. Use `screenplay-drafter` only
to bind those existing Project subjects into plain screenplay text through
focused Screenplay references. Use `media-producer` for supported visual media
and `scene-beat-designer` when Scene Beats need to change.
