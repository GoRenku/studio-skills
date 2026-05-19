# Screenplay YAML Schema

Use this reference when generating or revising screenplay YAML.

## Contents

- [Document Rules](#document-rules)
- [Package Shape](#package-shape)
- [Field Contract](#field-contract)
- [Screenplay Block Types](#screenplay-block-types)
- [Rendering Contract](#rendering-contract)
- [Revision State](#revision-state)
- [Complete Example](#complete-example)

## Document Rules

- A screenplay is a small YAML package, not one monolithic file.
- The package entrypoint is `screenplay.yaml`, rooted at `screenplay`.
- Set `screenplay.schema_version` to `"0.1"`.
- Store character, location, and act content in referenced sibling files.
- Infer act, sequence, scene, and beat ordering from YAML list order.
- Do not add manual ordering fields such as `number`.
- Do not repeat containment relationships inside child objects. For example, scenes do not need `act_id` or `sequence_id` because their containing act and sequence already define that relationship.
- Do not store renderer-dependent page positions such as `estimated_page_start`.
- Use stable IDs for UI navigation and later rendering:
  - `act-1`, `act-2`, `act-3`
  - `beat-001`
  - `char-001`
  - `loc-001`
  - `seq-001`
  - `scene-001`
  - `block-001`
- Keep both renderer-facing text and structured fields where useful.
- Use `null` for unknown values when a field is present, not empty strings.
- Omit optional fields when they do not apply and omission will not make the renderer ambiguous.
- Use folded YAML scalars (`>`) for multi-sentence summaries when they improve readability.

## Package Shape

Recommended package layout:

```text
screenplay-folder/
  screenplay.yaml
  characters.yaml
  locations.yaml
  acts/
    act-1.yaml
    act-2.yaml
    act-3.yaml
```

`screenplay.yaml`:

```yaml
screenplay:
  schema_version: "0.1"
  document: {}
  concept: {}
  story_arc: {}
  characters_ref: "./characters.yaml"
  locations_ref: "./locations.yaml"
  act_refs:
    - "./acts/act-1.yaml"
    - "./acts/act-2.yaml"
    - "./acts/act-3.yaml"
  revision_state: {}
```

`characters.yaml`:

```yaml
characters: []
```

`locations.yaml`:

```yaml
locations: []
```

Each act file:

```yaml
act:
  id: "act-1"
  title: "The Door Appears"
  purpose: "Introduce the world, protagonist, mystery, and first irreversible choice."
  sequences: []
```

## Field Contract

### `document`

```yaml
document:
  title: "The Working Title"
  draft_label: "Initial Draft"
  created_for: "User or project name, if known"
  language: "en"
  intended_audience: "family"
  target_length:
    label: "5-minute short"
    estimated_pages: 5
    estimated_minutes: 5
  genre:
    primary: "fantasy adventure"
    secondary:
      - "coming-of-age"
  tone:
    - "wonder"
    - "gentle suspense"
  content_notes:
    rating_intent: "all ages"
    boundaries:
      - "No graphic violence"
```

### `concept`

```yaml
concept:
  proposed_title: "The Last Door in the Mountain"
  logline: "A cautious child discovers an abandoned tunnel that opens onto a hidden railway between forgotten worlds."
  summary: >
    A young explorer follows clues left by an absent grandparent and discovers
    that old places are not dead, only waiting to be remembered.
  premise_overview: >
    The story begins in a rural mountain town where abandoned rail lines have
    become local myths.
  central_conflict: >
    The protagonist wants to prove the old tunnel is real, while the town and
    their own fear keep insisting that forgotten things should stay forgotten.
  dramatic_question: "Will the protagonist find the courage to enter the hidden passage before it disappears again?"
  themes:
    - "Memory keeps places alive"
```

### `story_arc`

Use `three_act` by default. For very short scripts, acts may be compact but should still show the hook, turn, climax, and resolution.

```yaml
story_arc:
  structure_model: "three_act"
  acts:
    - id: "act-1"
      title: "The Door Appears"
      purpose: "Introduce the world, protagonist, mystery, and first irreversible choice."
      estimated_pages: "1-2"
      key_beats:
        - id: "beat-001"
          type: "hook"
          label: "Over black, a narrator describes forgotten passageways."
          description: "The audience is pulled into the myth before seeing the real location."
        - id: "beat-002"
          type: "inciting_incident"
          label: "The protagonist finds a fresh light inside an abandoned tunnel."
          description: "The impossible discovery gives the story its engine."
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

### `characters`

Stored in `characters.yaml`.

```yaml
characters:
  - id: "char-001"
    name: "Mara"
    display_name: "MARA"
    role: "protagonist"
    age: 11
    description: "Curious, cautious, observant, and quietly stubborn."
    want: "To prove the abandoned tunnel is real."
    need: "To trust her curiosity even when adults dismiss it."
    arc: "Moves from hesitant observer to active explorer."
    voice_notes: "Plainspoken, precise, asks practical questions when scared."
```

### `locations`

Stored in `locations.yaml`.

```yaml
locations:
  - id: "loc-001"
    name: "Abandoned Mountain Tunnel"
    slugline_name: "ABANDONED MOUNTAIN TUNNEL"
    time_period: "Present day"
    description: "A sealed train tunnel overgrown with ferns, brambles, and old warning signs."
    visual_notes:
      - "Wet stone"
      - "Rusting rail"
```

### Act Files

Each act file stores one act and its sequences.

```yaml
act:
  id: "act-1"
  title: "The Old Passageways"
  purpose: "Open with myth, atmosphere, and the first image of the hidden world."
  sequences:
    - id: "seq-001"
      title: "The Old Passageways"
      purpose: "Open with myth, atmosphere, and the first image of the hidden world."
      scenes:
        - id: "scene-001"
          title: "Over Black"
          scene_heading:
            raw: "OVER BLACK."
            type: "special"
            location_id: null
            interior_exterior: null
            time_of_day: null
          story_function:
            - "hook"
            - "mythic framing"
          blocks: []
```

## Screenplay Block Types

Supported initial block types:

```yaml
block_types:
  - scene_heading
  - action
  - dialogue
  - parenthetical
  - transition
  - special_heading
  - transition_or_special
  - shot
  - note
```

### `scene_heading`

Use for traditional sluglines inside the block stream.

```yaml
- id: "block-009"
  type: "scene_heading"
  text: "EXT. PRIMEVAL FOREST - DAY"
```

### `action`

Use visual, present-tense, production-readable action.

```yaml
- id: "block-010"
  type: "action"
  text: "Camera is attached to a tree, looking up the length of it as the crown sways in the breeze."
```

### `dialogue`

Use one block for the cue, optional extension, optional parenthetical, and dialogue lines.

`extension` is standard screenplay cue notation such as `V.O.` for voice-over or `O.S.` for off-screen speech. It renders next to the character cue, for example `NARRATOR (V.O.)`.

`parenthetical` is a short delivery or target note that renders under the character cue, such as `(low)`, `(urgent whisper)`, or `(to Urban)`.

```yaml
- id: "block-002"
  type: "dialogue"
  character_id: "char-002"
  character: "NARRATOR"
  extension: "V.O."
  parenthetical: null
  lines:
    - "There were once passageways to the old world."
```

### `special_heading`

Use for montage or screenplay markers such as `BEGIN MONTAGE.`

```yaml
- id: "block-003"
  type: "special_heading"
  text: "BEGIN MONTAGE."
```

### `transition_or_special`

Use for opening and transitional special lines that are not normal scene headings.

```yaml
- id: "block-001"
  type: "transition_or_special"
  text: "OVER BLACK."
```

### `transition`

Use for transitions such as `CUT TO:` or `FADE OUT.`

```yaml
- id: "block-020"
  type: "transition"
  text: "CUT TO:"
```

### `shot`

Use sparingly for explicit camera or shot language when the script needs it.

```yaml
- id: "block-021"
  type: "shot"
  text: "CLOSE ON Mara's hand hovering over the rusted door latch."
```

### `note`

Use for non-rendered writer notes only when useful during iteration.

```yaml
- id: "block-022"
  type: "note"
  text: "Consider replacing this exposition with a visual clue in the next draft."
  render: false
```

## Rendering Contract

- Load `screenplay.yaml`, then resolve `characters_ref`, `locations_ref`, and `act_refs` relative to the entrypoint file.
- Render acts in `act_refs` order.
- Within each act, render sequences, scenes, and blocks in YAML list order.
- `scene_heading` renders like `EXT. PRIMEVAL FOREST - DAY`.
- `action` renders as left-aligned screenplay action.
- `dialogue` renders with centered character cue, optional extension such as `V.O.` or `O.S.`, optional parenthetical, and dialogue lines.
- `special_heading` supports montage markers like `BEGIN MONTAGE.`
- Stable IDs allow navigation by act, sequence, scene, and block.
- `scene_heading.raw` preserves exact screenplay appearance.
- Parsed scene heading fields support structured editing and UI filtering.

## Revision State

```yaml
revision_state:
  draft_status: "initial"
  open_questions:
    - "Should the protagonist be alone, or should there be a companion character?"
  assumptions_made:
    - "Target length interpreted as a 5-minute short."
  next_iteration_options:
    - "Expand the first act into full pages."
```

## Complete Example

`screenplay.yaml`:

```yaml
screenplay:
  schema_version: "0.1"
  document:
    title: "The Working Title"
    draft_label: "Initial Draft"
    created_for: "User or project name, if known"
    language: "en"
    intended_audience: "family"
    target_length:
      label: "5-minute short"
      estimated_pages: 5
      estimated_minutes: 5
    genre:
      primary: "fantasy adventure"
      secondary:
        - "coming-of-age"
    tone:
      - "wonder"
      - "gentle suspense"
      - "warm humor"
    content_notes:
      rating_intent: "all ages"
      boundaries:
        - "No graphic violence"
        - "Keep danger playful, not frightening"
  concept:
    proposed_title: "The Last Door in the Mountain"
    logline: "A cautious child discovers an abandoned tunnel that opens onto a hidden railway between forgotten worlds."
    summary: >
      A young explorer follows clues left by an absent grandparent and discovers
      that old places are not dead, only waiting to be remembered.
    premise_overview: >
      The story begins in a rural mountain town where abandoned rail lines have
      become local myths.
    central_conflict: >
      The protagonist wants to prove the old tunnel is real, while the town and
      their own fear keep insisting that forgotten things should stay forgotten.
    dramatic_question: "Will the protagonist find the courage to enter the hidden passage before it disappears again?"
    themes:
      - "Memory keeps places alive"
      - "Courage begins as curiosity"
  story_arc:
    structure_model: "three_act"
    acts:
      - id: "act-1"
        title: "The Door Appears"
        purpose: "Introduce the world, protagonist, mystery, and first irreversible choice."
        estimated_pages: "1-2"
        key_beats:
          - id: "beat-001"
            type: "hook"
            label: "Over black, a narrator describes forgotten passageways."
            description: "The audience is pulled into the myth before seeing the real location."
  characters_ref: "./characters.yaml"
  locations_ref: "./locations.yaml"
  act_refs:
    - "./acts/act-1.yaml"
  revision_state:
    draft_status: "initial"
    open_questions:
      - "Should the protagonist be alone, or should there be a companion character?"
    assumptions_made:
      - "Target length interpreted as a 5-minute short."
    next_iteration_options:
      - "Expand the first act into full pages."
```

`characters.yaml`:

```yaml
characters:
  - id: "char-001"
    name: "Mara"
    display_name: "MARA"
    role: "protagonist"
    age: 11
    description: "Curious, cautious, observant, and quietly stubborn."
    want: "To prove the abandoned tunnel is real."
    need: "To trust her curiosity even when adults dismiss it."
    arc: "Moves from hesitant observer to active explorer."
    voice_notes: "Plainspoken, precise, asks practical questions when scared."
  - id: "char-002"
    name: "Narrator"
    display_name: "NARRATOR"
    role: "voiceover"
    description: "A warm mythic voice that frames the story like an old tale."
    voice_notes: "Simple, lyrical, never too ornate."
```

`locations.yaml`:

```yaml
locations:
  - id: "loc-001"
    name: "Abandoned Mountain Tunnel"
    slugline_name: "ABANDONED MOUNTAIN TUNNEL"
    time_period: "Present day"
    description: "A sealed train tunnel overgrown with ferns, brambles, and old warning signs."
    visual_notes:
      - "Wet stone"
      - "Rusting rail"
      - "Thin daylight at the entrance"
```

`acts/act-1.yaml`:

```yaml
act:
  id: "act-1"
  title: "The Door Appears"
  purpose: "Introduce the world, protagonist, mystery, and first irreversible choice."
  sequences:
    - id: "seq-001"
      title: "The Old Passageways"
      purpose: "Open with myth, atmosphere, and the first image of the hidden world."
      scenes:
        - id: "scene-001"
          title: "Over Black"
          scene_heading:
            raw: "OVER BLACK."
            type: "special"
            location_id: null
            interior_exterior: null
            time_of_day: null
          story_function:
            - "hook"
            - "mythic framing"
          blocks:
            - id: "block-001"
              type: "transition_or_special"
              text: "OVER BLACK."
            - id: "block-002"
              type: "dialogue"
              character_id: "char-002"
              character: "NARRATOR"
              extension: "V.O."
              parenthetical: null
              lines:
                - "There were once passageways to the old world."
```
