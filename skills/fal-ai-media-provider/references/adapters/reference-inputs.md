# Fal.ai Reference Input Adapter

Use the selected route's live schema as final field authority. This adapter owns
only Fal.ai request placement and provider-visible mention syntax; canonical
model guides own prompt craft.

- Image edit routes place ordered source/reference markers in their current
  native image field. When the selected route documents `@ReferenceN`, derive
  `N` from final request order.
- Seedance reference-to-video derives `@ImageN`, `@VideoN`, and `@AudioN` from
  final modality-local array order.
- MiniMax H3 reference-to-video derives spaced `Image N`, `Video N`, and
  `Audio N` mentions from final modality-local array order. Do not add `@`.
- Singular opening and ending frame fields are implicit unless the exact route
  documentation establishes a prompt-visible mention. Do not invent one.
- Never copy native fields, counts, bounds, or defaults from this adapter; read
  them from `generation schema show` immediately before authoring the request.
