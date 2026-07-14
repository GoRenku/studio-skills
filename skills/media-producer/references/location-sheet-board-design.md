# Location Sheet Board Design

## When To Read

Read this file when writing or inspecting a `location.sheet` prompt.
Use it to choose the board sections that make the Location Sheet useful for
shot planning. Do not read it for `location.hero`, final shot video prompting,
or scene storyboard slicing.

Location Sheets are one full-image production reference board. They are not
sliced into mandatory front/right/back/left files.

## Contents

- Quality Bar
- Board Section Taxonomy
- Adaptive Section Selection
- Prompt-Building Recipe
- Inspection And Rejection Checklist
- Common Weak Outputs And Fixes

## Quality Bar

A strong Location Sheet helps a downstream artist, director, or video model
understand how the place works. It should answer practical continuity
questions, not merely look atmospheric.

A useful sheet often includes:

- one large, readable hero establishing view;
- selected alternate perspectives or reverse angles;
- spatial orientation, such as a top-down layout or high-angle overview;
- material, color, lighting, landmark, prop, and scale references when they
  matter to the Location;
- grounded period, genre, or story guardrails.

The neutral-studio reference sheet is a quality benchmark because it gives
multiple ways to understand one sparse space: establishing view, eye-level and
reverse views, high/low/corner perspectives, empty staging view, swatches,
lighting studies, layout map, scale references, landmarks, and props.

Do not copy that exact layout into every prompt. Exterior battlefields,
thresholds, streets, natural landscapes, vehicles, rooms, and abstract spaces
need different section choices.

## Board Section Taxonomy

Choose from this menu. Do not ask for every section by default.

### Spatial Sections

- **Hero establishing view**: the largest, clearest read of the place.
- **Eye-level perspective**: a human-height view useful for shot continuity.
- **Reverse angle**: the opposite side of the main axis.
- **High-angle overview**: a spatial read for geography, blocking, or scale.
- **Low-angle view**: useful for walls, ceilings, monuments, threat, or height.
- **Corner or diagonal perspective**: useful for rooms and two-wall geometry.
- **Empty staging view**: a clean version that can host many shot ideas.
- **Threshold view**: a doorway, gate, bridge, tunnel, window, boundary, or
  transition point.

### Continuity Sections

- **Top-down layout map**: a simple spatial map, not a technical floor plan
  unless the context needs one.
- **Material and texture swatches**: dominant wall, floor, stone, wood, glass,
  fabric, vegetation, dirt, metal, water, signage, or weathered surfaces.
- **Color palette reference**: the Location palette, kept distinct from generic
  Lookbook mood when possible.
- **Lighting studies**: time of day, weather, practical light, window light,
  firelight, smoke, fog, or shadow behavior.
- **Key landmarks**: entrances, gates, windows, statues, signs, ruins,
  machinery, towers, counters, altars, or distinctive silhouettes.
- **Environmental props**: objects that define use, class, period, occupation,
  story function, or repeated blocking.
- **Scale references**: human silhouette, doorway height, furniture, vehicle,
  wall height, street width, room size, or distance markers.
- **Camera or lens notes**: optional. Use only when camera emulation or previs
  continuity matters. Do not invent technical camera metadata for every sheet.

## Adaptive Section Selection

Select sections from the Location's actual production need. If missing user
intent would materially change the sheet, such as choosing between an empty
staging board, a damaged-state board, a night-lighting board, or a geography
overview, ask before writing the final spec. Otherwise infer a focused board
from the Location Design, scene usage, Movie Lookbook, and existing references.

State variants matter. A Location may need a separate sheet for day, night,
damaged, intact, crowded, empty, before, after, seasonal, or weather-specific
states when those states affect continuity.

### Interior Rooms And Sets

Prefer hero establishing, eye-level and reverse views, corner/diagonal
perspective, empty staging view, top-down layout, material swatches, lighting
studies, props, landmarks, and scale references.

Skip distant exterior context unless windows, entrances, or outside geography
drive the scene.

### Exterior Architecture And Streets

Prefer hero establishing, approach view, reverse view from the important
opposite side, high-angle or map-like spatial read, low-angle scale view when
vertical mass matters, landmarks, entrances, gates, towers, thresholds,
materials, ground surface, lighting/weather studies, and human or vehicle
scale.

