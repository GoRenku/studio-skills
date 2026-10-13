# Generation review routing

Read this guide for every image, audio and video request, including Codex built-in
images. It owns presentation selection; provider Skills continue owning native
request authoring and execution. Purpose guides inherit this routing rather than
opening Preview themselves.

## Dialogue direction panels come first

In trusted Codex Desktop, a `shot-plan.dialogue-audio` request opens the
fullscreen dialogue direction panel when the current
`generation.review.capabilities` probe advertises panel support and the
selected route appears in a `dialogue-direction` block of its model guide's
`## Codex panel` section. Follow
[dialogue-direction-panels.md](dialogue-direction-panels.md). The panel is an
authoring desk: after each Generate, the review below still applies when Ask
Before Generating is on. Every other host, route and purpose uses the
selection below unchanged.

## Image edit panels come first

In trusted Codex Desktop, when the current `generation.review.capabilities`
probe advertises panel support, every `image.edit` request that matches several
images shows the inline image chooser, whatever the model. The edit itself
opens the fullscreen image edit panel when the selected edit route appears in
an `image-edit` block of its model guide's `## Codex panel` section. Follow
[image-edit-panels.md](image-edit-panels.md). Like the dialogue panel, it is an
authoring desk followed by the review below when Ask Before Generating is on.

## Skip the review when Ask Before Generating is off

Read `workflowPolicy.askBeforeGenerating` from the current
`renku generation context --purpose <purpose> --target <target>` report (use
`--json` when processing it in code). It belongs to the lane in
`workflowPolicy.lane` and applies to every route of that lane, Codex built-in
images included. When it is off, validate Engines requests and execute without
a review, Studio Preview or confirmation question. An explicit user request to
review first still opens the review below.

## Select the review surface once

Also read `workflowPolicy.codexGenerationReviewDisplayMode` from that report:
`inline` or `fullscreen`, defaulting to `inline`. This global preference applies
only to the packaged review. The runtime reads it and supplies the host's
initial display preference; no tool argument or separate configuration read is
needed. The host controls its actual mode and may switch between inline and
fullscreen. Do not force fullscreen, open a second review or invoke a browser
launcher because the host uses the other supported mode.

Read `workflowPolicy.codexPluginInstalled` from the same context report. Core
supplies the installer-recorded flag; it does not describe the current MCP
connection. A development machine or manually connected plugin may have no
installer record. Do not inspect Codex caches, write installation state, or
run an installer to enable a review.
Establish the current host from trusted harness context. A Codex model, a
`.codex` directory, environment variables or a CLI executable does not establish
Codex Desktop hosting. Unidentified hosts use Studio Preview with conversation.

| Current host | Renku connection / installation record | Review |
| --- | --- | --- |
| Codex Desktop | Current probe advertises panel support, with either installation flag | Combined generation panel |
| Codex Desktop | Probe unavailable or failed, or no probe with installation flag true | Stop with an integration diagnostic |
| Codex Desktop | No probe and installation flag false | Studio Preview, or text when Studio is not running |
| Codex CLI, Claude, other or unidentified interface | Any | Studio Preview, or text when Studio is not running |

In trusted Codex Desktop, call `generation.review.capabilities` whenever that
tool is available on the current Renku MCP connection, including when
`codexPluginInstalled` is false. The initialized `codex-mcp-client` identity and
`panel.status: advertised` select the panel. Tool presence alone never proves
support or rendering. A failed probe, `unavailable` capability, missing probe
with installation flag true, or failed panel handshake is an integration
failure: report it and stop. Do not automatically open Studio Preview as a
second review.

Resolve this choice for a new review; keep it through reconfiguration and Submit.
Built-in image generation availability is a separate capability: panel support
never authorizes choosing Codex images, and its absence never authorizes
switching to a paid provider.

## Combined panel

