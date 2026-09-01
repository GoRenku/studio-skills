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
one exact `apiId` and operation, and stop when it is absent. Copy that `apiId`
verbatim into the review document's `model` field and every generation command.
Give its `modelKey` to Media Producer only for loading the canonical speech or
music guide from `model-catalog.json`.

Media Producer supplies the exact text, voice choice, and any deliberate local
inputs. Do not query or reinterpret Renku Project relationships. The
supported-route index is routing guidance only; read the selected ElevenLabs
operation's current request facts for native fields and constraints.

For speech, author exact `text`, provider `voice` id, and optional native
`voice_settings`/`output_format`. Resolve that id only from the selected Cast
Voice's opaque identity when it has `provider: "elevenlabs"` and a non-empty
`voiceId`; otherwise stop rather than inventing one. For music, author exact
`prompt` and optional native duration/instrumental fields. Local-media markers
are unsupported.

For `voice-sample-audio`, author `voiceId` from the same opaque Cast Voice
identity and optional `apiBaseUrl` only when the user deliberately selected a
non-default endpoint. This is sample retrieval, not TTS: do not add `text`,
speech settings, or local reference media. Engines owns the authenticated
download and returns normal audio generation provenance.

Follow Media Producer for Preview and conversational confirmation. Engines owns
the ElevenLabs SDK call, retry, stream collection, output file, and safe
provenance. Return the accepted output for focused media import or Cast Voice
attachment. Voice browsing remains outside generic generation; supported
sample retrieval runs through `voice-sample-audio` like every other Engines
operation.

Never call the SDK directly, invent a voice id, attach Cast Voice records,
persist credentials, or create durable execution lifecycle records or
cost-approval artifacts.
