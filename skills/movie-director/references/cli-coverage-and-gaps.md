# CLI Coverage And Gaps

Use this reference to decide whether a requested department workflow is fully supported today. When support is partial, name the exact missing media or post-production contract.

## Director Context

```bash
renku director context --json
renku director context --selection '<studio-selection-json>' --json
```

The report includes screenplay, analysis, Inspiration, Lookbook, cast design/media readiness, production-design/media readiness, shot-list, storyboard, and shot-video readiness.

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
```

Screenplay commands do not mutate Cast Members or Locations.

## Media Generation

Use `media-producer` for generation specs, estimates, approved runs, inspection, slicing, and import.

Current media purposes include Lookbook images/sheets, cast character sheets, cast profiles, location environment sheets, scene storyboard sheets, shot reference inputs, and shot video takes.

## Lookbook Image Placement

Use the Lookbook command surface for existing Lookbook image placement changes:

```bash
renku lookbook image set-placement --image <lookbook-image-id> --sections <section>[,<section>] --json
renku lookbook image set-placement --image <lookbook-image-id> --sections <section> --anchor <lookbook-point-id> --json
renku lookbook image set-placement --image <lookbook-image-id> --sections thesis,<point-owning-section> --anchor <lookbook-point-id> --json
```

Do not use discard plus media import to retag or re-anchor an existing Lookbook image. `set-placement` replaces the image placement set, so include every section and optional point anchor the image should keep. Movie `thesis` is a single-image placement: a new Thesis placement replaces the previous Thesis placement without discarding that previous image or removing its other placements. Other Movie section and point placements append until the slot has 10 images. `renku lookbook image discard` is only for intentional removal from the Lookbook.

## Hard Gaps

- Costume-variant media and voice sample media are not first-class purposes.
- Prop media and set-dressing media are not first-class purposes.
- Sound, music, editorial, and final assembly workflows are incomplete.
