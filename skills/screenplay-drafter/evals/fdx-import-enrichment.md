# FDX Import And Enrichment Eval

## Task

Use `screenplay-drafter` to import a supplied Final Draft `.fdx` into an empty
current Renku Project, then coordinate fact creation and Screenplay bindings.
The source contains a flat Scene list, ambiguous cue aliases, an indirect Prop
mention, existing matching-looking Project facts, formatting, and ScriptNotes.

## Success Criteria

- Checks Screenplay status, runs `renku screenplay import-fdx` exactly once,
  and verifies the canonical Screenplay/report.
- Returns candidate evidence and unresolved identity questions to
  `movie-director`; it does not independently become the enrichment
  coordinator.
- Does not create Sections for a flat source.
- Treats cue, heading, and tag results as evidence rather than identities.
- Asks the user whether ambiguous aliases or settings are the same subject.
- Does not reuse an existing Cast/Location/Prop fact solely because its name
  looks similar; requires agent/user semantic judgment.
- Routes accepted Cast facts to `casting-director` and Location/Prop facts to
  `production-designer`.
- Represents the indirect Prop through a focused presence/mention reference
  without rewriting imported screenplay text.
- Adds speaker/setting/mention/presence references only after durable fact ids
  exist.
- Does not mention ScriptNotes or formatting as omissions, warnings, or work
  items.
- Does not attempt re-import, overwrite, merge, or provenance deletion.
- Does not independently dispatch media, analysis, Scene Beats, or storyboard
  work; those stages are gated by Project Settings in `movie-director`.
