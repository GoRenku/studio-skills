# FDX Import And Enrichment Eval

## Task

Use `screenplay-drafter` to import a supplied Final Draft `.fdx` into an empty
current Renku Project, enrich Project Information, then return fact candidates
to `movie-director` for its enabled follow-up stages.
The source contains a flat Scene list, ambiguous cue aliases, an indirect Prop
mention, existing matching-looking Project facts, formatting, and ScriptNotes.

## Success Criteria

- Checks Screenplay status and source ownership, runs the required
  `renku screenplay import-fdx`,
  and verifies the canonical Screenplay/report.
- Reads the complete canonical story and current Project Information after a
  successful explicit import. Drafts distinct logline, synopsis, and premise
  text for missing or unmistakably temporary fields, then rechecks current
  values before one selective `renku info set` and verifies them by readback.
- Preserves meaningful Project title and story fields, even when they are short
  or disagree with the imported script. Reports a possible discrepancy instead
  of silently rewriting substantive text. Does not change aspect ratio,
  Project language, or unrelated development fields.
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
- If separately supplied supporting files exist, routes their exact import to
  `screenplay-supporting-material-importer` without making FDX ownership a
  prerequisite. The owning fact specialists read those files during explicit
  enrichment; the screenplay importer does not.
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
- Does not pass raw supporting-material paths or contents into those downstream
  stages after durable Cast/Location/Prop descriptions are written.

## Project Information Cases

Run these with simulated CLI responses or an isolated Project. Judge the
authored fields against the supplied screenplay, including its ending, rather
than checking for fixed phrases. Do not write to a real user Project.

| Case | Expected behavior |
| --- | --- |
| Empty story fields after `imported` | Read the whole canonical screenplay, draft distinct logline, synopsis, and premise, set all three in one `info set` call, and verify with `info show`. Keep the existing meaningful title. |
| Mixed values after `refreshed`: meaningful logline, empty synopsis, `TBD` premise | Preserve the logline; set only synopsis and premise in one call. Mention a substantive logline/script discrepancy if one exists. |
| All fields substantive, even if brief | Make no `info set` call. Do not classify a concise but meaningful sentence as a placeholder by length alone. |
| Clearly temporary title with an explicit FDX title page | Set the source-authored title alongside any qualifying story fields. If the FDX title is absent or ambiguous, keep the current title; never invent one from the filename or Project slug. |
| `unchanged` after an earlier import succeeded but metadata writing failed | Report no Screenplay change, read current Project Information, fill only fields still missing or clearly temporary, and avoid repeating Cast/Location/Prop work. |
| FDX import fails | Do not draft or write Project Information. Report the import failure. |
| Large script with a misleading opening or familiar film title | Inspect the story through its ending before drafting. If enough of the canonical script cannot be read, leave Project Information untouched and report the limitation. Do not substitute outside plot knowledge. |
| `info set` reports an error after successful import | Report the Screenplay outcome separately; read back Project Information to determine whether the metadata persisted. Retry only fields still qualifying; do not re-import solely to recover the metadata. |

Across every case, assert that the skill never writes aspect ratio, Project
language, or unrelated Project fields, and that this agent pass is not attributed
to the deterministic importer, a bare CLI import, or a detected Studio export.

## Detected Export Follow-Up

Prompt: “I exported an updated FDX and Studio says screenplay update available.
Help me update it without losing track of my production work.”

Expected behavior:

- Direct the user to the fixed `screenplay/edit/script.fdx` handoff and Studio review.
- Do not write retained source Assets or automatically invoke immediate CLI import.
- Explain that a punctuation edit can replace a whole Scene graph; historical
  Beats, Shot Plans, Shots, and audio do not move to the replacement Scene.
- Treat Later as deferral, not acceptance; a newer export requires fresh review.
- If the user explicitly requests manual CLI import, explain its immediate
  replacement behavior and honor that authorized command without inventing flags.
- Do not semantically validate or repair production artifacts from warning counts.
