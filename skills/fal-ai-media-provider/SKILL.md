---
name: fal-ai-media-provider
description: Author and execute supported Fal.ai image and video requests for Renku Media Producer. Use only after the workflow has selected Fal.ai; do not use it for provider selection or Asset attachment decisions.
---

# Fal.ai Media Provider

## Project Workspace

Keep every agent-created working file inside the current Project's categorized
`tmp/` tree. Never create review JSON, provenance JSON, generated media, QA
evidence, downloads, or scratch files at the Project root.

- Use `tmp/operations/media-generation/` for review and provenance documents.
- Use `tmp/media/` for generated or downloaded media.
- Use `tmp/qa/` for review evidence.
- Use `tmp/scratch/` for other temporary inputs.

Read [references/supported-routes.json](references/supported-routes.json) and
select one exact `apiId` and operation. If the route is absent, stop; do not
substitute another model. Copy that `apiId` verbatim into the review document's
`model` field and every generation command; never add, remove, or replace its
namespace. Give its `modelKey` to Media Producer only for loading the canonical
model and operation guidance from `model-catalog.json`. Read the route's adapter
when present. An adapter never replaces a model guide.

Media Producer supplies the exact deliberately chosen local files. Do not query
or reinterpret Cast, Location, Prop, Lookbook, Scene, Shot, or Shot Plan
relationships. The supported-route index is routing guidance only; run `renku
generation schema show --provider fal-ai --model <api_id> --json` for the
selected Fal operation's current native fields and constraints.

Author the exact Fal.ai input object as the review document's `request`. Put a
`{"$file":"<project-relative-path>","mimeType":"<mime>","reviewLabel":"<Media Producer label>"}`
marker at each native image/video field. Preserve the exact `reviewLabel`, and
add the exact `promptMention` only when the selected adapter establishes one
after final request order is known. Do not upload media yourself.

Follow Media Producer for Preview and conversational confirmation. Then call
`renku generation validate` and `renku generation execute` once. Use
`generation recover` only with a known Fal request id and the unchanged review
document. Return the artifacts and exact safe provenance to Media Producer.

Do not call the Fal SDK or API directly, attach Assets, invent provider fields,
or persist credentials, upload URLs, signed output URLs, durable execution
lifecycle records, or cost-approval artifacts.
