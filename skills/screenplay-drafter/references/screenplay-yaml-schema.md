# Screenplay YAML Schema

Use this reference when generating or revising screenplay YAML.

## Contents

- [Document Rules](#document-rules)
- [Top-Level Shape](#top-level-shape)
- [Field Contract](#field-contract)
- [Screenplay Block Types](#screenplay-block-types)
- [Rendering Contract](#rendering-contract)
- [Revision State](#revision-state)
- [Complete Example](#complete-example)

## Document Rules

- Emit a single YAML document rooted at `screenplay`.
- Set `screenplay.schema_version` to `"0.1"`.
- Use stable IDs for UI navigation and later rendering:
  - `act-1`, `act-2`, `act-3`
  - `beat-001`
  - `char-001`
  - `loc-001`
  - `seq-001`
  - `scene-001`
  - `block-001`
- Keep both renderer-facing text and structured fields where useful.
- Use `null` for unknown values, not empty strings.
- Use folded YAML scalars (`>`) for multi-sentence summaries when they improve readability.

## Top-Level Shape

```yaml
screenplay:
  schema_version: "0.1"
  document: {}
  concept: {}
  story_arc: {}
  characters: []
  locations: []
  screenplay_body:
    sequences: []
  revision_state: {}
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
      number: 1
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

### `screenplay_body`

```yaml
screenplay_body:
  sequences:
    - id: "seq-001"
      number: 1
      act_id: "act-1"
      title: "The Old Passageways"
      purpose: "Open with myth, atmosphere, and the first image of the hidden world."
      scenes:
        - id: "scene-001"
          number: 1
          act_id: "act-1"
          sequence_id: "seq-001"
          title: "Over Black"
          scene_heading:
            raw: "OVER BLACK."
            type: "special"
            location_id: null
            interior_exterior: null
            time_of_day: null
          estimated_page_start: 1
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
      become local myths. The protagonist finds a tunnel that should have been
      sealed decades ago and realizes it connects to a lost network of passageways.
    central_conflict: >
      The protagonist wants to prove the old tunnel is real, while the town and
      their own fear keep insisting that forgotten things should stay forgotten.
    dramatic_question: "Will the protagonist find the courage to enter the hidden passage before it disappears again?"
    themes:
      - "Memory keeps places alive"
      - "Courage begins as curiosity"
      - "Old worlds can still speak to new generations"

  story_arc:
    structure_model: "three_act"
    acts:
      - id: "act-1"
        number: 1
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
          - id: "beat-003"
            type: "act_turn"
            label: "The protagonist steps inside."
            description: "Curiosity becomes commitment."
      - id: "act-2"
        number: 2
        title: "The Hidden Line"
        purpose: "Escalate discovery, danger, and emotional stakes."
        estimated_pages: "2-4"
        key_beats:
          - id: "beat-004"
            type: "first_trial"
            label: "The tunnel rearranges itself behind the protagonist."
            description: "The journey becomes risky and no longer purely imaginative."
          - id: "beat-005"
            type: "midpoint"
            label: "A map reveals the grandparent used the passage before."
            description: "The mystery becomes personal."
          - id: "beat-006"
            type: "low_point"
            label: "The path home seems gone."
            description: "The protagonist must choose trust over panic."
      - id: "act-3"
        number: 3
        title: "The Return"
        purpose: "Resolve the external journey and emotional need."
        estimated_pages: "4-5"
        key_beats:
          - id: "beat-007"
            type: "climax"
            label: "The protagonist remembers the clue and reopens the passage."
            description: "The solution comes from attention, not force."
          - id: "beat-008"
            type: "resolution"
            label: "The tunnel remains hidden, but no longer feels lost."
            description: "The protagonist returns changed."

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
    - id: "loc-002"
      name: "Primeval Forest"
      slugline_name: "PRIMEVAL FOREST"
      time_period: "Timeless"
      description: "A forest that feels older than history."
      visual_notes:
        - "Huge trees"
        - "Soft fog"
        - "Old tracks half-buried in roots"

  screenplay_body:
    sequences:
      - id: "seq-001"
        number: 1
        act_id: "act-1"
        title: "The Old Passageways"
        purpose: "Open with myth, atmosphere, and the first image of the hidden world."
        scenes:
          - id: "scene-001"
            number: 1
            act_id: "act-1"
            sequence_id: "seq-001"
            title: "Over Black"
            scene_heading:
              raw: "OVER BLACK."
              type: "special"
              location_id: null
              interior_exterior: null
              time_of_day: null
            estimated_page_start: 1
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
              - id: "block-003"
                type: "special_heading"
                text: "BEGIN MONTAGE."
              - id: "block-004"
                type: "action"
                text: "A forgotten train tunnel through a mountain."
              - id: "block-005"
                type: "dialogue"
                character_id: "char-002"
                character: "NARRATOR"
                extension: "V.O."
                parenthetical: null
                lines:
                  - "Strange trails. Hidden paths. You turned a corner and suddenly find yourself face to face with the Great Mystery."
              - id: "block-006"
                type: "action"
                text: "We see abandoned railroads. Broken and overgrown."
              - id: "block-007"
                type: "action"
                text: "Old boots nailed to trees in forgotten forests."
              - id: "block-008"
                type: "action"
                text: "Roads overcrowded with brambles."
          - id: "scene-002"
            number: 2
            act_id: "act-1"
            sequence_id: "seq-001"
            title: "Primeval Forest"
            scene_heading:
              raw: "EXT. PRIMEVAL FOREST - DAY"
              type: "standard"
              location_id: "loc-002"
              interior_exterior: "EXT"
              time_of_day: "DAY"
            estimated_page_start: 2
            story_function:
              - "world reveal"
              - "tone setting"
            blocks:
              - id: "block-009"
                type: "scene_heading"
                text: "EXT. PRIMEVAL FOREST - DAY"
              - id: "block-010"
                type: "action"
                text: "Camera is attached to a tree, looking up the length of it as the crown sways in the breeze."
              - id: "block-011"
                type: "action"
                text: "Then the tree trembles, lists, and starts to fall."
              - id: "block-012"
                type: "action"
                text: "The tree CRASHES spectacularly onto the forest floor. A giant fallen among tiny men."

  revision_state:
    draft_status: "initial"
    open_questions:
      - "Should the protagonist be alone, or should there be a companion character?"
      - "Should the hidden passage be magical, historical, or ambiguous?"
    assumptions_made:
      - "Target length interpreted as a 5-minute short."
      - "Audience interpreted as family/all ages."
    next_iteration_options:
      - "Expand the first act into full pages."
      - "Sharpen the central conflict."
      - "Add a companion or antagonist."
      - "Revise dialogue to be funnier, darker, simpler, or more lyrical."
```
