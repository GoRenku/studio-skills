# Image Prompt Authoring

Compose one exact, human-reviewable prompt from current project context. Do not
turn this guidance into runtime validation or repair authored prompts after the
user reviews them.

## Required routing

1. Read the purpose guide named by `SKILL.md`.
2. Read `image-model-guide-registry.json` and match the selected exact
   `provider` and `model` identity. Fail before authoring when no entry exists.
3. Read the matched model guide. Do not infer a guide from a route suffix,
   family label, or provider field.
4. Use generation guidance for every image purpose except `image.edit`.
   Use revise-source guidance for every new `image.edit` request.
5. Combine the purpose ingredients, model practices, inspected references, and
   user direction into one prompt. Keep a simple request concise. Use short
   Markdown headings only when they make a complex request easier to review.

## Exact reference mentions

Assign a unique `promptMention` to every selected image that the prompt needs to
name. Use the request's `nextPromptMentionNumber`, starting at `1` only when the
request has no allocation state. Never reuse a cleared mention or scan prompt
text to recover the counter.

```json
{
  "placement": { "kind": "slot", "sectionId": "source", "slotId": "source-image" },
  "providerField": "image_urls",
  "promptMention": "@Reference1",
  "reference": { "kind": "asset-file", "assetId": "asset_...", "assetFileId": "asset_file_..." }
}
```

Mention the exact token when assigning a visible role: `Use @Reference1 as the
locked source image.` The mention is prompt-visible text, while `providerField`
routes media. Neither implies the other. Replacing a reference in the same
placement preserves its mention. Clearing it removes the completion choice but
does not rewrite prompt text.

For `image.edit`, resolve and inspect the exact registered source AssetFile
first. Its `source/source-image` placement is locked and must identify that
exact Asset and AssetFile; never substitute another file from the same Asset or
owner.

Do not require every selected reference to be mentioned. Do not create,
select, order, attach, or remove references by editing prompt text.

## Review

- Preserve one exact prompt string through Preview and execution.
- Keep aspect ratio, quality, and resolution in structured values only when the
  selected model descriptor exposes them and the user or purpose deliberately
  chooses them.
- Keep provider transport, storage, multiplicity, safety, output-format, seed,
  and experimental fields absent from Studio-managed samples.
- Validate the GenerationSpec envelope, not the creative contents of the
  prompt.
