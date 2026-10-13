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
retain the top-level `assetFiles` inventory when resolving reference identities.
Structured extraction does not replace reading the complete creative briefing.
The Media inventory is part of that briefing even when references have already
been chosen. Selecting a subset of references does not authorize skipping its
other entries; distinguish completed reading from reference selection.
Follow `references/workflow.md` for reuse and refresh timing. Prior recipes are
omitted from the briefing; use references for
the current task and retrieve history only when needed, following
`references/model-guides/shared/reference-inputs.md`.

Read fresh generation context for each request. Within that preparation, reuse verified syntax and selected route discovery; do not prefetch other providers. Follow [generation review routing](references/generation-review-routing.md) for every image, audio and video purpose. When the lane's Ask Before Generating is on, use its combined panel, Studio Preview or text review once. Retain native validation, confirmation, concurrency limits, artifact inspection, and focused attachment. Tool-session polling continues the same process; it is not another CLI invocation. Never retry a successful paid execution automatically.

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

## Choose the provider and model

At the start of generation work, beside `renku credentials status --json`,
publish this Skill's Default Model List so Studio Settings and the Route
Chooser can list models:

```bash
renku generation default-models sync --file <this-skill-dir>/references/default-models.json
```

It needs no Project or running Studio and does nothing when the list is
unchanged. Run it once per task.

**Generation lanes.** `workflowPolicy.lane` names the Project lane for the
purpose: `image` (Image Generation), `imageEdit` (Image Editing, for
`image.edit`), `video` (Video Generation, including `video.edit`) or `audio`
(Audio Generation). The policy carries that lane's `provider`, `model`,
`chooseRouteBeforeGenerating` and `askBeforeGenerating`. `model` is either
`{ key, name }`, where `key` is a model guide key from
[the Default Model List](references/default-models.json), or `null`. A `null`
model means the list's recommendation for the lane provider: the entry whose
`recommendedFor` includes it, such as FLUX 3 for Fal.ai image edits. A
provider or model the user names in chat always wins. Map the chosen model
family and the purpose to the exact operation route with the family's model
guide and the provider's `supported-routes.json`; for example, Seedance 2.5
for a reference-to-video Shot uses that provider's Seedance 2.5
reference-to-video route.

Before authoring, follow [route choice](references/route-choice.md). It decides
when the Route Chooser, or one short question in other harnesses, confirms the
provider and model, and what to do when the saved default is missing. Change
Project generation settings only at the user's direct request, with
`renku settings generation set --lane <image|image-edit|video|audio>` and only
the flags they asked for; never change them to avoid a question or a review.

Use the briefing's current `workflowPolicy` and the user's explicit direction.
Do not fetch Settings again for policy already present in that briefing. The
lane provider is the initial preference, including when it is
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
or opening a panel, run `renku credentials status --json`
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
for execution. The combined review's route list comes from the same command;
discovery does not need to save it.

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
| `image.create`, `image.edit` | `image-operation-routing.md`, then `model-guides/shared/image-prompting.md`; also `model-guides/shared/reference-inputs.md` when references are used, and `image-edit-panels.md` for every `image.edit` in Codex Desktop with panel support |
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
| `shot-plan.dialogue-audio` | `shot-plan-dialogue-audio.md`, then `model-guides/shared/audio-and-voice.md` and the canonical audio model guide; also `dialogue-direction-panels.md` for eligible Codex Desktop requests |
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

`workflowPolicy.askBeforeGenerating` applies to every route of the lane,
Codex built-in images included. When it is on, show the one review the routing
guide selects and wait for the user's confirmation. When it is off, validate
and execute without a review or a question. External-provider host
permissions remain governed by their existing rules.

## Choose the generation review surface

