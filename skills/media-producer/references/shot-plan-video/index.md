# Shot Plan Video Generation

For a `previs` Shot Plan, read `blender-previs.md` before selecting inputs. Empty Shots are expected; use the reviewed registered previs revision as video reference.

Use this workflow for a video request authored from one current Shot Plan.
The finished video is an independent Project Asset. The plan association is
weak authoring context, not ownership, dependency state, or a selected video.

## Required reads

1. Run `renku generation context --purpose <shot-plan-video-purpose> --target
   shot-plan:<shot-plan-id> --json`. Core supplies the exact Plan, Shots,
   coverage, Scene, related subjects/designs, dialogue, Lookbook, and
   relationship-derived media suggestions.
3. Read `workflow.md`.
   For multiple clips or an incomplete-output continuation, read `scene-segmentation.md`.
4. Read `../model-guides/shared/prompt-input-visibility.md` and
   `../model-guides/shared/video-quality-checklist.md`.
5. Choose an exact route through `generation models list` or explicit user
   direction. Use the selected schema and optional advice under Media Producer's
   guidance rules. Look up available bundled `modelKey` advice through
   `../model-guides/model-catalog.json` independently of personal labels; missing
   routes, keys, or guides do not block preparation.

## Input modes

- `text-only`: no method reference is sent.
- `first-frame`: the `first-frame` method slot routes to `image_url`.
- `first-last-frame`: `first-frame` and `last-frame` route to `image_url` and
  `end_image_url`.
- `reference`: selected images, videos, and audio route in preserved modality-local
  order to the exact native fields in the selected route schema. Seedance uses
  `image_urls`/`video_urls`/`audio_urls`; H3 Max and Wan use `reference_image_urls`/
  `reference_video_urls`/`reference_audio_urls`.

Choose references from the Core suggestions, user-provided media, or another
deliberate safe source. Suggestions are advisory, not an allowlist. Do not infer
Project relationships by filename or prompt prose. Put local-file markers directly in the exact provider-native
fields and derive provider ordinals from final array order only.

Optional auxiliary requests use `shot-plan.video-first-frame`,
`shot-plan.video-last-frame`, `shot-plan.video-storyboard`, or
`shot-plan.video-reference` and target `shot-plan:<id>`. Attachment preserves
the same weak `authoredFrom` association.
