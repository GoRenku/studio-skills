---
name: media-producer
description: Generate, review, inspect, and attach Renku Studio image, audio, and video media through provider Skills or the harness-gated Codex image capability. Use for Project, Lookbook, Cast, Location, Prop, Scene, Shot, dialogue, and Shot Plan media work.
---

# Media Producer

For AI video from a Blender Previs Shot Plan, read `references/shot-plan-video/blender-previs.md`. It owns the video-plus-sheets handoff and the scoped omission of an extra Lookbook image.

Use the installed `renku` runtime as the Project metadata and attachment
boundary. If it is unavailable, stop and direct the user to
`https://gorenku.com`.

Treat prompts, provider-native requests, receipts, and media as opaque creative
artifacts. Inspect them in the agent/user loop; never invent runtime validation
for their creative contents.

## Efficient Command Use

Choose text for reading; choose `--json` before invoking a command whose output
will go to `jq` or code. Read the briefing separately from large guide reads.
Capture a long briefing on its first call under `tmp/scratch/`, then read that
file in contiguous, bounded ranges through EOF. Track the last fully displayed
line; the next read starts at the following line. Search matches and a saved
file are not a completed read. Finish all ranges before authoring the request.
This applies to every image, audio, and video purpose, including exact edits.
Respect both command and enclosing tool
output limits; print readable output directly, without JSON-stringifying it.
Recover truncation from the captured file, not another context call. In JSON,
retain the top-level `assets` inventory when resolving reference identities.
Structured extraction does not replace reading the complete creative briefing.
The Media inventory is part of that briefing even when references have already
been chosen. Selecting a subset of references does not authorize skipping its
other entries; distinguish completed reading from reference selection.
Follow `references/workflow.md` for reuse and refresh timing. Prior recipes are
omitted from the briefing; use references for
the current task and retrieve history only when needed, following
`references/model-guides/shared/reference-inputs.md`.

Read fresh generation context for each request. Within that preparation, reuse verified syntax and selected route discovery; do not prefetch other providers. Follow [generation review routing](references/generation-review-routing.md) for every image, audio and video purpose. Use its combined panel or Studio Preview path once; the Visualize choice retains the existing configuration cache. Retain native validation, approval, concurrency limits, artifact inspection, and focused attachment. Tool-session polling continues the same process; it is not another CLI invocation. Never retry a successful paid execution automatically.

Consult the relevant CLI reference/help once if syntax is unknown, then reuse verified syntax for this task. Do not discover syntax by attempting mutations. Do not invent `project list`. If a known permission denial blocks cache/output/config or local-network access, explain the requirement and use the authorized host permission flow; do not repeat the denied attempt, read secrets, disable cache persistence, or change permissions. `CLI026` means the mutation succeeded: report the notification warning without replaying the mutation.

Carry known host permission requirements across stages of the same task. If
schema retrieval required elevated access to the provider metadata cache,
validation and execution using that cache need the same permission mechanism;
do not first repeat the denied access in each stage. Request required host
approval normally; this does not grant or bypass it.

## Project Workspace

Keep operation documents under `tmp/operations/media-generation/`, generated
or downloaded files under `tmp/media/`, review evidence under `tmp/qa/`, and
other temporary inputs under `tmp/scratch/`. Use unique review filenames.
Never create working files at the Project root or construct durable Asset paths;
focused Core commands own attachment. Retained Previs authoring source stays in
the canonical Shot Plan `previs/source/` folder; source revisions and rendered
media are registered by `blender-shot-planner` through Core.

Before authoring a Shot Plan request, register chosen new image/video/audio
derivatives with `renku shot-plan reference import` and use the returned
AssetFile paths. Follow `references/workflow.md` for exact revision association,
source summaries, reuse of registered inputs, and Preview availability checks.

## Read the deterministic briefing first

