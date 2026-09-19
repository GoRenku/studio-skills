---
name: model-researcher
description: Add or refresh Renku media models under existing providers, research prompting advice, and author personal library entries or explicitly requested curated additions to the Studio Skills distribution.
---

# Model Researcher

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

A complete addition needs only `provider`, exact `apiId`, and display `name`.
No guide, operation map, local schema, research dossier, network check, paid
generation, or separate compatibility audit is required to save a known route.
Do not substitute a different model. Clarify the model identity only if it is
ambiguous enough to prevent selecting the exact route.

The user's add/refresh request authorizes the route update and useful optional
guidance at the selected destination. Preserve existing edits. Report the
destination, exact route, guidance changes, and what was actually researched or
tested. Do not imply a saved route proves successful execution. Bundled authoring
leaves a reviewable source change; publishing requires a release request.

For generation, hand off to Media Producer and the selected provider Skill.
Engines owns live/cached schemas, authentication, uploads, execution, and output
handling. Models can execute without library membership. ElevenLabs retains its
fixed `music_v1` path and unavailable generic speech/music schema inspection;
adding a music route does not change that protocol.
