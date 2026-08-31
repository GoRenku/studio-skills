# Provider-Skill Media Generation Workflow

Begin with `renku generation context --purpose <purpose> --target <target>
--json`. For Scene Storyboards, add the exact `--revision` and repeated `--beat`
scope. Use the returned typed Project/target context, Lookbooks, policy,
guidance, suggestions, and warnings as the briefing before selecting a provider.

Core suggestions describe real Project relationships but do not limit creative
choice. Deliberately choose, omit, supplement, or replace references after
inspection and user direction. Pass only those exact choices to the selected
provider Skill. Do not make provider Skills rediscover Cast, Location, Prop,
Lookbook, Scene, Shot, or Shot Plan relationships.

For video work, resolve Dialogue Audio continuity with
`video-reference-continuity.md` only after selecting the exact route and
reading its live schema. `isWorkflowSelected` records user-authored workflow
intent; it is distinct from common Asset display selection.

## Author one provider-native request

Delegate request fields and model choice to the matching provider Skill. Write
one unique JSON document under `tmp/operations/media-generation/`:

```json
{
  "provider": "elevenlabs",
  "model": "eleven_multilingual_v2",
  "mediaKind": "audio",
  "prompt": "The exact dialogue and performance direction",
  "request": {
    "text": "The exact spoken text",
    "voice": "exact-provider-voice-id",
    "voice_settings": { "stability": 0.5 }
  }
}
```

`request` is the exact native provider input. Its contents remain opaque to
Core and Studio. A local file is encoded only at the native file/URL field as
`{"$file":"tmp/scratch/reference.png","mimeType":"image/png","reviewLabel":"Meaningful context label"}`.
Add `promptMention` only when the selected provider adapter documents exact
provider-visible syntax. Derive any ordinals from the final native request
order. Canonical model guides remain provider-neutral. Do not add a Renku
purpose, target, domain reference role, estimate, or execution state.

Apply `workflowPolicy.enableProviderPromptExpansion` only when the selected
live schema exposes one semantically unambiguous prompt-expansion or rewriting
control. Set that native control to the Project value, omit it when absent, and
consult provider documentation when ambiguous. Do not maintain a model or
property-name map in this workflow. Preserve the authored prompt even when the
provider returns rewritten/actual prompt evidence for review.

## Validate and Preview

For Engines providers:

```bash
renku generation validate --file tmp/operations/media-generation/request.json --json
```

Open Preview when Project policy enables it or the user asks:

```bash
renku generation preview show --file tmp/operations/media-generation/request.json --json
```

For an ordered set, repeat `--file` in the requested order. Stop when delivery
fails; later individual notifications would replace the combined dialog.

Preview permits editing only the top-level prompt. References and native
configuration are read-only. The user continues in the ordinary conversation;
there is no Generate button, approval token, correlation id, or agent-resume
callback.

After confirmation, reread the document. If the prompt changed, rebuild the
provider-native prompt-bearing fields through the provider Skill, revalidate,
and atomically replace `request`. Do not search the opaque JSON for prompt-like
keys.

## Execute or recover

Treat the local command session as the authority for whether Execute or Recover
is still running. Long provider polling and artifact downloads commonly outlive
an individual tool yield.

- Preserve the command runner's complete result, including its session handle,
  output, and exit code. Never print or retain only an initially empty `output`
  field.
- When the runner returns a live session handle, poll that same command session
  until it returns a terminal exit code. In Codex harnesses, use the returned
  `session_id` with `write_stdin`; do not substitute a wait on the surrounding
  JavaScript/tool cell.
- If the surrounding cell itself yields, its wait handle resumes only that
  cell. A message such as `Script completed` with no Renku JSON, request id,
  artifact, or exit code is not provider completion.
- Do not use a separate `ps` invocation or an early missing-output-directory
  check as proof that the isolated command stopped. Keep polling the original
  command handle.
- Announce success only after the terminal command result has exit code zero and
  the structured Renku result identifies the request and downloaded artifacts.
  Announce failure or interruption from the terminal structured result, not from
  silence.

When nested command and cell runners have independent yield timers, make the
inner command yield first so its session handle can be captured before the outer
cell yields. Always surface the whole inner result. This avoids losing a live
command when both layers reach the same yield boundary.

```bash
renku generation execute \
  --file tmp/operations/media-generation/request.json \
  --output tmp/media/request \
  --json
```

One execute call is one logical provider request. The result contains the
downloaded artifacts, provider/model/request id when available, and a safe
`provenance` value. It contains no durable Renku job or Run.

If a command handle is nevertheless lost, keep the request indeterminate. Do
not resubmit. First allow the original execution time to elapse and recheck the
exact output path and any late command-completion result. Query provider history
only when needed to recover the exact request id. Run Recover only when that
request id is known and the local artifact is still absent or invalid.

When execution reports a known provider request id but cannot finish polling,
recover the same request rather than submitting again:

```bash
renku generation recover \
  --file tmp/operations/media-generation/request.json \
  --request-id <provider-request-id> \
  --output tmp/media/request \
  --json
```

Recovery uses the unchanged provider/model/request envelope. Change the review
document only for a deliberate new generation.

## Inspect and attach

Inspect every artifact before attachment. Rejected outputs stay temporary.
Persist the exact safe `provenance` value from Execute/Recover in a unique JSON
file under `tmp/operations/media-generation/`, then pass it through the focused
attachment command with `renku media import --provenance` or the focused grouped
Storyboard, Cast Voice, dialogue, or Location World command.

Never manually copy into canonical Asset folders or write Project SQLite.
Asset Inspection later reads saved provenance through the same shared Prompt,
References, and Configuration view as Preview. Inspection is read-only.

## Codex built-in images

Codex is a harness capability, not an Engines provider. Use it only when the
active harness exposes built-in image generation and selected policy or user
direction chooses it. Author the same review envelope with `provider: "codex"`,
`model: "gpt-image-2"`, and `mediaKind: "image"`.

Preview normally, then invoke the built-in capability directly after
conversational confirmation. Create safe provenance with the exact final
prompt/request and no invented receipt. Attach it through the same
`--provenance` boundary.