For new or materially recomposed Beat Storyboards, first complete the
prerequisite check in [scene-storyboard-sheet.md](references/scene-storyboard-sheet.md).
An unauthored Storyboard Lookbook requires the user's choice and confirmation;
missing saved Scene Beats require `scene-beat-designer` before generation
context, prompt authoring, configuration, or execution. A general request to
create Storyboards does not authorize choosing the Project's visual language.

For media generation from an existing Cast, Location, or Prop design, use this
skill directly. Load `casting-director` or `production-designer` when the task
also needs design authoring or revision; do not fetch department context to
repeat the generation briefing.

Before choosing a provider, authoring a prompt, or creating a review document,
read the complete current Core briefing:

```bash
renku generation context \
  --purpose <purpose> \
  --target <target>
```

For `scene.storyboard-sheet`, pass the exact reviewed revision and repeat
`--beat` for the requested batch. Without `--beat`, Core returns the revision's
complete ordered Beat set.

Treat `targetContext`, `visualLanguage`, `outputGuidance`, `workflowPolicy`,
`suggestedReferences`, and `warnings` as evidence. Core owns the factual Project
relationships in that report; do not rediscover them by scanning filenames,
tags, prompts, or unrelated command output. Suggestions are non-binding and
non-exhaustive: **context is evidence, not permission**. The user or agent may
ignore, supplement, or replace them for a
creative or provider-specific reason. A missing suggestion is information, not
a denial of permission or a generation blocker.

Inspect the exact files you deliberately choose. Give the provider Skill only
those chosen Project-relative files; provider Skills do not query Project
domains or decide which subjects belong to the target.

When a focused purpose guide names a Production or Storyboard Lookbook Sheet
as the appearance authority, treat that as the default agent workflow, not as
an ordinary optional suggestion. If the exact Sheet is available and the user
has not requested a deliberate visual departure, inspect it and attach it to
the provider request with a narrow appearance role. Do not replace a visible
appearance authority with a prose summary merely because a text-only route is
easier to call.

Keep Studio purpose and provider operation separate. A new focused candidate
may use a reference-capable provider route whose operation is named
`image-edit`; that does not change the Studio purpose to `image.edit`. Prefer a
reference-capable route for the same explicitly selected provider and canonical
model when an appearance authority must be visible. If no usable route can
carry it, stop before generation, explain that the request would become
text-only, and ask whether the user wants that downgrade or another model.
Missing Lookbook media does not invent a blocker: use the authored Lookbook
definition as prompt direction, report the gap, and continue unless the user
required visual-reference matching. This does not waive the Storyboard
prerequisite check when the Lookbook definition itself is unauthored.

## Choose the execution lane

Use the briefing's current `workflowPolicy` and the user's explicit direction.
Do not fetch Settings again for policy already present in that briefing. The saved
Image, Video, or Audio provider is the initial preference, including when it is
Replicate or WaveSpeed with a saved key. The Project media menus offer keyed
Fal.ai, Pika, Replicate, and WaveSpeed; ElevenLabs is Audio-only, and World Labs
is reserved for Location World generation outside these menus. A Project default
does not certify support for the requested media, model, or operation. Check
only the selected request against current provider guidance. If the preferred
provider cannot fulfill it, explain the mismatch and ask the user which
provider or model to use; do not silently switch. Use
`location-world-producer` for World Labs Location World requests.

- For `fal-ai`, use `fal-ai-media-provider`.
- For `pika`, use `pika-media-provider`.
- For `replicate`, use `replicate-media-provider`.
- For `wavespeed-ai`, use `wavespeed-media-provider`.
- For `elevenlabs`, use `elevenlabs-media-provider`.
- For Codex, continue only when the current harness exposes its built-in image
  generation capability. If absent, report that fact and ask whether to use
  another provider. Wait for the user's choice and never silently fall back.

