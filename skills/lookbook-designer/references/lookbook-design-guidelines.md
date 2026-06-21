# Lookbook Design Guidelines

Write the Lookbook as a usable creative system.

## Movie Lookbooks

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

A Storyboard Lookbook captures a drawing/illustration **style**, used to generate
sample storyboard images. It is not shot direction: do not include camera,
composition, panel notation, screen direction, or continuity — those are directed
later in the flow. The style is open-ended: graphite hand-drawn, realistic,
cartoon, watercolour, rough sketch, full colour, and so on. Do not assume graphite
or monochrome.

Every section has a required `text` field (the prompt-facing source of truth). Add
the optional structured fields when they fit the style; they drive the Studio
style widgets so a reader can see what the text describes.

Style Brief:

- summarize the drawing language in practical, visible terms;
- set `styleKind` to the medium (e.g. "graphite hand-drawn", "realistic",
  "cel cartoon"); provide a `palette` of named ColorSwatches (full colour for
  colour styles, a limited substrate/line/midtone/accent set for monochrome) and
  a few `tags`.

Line and Finish:

- specify line weight, looseness, visible construction, medium behaviour, and
  finish level;
- provide `marks` (label + relative thickness, heaviest to lightest) and optional
  `hatching`. Omit `marks` for styles with no linework (e.g. realistic).

Value and Accent:

- define the value range, contrast, and any accent rule;
- provide `valueSteps` (light-to-dark `#rrggbb` stops; works for colour too),
  `contrast`, and `accents` whose `meaning` states where each accent is allowed.

Guardrails:

- list concrete visual failures to avoid in `forbidden` and the modes to favour
  in `favored`, plus a short `text` summary.

Reject Storyboard Lookbook prose that cannot become visible prompt instructions.
Translate it into medium, marks, values, palette, and readable style.

For updates, preserve the existing style unless the user asks for a full
replacement.
