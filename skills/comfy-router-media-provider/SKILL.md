---
name: comfy-router-media-provider
description: Author and execute supported Comfy Router image, video, or audio requests when selected by user direction or a saved Project provider preference. Do not choose it automatically as a replacement for another provider.
---

# Comfy Router Media Provider

## Renku Cloud

Comfy Router is not available in Renku Cloud. When the Renku tools
`renku_command`, `renku_upload`, `renku_download`, `renku_view` and
`renku_guide` are present, Renku runs in the person's cloud sandbox, and
nothing there can reach Comfy Router: Renku Cloud holds no Comfy key, and
Comfy Router is not one of the providers it reaches through the person's AI
app.

- Do not prepare, review or send a Comfy Router request in Renku Cloud, and
  skip the steps below.
- Tell the person in one sentence that Comfy Router needs local Renku. Then
  return to Media Producer's route choice, which offers the providers
  available through their AI app. Never switch providers without their choice.
- Comfy Router media already in the Project still shows in Studio and can be
  chosen as a reference for another provider's request.

## Request Preparation And Recovery

Reuse verified command syntax and selected-route discovery within the current request preparation. Follow existing configuration-cache freshness; final native validation and execution remain live boundaries. Do not retry paid execution automatically or replay a successful mutation after CLI026. Provider metadata cache and output writes require host permission, and Preview notification requires local network access. Explain a known denial and use the authorized permission flow instead of repeating it or disabling persistence. Keep Preview, approval, concurrency, output review, and attachment ownership with Media Producer.

## Project Workspace

Keep every agent-created working file inside the current Project's categorized
`tmp/` tree. Never create review JSON, provenance JSON, generated media, QA
evidence, downloads, or scratch files at the Project root.

- Use `tmp/operations/media-generation/` for review documents. Execute/Recover
  saves provenance beside its media and returns `provenancePath` for attachment.
- Use `tmp/media/` for generated or downloaded media.
- Use `tmp/qa/` for review evidence.
- Use `tmp/scratch/` for other temporary inputs.

## Routes

Comfy Router addresses every model by one exact `{provider}/{model}` id, such
as `byteplus/dreamina-seedance-2-5-260628`. One id serves every operation of
that model: the native request body, not a separate route, selects text-to-video,
image-to-video, reference-to-video, or an image edit. The request and result
are the model's own native shapes, not a shared Comfy envelope.

Reuse Media Producer's effective model list when already loaded. Otherwise use
`renku generation models list --provider comfy-router --route-index <absolute-path-to-references/supported-routes.json> --json`
for this provider's bundled and personal discovery choices. Select the exact
`apiId`; an explicitly requested unlisted Comfy Router model id can proceed
without installation. Copy it verbatim into the review document's `model` field
and every generation command. Never substitute a model or rewrite its id.

Find model advice by name under Media Producer's `references/model-guides/`.
Read the [reference inputs](references/adapters/reference-inputs.md) adapter.
Missing advice does not block a supported request; the selected schema and
provider documentation describe its current inputs.
Use `generation models show --provider comfy-router --model <apiId> --json` to
get `personalGuidePath`. Read it if present. Current bundled guidance supplies
the curated default; personal notes add advice and explicit user preferences
take priority. A personal discovery label never suppresses bundled guidance.
Prepare the selected request from its live/cached schema and optional advice.
Consult current provider documentation when necessary. Do not add a separate
capability check or mandatory transport/output compatibility audit.

Media Producer supplies the exact deliberately chosen local files. Do not query
or reinterpret Renku Project relationships. After selecting an exact model, run:

```bash
renku generation schema show --provider comfy-router --model <apiId> --json
```

Treat that raw live input schema as the final authority for fields,
requiredness, enum values, defaults, bounds, and media cardinality. The model
index and editorial guides do not replace it.

Author the exact model-native input as the review document's `request`. Put a
`{"$file":"<project-relative-path>","mimeType":"<mime>","reviewLabel":"<Media Producer label>"}`
marker at each exact native local-media field. Preserve request order and the
meaningful `reviewLabel`. Add `promptMention` only when the selected adapter
explicitly establishes one; the initial adapter establishes none. Do not upload
or encode media yourself; Renku sends each marked file inline when it executes.

Follow Media Producer's shared review routing for validation, panel Submit/consume
or Preview/conversational confirmation,
artifact review, and focused provenance attachment. After confirmation, follow
the shared unchanged-document check and execute once; Execute validates before
submission. Rebuild native prompt fields and revalidate only when edits require
preparation, preserving the exact reference markers.
Use `generation recover` only with a known Comfy Router request id and the
unchanged review document.

An `insufficient_credits` rejection means the Comfy workspace has no credit
balance; tell the user to add credits in their Comfy workspace rather than
switching providers.

Never call the Comfy Router API directly, inspect billing as a runtime
preflight, persist credentials or provider URLs, attach Assets, switch
provider/model on failure, or create durable execution lifecycle, balance, or
approval artifacts.

Renku estimates cost for reviews from Comfy Router's estimate route and cached
prices. Do not write prices into this Skill or the review document; a missing
price follows `model-researcher`'s price research.
