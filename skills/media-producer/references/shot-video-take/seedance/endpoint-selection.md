# Seedance Endpoint Selection

Choose one direct provider/model endpoint from the current
`shot.video-take` context. Confirm every field against that exact model
descriptor; do not infer that another Seedance tier or version has the same
contract.

Current fal.ai Seedance 2.0 endpoint shapes include:

| Endpoint suffix | File-backed media fields | Prompt guide |
| --- | --- | --- |
| `text-to-video` | none | `text-only-final-video.md` |
| `image-to-video` | required `image_url`; optional `end_image_url` | `image-to-video-final-video.md`, plus `first-last-frame-final-video.md` when both are assigned |
| `reference-to-video` | `image_urls`, `video_urls`, `audio_urls` | `generic-reference-final-video.md` or `storyboard-reference-final-video.md` |

The full, Mini, and Fast Seedance 2.0 families currently offer these endpoint
suffixes, but always use the exact provider/model id returned by context.

## Exact Provider Assignment

- Assign one opening image to `image_url` for image-to-video.
- Assign one destination image to `end_image_url` only when that field exists.
- Assign reference images, videos, and audio to `image_urls`, `video_urls`, and
  `audio_urls` respectively for reference-to-video.
- Keep file-backed media fields out of `values`.
- Do not include a guide selection that has no valid provider field on the
  selected endpoint.

For example, a Video Prompt Sheet retains its context-returned
`shot` / `video-prompt-sheet` placement while receiving
`"providerField": "image_urls"` for a selected reference-to-video endpoint.
A First Frame retains `shot` / `first-frame` while receiving
`"providerField": "image_url"` for image-to-video. Placement communicates the
file's product role; `providerField` determines where the exact file enters the
provider request.

Validate the exact spec, then inspect:

```bash
renku generation preview show --file <generation-spec-json> --json
```

Use `providerPayload` as evidence that assignments and array ordering are what
the prompt expects. For reference-to-video, array order determines `@ImageN`,
`@VideoN`, and `@AudioN` numbering.

## Creative Selection Guidance

- Use text-to-video when no exact media file should control the request.
- Use image-to-video when an opening image is binding; add `end_image_url` only
  when a destination frame is also binding.
- Use reference-to-video when one or more images, videos, or audio files should
  guide the result without becoming a binding opening frame.
- Inspect a storyboard/reference image before choosing the storyboard prompt
  guide. Its visual contents remain agent/user-owned creative evidence.
- Match authored duration to action density. Warn before estimate when the
  selected allowed duration cannot carry the requested beats clearly.
