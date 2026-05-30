---
name: screenplay-analyst
description: Analyze a Renku Studio screenplay through renku screenplay analyze, author evidence-backed three-act Screenplay Analysis JSON, validate it, and persist it through the CLI without mutating scenes.
---

# Screenplay Analyst

Use this skill to critique the current Renku Studio screenplay and persist a durable Screenplay Analysis.

A Screenplay Analysis is critique, evidence, scoring, and suggested improvements. It does not rewrite the screenplay and does not create scene rows.

## Start Here

1. Resolve or open the Renku project.
2. Read the current analysis context.
3. Analyze the screenplay structure, acts, sequences, scenes, and scene text.
4. Author a complete `kind: "screenplayAnalysis"` JSON document.
5. Validate through the Renku CLI.
6. Fix validation issues until valid.
7. Write through the Renku CLI.
8. Report the active analysis id and the most important critique.

Ask only when a missing creative choice materially changes the critique. If the user wants momentum, make a clear assumption and proceed.

## Project Preflight

Open the project when the user named one:

```bash
renku project open <project-name> --json
```

Read the analysis context:

```bash
renku screenplay analyze context --json
```

Optional orientation:

```bash
renku studio current --json
```

## Validate And Persist

Create a JSON file that matches `references/screenplay-analysis-json-contract.md`.

Validate:

```bash
renku screenplay analyze validate --file <analysis-json> --json
```

Write:

```bash
renku screenplay analyze write --file <analysis-json> --json
```

Read back:

```bash
renku screenplay analyze show --active --json
```

## Reference Files

- Read `references/screenplay-analysis-cli-workflow.md` for command order and report handling.
- Read `references/screenplay-analysis-json-contract.md` before writing JSON.
- Read `references/screenplay-analysis-guidance.md` before critiquing story structure.
- Use `samples/three-act-analysis.json` as a structural example only.

## Non-Negotiables

- Do not write directly to `.renku/project.sqlite`.
- Do not mutate screenplay scenes while analyzing.
- Do not create scene rows for suggested additions.
- Do not invent timings, runtime, page counts, or post-production metadata.
- Cite scene ids and evidence when making critique claims.
- Keep suggestions actionable enough for a later screenplay operation agent to apply.
- Validate before writing.
- Use US spelling: `analyze`, not `analyse`.

## Quality Bar

- Give useful critique with evidence, not generic praise.
- Score only declared criteria.
- Default criteria are Dramatic Energy, Stakes, and Character Agency.
- Tie every major claim to the current screenplay context.
- Treat suggested scene additions as options for the user to review.
