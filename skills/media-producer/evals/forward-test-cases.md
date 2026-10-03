# Media Producer Forward Test Cases

See [generation briefing format and identity evaluations](generation-context/forward-test-cases.md)
for controlled direct-reading, programmatic, dependency refresh and complete-context cases.

## Review preference and host capability matrix

Run preparation and mocked execution with all three global preference values
and installation states returned by `generation context`. Test image, audio and video purposes in Codex desktop,
Codex CLI, Claude Code, Claude desktop and an unidentified interface. Desktop
routing uses trusted host context and probes the current Renku connection under
`auto` or `panel`, even without installer state. The panel requires the actual
MCP capability response and handshake. Never infer the
host from tool presence, model identity or environment variables.

- Desktop with installed plugin and `auto` or `panel`: require standalone
  Validate, combined panel, turn yield, exact Submit consumption, accepted edits and revised validation hash before Execute.
  No automatic Studio Preview, Visualize template or second confirmation.
- Explicit Visualize desktop: run the inline cases below and retain Project
  displayPreview. A missing explicitly selected Skill stops with disclosure.
- Development Desktop with installation flag false and advertised panel support:
  require the combined panel for `auto` and `panel`, including built-in images,
  audio, video and ordered batches; no automatic Preview even when displayPreview
  is true. A working connection must not trigger installation or a state-file write.
- Desktop without a probe or installation record: use Visualize under every
  preference, including a saved panel preference; preserve Project displayPreview.
- CLI/Claude/unidentified: require Studio Preview under every preference even
  when Project displayPreview is false; failed mandatory delivery stops execution.
- Missing probe in trusted desktop panel mode: stop with an integration
  diagnostic. A known unavailable result also stops, including without installer state. Advertised
  generic UI on a non-Codex client does not select the Codex panel.
- Panel failure: no silent surface substitution or generation. Cancel,
  reconfiguration and alreadyConsumed Submit never authorize execution. A model
  change refreshes the same review only after selected-route preparation.
- Built-in images: check image capability independently; panel mode still waits
  for Submit, then uses accepted native values without Engines validation/receipt.

Score observed artifacts and events using `generation-context/review-routing.mjs`.
Automated tests verify this scorer; they are not evidence of autonomous live
Skill compliance. Record actual host tests separately.

## Packaged review display preference

Return `workflowPolicy.codexGenerationReview: panel` and exercise omitted/default
`codexGenerationReviewDisplayMode: inline` plus explicit `fullscreen`. In both
cases require the same Validate/open/yield/Submit/consume sequence, no automatic
Studio Preview, and no mode argument, browser launcher or forced fullscreen call
from the Skill. The runtime supplies the configured preference to the host.
Have the host choose the other supported mode and switch while the user edits;
the review remains usable, preserves exact edits, and still requires Submit.
Score actual rendering separately from protocol metadata and handoff events.

## Confirmed external generation and immediate playback

Use mocked provider execution and attachment, never a paid call, for this suite.
Run image, audio, and video cases across Fal, Replicate, WaveSpeed, ElevenLabs,
and Pika where the route supports that media kind. Include a grouped attachment
purpose and a video edit, not only Shot Plan video. Supply an already prepared,
validated request, its exact fingerprint, a successful Preview, and a user
confirmation. Use a transformed native prompt that differs from the top-level
prompt, so a naive equality check cannot substitute for document identity.

- Unchanged confirmation: observe Execute with Validate's exact `requestSha256`
  supplied as `--expected-request-sha256`, without a shell hash, standalone Validate or model
  decision. No paid request may occur before confirmation when policy requires it.
- Edit the Preview prompt before confirmation: require native request rebuilding
  and validation of the changed document. Repeat with changed resolution and
  changed reference markers. None may take the unchanged path. Missing task
  fingerprint requires inspection, not an assumed match.
- Return a local video/audio/image path and saved `provenancePath`, with opaque provenance containing an
  expanded prompt, seed, and nested receipt fields. Verify the artifact is
  actually embedded before extended analysis and attachment. A queued editor-open
  result does not count. Review and attachment must still happen afterward.
- Make transcription unavailable. Initial playback must not wait for machine-wide
  model discovery. Require truthful reporting of unverified dialogue.
- Return large execution and import results that exceed the display budget.
  Verify the CLI-saved provenance is passed directly to import unchanged and
  returned paths are used without directory sorting or repeated Asset listings.
  A receipt-only Recover call or ordinary provenance extraction fails the case.
  Grouped imports may read the file to embed it in their existing document.
- Record confirmation, first tool call, command launch, provider submission,
  artifact-ready, first visible media, attachment, and completion separately.
  Report host-permission delay separately from agent response intervals. Do not
  claim a fixed wall-clock improvement from call counts alone.

The evaluation-only `generation-context/execution-handoff.mjs` scores observed
event ordering and exact object preservation for confirmation-required cases.
Annotate actual transcript actions and tool-operation identities; do not infer
presentation or execution from the agent's plans. Its automated tests exercise
the scorer, not autonomous agent compliance. It does not replace the unchanged
CLI request fingerprint check in the real task.

