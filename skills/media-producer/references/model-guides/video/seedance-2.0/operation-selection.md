# Seedance 2.0 Operation Selection

Choose one supported Seedance operation through the selected provider route.
Confirm native fields through that route's adapter and live schema; do not infer
that another provider, tier, or version has the same request contract.

## Creative Selection Guidance

- Use text-to-video when no exact media file should control the request.
- Use image-to-video when an opening image is binding; include an ending input
  only when the provider supports it and the destination frame is also binding.
- Use reference-to-video when one or more images, videos, or audio files should
  guide the result without becoming a binding opening frame.
- Inspect a storyboard/reference image before choosing the storyboard prompt
  guide. Its visual contents remain agent/user-owned creative evidence.
- Match authored duration to action density. Warn before paid execution when
  the selected allowed duration cannot carry the requested beats clearly.

## Recovered Duration Strategy

- Keep a single-shot, simple-action prompt compact and give it one clear
  movement arc.
- For an edited multi-shot sequence, use explicit ordered shot sections.
- For a continuous multi-beat take, describe physical waypoints along one camera
  path so the model does not blend beats into a collage.
- Dense action, narration, or many beats require enough selected duration for
  the requested temporal structure.
