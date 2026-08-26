---
name: elevenlabs-media-provider
description: Author and execute supported ElevenLabs speech or music requests for Renku Media Producer. Use for direct audio generation, not voice browsing or Cast Voice attachment ownership.
---

# ElevenLabs Media Provider

## Project Workspace

Keep every agent-created working file inside the current Project's categorized
`tmp/` tree. Never create review JSON, provenance JSON, generated media, QA
evidence, downloads, or scratch files at the Project root.

- Use `tmp/operations/media-generation/` for review and provenance documents.
- Use `tmp/media/` for generated or downloaded media.
- Use `tmp/qa/` for review evidence.
- Use `tmp/scratch/` for other temporary inputs.

Read [references/supported-routes.json](references/supported-routes.json), select
one exact route and operation, and stop when it is absent. Give its `modelKey`
to Media Producer, which loads the canonical speech or music guide from
`model-catalog.json`.

Media Producer supplies the exact text, voice choice, and any deliberate local
inputs. Do not query or reinterpret Renku Project relationships. The
supported-route index is routing guidance only; read the selected ElevenLabs
operation's current request facts for native fields and constraints.

For speech, author exact `text`, provider `voice` id, and optional native
`voice_settings`/`output_format`. For music, author exact `prompt` and optional
native duration/instrumental fields. Local-media markers are unsupported.

Follow Media Producer for Preview and conversational confirmation. Engines owns
the ElevenLabs SDK call, retry, stream collection, output file, and safe
provenance. Return the accepted output for focused media import or Cast Voice
attachment. Voice listing and sample retrieval remain focused Renku operations,
not generic generation requests.

Never call the SDK directly, invent a voice id, attach Cast Voice records,
persist credentials, or create durable execution lifecycle records or
cost-approval artifacts.
