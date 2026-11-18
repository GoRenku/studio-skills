---
name: elevenlabs-media-provider
description: Author and execute supported ElevenLabs speech, dialogue, or music requests for Renku Media Producer. Use for direct audio generation, not voice browsing or Cast Voice attachment ownership.
---

# ElevenLabs Media Provider

## Renku Cloud

Renku runs in Renku Cloud when this skill comes from the `renku-cloud`
plugin (its folder is inside that plugin; Claude Code lists it as
`renku-cloud:<skill>`), or when the Renku tools `renku_command`,
`renku_upload`, `renku_download`, `renku_view` and `renku_guide` are
present. An app may show them with a prefix, such as
`mcp__plugin_renku-cloud_renku__renku_command`. In Renku Cloud, never run a
`renku` command on the computer, even when one is installed there.

When this skill comes from `renku-cloud` and the Renku tools are missing, the
person has not signed in to Renku Cloud yet. Tell them how, and stop until
they have: in Claude Code, type `/mcp` and sign in to
`plugin:renku-cloud:renku`; in the Claude app, open Renku Cloud's Connectors
tab in Customize → Plugins and select Add, then Connect; in the ChatGPT app,
select Connect on Renku Cloud; in the Codex CLI, run `codex mcp login renku`.

In Renku Cloud this section applies and takes precedence over any instruction
below to stop when `renku` is unavailable.

- Run each `renku ...` command through `renku_command`, as a batch of `args`
  lists. There is no shell: no pipes, redirects or `$(...)`. Send the review
  document inline in the command's `files`, under
  `tmp/operations/media-generation/`, and keep your own copy on your computer.
- Read Media Producer's audio model guides from your installed plugin. For
  `--route-index`, pass
  `skill:elevenlabs-media-provider/references/supported-routes.json`. Read
  personal model notes with
  `generation models guide show --provider elevenlabs --model <apiId>` instead
  of opening `personalGuidePath`.
- Renku Cloud holds no ElevenLabs key. Before preparing, check that
  ElevenLabs' MCP server is connected in your AI app. If it is not, ask the
  person to connect it and wait; never ask for a key.
- `generation schema show`, `validate`, `prepare` and `estimate` work without
  a key; music schema inspection stays unavailable, as locally. Prices still
  come from `model-researcher`'s price research.
