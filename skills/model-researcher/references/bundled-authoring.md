# Bundled model authoring

Use this workflow when the user explicitly requests a model addition or guidance
refresh for the Studio Skills distribution. For example:

> Add this model on Fal.ai to the Studio Skills distribution with researched
> prompting guidance. Leave the source changes ready for review.

## Work in the source checkout

Use the user's `studio-skills` checkout and read its `CONTRIBUTING.md` and
applicable repository instructions. If the checkout cannot be located, ask for
its path; an installed plugin cache is not an authoring destination. Inspect the
working tree and preserve unrelated changes.

Do not run `generation models import` or `remove` for bundled authoring: those
commands mutate the personal library. A personal entry is not a prerequisite.
If the user asks to promote existing personal research, read the relevant notes
and adapt the reusable advice without copying private Project details or treating
personal preferences as universal defaults. Leave the personal files intact.

## Update the existing discovery and guidance files

Read the selected provider Skill and Media Producer's guidance-resolution
instructions in this checkout. Research the exact requested routes using
[source-research.md](source-research.md), then make focused edits:

- In `skills/<provider-skill>/references/supported-routes.json`, add or update
  the exact `apiId` and display `name` inside the existing provider's `routes`
  array. The `provider` belongs to the containing document. Preserve namespaces,
  endpoint variants, and pinned versions. Update an existing exact route instead
  of duplicating it; include only variants within the user's request.
- When retaining curated guidance, use the route's `modelKey` to connect it to
  `skills/media-producer/references/model-guides/model-catalog.json`. Reuse a
  matching model entry across providers where its prompt craft is shared. For a
  new entry, follow the existing `key`, `name`, `mediaKind`, `guide`, and
  `operations` layout. Guide paths are relative to `model-guides/`; operation
  values may be `null` when no separate operation guide is useful. This is an
  editorial lookup, not an execution schema or capability definition.
- Write useful model advice beneath `model-guides/image/`, `video/`, or `audio/`.
  Use a focused Markdown file; split out operation advice only when it warrants
  separate treatment. Cover model-specific prompt construction, reference use,
  examples, or pitfalls supported by the research. Link sources and distinguish
  inference. Reuse shared advice rather than duplicating it. Each model normally
  gets a guide consumed by existing Skills, not a new top-level Skill.
- Put provider-specific notation and input-ordering advice in the provider
  Skill's `references/adapters/` only when useful. Its optional route `adapter`
  path is relative to that provider's `references/` directory. These adapters
  are Markdown guidance, not executable provider code. Live schemas remain the
  authority for current request fields and constraints.

A route can still be added without any guide, `modelKey`, operation map, or
adapter. If specialized research is unavailable, report that limit and retain
only useful supported advice; do not invent guidance to fill the structure.
Do not copy provider schemas into the repository or introduce a new registry.
An unsupported execution protocol needs separate runtime work; a bundled entry
must not imply that authoring guidance enabled it.

## Verify and hand off

Run `pnpm test` from the source repository root. Inspect the full diff and
manually follow each changed route's `modelKey` through the catalog to its guide
and any operation/adapter links. Automated validation intentionally permits
absent guidance, so passing it alone does not prove new advice is discoverable.

Exercise a request-preparation walkthrough with the selected route and available
schema or fixture: confirm Media Producer finds the new advice and applies it
without generating paid media. For shared guide edits, also inspect affected
provider routes. Record what was checked and any unavailable schema or execution
test. Use the scenarios in [../evals/bundled-models.md](../evals/bundled-models.md)
when evaluating this workflow itself.

Leave the changes ready for review and report the exact routes, guide files,
research sources, and validation results. Use the repository's existing
maintainer release process only when publishing is requested. Bundled additions
reach users through a plugin release; additions within existing provider
protocols ordinarily need no Studio runtime release. Current bundled advice
supplies defaults even for personal routes, while explicit personal preferences
remain effective and personal notes remain untouched.
