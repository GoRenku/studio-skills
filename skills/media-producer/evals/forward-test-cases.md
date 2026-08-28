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

## purpose-dialogue-audio — Scene Dialogue Audio

Use `scene.dialogue-audio` for the exact Dialogue turn and current Cast Voice.
Author provider-native text-to-speech input, preserve dialogue text and voice
identity, inspect the result, and attach a Take only after approval.