- `voice-sample-audio` cannot run in Renku Cloud. Make a voice sample as
  [Renku Cloud Generation](#renku-cloud-generation) describes.
- The host permission and local network rules below do not apply. Renku
  refuses its Execute and Recover steps: generate as
  [Renku Cloud Generation](#renku-cloud-generation) describes.

## Request Preparation And Recovery

Reuse verified command syntax and selected-route discovery within the current request preparation. Follow existing configuration-cache freshness; final native validation and execution remain live boundaries. Do not retry paid execution automatically or replay a successful mutation after CLI026. Provider metadata cache and output writes require host permission, and Preview notification requires local network access. Explain a known denial and use the authorized permission flow instead of repeating it or disabling persistence. Keep Preview, approval, concurrency, output review, and attachment ownership with Media Producer.

## Renku Cloud Generation

In Renku Cloud, the person's AI app sends the request through ElevenLabs' own
MCP server, and their ElevenLabs account pays for it. Media Producer's
[Renku Cloud guide](../media-producer/references/renku-cloud.md) has the whole
flow; these are ElevenLabs' parts.

1. After approval, get the exact request with `generation native-request` and
   the review's `requestSha256`.
2. Send it with ElevenLabs' MCP tool for its operation: speech, dialogue or
   music. Pass the exact model, text or `inputs`, voice ids, settings, output
   format and seed from the native request. If the tool cannot set one of
   them, stop and tell the person; never send a changed request. Keep at most
   `workflowPolicy.concurrencyLimit` requests running at once.
3. ElevenLabs answers at once; there is no job to wait for. Record the job
   with `generation job record` straight after the reply, with the reply's
   request id or history item id as the `providerJobId`.
4. When the reply gives a link, upload it by `url` with `renku_upload`. When
   the tool saved the audio on your computer, upload it by `fileName` and
   `size`, then send it with `curl -T`.
5. One request makes one audio file. Several takes are several requests, each
   with its own job and receipt; import them together in one
   `media import --file` list.
6. Write the receipt with the fields local Renku keeps:
   `{"byteLength": <the audio file's size in bytes>, "outputFormat": "<the native request's output_format, or the format the reply reports>"}`.
   Leave out links and anything secret. Renku refuses a receipt holding a
   secret or a signed link, naming the field.
7. Import with `media import --job <job id> --receipt <receipt file>`, adding
   `--turns` for Shot Plan Dialogue Audio.

**Voice samples.** Renku Cloud cannot retrieve a voice's preview audio. Make
the sample with an ElevenLabs speech route instead: a short line spoken with
the Cast Voice's exact `voiceId`, reviewed and sent as above. Upload it, then
hand the uploaded path to `casting-director`, which attaches it with
`cast voice attach` and the voice identity
`{"provider":"elevenlabs","voiceId":"<exact-id>"}`. That attachment takes no
job, so do not record one for a sample.

ElevenLabs' MCP server is the only way to reach ElevenLabs here; never call
its API with a key yourself.

## Project Workspace

Keep every agent-created working file inside the current Project's categorized
`tmp/` tree. Never create review JSON, provenance JSON, generated media, QA
evidence, downloads, or scratch files at the Project root.

- Use `tmp/operations/media-generation/` for review documents. Execute/Recover
  saves provenance beside its media and returns `provenancePath` for attachment.
- Use `tmp/media/` for generated or downloaded media.
- Use `tmp/qa/` for review evidence.
- Use `tmp/scratch/` for other temporary inputs.

Reuse Media Producer's effective model list when already loaded. Otherwise use
`renku generation models list --provider elevenlabs --route-index <absolute-path-to-references/supported-routes.json> --json`
for this provider's bundled and personal discovery choices. Select the exact
`apiId`; an explicitly requested unlisted route can proceed without installation.
Copy it verbatim into the review document's `model` field and every generation
command. Never substitute a model or rewrite its namespace.

Find model advice by name under Media Producer's `references/model-guides/`.
Read relevant provider guidance.
Missing advice does not block a supported request; the selected schema and
provider documentation describe its current inputs.
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

Inspect the exact live schema for speech, dialogue and voice sample routes with
`renku generation schema show --provider elevenlabs --model <apiId> --json`.
Speech and dialogue schemas list the native fields and the ranges of the voice
settings. Music schema inspection is unavailable; report that limitation when
schema-driven configuration needs it. Do not invent a local schema. Compatible TTS requests can use their exact model string, multi-speaker
dialogue uses the exact `eleven_v4/text-to-dialogue` route, while music
retains the fixed `music_v1` execution path. A personal music entry cannot enable
another music protocol. Such a request needs separate provider work, not a guide
or paid activation check. Final validation and execution remain authoritative.

For speech, author exact `text`, provider `voice` id, and optional native
`voice_settings`/`output_format`. Resolve that id only from the selected Cast
Voice's opaque identity when it has `provider: "elevenlabs"` and a non-empty
`voiceId`; otherwise stop rather than inventing one. For music, author exact
`prompt` and optional native duration/instrumental fields. Local-media markers
are unsupported.

For `eleven_v4/text-to-dialogue`, author this native input:
`{ inputs: [{ text, voice }], settings?: { stability, similarity }, output_format?, language_code?, seed? }`.
Write one `inputs` entry per screenplay line, in screenplay order, with that
line's exact words and any inline delivery tags in its `text`. Each `voice` is
the speaker's Cast Voice opaque identity `voiceId` with `provider: "elevenlabs"`,
resolved exactly as for speech; stop rather than inventing one. Use at most 10
distinct voices; Engines rejects more. `settings` accepts only `stability` and
`similarity`, each 0 to 1, and is not the speech `voice_settings` object. Do not
add other top-level fields or local-media markers. Engines sends model
`eleven_v4` for this route and records the route id in provenance.

`voice-sample-audio` runs only in local Renku, with the person's saved
ElevenLabs key: Engines downloads the existing preview audio of one exact
voice and returns normal audio generation provenance. This is sample
retrieval, not TTS. Author `voiceId` from the same opaque Cast Voice identity
and optional `apiBaseUrl` only when the user deliberately selected a
non-default endpoint; do not add `text`, speech settings, or local reference
media. Renku Cloud cannot retrieve a sample; there, make one as
[Renku Cloud Generation](#renku-cloud-generation) describes.

Follow Media Producer's shared review routing for panel Submit/consume or
Preview/conversational confirmation. In local Renku, Engines owns the
ElevenLabs SDK call, retry, stream collection, output file, and safe
provenance. Return the accepted output for focused media import, or hand a
voice sample to `casting-director` for Cast Voice attachment. Choosing an
ElevenLabs voice stays with the person, outside Renku.

Never call the SDK directly, invent a voice id, attach Cast Voice records,
persist credentials, or create durable execution lifecycle records.

Renku estimates cost for reviews from cached provider prices. Do not write
prices into this Skill or the review document; a missing price
follows `model-researcher`'s price research.
