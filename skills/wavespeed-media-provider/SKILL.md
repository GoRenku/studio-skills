---
name: wavespeed-media-provider
description: Author and execute supported WaveSpeed image, video, or audio requests when selected by user direction or a saved Project provider preference. Do not choose it automatically as a replacement for another provider.
---

# WaveSpeed Media Provider

## Renku Cloud

When the Renku tools `renku_command`, `renku_upload`, `renku_download`,
`renku_view` and `renku_guide` are present, Renku runs in Renku
Cloud and this section applies. It takes precedence over any instruction
below to stop when `renku` is unavailable.

- Run each `renku ...` command through `renku_command`, as a batch of `args`
  lists. There is no shell: no pipes, redirects or `$(...)`. Send the review
  document inline in the command's `files`, under
  `tmp/operations/media-generation/`, and keep your own copy on your computer.
- Read this skill's adapters and Media Producer's model guides from your
  installed plugin. For `--route-index`, pass
  `skill:wavespeed-media-provider/references/supported-routes.json`. Read
  personal model notes with
  `generation models guide show --provider wavespeed-ai --model <apiId>`
  instead of opening `personalGuidePath`.
- Renku Cloud holds no WaveSpeed key. Before preparing, check that
  WaveSpeed's MCP server is connected in your AI app. If it is not, ask the
  person to connect it and wait; never ask for a key.
- `generation schema show`, `validate`, `prepare` and `estimate` work without
  a key. When a schema cannot be read (`ENGINE_CATALOG_KEY_REQUIRED`), fetch
  it with WaveSpeed's MCP schema tool and save it with
  `generation schema record`. When an estimate is `missingPrice`, take the
  price from WaveSpeed's MCP price tool and record it with
  `generation price record`, then refresh the review.
- Keep the `$file` markers below in the review document. The native request
  carries them as links.
- The host permission and local network rules below do not apply. Renku
  refuses its Execute and Recover steps: generate as
  [Renku Cloud Generation](#renku-cloud-generation) describes.

## Request Preparation And Recovery

Reuse verified command syntax and selected-route discovery within the current request preparation. Follow existing configuration-cache freshness; final native validation and execution remain live boundaries. Do not retry paid execution automatically or replay a successful mutation after CLI026. Provider metadata cache and output writes require host permission, and Preview notification requires local network access. Explain a known denial and use the authorized permission flow instead of repeating it or disabling persistence. Keep Preview, approval, concurrency, output review, and attachment ownership with Media Producer.

## Renku Cloud Generation

In Renku Cloud, the person's AI app sends the request through WaveSpeed's own
MCP server, and their WaveSpeed account pays for it. Media Producer's
[Renku Cloud guide](../media-producer/references/renku-cloud.md) has the whole
flow; these are WaveSpeed's parts.

1. After approval, get the exact request with `generation native-request` and
   the review's `requestSha256`. Its reference links stay readable for 24
   hours.
2. Submit it with WaveSpeed's MCP generation tool, passing the request's route
   (the `apiId`) and native input exactly as given. Keep at most
   `workflowPolicy.concurrencyLimit` WaveSpeed tasks running at once.
3. The tool waits up to 100 seconds. A task that finishes in time comes back
   with its result; a longer one comes back with its task id only.
4. Record the job with `generation job record` as soon as you have the task
   id, even when the result came with it; that id is the `providerJobId`.
5. For an unfinished task, check with WaveSpeed's result tool until it
   completes. Check again rather than submitting again.
6. The result lists its files under `outputs`, often more than one. Upload
   every link in one `renku_upload` call and import them in one
   `media import --file` list, each with the same job and receipt.
7. Write the receipt with the fields local Renku keeps:
   `{"requestId": "<task id>", "status": "<the task's final status>", "timings": <the result's timings, only when present>}`.
   Leave out the output links and anything secret. Renku refuses a receipt
   holding a secret or a signed link, naming the field.
8. Import with `media import --job <job id> --receipt <receipt file>`.

WaveSpeed's MCP server is the only way to reach WaveSpeed here; never call its
API with a key yourself. If its tools cannot send the native input exactly,
stop and tell the person rather than sending a changed request. A task
WaveSpeed reports as failed ends with
`generation job close --job <id> --reason failed`.

## Project Workspace

Keep every agent-created working file inside the current Project's categorized
`tmp/` tree. Never create review JSON, provenance JSON, generated media, QA
evidence, downloads, or scratch files at the Project root.

- Use `tmp/operations/media-generation/` for review documents. Execute/Recover
  saves provenance beside its media and returns `provenancePath` for attachment.
- Use `tmp/media/` for generated or downloaded media.
- Use `tmp/qa/` for review evidence.
- Use `tmp/scratch/` for other temporary inputs.

Use WaveSpeed when explicit user direction or a saved Project provider
preference selects it. Do not switch to it automatically from another provider.

Reuse Media Producer's effective model list when already loaded. Otherwise use
`renku generation models list --provider wavespeed-ai --route-index <absolute-path-to-references/supported-routes.json> --json`
for this provider's bundled and personal discovery choices. Select the exact
`apiId`; an explicitly requested unlisted route can proceed without installation.
Copy it verbatim into the review document's `model` field and every generation
command. Never substitute a model or rewrite its namespace.

Find model advice by name under Media Producer's `references/model-guides/`.
Read relevant provider guidance: [reference inputs](references/adapters/reference-inputs.md), [seed audio](references/adapters/seed-audio.md).
Missing advice does not block a supported request; the selected schema and
provider documentation describe its current inputs.
Use `generation models show --provider wavespeed-ai --model <apiId> --json` to get
`personalGuidePath`. Read it if present. Current bundled guidance supplies the
curated default; personal notes add advice and explicit user preferences take
priority. A personal discovery label never suppresses bundled guidance.
Prepare the selected request from its live/cached schema and optional advice.
Consult current provider documentation when necessary. Do not add a separate
capability check or mandatory transport/output compatibility audit.

Media Producer supplies the exact deliberately chosen local files. Do not query
or reinterpret Renku Project relationships. The supported-route index is
routing guidance only; run `renku generation schema show --provider
wavespeed-ai --model <api_id> --json` for the selected WaveSpeed operation's
current native fields and constraints.

Author the provider-native input as `request`, using `$file` markers with Media
Producer's exact `reviewLabel` only at native media fields. Add `promptMention`
only when the selected adapter establishes exact syntax. Engines retrieves
the chosen model's live request schema,
uploads local media, submits, polls, downloads outputs, and returns safe
provenance. Follow Media Producer's shared review routing for panel Submit/consume
or Preview/conversational confirmation, review, and
attachment. Never call WaveSpeed directly or persist provider URLs,
credentials, task state, or durable execution lifecycle records.

Renku estimates cost for reviews from cached provider prices. Do not write
prices into this Skill or the review document; a missing price
follows `model-researcher`'s price research.
