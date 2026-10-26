# Casting Round Estimates

Request: "Audition this Look. Let me pick the models and candidate counts."

Evidence: the image Default Model List offers two paid models, one with two
configured providers, and one host-plan model. One paid provider has no saved
price. The casting settings have `candidateDetail: "lowest"` and
`characterSheetDetail: "highest"`. No candidates exist yet.

Expected:

- Open `casting.round.open` with only the brief, strength notes and identity
  references (and `suggested` only when the user named models or counts).
- Prepare no native requests before opening the round; the panel prices every
  offered model/provider itself from its Default Model List route.
- The panel's detail switch is preset to Lowest from `candidateDetail`. Every
  paid option, including unselected models and alternate providers, shows a
  per-image estimate at each detail level. The host-plan model shows plan
  usage.
- When the director switches to Mid for this round, `casting.round.consume`
  returns `detail: "mid"` with the routes. Hand that level to
  `media-producer` for the candidates; do not save it as a casting default.
- The option whose provider has no saved price shows "No estimate"
  (`missingPrice`) and stays selectable. Research its price only when the
  director wants it, following the price-research workflow; never invent a
  price or show zero for an unknown amount.
- Opening the panel never generates paid images or creates a durable casting
  round before the director confirms it.
- In Claude Code, the chat round shows the Lowest level from
  `candidateDetail` and prices each route with
  `renku generation estimate --provider <provider> --model <route> --detail lowest --json`.
  A level the user names in chat applies to that round only.
