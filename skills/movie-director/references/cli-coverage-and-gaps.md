# CLI Coverage And Gaps

Use this reference to decide whether a requested department workflow is fully supported today. When support is partial, name the exact missing media or post-production contract.

## Director Context

```bash
renku director context --json
renku director context --selection '<studio-selection-json>' --json
```

The report includes screenplay, analysis, Inspiration, Lookbook, cast design/media readiness, production-design/media readiness, Scene Beats, and storyboard readiness.

## Department Authoring

Casting:

```bash
renku cast list --json
renku cast show <cast-member-id> --json
renku cast context --cast <cast-member-id> --json
renku cast validate --file <cast-operations-json> --json
renku cast apply --file <cast-operations-json> --json
renku cast design context --cast <cast-member-id> --json
renku cast design validate --file <cast-design-json> --json
renku cast design write --file <cast-design-json> --json
renku cast design set-active --cast <cast-member-id> --design <cast-design-id> --json
```

Production design:

```bash
renku location list --json
renku location show <location-id> --json
renku location context --location <location-id> --json
renku location validate --file <location-operations-json> --json
renku location apply --file <location-operations-json> --json
renku production-design location context --location <location-id> --json
renku production-design location validate --file <location-design-json> --json
renku production-design location write --file <location-design-json> --json
renku prop list --json
renku prop context --prop <prop-id> --json
renku prop validate --file <prop-operations-json> --json
renku prop apply --file <prop-operations-json> --json
renku production-design prop context --prop <prop-id> --json
renku production-design prop validate --file <prop-design-json> --json
renku production-design prop write --file <prop-design-json> --json
```

Screenplay commands do not mutate Cast Members, Locations, or Props.

## Media Generation

Use `media-producer` for generation specs, estimates, approved runs,
inspection, slicing, and supported focused attachment.

Current media purposes include Lookbook images and typed sheets, Cast Character
Sheets, cast profiles and voice samples, Location Sheets and heroes, Prop
Sheets and heroes, Scene Storyboard Sheets, dialogue audio, and general image creation
and editing. Read current purpose context and model
descriptors through `media-producer`; do not reconstruct removed route, input,
or request-planning contracts here.

## Shot Planning

Use `shot-planner` for `renku shot-plan` list, show, validate, create, focused
plan detail updates, Shot add/update/move/remove, copy/delete, and explicit
selected-image work. `shot.image` creates Shot-owned image candidates. Common
`renku asset select` chooses an existing candidate; accepted generation may
import with `--select`. Shot video authoring remains a gap.

## Lookbook Image Placement

Use the Lookbook command surface for existing Lookbook image placement changes:

```bash
renku lookbook image set-placement --image <lookbook-image-id> --sections <section>[,<section>] --json
renku lookbook image set-placement --image <lookbook-image-id> --sections <section> --anchor <lookbook-point-id> --json
renku lookbook image set-placement --image <lookbook-image-id> --sections thesis,<point-owning-section> --anchor <lookbook-point-id> --json
```

Do not use discard plus media import to retag or re-anchor an existing Lookbook image. `set-placement` replaces the image placement set, so include every section and optional point anchor the image should keep. Production `thesis` is a single-image placement: a new Thesis placement replaces the previous Thesis placement without discarding that previous image or removing its other placements. Other Production section and point placements append until the slot has 10 images. `renku lookbook image discard` is only for intentional removal from the Lookbook.

## Hard Gaps

- Costume-variant media is not a first-class purpose. Cast voice samples use
  `cast.voice-sample`, but durable attachment remains owned by the Cast Voice
  command rather than generic media import.
- Location-local set-dressing media is not a first-class purpose.
- Sound, music, editorial, and final assembly workflows are incomplete.
