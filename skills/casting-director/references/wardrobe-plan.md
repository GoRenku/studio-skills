# Wardrobe Plan

The wardrobe plan lists a Cast Member's costumes. Each costume belongs to one
Look and covers a set of Scenes. Every costume gets its own Character Sheet,
and shots in its Scenes use that sheet first. Write it after the Looks; it is
usually written after the Looks are cast, but it does not depend on casting.

Cast Design keeps only `costume.baseWardrobeLogic`, the wardrobe rules that
hold in every costume. Costumes themselves live here.

## Rules

- A costume's Scenes must be within its Look's Scenes
  (`CASTING_COSTUME_SCENE_OUTSIDE_LOOK`).
- One costume per Scene per Cast Member (`CASTING_COSTUME_SCENE_CONFLICT`).
- Costume names are unique for the Cast Member (`CASTING_DUPLICATE_NAME`).
- Every Look in use should have at least one costume. A one-costume character
  gets one costume named "Main" on its "Main" Look.
- Cover every Scene of every Look when the screenplay supports it.

## What To Write

| Field | What belongs here |
|---|---|
| `name` | A short readable name ("Cloaked departure") |
| `lookId` | The Look this costume belongs to |
| `wardrobe` | Visible clothing, layers, accessories and wear, one item group per line |
| `continuityNotes` | What must stay the same or how it changes across its Scenes: carried tools, injuries shown on the costume, a hood that hides the face |
| `sceneIds` | Durable Scene ids, in screenplay order |

Use the screenplay, the Cast Member's `description.wardrobe`, and Cast Design
`costume.baseWardrobeLogic` as evidence. Do not put Scene numbers in the wardrobe text: the
Scene list carries them. Age, face and build belong to the Look, not the
costume.

Existing projects may hold the old costumes on one "Main" Look with no
Scenes. Keep each costume's `id`, move it to the right Look, and give it its
Scenes.

## Commands

```bash
renku cast wardrobe show --cast <cast-member-id> --json
renku cast wardrobe validate --file tmp/operations/cast-wardrobe-plan.json --json
renku cast wardrobe write --file tmp/operations/cast-wardrobe-plan.json --json
```

## Document

See `samples/cast-wardrobe-plan.json`.

```json
{
  "kind": "castWardrobePlan",
  "castMemberId": "cast_...",
  "costumes": [
    { "id": "costume_...", "name": "Cloaked departure", "lookId": "look_...",
      "wardrobe": ["Same leather base with a plain weathered cloak."],
      "continuityNotes": [], "sceneIds": ["scene_...", "scene_..."] }
  ]
}
```

- The document replaces the Cast Member's costumes.
- A listed `id` keeps the costume, its character sheet rounds and its picked
  sheet. Omit `id` to add one. A costume with sheet rounds keeps its Look
  (`CASTING_COSTUME_LOOK_CHANGE_HAS_SHEETS`); to move it, leave it out and add
  a new costume for the other Look.
- A costume left out is removed with its sheet rounds and pick. The write
  report lists cleared picks in `clearedSheetSelections` and the sheets that
  stay in Assets in `releasedSheetAssetFileIds`; tell the user.

When a Look must go away, write the wardrobe plan that moves its costumes
first, then the Looks plan that removes it.

## Agree The Plan With The User

- **Codex Desktop with panel support:** call
  `casting.wardrobe.open { project, mode: 'costumes', castMemberId, draft }`
  with the draft `castWardrobePlan`, then end the turn. The panel shows the
  Look band and the Costume band over the Scene strip; clicking a costume cell
  picks another costume of that Scene's Look. Renaming, adding or splitting
  costumes happens in chat. Call `casting.wardrobe.consume { panelId }` once;
  `{ status: 'sent', mode, draft }` carries the edited draft to validate and
  write; `canceled` means stop.
- **Claude Code and other hosts:** list each costume in chat with its Look,
  Scene production numbers and a one-line wardrobe summary, and wait for the
  reply.

Then offer a character sheet round for the cast Look's costumes
(`cast-media-handoff.md`).
