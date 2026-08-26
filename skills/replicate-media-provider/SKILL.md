---
name: replicate-media-provider
description: Author and execute explicitly selected supported Replicate image, video, or audio requests for Renku Media Producer. Do not use it for automatic Project provider selection.
---

# Replicate Media Provider

## Project Workspace

Keep every agent-created working file inside the current Project's categorized
`tmp/` tree. Never create review JSON, provenance JSON, generated media, QA
evidence, downloads, or scratch files at the Project root.

- Use `tmp/operations/media-generation/` for review and provenance documents.
- Use `tmp/media/` for generated or downloaded media.
- Use `tmp/qa/` for review evidence.
- Use `tmp/scratch/` for other temporary inputs.

Replicate is an advanced explicit lane. Read
[references/supported-models.json](references/supported-models.json) and the
listed model guide. Stop when the requested model is absent.

Media Producer supplies the exact deliberately chosen local files. Do not query
or reinterpret Renku Project relationships. The supported-model index is
routing guidance only; run `renku generation schema show --provider replicate
--model <model> --json` for the selected Replicate model's current native fields
and constraints.

Use `owner/model` or the exact pinned `owner/model:version` recorded in the
index. Author the provider-native prediction input as `request`, using `$file`
markers with Media Producer's exact `reviewLabel` at exact native media fields.
Add `promptMention` only from retained editorial model guidance, never from a
hard-coded provider schema. Engines retrieves the selected model's
live input schema, uploads local files, submits, polls, retries eligible
failures, downloads outputs, and returns safe provenance.

Follow Media Producer for Preview, confirmation, artifact review, and focused
attachment. Never call Replicate directly or persist provider URLs, tokens,
prediction state, durable execution lifecycle records, or cost-approval artifacts.
