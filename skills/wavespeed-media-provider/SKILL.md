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
[references/supported-routes.json](references/supported-routes.json), select one
exact `apiId` and operation, and stop when it is absent. Copy that `apiId`
verbatim into the review document's `model` field and every generation command.
Give its `modelKey` to Media Producer only for canonical model-guide loading
from `model-catalog.json`. Read the route's adapter when
present; it owns WaveSpeed request mapping, not prompt craft.

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
