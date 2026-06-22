# Lookbook Image Purpose

Purpose key: `lookbook.image`

Target format: `lookbook:<lookbook-id>`

The image demonstrates how the target Lookbook's visual language behaves in a concrete situation.

For Movie Lookbooks, examples include:

- a horror scene using the Lookbook palette;
- a happy opening scene using the same texture and lighting rules;
- a camera-angle study for intimacy or distance;
- a texture and exposure sheet for rain, smoke, glass, skin, cloth, or architecture.

For Storyboard Lookbooks, the image demonstrates a single **style** aspect. The
storyboard aspects are `styleBrief`, `lineAndFinish`, `valueAndAccent`, and
`guardrails` (camera, panel notation, and continuity are not part of the style
Lookbook). Examples include:

- an overall-style frame for `styleBrief` (the best candidate for the card image
  / detail-page hero);
- a focused frame showing line weight and finish for `lineAndFinish`;
- a value/accent test that keeps the silhouette readable for `valueAndAccent`;
- a guardrail example that demonstrates what to avoid, only when the prompt can
  keep the output useful.

Read context and model choices first:

```bash
renku generation context --purpose lookbook.image --target lookbook:<lookbook-id> --json
renku generation model list --purpose lookbook.image --target lookbook:<lookbook-id> --json
```

Persist a spec before estimating or running:

```bash
renku generation spec create --file lookbook-image-spec.json --json
renku generation estimate --spec <spec-id> --json
renku generation run --spec <spec-id> --approval-token <approval-token> --json
```

Run only after the user explicitly approves both the estimated cost and sending
project-derived prompt/context to the provider.

For the real `renku generation run`, request sandbox/network permission before
the first attempt. The permission request should say that Renku will contact the
approved provider and send the approved project-derived prompt/context.

Inspect each generated image before import. Compare the visible image against the Lookbook type and sections, then choose only the sections it clearly demonstrates. Treat `focusSections` as generation intent, not placement truth.

Import finished media with the agent-reviewed section tags:

```bash
renku media import --purpose lookbook.image --target lookbook:<movie-lookbook-id> --source generated/media/<file> --sections palette --json
renku media import --purpose lookbook.image --target lookbook:<movie-lookbook-id> --source generated/media/<file> --sections composition --anchor composition-clinical-symmetry --json
renku media import --purpose lookbook.image --target lookbook:<storyboard-lookbook-id> --source generated/media/<file> --sections lineAndFinish --json
```

Use Movie Lookbook section tags only for Movie Lookbooks and Storyboard Lookbook section tags only for Storyboard Lookbooks. For Storyboard Lookbooks, tag exactly one style aspect per image so it appears next to the matching style widget, and set the `styleBrief` image as the card image / hero. For Movie Lookbooks, prefer one to three sections. When a Movie Lookbook image clearly demonstrates one specific `composition`/`lighting`/`camera` pattern or `palette`/`texture` observation, anchor it to that point's `id` with `--anchor <point-id>` (paired with the single `--sections` that owns the point) so it renders beside that point; read the available point ids from `renku lookbook show`. Do not tag all sections unless the image visibly and specifically demonstrates every section. If no section is clear, do not import automatically; explain why and ask whether to import it unsectioned, revise the spec, or approve another paid generation.

If the file is already attached as a Lookbook image, do not import it again. Change section tags or point anchors in place with `renku lookbook image set-placement --image <lookbook-image-id> --sections <section>[,<section>] [--anchor <point-id>] --json`; use `discard` only for user-requested removal.

A good Storyboard Lookbook sample image should be useful later as visual evidence for drawing style. It should not be a final film still, marketing poster, or generic mood image.
