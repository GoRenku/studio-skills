# Provider-Skill Media Generation Workflow

Begin with `renku generation context --purpose <purpose> --target <target>`.
For Scene Storyboards, add the exact `--revision` and repeated `--beat`
scope. Use the returned typed Project/target context, Lookbooks, policy,
guidance, suggestions, and warnings as the briefing before selecting a provider.

Core suggestions describe real Project relationships but do not limit creative
choice. Deliberately choose, omit, supplement, or replace references after
inspection and user direction. Pass only those exact choices to the selected
provider Skill. Do not make provider Skills rediscover Cast, Location, Prop,
Lookbook, Scene, Shot, or Shot Plan relationships.

For video work, resolve Dialogue Audio continuity with
`video-reference-continuity.md` only after selecting the exact route and
reading its live schema. `isWorkflowSelected` records user-authored workflow
intent; it is distinct from common Asset display selection.

## Efficient Command Use

1. Resolve the requested Project once and use its absolute Project folder as
   the working directory, respecting each command's targeting flags. Keep
   temporary paths project-relative under `tmp/`. When no Project is named,
   `renku project current --json` returns `project.projectName` and
   `project.projectFolder`. If it resolves the requested context, continue there;
   do not enumerate sibling folders or read other Projects' `info show` reports.
   Resolve another Project only for an explicit different target or unresolved
   identity. Reuse a Project already resolved by the calling workflow.
2. Read generation context once. Use text for direct briefing consumption, or
   request `--json` from the start when the next operation processes the report
   in code. Honor an explicit user format choice. These are alternatives, not
   successive steps; neither format omits information supplied by the other.
   Purpose guides inherit this rule. Never pipe default text to `jq`; JSON does
   not itself require Python. Print readable command output directly rather
   than JSON-encoding it in a tool-result wrapper.
3. Read complete current documents, policy, guidance, warnings, and media roles;
   inspect chosen media too. If saving output is useful, capture that same call
   to a unique file under `tmp/scratch/` and check success before reading it.
   Do not repeat a successful call to save it or routinely fetch both formats.
   Keep the briefing separate from large guide reads: the enclosing tool's
   aggregate output limit applies even when individual command limits suffice.
   For a long captured report, determine its extent and read contiguous bounded
   ranges from the beginning through EOF. Continue from the last fully displayed
   line; if a page is clipped, reduce its size and recover the unread portion
   from the same file. Before authoring, check that no ranges were skipped,
   including the final media entries and warnings. Heading searches may help
   navigation but do not count as reading the intervening content. Apply this
   procedure to text and JSON for every purpose. A parsed identity mapping alone
   does not establish that the creative documents were read. Reuse a current
   saved report when it supplies the needed format.
4. Reuse within unchanged preparation. Refresh after changed scope, relevant
   user edits, imported/replaced references, changed design/Lookbook/policy,
   known external mutation, or uncertain intervening state. This is task-local
   reasoning, not a persistent cache or rigid call limit.
5. If a hero will consume a new sheet, inspect and attach the sheet under current
   authorization first, then fetch hero context once. Do not prefetch context
   that must be replaced. Independent requests may run together within limits.
6. Read each relevant guide once per unchanged workflow; reread for a changed
   operation or missing context. Reuse selected-route discovery and fresh
   configuration templates; do not prefetch other providers or add an unsolicited
   Codex configuration step.
7. Read the final request once after permitted Preview edits, immediately before
   execution. Execute and record those exact values. Avoid an initial full dump
   followed by an identical second read, and never reuse stale pre-Preview values.
   For Engines providers, execute the final review file with `--file`. For Codex,
   parse that file and pass its native request values to the built-in capability,
   resolving safe file markers in order. Do not retype the prompt into a second
   tool-call literal. This rule covers every destination, not only sheets.

The readable Media section contains each Asset and its files once. Reference
Suggestions distinguishes role, subject, availability, display selection, and
workflow selection. In JSON, resolve each candidate's `assetId` and `assetFileId`
through `assets`; subject `assetIds`, Shot `imageAssetIds`, Lookbook `assetId`,
and Voice `sampleAssetId` refer to the same inventory. Preserve opaque
`voiceIdentity` when the provider needs it. Full designs remain in `activeDesign`
with `activeDesignId`; exact edit and Shot targets use `assetId` and `shotId`.
Suggestions are not the full media inventory: other returned alternatives remain
usable. A changed task or Project state may justify another read; a routine
text-then-JSON sequence to discover missing fields should not be necessary.

