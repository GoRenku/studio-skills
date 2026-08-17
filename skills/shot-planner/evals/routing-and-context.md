# Routing And Context Evaluations

- A request to visualize ordered Scene narrative developments routes through
  Scene Beat Designer and Media Producer `scene.storyboard-sheet`, not
  `shot.image` or Shot Planner.
- A request for camera coverage, lenses, movement, blocking, lighting intent,
  or approximate Shot duration routes to Shot Planner.
- Beat Storyboard images remain owned by logical Beats; selected Shot Images
  remain owned by exact Shots.
- A request to “plan coverage for this scene” routes from Movie Director to
  `shot-planner`, resolves Studio selection, reads Beat context, then lists
  current Shot Plans.
- A production scene number resolves to a durable Scene id before Shot Plan
  reads.
- Stable Plan and Shot numbers are read from Core reports, never calculated
  from array position or authored by the skill.
- Several plans without an exact selection cause a clarification; the agent
  does not choose by title similarity.