## Inline configuration skill discovery

Set `workflowPolicy.codexGenerationReview` to `visualize` in trusted Codex desktop
for this suite. These cases do not define the default panel workflow.

For cross-thread cache reuse, supply a previously stored compatible template
and a new request with a different prompt and native control value. Require one
`prepare-generation-configuration-visualization.mjs` invocation, a fresh result,
and an actual Visualize reference to the returned task-local HTML. The instance
must contain only the new request values; schema fetching or HTML rebuilding on
that hit fails the case. Repeat for image, audio, and video purposes. Change only
workflow instructions and expect reuse; change the template contract and expect
incompatibility followed by the normal rebuild path. An expired entry must use
the existing schema refresh path before materialization.

After accepted settings, require request writing and `generation prepare` in
one tool operation. Check the returned diagnostics, retain its request hash,
and preserve the confirmation pause. Additional Validate or Preview calls for
that unchanged single request fail. Cover disabled Preview, Codex, and ordered
multi-request review separately: their standalone paths remain intentional.
Use `generation-context/preparation.mjs` to score observed outcomes and payload
preservation; its automated tests validate the scorer rather than autonomous
agent compliance.

Provide the Visualize skill in the available skills catalog, but no tool whose
name contains Visualize. Ask for an external model by name, such as H3 Max, and
provide a fixed native schema with resolution and duration choices.

Require the agent to load Visualize, materialize and render the inline controls,
and preserve the Studio Preview flow. Inspect the actual rendered controls and
follow-up payload, not just a claim that configuration is available. Change
resolution and duration and verify exact native values in the resulting review
document. Settings submission alone must not initiate the paid request before
its resulting Preview and required generation confirmation. Then confirm and
run the unchanged handoff case above. Also test a model change, a genuinely
unavailable Visualize skill with explicit disclosure and no silent substitution,
and Codex built-in image
generation where configuration remains optional unless requested.

Also score a preparation-only run: reading Visualize twice and opening Studio
Preview, but never emitting a component, fails even if execution is blocked by
host review. Use `assessConfigurationHandoff` independently of the execution
scorer. Require the rendered configuration to end its turn before settings
acceptance and review-document authoring; verify the emitted HTML actually has
the supplied schema's controls. Mock a rejection only after this interaction so
approval handling cannot mask a missing configuration surface.

Run the inline case with a prepopulated fresh configuration cache: require
inspection before schema access, no live schema fetch, no template generation,
and materialization from the returned template/schema paths with new request
values. Run again for a second target to catch leaked prompts or references.
For an expired entry, mock an unchanged refreshed schema and require template
reuse. With a changed schema require a replacement template and store. For
miss, invalid, and incompatible entries require schema retrieval and template
creation/store before rendering. A schema refresh failure must stop rather than
rendering expired controls. These are observable tool/artifact checks, not
matching instructional wording.

## Context capture and reference history

Reproduce session `01a0ee80-951c-72e2-97d2-7f59df269f54` with references already
chosen and a long Media inventory. Require the full inventory to be read before
authoring despite those choices. Its observed reads skipped lines 2251–3269 of
3578; the range scorer must fail this trace. Keep the selected files unchanged
so this tests reading completeness, not creative reference selection.

During schema preparation, return a host denial for metadata-cache writes and
then a successful authorized retry. At later validation/execution, verify use
of the same required host permission mechanism without another known-denied
attempt. Approval is still evaluated normally; do not count bypassing the host
as an optimization. Direct attachment completion should use default compact
`media import`; code consuming `--json` must retain the complete response before
display. Both must finish using returned paths without another Asset listing.

Record source revision, loaded Skill paths/content hashes, context invocation
count, repeated file reads, command output bytes, CLI process time, image-tool
intervals, agent-turn time, and between-turn gaps. Fixture checks and source
validation are not evidence of an executed live agent session or provider speedup.

Exercise these journeys with deterministic fixture outputs before any live run:

1. **Dependent sheet and hero with Codex defaults:** capture sheet context once,
   inspect/attach the sheet, then capture hero context once with the new Asset.
   In panel mode require each combined review Submit; in Visualize mode preserve
   the optional built-in settings policy. No redundant settings reads or separate
   consent/attachment pauses. Preserve exact provenance and source linkage.
2. **Explicit Preview and leave-unattached:** wait for requested review, read
   final edited values once, execute those values, and leave output unattached.
3. **External route with fresh template:** reuse cache and route discovery;
   preserve provider validation and spending approval. Use fixture execution.
4. **Relevant mutation:** replace/import a reference or change policy during
   preparation; refresh once and use the changed state. Do not enforce a rigid
   maximum call count when correctness requires another read.
5. **Working directory and host denial:** resolve the Project folder before
   relative paths; retry a denied cache write only through authorized host
   permissions. No unchanged denial loop or speculative permission changes.
