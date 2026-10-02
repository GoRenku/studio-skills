# Inline Generation Configuration

Use this guide only after [generation-review-routing.md](generation-review-routing.md)
selects `visualize` in Codex desktop. The default combined panel does not use
Visualize templates or open Studio Preview. CLI and non-Codex sessions use
conversational configuration and mandatory Studio Preview.

Use this guide for the transient `@Visualize` component shown before Media
Producer authors any image, video, or audio review document. The installed
Visualize Skill owns styling, theme, layout primitives, interaction, and
accessibility. This guide owns Renku's shared composition, system cache, and
request handoff. For Codex built-in generation, this component is optional and
used only when the user asks to configure or review settings. Otherwise use
their direction and Project defaults directly, without creating a configuration
confirmation gate. External-provider requests retain the configuration flow.
Discover Visualize through the available skills catalog and read its full
`SKILL.md` once in this workflow for the rendering contract. If unavailable, explain the
limitation rather than silently claiming configuration was shown. Choosing a
model in the user's request sets the initial selection, not acceptance of all
native settings. Studio Preview does not replace this inline control surface.

## Reuse a system-cached route template

Read this guide once per unchanged configuration workflow and reuse selected
route discovery with a fresh template. Codex configuration remains optional
unless requested. A denied cache write uses the normal host permission flow;
do not loop on the unchanged denial or disable persistence.

Cache only request-independent component code and the exact schema snapshot
that shaped its controls. Renku Core resolves the system cache beneath its
platform configuration directory at
`cache/generation-configuration-visualizations/v1/routes/`; never calculate or
hard-code `~/.config/renku`, a Project folder, or the cache destination in the
Skill. The CLI returns the authorized absolute paths.

The cache key is the exact provider, executable model id, operation, and input
mode. Compatibility includes the effective route list, installed Visualize
version and contents, and `generation-configuration-template.md`. Workflow-only
instruction changes do not affect that template contract.

Write the fresh request payload in Project `tmp/scratch/`
with purpose, target, authored prompt, exact references, prepared provider/model,
and native values. Then run one preparation command:

```bash
node <media-producer-skill-dir>/scripts/prepare-generation-configuration-visualization.mjs \
  --provider <provider> \
  --model <exact-api-id> \
  --operation <operation> \
  --input-mode <input-mode> \
  --visualize-skill <absolute-installed-visualize-skill-md> \
  --visualize-skill-version <installed-version> \
  --descriptor tmp/operations/media-generation/generation-configuration-visualization-descriptor.json \
  --payload <absolute-request-payload-json> \
  --output <absolute-task-visualization-html>
```

The script supplies installed route-index paths and invokes Core-owned cache
preparation through the CLI. Core reads the effective bundled/personal list and
calculates its digest; the script saves the returned dependency descriptor.
Non-fresh results include the full `routes` for selector authoring. A fresh hit
returns `outputPath` for the ready HTML instance. There is no separate Inspect
or materialization round trip.

Handle the returned status exactly:

- `fresh`: render the returned `outputPath` with Visualize. Use `schemaPath`
  for the exact cached controls schema if needed. Do not call
  `generation schema show` or a provider schema endpoint.
- `miss`, `invalid`, or `incompatible`: obtain the exact current route schema
  once, generate one request-independent template, and store both as shown
  below.
- `expired`: obtain the exact current route schema once and call
  `configuration-visualization refresh`. A `refreshed` result reuses the
  existing template; `schema-changed` requires regenerating and storing the
  template. Treat `miss`, `invalid`, or `incompatible` from refresh like the
  same inspect status.

For an Engines provider, capture a refresh without shell redirection:

```bash
renku generation schema show --provider <provider> --model <api-id> \
  --output <absolute-schema-json> --json
renku generation configuration-visualization refresh \
  --file tmp/operations/media-generation/generation-configuration-visualization-descriptor.json \
  --schema <absolute-schema-json> --json
```

If the refresh fails, stop and report the schema failure. Never use an expired
entry as stale-on-error. A provider route without an Engines schema command may
use only an exact current schema or capability contract exposed by its selected
provider/harness; do not invent fields merely to make it cacheable.

Read the template contract before rebuilding. Keep request-specific payloads
out of shared templates.

After generating a new template, store it with the same schema snapshot:

```bash
renku generation configuration-visualization store \
  --file tmp/operations/media-generation/generation-configuration-visualization-descriptor.json \
  --schema <absolute-schema-json> \
  --template <absolute-template-html> --json
```

The Core-owned manifest supplies `checkedAt` and an `expiresAt` exactly 24 hours
later, semantic schema and template hashes, and dependency fingerprints. Use
manifest timestamps, never filesystem modification times, to decide freshness.

