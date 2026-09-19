# Inline Generation Configuration

Use this guide for the transient `@Visualize` component shown before Media
Producer authors any image, video, or audio review document. The installed
Visualize Skill owns styling, theme, layout primitives, interaction, and
accessibility. This guide owns Renku's shared composition, system cache, and
request handoff.

## Reuse a system-cached route template

Cache only request-independent component code and the exact schema snapshot
that shaped its controls. Renku Core resolves the system cache beneath its
platform configuration directory at
`cache/generation-configuration-visualizations/v1/routes/`; never calculate or
hard-code `~/.config/renku`, a Project folder, or the cache destination in the
Skill. The CLI returns the authorized absolute paths.

The cache key is the exact provider, executable model id, operation, and input
mode. Its compatibility fingerprint also includes the effective name/route list used
to populate Provider and Model selectors, the installed Visualize Skill version
and SHA-256, template contract version `1`, and this reference's SHA-256. Use
`scripts/write-generation-configuration-visualization-descriptor.mjs` to write
that descriptor to
`tmp/operations/media-generation/generation-configuration-visualization-descriptor.json`
in the current Project. First run `renku generation models list --json` with all five current provider
indexes as repeated `--route-index` arguments. Pass its unfiltered
`routeCatalogSha256` as `--route-catalog-sha256`; never compute the cache path
yourself. Optional Markdown changes do not change this digest.

```bash
node <media-producer-skill-dir>/scripts/write-generation-configuration-visualization-descriptor.mjs \
  --provider <provider> \
  --model <exact-api-id> \
  --operation <operation> \
  --input-mode <input-mode> \
  --route-catalog-sha256 <effective-list-routeCatalogSha256> \
  --visualize-skill <absolute-installed-visualize-skill-md> \
  --visualize-skill-version <installed-version> \
  --template-contract <absolute-this-reference-md> \
  --output tmp/operations/media-generation/generation-configuration-visualization-descriptor.json
```

Inspect before contacting a provider:

```bash
renku generation configuration-visualization inspect \
  --file tmp/operations/media-generation/generation-configuration-visualization-descriptor.json \
  --json
```

Handle the returned status exactly:

- `fresh`: use the returned `schemaPath` and `templatePath`. Do not call
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

A reusable template must be a Visualize HTML fragment under 1 MB and contain
exactly one
`<!--__RENKU_GENERATION_CONFIGURATION_PAYLOAD__-->` placeholder. Its code reads
the fresh request payload from
`#renku-generation-configuration-payload`. It may embed the compatible
Provider/Model options and schema-derived control structure, labels, bounds,
and enumerated values. It must not embed a prompt, purpose target, references,
credentials, request-specific initial selections, browser state, or any other
request-specific or Project-specific value.

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

For every request, write a new JSON payload in Project `tmp/scratch/` containing
the pending purpose, target, prompt, exact references, prepared provider/model,
and initial native values. Materialize it into the current task's Visualize
artifact directory:

```bash
node <media-producer-skill-dir>/scripts/materialize-generation-configuration-visualization.mjs \
  --template <cache-template-path> \
  --payload <absolute-request-payload-json> \
  --output <absolute-task-visualization-html>
```

Render only that fresh task-local instance with `@Visualize`. Never render the
shared template directly and never place the request payload in the shared
cache.

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

Render it directly in the Codex conversation. Do not launch an external browser,
start a preview server, or create a reusable component application for this
request.

The matching Project Setting chooses only the initial selection. It must never
narrow the provider or model choices. Keep discovery lightweight:

1. Run `generation models list --json` with all five current provider Skills'
   `supported-routes.json` files as repeated `--route-index` arguments, including
   advanced providers. This returns bundled and personal choices. Do not read
   unselected Skills, guides, adapters, documentation, or schemas.
2. Build selectors from the effective exact identities and human-readable names.
   Do not exclude personal routes for lacking operation or media-kind metadata.
   Existing bundled hints can help presentation but are not capability gates.
   Add Codex for image work only when the active harness exposes it. Selecting
   an advanced provider is an explicit one-request choice, not a Settings change.
3. For only the selected route, read its provider Skill, available bundled advice,
   optional personal Markdown from `generation models show`, and fresh cached or
   newly fetched schema. Missing advice is ordinary absence, without a warning
   or approval question. Current bundled defaults and explicit personal
   preferences apply independently of discovery labels. Build controls from the
   selected schema; explain actual input mismatches during preparation. No
   separate capability check or transport/output audit is required.

Do not eagerly inspect every alternative or pre-generate every possible control
set. The selector indexes are enough to offer alternatives; exact compatibility
with reference cardinality and native constraints is checked only if the user
chooses an alternative. The rendered component never fetches schemas or calls
Renku/provider APIs.

## Change provider or model in a second step

The component records the provider and executable model whose prompt, adapter,
schema, and controls are currently prepared. Changing either selector must not
pretend the old controls belong to the new route:

- rebuild the Model choices immediately when Provider changes;
- hide the prepared route's native controls while either selector differs from
  the prepared selection;
- show a concise live message: **Changing provider or model will prepare its
  settings and may recreate the prompt before you continue.** When the indexed
  canonical `modelKey` changed, state that the prompt will be recreated for the
  selected model; and
- change the primary action to **Prepare selected model**.

