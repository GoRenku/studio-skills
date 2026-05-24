---
name: inspiration-analyzer
description: Analyze a Renku Studio Visual Language Inspiration folder from its stored image files, then validate and write a project-native Inspiration Analysis JSON document through the Renku CLI.
---

# Inspiration Analyzer

Use this skill to analyze a Renku Studio Inspiration folder as a cinematographer-focused visual reference study.

The folder already exists in a Renku Studio project. Renku owns the folder metadata and persisted analysis JSON. The image files inside the folder are plain filesystem content: inspect them with normal shell commands, not with Renku asset commands.

## Start Here

1. Resolve the Renku project.
2. Find or confirm the Inspiration folder.
3. Use the folder name as a creative and research hint.
4. Inspect every supported image file in the folder.
5. Write a complete `kind: "inspirationAnalysis"` JSON document.
6. Validate and write it through the Renku CLI.
7. Read the analysis back and make sure it persisted.

Ask only when a missing choice materially changes the analysis. If the user wants momentum, make clear assumptions and proceed.

## Project Preflight

For an existing project:

```bash
renku project open <project-name> --json
```

If the user did not provide a folder ID, list folders:

```bash
renku inspiration list --json
```

Inspect the chosen folder:

```bash
renku inspiration show --folder <folder-id> --json
```

Use the returned `folder.name` as context and `folder.absolutePath` as the filesystem location.

## Analyze A Folder

1. Treat the folder name as a serious hint. It may be a movie title, director, cinematographer, photographer, painter, movement, period, place, or production phrase chosen to improve the analysis.
2. If the name points to a known reference, use reliable context to sharpen what you look for: collaborators, era, format, genre, visual movement, director signatures, cinematographer signatures, production context, or recurring visual strategies.
3. Inspect the folder contents directly:

```bash
cd "<folder.absolutePath>"
find . -maxdepth 1 -type f
```

4. Analyze every supported image file, not only favorite frames.
5. Keep every persisted claim grounded in the actual images. Context can guide interpretation, but the analysis should not become a biography or trivia note.

## Write And Validate

Create a JSON file matching `references/inspiration-analysis-json-contract.md`.

Validate:

```bash
renku inspiration analysis validate --folder <folder-id> --file <analysis-json> --json
```

Write:

```bash
renku inspiration analysis write --folder <folder-id> --file <analysis-json> --json
```

Read back:

```bash
renku inspiration analysis show --folder <folder-id> --json
```

## Reference Files

- Read `references/inspiration-analysis-cli-workflow.md` for command order and report handling.
- Read `references/inspiration-analysis-json-contract.md` before writing JSON.
- Read `references/cinematography-analysis-guidelines.md` before doing the visual analysis.
- Use `samples/analysis.json` and `samples/the-substance-analysis.json` as quality examples for depth, specificity, and section coverage. Replace every value with observations from the user's folder.

## Non-Negotiables

- Do not download images from FilmGrab or the web for this workflow.
- Do not write directly to `.renku/project.sqlite`.
- Do not register Inspiration images as assets or create per-image database records.
- Do not store absolute paths in the JSON document.
- Do not use project-relative paths in `imageFiles`; use folder-local filenames.
- Do not write analysis until `validate` passes.
- Do not omit images that are present unless the file is unreadable or not a supported image.
- Do not invent director, cinematographer, year, or production history from the folder name. Use known information when it is reliable; otherwise qualify it as inference or leave it out.

## Quality Bar

- Write for working cinematographers: concrete, visual, and repeatable.
- Explain what each visual strategy does, not only what it looks like.
- Cite filenames only when they visibly demonstrate the claim.
- Prefer one strong supporting image over several weak ones.
- Treat `inspiredBy` as visual lineage or affinity unless the user supplied confirmed source information.