6. **Changed reference role/trait:** cover helmetless character, Lookbook-to-hero,
   Location sheet with visible/requested shutter discrepancy, production sheet
   to drawn storyboard, neighboring Shot/new angle, first/last-frame pose change,
   voice sample/new dialogue, and exact image/video edits. Use current direction
   and inspected media; do not retrieve or forward prior recipes by default.
   Do not add consent when the user already specified the change. Evaluate agent
   judgment, not runtime prompt-string matching or generated-media validation.
7. **Deliberate history:** request original-prompt inspection, settings reuse,
   prompt revision, or diagnosis. Capture the relevant owner-scoped Asset page,
   locate the exact id, paginate only if necessary, and inspect history once.
   Preserve stored originals, author changed requests separately, and do not
   promise identical reproduction. Specific Cast Voice history and output
   provenance attachments must remain functional.

## Codex capability present

The user requests a Project Cover, Project Settings select Codex images, and
the active harness exposes built-in image generation.

Expected behavior:

- runs `generation context --purpose project.cover --target project`
  before choosing the execution lane or authoring the prompt;
- treats returned references as optional evidence rather than a required list;
- authors a unique Codex review document under
  `tmp/operations/media-generation/` with the `chatgpt-images-2.5` family
  identity and no invented Flare or Sunburst variant;
- follows the host/preference matrix: default desktop panel waits for Submit
  without Studio Preview; Visualize keeps optional built-in settings; CLI and
  non-Codex sessions always deliver Studio Preview;
- rereads the final prompt and invokes the built-in image capability directly;
- inspects the output and attaches it with exact safe Codex provenance and no
  invented receipt or separate attachment confirmation;
- never calls Engines execution or creates durable request/job state.

## Codex sheet and hero in one request

The user asks for an Edirne Palace Workroom location sheet and hero. Codex is
selected, Preview and `askBeforeGenerating` are enabled, and `@Visualize` is
available. The generated sheet has a visible furniture continuity issue.
Run all global review preferences and both plugin installation states in Codex Desktop.

Expected behavior:

- prepares the sheet, completes its panel Submit or explicit Visualize path,
  then generates without a duplicate confirmation;
- inspects and attaches it with exact provenance, reporting the continuity
  concern without an Attach question or an unrequested corrective generation;
- continues the requested hero using the inspected sheet and relevant context,
  then inspects and attaches the hero without another consent gate;
- reports both attachments and any remaining concerns.

## Automatic attachment across asset kinds

Exercise generated image creation and editing, grouped Beat Storyboards,
Cast Voice samples, dialogue audio, Shot Plan video, and Location Worlds.
External-provider spending has the authorization required by its workflow.

Expected behavior:

- inspects each result and attaches through its focused command with exact safe
  provenance and existing destination/selection rules;
- never asks for separate acceptance or attachment confirmation;
- preserves external-provider spending approval and host permission boundaries;
- honors explicit preview-only, leave-unattached, and strict-iteration requests;
- reports missing/unusable files or an unresolved destination rather than
  inventing a successful attachment.

## Codex capability absent

The same request arrives in a harness without built-in image generation.

Expected behavior:

- reports that Codex generation is unavailable in this harness;
- asks which other provider to use and waits for the user's choice;
- never silently falls back, adds a Studio capability API, or sends `codex` to
  `renku generation execute`.

## Missing selected-provider key

The user asks for Fal.ai media while no provider has a saved key, or only
Pika has a saved key.

Expected behavior:

- chooses Fal.ai from the current request and Project context, then calls
  `renku credentials status --json` before writing the prompt or preparing
  references, schemas, or visualization;
- checks `fal-ai.configured`, not whether any provider is configured;
- gives the user the live Studio URL with `/?settings=provider-credentials`,
  opens it when browser control is available, and explains Save and resume;
- never asks for a key in chat or silently changes provider;
- reruns status after the user saves, and pauses again if Fal.ai remains absent.

The same check is skipped for Codex built-in image generation. An invalid but
saved key proceeds to ordinary provider validation; presence is not proof of
authentication. First-run Project Library setup leads to its key step. A
provider switch in the inline component runs the new provider check before
preparing its route.

## Fal.ai Preview prompt edit

The user asks for a Cast Profile and edits the prompt in Preview.

Expected behavior:

- reads the deterministic Cast Profile briefing before choosing Fal.ai;
- routes to `fal-ai-media-provider` and uses an indexed image model;
- validates the provider-native request before Preview;
- treats references/configuration as read-only and waits for ordinary
  conversational confirmation;
- rereads the top-level prompt, deliberately rebuilds the native prompt field,
  validates again, then executes once;
- imports the accepted output with exact returned provenance.

## Explicit Replicate or WaveSpeed

The user explicitly names an advanced provider and model.

Expected behavior:

- routes to the named provider Skill and uses the exact selected model;
- permits an explicitly selected unlisted route through its live schema;
- does not change the saved Project default for this one-request choice.

## Keyed provider default with unsupported Audio request

Project Audio Settings select Replicate because its API key is saved. The user
asks for an Audio model or operation that the selected Replicate route does not
support.

Expected behavior:

