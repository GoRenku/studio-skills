# Screenplay YAML Schema

Use this reference when generating or revising screenplay YAML packages.

## Contents

- [Document Rules](#document-rules)
- [Package Shape](#package-shape)
- [Field Contract](#field-contract)
- [Screenplay Block Types](#screenplay-block-types)
- [Rendering Contract](#rendering-contract)
- [Revision State](#revision-state)
- [Complete Example](#complete-example)

## Document Rules

- A screenplay is a small folder package, not one monolithic file.
- The package entrypoint is `screenplay/screenplay.yaml`.
- The entrypoint starts at the YAML document root. Do not wrap it in another top-level object.
- Set `schema_version` to `0.1`.
- Keep `schema_version`, `cast_ref`, `locations_ref`, and `act_refs` together near the top of the entrypoint.
- Store project metadata, concept material, and `story_arc` under `project`.
- Store cast and location records as front-matter Markdown files in folders.
- Store each act as a YAML file under `screenplay/acts/`.
- Infer act, sequence, scene, and beat ordering from YAML list order.
- Do not add manual ordering fields such as `number`.
- Do not repeat containment relationships inside child objects. For example, scenes do not need `act_id` or `sequence_id`.
- Do not store renderer-dependent page positions such as `estimated_page_start`.
- Use stable IDs for UI navigation and later rendering:
  - Cast IDs are durable kebab-case folder names derived from the canonical name, such as `mara` or `urban`.
  - Location IDs are durable kebab-case folder names derived from the canonical name, such as `theodosian-walls`.
  - Act, sequence, scene, beat, and block IDs keep their structured form, such as `act-1`, `seq-001`, `scene-001`, `beat-001`, and `block-001`.
- Keep both renderer-facing text and structured fields where useful.
- Use `null` for unknown values when a field is present, not empty strings.
- Omit optional fields when they do not apply and omission will not make the renderer ambiguous.
- Use folded YAML scalars (`>`) for multi-sentence summaries when they improve readability.

## Package Shape

Recommended package layout:

```text
screenplay-folder/
  screenplay/
    screenplay.yaml
    acts/
      act-1.yaml
      act-2.yaml
      act-3.yaml
  cast/
    mara/
      description.md
    narrator/
      description.md
  locations/
    abandoned-mountain-tunnel/
      description.md
```

`screenplay/screenplay.yaml`:

```yaml
schema_version: 0.1
cast_ref: ../cast
locations_ref: ../locations
act_refs:
  - ./acts/act-1.yaml
  - ./acts/act-2.yaml
  - ./acts/act-3.yaml

project:
  title: The Working Title
  intended_audience: family
  target_length:
    label: 5-minute short
    estimated_pages: 5
    estimated_minutes: 5
  genre:
    primary: fantasy adventure
    secondary:
      - coming-of-age
  tone:
    - wonder
    - gentle suspense
  content_notes:
    rating_intent: all ages
    boundaries:
      - No graphic violence
  logline: A cautious child discovers an abandoned tunnel that opens onto a hidden railway between forgotten worlds.
  summary: >
    A young explorer follows clues left by an absent grandparent and discovers
    that old places are not dead, only waiting to be remembered.
  premise_overview: >
    The story begins in a rural mountain town where abandoned rail lines have
    become local myths.
  central_conflict: >
    The protagonist wants to prove the old tunnel is real, while the town and
    their own fear keep insisting that forgotten things should stay forgotten.
  dramatic_question: Will the protagonist find the courage to enter the hidden passage before it disappears again?
  themes:
    - Memory keeps places alive
  story_arc:
    structure_model: three_act
    acts: []

revision_state: {}
```

Each cast file:

```markdown
---
id: mara
name: Mara
role: protagonist
age: 11
want: To prove the abandoned tunnel is real.
need: To trust her curiosity even when adults dismiss it.
arc: Moves from hesitant observer to active explorer.
voice_notes: Plainspoken, precise, asks practical questions when scared.
---

## Description

Curious, cautious, observant, and quietly stubborn.
```

Each location file:

```markdown
---
id: abandoned-mountain-tunnel
name: Abandoned Mountain Tunnel
time_period: Present day
---

## Description

A sealed train tunnel overgrown with ferns, brambles, and old warning signs.

## Visual Notes

- Wet stone
- Rusting rail
- Thin daylight at the entrance
```

Each act file:

```yaml
id: act-1
title: The Door Appears
purpose: Introduce the world, protagonist, mystery, and first irreversible choice.
sequences: []
```

## Field Contract

### Entrypoint

`screenplay/screenplay.yaml` stores package-level references, project information, the story arc, and revision notes.

```yaml
schema_version: 0.1
cast_ref: ../cast
locations_ref: ../locations
act_refs:
  - ./acts/act-1.yaml
project: {}
revision_state: {}
```

`cast_ref`, `locations_ref`, and every item in `act_refs` resolve relative to `screenplay/screenplay.yaml`.

### `project`

`project` combines the former production-document metadata and concept material. It also owns `story_arc`.

```yaml
project:
  title: The Working Title
  intended_audience: family
  target_length:
    label: 5-minute short
    estimated_pages: 5
    estimated_minutes: 5
  genre:
    primary: fantasy adventure
    secondary:
      - coming-of-age
  tone:
    - wonder
    - gentle suspense
  content_notes:
    rating_intent: all ages
    boundaries:
      - No graphic violence
  logline: A cautious child discovers an abandoned tunnel that opens onto a hidden railway between forgotten worlds.
  summary: >
    A young explorer follows clues left by an absent grandparent and discovers
    that old places are not dead, only waiting to be remembered.
  premise_overview: >
    The story begins in a rural mountain town where abandoned rail lines have
    become local myths.
  central_conflict: >
    The protagonist wants to prove the old tunnel is real, while the town and
    their own fear keep insisting that forgotten things should stay forgotten.
  dramatic_question: Will the protagonist find the courage to enter the hidden passage before it disappears again?
  themes:
    - Memory keeps places alive
  story_arc: {}
```

### `story_arc`

Use `three_act` by default. For very short scripts, acts may be compact but should still show the hook, turn, climax, and resolution.

```yaml
story_arc:
  structure_model: three_act
  acts:
    - id: act-1
      title: The Door Appears
      purpose: Introduce the world, protagonist, mystery, and first irreversible choice.
      estimated_pages: 1-2
      key_beats:
        - id: beat-001
          type: hook
          label: Over black, a narrator describes forgotten passageways.
          description: The audience is pulled into the myth before seeing the real location.
```

Recommended beat types:

```yaml
beat_types:
  - hook
  - setup
  - inciting_incident
  - first_turn
  - first_trial
  - midpoint
  - reversal
  - low_point
  - climax
  - resolution
```

### Cast Files

Cast members are stored under the directory referenced by `cast_ref`. The folder name is the durable cast id, and the same id is repeated in front matter.

```text
cast/
  mara/
    description.md
```

```markdown
---
id: mara
name: Mara
role: protagonist
age: 11
want: To prove the abandoned tunnel is real.
need: To trust her curiosity even when adults dismiss it.
arc: Moves from hesitant observer to active explorer.
voice_notes: Plainspoken, precise, asks practical questions when scared.
---

## Description

Curious, cautious, observant, and quietly stubborn.
```

Renderers may uppercase the cue later. Store the canonical name only.

### Location Files

Locations are stored under the directory referenced by `locations_ref`. The folder name is the durable location id, and the same id is repeated in front matter.

```text
locations/
  abandoned-mountain-tunnel/
    description.md
```

```markdown
---
id: abandoned-mountain-tunnel
name: Abandoned Mountain Tunnel
time_period: Present day
---

## Description

A sealed train tunnel overgrown with ferns, brambles, and old warning signs.

## Visual Notes

- Wet stone
- Rusting rail
- Thin daylight at the entrance
```

Renderers may uppercase location names when building sluglines. Store the canonical name only.

### Act Files

Each act file stores one act and its sequences at the YAML document root.

```yaml
id: act-1
title: The Old Passageways
purpose: Open with myth, atmosphere, and the first image of the hidden world.
sequences:
  - id: seq-001
    title: The Old Passageways
    purpose: Open with myth, atmosphere, and the first image of the hidden world.
    scenes:
      - id: scene-001
        title: Tunnel Entrance
        scene_setting:
          interior_exterior: EXT
          location_ids:
            - abandoned-mountain-tunnel
          time_of_day: DAY
        story_function:
          - hook
          - mythic framing
        blocks: []
```

Use `scene_setting.location_ids` to point to one or more location folder ids. Use `cast_id` inside dialogue blocks to point to a cast folder id.

## Screenplay Block Types

Supported initial block types:

```yaml
block_types:
  - action
  - dialogue
  - parenthetical
  - transition
  - special_heading
  - title_card
  - super
  - shot
  - note
```

### `action`

Use visual, present-tense, production-readable action.

```yaml
- id: block-010
  type: action
  text: @mara studies the tunnel door before touching the rusted latch.
```

Non-dialogue text may use global `@id` mentions for cast and location records, such as `@mara` or `@abandoned-mountain-tunnel`. Mentions are not processed inside dialogue lines.

### `dialogue`

Use one block for the cast reference, optional extension, optional parenthetical, and dialogue lines.

`cast_id` links to the cast folder. Renderers resolve the readable cue from that cast file and may uppercase it for screenplay format. `extension` is standard screenplay cue notation such as `V.O.` for voice-over or `O.S.` for off-screen speech. `parenthetical` is a short delivery or target note that renders under the cue, such as `(low)`, `(urgent whisper)`, or `(to Mara)`.

```yaml
- id: block-002
  type: dialogue
  cast_id: narrator
  extension: V.O.
  lines:
    - There were once passageways to the old world.
```

Omit `extension` and `parenthetical` when they are empty.

### `special_heading`

Use for montage or screenplay markers such as `BEGIN MONTAGE.`

```yaml
- id: block-003
  type: special_heading
  text: BEGIN MONTAGE.
```

### `title_card`

Use for on-screen title cards.

```yaml
- id: block-001
  type: title_card
  text: FOUR MONTHS EARLIER
```

### `super`

Use for explanatory on-screen text.

```yaml
- id: block-023
  type: super
  text: Three days later.
```

### `transition`

Use for transitions such as `CUT TO:` or `FADE OUT.`

```yaml
- id: block-020
  type: transition
  text: CUT TO:
```

### `shot`

Use sparingly for explicit camera or shot wording when the script needs it.

```yaml
- id: block-021
  type: shot
  text: CLOSE ON @mara's hand hovering over the rusted door latch.
```

### `note`

Use for non-rendered writer notes only when useful during iteration.

```yaml
- id: block-022
  type: note
  text: Consider replacing this exposition with a visual clue in the next draft.
  render: false
```

## Rendering Contract

- Load `screenplay/screenplay.yaml`, then resolve `cast_ref`, `locations_ref`, and `act_refs` relative to that entrypoint file.
- Read cast and location folders by directory name, and verify each `description.md` front matter repeats the same `id`.
- Render acts in `act_refs` order.
- Within each act, render sequences, scenes, and blocks in YAML list order.
- For each scene, construct the rendered slugline from `scene_setting.interior_exterior`, the names resolved from `scene_setting.location_ids`, and `scene_setting.time_of_day`.
- Join multiple resolved location names with ` / `, then uppercase the rendered slugline.
- `action` renders as left-aligned screenplay action.
- `dialogue` renders with a centered cue resolved from `cast_id`, optional extension such as `V.O.` or `O.S.`, optional parenthetical, and dialogue lines.
- Renderers may uppercase dialogue cues during formatting.
- `special_heading` supports montage markers like `BEGIN MONTAGE.`
- `title_card` and `super` render as on-screen text.
- Resolve `@id` mentions in non-dialogue text against cast and location ids.
- Stable IDs allow navigation by act, sequence, scene, block, cast member, and location.
- `scene_setting` fields support structured editing, slugline rendering, and UI filtering.

## Revision State

```yaml
revision_state:
  draft_status: initial
  open_questions:
    - Should the protagonist be alone, or should there be a companion cast member?
  assumptions_made:
    - Target length interpreted as a 5-minute short.
  next_iteration_options:
    - Expand the first act into full pages.
```

## Complete Example

`screenplay/screenplay.yaml`:

```yaml
schema_version: 0.1
cast_ref: ../cast
locations_ref: ../locations
act_refs:
  - ./acts/act-1.yaml

project:
  title: The Working Title
  intended_audience: family
  target_length:
    label: 5-minute short
    estimated_pages: 5
    estimated_minutes: 5
  genre:
    primary: fantasy adventure
    secondary:
      - coming-of-age
  tone:
    - wonder
    - gentle suspense
    - warm humor
  content_notes:
    rating_intent: all ages
    boundaries:
      - No graphic violence
      - Keep danger playful, not frightening
  logline: A cautious child discovers an abandoned tunnel that opens onto a hidden railway between forgotten worlds.
  summary: >
    A young explorer follows clues left by an absent grandparent and discovers
    that old places are not dead, only waiting to be remembered.
  premise_overview: >
    The story begins in a rural mountain town where abandoned rail lines have
    become local myths.
  central_conflict: >
    The protagonist wants to prove the old tunnel is real, while the town and
    their own fear keep insisting that forgotten things should stay forgotten.
  dramatic_question: Will the protagonist find the courage to enter the hidden passage before it disappears again?
  themes:
    - Memory keeps places alive
    - Courage begins as curiosity
  story_arc:
    structure_model: three_act
    acts:
      - id: act-1
        title: The Door Appears
        purpose: Introduce the world, protagonist, mystery, and first irreversible choice.
        estimated_pages: 1-2
        key_beats:
          - id: beat-001
            type: hook
            label: Over black, a narrator describes forgotten passageways.
            description: The audience is pulled into the myth before seeing the real location.

revision_state:
  draft_status: initial
  open_questions:
    - Should the protagonist be alone, or should there be a companion cast member?
  assumptions_made:
    - Target length interpreted as a 5-minute short.
  next_iteration_options:
    - Expand the first act into full pages.
```

`cast/mara/description.md`:

```markdown
---
id: mara
name: Mara
role: protagonist
age: 11
want: To prove the abandoned tunnel is real.
need: To trust her curiosity even when adults dismiss it.
arc: Moves from hesitant observer to active explorer.
voice_notes: Plainspoken, precise, asks practical questions when scared.
---

## Description

Curious, cautious, observant, and quietly stubborn.
```

`cast/narrator/description.md`:

```markdown
---
id: narrator
name: Narrator
role: voiceover
age: null
want: To frame the story like an old tale.
need: To let silence and image carry the emotion whenever the audience already understands enough.
arc: Moves from broad mythic framing to intimate uncertainty.
voice_notes: Simple, lyrical, never too ornate.
---

## Description

A warm mythic voice that frames the story without explaining away the cast's choices.
```

`locations/abandoned-mountain-tunnel/description.md`:

```markdown
---
id: abandoned-mountain-tunnel
name: Abandoned Mountain Tunnel
time_period: Present day
---

## Description

A sealed train tunnel overgrown with ferns, brambles, and old warning signs.

## Visual Notes

- Wet stone
- Rusting rail
- Thin daylight at the entrance
```

`screenplay/acts/act-1.yaml`:

```yaml
id: act-1
title: The Door Appears
purpose: Introduce the world, protagonist, mystery, and first irreversible choice.
sequences:
  - id: seq-001
    title: The Old Passageways
    purpose: Open with myth, atmosphere, and the first image of the hidden world.
    scenes:
      - id: scene-001
        title: Tunnel Entrance
        scene_setting:
          interior_exterior: EXT
          location_ids:
            - abandoned-mountain-tunnel
          time_of_day: DAY
        story_function:
          - hook
          - mythic framing
        blocks:
          - id: block-001
            type: action
            text: @mara stops at the sealed mouth of @abandoned-mountain-tunnel.
          - id: block-002
            type: dialogue
            cast_id: narrator
            extension: V.O.
            lines:
              - There were once passageways to the old world.
```