That action sends a follow-up containing the pending purpose, target, exact
references, current prompt, selected provider/model, prepared provider/model,
and previous native values. It does not accept settings, author a review
document, or generate media.

In the follow-up turn, read only the newly selected provider Skill, exact route,
adapter, canonical model/operation guides, and fresh cached or newly fetched
schema. Resolve the selected route's cache entry before contacting its provider.
Confirm that it can carry every non-negotiable appearance authority, first/last
frame, source video, voice, or other required input. If it cannot, keep the
prior prepared selection and explain the incompatibility; never drop the
reference.

When the canonical `modelKey` changed, recreate the prompt for that model's
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

## Use one shared composition

Follow the compact voice-sample component composition: one bounded card, a
concise title and context line, restrained hierarchy, orderly fields, and one
full-width primary action. Use Visualize's standard card, form controls,
ranges, and primary block button without custom per-purpose styling. Render one
Configuration surface with no tabs.

Do not show reference thumbnails, labels, paths, marker objects, or a References
section in this component. Generation Preview remains the exact reference
review surface. Keep bounded choices already owned by a purpose, such as
selecting a compatible Cast Voice sample, as ordinary configuration controls.
Do not add a Project Asset browser, file picker, upload, drag/drop,
reference-role editor, or durable selection.

Show Provider and Model first, followed by useful route-native controls for the
currently prepared selection only. Keep related controls aligned in a balanced
grid and give numeric ranges enough room to read and adjust. Show selected
options and boolean state on the first render. Prefer natural component growth
to cramped fields or an inner scrolling form.

For each numeric control, put the label first and the formatted current value
as a separately aligned part of the same header, such as `Speed` and `0.95×`.
Update it with the control. Never require the user to infer a value from thumb
position, color, hover, or a tooltip.

Use the fresh schema snapshot's title, description, enum/one-of choices,
minimum, maximum, step, default, and units:

- use a select for a finite scalar choice;
- use a slider for a useful number or integer with a truthful finite range and
  usable step;
- use a numeric input for a useful number without a truthful slider range;
- use an accessible checkbox or switch for a boolean, with a visible state
  label when the field label is ambiguous;
- use a text input only for a useful short scalar string that is not prompt-like
  and whose meaning is clear from the schema; and
- decompose a nested object only when its child fields independently fit these
  controls. Never expose raw JSON editing.

Initial values use this precedence: explicit user direction, applicable Project
workflow preference, agent-authored request value, then live-schema default.
Human-readable display formatting must preserve the exact raw value and enough
precision to distinguish adjacent valid choices. For example, display `44.1
kHz` while returning `44100`; do not turn a dimensionless value into a
percentage or invent qualitative labels.

Omit fields that are not meaningful one-request user choices:

- prompt and negative-prompt text, because the Codex handoff and retained
  Generation Preview own prompt editing;
- local-file marker objects, upload URLs or handles, native mention bookkeeping,
  and reference-order internals;
- credentials, authentication, callbacks, webhooks, queueing, polling,
  delivery, storage, and output URLs;
- provider debug/internal fields without a clear creative or output decision;
- values fixed by the purpose, including required media kind, input mode, exact
  output count, or deterministic sheet layout; and
- unavailable, deprecated, read-only, or untruthfully renderable fields.

Do not infer inclusion from familiar field names. If the fresh schema snapshot
does not provide enough information for a truthful control, omit it and retain
the prepared request value unchanged. Omit unavailable controls instead of
showing disabled decoration.

## Return prompt and settings to Codex

When the selectors still match the prepared selection, place one full-width
**Continue with these settings** action below the configuration fields. It
calls `window.openai.sendFollowUpMessage` with the
optional confirmation title `Continue with generation settings`. When a
selector differs, use the separate **Prepare selected model** behavior above
instead.

The follow-up body places the exact current authored prompt first:

```text
Use this prompt for the pending <purpose> generation:

<exact current authored prompt>

Use this exact one-shot generation configuration:
```

Then append a fenced JSON object with two-space indentation and stable key
order:

```json
{
  "purpose": "<purpose>",
  "target": "<target>",
  "provider": "<provider>",
  "model": "<exact executable provider model id>",
  "references": [],
  "controls": {}
}
```

Use `JSON.stringify(value, null, 2)`. `references` preserves the existing exact
request marker or purpose-specific voice identity shapes; do not invent a
normalized reference DTO. `controls` preserves the selected provider's native
field names, nesting, raw values, and types. The prompt stays outside JSON so
the user can edit it without changing a duplicate prompt field.

A control change is only browser-local state. Author the review document from
the returned prompt and JSON, or from unchanged initial values only when the
user separately confirms them in conversation. Never persist these choices to
Project Settings.

At this point the provider/model already matches the prepared selection, so the
prompt and controls belong to the same inspected route. Put the prepared prompt
into the existing Generation Preview, where the user can still edit it, and
continue through the normal confirmation workflow.

Final `generation validate` and `generation execute` remain authoritative live
provider boundaries. If validation reports that a cached-schema control or
value is no longer accepted, invalidate the entry:

```bash
renku generation configuration-visualization invalidate \
  --file tmp/operations/media-generation/generation-configuration-visualization-descriptor.json \
  --json
```

Refresh the schema, rebuild the template and request instance, and ask the user
to configure again. Never silently drop or rewrite a rejected value.