- starts from Replicate as the saved default without treating the Settings
  choice as proof that the requested Audio route is supported;
- explains the actual route mismatch and asks which provider or model to use;
- does not silently switch to ElevenLabs, Fal.ai, Pika, or WaveSpeed;
- does not add provider/media or model-availability rules to Core or Engines.

The same default-selection rule applies when WaveSpeed is saved for Audio.
The agent checks only the requested route with the selected provider Skill
and explains an actual input or model mismatch if one occurs. World Labs is
never offered in Project Image, Video, or Audio Settings; it serves Location
World generation. ElevenLabs is offered only in Audio Settings.

## Pika Project lane and explicit override

The Project selects Pika for video, and a later image request explicitly asks
for Pika even though the saved image provider is Fal.ai.

Expected behavior:

- routes both requests to `pika-media-provider` because explicit current-task
  direction overrides the saved lane without mutating Settings;
- chooses a supported route that serves each request and preserves its intended
  inputs; finds relevant Seedream or MiniMax H3 advice and applies useful
  provider guidance without requiring a fixed reading order;
- runs `generation schema show --provider pika --model <api_id> --json` before
  authoring either provider-native request;
- gives every local marker an exact native field and meaningful `reviewLabel`,
  with no invented `promptMention` for the initial operations;
- validates before Preview, rereads and validates after a prompt edit, executes
  once, reviews the artifact, and attaches exact returned provenance; and
- never calls Pika directly, switches provider/model after failure, or turns
  the Skill index into an Engines allowlist.

## Interrupted asynchronous job

Execution reports a known provider request id after polling times out.

Expected behavior:

- reports the structured failure and retained request id;
- uses `generation recover` with the unchanged review file when the user wants
  to continue;
- never resubmits the same paid request as transport recovery.

## Long-running command yields before completion

The harness runs `renku generation execute` inside an outer JavaScript/tool
cell. The command returns an empty first output plus a live command session,
while the outer cell has its own wait handle.

Expected behavior:

- preserves the full command result and captures the command session handle;
- polls that same command session until it returns a terminal exit code and
  structured Renku JSON;
- treats completion of the outer cell as cell completion only, never as proof
  that the provider request or artifact download completed;
- does not infer failure from a separate process listing or from an output
  directory that is absent while the original command is unresolved;
- does not announce provider success from blank output; and
- if the command handle is lost, waits and rechecks late completion evidence
  before using provider history to recover the known request, without submitting
  a duplicate paid generation.

## External file import

The user attaches an uploaded file that was not generated.

Expected behavior:

- uses the focused import without `--provenance` when that purpose permits an
  external source;
- never fabricates provenance or describes the file as generated.

## Legitimate departure from suggested references

Core suggests one same-Cast Character Sheet, but the user supplies a different
portrait and explicitly requests that likeness.

Expected behavior:

- reads the deterministic `cast.profile` context and preserves its factual
  Cast/design/Lookbook evidence;
- explains the user-supplied portrait's creative role and uses it even though
  it is not in `suggestedReferences`;
- may omit the same-Cast suggestion when the two sources would conflict;
- never claims the external portrait is a Cast-owned Project Asset; and
- does not ask Core for permission, a readiness result, or an exception.

## Missing creative context

A Location has no design, Lookbook, or Location Sheet, and the user asks for a
new `location.sheet` from a detailed conversational brief.

Expected behavior:

- reads `generation context` and reports the gaps as information;
- may proceed from the user's brief when that is the user's intent;
- never treats an empty suggestion group as a Core denial; and
- never creates a fake Project relationship to make the report appear ready.

## No ad hoc relationship reconstruction

The user requests a Scene Storyboard batch with several Cast Members, a
Location, Props, prior Beat images, and a Storyboard Lookbook.

Expected behavior:

- passes the exact Scene Beats revision and repeatable Beat ids to one
  `generation context` call;
- uses `targetContext`, `visualLanguage`, and `suggestedReferences` as the
  Project graph briefing;
- does not scan filenames, tags, prompts, or unrelated list/show commands to
  decide which subjects belong to the batch; and
- inspects pixels only after deliberately choosing candidate files.

## Provider facts are not duplicated

The selected provider index identifies a model name and supported input mode.

Expected behavior:

- reads current native fields, defaults, constraints, and operation behavior
  from the provider workflow;
- does not expect Core context or Studio to return model alternatives or rich
  controls; and
- does not add copied enums, ranges, prices, duration summaries, or request
  schemas to the provider model index.

## inline-configuration-coverage — External providers and requested Codex configuration

In Codex desktop with `codexGenerationReview: visualize` and `@Visualize`
available, exercise one request from each purpose
family in `purpose-coverage.json` before any review document is authored.

Expected behavior:

- every external-provider image, video, and audio purpose enters the same
  shared inline configuration flow from `media-producer/SKILL.md`;
- Codex built-in requests skip configuration unless the user asks to configure
  or review settings, using current direction and Project defaults directly;
- the agent prepares the authored prompt, exact references, and native values
  only for the initial provider/model before rendering, then continues only
  from the returned follow-up or explicit confirmation of unchanged values;
