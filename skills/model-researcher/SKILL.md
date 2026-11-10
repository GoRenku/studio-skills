---
name: model-researcher
description: Add or refresh Renku media models under existing providers, research prompting advice, research route prices missing from cost estimates, and author personal library entries or explicitly requested curated additions to the Studio Skills distribution.
---

# Model Researcher

## Renku Cloud

When you have the Renku Cloud tools (`renku_command`, `renku_guide`,
`renku_upload`, `renku_download`, `renku_view`) instead of a local `renku`
program, Renku runs in the person's cloud sandbox. This note takes precedence
over any instruction below to stop when `renku` is unavailable.

- Run each `renku ...` command in this skill with `renku_command`, passing the
  words after `renku` as `args`, for example `["cast", "list", "--json"]`.
  There is no shell, so nothing needs quoting and nothing can be piped.
- Write the JSON documents this skill creates under `tmp/` with
  `renku_command`'s `files`, in the same call that reads them.
- Read this skill's reference files with `renku_guide`, as
  `"<skill>/references/<file>"`, when they are not on this computer.
- Bring images, audio and video in with `renku_upload`, look at project images
  and video frames with `renku_view`, and give the person files with
  `renku_download`.
- Generation does not run inside Renku Cloud. Follow the Renku Cloud section of
  `fal-ai-media-provider`.

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
