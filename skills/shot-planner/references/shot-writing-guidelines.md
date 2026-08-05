# Shot Writing Guidelines

Write `description` as one self-contained, model-neutral cinematic idea in
temporal order. For a complex Shot, use only the relevant sections from this
compact vocabulary:

```md
## Intent

## Composition & Blocking

## Camera & Optics

## Lighting

## Sound

## End Condition
```

- `Intent` states the dramatic or visual reason for the Shot.
- `Composition & Blocking` states the opening frame, visible subjects, spatial
  relationships, action, and performance.
- `Camera & Optics` states framing progression, angle, movement, focal length,
  focus behavior, and continuity constraints that are actually known.
- `Lighting` states material source, direction, quality, contrast, color, or
  time-of-day intent.
- `Sound` states dialogue, voice-over, ambience, or a synchronization cue only
  when sound materially defines the Shot.
- `End Condition` states the visible, performative, or camera condition that
  ends the Shot.

This is an optional section vocabulary, not a six-field form. A simple Shot may
need only Intent, Composition & Blocking, Camera & Optics, and End Condition.
Omit empty or irrelevant sections. Do not repeat one sentence across sections
or invent a choice to fill the structure.

Read exact current Cast Member, Location, and Prop handles from CLI context
before authoring. Refer to those entities with their canonical source tokens,
such as `@urban`, `@imperial-council-chamber`, or `@great-bombard`; never derive
a handle from a display name or title.

Wrap only material known cinematography choices in strong Markdown, such as
`**Establishing Shot**`, `**Eye-Level**`, `**24mm lens**`,
`**Deep Focus**`, or `**Zoom**`. Do not bold ordinary prose or automatically
emphasize every filmmaking word.

Preserve exact Markdown. Keep prose natural and temporal inside each section.
Do not fill unknown choices with generic film language.

When Optics or Lighting intent matters, state it plainly in the description as
well as the glanceable brief. Do not mechanically compare or derive one from
the other, and do not copy the same sentence into both surfaces.

Use concise authored titles. A Shot Plan title names the plan itself, and a
Shot title names the Shot itself. Do not append the Scene title, covered Beat
number, `coverage`, framing, movement, or another technical summary to either
title; those facts already have owned fields and visible surfaces.