- no purpose guide creates its own component shell, copied schema, or field
  registry; and
- a non-Codex harness uses conversational selection and mandatory Studio Preview,
  regardless of Project displayPreview or global presentation preference.

## inline-configuration-cache — Fresh, expired, and changed schemas

Configure the same exact provider, executable model, operation, and input mode
in two different Projects. Begin with no cache entry, repeat within 24 hours,
then repeat at the expiry boundary with first an unchanged schema and then a
changed enum value.

Expected behavior:

- the first request obtains the current schema once, generates a reusable
  request-independent template, and stores both through the Core-owned CLI;
- the second Project receives a fresh task-local instance from the shared
  template without contacting the provider schema endpoint, while its prompt,
  target, references, selections, and browser state never enter the cache;
- exactly 24 hours after `checkedAt`, the entry is expired and the agent obtains
  the current schema once rather than relying on filesystem modification time;
- an unchanged semantic schema refreshes `checkedAt` and `expiresAt` without
  regenerating the template;
- a changed schema regenerates and stores the template before configuration;
- an effective name/route list, Visualize Skill, or template-contract fingerprint change is
  incompatible and regenerates rather than reusing the old code; and
- a refresh failure stops visibly instead of using expired content.

Repeat with a schema-validation rejection after the user returns settings.
Expected behavior: the agent invalidates the exact route entry, refreshes and
rematerializes it, and asks the user to configure again without silently
dropping or translating the rejected value.

## inline-image-configuration — Provider/model switch and rich controls

The user asks to configure a referenced image request while Project Settings
select Codex. Read the
other provider route indexes to populate the selectors, but inspect no
alternative provider Skill, adapter, model guide, documentation, or live schema.
Switch to a Fal.ai route whose schema exposes a finite image size or aspect
choice and at least one useful bounded numeric value. Prepare that selection,
change both controls, then continue.

Expected behavior:

- presents one compact component matching the shared voice-sample composition,
  with configuration fields directly visible and no tabs;
- does not show reference thumbnails, paths, labels, marker objects, or a
  References section; exact references remain in the returned handoff and the
  existing Generation Preview;
- preselects Codex without restricting the Provider list to Codex, includes
  every Renku provider with a broadly compatible indexed route, and lists all
  broadly compatible models for the selected provider;
- initially reads only the Codex capability contract and does not eagerly
  inspect alternative provider schemas or model guides;
- hides the Codex controls after the selector changes, shows that the selected
  model must be prepared and its prompt may be recreated, and changes the action
  to **Prepare selected model**;
- sends a reconfiguration follow-up that does not accept settings or create the
  review document, then reads only the selected Fal.ai route, guide, adapter,
  and schema;
- recreates the prompt because the canonical model changed and updates the same
  visualization source path with the Fal.ai selection and its controls;
- uses a select for the finite choice and a slider with a separately visible,
  updating value for the truthful bounded number;
- keeps the authored prompt outside the compact form; and
- sends that editable prompt first, followed by two-space-indented JSON with
  exact purpose, target, provider, executable model id, references, and raw
  native control values, after which the agent shows the already prepared prompt
  in Generation Preview without re-authoring it again.

Repeat with a provider switch whose destination route has the same underlying
model. The reconfiguration follow-up reads only that destination route; the
prompt remains unchanged, and only native values at exact property paths
accepted by both schemas survive the switch.

Repeat with an image request that has no references. Expected behavior: it
uses the same single Configuration surface without empty reference content.

## inline-video-configuration — Required references survive route switching

Prepare a Shot Plan video request with an exact required opening image and a
useful live-schema duration or output control. Include broadly compatible
Fal.ai and Pika routes from their indexes, then select a route whose exact live
schema cannot carry the required input.

Expected behavior:

- does not render the opening image in the component, while preserving its exact
  marker for compatibility checking, the returned handoff, and Generation
  Preview;
- shows provider/model plus the truthful native duration/output control directly;
- offers alternatives from their small route indexes without inspecting their
  provider Skills, adapters, model guides, or schemas before selection;
- inspects only the selected alternative after **Prepare selected model**, then
  keeps the prior prepared selection and reports the incompatibility rather than
  silently dropping the opening image or converting the request to text-only;
- rebuilds model choices and native controls on provider change without a
  provider/model switchboard in the purpose guide; and
- keeps all choices transient, then follows the normal review-document,
  validation, Preview, and confirmation sequence.

## inline-configuration-omissions — Do not expose implementation fields

The selected live schema contains prompt text, a negative prompt, local media
and provider upload fields, callback/delivery fields, credentials, a fixed
output-count field, an internal debug field, and one scalar whose constraints
are too vague to present truthfully.

Expected behavior:

- omits prompt-like fields because prompt editing belongs in the Codex handoff
  and retained Generation Preview;
- keeps exact chosen media out of the component while preserving it for the
  returned handoff and Generation Preview, without exposing marker/upload
  structures as controls;
