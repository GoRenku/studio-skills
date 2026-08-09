# Screenplay JSON Contract

Use this reference before writing create or update JSON.

## Top-Level Documents

Create input is the complete Scene-first Screenplay. The command supplies the
intent, so no `kind` or duplicate metadata wrapper is present:

```json
{
  "opening": [],
  "scenes": [],
  "sections": [],
  "structure": [],
  "references": []
}
```

Focused revision input contains one non-empty closed operation list:

```json
{ "operations": [] }
```

Project story metadata belongs to `renku info set`, not to Screenplay JSON.
Canonical `renku screenplay show --json` output uses durable `id` fields only.

## Identity

Every new Opening Element, Scene, nested Block/dialogue value, Section,
structure entry, and Screenplay reference uses a request-local `key`. Every
existing value uses its durable `id`. An identity object contains exactly one
of those fields. Keys may be referenced elsewhere in the same create document
or atomic operation batch. Mutation reports return their durable mappings in
`generatedIdentities`.

## Scenes And Blocks

A Scene input has `key` or `id`, an exact non-empty `heading`, optional `title`,
and ordered `blocks`. Do not provide `productionNumber`; Core allocates and
reserves it for agent-authored Screenplays. Canonical reads return the required
stable number. Text Block types are
`action`, `transition`, `shot`, `lyrics`, `castList`, `note`,
`specialHeading`, `titleCard`, and `super`; each carries `text`.

Dialogue is structured rather than flattened:

```json
{
  "key": "urban-dialogue",
  "type": "dialogue",
  "characterName": "URBAN",
  "extensions": ["O.S."],
  "parts": [
    { "key": "urban-direction", "type": "parenthetical", "text": "quietly" },
    { "key": "urban-line", "type": "speech", "text": "The wall will answer us." }
  ]
}
```

`dualDialogue` has a Block identity plus `left` and `right` dialogue turns,
each with its own identity, `characterName`, `extensions`, and `parts`.

## Optional Organization

Scenes are canonical and may remain flat. Optional Sections have type `act` or
`sequence`; they do not own production data. `structure` places every Scene and
Section exactly once with zero-based contiguous sibling `position` values.
Only Acts may contain Sequences; Sequences may contain Scenes; Acts and root may
also contain Scenes.

Incremental add/move placement uses optional `parentSection` plus exactly one
of `at: "start"|"end"`, `beforeEntry`, or `afterEntry`. Section deletion
removes the wrapper and promotes its direct children in place.

## Cast Members, Locations, Props, And References

Screenplay JSON references existing Project subjects and never creates or
updates them. Author plain text; do not insert `@handle` tokens.

```json
{
  "key": "urban-speaker",
  "subject": { "type": "castMember", "id": "cast_urban" },
  "target": {
    "type": "dialogueCue",
    "scene": { "key": "foundry-scene" },
    "turn": { "key": "urban-dialogue" }
  },
  "role": "speaker"
}
```

Subjects are `castMember`, `location`, or `prop`. Targets are
`openingElement`, `scene`, `sceneHeading`, `block`, `dialogueCue`, or
`dialoguePart`. Roles are `speaker`, `setting`, `mention`, or `presence`.
Textual targets may carry an exact `{ "start", "length" }` range; unanchored
presence omits it.

## Operation Kinds

Supported operations are `opening.replace`, `scene.add`, `scene.update`,
`scene.delete`, `scene.move`, `section.add`, `section.update`,
`section.delete`, `section.move`, `reference.add`, and `reference.delete`.
Scene and Section updates are full replacements of authored fields. Existing
nested IDs preserve identity; new nested values use keys.
