# Media Producer Forward Test Cases

## Codex capability present

The user requests a Project Cover, Project Settings select Codex images, and
the active harness exposes built-in image generation.

Expected behavior:

- runs `generation context --purpose project.cover --target project --json`
  before choosing the execution lane or authoring the prompt;
- treats returned references as optional evidence rather than a required list;
- authors a unique Codex review document under
  `tmp/operations/media-generation/`;
- opens Preview when policy requires it, then pauses in conversation;
- rereads the final prompt and invokes the built-in image capability directly;
- inspects the output and attaches it with exact safe Codex provenance and no
  invented receipt;
- never calls Engines execution or creates durable request/job state.

## Codex capability absent

The same request arrives in a harness without built-in image generation.

Expected behavior:

- reports that Codex generation is unavailable in this harness;
- asks whether to use Fal.ai or Pika and waits for the user's choice;
- never silently falls back, adds a Studio capability API, or sends `codex` to
  `renku generation execute`.

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

- routes to the named provider Skill only when the model appears in its index;
- stops on an unindexed model instead of substituting one;
- never makes the advanced provider a Project Settings default.

## Pika Project lane and explicit override

The Project selects Pika for video, and a later image request explicitly asks
for Pika even though the saved image provider is Fal.ai.

Expected behavior:

- routes both requests to `pika-media-provider` because explicit current-task
  direction overrides the saved lane without mutating Settings;
- chooses only one indexed route and operation for each exact input mode,
  resolves its `modelKey`, and reads the canonical Seedream or MiniMax H3 model
  guide before the Pika provider adapter;
- runs `generation schema show --provider pika --model <api_id> --json` before
  authoring either provider-native request;
- gives every local marker an exact native field and meaningful `reviewLabel`,
  with no invented `promptMention` for the initial operations;
- validates before Preview, rereads and validates after a prompt edit, executes
  once, reviews the artifact, and attaches exact returned provenance; and
- never calls Pika directly, switches provider/model after failure, or turns
  the four-operation Skill index into an Engines allowlist.

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

## inline-configuration-coverage — Every Media Producer purpose

In Codex with `@Visualize` available, exercise one request from each purpose
family in `purpose-coverage.json` before any review document is authored.

Expected behavior:

- every image, video, and audio purpose enters the same shared inline
  configuration flow from `media-producer/SKILL.md`;
- the agent prepares the authored prompt, exact references, and native values
  only for the initial provider/model before rendering, then continues only
  from the returned follow-up or explicit confirmation of unchanged values;
- no purpose guide creates its own component shell, copied schema, or field
  registry; and
- a non-Codex harness does not invent a browser substitute or callback and
  continues with the existing conversational selection and Preview workflow.

## inline-image-configuration — Provider/model switch and rich controls

Prepare a referenced image request while Project Settings select Codex. Read the
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

Repeat with a provider switch whose destination route has the same canonical
`modelKey`. The reconfiguration follow-up reads only that destination route; the
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

- creates a fresh transient visualization from each route's inspected live
  schema while following the shared inline-configuration reference;
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
- never reuses prior HTML/browser state or persists the choices to Project
  Settings.

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
  but stops when the installed Fal index has no continuation route; and
- asks before switching the Project's selected provider or model.
