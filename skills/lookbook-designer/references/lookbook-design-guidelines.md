# Lookbook Design Guidelines

Write the Lookbook as a usable creative system.

## Production Lookbooks

Thesis:

- state what the movie should feel like visually;
- include repeatable principles a generator or cinematographer can apply;
- avoid merely naming references.

Palette:

- explain color behavior, not just colors;
- connect colors to narrative or emotional meaning;
- keep hex values deliberate and limited.

Tone and Mood:

- describe contrast, saturation, exposure, highlight behavior, shadow behavior, and emotional temperature;
- keep mood tags short and useful.

Composition:

- describe blocking, frame pressure, scale, symmetry/asymmetry, negative space, depth, and recurring frame shapes.

Lighting:

- describe source logic, color temperature, falloff, contrast, day/night behavior, and practicals.

Texture:

- describe surfaces, grain, atmosphere, lens/filter feel, weather, production materials, and tactile detail.

Camera:

- keep movement, motion, and framing distinct;
- describe when the camera moves and why;
- describe what breaks the normal grammar.

## Storyboard Lookbooks

A Storyboard Lookbook captures an arbitrary Storyboard **visual language** used
to generate Beat Storyboard images. It is the sole appearance authority for
those images. It may define project-wide notation and continuity-clarity
conventions. It is not Shot direction: do not include camera, composition,
panel staging, screen direction, crop behavior, or Scene-specific continuity—
those are decided later per Scene and Beat. The visual language may be photorealistic,
realistic, illustrative, graphic, painterly, hand-drawn, abstract, monochrome,
full color, or another deliberate system. Do not assume linework, drawing,
graphite, warmth, or any other medium.

Every section has a required `text` field (the prompt-facing source of truth). Add
the optional structured fields when they fit the style; they drive the Studio
style widgets so a reader can see what the text describes.

Treat the sections as orthogonal descriptions of one immutable visual identity.
`styleBrief` establishes that identity; `lineAndFinish`, `valueAndAccent`, and
`guardrails` constrain the same medium and finish. A later section must not
introduce a second rendering technique merely because its widget describes a
different property. Derive section language from accepted visual references
when they exist, and make every example image look as though it came from the
same artist and production system.

Style Brief:

- summarize the visual language in practical, visible terms;
- set `styleKind` to the medium (e.g. "graphite hand-drawn", "realistic",
  "cel cartoon"); provide a `palette` of named ColorSwatches (full colour for
  colour styles, a limited substrate/line/midtone/accent set for monochrome) and
  a few `tags`.

Line and Finish:

- specify line weight, looseness, visible construction, and mark behavior when
  linework exists; for realistic or other no-linework styles, describe edge
  behavior, tonal modeling, surface treatment, and finish level instead;
- inherit the medium and rendering level established by `styleBrief`; do not
  use this section to reinterpret the overall style;
- provide `marks` (label + relative thickness, heaviest to lightest) and optional
  `hatching`. Omit `marks` for styles with no linework (e.g. realistic).

Value and Accent:

- define how light, middle, dark, and any accent values are allocated inside
  the established style;
- preserve the established medium, line character, texture, and finish. Do not
  introduce washes, hatching, roughness, modeled lighting, or extra rendering
  unless those properties already belong to `styleBrief` and `lineAndFinish`;
- provide `valueSteps` (light-to-dark `#rrggbb` stops; works for colour too),
  `contrast`, and `accents` whose `meaning` states where each accent is allowed.
  Treat the stops as a descriptive key, not a demand that every example image
  showcase every stop equally.

Guardrails:

- list concrete visual failures to avoid in `forbidden` and the modes to favour
  in `favored`, plus a short `text` summary.

Reject Storyboard Lookbook prose that cannot become visible prompt instructions.
Translate it into medium, form/edge or mark behavior, values, palette, texture,
detail density, and readable style.

Section placement is evidence organization, not separate art direction. Default
each Storyboard example to the single section it most clearly demonstrates. The
canonical overall-style image belongs in `styleBrief` unless the user explicitly
wants it repeated elsewhere. Reuse an accepted example across multiple sections
only when the repetition itself is useful evidence and no dedicated example
already covers the secondary section. Once a dedicated example exists, narrow
the broader image's placement with `lookbook image set-placement`. An empty
section image area is better than repeating a generic image as filler, and a
Lookbook does not need a generated image for every section.

For updates, preserve the existing style unless the user asks for a full
replacement.
