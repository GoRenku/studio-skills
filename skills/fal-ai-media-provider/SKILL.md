---
name: fal-ai-media-provider
description: Author and execute supported Fal.ai image, audio, and video requests for Renku Media Producer. Use only after the workflow has selected Fal.ai; do not use it for provider selection or Asset attachment decisions.
---

# Fal.ai Media Provider

## Renku Cloud

Renku runs in Renku Cloud when this skill comes from the `renku-cloud`
plugin (its folder is inside that plugin; Claude Code lists it as
`renku-cloud:<skill>`), or when the Renku tools `renku_command`,
`renku_upload`, `renku_download`, `renku_view` and `renku_guide` are
present. An app may show them with a prefix, such as
`mcp__plugin_renku-cloud_renku__renku_command`. In Renku Cloud, never run a
`renku` command on the computer, even when one is installed there.

When this skill comes from `renku-cloud` and the Renku tools are missing, the
person has not signed in to Renku Cloud yet. Tell them how, and stop until
they have: in Claude Code, type `/mcp` and sign in to
`plugin:renku-cloud:renku`; in the Claude app, open Renku Cloud's Connectors
tab in Customize → Plugins and select Add, then Connect; in the ChatGPT app,
select Connect on Renku Cloud; in the Codex CLI, run `codex mcp login renku`.

In Renku Cloud this section applies and takes precedence over any instruction
below to stop when `renku` is unavailable.

- Run each `renku ...` command through `renku_command`, as a batch of `args`
  lists. There is no shell: no pipes, redirects or `$(...)`. Send the review
  document inline in the command's `files`, under
  `tmp/operations/media-generation/`, and keep your own copy on your computer.
- Read this skill's adapters and Media Producer's model guides from your
  installed plugin. For `--route-index`, pass
  `skill:fal-ai-media-provider/references/supported-routes.json`. Read
  personal model notes with
  `generation models guide show --provider fal-ai --model <apiId>` instead of
  opening `personalGuidePath`.
- Renku Cloud holds no fal.ai key. Before preparing, check that fal.ai's MCP
  server is connected in your AI app. If it is not, ask the person to connect
  it and wait; never ask for a key.
- `generation schema show`, `validate`, `prepare` and `estimate` work without
  a key. When a schema cannot be read (`ENGINE_CATALOG_KEY_REQUIRED`), fetch
  it with fal.ai's MCP schema tool and save it with `generation schema record`.
  A `missingPrice` estimate can come from fal.ai here: take the price from
  fal.ai's MCP server when it offers one, otherwise follow `model-researcher`,
  and record it with `generation price record`.
- Keep the `$file` markers below in the review document. The native request
  carries them as links.
