# Cast Media Handoff

`casting-director` prepares facts and Cast Design. `media-producer` owns
provider routing, temporary review, conversational confirmation, execution,
inspection, provenance, and supported focused attachments.

Current Cast media purposes and targets:

| Purpose | Target | Owner of the decision |
|---|---|---|
| `cast.casting-candidate` | `casting-round:<round-id>` | a confirmed casting round (`casting-rounds.md`) |
| `cast.character-sheet` | `costume:<costume-id>` | one costume of the wardrobe plan (`wardrobe-plan.md`) |
| `cast.profile` | `cast:<cast-member-id>` | the Cast Member |
| `cast.voice-sample` | `cast:<cast-member-id>` | the Cast Member |

Resolve every id with the Cast commands (`renku cast looks show`,
`renku cast wardrobe show`, `renku cast casting show`); never invent one.

For Cast Members with `isVoiceOver: true`, hand off profile image requests to
`media-producer` as `cast.profile` only. The profile image is a symbolic
navigation Profile Asset, not a Character Sheet or physical character
reference. Do not request `cast.character-sheet` for a voice-over Cast Member
unless the user first changes that Cast Member into a visible on-screen role.
Voice identity and sample audio remain separate Cast Voice / `cast.voice-sample`
work.

Read `renku cast design context --cast <cast-member-id> --json` when authoring
or revising Cast Design. A media-only request using an existing design goes
directly to Media Producer without that department-context read.
Media Producer begins the media turn
with `renku generation context --purpose <purpose> --target <target>`; that
Core report is the authority for the current Cast facts, active design, Look,
costume, Lookbook, voices, owned Assets, related Scenes, and
relationship-derived reference suggestions. Do not manually reconstruct or
copy those relationships into the handoff.

Hand off only the user direction and specialist judgment that are not already
Project facts, including:

- known or intended height for visible on-screen cast members;
- one short role or identity synopsis for the block below the face close-up;
- character-owned accessories that must remain consistent, if any;
- ad hoc user-collected cast reference images that should be offered as
  optional generation references, such as likeness, accessory, costume, or
  historical source images;
- intended Production or Storyboard rendering mode and the exact prior
  Character Sheet that supplies canonical content, when preparing a Storyboard
  continuity variant;
- whether the request asks for media generation or only design writing.

When an accepted `cast.profile` output should become the Cast Member's current
Profile, ask `media-producer` to import with `--select` in the same mutation.

## Character Sheets Per Costume

Character sheets come after casting and the wardrobe plan. Make one sheet per
costume, target `costume:<costume-id>`:

- the costume's `wardrobe` and `continuityNotes` come from the wardrobe plan
  through the generation context; do not restate them in the handoff;
- the Look's cast candidate is offered as the identity reference (the
  `cast-identity` suggestion). Keep it unless the user wants a different face;
- when a Look is not cast yet, say so and offer a casting round first; the
  user may choose to proceed without an identity reference;
- each costume has one picked sheet. Importing with `--select` picks the new
  sheet for its costume. To pick an existing sheet instead of generating one,
  run
  `renku asset select --project <project-name> --target costume:<costume-id> --asset-file <asset-file-id> --json`.
  Any active Character Sheet of the Cast Member can be picked for any of its
  costumes, so offer existing sheets before regenerating;
- in Codex Desktop with panel support, `casting.board.open { project, mode:
  'sheets', castMemberId }` shows one row per costume; clicking a sheet picks
  it through Renku, and `casting.board.consume { sessionId }` returns
  `{ kind: 'sheetPicksDone', picks: [{ costumeId, assetFileId }] }` after
  "Send picks to agent". In Claude Code, the Casting tab shows the same
  rows.

Shots and storyboards in a costume's Scenes list its picked sheet first in the
`cast-continuity` suggestion, so an unpicked costume weakens later
continuity. Report costumes still without a picked sheet.

Point Media Producer to `references/cast-character-sheets.md`, the normative
owner of the universal layout and visual QA. If the user wants a reusable
final continuity sheet and height is missing, ask before handoff unless the
user explicitly chooses to proceed without it. Do not invent height, weight,
gender, synopsis facts, or accessories just because the visual template can
display those fields.

When the user supplies a portrait, uploaded image, or says "in this likeness":

- treat likeness preservation as a binding user constraint;
- capture the visual identity anchors in Cast Design before media handoff;
- hand off the image as an exact `asset-file` reference when it is already a
  registered project asset, or as an exact `project-file` reference when it is
  only an available project-relative file. Ask `media-producer` to assign it to
  the selected provider Skill's actual native media field;
- do not silently downgrade the image to a loose text description when a
  selected endpoint accepts the exact reference;
- do not ask media-producer to combine references into one local collage; Renku
  can pass multiple references to capable image models;
- do not import a historical portrait as the final character sheet unless the
  user explicitly wants that source image to be the cast sheet.

There is no focused attachment purpose for a durable generic Cast reference
image. If the user asks to register one independently of a generation request,
report that capability gap. Do not disguise the file as a character
sheet/profile or invent provenance.

Do not run generation yourself. Ask `media-producer` to author the temporary
provider review document, open conversational Preview when required, satisfy
the current confirmation policy, inspect the result, and return exact safe
generation provenance. After a voice sample is generated and inspected, automatically attach
it through `renku cast voice attach`; do not import it with `renku media import`.
