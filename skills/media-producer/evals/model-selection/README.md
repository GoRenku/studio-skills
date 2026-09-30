# Model selection behavioral eval

Run these cases against each candidate agent model with the current Media Producer
and provider Skills loaded. This is an agent behavior eval, not a provider quality
benchmark. Stop at request preparation; do not generate paid media or attach assets.

## Run protocol

Use a fresh conversation per case. Keep the same skill revision, tools, reasoning
settings, fixture responses, and user prompt across agent models. Run each case
three times when comparing models. Record the actual model identifier and settings.

Give the agent only the user prompt from `cases.md`. The evaluator supplies the
case's setup through normal tools or a mocked tool harness, not as extra routing
instructions in the user message. Hide the expected outcomes from the agent.
Use synthetic, non-sensitive assets whose visible/audio contents match the setup;
keep those assets identical between runs. If mocked, inspection must return those
same facts. Do not score a text-only answer as successful media inspection.

Fixture schema facts below are deliberately synthetic. They describe only the
listed eval routes, not production model capabilities. A mock must return them
through the normal schema contract. In live-tool runs, substitute currently
available routes supporting the same combinations, record their exact schemas,
and compare runs using that same fixture revision. Do not hardcode these facts
into production instructions or runtime code.

For a focused discovery eval, provide the already-consumed generation briefing
and confirmation policy. For an end-to-end eval, use the normal briefing flow and
also apply `../forward-test-cases.md`. Label which mode was run.

## Shared provider fixtures

All routes below belong to authenticated Fal.ai in the mocked tool environment:

| apiId | Display name | Supported input roles |
| --- | --- | --- |
| orbit/opening | Orbit opening video | Required start image, optional end image; no audio |
| orbit/reference | Orbit reference video | Up to four identity/style images, one motion video and one audio reference; no binding frames |
| orbit/combined | Orbit combined video | Start image plus up to four identity/style images and one audio reference |
| orbit/text | Orbit text video | Prompt only |
| canvas/edit | Canvas image edit | One source image plus up to three reference images |
| voice/reference | Voice reference speech | Text plus one voice sample |

Use the existing Fal.ai Skill; these synthetic model identities and schemas are
returned only by the eval tool fixtures. They do not add a provider.

All routes require a prompt/text string. No route accepts fields absent from its
fixture schema. The text route is not required when another route accepts text
without media. The agent may select any route that actually meets the request.

The model list includes bundled routes and a personal route `custom/orbit`, named
“My studio motion model,” with the same inputs as `orbit/reference`. Its personal
Markdown requests restrained camera movement. Bundled Orbit advice is a plain
Markdown file named `orbit.md`, mentions all three video input variants, and
explains that a reference image is not an exact starting composition. Provider
advice is linked from the provider Skill and describes native field names and
reference ordering. `generation models show` returns the personal note path.

## Score and compare

Use the outcome checks in `cases.md`. Mark each applicable check pass, fail, or
unobserved, with transcript/tool evidence. Unobserved does not count as a pass.
A case passes only when all required outcomes are observed. A blocker case passes
when it identifies the real incompatibility and requests the needed choice
without silently changing the request.

Treat lost required inputs, changed input roles, invented schema fields, and
unauthorized provider switches as functional failures. Report discovery calls,
guide reads, repeated reads, schema fetches, tool output tokens, and time to a
prepared request separately. An extra call is not automatically a failure: record
whether new information, ambiguity, a user change, or an error justified it.
Do not reward skipping necessary inspection or schema checks to reduce latency.

Accept any suitable route and sensible reading order. Do not grade exact prose,
filename search commands, or a particular guide-reading sequence. Advice discovery
succeeds when the agent finds and uses relevant available information; reading
every guide is not required. Do not require a new guide when no advice exists.

Save results under `runs/<date>-<agent-model>.md` with:

- skill revision, agent model/settings, fixture revision, focused/end-to-end mode;
- case and repetition; pass/fail/unobserved checks with evidence;
- selected route, intended inputs and their actual native fields;
- discovery/schema/read calls, justified retries, output tokens;
- request-to-preparation wall time and tool time, excluding user wait;
- failure explanation and any fix/retest.

Report pass counts and median preparation time across repetitions, with individual
outliers. Keep mock and live-tool results separate. Repository unit tests verify
contracts and scorer mechanics; they do not establish these agent outcomes.
