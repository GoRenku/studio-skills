# Hierarchy-Independent Analysis Eval

## Task

Use `screenplay-analyst` to analyze a current Renku Screenplay whose three
Scenes are stored flat with no Sections. Persist a complete three-act analysis.

## Success Criteria

- Reads analysis context through the CLI and does not create Sections.
- Authors exactly three ordered `actSegments` that partition all current Scene
  ids once.
- Authors one `sceneAnalysis` per current Scene in canonical order.
- Includes every key-beat role exactly once and omits `sceneId` for a genuinely
  absent beat rather than inventing a placement.
- Uses optional `sceneGroups` only as analysis-owned Scene partitions.
- Uses current Scene ids for evidence and suggested-Scene placement.
- Includes relevant Prop evidence from context when it materially supports the
  critique.
- Validates before writing and confirms the new active analysis.
- Does not emit `kind`, Act ids, Sequence ids, duplicated Scene titles, or old
  hierarchy fields.
