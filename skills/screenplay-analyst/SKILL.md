---
name: screenplay-analyst
description: Analyze a Renku Studio screenplay through renku screenplay analyze, author evidence-backed three-act Screenplay Analysis JSON, validate it, and persist it through the CLI without mutating scenes.
---

# Screenplay Analyst

This skill requires the installed Renku runtime. If `renku` is unavailable, stop and direct the user to `https://gorenku.com`; do not substitute ad hoc files for the CLI-owned project state.

## Project Workspace

Keep every agent-created working file inside the current Project's categorized
`tmp/` tree. Never create operation JSON, Generation Specs, import manifests,
QA images, downloads, crops, or scratch files at the Project root.

- Use `tmp/operations/` for CLI authoring documents, including create, update,
  design, analysis, Lookbook, Scene Beats, Shot Plan, and import JSON.
- Use `tmp/specs/` for Generation Specs and `tmp/receipts/` for provider receipts.
- Use `tmp/media/` for temporary generated, downloaded, transformed, or cropped
  media; use `tmp/qa/` for review evidence and `tmp/scratch/` for other temporary
  inputs.
- Create category folders lazily. Let Renku commands copy accepted content into
  durable owner folders; never construct durable asset paths in the skill.
- Keep an external user source outside the Project when possible. If a temporary
  in-Project copy is necessary, place it under `tmp/scratch/`.


Use this skill to critique the current Renku Studio screenplay and persist a durable Screenplay Analysis.

A Screenplay Analysis is critique, evidence, scoring, and suggested improvements. It does not rewrite the screenplay and does not create scene rows.

## Start Here

1. Resolve or open the Renku project.
   If the user names `Scene 22`, `22A`, or another production scene number,
   resolve it with `renku screenplay scene-number resolve --number
   <production-number> --json` before focusing the critique.
2. Read the current analysis context.
3. Read `analysisMethod.supported` and `analysisMethod.sourceActMode` before
   doing model work:

   - `flat`: derive three analytical Act segments from canonical Scene order.
     Every FDX-backed Screenplay uses this mode. Do not look for or infer Acts
     from Final Draft New Act, End of Act, Sequence, Outline, Note, marker text,
     or retained source XML.
   - `sourceThreeAct`: use the three source Act Scene memberships exactly and
     critique weak boundaries through analysis `critique.suggestions`. This
     mode is available only from canonical Renku-authored Act organization,
     never from FDX markers.
   - `unsupported`: stop before authoring or generation and explain the
     three-act-only restriction from the returned reason.
4. Author a complete Screenplay Analysis JSON document.
5. Validate through the Renku CLI.
6. Fix validation issues until valid.
7. Write through the Renku CLI. An ordinary “Analyze this screenplay” request
   always creates a new analysis revision and makes it active.
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
renku screenplay analyze validate --file tmp/operations/screenplay-analysis.json --json
```

Write:

```bash
renku screenplay analyze write --file tmp/operations/screenplay-analysis.json --json
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
- Do not call any Screenplay mutation command while analyzing. Analysis never
  creates, updates, moves, deletes, or organizes screenplay content.
- Do not create scene rows for suggested additions.
- Do not use screenplay Act or Sequence Section ids in analysis JSON. For
  `sourceThreeAct`, copy the returned Scene membership into the three
  `actSegments` without storing Section ids or alternate boundaries.
- Partition every current Scene exactly once, in canonical order, across the
  three `actSegments`; do the same across `sceneGroups` when groups are present.
- Include every accepted key-beat role exactly once. Omit `sceneId` when the
  screenplay does not yet embody a beat instead of inventing a placement.
- Do not invent timings, runtime, page counts, or post-production metadata.
- Cite scene ids and evidence when making critique claims.
- Use production numbers in transient user-facing prose when helpful, but keep
  persisted Screenplay Analysis JSON references durable-id-only.
- Keep suggestions actionable enough for a later screenplay operation agent to apply.
- Validate before writing.
- Use US spelling: `analyze`, not `analyse`.

## Quality Bar

- Give useful critique with evidence, not generic praise.
- Score only declared criteria.
- Default criteria are Dramatic Energy, Stakes, and Character Agency.
- Tie every major claim to the current screenplay context.
- Treat suggested scene additions as options for the user to review.
