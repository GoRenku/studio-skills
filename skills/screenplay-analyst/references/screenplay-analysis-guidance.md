# Screenplay Analysis Guidance

Version 1 uses a three-act model. Be disciplined and useful.

## Measures Are Levels, Not Grades

Each criterion (`dramaticEnergy`, `stakes`, `characterAgency`) is a `0`–`100`
**level** of that quality *at that point in the story* — not a quality grade of
the writing. Read the scene and judge how high that quality actually runs there:

- `dramaticEnergy`: how strongly the moment pulls the audience forward.
- `stakes`: how clearly and how high what can be lost or gained is.
- `characterAgency`: how much a character's own choice is driving the story.

Assign levels so the sequence of scenes traces the real cadence of the script.
A scene can legitimately be low (a quiet regroup) or high (a confrontation).
Use the full range; do not cluster everything in a narrow band.

The Studio chart compares your measured levels against an **expected cadence**
for a successful three-act screenplay (the ideal rises into the climax and eases
at the resolution). That ideal lives in the app — you do **not** emit it. Your
job is only to assess the measured levels and beat placements honestly so the
gap between measured and ideal is meaningful.

## Beat Placement

Include all nine key-beat roles. Place a beat on the single Scene that best
embodies it, and keep distinct beats on **distinct Scenes** when the screenplay
supports that distinction. If a beat is missing or weak, omit its optional
`sceneId` and explain the gap in the critique rather than forcing it onto a
neighbouring Scene.

## Three-Act Lens

For a flat Screenplay, derive three analytical Act segments from canonical
Scene order. For exactly three source Acts, evaluate those Acts and preserve
their returned Scene memberships exactly. These never store screenplay Section
ids. Recommend a better source boundary through critique suggestions rather
than moving it inside analysis.
Each current Scene appears exactly once across the three segments, in order.
Optional `sceneGroups` provide a second analysis-owned partition for sequences
of dramatic development; they likewise cover each Scene exactly once in order.

Use these common pressure points when they are visible in the script:

- Hook: the opening reason to keep watching.
- Inciting Incident: the disruption that makes the old path impossible.
- First Plot Point: the commitment into the main conflict.
- First Pinch Point: pressure that proves the opposition is real.
- Midpoint: reversal, revelation, or false victory/defeat.
- Second Pinch Point: renewed pressure with higher cost.
- Second Plot Point: the move into final confrontation.
- Climax: the decisive test of want, need, and consequence.
- Resolution: the new state after the decision.

Do not force every beat if the current screenplay is too early or too sparse. Use the beats that genuinely apply and explain what is missing.

## Evidence

Every major critique should point to scene evidence. Evidence can describe what the scene currently dramatizes; it does not need to quote dialogue unless the line is important.

Good evidence:

- Names the specific scene id.
- Explains what the scene makes visible or fails to make visible.
- Connects to a score or recommendation.

Weak evidence:

- Generic praise.
- Claims about runtime, pacing minutes, or page count.
- Critique not connected to a scene.

## Suggestions

Suggestions should be actionable but not automatic. They should give a later agent enough material to draft a screenplay operation after the user approves.

Suggested scene additions should include purpose, synopsis, rationale, and expected criterion changes.

## Things To Avoid

- Do not invent runtime, page numbers, shot timings, edit pacing, or post-production facts.
- Do not rewrite scenes inside the analysis document.
- Do not create new Cast Member, Location, Prop, Section, or Scene ids.
- Do not use screenplay Act/Sequence Section ids as analytical ownership or
  invent alternate boundaries for a three-source-Act Screenplay.
- Do not claim a beat exists when the screenplay only implies it weakly.