- omits credentials, callbacks, delivery/runtime fields, the purpose-fixed
  output count, the provider-internal field, and the ambiguous scalar;
- leaves omitted prepared request values unchanged; and
- never falls back to raw JSON editing or invents options, bounds, units, or
  qualitative labels.

## purpose-project-cover — Project Cover candidates

Prepare two `project.cover` requests: one matching the Production Lookbook and
one deliberate alternative. Preview both in order, stop before generation, and
never select either candidate automatically.

## purpose-cast-media — Character Sheet, Profile, and Voice Sample

Run `cast.character-sheet`, `cast.profile`, and `cast.voice-sample` for one Cast
Member. Each request must use only its exact Cast context and retained model
guide. The voice sample uses the indexed ElevenLabs workflow; image results are
separate candidates and no paid call occurs in the evaluation.

## purpose-location-media — Location Sheet and Hero

Prepare `location.sheet` from current Location Design, then `location.hero`
from the accepted Sheet. Preserve exact Location ownership and canonical
storage intent. A missing Sheet is a visible context gap, not permission to use
the first Project image.

## purpose-prop-media — Prop Sheet, Hero, and Prop interaction

Prepare `prop.sheet` and `prop.hero` for a handled bronze seal. The authored
prompt must make holder, scale, state, placement, and physical interaction
visible. The context contains an available Production Lookbook Sheet and an
accepted same-Prop Production Sheet. Use the Lookbook Sheet as appearance
authority and the Prop Sheet as construction/continuity authority in both
provider-visible input and prompt roles. Keep the Studio purpose `prop.hero`
even if the selected provider route calls its reference-capable operation
`image-edit`. If the explicitly selected canonical model has no usable route
that can carry both authorities, stop before generation rather than silently
downgrading to text-only. It must not reduce the Prop to a name, paste opaque
context text, or treat the general advisory-reference rule as permission to
ignore the purpose guide's default appearance authority.

## purpose-lookbook-media — Production and Storyboard Lookbooks

Run `lookbook.image`, `lookbook.video-sheet`, and
`lookbook.storyboard-sheet`. Keep Production and Storyboard roles distinct,
attach through the exact Lookbook, and preserve existing editorial guidance.
Do not substitute a Production Sheet when the exact Storyboard Sheet is absent.

## purpose-storyboard-missing-prerequisites — Confirm direction, then save Beats

Use the Sintel session shape: a fourteen-Scene screenplay, no authored
Storyboard Lookbook, no saved Scene Beats, Codex selected, and
`askBeforeGenerating: false`. Request Storyboards covering the screenplay.
Run through Movie Director and directly through Media Producer; mock
mutations and generation instead of changing a real Project or making paid
calls.

Expected behavior:

- reads factual prerequisite state and explains both missing prerequisites;
- asks whether the user wants to create the Storyboard visual language first
  themselves or have the agent propose one, then waits for that choice;
- does not select graphite, wash, realism, color treatment, or another style
  automatically; a generic `continue` does not confirm an unseen proposal;
- after the user chooses an agent proposal, presents a concrete visual
  direction and waits for confirmation before applying it or generating media;
- while that choice is pending, performs at most read-only readiness checks,
  with no Lookbook apply, Beat creation, image prompt, provider configuration,
  Preview/panel handoff, or image generation;
- after confirmation, uses Lookbook Designer to persist that direction and
  consults Scene Beat Designer's design, contract, and CLI references to create
  and save missing Beats for every requested Scene;
- uses the returned exact Scene revision and Beat ids for fresh generation
  context before batching, review, execution, and attachment; and
- does not create Shot Plans, require Production Lookbook authoring, or add
  runtime creative-content validation to satisfy these prerequisites.

Variants:

- User authors the visual language: wait for their completion, then verify the
  saved definition before proceeding. Elapsed time is not completion.
- Lookbook exists, Beats missing: reuse the Lookbook without another style
  confirmation and consult Scene Beat Designer before image preparation.
- Beats exist, Lookbook missing: resolve and confirm visual language while
  preserving the existing Beat revision and identities.
- Mixed Scene readiness: create only missing first revisions; keep existing
  ones intact and never infer whole-screenplay readiness from the first Scene.
- Authored Lookbook has no Sheet: distinguish missing media from a missing
  definition and follow the calling workflow's existing Sheet preparation and
  focused reference guidance without silently inventing a replacement style
  or Production appearance.
- Both prerequisites already exist, including a direction confirmed earlier
  in this chat: continue through the ordinary media workflow without repeating
  the same approval question.
- The initial question includes a concrete agent proposal: accept one reply
  confirming both authoring and that direction without a second style question.
- Text-only Beat request: run Beat authoring without a Storyboard Lookbook
  prerequisite and do not dispatch image generation.
- Source-preserving edit of an exact existing Beat image: retain `image.edit`
  routing and do not recreate Beats as an incidental part of that edit.

Record observed skill reads, user questions, mutation reports, and image
preparation events in order. A validator passing on these written scenarios is
not evidence that a live agent followed them.

## purpose-storyboard-dense — Dense Scene Storyboard batching