Before writing a prompt, inspecting references, fetching a provider schema,
or building a configuration component, run `renku credentials status --json`
for the selected external provider. Check that provider's `configured` value;
another provider's saved key does not satisfy it. Codex built-in image needs
no provider key. If status fails, report its structured read error rather than
calling it a missing key. If the key is missing, pause preparation and tell
the user that this provider needs a saved key. Run `renku studio server status --json`
for `agent.browserUrl`; if Studio is stopped, start it through the existing
foreground `renku studio start` workflow. Open the local
`/?settings=provider-credentials` link when browser control is available and
give the user the link in chat. Ask them to enter the selected provider's key
in **Settings → Provider API keys**, select **Save**, and tell you when done.
For first-run setup, guide them through Project Library setup to its optional
key step. Never ask for the key in chat or record it in a request document.
After the user says it is saved, rerun `renku credentials status --json` and
continue only when that provider is configured. Recheck on a provider switch.
This confirms saved presence only; live provider validation still handles an
invalid or expired key. Do not silently switch providers or retry a submitted
job on a missing-key result.

Read [references/workflow.md](references/workflow.md) before authoring or
executing a request. For image work, also read
[references/image-operation-routing.md](references/image-operation-routing.md)
and [references/image-output-review.md](references/image-output-review.md).
Read only the purpose craft guide relevant to the current destination.

## Find models and guidance

For Codex built-in images, read
[the ChatGPT Images guide](references/model-guides/image/chatgpt-images-2.5.md).

For external providers, use the existing CLI directly, supplying the installed
provider indexes as repeated `--route-index` arguments when needed:

```bash
renku generation models list --query "<model name or id>" \
  --route-index <provider-skill-dir>/references/supported-routes.json --json
```

Core merges bundled and personal choices. Use the selected route's exact `apiId`
for execution. Visualization preparation independently obtains the complete
selector list; discovery does not need to save it.

Find relevant Markdown under `references/model-guides/` by model name or filename.
Read the useful model and provider advice, following document links as needed.
Choose a route from the user's intent, intended input roles, and the model's
supported inputs together; use the selected live/cached schema for native fields.
The presence or number of images alone does not determine the route. Consult
provider documentation if a consequential input behavior remains unclear.

`generation models show --provider <provider> --model <apiId> --json` returns
`personalGuidePath`; read it if present. Bundled advice and personal notes inform
preparation, while explicit user preferences take priority. A personal display
name does not hide the model's bundled guidance.

Missing routes, guides, or operation advice are ordinary absence:
continue without a warning or approval question. Prepare only the selected route
from its live/cached schema and optional advice; consult provider documentation
when needed. Explain actual input mismatches using that schema or documentation.
Do not prefetch alternative schemas, copy schemas into the library, or introduce
a separate capability check or mandatory transport/output compatibility audit.
The provider schema owns executable fields and constraints.

Before authoring the request, read
`workflowPolicy.enableProviderPromptExpansion`. Inspect the selected route's
live schema and descriptions for one unambiguous control whose meaning is
provider prompt expansion or prompt rewriting. Set that native control to the
Project preference when it exists, omit it when it does not, and consult the
selected provider documentation rather than guessing when the schema is
ambiguous. Never infer the native property from a model name or a checked-in
field-name map. Enabling expansion does not request the slowest expansion mode.
When several enabled modes exist, preserve the schema's enabled default unless
explicit user direction or personal preferences select another mode. If the
default is disabled, use the schema descriptions to choose its ordinary enabled
mode. Show any deliberately selected slower mode and its described latency in
configuration; do not silently promote an enabled preference to maximum quality.
When the provider returns a rewritten or actual prompt, review
it as receipt evidence while preserving the authored prompt unchanged.

