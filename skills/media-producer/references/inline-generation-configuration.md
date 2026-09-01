# Inline Generation Configuration

Use this guide whenever a Media Producer purpose asks `@Visualize` to configure
one pending generation request. The installed Visualize Skill is the styling,
layout, interaction, and accessibility authority. This guide defines only the
Renku-specific request behavior and presentation outcomes.

## Build a fresh request instance

Create a new transient visualization for the pending purpose and target from
the current Project Settings, supported-route indexes, and exact live provider
schemas. Do not reuse an earlier request's HTML or browser state. Reuse this
interaction and presentation contract so separate instances remain visually
consistent.

Inspect the live schema for every provider/model option shown. Include only
supported, relevant choices whose native controls can be represented from that
schema. Keep provider-specific field names and raw values intact; never create
a second persistent control schema.

## Present one coherent configuration

Present one compact, legible inline configuration with clear hierarchy and
balanced use of the available conversation width. Keep related controls aligned
and give numeric ranges enough horizontal room to read and adjust comfortably.

- Identify the target and generation purpose concisely.
- Group provider, model, output, and reference choices coherently before
  performance controls.
- Keep field widths and spacing visually orderly instead of allowing intrinsic
  control widths to produce a cramped wrapping row.
- Show selected options and boolean states clearly on the first render.
- Avoid redundant prose, oversized headings, decorative summaries, and unused
  space.

For every numeric control, show the label first and its current formatted value
as a separately aligned part of the same control header, such as `Speed` and
`0.95×`. Update the visible value as the control changes. Never require the user
to infer a value from thumb position, color, hover, or a tooltip.

Use the live schema's minimum, maximum, step, default, enum, title, description,
and units. Preserve enough precision to distinguish adjacent valid values. Use
human-readable display formatting while retaining the exact raw value for the
request: for example, sample rate may display as `44.1 kHz` while the applied
value remains `44100`. Do not convert a dimensionless value to a percentage or
invent qualitative labels unless the provider schema defines that meaning.

Selects must show the selected option, switches must show an adjacent state
label when their meaning is not obvious from the field label, and disabled or
unavailable controls must be omitted rather than shown as decorative UI.

## Return the selection to Codex

Include one clearly labeled continuation action that is visually integrated
with the configuration. It calls `window.openai.sendFollowUpMessage` with the
exact purpose, target, provider, model, selected voice/reference identities,
and provider-native raw control values. Use a compact readable summary plus a
JSON object so the next turn can author the review document without
interpreting display labels.

Do not treat a thumb movement or other browser-local state as accepted request
state. Author the generation request only from the values returned in the
follow-up turn, or from the unchanged initial values when the user separately
confirms them in conversation. Never write these choices to Project Settings.
