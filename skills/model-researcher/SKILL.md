---
name: model-researcher
description: Add or refresh Renku media models under existing providers, research prompting advice, research route prices missing from cost estimates, and author personal library entries or explicitly requested curated additions to the Studio Skills distribution.
---

# Model Researcher

## Renku Cloud

When the Renku tools `renku_command`, `renku_upload`, `renku_download`,
`renku_view` and `renku_guide` are present, Renku runs in Renku
Cloud and this section applies. It takes precedence over any instruction
below to stop when `renku` is unavailable.

- Run each `renku ...` command through `renku_command`, as a batch of `args`
  lists. There is no shell: no pipes, redirects or `$(...)`. Send a route,
  price, schema or guide document inline in the command's `files`, under
  `tmp/scratch/`. Keep your own copies and research notes on your computer.
- Read this skill's references from your installed plugin. For bundled
  discovery, pass each provider Skill's index as
  `--route-index skill:<provider-skill>/references/supported-routes.json`.
- Personal notes live in Renku, not in a folder you can open. Read them with
  `generation models guide show --provider <id> --model <apiId>`, merge your
  research into them on your computer, and save the result with
  `generation models guide write --provider <id> --model <apiId>` and its
  `--file`. Keep the person's existing edits, as locally.
- Renku Cloud holds no provider keys. `generation schema show` and
  `generation price show` work without one. When a schema cannot be read
  (`ENGINE_CATALOG_KEY_REQUIRED`), fetch it with the provider MCP server's
  schema tool and save it with `generation schema record`.
- A `missingPrice` estimate can also come from fal.ai or WaveSpeed here, when
  their price lookup needs a key Renku Cloud does not hold. Take
  the price from the provider MCP server's price tool when it has one,
  otherwise research it as [price research](references/price-research.md)
  describes, and record it with `generation price record` either way.
- An outdated runtime or a stale lock is Renku Cloud's to fix. Report it to
  the person; do not update anything or recover a lock by hand.
- Bundled authoring is unchanged: it edits the person's `studio-skills`
  checkout on their computer, and `pnpm test` runs there. Renku Cloud uses the
  change only after a plugin release.
- Generation follows Media Producer's Renku Cloud section.

Default to the personal library. For personal additions, use the installed
`renku` CLI and read
[references/workflow.md](references/workflow.md) for the commands and safe update
sequence. Personal content survives runtime and plugin replacement.

When the user explicitly asks to add or refresh a model in the Studio Skills
distribution, read [references/bundled-authoring.md](references/bundled-authoring.md)
and edit the `studio-skills` source checkout. Being in that repository does not
change the default destination. Never edit an installed plugin copy. A bundled
request does not also authorize changing the personal library, or vice versa.

Read [references/source-research.md](references/source-research.md) when
researching the model or retaining useful advice in either destination.

For an ordinary model addition or refresh, research and save useful prompting
guidance by default. A saved route alone does not complete that research work.
An explicit route-only request can skip it. Use model-developer guidance and
substantive provider tutorials, with practical examples and clear attribution;
API field descriptions alone are not evidence of prompt craft.

Saving a known route needs only `provider`, exact `apiId`, and display `name`.
Guidance quality is an authoring responsibility, not a model-availability gate.
No operation map, local schema, research dossier, paid generation, or separate
compatibility audit is required. If useful sources cannot be found after an
actual search, save the route, retain supported advice, and report the research
limit without inventing filler. Do not substitute a different model. Clarify
model identity only if ambiguity prevents selecting the exact route.

The user's add/refresh request authorizes the route update and useful researched
guidance at the selected destination. Preserve existing edits. Report the
destination, exact route, guidance changes, and what was actually researched or
tested. Do not imply a saved route proves successful execution. Bundled authoring
leaves a reviewable source change; publishing requires a release request.

When Media Producer's review estimate for a route without API pricing is
`missingPrice`, read
[references/price-research.md](references/price-research.md) and record the
route's price once from the provider's public pricing page; a recorded price
never expires or needs refreshing. Prices live only in Renku's provider
metadata cache, never in Skill files.

For generation, hand off to Media Producer and the selected provider Skill.
Engines owns live/cached schemas, authentication, uploads, execution, and output
handling. Models can execute without library membership. ElevenLabs retains its
fixed `music_v1` path and unavailable generic speech/music schema inspection;
adding a music route does not change that protocol.
