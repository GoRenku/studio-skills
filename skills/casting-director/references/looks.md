# Looks

A Look is one way a Cast Member appears on screen for part of the film: an
age, or a big physique change that casting has to show with a different face
or body. Each Look has a name, an optional one-line description, and the
Scenes it covers. Casting rounds run per Look, and costumes belong to a Look.

## One Person, One Cast Member

The same person is ONE Cast Member at every age. Young Edward Bloom and
Edward Bloom are one Cast Member with a "Young" Look and an older Look.

- Resolve cues such as `YOUNG EDWARD` and `EDWARD` from the complete script
  and prior user decisions before creating cast. Ask when identity remains
  ambiguous; an age prefix or similar name alone is not enough evidence.
- Cues established as the same person map to one Cast Member. The Scene's
  Look tells the ages apart. Reuse an existing Cast Member for that person.
- Distinct people stay separate Cast Members, including people who share a
  name. Do not create provisional duplicates for unresolved cues.
- Keep FDX source cues unchanged. Speaker-reference authoring applies only
  to Renku-authored Screenplays, not FDX-backed Screenplays.

Costume changes, dirt, a cloak or a fresh injury are not Looks. They belong in
the wardrobe plan (`wardrobe-plan.md`).

## Who Gets Looks

- Every visible Cast Member you cast gets at least one Look. A character who
  never changes age or build gets one Look named "Main".
- Voice-over Cast Members (`isVoiceOver: true`) get no Looks.
- Every Scene the Cast Member appears in should belong to exactly one of
  their Looks. Core refuses a Scene in two Looks of the same Cast Member.

Existing projects may already hold one "Main" Look per Cast Member with no
Scenes, carrying the old costumes. Keep that Look by passing its `id`, rename
it when it becomes an age (for example "Young"), add the other Looks, and
assign every Scene.

## Commands

```bash
renku cast looks show --cast <cast-member-id> --json
renku cast looks validate --file tmp/operations/cast-looks-plan.json --json
renku cast looks write --file tmp/operations/cast-looks-plan.json --json
```

Read the Scenes with `renku screenplay show --project <project-name> --json`
(or the related Scenes in `renku cast design context --cast <id> --json`) and
use their durable `sceneId`s. Resolve a production number such as `22A` with
`renku screenplay scene-number resolve`.

## Document

See `samples/cast-looks-plan.json`.

```json
{
  "kind": "castLooksPlan",
  "castMemberId": "cast_...",
  "looks": [
    { "id": "look_...", "name": "Young", "description": "About 16, slender, 165 cm.", "sceneIds": ["scene_..."] },
    { "name": "Fifteen years later", "description": "White hair, scars, muscular.", "sceneIds": ["scene_..."] }
  ]
}
```

- The document replaces the Cast Member's Looks, in order.
- A listed `id` keeps that Look (and its rounds, cast candidate and costumes).
  Omit `id` to add a Look.
- An existing Look left out of the list is removed only when it has no
  costumes, rounds or cast candidate. Otherwise the write fails with
  `CASTING_LOOK_IN_USE`: move its costumes with a wardrobe plan first, or keep
  it.
- `description` is one plain line: age read, build, height when known, and
  the identity anchors casting must show. No Markdown.

Errors: `CASTING_LOOK_SCENE_CONFLICT` (a Scene in two Looks),
`CASTING_UNKNOWN_SCENE`, `CASTING_DUPLICATE_NAME`, `CASTING_LOOK_IN_USE`.

## Agree The Looks With The User

- **Codex Desktop with panel support:** call
  `casting.wardrobe.open { project, mode: 'looks', castMemberId, draft }` with
  the draft `castLooksPlan`, then end the turn. The panel shows a Scene strip;
  clicking a Scene moves it to another Look. Renaming, adding or splitting
  Looks happens in chat. When the user sends it, call
  `casting.wardrobe.consume { panelId }` once. It returns
  `{ status: 'sent', mode, draft }` with the edited draft, or `canceled`.
  Validate and write the returned draft.
- **Claude Code and other hosts:** list each Look in chat with its name,
  description and Scene production numbers, and wait for the user's reply.
  The user can also check the strip on the Cast Member's Casting tab in
  Studio after the write.

The panel never writes. Only `renku cast looks write` does.

## Existing Duplicate Cast Members

If existing cast facts already split one person by age, report the affected
Cast Members and their dependencies for a separate data correction. Routine
cast creation and Look planning must not delete or consolidate those records.
Resolve identity before adding new cast so newly imported screenplays do not
create the same problem.
