# Character Arc Guidance

A Character Arc is your reading of how one Cast Member changes across the
current screenplay. Studio shows it on the Cast Member's Arc tab as a
timeline plus one card per turning point, and labels all of it
"Interpretation". Studio checks structure and ids, never what you write, so
the quality is yours.

## Who Gets An Arc

Write arcs for the protagonists and the key supporting roles: the characters
whose inner state the story actually tracks. Do not write arcs for minor,
ensemble or background Cast Members. A film usually has two to six arcs.

**Age variants.** One person can appear as two Cast Members at different ages
(for example Edward Bloom and Young Edward Bloom). Write ONE arc on the main
Cast Member that covers the whole life. Give each age variant a reference:
`{ "kind": "characterArcReference", "castMemberId": "<main cast id>" }`.

## Choosing The Arc Type

| `arcType` | Shown as | Use when the character |
|---|---|---|
| `positiveChange` | Grows | lets go of a false belief and ends in a better place |
| `flat` | Holds firm | already holds a truth, is tested, and changes the people around them instead |
| `disillusionment` | Disillusioned | reaches the truth, but it costs them dearly |
| `fall` | Falls | clings to a false belief and ends worse off |
| `corruption` | Corrupted | trades a truth they held for a false belief |

A main character who does not change is not a weak arc. Use `flat` and fill
`changesOthers`.

## The Spine

Every field is one or two plain sentences plus the Scene ids it rests on.

| Field | What to write | Required |
|---|---|---|
| `want` | The outer goal they pursue | always |
| `need` | The inner change the story asks of them | change arcs |
| `falseBelief` | The belief that holds them back | change arcs |
| `wound` | The past hurt behind that belief | optional |
| `truthHeld` | The truth a holds-firm character stands for | `flat` |
| `testedBy` | What pressures that truth | optional, `flat` |
| `changesOthers` | Who they change, and how | optional, `flat` |

`startState` and `endState` are one sentence each: where they begin and end.

`ends.high` and `ends.low` are the two worded ends of the arc, written from
the character's side ("The stories are who he is" / "The stories are lies").
Keep each under about 40 characters; they label the chart and every card.

**Direction is the same for every arc type.** `ends.high` is the truth the
story argues for, and `ends.low` is the false belief or the hardened state.
The shape then shows the arc type:

| Arc type | Shape |
|---|---|
| Grows | rises |
| Holds firm | stays near the top, with dips where the truth is tested |
| Disillusioned | ends higher, having reached the truth, while its `state` sentences carry the cost |
| Falls | ends low |
| Corrupted | starts high and ends low |

## Turning Points

- **How many.** Pick 6–14 moments where the character's state turns. These
  are not every scene they appear in.
- **Order.** Turning points must follow screenplay scene order, by their first
  Scene. That is telling order, even when the film flashes back.
- **`label`.** Three to six words.
- **`state`.** One sentence about their inner state after the turn. Describe
  it in words ("Furious at being a footnote"), never as a score.
- **`position`.** A rough integer place between `ends.low` (−5) and
  `ends.high` (5). It is only a rough placement, so keep it consistent and
  don't fuss over exact values. A holds-firm character stays near one end,
  with dips where the truth is tested.
- **`quote`.** Optional. At most one short line of dialogue, under 15 words,
  copied exactly from the screenplay.
- **`sceneIds`.** One or more durable Scene ids, in screenplay order. Use a
  range of scenes only when the turn spans them.
- **`lookAssetFileId`.** Optional. The character sheet that shows the
  character at this moment (see below).

## Looks On Cards

When the character (or an age variant sharing the arc) has character sheets,
put the matching sheet's asset id in `lookAssetFileId` on the turning points
it covers.

- List the sheets with
  `renku asset list --owner castMember:<cast-member-id> --type character_sheet --json`.
- Choose by each sheet's title and summary.
- Leave the field out when no sheet fits.

Studio rejects any asset that is not an available character sheet of a Cast
Member sharing the arc.

## Evidence And Honesty

- Cite real Scene ids for every spine field and turning point. Never invent
  scenes, events or dialogue.
- When the screenplay leaves motivation unstated, say so in the sentence
  ("seems to", "the script does not say why").
- Keep the arc about this screenplay as written, not about possible
  rewrites; critique belongs in the Screenplay Analysis.
