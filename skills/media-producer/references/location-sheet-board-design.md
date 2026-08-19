# Location Sheet Board Design

Read this file when writing or inspecting a `location.sheet` prompt.

## Purpose

A Location Sheet is primarily a spatial continuity reference. It must show one
place from enough consistent directions to make its geography understandable.
It is not a mood board, prop board, materials board, poster, or collection of
decorative studies. When the sheet will feed a 3D Location World, it is also the
shared spatial and visual authority for four temporary Auto Layout inputs; it
must preserve appearance as carefully as geometry.

## Default Board

For an interior, use only:

- one large establishing view along the Location's main axis;
- one matched reverse view from the opposite end of that axis;
- one view from each perpendicular side;
- one clear top-down plan.

When the sheet is explicitly intended for World Labs Auto Layout, keep all four
perspective panels equal in size and aspect ratio so they can be cropped without
warping or major reframing. Plan the views from one unobstructed camera area or
compact cluster of nearby positions shown in the plan. Cover different viewing
directions while retaining recognizable overlap and clear floor/wall/ceiling
depth. The plan may use a different panel size because it will not be submitted
to World Labs.

For an exterior, landscape, or threshold, adapt those five sections into four
useful directional or geographic views plus one plan or map. Omit a direction
only when it genuinely cannot describe that Location.

Do not automatically add material swatches, texture studies, palette cards,
prop close-ups, dressing studies, lighting-study panels, human-scale figures,
camera notes, or story-zone overlays. Include one only when the user explicitly
asks the sheet to answer that separate question.

## Plan First

Resolve the plan before generation. The prompt must state:

- the named or relative sides of the Location;
- the exact wall or side containing each door, window, gate, opening, or other
  fixed landmark;
- which sides oppose each other;
- the axis and placement of major fixed furniture or movement routes; and
- any side that must remain blank or closed;
- for a World-ready sheet, one walkable camera area or compact nearby cluster
  that does not intersect a wall, opening, or furniture.

Avoid ambiguous placement language such as "opposite or oblique." If the
active design, existing images, and user corrections disagree, stop and resolve
one simple plan before authoring the GenerationSpec.

Treat the top-down plan as the spatial authority. Every perspective panel must
derive from that same plan. The plan should show only walls or boundaries,
openings, fixed landmarks, major furniture, and useful circulation. Keep it
clean; do not fill it with prop zones, material legends, decorative callouts,
or invented technical notation.

A plan reference improves generation but does not guarantee that an image
model will preserve topology across several perspective panels. When exact
view-to-plan agreement is required, use another already approved same-space
source in addition to the plan when one exists. If it does not, treat one
generated sheet as review-first exploration and never attach it when a wall,
opening, furniture axis, or camera area disagrees. Do not introduce a 3D
blockout workflow unless the user explicitly requests one.

## Appearance Is Part Of Continuity

The prompt must carry the complete active Location Design into every
perspective, not merely a style label. State:

- floor, wall, ceiling, door, window, built-in, and major furniture construction;
- surface age, repair, wear, dirt, soot, moisture, plaster loss, wood/metal
  character, and finish where grounded;
- stable natural and practical light sources, time/state, and exposure behavior;
- identity-defining set dressing and what must remain sparse or absent; and
- concrete period/story exclusions derived from the design and references.

Keep those facts identical across all four views. “Historically plausible,”
“weathered,” or “cinematic” is not enough. If a door must be opaque repaired
timber, say that. If the accepted design has no suspended lighting, carpets,
radiators, modern hardware, or luxury polish, exclude those exact inventions.
Do not add a generic anachronism dump unrelated to the Location.

## Prompt Recipe

Write the prompt in this order:

1. Request one finished full-image Location Sheet, not a poster or mood board.
2. State the authoritative plan in plain language.
3. Define the establishing, reverse, and two perpendicular views from that
   plan. For a World-ready sheet, require four equal-format panels from the
   agreed nearby camera area, with different directions and recognizable
   overlap. State what must appear on the left, ahead, and right in each view
   when that relationship is important.
4. Require identical architecture, openings, landmarks, furniture placement,
   proportions, and state across all views.
5. Describe construction, surface condition, furniture character, dressing,
   period, lighting sources, palette, and atmosphere inside the views.
6. Request one clean top-down plan that matches those views exactly.
7. Exclude extra panels, filler, and grounded anachronisms. When the sheet is
   World-ready, place captions and borders outside the four image panels.

Keep labels optional, small, and in margins. The image content must carry the
spatial meaning; do not depend on generated labels to repair unclear views.

## Inspection

Reject the sheet before import when any of these are true:

- the plan contradicts the active Location Design or user correction;
- a door, window, opening, or landmark moves to another wall between views;
- a major furniture or movement axis rotates or changes length without cause;
- the establishing and reverse views do not show the same space from the
  intended matched camera relationship; for a standard sheet this normally
  means opposite ends, while a World-ready sheet uses nearby viewpoints facing
  different directions;
- a side view invents another room, corridor, archway, or duplicate space;
- construction, surface wear, furniture design, light source, or set dressing
  changes between views;
- a grounded period exclusion is violated, such as an invented glazed entrance,
  chandelier, radiator, carpet, electric fixture, modern hardware, or luxury
  finish that contradicts the design;
- a World-ready view lacks overlap or clear spatial depth, or its panel is too
  small or soft to yield a sharp crop near World Labs' current recommended
  input size without upscaling;
- the sheet replaces useful views with materials, props, lighting studies,
  scale figures, or decorative filler;
- the board is too dense to inspect or behaves like a poster or mood collage.

After generation, inspect the complete image once under
`image-output-review.md`. Do not invent a runtime slicing or semantic-validation
system.
