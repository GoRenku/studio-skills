# Location World Workflow

## Source Context

Resolve durable ids instead of names or UI position:

```bash
renku project current --json
renku location show --location <location-id> --json
renku production-design location context --location <location-id> --json
renku asset list --project <project-name> --owner location:<location-id> --json
```

Read the active Location Design and inspect deliberately chosen Production
Location Sheets and other same-Location images. The active design supplies the
prose brief. One accepted Production Location Sheet supplies the spatial and
visual authority. Only the four final temporary flat-image files are runtime
image inputs to World Labs.

Do not use a panorama in this workflow. Do not ask an image model or World Labs
to generate a panorama, and do not submit a wide image as though it were a
panorama.

## Current World Labs Contract

Before preparing a paid request, read the current official World Labs pages:

- [Prompt guidelines](https://docs.worldlabs.ai/marble/create/prompt-guides)
- [Image prompt tips](https://docs.worldlabs.ai/marble/create/prompt-guides/image-prompt)
- [Multi-image prompt tips](https://docs.worldlabs.ai/marble/create/prompt-guides/multi-image-prompt)
- [World API OpenAPI specification](https://docs.worldlabs.ai/api/reference/openapi)
- [World API pricing](https://docs.worldlabs.ai/api/pricing)
- [World API FAQ](https://docs.worldlabs.ai/api/faq)

If the current documentation conflicts with these instructions or with Renku's
request contract, stop before spending credits and report the mismatch. Do not
guess a replacement payload.

For Auto Layout, World Labs currently documents these requirements:

- use standard flat images from the same single space;
- use images captured close to one another, covering different viewing
  directions, with visible overlap where possible;
- give every image exactly the same aspect ratio and resolution;
- prefer sharp, clearly lit images with consistent lighting and color;
- include clear depth and spatial context such as floor, walls, and ceiling;
- avoid borders, close-up object studies, people, blur, heavy compression,
  flat graphics, and unclear or badly exposed views;
- use PNG when practical, keep every image below 20 MB, and target the current
  recommended image size, presently about 1024 pixels on the long side.

The documented API uses `type: "multi-image"` with reconstruction enabled for
Auto Layout. In Renku, author `source.kind: "multiImage"`; the client enables
reconstruction and omits spherical directions/azimuths. Do not attach front,
back, left, or right direction metadata to an Auto Layout request.

## Unavoidable Provider Panorama And Billing

Do not confuse API request count, returned assets, and billing events:

- Renku sends one `POST /marble/v1/worlds:generate` request. It does not call a
  separate World Labs `pano:*` endpoint for this workflow.
- World Labs documents that its World Generation API requires a panorama to
  create a World. When the input is multi-image, World Labs generates that
  panorama internally before generating the World.
- Every completed World response includes `assets.imagery.pano_url`. Renku
  deliberately ignores that URL, does not download the panorama, and persists
  only the full-resolution SPZ. Ignoring the URL does not prevent the provider
  from creating or billing the panorama.
- At the currently documented Marble 1.1 rates, multi-image input maps to a
  100-credit panorama-generation event plus a 1,500-credit World-generation
  event, for 1,600 credits total. Re-read the pricing page immediately before
  every approval because pricing can change.
- There is no documented multi-image flag that suppresses the internal
  panorama stage, its charge, or the panorama asset in the World response.
- Supplying an already valid recognized panorama avoids the additional
  panorama-generation charge, but that is a different input workflow and is
  deliberately not used by this four-flat-image skill.

Therefore, if the user requires “only a World” to mean no provider panorama
generation, no panorama response asset, or no panorama usage charge, stop
before uploading or generating. The four-image Auto Layout workflow cannot
meet that requirement. Do not claim that `reconstruct_images`, omitted
azimuths, ignored output fields, or a World-only local attachment changes the
provider's billing pipeline.

## Canonical Location Contract

Before generating or choosing images, write and show one concise
natural-language contract. Do not invent a nested geometry schema, coordinate database,
or pseudo-CAD document. Use grounded prose from the active Location Design and
the user's corrections.

The contract must answer all of the following:

### Geometry

- Is this exactly one room, one open connected space, or another explicit
  boundary? Which apparent openings are real, and which walls remain closed?
- What are the named or relative sides, and which sides oppose each other?
- Which side contains each door, window group, arch, stair, passage, fixed
  cabinet run, fireplace, icon wall, or other permanent landmark?
- What are the visible counts and order of repeated features such as windows,
  columns, doors, bays, or arches?
- Where do major fixed furniture and circulation routes sit? State their axis,
  approximate proportion, clearance, and relationship to openings without
  inventing unsupported measurements.
- Where is one unobstructed camera area or compact cluster of nearby viewpoints?
  It must sit in walkable floor space, not inside furniture, a wall, or a door.
  This is source-image planning; Auto Layout accepts no camera-pivot field.

### Appearance

- State the construction and visible surface of floor, walls, ceiling, doors,
  windows, fixed furniture, and major built-ins.
- State age, repair, wear, dirt, soot, moisture, polish, paint, plaster loss,
  wood damage, metal finish, and other visible condition where grounded.
- State the exact natural and practical light sources, time/state, exposure
  character, and color relationship.
- State the few identity-defining pieces of dressing and what must remain
  sparse or absent.
- Translate period and story facts into concrete exclusions. Phrase them
  locally: for example, “the entrance is opaque repaired timber, never a
  glazed door,” rather than a generic ban on all glass. Exclude chandeliers,
  carpets, radiators, electric fixtures, modern hardware, or luxury finishes
  only when the design and references establish that they are absent.

If references contradict the contract, stop and resolve the contradiction
with the user. Do not ask the image model or Marble to choose.

## Authoritative Location Sheet

Use one accepted Production Location Sheet that follows
`$media-producer`'s `location-sheet-board-design.md`. For an interior intended
to feed Auto Layout, the sheet must contain exactly:

- four equal-size, equal-aspect perspective panels of the same space; and
- one clean top-down plan used only as spatial authority.

The four perspectives must be planned from the agreed unobstructed camera area
or compact nearby cluster, cover different directions, and share recognizable
overlap. They must keep room boundary, openings, landmark order, fixed
furniture, proportions, surfaces, lighting, and dressing unchanged. Put any
small captions outside the image panels.

The plan must show the same walls, openings, fixed landmarks, furniture axis,
circulation, and camera area. It may be diagrammatic and not to scale, but it
must not contradict the perspectives. Do not submit the plan or the composite
sheet to World Labs: a plan is a flat graphic, while Auto Layout expects flat
perspective images with spatial depth.

Reject the sheet before World preparation when it contains materials swatches,
prop close-ups, palette cards, lighting studies, people or human-scale panels,
decorative filler, extra invented rooms, inconsistent openings, or a plan that
does not match the four views.

## Four Flat Inputs

Derive the inputs deterministically from the accepted sheet:

1. Crop each of the four perspective panels to image content only.
2. Exclude all sheet titles, captions, borders, gutters, plan graphics, and
   background.
3. Inspect the four native crop sizes before resizing. If a panel is too small,
   soft, compressed, or unclear to meet World Labs' current image guidance,
   revise the Location Sheet; do not upscale it and call it detailed.
4. Normalize the set to one common aspect ratio and exact pixel size using only
   safe cropping and downscaling. Never stretch or warp an image.
5. Prefer PNG. Verify exact dimensions, format, color space, and file size with
   an image-identification tool.
6. Create one labeled QA montage from the exact files without changing them.

Review the montage against both the geometry and appearance contracts. Require:

- one coherent space, not duplicated rooms or side chambers;
- visible shared landmarks and overlap between neighboring views;
- identical opening counts, wall assignments, and landmark order;
- identical major furniture shape, orientation, scale, and clearance;
- identical construction, surface wear, palette, light sources, and dressing;
- sharp floor/wall/ceiling definition and usable foreground-to-background
  depth;
- no people, borders, labels inside the view, plan graphics, modern additions,
  or source-specific contradictions.

Present the montage and the four exact project-relative paths to the user. A
reviewed Location Sheet does not automatically approve its crops; obtain an
explicit acceptance of this exact four-file set before World prompt approval.

## World Prompt

World Labs currently limits text prompts to 2,000 characters. Use the available
space for concrete reconstruction guidance, not praise, generic cinematic
language, or claims such as “faultless.” Write in this order:

1. **Single-space geometry:** boundary, named sides, openings, repeated-feature
   counts, closed walls, and prohibited extra rooms or passages.
2. **Fixed layout:** major furniture axis, proportions, circulation, and
   relationship to doors, windows, and landmarks.
3. **Construction and surfaces:** exact materials, visible age, repairs, wear,
   dirt, soot, plaster loss, wood/metal character, and finish.
4. **Dressing and light:** identity-defining objects, what remains sparse,
   natural/practical light sources, time/state, and atmosphere.
5. **Grounded prohibitions:** likely inventions that contradict the accepted
   design and images, stated specifically for that Location.

Do not write a geometry-only prompt. Marble interprets the images creatively
and may invent plausible content outside or between views, so the prompt must
constrain both topology and visible art direction. Do not use prompt text to
excuse contradictory source pixels.

Renku sends the supplied prompt with provider recaptioning disabled. Review the
exact final string because World Labs receives it without semantic rewriting.

Use this shape, replacing every bracketed item with grounded prose and deleting
the brackets before review:

```text
Reconstruct exactly one [space and boundary]. [Named-side layout, opening counts,
closed walls, and landmark order]. Do not create extra rooms, corridors, arches,
doors, windows, or duplicate structures.

[Major furniture] remains [shape, axis, proportion, placement, and circulation]
relative to [doors/windows/landmarks].

Construction and surfaces: [floor]; [walls]; [ceiling]; [doors/windows]; [fixed
furniture and built-ins]. Preserve [specific age, repairs, wear, dirt, soot,
plaster loss, wood/metal character, and finish].

Dressing and light: [few defining objects and sparse/absent areas]. Illumination
comes only from [grounded natural and practical sources], with [time/state and
exposure character].

Do not invent [Location-specific anachronisms, luxury finishes, fixtures,
furniture, decoration, or material substitutions contradicted by the design].
```

Every paragraph must contain useful Location-specific information. Keep the
final result below the provider's current text limit.

## Paid Submission Gate

Present all of the following together:

- exact Location name and id;
- exact non-empty prompt and character count;
- all four ordered project-relative image paths and identical dimensions;
- a statement that these are standard flat same-space images, not panoramas;
- fixed World Labs model `marble-1.1`;
- Auto Layout reconstruction with no direction or pivot metadata;
- provider recaptioning disabled;
- one `/worlds:generate` API request containing two provider usage events for
  multi-image input: internal panorama generation and World generation;
- the current documented credit amount for each event and the total;
- the fact that every World response includes a provider panorama URL, which
  Renku ignores and does not persist;
- the fact that Renku saves the full-resolution SPZ locally while the remote
  World remains in World Labs.

Ask for explicit approval. Approval of the Location Sheet, image generation,
or crop set does not approve Marble. Any prompt or image change requires a new
review and a new Marble confirmation. The approval must acknowledge the
internal panorama event and its current charge. If the user declines that
event or asks for World-only billing, do not submit the multi-image request.

## Success And Failure

The generate command succeeds only after Core downloads the full-resolution
SPZ once, persists it as a ready Location-owned Asset, and selects it. Source
images remain temporary. Read back `renku location world show` and use its exact
`selectedWorld`; never infer selection from creation order.

Inspect the World in two separate passes:

- **geometry:** number of spaces, walls, openings, landmark order, furniture
  axis, scale, circulation, and camera reset/orientation;
- **appearance:** construction, textures, wear, furniture design, dressing,
  lighting fixtures, period accuracy, and prohibited inventions.

If validation fails, repair only the operation envelope or paths. If World
Labs fails, report the structured failure and stop. If the result is visually
unacceptable, record exact geometry and appearance failures, then stop. Never
submit a blind or automatic retry. A changed four-image set or prompt requires
fresh review and explicit paid approval.

Prior successful candidates remain available through common Asset history.
Rollback changes only the `location-world:<location-id>` selection and does not
replace or delete files.
