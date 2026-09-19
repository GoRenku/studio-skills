# Image Prompt Authoring

Compose one exact, human-reviewable prompt from current project context. Do not
turn this guidance into runtime validation or repair authored prompts after the
user reviews them.

## Required routing

1. Confirm that `image-operation-routing.md` has already selected focused
   creation or `image.edit`. Prompt authoring and model selection must not
   change that decision.
2. Read the purpose guide named by `SKILL.md` and consume the current
   `generation context` report. Purpose guides own craft guidance, not Project
   relationship discovery.
3. Route to the selected provider Skill and choose the exact executable identity
   through `generation models list` or explicit user direction.
4. Read available advice from `../model-catalog.json`, optional operation guides,
   provider adapters, and personal Markdown using Media Producer's guidance rules.
   Missing entries, keys, or guides do not block schema-based preparation.
5. Use generation guidance for every image purpose except `image.edit`.
   Use revise-source guidance for every new `image.edit` request.
6. Combine `targetContext`, `visualLanguage`, advisory `outputGuidance`, the
   deliberately selected and inspected references, model practices, and user
   direction into one prompt. `workflowPolicy` controls the surrounding review
   flow; `warnings` identify context gaps for agent judgment. Keep a simple request concise. Use short
   Markdown headings only when they make a complex request easier to review.

## Exact reference mentions

Place each selected image's local-file marker in the exact provider-native media
field documented by the provider adapter and live schema. When the adapter
defines prompt-visible mentions, derive them from final request order and use
each exact mention for one narrow role. Singular fields do not imply numbered
prompt tokens unless the adapter says they do.

For `image.edit`, resolve and inspect the exact registered source AssetFile
first. Its `source/source-image` placement is locked and must identify that
exact Asset and AssetFile; never substitute another file from the same Asset or
owner.

Do not require every selected reference to be mentioned. Do not create,
select, order, attach, or remove references by editing prompt text.

## Review

- Preserve one exact prompt string through Preview and execution.
- Put an intentional option in the provider-native request only when the
  selected operation currently supports it and the user or agent deliberately
  chooses it.
- Do not copy provider controls, defaults, bounds, or field inventories into
  Media Producer guidance or samples.
- Validate the temporary review envelope, not the creative contents of the
  prompt.
