---
name: fal-ai-media-provider
description: Author and execute supported Fal.ai image, audio, and video requests for Renku Media Producer. Use only after the workflow has selected Fal.ai; do not use it for provider selection or Asset attachment decisions.
---

# Fal.ai Media Provider

## Project Workspace

Keep every agent-created working file inside the current Project's categorized
`tmp/` tree. Never create review JSON, provenance JSON, generated media, QA
evidence, downloads, or scratch files at the Project root.

- Use `tmp/operations/media-generation/` for review and provenance documents.
- Use `tmp/media/` for generated or downloaded media.
- Use `tmp/qa/` for review evidence.
- Use `tmp/scratch/` for other temporary inputs.

Use `renku generation models list --provider fal-ai --route-index <absolute-path-to-references/supported-routes.json> --json`
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

When Media Producer is running its Codex inline-configuration flow, a `fresh`
Core-managed generation configuration visualization schema snapshot is this
inspection for pre-review authoring. Do not also run `generation schema show`
during that 24-hour window. Media Producer owns miss, expiry, dependency-change,
and invalidation refreshes; final `generation validate` and `generation
execute` remain authoritative live boundaries.

Author the exact Fal.ai input object as the review document's `request`. Put a
`{"$file":"<project-relative-path>","mimeType":"<mime>","reviewLabel":"<Media Producer label>"}`
marker at each native image/video field. Preserve the exact `reviewLabel`, and
add the exact `promptMention` only when the selected adapter establishes one
after final request order is known. Do not upload media yourself.

For Seed Audio, place one local audio marker per selected speaker sample in the
native `audio_urls` array and follow `adapters/seed-audio.md` for exact
`@AudioN` mention ordering. Never send more than three local voice references.

Follow Media Producer for Preview and conversational confirmation. Then call
`renku generation validate` and `renku generation execute` once. Use
`generation recover` only with a known Fal request id and the unchanged review
document. Return the artifacts and exact safe provenance to Media Producer.

Do not call the Fal SDK or API directly, attach Assets, invent provider fields,
or persist credentials, upload URLs, signed output URLs, durable execution
lifecycle records, or cost-approval artifacts.