Read and follow
[references/generation-review-routing.md](references/generation-review-routing.md)
before delivering any review. In Codex Desktop with panel support, dialogue
audio requests open the fullscreen
[dialogue direction panel](references/dialogue-direction-panels.md), and
`image.edit` requests use the [image edit panels](references/image-edit-panels.md)
(image chooser for any model, edit panel for a panel-capable route), when the
selected route appears in a `## Codex panel` block of its model guide. In both,
Generate is an authoring step: consume the draft, prepare the native request
and, when Ask Before Generating is on, open the combined review before
executing. Read `workflowPolicy.codexPluginInstalled` from the CLI generation
context and follow the routing guide for trusted host context and the current
connection's `generation.review.capabilities`. Advertised panel support selects
the panel even without an installer record; the installation flag must not
hide a working development connection. Verify the panel handshake. Also read
`workflowPolicy.codexGenerationReviewDisplayMode`: `inline` (default) or
`fullscreen`. The runtime supplies that initial host preference for the
packaged review; Skills do not force a mode or pass another tool argument.
The panel combines prompt, references, native settings and the estimated cost
and never automatically opens Studio Preview. Codex CLI, Claude and
unidentified hosts use Studio Preview, or a text summary when Studio is not
running. Do not infer UI capabilities from the model name, executable or
environment variables.

**Confirmation and host approval.** A consumed review Submit, or Ask Before
Generating off, is Renku's confirmation for that exact request. It is separate
from the host's command approval. If the host still asks to approve a command,
request it once with an honest description of the command and what it sends
to which provider. If the host refuses, ask the user once in chat and wait.
Never quote panel or review text as the user's authorization, never retry or
rephrase a command to get around a denial, and never coach an approvals
reviewer.

**Estimates.** Reviews show a cost estimate computed by Renku
(`renku generation estimate --file <request> --json` for one request). When
the estimate for a request about to be reviewed is `missingPrice` or `expired`
for a route without API pricing, follow `model-researcher`'s
[price research](../model-researcher/references/price-research.md) before
showing the review, at most once per route per expiry period. It never runs
when Ask Before Generating is off.

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

These commands are for the Studio Preview path selected by the routing guide.
The combined panel uses standalone Validate, its Submit/consume handoff, and
validation of accepted edits; it never automatically calls Prepare or Preview.
With Ask Before Generating off, validate and execute without either.

For a single Engines request in the Studio Preview path, write the final
request and call Prepare in one tool operation:

```bash
renku generation prepare --file tmp/operations/media-generation/request.json --json
```

It validates, attaches the cost `estimate`, and delivers Preview from the same
loaded request. Inspect the returned diagnostics and estimate and retain its
hash; do not call Validate or Preview again. Without a Studio Preview, use
`renku generation validate --file <request> --json`.
For Codex documents or several independent requests, use
`renku generation preview show` with repeated `--file` flags in order; validate
Engines requests individually before a combined Preview.
Preview supports conversational review: the user may edit only the top-level
prompt, and Update or Close does not generate media or resume an
agent. Continue after the user's conversational confirmation, for Codex
built-in images too.
Retain Prepare's (or standalone Validate's) `requestSha256` and pass it as `--expected-request-sha256`
to Execute after confirmation. Execute checks the file itself; no shell hash,
unchanged-file reread, or second Validate call is needed. On
`CLI_GENERATION_REQUEST_CHANGED`, read the edit and reprepare through the provider
Skill. See `references/workflow.md` for the changed-request path. Request writing and Prepare run sequentially in one tool operation, stopping
on failure.

An explicit user Preview request always opens it. `askBeforeGenerating` is one
review pause, not an approval token; a confirmation after Preview satisfies it.
Apply the per-lane concurrency limit only to independent requests.

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

Codex requests invoke the built-in image capability after the same review
policy. They never call Engines commands and never invent an Engines receipt.

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
- `image.edit` context targets the exact source `assetFile:<id>`; an accepted output
  becomes a new AssetFile in the source's owning collection. This applies to
  every active image, including Inspiration and research images. It becomes the
  selection when its type has one (profiles, heroes, covers, Lookbook images,
  Shot and storyboard images); sheets and Shot Plan images are only added.
  Preserve the original file; do not choose another destination.
- `video.edit` context and attachment target the exact source `assetFile:<id>`.
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