- The host permission and local network rules below do not apply. Renku
  refuses its Execute and Recover steps: generate as
  [Renku Cloud Generation](#renku-cloud-generation) describes.

## Request Preparation And Recovery

Reuse verified command syntax and selected-route discovery within the current request preparation. Follow existing configuration-cache freshness; final native validation and execution remain live boundaries. Do not retry paid execution automatically or replay a successful mutation after CLI026. Provider metadata cache and output writes require host permission, and Preview notification requires local network access. Explain a known denial and use the authorized permission flow instead of repeating it or disabling persistence. Keep Preview, approval, concurrency, output review, and attachment ownership with Media Producer.

## Renku Cloud Generation

In Renku Cloud, the person's AI app sends the request through fal.ai's own MCP
server, and their fal.ai account pays for it. Media Producer's
[Renku Cloud guide](../media-producer/references/renku-cloud.md) has the whole
flow; these are fal.ai's parts.

1. Prepare and review the request as Media Producer describes: the review
   panel, or `generation prepare` or `generation preview show` for Studio
   Preview. After approval, get the exact request with
   `generation native-request` and the review's `requestSha256`. Its reference
   links stay readable for 24 hours.
2. Submit it with fal.ai's MCP tool that queues a request, passing the
   request's route (the `apiId`) and native input exactly as given. Keep at
   most `workflowPolicy.concurrencyLimit` fal.ai jobs running at once.
3. Record the job with `generation job record` as soon as fal.ai returns its
   request id; that id is the `providerJobId`. For a Seedance 2.5 draft, add
   the result's `draft_id` as `draftId`.
4. Check with fal.ai's status tool until the request completes, then fetch its
   result. A queued request can take minutes: check again, never submit again.
5. A result can list several files, for example under `images`. Upload every
   file link in one `renku_upload` call and import them in one
   `media import --file` list, each with the same job and receipt.
6. Write the receipt with the fields local Renku keeps:
   `{"requestId": "<fal.ai request id>", "draft_id": "<only when the result has one>"}`.
   Leave out the result's file links and anything secret. Renku refuses a
   receipt holding a secret or a signed link, naming the field.
7. Import with `media import --job <job id> --receipt <receipt file>`.

fal.ai's MCP server is the only way to reach fal.ai here; never call its API
with a key yourself. If its tools cannot send the native input exactly, stop
and tell the person rather than sending a changed request. A request fal.ai
reports as failed ends with `generation job close --job <id> --reason failed`.

## Project Workspace

Keep every agent-created working file inside the current Project's categorized
`tmp/` tree. Never create review JSON, provenance JSON, generated media, QA
evidence, downloads, or scratch files at the Project root.

- Use `tmp/operations/media-generation/` for review documents. Execute/Recover
  saves provenance beside its media and returns `provenancePath` for attachment.
- Use `tmp/media/` for generated or downloaded media.
- Use `tmp/qa/` for review evidence.
- Use `tmp/scratch/` for other temporary inputs.

Reuse Media Producer's effective model list when already loaded. Otherwise use
`renku generation models list --provider fal-ai --route-index <absolute-path-to-references/supported-routes.json> --json`
for this provider's bundled and personal discovery choices. Select the exact
`apiId`; an explicitly requested unlisted route can proceed without installation.
Copy it verbatim into the review document's `model` field and every generation
command. Never substitute a model or rewrite its namespace.

Find model advice by name under Media Producer's `references/model-guides/`.
For Seedance 2.5 previews or completion of a saved draft, read
[the draft workflow](../media-producer/references/model-guides/video/seedance-2.5/draft-mode.md).
Execute and Recover preserve the provider's `draft_id` in the opaque receipt;
return the saved `provenancePath` unchanged so Media Producer can retain it with
the video. To finish a saved draft, use its saved receipt's `draft_id` with the
matching completion route, not its request id or today's default route. Keep
Project selection and attachment decisions with Media Producer.
Read relevant provider guidance: [reference inputs](references/adapters/reference-inputs.md), [seed audio](references/adapters/seed-audio.md).
Missing advice does not block a supported request; the selected schema and
provider documentation describe its current inputs.
Use `generation models show --provider fal-ai --model <apiId> --json` to get
`personalGuidePath`. Read it if present. Current bundled guidance supplies the
curated default; personal notes add advice and explicit user preferences take
priority. A personal discovery label never suppresses bundled guidance.
Prepare the selected request from its live/cached schema and optional advice.
Consult current provider documentation when necessary. Do not add a separate
capability check or mandatory transport/output compatibility audit.

Media Producer supplies the exact deliberately chosen local files. Do not query
or reinterpret Cast, Location, Prop, Lookbook, Scene, Shot, or Shot Plan
relationships. The supported-route index is routing guidance only; run `renku
generation schema show --provider fal-ai --model <api_id> --json` for the
selected Fal operation's current native fields and constraints.

Author the exact Fal.ai input object as the review document's `request`. Put a
`{"$file":"<project-relative-path>","mimeType":"<mime>","reviewLabel":"<Media Producer label>"}`
marker at each native image/video field. Preserve the exact `reviewLabel`, and
add the exact `promptMention` only when the selected adapter establishes one
after final request order is known. Do not upload media yourself.

For Seed Audio, place one local audio marker per selected speaker sample in the
native `audio_urls` array and follow `adapters/seed-audio.md` for exact
`@AudioN` mention ordering. Never send more than three local voice references.

Follow Media Producer's shared review routing for validation and confirmation:
panel Submit/consume, or Preview/conversation only when that routing selects it.
After confirmation, an unchanged prepared request goes directly to
`renku generation execute`, which validates before submission. Follow the shared
changed-document procedure when edits require preparation. Use
`generation recover` only with a known Fal request id and the unchanged review
document. Return the artifacts and exact safe provenance to Media Producer.

Do not call the Fal SDK or API directly, attach Assets, invent provider fields,
or persist credentials, upload URLs, signed output URLs, or durable execution
lifecycle records.

Renku estimates cost for reviews from cached provider prices. Do not write
prices into this Skill or the review document; a missing price
follows `model-researcher`'s price research.
