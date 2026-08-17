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
- runs `generation validate --file tmp/specs/generation-spec.json --json` and
  `generation preview show --file tmp/specs/generation-spec.json --json`;
- does not estimate recursively, fabricate references, persist media, or run
  paid generation.

## Storyboard Lookbook Sheet, Scene Sheet, Split, And Import

Raw task:

> Create the missing Storyboard Lookbook Sheet for the project Storyboard
> Lookbook. Then use it to create storyboard images for these four saved Beats
> in the current Scene Beats. Review and split the generated sheet, import
> the four crops, and do not run anything without my generation approval.

Pass criteria:

- uses `lookbook.storyboard-sheet`, never `lookbook.video-sheet`, for the
  storyboard visual-language asset;
- attaches the approved Lookbook output with focused `media import --purpose
  lookbook.storyboard-sheet`;
- reads `scene.storyboard-sheet` context and preserves the returned
  `visual-language` / `storyboard-lookbook-sheet` placement;
- follows the default Codex setting, keeps the exact Storyboard Lookbook Sheet
  as a logical reference without `providerField`, and passes it through
  `referenced_image_paths`; uses `image_urls` only if the user turns Codex off
  or explicitly selects Renku;
- uses a model-supported composite canvas, places the four complete
  Project-ratio panels in a fixed two-by-two grid region, and uses agent vision
  to review the whole sheet and each crop without adding a geometry rejection
  gate;
- keeps the grouped attachment document on the exact current contract with
  `sceneBeatsRevisionId` and `"select": true`, and calls `media import --purpose
  scene.storyboard-sheet --target scene:<id> --revision <id> --file
  tmp/operations/scene-storyboard-import.json
  --json`;
- never invents panel schemas, asset ids, receipts, or a generic import path.

## Seven-Beat Storyboard Continuity And Combined Preview

Raw task:

> Prepare storyboard sheets for all seven saved Beats in this Scene. Keep the
> Cast and Harbor Quarter visually continuous, show both requests together,
> and stop before any paid generation.

Pass criteria:

- reads the exact Scene Beats revision named by the handoff before batching;
- passes that same revision id through Storyboard status and import, and never
  moves or flattens Core-owned Scene-local iteration folders;
- reads `scene.storyboard-sheet` generation context and uses
  `facts.contextText` as opaque authored narrative rather than inventing a
  parallel historical or Storyboard facts contract;
- creates two ordinary specs in Scene Beats revision order, covering Beats 1-4 and 5-7;
- gives the three-Beat request a fixed two-by-two Project-ratio grid region,
  places its Panels 1 and 2 across the upper row and Panel 3 lower-left, leaves
  the lower-right cell area as plain sheet background, and does not enlarge the
  occupied panels or invent filler;
- identifies the Cast Members, Locations, and Props relevant to each subset
  from the Scene Beats revision, inspects every chosen visual reference, and
  includes only the relevant exact Storyboard Lookbook, Character, Location,
  and Prop files;
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
- follows create/update, the Project Preview setting, show, freeze,
  Codex generation, and focused attachment in that order;
- asks for conversational confirmation only when the Project's Codex
  confirmation setting is on;
- passes the frozen record's `spec.values.prompt` to Codex unchanged;
- attaches with the frozen spec id as `--source-spec` and never invents an
  external GenerationRun, receipt, estimate, or approval token.

## Project Setting, Explicit Override, And Unavailable Codex

Run three image requests: the default setting selects Codex, explicit user
direction selects Renku, and Codex is selected while the harness lacks
`codex.gpt-image-2`.

Pass criteria:

- reads the Project's **Use Codex for image generation** setting before
  choosing an unselected path;
- follows explicit direction before saved-spec path and the Project setting;
- preserves an already-authored saved-spec path when no explicit override is
  given;
- asks for a path when Codex capability is unavailable and never silently
  falls back to a paid Renku run.

## Preview And Confirmation Settings

Use a Project with automatic Preview off and Renku conversational confirmation
off. First ask for normal generation, then explicitly ask to see Preview.

Pass criteria:

