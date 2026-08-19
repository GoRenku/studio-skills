# Location Design

Location Design is a Location-owned production-design document.

Use it for:

- spatial thesis;
- architecture;
- set dressing;
- materials and surfaces;
- atmosphere;
- location-local recurring objects;
- continuity;
- Location Sheet guidance in `locationSheetGuidance`;
- generation guidance.

Commands:

```bash
renku production-design location context --location <location-id> --json
renku production-design location list --location <location-id> --json
renku production-design location show --active --location <location-id> --json
renku production-design location show --design <location-design-id> --json
renku production-design location validate --file tmp/operations/location-design.json --json
renku production-design location write --file tmp/operations/location-design.json --json
renku production-design location set-active --location <location-id> --design <location-design-id> --json
```

Keep the document about the physical world and production design. Do not store shot coverage, generated media paths, final edit timing, or crew logistics.

The JSON document is only Renku's persistence envelope. Write the design itself
as readable natural-language prose in the existing fields. Do not invent a
second nested geometry object, coordinate schema, wall database, or set of
opaque abbreviations. Each array entry should communicate a complete production
design fact that a human can understand without decoding field relationships.

## World-Ready Location Design

When spatial continuity or a 3D World matters, make every relevant field
specific enough to author the Location Sheet and World prompt without
reconstructing the design from chat history:

- `spatialThesis`: state how the whole place is organized, its number of spaces,
  dominant axis, functional center, and intended movement/circulation.
- `architecture`: name each wall or side; say which sides oppose; assign every
  door, window group, arch, passage, stair, built-in, and fixed landmark to one
  side; give repeated-feature counts and order when visible; state which sides
  remain closed. Describe proportions without inventing unsupported exact
  measurements.
- `setDressing` and `recurringObjects`: identify only the few objects that define
  use, story, and period. State their placement, condition, and required
  sparseness. Do not promote decorative filler into design requirements.
- `materialsAndSurfaces`: describe floor, walls, ceiling, doors, windows, major
  furniture, built-ins, and metalwork separately. Include construction, age,
  repairs, wear, dirt, soot, moisture, plaster loss, paint/polish level, and
  finish where grounded. Avoid empty labels such as “old stone and wood.”
- `atmosphere`: identify actual natural and practical light sources, time/state,
  temperature, exposure character, and how light behaves on the specified
  surfaces. Do not replace physical description with generic mood adjectives.
- `continuity`: lock opening counts and wall assignments, landmark order, fixed
  furniture shape/axis/clearance, important object placement, and state. Record
  explicit user corrections here.
- `locationSheetGuidance`: request four equal-format same-space perspective
  panels plus one authoritative top-down plan, with consistent construction,
  surfaces, lighting, and dressing. Name the intended nearby camera area when a
  sheet will become a World Labs Auto Layout source.
- `generationGuidance`: convert period and story requirements into concrete
  visible instructions and grounded exclusions. For example, specify an opaque
  repaired timber entrance rather than merely saying “historical,” and exclude
  a glazed entrance, chandeliers, radiators, carpets, modern fixtures, or luxury
  finishes only when they contradict this Location.

If any of those facts remain undecided and the choice would materially change
the plan or appearance, keep it in `openQuestions` and resolve it before media
generation. Do not silently choose an answer in an image prompt.

Avoid phrases such as “opposite or oblique,” “some windows,” “period furniture,”
or “weathered materials.” They permit incompatible plans and generic imagery.

Treat an approved top-down plan as the spatial authority for a Location Sheet.
Every perspective view must agree with it. If existing images, user
corrections, and the active design disagree, stop the media handoff and resolve
one simple plan first; do not ask image generation to reconcile the conflict.
The plan is an authority and review artifact, not a substitute for recording
the same geography in prose.
