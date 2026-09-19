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

Use `renku generation models list --provider elevenlabs --route-index <absolute-path-to-references/supported-routes.json> --json`
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
Use `generation models show --provider elevenlabs --model <apiId> --json` to get
`personalGuidePath`. Read it if present. Current bundled guidance supplies the
curated default; personal notes add advice and explicit user preferences take
priority. A personal discovery label never suppresses bundled guidance.
Prepare the selected request from available technical facts and optional advice.
Consult current provider documentation when necessary. Do not add a separate
capability check or mandatory transport/output compatibility audit.

Media Producer supplies the exact text, voice choice, and any deliberate local
inputs. Do not query or reinterpret Renku Project relationships. The
supported-route index is routing guidance only; read the selected ElevenLabs
operation's current request facts for native fields and constraints.

The installed ElevenLabs integration exposes schema inspection only for voice
sample retrieval. Generic speech/music schema inspection is unavailable; report
that limitation when schema-driven configuration needs it. Do not invent a local
schema. Compatible TTS requests can use their exact model string, while music
retains the fixed `music_v1` execution path. A personal music entry cannot enable
another music protocol. Such a request needs separate provider work, not a guide
or paid activation check. Final validation and execution remain authoritative.

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