Use the mutation report's `valid`, `asset.id`, and `asset.files` to confirm a
media import. It does not expose display selection. When confirming an imported
Hero's selected state, capture `renku asset list --project <project-name>
--owner location:<location-id> --json` once and compare its top-level
`selectedAssetId` with the imported `asset.id`. Print that comparison, not the
full Asset history. For other selectable owners use their exact owner syntax;
Location Sheets have no global selection. A focused selection command already
returns `selectedAssetId`, so it needs no extra list call. Do not search Asset
properties or department context for selection flags.

Generation context
omits prior Asset recipes even for exact edit sources. Use references for their
intended contribution to the current request; consult the shared reference-input
guide for deliberate history access instead of retrieving history by default.

Use repeated `--file` on generation preview show to review prepared requests
together when appropriate. Retain applicable validation, configuration, Preview,
approval, concurrency limits, artifact inspection, and focused attachment.
Tool-session polling continues the same process; it is not another CLI
invocation. Never retry a successful paid execution automatically.

Consult the relevant CLI reference/help once if syntax is unknown, then reuse verified syntax for this task. Do not discover syntax by attempting mutations. Do not invent `project list`. If a known permission denial blocks cache/output/config or local-network access, explain the requirement and use the authorized host permission flow; do not repeat the denied attempt, read secrets, disable cache persistence, or change permissions. `CLI026` means the mutation succeeded: report the notification warning without replaying the mutation.

## Author one provider-native request

Delegate request fields and model choice to the matching provider Skill. Write
one unique JSON document under `tmp/operations/media-generation/`:

```json
{
  "provider": "elevenlabs",
  "model": "eleven_multilingual_v2",
  "mediaKind": "audio",
  "prompt": "The exact dialogue and performance direction",
  "request": {
    "text": "The exact spoken text",
    "voice": "exact-provider-voice-id",
    "voice_settings": { "stability": 0.5 }
  }
}
```

`request` is the exact native provider input. Its contents remain opaque to
Core and Studio. A local file is encoded only at the native file/URL field as
`{"$file":"<registered-AssetFile-projectRelativePath>","mimeType":"image/png","reviewLabel":"Meaningful context label"}`.
Add `promptMention` only when the selected provider adapter documents exact
provider-visible syntax. Derive any ordinals from the final native request
order. Canonical model guides remain provider-neutral. Do not add a Renku
purpose, target, domain reference role, estimate, or execution state.

Apply `workflowPolicy.enableProviderPromptExpansion` only when the selected
live schema exposes one semantically unambiguous prompt-expansion or rewriting
control. Set that native control to the Project value, omit it when absent, and
consult provider documentation when ambiguous. Do not maintain a model or
property-name map in this workflow. Preserve the authored prompt even when the
provider returns rewritten/actual prompt evidence for review.

## Validate and Preview

### Register prepared Shot Plan references

Prepare and inspect new frames, video excerpts, and audio excerpts in
`tmp/media/`. Before including a chosen derivative in a Shot Plan request,
register it through Core:

```bash
renku shot-plan reference import --project <name> --shot-plan <id> --previs-revision <exact-revision-id> --source <prepared-project-relative-file> --media-kind <image|video|audio> --title <authored-title> --summary <source-Asset/File-and-exact-extraction-facts> --json
```

The revision is required for Previs and omitted for other Plan types. Use the
returned AssetFile `projectRelativePath` in the request; never construct a
canonical path or register a temporary file in place. The command copies the
bytes and preserves the original. Record exact source ids, frame/sample
intervals, offsets and time maps in the authored summary when applicable.
Local extraction has no AI generation receipt: do not fabricate provenance.
AI-generated reference images still use the normal provenance-bearing
`renku media import` path with the exact `--previs-revision` when applicable.

Reuse already registered files directly, including Cast/Location/Prop sheets.
On resumption reuse the exact imported Asset instead of importing it again.
Unchosen candidates and QA material may remain temporary. Check the structured
Preview reference availability before asking for generation confirmation;
resolve unavailable intended inputs without silently dropping them.

### Validate and deliver the request

For Engines providers:

```bash
renku generation validate --file tmp/operations/media-generation/request.json --json
```

Open Preview when Project policy enables it or the user asks:

```bash
renku generation preview show --file tmp/operations/media-generation/request.json --json
```

For an ordered set, repeat `--file` in the requested order. Stop when delivery
fails; later individual notifications would replace the combined dialog.

Preview permits editing only the top-level prompt. References and native
configuration are read-only. The user continues in the ordinary conversation;
there is no Generate button, approval token, correlation id, or agent-resume
callback.

Codex built-in generation needs no generation consent: automatic Preview is
informational, and `askBeforeGenerating` does not pause that lane. Wait only
when the user explicitly requested review before execution. External-provider
confirmation follows the existing policy in `SKILL.md`.

Immediately before execution, reread the document. If the prompt changed, rebuild the
provider-native prompt-bearing fields through the provider Skill, revalidate,
and atomically replace `request`. Do not search the opaque JSON for prompt-like
keys.

## Execute or recover

Treat the local command session as the authority for whether Execute or Recover
is still running. Long provider polling and artifact downloads commonly outlive
an individual tool yield.

- Preserve the command runner's complete result, including its session handle,
  output, and exit code. Never print or retain only an initially empty `output`
  field.
- When the runner returns a live session handle, poll that same command session
  until it returns a terminal exit code. In Codex harnesses, use the returned
  `session_id` with `write_stdin`; do not substitute a wait on the surrounding
  JavaScript/tool cell.
- If the surrounding cell itself yields, its wait handle resumes only that
  cell. A message such as `Script completed` with no Renku JSON, request id,
  artifact, or exit code is not provider completion.
- Do not use a separate `ps` invocation or an early missing-output-directory
  check as proof that the isolated command stopped. Keep polling the original
  command handle.
- Announce success only after the terminal command result has exit code zero and
  the structured Renku result identifies the request and downloaded artifacts.
  Announce failure or interruption from the terminal structured result, not from
  silence.

When nested command and cell runners have independent yield timers, make the
inner command yield first so its session handle can be captured before the outer
cell yields. Always surface the whole inner result. This avoids losing a live
command when both layers reach the same yield boundary.

```bash
renku generation execute \
  --file tmp/operations/media-generation/request.json \
  --output tmp/media/request \
  --json
