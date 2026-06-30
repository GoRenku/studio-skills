---
name: scene-shot-designer
description: Design and persist Renku Studio Scene Shot Lists by reading scene screenplay context, referenced cast and locations, selected Movie Lookbook guidance, and user direction.
---

# Scene Shot Designer

Use this skill to design durable Scene Shot Lists for individual Renku Studio screenplay scenes.

A Scene Shot List is a scene-owned coverage plan. It is not the final edit timeline and not a place for generated image paths. It records the shots the scene needs, why each shot exists, what story material it covers, and how it should feel visually.

## Start Here

1. Resolve the current Renku project and target scene. If the user says "current", "selected", or points at Studio, run `renku studio current --json` and use the returned scene context instead of guessing from prose.
2. Read shot-list context with the Renku CLI.
3. Decide whether the user wants brainstorming only, a first saved shot list, an extension/revision of an existing shot list, a restore of an older active row, or storyboard maintenance.
4. Translate user direction and selected Movie Lookbook guidance into concrete framing, movement, blocking, light, texture, subject, and editorial coverage choices.
5. For a scene with no active shot list, write a complete `kind: "sceneShotList"` JSON document when the user wants project state saved. For revisions or extensions of an existing shot list, use `kind: "sceneShotListOperations"` against an explicit `baseShotListId`. Use a full replacement document over an existing list only when intentionally replacing the full list, and include `baseShotListId` so unchanged storyboard links can be preserved.
6. Validate through the Renku CLI.
7. Write or apply through the Renku CLI.
8. Read back the active shot list and storyboard status for the created or active shot-list id.
9. If saved changes leave missing or stale storyboard images and the user did not ask for text-only shot work, continue with a `media-producer` handoff instead of stopping at the status report.

Ask only when a missing creative choice materially changes the coverage strategy. If the user wants momentum, make a clear assumption and proceed.

## Codex Sandbox And Studio Notifications

Shot-list writes and applies should refresh the open Studio UI through the local Studio HTTP notification endpoint. In Codex, `localhost`/`127.0.0.1` HTTP is network access, so request sandbox/network permission before the first mutating Renku command when Studio is running. This applies to `renku screenplay shot-list write`, `renku screenplay shot-list apply`, `renku screenplay shot-list set-active`, and storyboard imports triggered by this workflow.

If a command prints `CLI026`, the project mutation has already succeeded but the Studio notification did not. Do not rerun the mutation just to notify Studio; that can create duplicate shot-list rows or duplicate media. Read back durable state, then use a separate notification/recovery step with local network permission if available, or tell the user Studio needs a refresh.

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

Storyboard maintenance is part of saved shot-list revision work unless the user explicitly asks for text-only/no-media output:

1. Ensure the target scene has a valid Scene Shot List.
2. If the user means the current storyboard, use the active shot list for the scene.
3. If the user named a specific shot list, use that `shotListId`.
4. After a saved write/apply, read `renku screenplay shot-list storyboard status --scene <scene-id> --shot-list <shot-list-id> --json`.
5. If any selected or changed shots are missing or stale, hand off to `media-producer` with purpose `scene.storyboard-sheet`, target `scene:<scene-id>`, and the chosen `shotListId`.

The media-producer skill owns checking the selected Storyboard Lookbook, ensuring its `lookbook.sheet` dependency exists, choosing supported routes, drafting prompts, slicing outputs, and importing storyboard images.

This skill does not handle `shot.video-prompt-sheet` for an existing Shot Video Take. If the user says "multi-shot storyboard" while focused on, or referring to, a take, route that work to `media-producer` with purpose `shot.video-prompt-sheet` and target `take:<take-id>`.

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
- After saved shot-list revisions, read storyboard status and hand off missing or stale storyboard images unless the user explicitly asked for text-only/no-media output. Do not store generated image paths or take-owned shot design values in Scene Shot List JSON.
