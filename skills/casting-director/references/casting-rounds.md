# Casting Rounds

A casting round auditions one Look: several image models each make a few
candidates from one brief, and the director hides the ones they don't want,
compares the rest and casts one. Casting comes before character sheets. Write the Looks first
(`looks.md`).

A character sheet round works the same way for costumes: each costume of a
cast Look gets a round of sheets, and the director hides, compares and picks
one sheet per costume. One panel can cover several costumes of one Look;
every costume gets its own round with the same models and counts. The
differences are marked **Sheets** below and in `cast-media-handoff.md`.

## 1. Prepare The Round

1. Read the Look ids: `renku cast looks show --cast <cast-member-id> --json`.
2. Write the brief as a few short display lines: who this is in this Look
   (age read, build, height when known, face and hair anchors from the Look
   description and Cast facts) and what they wear for the audition. The
   clothing and every other creative choice are yours and the user's. The
   image layout is fixed by Studio; `media-producer` owns it in
   `references/cast-casting-candidate.md`.
3. Choose references:
   - a later Look always offers the earlier Look's cast candidate as the
     identity reference ("same person, aged fifteen years");
   - "more like these" uses every kept (not hidden) candidate;
   - a likeness the user supplied, as an exact asset file id.
4. Read the defaults: `renku settings casting show --json`. `candidateRoutes`
   are the models and counts of a casting round and `characterSheetRoutes`
   the models and counts per costume of a sheet round. When the list is
   empty, start from the image lane default model (10 candidates, or 2 sheets
   per costume; `renku settings generation show --lane image`). The number
   run at a time is the image lane's `maxConcurrentGenerations`.
   `candidateDetail` (default `lowest`) is a casting round's image detail
   level and `characterSheetDetail` (default `highest`) a sheet round's, each
   `lowest`, `mid` or `highest`.
5. Take each model's one-line strength note from the casting strength table
   in `media-producer`'s `references/cast-casting-candidate.md`.

## 2. Confirm The Round With The Director

The round confirmation covers all of its candidates: models, counts, brief,
references and estimate. Each candidate does not get its own Route Chooser or
generation review.

**Codex Desktop with panel support** (trusted host whose
`generation.review.capabilities` probe advertises panel support):

```ts
// casting.round.open
{
  project: string;
  subject:
    | { kind: 'look'; lookId: string }            // casting candidates
    | { kind: 'costumes'; costumeIds: string[] }; // sheets, costumes of one cast Look
  brief: string[];                       // display lines; not stored
  notes?: { [modelKey: string]: string }; // strength line per Default Model List key
  references?: string[];                 // asset file ids; costumes default to the Look's cast candidate
  suggested?: Array<{ provider: string; model: { key: string; name: string }; count: number }>; // counts per round
}
```

Pass `suggested` only when the user named models or counts; otherwise the
panel preselects the saved defaults for the subject. Do not prepare native
requests before opening the panel. The panel shows a Lowest / Mid / Highest
detail switch, preset from `candidateDetail` (or `characterSheetDetail` for
sheets); the director may change it for this round only. **Sheets:** the
panel lists the costumes with a checkbox each, its count is per costume, and
its estimate covers every ticked costume. The panel prices every offered image-lane model/provider with a
configured key itself, from the Default Model List route for that provider at
each detail level, including unselected models and alternate providers in the
card menus. Core aggregates the per-candidate estimates by count, and the
panel keeps the estimate warnings and sources visible. Differences from the
eventual request (references and settings outside the detail level) are
accepted estimate error. Codex built-in shows ChatGPT plan usage without a
provider estimate.

Some routes cannot be priced automatically: providers that bill per token or
per opaque unit, and providers with no price API (Replicate). Their cards show
"No estimate" and stay selectable. When the director wants such a model,
research its current per-image price once and save it with
`renku generation price record` (see `model-researcher`'s
`references/price-research.md`); a recorded price is reused from then on and
never needs research again. Then end the turn. The panel
posts one neutral message, for example:

```text
Casting round ready · Sintel · Young · 10 candidates on 3 models, 4 at a time · estimated $0.67. Round panel <id>. Consume it with casting.round.consume once.
```

Call `casting.round.consume { panelId }` once:

- `generate` returns `subject` (`{ kind: 'look', lookId }` or
  `{ kind: 'costumes', costumeIds }`, the ticked costumes), the confirmed
  per-round `routes` and `detail`, `maxConcurrentGenerations`,
  `referenceAssetFileIds` and the per-round `estimatedCost`. It is the
  confirmation for every round it names; do not ask again. Write one
  `castingRoundCreate` document per Look or costume (step 3); `detail` goes
  to `media-producer` with the rounds (step 4).
- `canceled`: stop and reply briefly.
- `alreadyConsumed` authorizes nothing.

The panel saves the subject's defaults itself when the user ticks its box
(casting defaults for a Look, character sheet defaults for costumes); do not
repeat that with the CLI.

**Claude Code and other hosts:** set the round up in chat text and wait for
the reply. The round's detail level is `candidateDetail` from the casting
settings; the user may change it in chat for this round only. Estimate each
route as one image on that route at that level times its count: take the
provider's `route` for the model from the Default Model List image lane and
run
`renku generation estimate --provider <provider> --model <route> --detail <level> --json`.
Prepare no requests to price the round. Codex built-in images run on the
ChatGPT plan instead of a price.

