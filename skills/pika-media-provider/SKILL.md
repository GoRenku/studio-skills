---
name: pika-media-provider
description: Author and execute supported Pika image and video requests for Renku Media Producer. Use after Project Settings or explicit user direction selects Pika; do not use it for Asset attachment decisions.
---

# Pika Media Provider

## Project Workspace

Keep every agent-created working file inside the current Project's categorized
`tmp/` tree. Never create review JSON, provenance JSON, generated media, QA
evidence, downloads, or scratch files at the Project root.

- Use `tmp/operations/media-generation/` for review and provenance documents.
- Use `tmp/media/` for generated or downloaded media.
- Use `tmp/qa/` for review evidence.
- Use `tmp/scratch/` for other temporary inputs.

Use `renku generation models list --provider pika --route-index <absolute-path-to-references/supported-routes.json> --json`
for this provider's bundled and personal discovery choices. Select the exact
`apiId`; an explicitly requested unlisted route can proceed without installation.
Copy it verbatim into the review document's `model` field and every generation
command. Never substitute a model or rewrite its namespace.

For optional advice, independently look up the exact route in
[references/supported-routes.json](references/supported-routes.json). When it has
a `modelKey`, Media Producer may read available guidance from
`model-catalog.json`. Read a useful provider adapter when available. Missing
route entries, keys, model guides, operation guides, or adapters are ordinary
absence of advice: do not warn, stop, or ask approval because of them.
Use `generation models show --provider pika --model <apiId> --json` to get
`personalGuidePath`. Read it if present. Current bundled guidance supplies the
curated default; personal notes add advice and explicit user preferences take
priority. A personal discovery label never suppresses bundled guidance.
Prepare the selected request from its live/cached schema and optional advice.
Consult current provider documentation when necessary. Do not add a separate
capability check or mandatory transport/output compatibility audit.

Media Producer supplies the exact deliberately chosen local files. Do not query
or reinterpret Renku Project relationships. After selecting an exact operation,
run:

```bash
renku generation schema show --provider pika --model <api_id> --json
```

Treat that raw live `input_schema` as the final authority for fields,
requiredness, enum values, defaults, bounds, and media cardinality. The model
index and editorial guides do not replace it.

When Media Producer is running its Codex inline-configuration flow, a `fresh`
Core-managed generation configuration visualization schema snapshot is this
inspection for pre-review authoring. Do not also run `generation schema show`
during that 24-hour window. Media Producer owns miss, expiry, dependency-change,
and invalidation refreshes; final validation and execution remain authoritative
live boundaries.

Author the exact Pika-native input as the review document's `request`. Put a
`{"$file":"<project-relative-path>","mimeType":"<mime>","reviewLabel":"<Media Producer label>"}`
marker at each exact native local-media field. Preserve request order and the
meaningful `reviewLabel`. Add `promptMention` only when the selected adapter
explicitly establishes one; the initial adapter establishes none. Do not upload
media yourself.

Follow Media Producer for validation, Preview, conversational confirmation,
artifact review, and focused provenance attachment. After confirmation, reread
the review file, rebuild any native prompt field from the final top-level
prompt without changing reference markers, validate again, and execute once.
Use `generation recover` only with a known Pika request id and the unchanged
review document.

Never call the Pika API directly, inspect billing as a runtime preflight,
persist credentials or provider URLs, attach Assets, switch provider/model on
failure, or create durable execution lifecycle, pricing, balance, or approval
artifacts.
