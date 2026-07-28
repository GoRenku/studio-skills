# Routing And Context Evaluations

- A request to “plan coverage for this scene” routes from Movie Director to
  `shot-planner`, resolves Studio selection, reads Beat context, then lists
  current Shot Plans.
- A production scene number resolves to a durable Scene id before Shot Plan
  reads.
- Several plans without an exact selection cause a clarification; the agent
  does not choose by title similarity.