For historical exteriors, choose period exclusions from the actual context
instead of dumping a generic anachronism list.

### Landscapes And Natural Locations

Prefer wide establishing view, movement route, high-angle geography or terrain
map, horizon/silhouette reference, ground texture, vegetation, water, rock,
mud, snow, weather swatches, scale anchors, and light/atmosphere studies.

Skip architectural floor-plan conventions unless built structures matter.

### Thresholds And Transitional Spaces

Prefer both sides of the threshold, axis of movement, reverse angle, key
doorway/gate/bridge/window/stair/tunnel/corridor/boundary, scale and material
changes across the boundary, and lighting contrast across sides.

### Abstract, Empty, Or Minimal Locations

Use subtle continuity. Prefer empty staging view, perspective variations,
surface relationships, material swatches, lighting studies, scale references,
simple layout map, and the few props that define the place.

Do not overfill a minimal Location with invented furniture or decoration.

## Prompt-Building Recipe

Build Location Sheet prompts in this order:

1. State the target as one finished full-image Location Sheet.
2. Name the Location, story period, scene usage, and production job.
3. Define the largest hero section first.
4. Select 4 to 8 supporting sections from the taxonomy.
5. Explain why each supporting section matters for continuity.
6. Bind materials, palette, lighting, and atmosphere to the active Movie
   Lookbook and active Location Design.
7. Add historical, genre, or story guardrails only when grounded in context.
8. Keep any labels in margins or captions, never over important visual content.
9. Ask for a clean, readable board with clear hierarchy, not a chaotic collage.
10. Give the saved spec a concise title that names the board's production
    purpose.

Adapt this skeleton instead of pasting it unchanged:

```text
Create one polished <context-selected aspect ratio> Location Sheet for
<location>. The sheet is a
production reference board for <scene usage / production job>, not a poster.

Make the largest panel a <hero establishing view>. Add supporting panels for
<selected sections>. Keep all panels consistent with the same place, period,
materials, palette, lighting behavior, landmarks, and scale anchors.

Use the selected Movie Lookbook for palette, texture, lens feel, lighting, and
atmosphere. Preserve these concrete Location Design facts: <facts>.

Exclude <grounded exclusions>. Keep any labels small and outside important
image content. Do not include debug marks, crop guides, UI, fake software
panels, or decorative poster typography.
```

## Inspection And Rejection Checklist

Before import, inspect the generated full image as one production board:

- Does it clearly represent the target Location?
- Does the hero section provide a strong readable overview?
- Do the supporting sections answer the intended production questions?
- Are multiple views consistent with one geography?
- Are materials, palette, and lighting grounded in the Location Design and
  Movie Lookbook?
- Are scale, landmarks, entrances, props, and movement paths readable when they
  matter?
- Is the sheet useful as one full image without slicing?
- Are labels, if present, outside key visual content and non-critical?
- Are anachronisms, modern artifacts, or genre-breaking details absent?
- Is the result more useful than a single pretty image?

Reject or ask for revision when:

- the image is mostly a poster, hero image, generic mood board, or stock-like
  collage;
- panels depict unrelated places;
- labels dominate or corrupt important imagery;
- the layout is too dense to inspect;
- key spatial or continuity facts are missing;
- the sheet contradicts user corrections or Location Design constraints;
- historical or genre guardrails are visibly violated.

For paid Renku-managed generation, explain the issue and ask whether to import
with caveats, revise the spec, or pay for regeneration. For Codex built-in image
generation, iterate through the image workflow when useful, but still do not
import weak media automatically.

## Common Weak Outputs And Fixes

- **Pretty single image**: add concrete supporting sections such as layout,
  reverse view, materials, lighting, landmarks, and scale.
- **Chaotic collage**: reduce sections and name one dominant hero panel.
- **Unrelated panels**: explicitly require all panels to show the same place,
  period, materials, landmarks, and scale anchors.
- **Overbearing labels**: ask for labels only in margins or captions and make
  visible imagery carry the meaning.
- **Generic historical mood**: add grounded period materials, infrastructure,
  props, and exclusions from the Location context.
- **No spatial usefulness**: add a top-down layout, high-angle overview,
  threshold view, movement route, or scale reference depending on the Location.
