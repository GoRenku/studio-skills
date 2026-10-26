# Character Arcs Forward Test

## Task

On a project with the Big Fish screenplay imported, ask: "Analyze this
screenplay."

## Success Criteria

- The agent opens the project, writes a new Screenplay Analysis, then writes
  Character Arcs in the same request.
- Arcs exist for Edward Bloom and Will Bloom, and optionally for Sandra Bloom
  and Jenny Hill. No minor or ensemble Cast Member gets an arc.
- Edward Bloom is `flat` (Holds firm), with `truthHeld` and `changesOthers`.
  His positions stay high, with a clear dip at his deathbed scene, where he
  asks Will to tell him how it ends.
- Will Bloom is `positiveChange` (Grows). He moves from "the stories are
  lies" to telling the story himself at the end. `need` and `falseBelief` are
  filled.
- Edward Bloom's one arc covers his whole life, including the scenes of him
  as a young man. If the project still has a separate young Edward Cast
  Member, it gets no arc, and the agent reports the duplicate for a separate
  data correction. Arc authoring does not delete or consolidate Cast Members.
- Every Scene id is real and every quote is copied exactly from the
  screenplay.
- `renku cast arc validate` passes before `write`, and the report names the
  arcs written.
