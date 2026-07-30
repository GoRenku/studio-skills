# Shot Plan Video Generation

Use this workflow for a video request authored from one current Shot Plan.
The finished video is an independent Project Asset. The plan association is
weak authoring context, not ownership, dependency state, or a selected video.

## Required reads

1. Read the exact plan with `renku shot-plan show`.
2. Read Core context with the exact Shot Plan id:

```bash
renku generation context \
  --purpose shot-plan.video-generation \
  --target project \
  --authored-from-shot-plan <shot-plan-id> \
  --json
```

3. Read `workflow.md`.
4. Read `../video-generation/provider-visible-prompting.md` and
   `../video-generation/prompt-quality-checklist.md`.
5. Choose one active Seedance family and one input mode, then read the mapped
   exact route guide from `../video-model-guide-registry.json`.

## Input modes

- `text-only`: no method reference is sent.
- `first-frame`: the `first-frame` method slot routes to `image_url`.
- `first-last-frame`: `first-frame` and `last-frame` route to `image_url` and
  `end_image_url`.
- `reference`: selected images, videos, and audio route in preserved order to
  `image_urls`, `video_urls`, and `audio_urls`.

Choose references from the Core guide. Do not infer candidates by filename or
scan prompt prose. Keep the exact context-returned placement and subject.
Replacing a file in a slot preserves its existing mention metadata; assign a
new exact provider ordinal only after reviewing the final request.

Optional auxiliary requests use `shot-plan.video-first-frame`,
`shot-plan.video-last-frame`, or `shot-plan.video-storyboard`, target Project,
and carry the same `authoredFrom` association.
