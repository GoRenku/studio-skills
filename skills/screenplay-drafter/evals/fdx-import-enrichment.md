# FDX Import And Enrichment Eval

## Task

Use `screenplay-drafter` to import a supplied Final Draft `.fdx` into an empty
current Renku Project, then coordinate fact creation and Screenplay bindings.
The source contains a flat Scene list, ambiguous cue aliases, an indirect Prop
mention, existing matching-looking Project facts, formatting, and ScriptNotes.

## Success Criteria

- Checks Screenplay status and source ownership, runs the required
  `renku screenplay import-fdx`,
  and verifies the canonical Screenplay/report.
- Returns candidate evidence and unresolved identity questions to
  `movie-director`; it does not independently become the enrichment
  coordinator.
- Produces no Sections for any FDX source, including files with New Act, End of
  Act, Sequence, Summary, Outline, Note, or Act-looking prose markers.
- Treats cue, heading, and tag results as evidence rather than identities.
- Asks the user whether ambiguous aliases or settings are the same subject.
- Does not reuse an existing Cast/Location/Prop fact solely because its name
  looks similar; requires agent/user semantic judgment.
- Routes accepted Cast facts to `casting-director` and Location/Prop facts to
  `production-designer`.
- Does not add speaker, setting, mention, or presence references to the
  FDX-backed Screenplay; the source-owned read-only gate covers references.
- Does not mention ScriptNotes or formatting as omissions, warnings, or work
  items.
- For a changed-source refresh case, accepts `refreshed` directly without a
  diff preview, removal confirmation, or approval token.
- Treats refresh as exact source mirroring, not a partial merge, and never
  edits imported hierarchy through `screenplay apply`.
- Does not independently dispatch media, analysis, Scene Beats, or storyboard
  work; those stages are gated by Project Settings in `movie-director`.
