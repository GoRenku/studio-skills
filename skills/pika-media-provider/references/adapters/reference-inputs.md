# Pika Reference Input Adapter

Use the exact live schema for native fields and media cardinality. The initial
Seedream and MiniMax H3 Pika routes use their image inputs implicitly and do not
establish checked-in prompt-visible mentions.

- Put source, reference, opening, and ending markers only in exact live-schema
  fields.
- Preserve final request order and meaningful review labels.
- Do not invent `@ReferenceN`, `@ImageN`, `Image N`, or another mention merely
  because the canonical model guide contains neutral placeholders.
- If Pika later documents an exact mention contract, update this adapter rather
  than copying model prompt guidance into the provider skill.
