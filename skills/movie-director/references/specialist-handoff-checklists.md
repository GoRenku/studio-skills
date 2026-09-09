# Specialist Handoff Checklists

Previs handoff: exact Project/Scene/plan, relevant designs and sheet files, requested blocking/camera/performance and accepted constraints. AI handoff additionally names the reviewed revision/video and shared dialogue timing.

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
- the Core-produced Project generation settings when the handoff depends on
  import automation, image path, Preview, confirmation, or concurrency.

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
- every active supporting-material Asset for initial creation or an explicit
  source-driven revision. Do not forward the raw set beyond Screenplay
  authoring and do not revise an FDX-backed Screenplay from it;
- target optional Section, Scene, Cast Member, Location, or Prop ids;
- any active analysis critique that should drive revision.
- for FDX work, the absolute source path and confirmation that Screenplay
  status is empty or already FDX-backed;
- after import, exact candidate evidence and the identity questions that still
  require user judgment.

Verify:

```bash
renku screenplay status --json
renku screenplay show --json
```

For FDX import, also confirm the report's source hash/counts and that later fact
creation used focused specialist commands. Do not ask a
specialist to expose ScriptNotes. A valid changed source refreshes
automatically; do not ask for a diff, removal confirmation, or approval token.
Confirm the canonical Screenplay is a flat source-ordered Scene list even when
the FDX contains planning markers.

For scene revisions, inspect command output for Scene Beats revision impact.

## `screenplay-supporting-material-importer`

Use for:

- importing research, notes, documents, screenshots, or any other source file
  as opaque Project context;
- importing a changed source edition as another immutable Asset.

Pass:

- current Project name;
- each exact absolute source path;
- whether the user requested import only or an explicit description-enrichment
  pass after import.

Verify:

```bash
renku asset list --project <project-name> --owner project --type screenplay_supporting_material --limit 200 --json
```

Follow `nextCursor` with repeated `--cursor <nextCursor>` calls until it is
`null`; verification is incomplete until every page has been accumulated.

Do not require screenplay content or source ownership. Do not let the importer
author screenplay or facts, and do not send its raw paths or contents beyond
the subsequent screenplay/casting/production-design authoring passes.

## `screenplay-analyst`

Use for:

- critique;
- three-act/sequence/scene diagnosis;
- revision recommendations that should not mutate the screenplay directly.

Pass:

- current project;
- user-specified analysis focus;
- any known constraints, such as runtime, audience, or genre.
- the expectation that results appear in Studio under Analysis > Screenplay
  Analysis.

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
- for an explicit source-driven pass, the instruction to read the complete
  canonical Screenplay and every active supporting-material Asset. Do not copy
  those raw paths or contents into a later media handoff.

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
- for an explicit source-driven pass, the instruction to read the complete
  canonical Screenplay and every active supporting-material Asset. Do not copy
  those raw paths or contents into a later media handoff.

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

- scene-beat-designer supplies or revises the narrative-appropriate Scene
  Beats without a four-Beat cap or generation grouping.
- media-producer owns image operation routing. It uses
  `scene.storyboard-sheet` for new or materially recomposed Storyboard imagery,
  and `image.edit` when one exact existing Beat image must remain the canvas
  except for named changes. New Storyboard generation alone is partitioned into
  consecutive image batches of up to four.
- the current Storyboard Lookbook document and one exact usable
  `lookbook.storyboard-sheet` are required appearance inputs. Their absence
  blocks Scene Storyboard generation and routes to Lookbook Designer; never
  substitute Production Lookbook appearance.
- Media Producer's focused Scene Storyboard guide owns prompt synthesis,
  continuity reference roles, the Project image-path setting, and
  one-pass visual QA.
  Do not duplicate that recipe in the director handoff.

## `media-producer`

Use for:

- deterministic purpose/target generation briefings;
- conversational model and input-mode choice;
- provider-native request review and execution;
- media inspection;
- slicing composite outputs;
- supported focused media attachments.

Pass:

- for non-image work, the purpose key and exact target id from generation
  context;
- for Dialogue Audio, the exact Scene id and requested one-turn or whole-Scene
  scope. Media Producer shows the current workspace and keeps every turn as a
  separate ElevenLabs request/file/Take;
- for a video edit or continuation, the exact active source Asset and current
  video AssetFile. Media Producer uses `video.edit` only through a compatible
  live operation and preserves the source as a separate candidate;
- for image work, the user's requested relationship to any exact existing
  image, the intended focused destination, and the exact source Asset/File when
  already known. Media Producer decides the generation purpose before reading
  purpose context; do not make the prior purpose sticky;
- the exact purpose/target plus the user's provider/model direction, authored
  values, and exact references when already chosen; Media Producer reads the
  current Core context itself;
- Scene Beats revision id and Beat ids for Scene Storyboard imports;
- any upstream creative work the user explicitly chose to complete first;
- confirmation constraints;
- the Project generation settings, unless the user explicitly overrode the
  image path for this request;

Verify:

```bash
renku generation context --purpose <purpose-key> --target <target> --json
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

Confirmation gate:

- Follow the Project's current Preview and conversational confirmation policy.
  There is no estimate artifact or approval token.
- If the agent changes any part of a previewed request, show Preview again and
  obtain fresh conversational confirmation.
- Inspect generated media before importing it.

## Cast And Production Design Boundaries

Route Cast Member facts and designs to `casting-director`; route Location and
Prop facts and designs to `production-designer`. Use `screenplay-drafter` only
to bind those existing Project subjects into plain screenplay text through
focused Screenplay references. Use `media-producer` for supported visual media
and `scene-beat-designer` when Scene Beats need to change.

## External Export And Reviewed Update

For a detected Studio update, have the user export to the exact path displayed
by **External screenplay**: `<projectFolder>/screenplay/edit/script.fdx`.
Never write or overwrite a retained `screenplay_source` Asset. Studio detects
stable changed bytes and requires review plus **Update screenplay**; **Later**
leaves the accepted screenplay unchanged. Do not automatically run CLI import
to bypass that pending review. A user-explicit manual `import-fdx` request still
imports immediately and has no approval token.

Even a one-character dialogue edit can replace the whole Scene graph. Existing
Beats, Shot Plans, Shots, and audio remain in history attached to old Scene IDs;
do not promise continuity, infer replacements, or repair creative artifacts.
