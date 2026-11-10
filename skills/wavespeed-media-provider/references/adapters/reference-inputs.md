# WaveSpeed Reference Input Adapter

Use current WaveSpeed metadata and the live schema for exact native media
fields, order, and cardinality.

MiniMax H3 Image edit (`minimax/h3-image/edit`) uses ordered `images` with
one-based `image 1`, `image 2` mentions. Put the edit base first. Its schema
was checked 2026-11-10. Read [H3 Image guidance](../../../media-producer/references/model-guides/image/minimax-h3-image.md)
for casting continuity and edit craft.

- Opening and ending images are implicit unless current route documentation
  establishes an exact prompt-visible mention.
- Reference-to-video images, videos, and audio retain modality-local request
  order. Do not turn the canonical guide's neutral placeholders into `Image N`,
  `@ImageN`, or other syntax without exact WaveSpeed documentation.
- Keep all H3 prompt craft in the canonical MiniMax H3 guide.

## Kling 4.0

WaveSpeed's [route notes](https://wavespeed.ai/blog/ai-news/kling-4-0-is-coming-what-we-know-and-how-to-prepare-on-wavespeedai/),
checked 2026-10-27, establish `@ImageN`, `@VideoN`, and `@AudioN` for the
reference-to-video route, one-based in supplied modality-local order. Its
video-edit source is `@Video1`. Add exact `promptMention` values only after
final native input order is known. Do not apply these tokens to implicit
keyframe fields without documentation. Keep prompt craft in the
[Kling 4.0 guide](../../../media-producer/references/model-guides/video/kling-4.0.md).