| Purpose | Craft guide |
| --- | --- |
| `image.create`, `image.edit` | `image-operation-routing.md`, then `model-guides/shared/image-prompting.md`; also `model-guides/shared/reference-inputs.md` when references are used |
| `project.cover` | `project-cover.md` |
| `lookbook.image` | `lookbook-image.md` |
| `lookbook.video-sheet`, `lookbook.storyboard-sheet` | `lookbook-sheets.md` |
| `cast.character-sheet` | `cast-character-sheets.md` |
| `cast.profile` | `cast-profile.md`; also `voice-over-profile-image.md` when `isVoiceOver` |
| `cast.voice-sample` | `cast-voice-sample.md` |
| `location.sheet`, `location.hero` | `location-sheet.md` |
| `prop.sheet`, `prop.hero` | `prop-sheet.md` |
| `scene.storyboard-sheet` | `scene-storyboard-sheet.md` |
| `shot.image` | `shot-image.md` |
| all `shot-plan.video-*` purposes | `shot-plan-video/index.md`, then `shot-plan-video/workflow.md` |
| `shot-plan.dialogue-audio` | `shot-plan-dialogue-audio.md`, then `model-guides/shared/audio-and-voice.md` and the canonical audio model guide |
| `video.edit` | `video-reference-continuity.md`, then the canonical video edit guide |

For every video workflow, also read
`references/video-reference-continuity.md` after selecting the route and
inspecting its live schema. This is where selected Dialogue Audio becomes the
default for any route that can actually accept uploaded audio references.

## Generation and attachment authorization

A request to generate media authorizes attaching the resulting assets to the
requested destination for every provider, media kind, and purpose. Inspect the
outputs, attach them through the focused Core command with safe provenance,
and report the result and any quality concerns without asking for separate
acceptance or attachment confirmation. Follow explicit preview-only,
leave-unattached, or strict-iteration direction when supplied. Do not invent
another generation to fix a concern without authorization.

Codex built-in generation is part of the current session: do not ask for
generation consent or apply `askBeforeGenerating` to that lane. Use the user's
direction and current Project defaults directly. In the default panel path,
wait for Submit as the combined creative review handoff, including built-in
images. In the Visualize/conversational paths, pause for built-in creative review
only when requested. External-provider spending approval and host permissions
remain governed by their existing rules.

## Choose the generation review surface

Read and follow
[references/generation-review-routing.md](references/generation-review-routing.md)
before configuring or delivering any review. Read
`workflowPolicy.codexGenerationReview` from the CLI generation context and query
the current connection's `generation.review.capabilities` when available.
The global preference defaults to `panel`; it is not a Project setting.
Also read `workflowPolicy.codexGenerationReviewDisplayMode`: `inline` (default)
or `fullscreen`. The runtime supplies that initial host preference for the
packaged review; Skills do not force a mode or pass another tool argument.
The panel combines prompt, references and native settings and never automatically
opens Studio Preview. Codex CLI, Claude and unidentified hosts always require
Studio Preview, even when `workflowPolicy.displayPreview` is false. Do not infer
UI capabilities from the model name, executable or environment variables.

## Configure with Visualize

This section applies only when routing selected `visualize` in Codex desktop.
The default panel follows the shared routing guide instead.

For external-provider requests in Codex, discover Visualize in the available
skills catalog and read its `SKILL.md`. It renders through a content reference;
it does not require a tool named Visualize. An empty tool-name search is not
evidence that the skill is unavailable. When available, show the transient inline
configuration component before authoring the review document. For Codex built-in
generation, use it only when the user
asks to configure or review settings; otherwise prepare the request directly.
Read and follow
[references/inline-generation-configuration.md](references/inline-generation-configuration.md).
This distinction applies to every image, video, and audio purpose in the table
above; running an external provider from Codex is still external generation.

Prepare the initial authored prompt, exact chosen references, and native values
first. Treat explicit user direction or the matching Project Setting only as
the initial selection. Read the selected provider/model's Skill, available advice,
and fresh Core-managed schema snapshot. Create controls only when rebuilding a
template for that selection. Use the inline guide's preparation script for cache
lookup and instance creation before any live schema request: reuse a
compatible entry for 24 hours, refresh it once when expired, and rebuild only
when the schema or template dependencies changed. Use the complete `routes` returned by visualization preparation on a rebuild
to populate the Provider and Model selectors;
never read alternative provider Skills, guides, adapters, docs, or schemas
before the user selects one. A saved Project default counts as a provider
selection; other providers remain explicit one-request choices. Codex appears
only when its built-in image capability is available. The component contains
configuration only and has no tabs or
reference previews. Ordinary image/video references remain review-only in
Generation Preview; bounded purpose-owned choices such as a Cast Voice may
appear as configuration controls. The component calls no Renku or provider API
and never persists choices to Project Settings.

