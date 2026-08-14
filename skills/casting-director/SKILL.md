---
name: casting-director
description: Create and revise Renku Studio Cast Members, Cast Design documents, costume continuity, voice casting notes, and cast media handoffs. Use when the user asks for casting, character appearance, performance direction, wardrobe/costume variants, voice identity, cast readiness, or character-sheet/profile preparation.
---

# Casting Director

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


Use this skill for Renku Studio casting work. It owns Cast Member facts, Cast Design documents, and Cast Voice attachments, then hands actual media generation to `media-producer`.

Do not route Cast Member changes through screenplay operations. The canonical mutation path is `renku cast`.

## Start Here

1. Resolve the current project:

```bash
renku project current --json
```

If a costume or continuity request is scoped to a production reference such as
`Scene 22` or `22A`, resolve it before authoring Cast Design:

```bash
renku screenplay scene-number resolve --number <production-number> --json
```

Use the returned durable `sceneId` in the costume scope. Do not add a duplicate
production-number field to Cast Design JSON.

2. For a specific Cast Member, read department context:

```bash
renku cast design context --cast <cast-member-id> --json
```

3. If the Cast Member fact itself needs to change, validate and apply a `kind: "castOperations"` document:

```bash
renku cast validate --file tmp/operations/cast-operations.json --json
renku cast apply --file tmp/operations/cast-operations.json --dry-run --json
renku cast apply --file tmp/operations/cast-operations.json --json
```

When this work follows FDX import, compare each exact character-cue candidate
and Dialogue Turn id with existing Cast facts. Ask the user before treating
aliases such as `YOUNG MARA` and `MARA` as one person. Create/update the accepted
Cast facts through `renku cast`, then hand their durable ids back for focused
Screenplay speaker references. Never make the importer own that judgment.

4. If interpretation, appearance, performance, costume, voice casting, continuity, or generation guidance needs to change, validate and write a `kind: "castDesign"` document:

```bash
renku cast design validate --file tmp/operations/cast-design.json --json
renku cast design write --file tmp/operations/cast-design.json --json
```

5. If a durable ElevenLabs provider voice id and sample audio are ready, validate and attach the right Cast Voice document:

```bash
renku cast voice validate --file tmp/operations/cast-voice-attachment.json --json
renku cast voice attach --file tmp/operations/cast-voice-attachment.json --json
renku cast voice list --cast <cast-member-id> --json
```

Use `kind: "castVoiceAttachment"` when the user provides or approves a
project-local custom audio file, including an already generated sample file.
Use `kind: "castVoiceElevenLabsSampleAttachment"` when the user provides an
ElevenLabs `voiceId` and wants Renku to fetch an existing provider-owned sample.
Provider sample attachment documents must include `name`, `provider`, `model`,
`voiceId`, `purpose`, and `sample.title`; they must not include
`sample.sourceProjectRelativePath` or `sample.receipt`.

Example provider sample attachment:

```json
{
  "kind": "castVoiceElevenLabsSampleAttachment",
  "castMemberId": "cast_urban",
  "name": "normal-voice",
  "provider": "elevenlabs",
  "model": "eleven_v3",
  "voiceId": "JBFqnCBsd6RMkjVDRZzb",
  "purpose": "Default spoken dialogue and calm technical explanation.",
  "sample": {
    "title": "Urban normal ElevenLabs voice sample"
  }
}
```

Validate before live attachment. When the environment requires network
approval, ask before running `renku cast voice attach` for an ElevenLabs provider
sample because that command calls ElevenLabs and attaches the fetched MP3 to
the Cast Member. Core allocates the durable filename directly under
`cast/<handle>/`; never construct that path in the skill.

6. Hand off character-sheet/profile/voice-sample generation to `media-producer` only when the user wants media work.

## Reference Files

- Read `references/cast-authoring.md` for Cast Member fact commands and operation JSON.
- Read `references/cast-design.md` before writing Cast Design JSON.
- Read `references/cast-media-handoff.md` before asking `media-producer` for character sheets, profiles, or voice samples.
- Read `references/voice-casting.md` when the request involves voice, accent, tempo, texture, or localization notes.
- Read `references/cast-voice-attachments.md` before attaching durable ElevenLabs provider voice ids or sample audio.

## Boundaries

- Cast Design can describe costume variants, but costume-variant media is not first-class yet.
- Cast Design can describe voice casting and locale notes, but durable ElevenLabs provider voice ids and sample audio belong in Cast Voice records. Kling `voice_id` values are transient shot-video run artifacts.
- Generated files, asset ids, durable provider voice ids, transient Kling `voice_id` values, and media paths do not belong in Cast Design JSON.
- When casting changes affect Scene Beats, report the need for a `scene-beat-designer` pass instead of editing Scene Beats revisions directly.
- FDX cue candidates are evidence only. Do not infer identity from spelling
  alone and do not report ScriptNotes or formatting exclusions.
