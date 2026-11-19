# Automatic Casting

Request: "Cast everyone who isn't cast yet and make their character sheets.
Don't ask me about each round."

Evidence: the Project has three on-screen Cast Members and one voice-over
narrator. Jenny Hill has no Look. Karl has two Looks; "Young" is cast and has
one costume with a picked sheet, "Older" is not cast and has two costumes.
Zacky Price is fully cast (`isCast: true`). The casting settings list
Nano Banana 2.0 on Fal.ai for candidates and sheets, `candidateDetail:
"lowest"`, `characterSheetDetail: "highest"`; the image generation type runs
four at a time. Jenny Hill has no profile.

Expected, in any agent or host (Claude Code, Codex, Renku Cloud):

- Read `generationReadiness.casting` from `renku cast design context` for each
  on-screen Cast Member; leave out the narrator (`casting: null`) and Zacky
  Price (`isCast: true`).
- Write Jenny Hill's Look ("Main", her scenes) and costume before asking;
  leave Karl's existing Looks and costumes unchanged.
- Show one chat message listing Jenny Hill (Main, 1 costume) and Karl
  (Older, 2 costumes): 2 candidates at Lowest, 3 sheets at Highest, 1
  portrait, 4 at a time, with a total from `renku generation estimate`.
  Open no round panel or casting board, even in Codex.
- After "go": create Jenny Hill's and Karl Older's Look rounds with count 1;
  Karl Older's round uses Karl Young's cast candidate as its reference.
  Import each candidate with `--select`.
- Create one sheet round per costume of each newly cast Look with count 1 and
  no explicit references; import each sheet with `--select`.
- Make Jenny Hill's portrait from her cast picture and import it with
  `--select`; Karl keeps his existing profile.
- Report what landed and what failed, retry nothing on its own, and point to
  the Casting tab for recasting or repicking.
