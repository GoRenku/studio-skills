# Inline Generation Configuration

Use this guide for the transient `@Visualize` component shown before Media
Producer authors any image, video, or audio review document. The installed
Visualize Skill owns styling, theme, layout primitives, interaction, and
accessibility. This guide owns only Renku's shared composition and request
handoff.

## Prepare one fresh request

Prepare the authored prompt, exact proposed references, and provider-native
values for the initial provider/model before rendering the component, but do
not write the review document yet.

Build a fresh component for the pending purpose and target. Never reuse an
earlier request's HTML, browser state, or selected values. Its initial provider
comes from explicit user direction or the matching Project Setting; its initial
model and values come from the purpose/model workflow and selected provider
route.

Render it directly in the Codex conversation. Do not launch an external browser,
start a preview server, or create a reusable component application for this
request.

The matching Project Setting chooses only the initial selection. It must never
narrow the provider or model choices. Keep discovery lightweight:

1. Read only the small `supported-routes.json` index for each Renku provider
   named by Media Producer's execution-lane guidance, including advanced
   providers. Do not read an unselected provider's Skill, adapter, model guide,
   operation guide, documentation, or live schema. Choosing an advanced
   provider in this component is an explicit one-request user choice; it does
   not make that provider a Project default.
2. Build the Provider list from every index with a route broadly compatible
   with the pending media kind, operation, and input mode. Build each provider's
   Model list from those indexed routes and human-readable names. Add Codex for
   image work only when the active harness exposes its built-in image
   capability. Do not fetch schemas merely to refine these selector options.
3. For only the initial provider/model, read the selected provider Skill,
   selected route adapter, canonical model/operation guides, and exact live
   input schema. Build configuration controls only for this prepared selection.

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
adapter, canonical model/operation guides, and live schema. Confirm that it can
carry every non-negotiable appearance authority, first/last frame, source
video, voice, or other required input. If it cannot, keep the prior prepared
selection and explain the incompatibility; never drop the reference.

When the canonical `modelKey` changed, recreate the prompt for that model's
technique while preserving the user's creative intent and explicit facts. When
the canonical model is unchanged, preserve the prompt and carry a native value
only when the new schema contains the same exact property path and JSON type and
accepts the value. Otherwise use the newly selected route's prepared value or
schema default. Never map values by display label or guess equivalent fields.

Update the same visualization source file used for this pending generation and
return the same Visualize content path in the follow-up turn. Replace its
prepared provider/model, prompt, controls, and initial values; preserve the
pending purpose, target, and exact references. This is per-request reuse, not a
global or cross-thread cache. Do not create another component file for each
selection, and do not rely on browser-local state surviving between turns.

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

Use the live schema's title, description, enum/one-of choices, minimum, maximum,
step, default, and units:

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

Do not infer inclusion from familiar field names. If the live schema does not
provide enough information for a truthful control, omit it and retain the
prepared request value unchanged. Omit unavailable controls instead of showing
disabled decoration.

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