- does not open Preview automatically on the first request;
- opens the saved Preview for the explicit request even though its setting is
  off;
- validates and estimates the exact Renku spec, then passes the returned token
  unchanged without adding the disabled conversational pause;
- still inspects output and requires attachment intent.

## Effective Concurrency Limits

Prepare several independent Renku and Codex image requests with different
concurrency limits and with concurrency disabled for one execution method.

Pass criteria:

- overlaps no more requests than each execution method's `concurrencyLimit`;
- treats a disabled method's effective limit of `1` as sequential without
  rewriting the stored maximum;
- keeps each spec, Preview decision, estimate/token or freeze, execution,
  inspection, and attachment independent;
- never overlaps dependent requests or invents a durable queue/scheduler.

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

## Storyboard Lookbook Style-Locked Continuation

Raw task:

> The Storyboard Lookbook already has two accepted clean line-drawing examples.
> Prepare a Value and Accent example that matches them, show Preview, and stop
> before generation. If one of the accepted images already proves the rule,
> tell me instead of generating filler.

Pass criteria:

- reads the exact Storyboard Lookbook, its existing image placements, and
  `lookbook.image` Generation Context;
- treats `valueAndAccent` as a property of the established drawing system, not
  as permission to introduce a grayscale painting, wash, hatching, roughness,
  modeled lighting, or a new finish;
- first checks whether an accepted image can be placed in `valueAndAccent`
  without another generation;
- does not automatically add the canonical `styleBrief` image to
  `valueAndAccent`, and does not retain that broad placement after a dedicated
  Value and Accent example is accepted;
- when generation remains useful, inspects the same-Lookbook candidates and
  deliberately selects an accepted image in the `visual-language` /
  `lookbook-style-reference` slot as the visible style anchor;
- assigns the exact file to a real provider media field with `promptMention`,
  or passes it to Codex ImageGen through `referenced_image_paths`;
- makes the prompt preserve the anchor's medium, line quality, finish,
  simplification, and tonal restraint while changing only value allocation and
  subject matter;
- shows the saved Preview and stops before generation;
- never uses a Production Lookbook Sheet as the Storyboard style anchor and
  never claims visual continuity from prose alone.

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

## Lookbook-Only Appearance With Realistic And Stylized Roles

Raw task:

> Prepare one Scene Storyboard request for this batch. First use the project's
> realistic Storyboard Lookbook, then explain how the request would differ if
> the active Storyboard Lookbook were the coarse hand-drawn one. The Character,
> Location, and Prop sheets are realistic production references.

Pass criteria:

- reads the complete current Storyboard Lookbook and inspects one exact
  Storyboard Lookbook Sheet before either request;
- derives realism only from the realistic Lookbook and introduces no generic
  graphite, warmth, monochrome, drawing, or Production Lookbook styling;
- for the coarse hand-drawn Lookbook, preserves canonical Character
  identity/costume, Location geography, and Prop construction/state while
  explicitly rejecting photographic lighting, finish, and realism leakage;
- permits style-driven simplification while keeping each subject unmistakable;
- assigns the Lookbook, Character, Location, and Prop references distinct
  prompt-visible roles; and
- stops rather than substituting a Production Lookbook when the exact
  Storyboard Lookbook Sheet is unavailable.

## Ten Authored Beats Become Three Image Requests

Raw task:

> The Scene's accepted revision has ten Beats. Prepare Storyboard images for
> all of them without changing the Beat design.

Pass criteria:

- rereads the exact saved revision and leaves all ten Beat ids, order, and
  creative fields unchanged;
- creates three independent requests covering Beats 1–4, 5–8, and 9–10;
- gives the two-Beat remainder a fixed two-by-two Project-ratio grid region,
  places its Panels 1 and 2 upper-left and upper-right, and fills the lower row
  with two visibly bounded, low-detail layout placeholder cells containing only
  sparse neutral construction marks;
- gives the placeholders no people, Locations, Props, objects, text, labels,
  captions, or narrative imagery, and explicitly prohibits two full-width
  stacked strips or enlarging the Beat panels into the placeholder cells;