When the user changes Provider or Model, the component explains that the prompt
and settings must be prepared again and sends a reconfiguration follow-up rather
than accepting the old controls. Read only that selected route's Skill, available
advice, and fresh cached or newly fetched schema, recreate the prompt when its
canonical model changed, and rematerialize the same task-local visualization
source file from that route's cached template. When the canonical model is
unchanged, preserve the prompt and only schema-compatible exact native values.
Complete external-provider configuration by rendering the component and ending
the turn with its Visualize content reference, as the Visualize skill requires.
Resume review-document authoring and Generation Preview only after **Continue
with these settings** while the selectors match the prepared route, or explicit
acceptance of the displayed unchanged values. Reading the skill and schema is
preparation, not a substitute for displaying controls. Do not proceed straight
from schema discovery to a review document and Execute.

This interaction is required for external providers in the selected Visualize
desktop path. In another harness, use conversational configuration and mandatory
Studio Preview through the routing guide.

## Review document

Every request uses this irreducible temporary envelope:

```json
{
  "provider": "fal-ai",
  "model": "openai/gpt-image-2",
  "mediaKind": "image",
  "prompt": "Exact authored prompt",
  "request": {
    "prompt": "Exact provider-native prompt",
    "image_url": {
      "$file": "tmp/scratch/reference.png",
      "mimeType": "image/png",
      "reviewLabel": "Opening frame — Shot Plan 01",
      "promptMention": "<exact adapter-resolved mention>"
    }
  }
}
```

The provider Skill owns the exact `model` and provider-native `request` fields.
For Engines providers, `model` is always the selected route's exact `apiId`, as returned by discovery.
Use `{"$file":"<project-relative-path>","mimeType":"image/png","reviewLabel":"<meaningful context label>","promptMention":"<exact model token>"}`
at the exact native media field. `reviewLabel` is required for every Renku
review marker; omit `promptMention` when the selected model uses the input
implicitly according to the selected provider adapter. Do not add domain roles, Asset ids, provider uploads, credentials,
absolute paths, or signed URLs to the envelope.

## Preview and confirmation

These commands are for the Studio Preview paths selected by the routing guide.
The combined panel uses standalone Validate, its Submit/consume handoff, and
validation of accepted edits; it never automatically calls Prepare or Preview.
Outside Codex desktop, Preview is always required regardless of Project settings.

For a single Engines request when Preview is enabled or requested, write the
final request and call Prepare in one tool operation:

```bash
renku generation prepare --file tmp/operations/media-generation/request.json --json
```

It validates and delivers Preview from the same loaded request. Inspect the
returned diagnostics and retain its hash; do not call Validate or Preview again.
With Preview disabled, use `renku generation validate --file <request> --json`.
For Codex documents or several independent requests, use
`renku generation preview show` with repeated `--file` flags in order; validate
Engines requests individually before a combined Preview.
Preview supports conversational review: the user may edit only the top-level
prompt, and Update or Close does not generate media or resume an
agent. For external providers, continue after the required conversational
confirmation. Codex built-in generation continues without a consent pause;
if the user explicitly requested review before execution, wait for their review.
Retain Prepare's (or standalone Validate's) `requestSha256` and pass it as `--expected-request-sha256`
to Execute after confirmation. Execute checks the file itself; no shell hash,
unchanged-file reread, or second Validate call is needed. On
`CLI_GENERATION_REQUEST_CHANGED`, read the edit and reprepare through the provider
Skill. See `references/workflow.md` for the changed-request path. Request writing and Prepare run sequentially in one tool operation, stopping
on failure.