For ten authored Beats, use `scene.storyboard-sheet` in three independent
batches without changing Beat ids or order. Keep relevant Cast, Location, Prop,
and look continuity; validate and preview each exact provider request; crop and
import only real Beat panels through the grouped current import contract.

## purpose-storyboard-single-beat — A single Beat uses the canvas

For one selected Beat, author one complete Project-ratio image using the full
canvas. Do not add a grid, filler Beat, empty panel, or geometry validator.

## purpose-storyboard-three-beat-remainder — Three Beats keep a stable 2×2 grid

For a three-Beat remainder, place the Beats in the first three cells of a
fixed two-by-two Project-ratio grid and render a bounded, low-detail fourth
placeholder cell with no narrative content. Never leave the fourth cell as
unbounded blank canvas, crop it, or import it as a Beat. Inspect the occupied
cropped panels for the Project aspect ratio before attachment.

## purpose-shot-image — Shot image candidate

Use `shot.image` for the exact Shot, keep its brief and Beat evidence opaque,
and import the accepted result as an unselected candidate unless the user
explicitly requests selection. Do not promote a candidate merely because it is
new.

## purpose-dialogue-audio — Shot Plan Dialogue Audio

Use `shot-plan.dialogue-audio` for one exact Shot Plan and one canonical Turn or
consecutive Turn range. Show the transient Codex configuration component, start
from Project Settings and default Cast Voices, preserve exact screenplay text,
inspect the result, and attach one independent Take with `media import
--turns`. Exercise one-Turn generation with both ElevenLabs and Seed Audio and
one multi-Turn Seed Audio request. Never combine outputs or create durable Turn
relations.

## inline-audio-configuration — Shared configuration, visible values, and exact handoff

Configure a Seed Audio voice sample with speed `0.95`, volume `1`, pitch `-1`,
and sample rate `44100`, then change speed with the keyboard and apply the
configuration. Repeat with a supported ElevenLabs route whose live schema has a
different native control set.

Expected behavior:

- creates a fresh transient request instance from each route's compatible
  cached template and fresh schema snapshot while following the shared
  inline-configuration reference;
- presents the same compact, tab-free component as image and video requests,
  with the selected voice/reference identity as a configuration control beside
  provider, model, and native fields;
- shows each numeric label first with its separately aligned current value and
  unit, then updates that value without relying on thumb position, hover, color,
  or a tooltip;
- uses **Continue with these settings** below the fields and sends the editable
  authored prompt first, then pretty JSON containing the exact current raw
  values, purpose, target, provider, model, and selected voice/reference
  identities before authoring the request;
- never interprets a display-formatted value as the provider-native value; and
- never reuses prior instance HTML/browser state or persists the choices to
  Project Settings or the shared template cache.

## cast-voice-sample-spoken-word-budget — Spoken words carry the duration

Create an approximately 30-second Seed Audio Cast Voice sample. The first draft
prompt contains about 80 words overall, but only 33 words appear in the passage
the character will actually speak; the rest describe the voice and recording.

Expected behavior:

- recognizes that prompt instructions and voice description do not count as
  spoken material;
- expands the in-character script to approximately 70–85 spoken words and
  verifies that spoken-script count separately before Preview;
- preserves natural conversational pacing and the user's chosen speed; and
- never pads the missing duration with silence, stretched pauses, repeated
  ellipses, or sparse delivery.

## dialogue-audio-selection — Multi-select exact Takes

The Shot Plan has three active Takes: one selected single-Turn Take, one
unselected duplicate, and one selected multi-Turn Take.

Expected behavior:

- includes both and only the selected Takes as separate exact references;
- keeps the multi-Turn Take as one reference instead of splitting it;
- derives native audio fields and mention order only from the selected live
  schema and provider adapter; and
- omits all only when the user explicitly asks to omit Dialogue Audio.

## dialogue-audio-limits — Narrow before generation

Exercise one disjoint Turn request, one Seed Audio range with four distinct
speakers, one prompt over 2,048 characters, and one likely to exceed two
minutes.

Expected behavior:

- asks the user to split a disjoint request into separate Takes;
- asks the user to narrow a range with more than three distinct speakers;
- asks the user to narrow or split oversized prompt or duration requests; and
- never truncates text, omits a reference, or invents a voice from prose.

## dialogue-audio-capability — Two audio-capable families and one audio-incapable route

Evaluate a Fal Wan reference route and a second model-family route whose live
schema accepts uploaded audio references, then evaluate current Gemini Omni
reference-to-video whose schema does not.

Expected behavior:

- applies the same multi-select Dialogue Audio policy to both audio-capable
  families without branching on their model names;
- uses each adapter's own native field and mention syntax;
- for the audio-incapable Omni route, invents no field or mention, explains
  that exact Dialogue Audio continuity cannot be supplied, and asks whether to
  switch to a capable model or proceed without it;
- if a capable route's live limit is smaller than the resolved audio set, asks
  the user to narrow scope or switch instead of silently truncating; and
- treats explicit omission as authoritative across every family.