- treats the placeholders as disposable layout scaffolding rather than Beats:
  it assigns them no Beat ids and never crops, imports, or persists them;
- does not invent filler Beats or duplicate Beat content;
- uses one output composite per request rather than four output variants;
- reuses deliberate continuity references across batches while filtering
  exact Cast Member, Location, and Prop ids to each batch; and
- does not describe four as a Scene Beat authoring cap or preferred count.

## One Authored Beat Uses The Full Canvas

Raw task:

> Prepare and generate the Storyboard image for this one selected saved Beat.

Pass criteria:

- creates one request for the exact selected Beat without changing its authored
  content or adding another Beat;
- asks for one complete Project-ratio Beat image using the full output canvas,
  with no grid, empty cells, or layout placeholders;
- inspects and imports the complete accepted generated image rather than
  inventing a panel crop; and
- keeps the ordinary exact Storyboard Lookbook and continuity-reference rules.

## Prompt Synthesis With Prop Interaction

Raw task:

> Storyboard four saved Beats with two Characters, one Location, and the
> bronze seal. The final Beat's narrative purpose is "private intent becomes
> public consequence."

Pass criteria:

- gathers the exact Scene, revision, Beat fields, Storyboard Lookbook, and
  visually inspected subject sheets;
- converts narrative development and purpose into visible panel action instead
  of pasting `facts.contextText`, Beat JSON, or the abstract purpose sentence;
- specifies subject scale, placement, pose, gaze, action, Location geography,
  and the seal's holder, scale, state, placement, and interaction;
- uses stable sections for artifact, reference roles, Panels 1–4, continuity,
  Lookbook-derived appearance, layout, and exclusions; and
- treats panel framing as provisional story communication rather than durable
  production Shot coverage.

## Codex Default And Setting-Off Renku Request

Raw task:

> Prepare this four-Beat Storyboard using the Project's image-generation
> setting, show the exact request, but do not generate.

Pass criteria:

- uses the Project's **Use Codex for image generation** setting, which is on by
  default, while honoring an explicit request choice or an already saved path;
- when Codex is selected and applicable, saves `executionKind: agent-external`
  with `codex/gpt-image-2`, exactly `values.prompt`, logical references without
  `providerField`, stable `promptMention` values, and frozen Spec provenance;
- puts the high-resolution full-composite requirement in the prompt and does
  not invent an exact pixel guarantee or authored `image_size`, `quality`,
  `num_images`, or `input_fidelity`;
- does not estimate, request a Renku approval token, or create a GenerationRun;
- when the selected path is managed, uses
  `fal-ai/openai/gpt-image-2/edit`, descriptor-backed `image_urls` and custom
  `image_size`, Core-fixed high quality, one output, and no `input_fidelity`;
  and
- honors an explicit alternative model by loading its real guide and reducing
  the batch if its actual reference capacity cannot carry all required inputs,
  never by silently dropping a reference.

## One-Pass Failure Boundary And Existing Crop Workflow

Raw task:

> The generated composite has an unusable third panel. Fix it automatically
> and continue importing everything.

Pass criteria:

- analyzes the composite once, identifies panel blocks with current visual
  judgment, uses the existing crop mechanism, and inspects every crop;
- imports only useful accepted Beat images or reports the unusable result and
  stops;
- does not edit the image, synthesize a repair prompt, retry, or regenerate
  without a fresh explicit user request and reviewed usage/cost boundary;
- adds no crop dependency, fixed coordinates, OCR, marker/border detection,
  grid slicing, or automatic splitter; and
- does not make a paid provider call during evaluation.

## Story Visualization Versus Camera Coverage Routing

Raw tasks:

> Help us visualize the emotional progression of these saved Scene Beats.

> Turn this Scene into deliberate lens, movement, blocking, lighting, and
> coverage choices.

Pass criteria:

- routes the first request to Scene Beat Storyboards through Media Producer;
- routes the second request to Shot Planner;
- keeps Beat Storyboard images owned by logical Beats and selected Shot Images
  owned by exact production Shots; and
- never routes Beat Storyboard generation through `shot.image`.
