# Replicate Reference Input Adapter

Use current Replicate metadata and the live schema for native media fields.
FLUX source images and Veo opening/ending images are implicit inputs unless the
exact selected model documentation establishes a prompt-visible mention.

- Put markers only in current native fields and preserve their required order.
- Describe supplied opening and ending states semantically without inventing
  numbered reference mentions.
- Keep prompt craft in the canonical model guide and configuration in the native
  request.

## Kling 4.0

The [model documentation](https://replicate.com/kwaivgi/kling-v4.0) and Renku's
live schema were checked 2026-10-27. Use lowercase, underscored `@image_N` and
`@video_N` mentions. Image numbering starts with `start_image`, then each
`middle_images` entry, then `end_image`, then `reference_images`. With a start
image and two references, the references are `@image_2` and `@image_3`.
Video numbering puts `base_video` first, followed by `reference_videos`.
An edit source is therefore `@video_1`; its first motion reference is
`@video_2`. Derive markers' `promptMention` only after final ordering.
Keep craft in the [Kling 4.0 guide](../../../media-producer/references/model-guides/video/kling-4.0.md).
