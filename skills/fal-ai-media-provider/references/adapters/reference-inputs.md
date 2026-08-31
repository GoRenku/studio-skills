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
- Gemini Omni Flash 1.1 reference-to-video derives zero-based
  `<IMAGE_REF_0>` and `<VIDEO_REF_0>` mentions from final modality-local array
  order. Its current live schema does not expose reference audio; do not invent
  an audio field or mention.
- Wan 3.0 Prime reference-to-video derives one-based spaced `Image N`,
  `Video N`, and `Audio N` mentions from final modality-local array order. A
  document or public webpage in the route's singular native field has no
  numbered mention; describe its narrow role without inventing a token.
- Singular opening and ending frame fields are implicit unless the exact route
  documentation establishes a prompt-visible mention. Do not invent one.
- A singular source video for Gemini Omni Flash 1.1 edit is implicit. Put it in
  `video_url` and write a direct edit instruction without inventing a video
  mention.
- Native audio generation is not uploaded reference-audio support. Apply the
  shared Dialogue Audio continuity policy only when the exact selected live
  route exposes an uploaded audio reference field.
- The current Fal Omni index exposes text, image, reference, and edit routes but
  no continuation route. Do not repurpose edit for model continuation.
- Never copy native fields, counts, bounds, or defaults from this adapter; read
  them from `generation schema show` immediately before authoring the request.
