---
name: scene-shot-designer
description: Design and persist Renku Studio Scene Shot Lists by reading scene screenplay context, referenced cast and locations, selected Movie Lookbook guidance, and user direction.
---

# Scene Shot Designer

Use this skill to design durable Scene Shot Lists for individual Renku Studio screenplay scenes.

A Scene Shot List is a scene-owned coverage plan. It is not the final edit timeline and not a place for generated image paths. It records the shots the scene needs, why each shot exists, what story material it covers, and how it should feel visually.

## Start Here

1. Resolve the current Renku project and target scene.
2. Read shot-list context with the Renku CLI.
3. Decide whether the user wants brainstorming only, a saved shot list, an active-state change, or storyboard media handoff.
4. Translate user direction and selected Movie Lookbook guidance into concrete framing, movement, blocking, light, texture, subject, and editorial coverage choices.
5. Write a complete `kind: "sceneShotList"` JSON document only when the user wants project state saved.
6. Validate through the Renku CLI.
7. Write through the Renku CLI.
8. Read back the active shot list and summarize the coverage.

Ask only when a missing creative choice materially changes the coverage strategy. If the user wants momentum, make a clear assumption and proceed.

## Project And Scene Preflight

For an existing project:

```bash
renku project open <project-name> --json
```

Read context for a scene:

```bash
renku screenplay shot-list context --scene <scene-id> --json
```

If the user explicitly asks to use visual references, rerun context with:

```bash
renku screenplay shot-list context --scene <scene-id> --include-visual-references --json
```

Default shot-list work should stay text-first: screenplay blocks, referenced cast, referenced locations, project aspect ratio, selected Movie Lookbook text when available, and previous shot-list summary.

## Validate And Persist

Create a JSON file that matches `references/scene-shot-list-json-contract.md`.

Validate:

```bash
renku screenplay shot-list validate --file <shot-list-json> --json
```

Write and activate:

```bash
renku screenplay shot-list write --file <shot-list-json> --json
```

Read back:

```bash
renku screenplay shot-list show --active --scene <scene-id> --json
```

Use `renku screenplay shot-list set-active --scene <scene-id> --shot-list <shot-list-id> --json` only when the user wants a previous shot list restored.

## Storyboard Media Handoff

This skill owns shot-list design, not storyboard media generation.

When the user asks for storyboard images:

1. Ensure the target scene has a valid Scene Shot List.
2. If the user means the current storyboard, use the active shot list for the scene.
3. If the user named a specific shot list, use that `shotListId`.
4. Hand off to `media-producer` with purpose `scene.storyboard-sheet`, target `scene:<scene-id>`, and the chosen `shotListId`.

The media-producer skill owns checking the selected Storyboard Lookbook, ensuring its `lookbook.sheet` dependency exists, choosing supported routes, drafting prompts, slicing outputs, and importing storyboard images.

Do not choose media models, create generation specs, write storyboard prompts,
slice images, or import storyboard files in this skill.

## Reference Files

- Read `references/shot-list-cli-workflow.md` for command order and report handling.
- Read `references/scene-shot-list-json-contract.md` before writing JSON.
- Read `references/shot-design-guidelines.md` before designing or revising coverage.
- Use `samples/scene-shot-list.json` as a structural example only.

## Non-Negotiables

- Do not write directly to `.renku/project.sqlite`.
- Do not mutate the screenplay scene while designing shots.
- Do not invent scene, cast, location, shot-list, or shot ids.
- Do not store generated image paths or take-owned shot design values in Scene Shot List JSON.
- Do not add setup minutes, equipment checkout, crew assignments, call-sheet timing, company moves, or other analog shooting logistics.
- Use the project aspect ratio by default. Write shot-level `aspectRatio` only for a deliberate effect.
- Validate before write.
- Use the selected Movie Lookbook when present unless the user overrides it.
- If storyboard media is requested, hand off after a shot list exists. Do not store generated image paths or take-owned shot design values in Scene Shot List JSON.
