# Active Media Producer Forward-Test Cases

Use these cases after substantial Media Producer changes. Give each raw task to
a fresh agent with the skill path and a separate disposable project copy. Do
not give the agent the pass criteria. Inspect its command trace, authored JSON,
preview, and attachment commands—not only its prose answer.

Never allow a forward test to make a paid provider call or mutate the user's
real project.

## Cannon Prop Sheet With Explicit Continuity Choice

Raw task:

> Prepare a new Prop Sheet request for the cannon. There are two prior sheets;
> use the one whose wear state matches the current Prop Design. Show Preview
> and stop before paid generation.

Pass criteria:

- resolves the exact Prop id and reads `prop.sheet` context;
- inspects both same-Prop candidates and selects by visual/design evidence,
  never list order;
- preserves the exact `prop/prop-sheet` placement;
- saves and shows Preview before estimate or generation;
- does not globally select a Prop Sheet or automatically promote output.

## Helmet Prop Hero Without Automatic Promotion

Raw task:

> Prepare a compact Hero image for the ceremonial helmet from its approved
> Prop Sheet. Let me review the request, but do not make it the current Hero
> yet.

Pass criteria:

- uses `prop.hero` targeting the exact helmet Prop;
- explicitly selects and inspects the approved Prop Sheet reference;
- stops at saved Preview;
- does not import with `--select`, mutate canonical selection, or reparent
  existing media.

## Shot Plan Video Continuation

Raw task:

> Use this Shot Plan to prepare another video attempt. The last provider run
> failed after submission. Keep the request the same for a retry, show me the
> saved request, and stop before another paid call.

Pass criteria:

- uses `shot-plan.video-generation` with target `project` and an explicit
  input mode;
- preserves `authoredFrom: { kind: "shotPlan", id }` only as information;
- retries the exact frozen Spec supplied by the user rather than copying or
  reauthoring it;
- does not attach output to, freeze, snapshot, or reconstruct the Shot Plan;
- stops before a paid call.

## Context-Driven Location Sheet

Raw task:

> Create a Location Sheet for the Sea Walls, show me the provider preview, and
> stop before paid generation. The board should be a wide production reference
> for siege planning.

Pass criteria:

- starts with `generation context --purpose location.sheet --target
  location:<id> --json`;
- chooses a current endpoint and authored setting values from the returned
  context/model descriptors rather than a skill-owned provider map;
- authors a `GenerationSpec` whose prompt and chosen aspect ratio agree;
- runs `generation validate --file ... --json` and `generation preview show
  --file ... --json`;
- does not estimate recursively, fabricate references, persist media, or run
  paid generation.

## Storyboard Lookbook Sheet, Scene Sheet, Split, And Import

Raw task:

> Create the missing Storyboard Lookbook Sheet for the project Storyboard
> Lookbook. Then use it to create storyboard images for these four saved Beats
> in the current Scene Beat Sheet. Review and split the generated sheet, import
> the four crops, and do not run anything without my generation approval.

Pass criteria:

- uses `lookbook.storyboard-sheet`, never `lookbook.video-sheet`, for the
  storyboard visual-language asset;
- attaches the approved Lookbook output with focused `media import --purpose
  lookbook.storyboard-sheet`;
- reads `scene.storyboard-sheet` context and preserves the returned
  `visual-language` / `storyboard-lookbook-sheet` placement;
- assigns the exact Storyboard Lookbook Sheet to an actual image media field
  such as `image_urls` for the selected edit endpoint;
- treats the Scene Storyboard sheet as a fixed 4:3, high-quality composite and
  uses agent vision to review the whole sheet and each crop;
- keeps the grouped attachment document kind exactly
  `sceneStoryboardImagesImport` with `"select": true` and calls `media import --purpose
  scene.storyboard-sheet --target scene:<id> --beat-sheet <id> --file <json>
  --json`;
- never invents panel schemas, asset ids, receipts, or a generic import path.

## Seven-Beat Storyboard Continuity And Combined Preview

Raw task:

> Prepare storyboard sheets for all seven saved Beats in this Scene. Keep the
> Cast and Harbor Quarter visually continuous, show both requests together,
> and stop before any paid generation.

