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
3. Route to the selected provider Skill and match one exact entry in its
   `supported-routes.json`. Take the route's `modelKey` and operation exactly.
4. Read `../model-catalog.json`, the matched canonical model guide, and the
   operation guide named by that catalog entry when one exists. Then read the
   provider adapter named by the route, when present. The canonical model guide
   owns prompt craft; the adapter owns native fields and mention syntax.
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