`workflowPolicy.displayPreview` controls automatic Preview only in the explicit
Visualize desktop path. An explicit user Preview request always opens it.
For Codex built-in images in that path, automatic Preview is informational and
does not require a reply. For external providers, `askBeforeGenerating` is one
conversational pause, not an approval token; a confirmation after Preview
satisfies it. Apply the
per-media concurrency setting only to independent requests.

## Execute, recover, and attach

Engines-provider requests execute through the provider Skill:

```bash
renku generation execute \
  --file tmp/operations/media-generation/request.json \
  --output tmp/media/request \
  --expected-request-sha256 <requestSha256-from-preparation>
```

Follow the command-session tracking rules in `references/workflow.md`. A
surrounding script or tool cell finishing without Renku's final structured
result does not mean the provider request or artifact download finished.

If a submitted job times out or becomes interrupted and a request id is known,
use `generation recover` with the unchanged review file and exact request id.
Do not resubmit blindly.

Codex requests invoke the built-in image capability directly without separate
generation consent. They never call Engines commands and never invent an Engines
receipt.

Present returned playable/viewable artifacts as soon as Execute or Recover
finishes, before extended analysis or attachment bookkeeping. In Codex, embed the
exact returned local media path in commentary and continue review; a queued
open-file request alone is not confirmation of visible playback. Label review
as ongoing, without claiming attachment or quality verification yet.
Inspect every output, then attach automatically without an acceptance question.
Execute/Recover automatically saves exact provenance and returns `provenancePath`.
Pass that file directly to import; no extraction or receipt-only recovery is
needed. Default output is compact; use `--json` when code consumes fields.
For Codex, use its safe review envelope as described in `references/workflow.md`.
Never retype receipts, expanded prompts, or provider metadata. Use returned artifact
and attachment paths instead of directory searches or repeated Asset listings.
Attach through the focused destination:

```bash
renku media import --project <project-name> \
  --purpose <purpose> \
  --target <target> \
  --source <project-relative-output> \
  --provenance <returned-provenancePath>
```

For direct completion reading, `media import` without `--json` displays returned
attachment facts and canonical files without echoing the recipe. Choose `--json`
only for programmatic consumption and retain its complete output before displaying
selected completion fields. This format choice also applies to purpose-guide
import examples; grouped and owner-specific workflows still use their focused
commands and must retain complete results when processing them.

Use the existing grouped Storyboard, Cast Voice, or Location World command when
that domain owns the attachment. Pass the same exact safe provenance through
its focused document. For Shot Plan Dialogue Audio, attach the accepted output
with `renku media import --purpose shot-plan.dialogue-audio --target
shot-plan:<id> --turns <N-or-N-M>`. Do not create durable request/job state,
cost approval artifacts, or lifecycle records around generation.

Ordinary external media has no generation provenance. Never fabricate
provenance merely to satisfy a generated-only purpose. Copying and selection
remain Core-owned, and `--select` is used only when selection is part of the
current user intent.

## Purpose routing

Keep the current focused purpose and target vocabulary. Resolve exact ids from
the current handoff or relevant Renku domain command; never invent them. Then
let `generation context` supply the complete related graph.

- `project.cover` targets `project`; `image.create` targets the destination
  `shot-plan:<id>` selected by the image-operation workflow.
- `image.edit` context targets the exact source `asset:<id>`; an accepted output
  attaches through the user's chosen focused destination.
- `video.edit` context and attachment target the exact source `asset:<id>`.
  The accepted output is a separate source-derived video Asset beside the
  source and never replaces or auto-selects it.
- Lookbook media targets `lookbook:<id>`.
- Cast media targets `cast:<id>`.
- Location and Prop media target `location:<id>` and `prop:<id>`.
- Scene Storyboards target `scene:<id>`; Shot images target `shot:<id>`.
- Shot Plan video and auxiliary contexts target `shot-plan:<id>`.
- Dialogue audio targets the exact `shot-plan:<id>` and stores one consecutive,
  inclusive Turn range on each independent audio Take.

Shot Plan generated Assets retain only weak `authoredFrom` context. They do not
become owned by or freeze the Shot Plan.
