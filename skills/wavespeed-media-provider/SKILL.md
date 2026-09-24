---
name: wavespeed-media-provider
description: Author and execute explicitly selected supported WaveSpeed image, video, or audio requests for Renku Media Producer. Do not use it for automatic Project provider selection.
---

# WaveSpeed Media Provider

## Project Workspace

Keep every agent-created working file inside the current Project's categorized
`tmp/` tree. Never create review JSON, provenance JSON, generated media, QA
evidence, downloads, or scratch files at the Project root.

- Use `tmp/operations/media-generation/` for review and provenance documents.
- Use `tmp/media/` for generated or downloaded media.
- Use `tmp/qa/` for review evidence.
- Use `tmp/scratch/` for other temporary inputs.

WaveSpeed remains an advanced explicit lane.

Use `renku generation models list --provider wavespeed-ai --route-index <absolute-path-to-references/supported-routes.json> --json`
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

When Media Producer is running its Codex inline-configuration flow, a `fresh`
Core-managed generation configuration visualization schema snapshot is this
inspection for pre-review authoring. Do not also run `generation schema show`
during that 24-hour window. Media Producer owns miss, expiry, dependency-change,
and invalidation refreshes; final validation and execution remain authoritative
live boundaries.

Author the provider-native input as `request`, using `$file` markers with Media
Producer's exact `reviewLabel` only at native media fields. Add `promptMention`
only when the selected adapter establishes exact syntax. Engines retrieves
the chosen model's live request schema,
uploads local media, submits, polls, downloads outputs, and returns safe
provenance. Follow Media Producer for Preview, confirmation, review, and
attachment. Never call WaveSpeed directly or persist provider URLs,
credentials, task state, durable execution lifecycle records, or cost-approval artifacts.