```

One execute call is one logical provider request. The result contains the
downloaded artifacts, provider/model/request id when available, and a safe
`provenance` value. It contains no durable Renku job or Run.

If a command handle is nevertheless lost, keep the request indeterminate. Do
not resubmit. First allow the original execution time to elapse and recheck the
exact output path and any late command-completion result. Query provider history
only when needed to recover the exact request id. Run Recover only when that
request id is known and the local artifact is still absent or invalid.

When execution reports a known provider request id but cannot finish polling,
recover the same request rather than submitting again:

```bash
renku generation recover \
  --file tmp/operations/media-generation/request.json \
  --request-id <provider-request-id> \
  --output tmp/media/request \
  --json
```

Recovery uses the unchanged provider/model/request envelope. Change the review
document only for a deliberate new generation.

## Inspect and attach

Inspect every artifact, then automatically attach generated assets to the
requested destination across all providers, media kinds, and purposes. Report
quality concerns without asking for output acceptance or attachment consent.
Only explicit review-only, leave-unattached, or strict-iteration instructions
change that default; unusable files or unresolved destinations remain blockers.
Persist the exact safe `provenance` value from Execute/Recover in a unique JSON
file under `tmp/operations/media-generation/`, then pass it through the focused
attachment command with `renku media import --provenance` or the focused grouped
Storyboard, Cast Voice, dialogue, or Location World command.

Never manually copy into canonical Asset folders or write Project SQLite.
Asset Inspection later reads saved provenance through the same shared Prompt,
References, and Configuration view as Preview. Inspection is read-only.

## Codex built-in images

Codex is a harness capability, not an Engines provider. Use it only when the
active harness exposes built-in image generation and selected policy or user
direction chooses it. Author the same review envelope with `provider: "codex"`,
`model: "chatgpt-images-2.5"`, and `mediaKind: "image"`. This identifies the
Codex product family; it does not assert a Flare or Sunburst API variant.

Use the user's direction and Project defaults without a configuration or
generation consent pause. Show configuration only if requested; automatic
Preview is informational. Invoke the built-in capability directly, respecting
an explicit request to review before execution. Create safe provenance with the exact final
prompt/request and no invented receipt. Attach it through the same
`--provenance` boundary.

Author the review document's `request` with the actual built-in capability
fields from the start. For example, a file-backed image reference uses
`referenced_image_paths`, not a separate generic reference list:

```json
{
  "provider": "codex",
  "model": "chatgpt-images-2.5",
  "mediaKind": "image",
  "prompt": "The exact current generation prompt",
  "request": {
    "prompt": "The exact current generation prompt",
    "referenced_image_paths": [
      { "$file": "<registered-AssetFile-projectRelativePath>", "mimeType": "image/png", "reviewLabel": "Production Lookbook appearance reference" }
    ],
    "transparent_background": false
  }
}
```

Omit reference fields for a request with no references; use the current tool's
conversation-image mechanism when appropriate. Resolve local-file markers to
absolute paths for the tool invocation, preserving reference order. Keep safe
markers in the stored request. Read the final post-Preview values for execution
and retain that same envelope for provenance; matching two prompt fields alone
does not establish that an earlier tool-call literal is still current.

When the final review envelope contains only the five fields above, pass that
file directly as `--provenance`. Otherwise copy those five fields into a unique
provenance JSON file. Preserve the actual executed request, including background
and reference choices, with safe local-file markers and no invented receipt.
Use this structure rather than opening another Asset's historical recipe as a
format example. Inspect and copy the generated file, prepare provenance when
needed, and import in one shell operation where practical; check each operation
succeeded before the next. Visual inspection still precedes attachment.