After storing or refreshing, complete preparation using the saved descriptor
and the same fresh payload:

```bash
renku generation configuration-visualization prepare \
  --file tmp/operations/media-generation/generation-configuration-visualization-descriptor.json \
  --payload <absolute-request-payload-json> \
  --output <absolute-task-visualization-html> --json
```

Render only the returned task-local instance with Visualize. Never render the
shared template directly.

## Prepare one fresh request

Prepare the authored prompt, exact proposed references, and provider-native
values for the initial provider/model before rendering the component, but do
not write the review document yet.

Materialize a fresh component instance for the pending purpose and target.
Reuse a compatible cached template, but never reuse an earlier request's
instance HTML, browser state, payload, or selected values. Its initial provider
comes from explicit user direction or the matching Project Setting; its initial
model and values come from the purpose/model workflow and selected provider
route.

Render it directly in the Codex conversation by ending the turn with the
Visualize content reference to the materialized HTML. Wait for acceptance of
the displayed settings before writing the review document; do not continue to
Preview or Execute in the same configuration turn. Do not launch an external browser,
start a preview server, or create a reusable component application for this
request.

The matching Project Setting chooses only the initial selection. It must never
narrow the provider or model choices. Keep discovery lightweight:

1. Use the complete `routes` from the non-fresh preparation result for Provider
   and Model options. These are resolved by Core from the installed indexes and
   personal library; no separate catalog file or model-list call is needed.
2. Build selectors from the effective exact identities and human-readable names.
   Do not exclude personal routes for lacking operation or media-kind metadata.
   Existing bundled hints can help presentation but are not capability gates.
   Add Codex for image work only when the active harness exposes it. Selecting
   another provider for this request is an explicit one-request choice, not a
   Settings change. A saved Project media preference can initially select its
   keyed provider even when no bundled route matches the current request.
3. For only the selected route, read its provider Skill, available bundled advice,
   optional personal Markdown from `generation models show`, and fresh cached or
   newly fetched schema. An absent optional personal file needs no search or
   discovery retry. Missing advice is ordinary absence, without a warning
   or approval question. Current bundled defaults and explicit personal
   preferences apply independently of discovery labels. Build controls from the
   selected schema; explain actual input mismatches during preparation. No
   separate capability check or transport/output audit is required.

Do not eagerly inspect every alternative or pre-generate every possible control
set. The selector indexes are enough to offer alternatives; exact compatibility
with reference cardinality and native constraints is checked only if the user
chooses an alternative. The rendered component never fetches schemas or calls
Renku/provider APIs.

## Handle a provider or model change

In the follow-up turn, first rerun `renku credentials status --json` when the
provider changed. If its key is absent, follow Media Producer's Settings-link
preflight and wait for a fresh configured status before preparing the route.
Then read only the newly selected provider Skill, exact route,
adapter, canonical model/operation guides, and fresh cached or newly fetched
schema. Resolve the selected route's cache entry before contacting its provider.
Confirm that it can carry every non-negotiable appearance authority, first/last
frame, source video, voice, or other required input. If it cannot, keep the
prior prepared selection and explain the incompatibility; never drop the
reference.

When the underlying model changed, recreate the prompt for that model's
technique while preserving the user's creative intent and explicit facts. When
the canonical model is unchanged, preserve the prompt and carry a native value
only when the new schema contains the same exact property path and JSON type and
accepts the value. Otherwise use the newly selected route's prepared value or
schema default. Never map values by display label or guess equivalent fields.

Rewrite the pending payload and rematerialize the same task-local visualization
source file, then return the same Visualize content path in the follow-up turn.
Replace its prepared provider/model, prompt, controls, and initial values;
preserve the pending purpose, target, and exact references. The route template
may come from the system cache, but instance state is never global or
cross-thread. Do not create another instance file for each selection, and do
not rely on browser-local state surviving between turns.

## Template authoring

On a rebuild, read [the template contract](generation-configuration-template.md)
and the installed Visualize Skill. That contract owns composition, controls,
provider/model switching, payload use, and the exact follow-up handoff.
On a fresh hit, reuse the returned HTML without rereading template-authoring
instructions or modifying its controls.

Final `generation prepare` (or standalone `generation validate`) and `generation execute` remain authoritative live
provider boundaries. If validation reports that a cached-schema control or
value is no longer accepted, invalidate the entry:

```bash
renku generation configuration-visualization invalidate \
  --file tmp/operations/media-generation/generation-configuration-visualization-descriptor.json \
  --json
```

Refresh the schema, rebuild the template and request instance, and ask the user
to configure again. Never silently drop or rewrite a rejected value.
