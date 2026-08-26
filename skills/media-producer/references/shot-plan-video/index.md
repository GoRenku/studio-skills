# Shot Plan Video Generation

Use this workflow for a video request authored from one current Shot Plan.
The finished video is an independent Project Asset. The plan association is
weak authoring context, not ownership, dependency state, or a selected video.

## Required reads

1. Run `renku generation context --purpose <shot-plan-video-purpose> --target
   shot-plan:<shot-plan-id> --json`. Core supplies the exact Plan, Shots,
   coverage, Scene, related subjects/designs, dialogue, Lookbook, and
   relationship-derived media suggestions.
3. Read `workflow.md`.
4. Read `../model-guides/shared/prompt-input-visibility.md` and
   `../model-guides/shared/video-quality-checklist.md`.
5. Choose one exact route and operation from the provider Skill's
   `supported-routes.json`. Resolve its `modelKey` through
   `../model-guides/model-catalog.json`, then read the canonical model and
   operation guides plus the route's optional provider adapter.

## Input modes

- `text-only`: no method reference is sent.
- `first-frame`: the `first-frame` method slot routes to `image_url`.
- `first-last-frame`: `first-frame` and `last-frame` route to `image_url` and
  `end_image_url`.
- `reference`: selected images, videos, and audio route in preserved order to
  `image_urls`, `video_urls`, and `audio_urls`.

Choose references from the Core suggestions, user-provided media, or another
deliberate safe source. Suggestions are advisory, not an allowlist. Do not infer
Project relationships by filename or prompt prose. Put local-file markers directly in the exact provider-native
fields and derive provider ordinals from final array order only.

Optional auxiliary requests use `shot-plan.video-first-frame`,
`shot-plan.video-last-frame`, `shot-plan.video-storyboard`, or
`shot-plan.video-reference` and target `shot-plan:<id>`. Attachment preserves
the same weak `authoredFrom` association.
