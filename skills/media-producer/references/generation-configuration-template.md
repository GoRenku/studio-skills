# Generation Configuration Template Contract

Read when authoring or rebuilding a shared template. This file defines its
compatibility fingerprint; workflow instructions live in inline-generation-configuration.md.

A reusable template must be a Visualize HTML fragment under 1 MB and contain
exactly one
`<!--__RENKU_GENERATION_CONFIGURATION_PAYLOAD__-->` placeholder. Its code reads
the fresh request payload from
`#renku-generation-configuration-payload`. It may embed the compatible
Provider/Model options and schema-derived control structure, labels, bounds,
and enumerated values. It must not embed a prompt, purpose target, references,
credentials, request-specific initial selections, browser state, or any other
request-specific or Project-specific value.

## Change provider or model in a second step

The component records the provider and executable model whose prompt, adapter,
schema, and controls are currently prepared. Changing either selector must not
pretend the old controls belong to the new route:

- rebuild the Model choices immediately when Provider changes;
- hide the prepared route's native controls while either selector differs from
  the prepared selection;
- show a concise live message: **Changing provider or model will prepare its
  settings and may recreate the prompt before you continue.**; and
- change the primary action to **Prepare selected model**.

That action sends a follow-up containing the pending purpose, target, exact
references, current prompt, selected provider/model, prepared provider/model,
and previous native values. It does not accept settings, author a review
document, or generate media.

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
continue through the normal confirmation workflow. Configuration submission
accepts settings; it does not itself authorize a paid run before the resulting
Preview. Offer the explicit continue-to-generate choice once that Preview is
ready, then use the shared unchanged-document execution path after confirmation.