```text
Casting round for Sintel · Young (round 1)
Brief: about 16, slender, 165 cm; warm brown hair; plain close-fitting leather.
Detail: Lowest
- Seedream 5.0 Pro on Fal.ai × 4 — Dense layouts; keeps the two-panel split clean.
- Nano Banana on Fal.ai × 3 — Keeps one face across references; strong for later Looks.
- GPT Image 2 on Fal.ai × 3 — Follows a detailed brief closely; clean, dependable layout.
10 candidates, 4 at a time · estimated $0.67
Reply "go", or change models, counts or detail.
```

**Sheets:** list the costumes the round covers and give counts per costume;
the total is the per-costume count times the costumes.

The user's reply confirms the round and its detail level. A change means
showing the new round again. Save defaults only when the user asks:
`renku settings casting set --file tmp/operations/casting-settings.json --json`
replaces the whole casting defaults document, so write every field and keep
the ones the user did not change:

```json
{
  "candidateRoutes": [{ "provider": "fal-ai", "model": { "key": "nano-banana", "name": "Nano Banana" }, "count": 3 }],
  "characterSheetRoutes": [{ "provider": "fal-ai", "model": { "key": "nano-banana", "name": "Nano Banana" }, "count": 2 }],
  "candidateDetail": "lowest",
  "characterSheetDetail": "highest"
}
```

A detail level changed for one round is not a new default.

Prices always come from Renku's Engines estimates, never from this Skill.

## 3. Create The Round

Write `castingRoundCreate` from the confirmed plan (see
`samples/casting-round.json`):

```json
{
  "kind": "castingRoundCreate",
  "subject": { "kind": "castLook", "id": "look_..." },
  "routes": [{ "provider": "fal-ai", "model": { "key": "nano-banana", "name": "Nano Banana" }, "count": 3 }],
  "maxConcurrentGenerations": 4,
  "referenceAssetFileIds": [],
  "estimatedCost": { "amount": 0.21, "currency": "USD" }
}
```

```bash
renku cast casting round create --file tmp/operations/casting-round.json --json
```

Use the estimated total the director saw for that round, or `null` when a
route had no price. **Sheets:** write one document per ticked costume with
`"subject": { "kind": "castCostume", "id": "cast_costume_..." }` and the same
routes. Core numbers rounds per Look or costume and returns each `round.id`.
Errors: `CASTING_ROUND_ROUTES_EMPTY`, `CASTING_ROUND_REFERENCE_NOT_OWNED` when
a reference is not one of this Cast Member's files, and
`CASTING_ROUND_LOOK_NOT_CAST` when a costume's Look is not cast yet.

## 4. Generate The Candidates

Hand the round to `media-producer` with the round id, the brief, the
references, the confirmed routes and counts, and the round's detail level. It generates every candidate
with purpose `cast.casting-candidate` and target `casting-round:<round-id>`,
runs up to `maxConcurrentGenerations` at once, and imports each candidate as
soon as it finishes:

```bash
renku media import --purpose cast.casting-candidate --target casting-round:<round-id> \
  --casting-model <route-model-key> --source <output> --provenance <provenancePath>
```

**Sheets:** purpose `cast.character-sheet`, the same `casting-round:<round-id>`
target of the costume's round and `--casting-model`; see
`media-producer`'s `references/cast-character-sheets.md`.

In Codex, open the board right after `round create` and keep generating; it
polls and fills in as images land:

```text
casting.board.open { project, mode: 'candidates', lookId }
casting.board.open { project, mode: 'sheets', lookId, costumeId? } // sheets of the Look's costumes
```

When every candidate is in, report how many landed and any that failed, then
end the turn. Never retry a failed paid generation automatically.

## 5. Hide, Compare And Cast (Or Pick)

- **Codex:** the board's Hide and Cast (on tiles, in the viewer and in
  Compare) write through Renku directly. Cast and "More like these" post a
  message; call `casting.board.consume { sessionId }` once. It returns
  `{ status: 'consumed', request }` where `request` is `{ kind: 'cast', lookId,
  assetFileId }` or `{ kind: 'moreLikeKept', subject, referenceAssetFileIds,
  notes }` with `subject` `{ kind: 'castLook' | 'castCostume', id }`;
  `alreadyConsumed` authorizes nothing. **Sheets:** Pick saves the costume's
  sheet directly and sends no message; the next step comes from the user in
  chat.
- **Claude Code:** point the user to the Cast Member's **Casting** tab in
  Studio to hide, compare and cast or pick. When they come back, read
  `renku cast casting show --look <look-id> --json` (or `--costume
  <costume-id>`) for statuses and the cast candidate or picked sheet.
- When the user asks in chat, set a status with
  `renku cast casting candidate status --asset-file <id> --status candidate|hidden --json`
  or cast with
  `renku asset select --project <project-name> --target look:<look-id> --asset-file <asset-file-id> --json`.

**More like these** is a new round for the same Look or costume: the kept
(not hidden) images' asset file ids become `references` (and then
`referenceAssetFileIds`), and the director's notes reshape the brief. Go back
to step 2.

**Next Look:** once a Look is cast, offer the next Look's round with the cast
candidate as its identity reference. When every Look is cast, move on to the
wardrobe plan (`wardrobe-plan.md`).
