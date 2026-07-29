# Shot Brief Vocabulary

The brief is concise presentation metadata, not a second creative document.
Every group is optional.

Optional means unknown choices may remain absent. It does not mean an authored
choice should be omitted from the brief. When the planning pass intentionally
chooses an angle, focal length, depth of field, focus target, movement, or
other listed value, write that exact value into its matching brief field as
well as any natural-language description that needs it. Never infer these
values later from prose, but do not hide known choices only in prose.

- `durationSeconds`: positive approximate duration intent.
- `framing.start`, `framing.end`: Shot size.
- `camera.angle`: camera angle.
- `motion.movement`: camera or frame movement.
- `optics.intent`: primary human-readable optics choice.
- `optics.focalLengthMm`: positive numeric focal length in millimeters. Keep
  the JSON value numeric and unitless; Studio presents `24` as `24mm lens`.
- `optics.depthOfField`: optional exact value `"shallow"` or `"deep"`. Studio
  presents these as `Shallow Focus` and `Deep Focus`.
- `optics.focusTarget`: one primary optical subject, focus plane, or distance.
  Use a canonical context-provided `@handle` when that single subject is a
  known Cast Member or Location. Studio presents it as `Focus on …`.

Do not use `optics.focusTarget` as a list of every person or place intended to
remain sharp. Multiple subjects cannot all describe the lens's primary focus
target merely because deep focus keeps them legible. For a deep-focus Shot,
describe the desired multi-plane or shared spatial legibility in
`optics.intent`, then either name the deliberate primary focus plane in
`focusTarget` or omit `focusTarget` when no primary plane was chosen.
- `lighting.intent`: one human-readable lighting statement.

Prefer the exact Framing, Camera, and Motion catalog values below when they fit,
but custom non-empty language remains valid in those fields.

Shot size: `extreme-close-up`, `close-up`, `medium-close-up`, `medium-shot`,
`medium-full-shot`, `full-shot`, `wide-shot`, `extreme-wide-shot`,
`establishing-shot`.

Camera angle: `ground-level`, `knee-level`, `hip-level`, `shoulder-level`,
`eye-level`, `low-angle`, `high-angle`, `overhead`.

Movement: `static`, `pan`, `tilt`, `swish-pan`, `swish-tilt`, `tracking`,
`push-in`, `pull-out`, `zoom`, `rack-focus`.

`rack-focus` is a focus transition in Motion. Never write it into
`optics.depthOfField`. Omit depth of field when neither accepted value is
known, and use `optics.intent` for a more specific creative optics choice.

Author only the current brief groups and fields listed above.
