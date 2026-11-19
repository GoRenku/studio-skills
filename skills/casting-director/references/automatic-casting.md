# Automatic Casting

Use this when the user wants cast pictures and character sheets made without
reviewing each round, for example "cast everyone", "make the cast images and
sheets", "cast the rest automatically" or "cast Mara without asking me each
round". It is the same casting as `casting-rounds.md` (Looks, a casting round
per Look, a cast candidate, costumes, a sheet round per costume, a picked
sheet), run end to end by you after one confirmation.

It works the same in every agent and host: Claude Code, Codex, the Claude and
ChatGPT apps, and Renku Cloud. The confirmation is one chat message. Do not
open the round panel or the casting board in this mode, even where panels are
supported.

## 1. Find Who Needs Casting

Run `renku cast list --json`, then for each on-screen Cast Member
`renku cast design context --cast <cast-member-id> --json` (in Renku Cloud,
all of them in one `renku_command` batch). Its
`generationReadiness.casting` reports:

- `hasLook`: false when the Cast Member has no Look yet;
- `uncastLookIds`: Looks without a cast picture;
- `lookIdsWithoutCostume`: Looks with no costume yet;
- `unpickedCostumeIds`: costumes without a picked character sheet;
- `isCast`: true when nothing is missing.

Voice-over Cast Members report `casting: null`; leave them out. Leave out Cast
Members with `isCast: true` unless the user names them. When the user named
characters, cover only those.

## 2. Write Missing Looks And Costumes

Writing Looks and wardrobe plans costs nothing, so do it before the
confirmation and show the result in it. Never rewrite Looks or costumes that
exist.

- A Cast Member with no Look gets one Look per visible age or large physique
  change the screenplay shows, or one Look named "Main" covering the scenes
  it appears in (`looks.md`).
- A Look with no costume gets one costume per clear costume change in its
  scenes, or one costume named "Main" covering the Look's scenes
  (`wardrobe-plan.md`).

## 3. One Confirmation For The Whole Batch

- **Counts:** one candidate per uncast Look and one sheet per unpicked
  costume, unless the user named other counts.
- **Model:** the first model of `candidateRoutes` for candidates and of
  `characterSheetRoutes` for sheets in `renku settings casting show --json`;
  when a list is empty, the image generation type's default model
  (`renku settings generation show --type image --json`).
- **Detail:** `candidateDetail` for candidates and `characterSheetDetail`
  for sheets.
- **Portraits:** one `cast.profile` for each listed Cast Member without a
  selected profile, on the image generation type's default model.
- **Estimate:** price one image per route and detail level with
  `renku generation estimate --provider <provider> --model <route> --detail <level> --json`
  and multiply by the counts. Portraits use the route's default size. A
  route with no known price shows "No estimate"; research it only when the
  user wants that model (`model-researcher`'s `references/price-research.md`).
  Never invent a price.

Show one message and wait for the reply:

```text
Cast everyone · Big Fish · 12 characters
Each Look: 1 candidate · each costume: 1 sheet · Nano Banana 2.0 on Fal.ai
- Jenny Hill · Main · 1 costume
- Karl · Young, Older · 3 costumes
- … one line per character
12 candidates (Lowest) + 14 sheets (Highest) + 12 portraits, 4 at a time
Estimated $<total>
Reply "go", or change models, counts or characters.
```

The reply confirms every round and portrait in the list. It replaces the
round panel, the Route Chooser and per-image generation review for them. Any
change the user asks for means showing the whole list again.

## 4. Cast Every Look

For each uncast Look, write a `castingRoundCreate` document with the
confirmed route and count, the image generation type's
`maxConcurrentGenerations`, and the round's share of the estimate. A later
Look of the same Cast Member uses the earlier Look's cast candidate as
`referenceAssetFileIds` ("same person, older"), so its round waits until that
Look is cast; other rounds can be created together (in Renku Cloud, in one
`renku_command` batch).

```bash
renku cast casting round create --file tmp/operations/casting-round.json --json
```

Hand the rounds to `media-producer` (purpose `cast.casting-candidate`,
target `casting-round:<round-id>`, the round's detail level), running up to
`maxConcurrentGenerations` at once. With one candidate per round, import with
`--select`, which casts it in the same write:

```bash
renku media import --purpose cast.casting-candidate --target casting-round:<round-id> \
  --casting-model <route-model-key> --source <output> --provenance <provenancePath> --select
```

With several candidates per round, import them without `--select`, look at
all of them, cast the one that best fits the Look and Cast Design with
`renku asset select --target look:<look-id> --asset-file <asset-file-id> --json`,
and say in one line why.

## 5. Pick A Sheet For Every Costume

Once a Look is cast, create one sheet round per unpicked costume of that Look
(`"subject": { "kind": "castCostume", "id": "cast_costume_..." }`). Leave
`referenceAssetFileIds` empty so the Look's cast candidate is the identity
reference. `media-producer` makes `cast.character-sheet` images
(`references/cast-character-sheets.md`) and imports them the same way: with
`--select` when there is one sheet per costume, or picks the best with
`renku asset select --target costume:<costume-id> --asset-file <asset-file-id> --json`.

## 6. Portraits

For each listed Cast Member without a selected profile, `media-producer`
makes `cast.profile` from the first Look's cast picture (the `cast-identity`
suggestion of its generation context) and imports it with `--select`
(`references/cast-profile.md`).

## 7. Report

Report per character the cast pictures, picked sheets and portrait that
landed, and every image that failed. Never retry a failed paid generation on
your own; offer a new round instead. Every image stays in its round, so the
user can recast a Look or repick a sheet later in the Cast Member's
**Casting** tab in Studio, or ask you in chat.