1. Read the complete briefing and inspect chosen references. Take the initial
   provider/model from [route choice](route-choice.md). Read only that route's
   provider Skill, available model advice and current schema through the existing
   CLI/provider boundary, using schema freshness rules.
2. Author the exact temporary review document with safe ordered local-file
   markers. For Engines requests call `renku generation validate --file <file>
   --json`, check diagnostics and retain `requestSha256`. **Do not call
   `generation prepare` or `generation preview show`: both deliver Studio
   Preview.** Codex built-in requests do not use Engines validation.
3. Discover the complete currently eligible route catalog through the existing
   `generation models list` contract; respect keyed-provider availability and
   explicit provider selection. Routes have `{provider, providerLabel, model,
   label, mediaKind, billing}` with exact Engines `apiId` values. `billing` is
   `hostPlanUsage` for a Codex built-in route, which runs on the user's ChatGPT
   plan, and `providerCharge` for every other route. Include Codex only when
   the current session exposes built-in image generation. Do not read alternative
   providers' Skills, guides or schemas before a user selects them.
4. Author `controls.groups` from the selected native schema. Each group has
   `label` and `fields`; each field has an exact native JSON-pointer `key`, a
   meaningful `label`, `kind`, and its exact `initialValue` when present. Kinds:
   `text`, `multiline`, `number`, `integer`, `boolean`, `enum`, `multi-enum`,
   `object`, `array`. Preserve schema required/nullable/bounds/options and nested
   `properties`/`element` constraints. Root keys are JSON pointers relative to
   `request`, for example `/resolution` or `/voice_settings/stability`; escape
   `~` as `~0` and `/` as `~1`. Nested object fields use native property names.
   Do not create controls for prompts already in the Prompt tab, provider/model
   identity, reference file markers, credentials or upload URLs. Do not invent
   a second schema or duplicate the controls in a saved-value list. A bounded
   purpose-owned choice such as Cast Voice requires provider-Skill preparation
   of its exact native value; a reference-gallery selection cannot mutate a file.
5. Call `generation.review` with `project`, `lane` (from `workflowPolicy.lane`;
   required for a new review) and ordered `requests`, each containing
   `reviewFile`, `routes`, `controls`, and the Engines validation's
   `expectedRequestSha256` when applicable. Keep the returned `reviewId`,
   `revision`, ordered `requestId` bindings and source hashes. Check reference
   availability, diagnostics and each request's `preview.estimate`. The server
   computes estimates; a `hostPlanUsage` route shows plan usage instead of a
   price. Before opening a `providerCharge` request, run `renku generation
   estimate --file <file> --json`; when it is `missingPrice` or `expired`,
   follow [price research](../../model-researcher/references/price-research.md)
   first. End the turn and wait for the panel action; opening a panel or
   reading its resource does not authorize execution.
6. The app verifies inline/fullscreen presentation and active-conversation messaging.
   Opening/handshake failure is a visible diagnostic and stops this review.
   Do not claim successful rendering from the capability probe or replace a
   failing panel with Studio Preview. No automatic second dialog.
   An explicit user request for a separate Studio Preview remains possible.
7. When the originating conversation receives an action, call
   `generation.review.consume` with exactly its `reviewId` and `responseId`.
   Treat the message as a notification, not execution authorization by itself.
   The consumed result must match this review, current revision and ordered
   request identities. `alreadyConsumed: true` authorizes no repeat generation.
   `cancel` stops; `reconfigure` follows the section below; only `submit` continues.
8. For Submit, read each bound source file once and preserve its native request,
   ordered references and unrepresented settings. Apply only the accepted draft:
   top-level `prompt` plus the provider-Skill-owned native prompt-bearing fields,
   and accepted `values` at their declared exact native JSON pointers. A missing
   optional field means omission, not a schema default; `null`, `false`, `0` and
   empty values remain exact. Never infer native prompt fields by searching keys.
   Atomically save each revised envelope. The panel never writes these files.