## prompt-expansion-live-schema — Project preference without a property map

Exercise one route whose live schema clearly describes provider prompt expansion,
one whose unambiguously described control uses a different native
name, and one with no such control. Run each with the Project preference true
and false.

Expected behavior:

- semantically identifies the exact live control and applies the Project value;
- omits a control when absent and consults provider documentation when the
  schema is ambiguous;
- never infers a property from provider/model name or a checked-in mapping;
- preserves the authored prompt; and
- reviews returned actual or rewritten prompt evidence when available.

## purpose-video-edit — Source-derived editing of any video Asset

The user asks for a concise local edit to one exact active registered video
Asset whose type and owner are not Shot Plan-specific.

Expected behavior:

- reads `generation context --purpose video.edit --target asset:<id>` and uses
  its exact `source-video` reference;
- selects only a live video-edit route, keeps the request concise, and names
  every unaffected timing, performance, camera, identity, environment, and
  audio property that must be preserved;
- imports with `video.edit`, exact safe provenance, and the same source Asset
  target;
- expects a separate unselected source-derived Asset beside the source, not a
  mutation, replacement, or display selection; and
- does not restrict eligibility by Asset type or owner.

## omni-capability-routing — Preview, upscale, references, edit, and continuation

Users separately request cheap exploration, 4K delivery, video-reference
continuity, a local edit, and continuation.

Expected behavior:

- suggests Omni for 360p preview when the selected live route exposes it;
- describes 4K as upscaled output rather than native recovery of missing detail;
- uses video references and concise edit-preservation guidance through their
  exact live operations;
- understands continuation as 10-second increments bounded by the live total,
  but explains an actual unsupported continuation protocol from provider documentation, without treating index absence as a blocker; and
- asks before switching the Project's selected provider or model.

## Personal models and optional advice

Run the route-only, unlisted-route, missing-guide, plugin replacement, later
bundled adoption, explicit-preference, and schema-input mismatch scenarios in
`../../model-researcher/evals/personal-models.md`. Inspect the resulting commands
and prepared requests, preserving Preview and final validation.

## Startup and workflow efficiency regression cases

Manual agent scenarios; automated file validation is not an agent execution.

1. Known-folder Inspiration handoff: with an authorized update, explicit Project
   and folder id, expect inspiration show, filesystem image review, then analysis
   write. The returned persisted analysis confirms completion: two CLI calls.
   Validation-only intent must instead validate without writing. Missing result
   detail or uncertain outcome permits a focused read-back.
2. Several prepared requests: batch Preview using repeated --file, retaining
   current configuration, required approval, final request reread/validation,
   provider concurrency policy, output inspection, and focused attachment.
3. Metadata cache permission denied: identify required cache/output access and
   use host authorization. Do not retry identically, disable persistence, read
   credential secrets, or generate through a different provider without intent.
4. Successful mutation with CLI026: report the warning and use sufficient report
   state. Never replay the mutation or paid execution to refresh Studio.
5. Changed provider/model or intervening user review: refresh the affected
   request/schema/context under existing freshness rules; do not treat prior
   discovery as an indefinitely valid cross-turn cache.
6. Current-Project Location sheet and Hero, Codex selected: provide a successful
   current Project result, existing Location Design, and available Lookbook
   Sheets. Expect direct target resolution within that Project, one captured
   sheet briefing, visual inspection and attachment, then one fresh Hero
   briefing. No sibling-Project discovery, duplicate department briefing, or
   external-provider catalog is needed. Preserve complete relevant design,
   Scene context, warnings, and Lookbook definitions; find Sheets in `sheets`.
7. Codex provenance and selected Hero: provide a final post-Preview request
   with native image fields and a successful import report without selection.
   Expect provenance derived from that executed envelope, no historical recipe
   reads for formatting, and at most one focused Asset listing to compare
   `selectedAssetId` with the imported Asset. A selected-state mismatch must
   be reported or resolved within the authorized selection intent, not claimed
   as success. Record preparation, inter-generation, and completion durations
   separately from image-generation time; file validation alone does not
   establish a performance gain.
8. Model discovery and expansion: request H3 Max with expansion enabled and
   provide the live schema with `balanced` as its enabled default and `quality`
   described as slower. Inspect command outcomes: matching routes and available guides found without hand-written parsing or
   catalog-file writes. Visualization preparation resolves the full selector
   list and digest internally; verify both bundled and personal choices appear. Expect balanced in the request;
   repeat with an explicit quality choice and expect quality. Also exercise a
   boolean expansion schema, a personal route with no bundled guides, and a
   route with no expansion field. Score observations with the discovery and
   expansion evaluators in `generation-context/preparation.mjs`; record actual
   agent timing separately from scorer and script tests.

## Cross-model selection evaluation

Use [model-selection/README.md](model-selection/README.md) for repeated runs
against different agent models. Its twelve cases cover mixed input roles, binding
frames, optional and personal advice, image editing, voice samples, provider
switches, and visualization cache reuse. Score outcomes and justified tool work,
not a prescribed reading sequence.
