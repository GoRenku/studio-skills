# Readable Description And Optics Evaluations

- Given a complex Shot with exact Cast Member and Location handles in current
  context, the agent uses only relevant `##` sections, canonical `@handle`
  source text, and strong Markdown for material known camera or optics choices.
- Given a simple Shot, the agent omits Lighting, Sound, or another irrelevant
  section instead of adding filler copy.
- The agent reads exact handles before authoring and never guesses a handle from
  a display label or title.
- Unknown framing, movement, focal length, depth, lighting, or sound choices
  remain absent instead of becoming generic film language.
- `focalLengthMm` is a positive numeric JSON value without `mm` or `lens`.
- `depthOfField` is absent, `"shallow"`, or `"deep"`; no display label or
  focus-transition term is stored there.
- `focusTarget` names one primary optical subject, plane, or distance. It never
  becomes a list of everyone kept legible by deep focus; that shared
  legibility belongs in `optics.intent`.
- `rack-focus` is authored only as a Motion value when it is the actual choice.
- Optics and Lighting intent remain concise and are not mechanical copies of
  the description.
- A later single-Shot wording or brief change validates a current `kind:
  "shot"` document and uses `renku shot-plan shot update`, not whole-plan
  replacement.
