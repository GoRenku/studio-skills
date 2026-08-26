# Seedance 2.0 Endpoint Selection

Choose one direct provider/model endpoint from the Fal.ai provider Skill.
Confirm every field against that exact model guide and live validation; do not
infer that another Seedance tier or version has the same contract.

Current fal.ai Seedance 2.0 endpoint shapes include:

| Endpoint suffix | File-backed media fields | Prompt guide |
| --- | --- | --- |
| `text-to-video` | none | `text-only.md` |
| `image-to-video` | required `image_url`; optional `end_image_url` | `first-frame.md`, plus `first-last-frame.md` when both are assigned |
| `reference-to-video` | `image_urls`, `video_urls`, `audio_urls` | `reference.md` or `storyboard-reference.md` |

The full, Mini, and Fast Seedance 2.0 families currently offer these endpoint
suffixes, but always use an exact id from the Skill's supported-model index.

## Exact Provider Assignment

- Assign one opening image to `image_url` for image-to-video.
- Assign one destination image to `end_image_url` only when that field exists.
- Assign reference images, videos, and audio to `image_urls`, `video_urls`, and
  `audio_urls` respectively for reference-to-video.
- Put local-file markers directly in these native fields.
- Do not include a reference that has no valid native field on the selected
  endpoint.

For example, a storyboard or other video reference goes in `image_urls` for a
selected reference-to-video endpoint. A binding First Frame goes in `image_url`
for image-to-video. The prompt explains the file's creative role; the native
field determines where it enters the provider request.

Validate the exact spec, then inspect:

```bash
renku generation preview show \
  --file tmp/operations/media-generation/request.json \
  --json
```

Use the final native request as evidence that assignments and array ordering are
what the prompt expects. For reference-to-video, array order determines `@ImageN`,
`@VideoN`, and `@AudioN` numbering.

## Creative Selection Guidance

- Use text-to-video when no exact media file should control the request.
- Use image-to-video when an opening image is binding; add `end_image_url` only
  when a destination frame is also binding.
- Use reference-to-video when one or more images, videos, or audio files should
  guide the result without becoming a binding opening frame.
- Inspect a storyboard/reference image before choosing the storyboard prompt
  guide. Its visual contents remain agent/user-owned creative evidence.
- Match authored duration to action density. Warn before paid execution when
  the selected allowed duration cannot carry the requested beats clearly.