9. Validate the revised Engines file and retain the new `requestSha256`; the
   pre-panel hash describes the source, not the accepted edits. Execute with
   `--expected-request-sha256 <new-hash>` through the existing provider Skill.
   A consumed Submit is Renku's confirmation for that exact request; do not ask
   for it again in chat. The host's command approval is a separate layer: if
   the host still asks for approval, request it once with an honest description
   of the command and what it sends to which provider; if it is refused, ask
   the user once in chat and wait. Never quote panel text as the user's
   authorization, never retry or rephrase a command around a denial, and never
   coach an approvals reviewer. A Submit with `askBeforeGeneratingNextTime:
   false` has already turned off Ask Before Generating for the lane; the server
   applied it. Codex built-in images use the accepted native values directly
   and no Engines receipt. Preserve concurrency, recovery, immediate artifact display, inspection
   and focused attachment. Do not execute unseen edits or silently resubmit jobs.

### Model reconfiguration

Consume the exact reconfiguration action first. Read its `selectedRoute` and
drafts; prepare only that selected request through the matching provider Skill.
When the canonical model changes, recreate the prompt from that model's guidance
while retaining user-authored intent. When it does not change, preserve the exact
prompt and schema-compatible native values. Preserve chosen references in order;
if the selected route cannot accept them, report the issue instead of dropping them.

Write the replacement request to a new, separate JSON file under
`tmp/operations/media-generation/` and validate that staged file. Keep every
currently bound source file byte-for-byte unchanged, including the selected
request's prepared file. Then call `generation.review` with the same `reviewId`,
`expectedRevision` from the consumed action, and the complete ordered request set.
Use the staged `reviewFile` and validation's `expectedRequestSha256` for only the
selected request; retain all other file bindings. Replace the selected route's
controls and schema-derived initial values; do not carry incompatible controls
across models. The server adopts the staged file only after the update passes
validation. Use the newly bound file returned by subsequent consumed actions.
End the turn again.

If preparation fails, refresh the same review with `project`, `reviewId`,
`expectedRevision`, and `preparationFailure` containing structured diagnostics
instead of `requests`. Keep the error in that review and wait for a new choice.
Leave the failed candidate separate from the prepared source. The user can retry,
choose another model, return to the prepared model, or cancel. To return to the
unchanged prepared model, consume that reconfiguration and refresh the review
using its existing file, routes and controls; do not rewrite the file or discard
the preserved user draft edits. Editing and Submit stay locked until ready.
Expired/stale connection state requires a fresh review and fresh acceptance;
never replay an accepted action after reconnecting.

## Studio Preview path

Codex CLI, Claude and other hosts use Studio Preview when Ask Before Generating
is on. Do not try to make a CLI infer its caller's UI from environment
variables. The agent selects presentation using trusted host context and the
MCP probe; the existing CLI commands retain their explicit behavior.

For one Engines request, write the final file and run `generation prepare` in the
same tool operation. It validates, attaches the cost `estimate` and delivers
Preview once; check diagnostics, the estimate, delivery status and hash. For an
ordered batch, validate Engines files individually and call
`generation preview show` with repeated `--file` in order; it attaches
estimates too. Codex built-in images use `preview show` and never Engines
preparation. When an estimate is `missingPrice` or `expired`, follow
[price research](../../model-researcher/references/price-research.md), then
deliver Preview again with `generation preview show` so it shows the new
estimate.

If delivery fails because Studio is not running, review in text instead: one
short chat summary of the provider and model, the prompt, the chosen
references, the native settings that matter and the estimate, then wait for
the user's answer. Do not execute a request the user could not see.

Preview is conversational and does not send a Submit action. One confirmation
in chat after Preview or the text summary is Renku's confirmation; the host
approval rules in the combined panel's step 9 apply unchanged. Apply prompt
edits through the provider Skill and use the exact final hash as described in
[workflow.md](workflow.md).
