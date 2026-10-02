# Generation review routing

Read this guide for every image, audio and video request, including Codex built-in
images. It owns presentation selection; provider Skills continue owning native
request authoring and execution. Purpose guides inherit this routing rather than
opening Preview themselves.

## Select the review surface once

Read `workflowPolicy.codexGenerationReview` from the current
`renku generation context --purpose <purpose> --target <target>` report (use
`--json` when processing it in code). It is the global Renku config preference,
`panel` or `visualize`, and defaults to `panel`. Do not read config files directly,
add a Project setting, or infer the preference from previous tasks. Invalid
configuration must be corrected before preparation.

Also read `workflowPolicy.codexGenerationReviewDisplayMode` from that report:
`inline` or `fullscreen`, defaulting to `inline`. This independent preference
applies only when using the packaged review. `panel` names that review path even
when the app appears inline. The runtime reads the validated global setting and
supplies the host's initial display preference; no tool argument or separate
configuration read is needed. The host controls its actual mode and may switch
between inline and fullscreen. Do not force fullscreen, open a second review,
invoke a browser launcher, or substitute Visualize because the host uses the
other supported mode. This setting does not change Preview or spending policy.

Distinguish the hosting interface from the model. A Codex model, a `.codex`
directory, environment variables, a CLI executable, or an installed Visualize
Skill does not establish that the conversation can display a panel.

When available, call `generation.review.capabilities` on the current Renku MCP
connection. It returns the initialized `client` identity and `panel.status`:

- `advertised`: the client is `codex-mcp-client` and advertises
  `io.modelcontextprotocol/ui` with MIME `text/html;profile=mcp-app`. This allows
  trying the panel; it does not prove successful rendering or message delivery.
- `unavailable`: use conversational configuration and mandatory Studio Preview.
  This includes Codex CLI, Claude Code, Claude desktop and unidentified hosts.

| Current host | Global preference | Configuration/review | Studio Preview |
| --- | --- | --- | --- |
| Codex with advertised panel support | `panel` | Combined generation panel | Never automatic |
| Trusted Codex desktop context | `visualize` | Visualize configuration | Project `displayPreview` or explicit request |
| Codex CLI, Claude, other or unidentified interface | Either | Conversational configuration | Always |

For `panel`, a missing probe in a trusted Codex desktop session is an incomplete
plugin connection: report it and stop; do not silently switch surfaces. If no
trusted desktop context or probe exists, treat the host as unidentified and use
mandatory Studio Preview. If a current probe says `unavailable`, that result
takes precedence over an inferred desktop context.

For `visualize`, use trusted desktop context or the current Codex UI advertisement
to establish desktop eligibility, then discover Visualize in the available Skill
catalog and read its full `SKILL.md`. A tool-name search is not discovery. If the
explicitly selected Visualize Skill is unavailable, report the limitation and
stop instead of silently substituting another review surface. Follow
[inline-generation-configuration.md](inline-generation-configuration.md), keeping
its optional configuration policy for Codex built-in images.

Resolve this choice for a new review; keep it through reconfiguration and Submit.
A changed global preference applies to the next review. Built-in image generation
availability is a separate capability: panel support never authorizes choosing
Codex images, and its absence never authorizes switching to a paid provider.

## Combined panel

1. Read the complete briefing and inspect chosen references. Select the initial
   provider/model from user direction or Project policy. Read only that route's
   provider Skill, available model advice and current schema through the existing
   CLI/provider boundary. Use schema freshness rules; no Visualize template/cache preparation is
   needed for this bundled UI.
2. Author the exact temporary review document with safe ordered local-file
   markers. For Engines requests call `renku generation validate --file <file>
   --json`, check diagnostics and retain `requestSha256`. **Do not call
   `generation prepare` or `generation preview show`: both deliver Studio
   Preview.** Codex built-in requests do not use Engines validation.
3. Discover the complete currently eligible route catalog through the existing
   `generation models list` contract; respect keyed-provider availability and
   explicit provider selection. Routes have `{provider, providerLabel, model,
   label, mediaKind}` with exact Engines `apiId` values. Include Codex only when
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
5. Call `generation.review` with `project` and ordered `requests`, each containing
   `reviewFile`, `routes`, `controls`, and the Engines validation's
   `expectedRequestSha256` when applicable. Keep the returned `reviewId`,
   `revision`, ordered `requestId` bindings and source hashes. Check reference
   availability and diagnostics. End the turn and wait for the panel action;
   opening a panel or reading its resource does not authorize execution.
6. The app verifies inline/fullscreen presentation and active-conversation messaging.
   Opening/handshake failure is a visible diagnostic and stops this review.
   Do not claim successful rendering from the capability probe or replace a
   failing panel with Visualize/Studio Preview. No automatic second dialog.
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
   Submit is the single confirmation for that exact request, including external
   spending approval; do not ask it again or bypass host-owned permissions.
   Codex built-in images use the accepted native values directly and no Engines
   receipt. Preserve concurrency, recovery, immediate artifact display, inspection
   and focused attachment. Do not execute unseen edits or silently resubmit jobs.

### Model reconfiguration

Consume the exact reconfiguration action first. Read its `selectedRoute` and
drafts; prepare only that selected request through the matching provider Skill.
When the canonical model changes, recreate the prompt from that model's guidance
while retaining user-authored intent. When it does not change, preserve the exact
prompt and schema-compatible native values. Preserve chosen references in order;
if the selected route cannot accept them, report the issue instead of dropping them.

Write and validate the replacement request, then call `generation.review` with
the same `reviewId`, `expectedRevision` from the consumed action, and the complete
ordered request set using the original file bindings. Leave unrelated source
files unchanged. Replace the selected route's controls and schema-derived initial
values; do not carry incompatible controls across models. End the turn again.

If preparation fails, refresh the same review with `project`, `reviewId`,
`expectedRevision`, and `preparationFailure` containing structured diagnostics
instead of `requests`. Keep the error in that review and wait for a new choice.
Expired/stale connection state requires a fresh review and fresh acceptance;
never replay an accepted action after reconnecting.

## Studio Preview paths

Outside Codex desktop, Studio Preview is **mandatory**, even when Project
`displayPreview` is false. Do not try to make a CLI infer its caller's UI from
environment variables. The agent selects presentation using trusted host context
and the MCP probe; the existing CLI commands retain their explicit behavior.

For one Engines request, write the final file and run `generation prepare` in the
same tool operation. It validates and delivers Preview once; check diagnostics,
delivery status and hash. For an ordered batch, validate Engines files individually
and call `generation preview show` with repeated `--file` in order. Codex built-in
images use `preview show` and never Engines preparation. If mandatory delivery
fails because Studio is unavailable, stop and explain how to open Studio; do not
execute a request the user could not see.

In the explicit Visualize desktop path, retain Project `displayPreview` and user
direction. If Preview is disabled, validate Engines requests without delivering
it. Preview is conversational and does not send a Submit action. External-provider
`askBeforeGenerating` still requires one conversational confirmation; an acceptance
after Preview satisfies it. Built-in Codex images retain their no-consent policy,
waiting only for explicitly requested creative review in this path. Apply prompt
edits through the provider Skill and use the exact final hash as described in
[workflow.md](workflow.md).
