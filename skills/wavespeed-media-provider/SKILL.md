---
name: wavespeed-media-provider
description: Author and execute explicitly selected supported WaveSpeed image or video requests for Renku Media Producer. Do not use it for automatic Project provider selection.
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

WaveSpeed is an advanced explicit lane. Read
[references/supported-models.json](references/supported-models.json) and the
listed guide. Stop when the requested model is absent; exact model identifiers
are part of the contract.

Media Producer supplies the exact deliberately chosen local files. Do not query
or reinterpret Renku Project relationships. The supported-model index is
routing guidance only; run `renku generation schema show --provider
wavespeed-ai --model <model> --json` for the selected WaveSpeed operation's
current native fields and constraints.

Author the provider-native input as `request`, using `$file` markers with Media
Producer's exact `reviewLabel` only at native media fields. Add `promptMention`
only from retained editorial guidance for the exact model. Engines retrieves
the chosen model's live request schema,
uploads local media, submits, polls, downloads outputs, and returns safe
provenance. Follow Media Producer for Preview, confirmation, review, and
attachment. Never call WaveSpeed directly or persist provider URLs,
credentials, task state, durable execution lifecycle records, or cost-approval artifacts.