Pass criteria:

- reads the exact Scene Beat Sheet context and active Beat Sheet before
  batching;
- reads `scene.storyboard-sheet` generation context and uses
  `facts.contextText` as opaque authored narrative rather than inventing a
  parallel historical or Storyboard facts contract;
- creates two ordinary specs in Beat Sheet order, covering Beats 1-4 and 5-7;
- identifies the Cast Members and Locations relevant to each subset from the
  Beat Sheet, inspects every chosen visual reference, and includes only the
  relevant exact Storyboard Lookbook, Cast, and Location files;
- assigns every included Renku reference to an actual returned provider media
  field, or passes every accepted Codex ImageGen reference through
  `referenced_image_paths`;
- stops for explicit user direction if a needed continuity selection is empty
  or unsuitable instead of substituting the first candidate;
- validates both specs before calling `generation preview show` once with two
  repeated `--file` values in order;
- sends exactly one Preview command and never falls back to one Preview command
  per file or spec when the combined delivery fails;
- reports a failed combined Preview handoff and stops before estimating or
  asking for paid execution approval;
- treats the two specs as independent estimates, approvals, runs, outputs, and
  attachments and makes no paid call.

## External File Without Synthetic Provenance

Raw task:

> Use `tmp/media/external-elise-reference.png` as an additional appearance
> reference in this generation request. It came from outside Renku. Show the
> preview and do not pretend it was generated or imported by Renku.

Pass criteria:

- first verifies the normalized project-relative file is available and safe;
- uses an exact `project-file` reference with `placement.kind` set to
  `additional`;
- selects a reference-capable endpoint and assigns the file to its returned
  provider media field;
- does not fabricate a generation receipt, provenance record, asset id, asset
  file id, or unsupported generic attachment;
- validates and previews the request without a paid call.

## Codex Frozen Source Request

Raw task:

> Use Codex built-in image generation to create a polished 16:9 Location Sheet,
> let me review the exact request, then generate and attach the accepted image.

Pass criteria:

- authors an `agent-external` GenerationSpec whose `values` contains exactly one
  field, `prompt`;
- keeps `16:9` and every other reviewed composition, quality, format, and
  creative requirement inside that exact prompt;
- stores chosen images as logical `references`, not extra `values` fields;
- follows create/update, Preview, show, freeze, Codex generation, and focused
  attachment in that order, without asking for separate generation approval;
- passes the frozen record's `spec.values.prompt` to Codex unchanged;
- attaches with the frozen spec id as `--source-spec` and never invents an
  external GenerationRun, receipt, estimate, or approval token.

## Lookbook Image Import Then Placement

Raw task:

> Import `tmp/media/external-hallway.png` into this Lookbook under Thesis and
> beside the specified Texture point. It is an external image, not a Renku
> generation output.

Pass criteria:

- imports with `renku media import --purpose lookbook.image --target
  lookbook:<id> --source tmp/media/external-hallway.png --title ... --json`
  and omits `--receipt`;
- does not pass ignored `--sections` or `--anchor` flags to `media import`;
- reads the successful import response's `ownerRecord.id`;
- places that exact returned id with `renku lookbook image set-placement
  --image <ownerRecord.id> --sections thesis,texture --anchor <point-id>
  --json`;
- does not guess the Lookbook Image id or mutate project files directly.

## Selection Scope And Call Economy

Raw task:

> Accept this new Cast Profile and Shot image as the current choices, keep
> these Character and Location Sheets available for two different generation
> requests, and import this four-Beat storyboard as the current storyboard.

Pass criteria:

- imports the accepted Profile and Shot Image with `--select` in their
  respective import calls and does not issue a second selection command;
- writes `"select": true` once in the grouped Storyboard import and does not
  issue one mutation per Beat;
- keeps Character Sheet and Location Sheet choices only as exact AssetFile
  references in each consuming GenerationSpec;
- permits the two GenerationSpecs to choose different sheet candidates;
- does not call `renku asset select` for Character Sheets, Location Sheets,
  Lookbook Sheets, or Dialogue Audio Takes;
- uses `renku asset select` only when the user chooses an already imported
  canonical candidate.
