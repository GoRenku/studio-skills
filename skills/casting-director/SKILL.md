---
name: casting-director
description: Create and revise Renku Studio Cast Members, Cast Design documents, Looks (ages and physique changes), casting rounds, wardrobe plans, voice casting notes, and cast media handoffs. Use when the user asks for casting, auditioning or casting a Look, character appearance, ages, performance direction, costumes and wardrobe, character sheets per costume, voice identity, or cast readiness. For media generation from an existing Cast Design, use media-producer.
---

# Casting Director

## Renku Cloud

When the Renku tools (`renku_command`, `renku_upload`, `renku_download`,
`renku_view`, `renku_guide`) are present, Renku runs in the person's cloud
sandbox. This section then applies and takes precedence over any instruction
below to stop when `renku` is unavailable.

- Run the `renku ...` commands a step needs as one `renku_command` batch:
  `{"commands": [{"args": ["cast", "list", "--json"]}], "onFailure": "stop"}`.
  There is no shell, so no pipes, redirects or `$(...)`. A command that needs
  an id from an earlier answer goes in a second batch.
- Your workbench is on your computer: the documents you write, saved answers
  and notes. Send a document a command reads in that command's `files`, keyed
  by the `tmp/` path the command names.
- An answer over 100,000 characters, or any answer when `saveAnswers` is true,
  comes back as a download link. Fetch it with `curl` and read it with jq,
  sed or a script on your computer.
- Files go up in one `renku_upload` call; use the path each upload reports.
  Library files come down in one `renku_download` call. `renku_view` gives
  quick looks at images; download an original to judge fine detail.
- Read this skill's own files from the installed plugin. The permission
  steps below do not apply to Renku commands.

For casting:

- Read the screenplay as text with `screenplay show --text`, adding
  `--scenes <a-b>` or `--character <NAME>` for part of it.
- Download every supporting file's `projectRelativePath` in one
  `renku_download` call and read them on your computer.
- Voice samples: upload the person's audio file; `media-producer` uploads a
  sample made through ElevenLabs' MCP server. Attach either as a
  `castVoiceFileAttachment` with the uploaded path as
  `sample.sourceProjectRelativePath`, and leave out
  `sample.generationProvenance`; never write one. The person listens through
  `renku_download` links or in Studio.
- A portrait the person gives you goes up with `renku_upload`; hand it to
  `media-producer` as a `project-file` reference to the uploaded path.
- Casting panels open only in the Codex desktop app, with the round panel's
  `defaultModelList` set to `skill:media-producer/references/default-models.json`.
  They offer the providers the person's AI app reaches, with no keys in
  Renku. Claude Code and the Codex CLI use the chat steps.
  `generation estimate` and `generation price record` work without keys.
- When the director keeps the saved casting defaults,
  `cast casting round create --look <look-id>` (or `--costume <costume-id>`)
  builds the round without a document.
- `media-producer` runs the candidates through the provider's MCP server, at
  most the round's `maxConcurrentGenerations` at once. As they finish it
  brings them in with one upload and one `media import` list carrying each
  candidate's `job` and `receipt`, so the board fills in during the round.
  Codex built-in images exist only in Codex.
- Repeat `--asset-file` to set several candidate statuses in one command.

This skill requires the installed Renku runtime. If `renku` is unavailable, stop and direct the user to `https://gorenku.com`; do not substitute ad hoc files for the CLI-owned project state.

## Efficient Command Use

Cast facts, Cast Design and Cast Voice commands act on the project named by --project, or on the current authoring project when --project is omitted. Use one castOperations document for related edits and retain a meaningful dry run when reviewing changes. Apply and design write validate before persistence; a separate validate is for validation-only intent or a review pause. Use returned changes and identities for confirmation, reading again only for missing detail. Keep the immediate pre-enrichment source/fact reads and post-enrichment verification.

Consult the relevant CLI reference/help once if syntax is unknown, then reuse verified syntax for this task. Do not discover syntax by attempting mutations. Do not invent `project list`. If a known permission denial blocks cache/output/config or local-network access, explain the requirement and use the authorized host permission flow; do not repeat the denied attempt, read secrets, disable cache persistence, or change permissions. `CLI026` means the mutation succeeded: report the notification warning without replaying the mutation.

## Project Workspace

Keep every agent-created working file inside the current Project's categorized
`tmp/` tree. Never create operation JSON, Generation Specs, import manifests,
QA images, downloads, crops, or scratch files at the Project root.

- Use `tmp/operations/` for CLI authoring documents, including create, update,
  design, analysis, Lookbook, Scene Beats, Shot Plan, and import JSON.
- Use `tmp/operations/media-generation/` for Media Producer review and
  provenance documents.
- Use `tmp/media/` for temporary generated, downloaded, transformed, or cropped
  media; use `tmp/qa/` for review evidence and `tmp/scratch/` for other temporary
  inputs.
- Create category folders lazily. Let Renku commands copy accepted content into
  durable owner folders; never construct durable asset paths in the skill.
- Keep an external user source outside the Project when possible. If a temporary
  in-Project copy is necessary, place it under `tmp/scratch/`.


Use this skill for Renku Studio casting work. It owns Cast Member facts, Cast Design documents, Looks, casting rounds, wardrobe plans, and Cast Voice attachments, then hands actual media generation to `media-producer`.

Do not route Cast Member changes through screenplay operations. The canonical mutation path is `renku cast`.

## Start Here

For a media-only request using existing Cast facts and design, go directly to
`media-producer`. Its generation briefing already contains those facts; skip
the authoring-context reads below unless the task also needs Cast changes.

1. Reuse the verified current authoring project. Read it only when missing or changed:

```bash
renku project current --json
```

If a Look, costume or continuity request is scoped to a production reference
such as `Scene 22` or `22A`, resolve it before authoring:

```bash
renku screenplay scene-number resolve --number <production-number> --project <project-name> --json
```

Use the returned durable `sceneId` in the Looks or wardrobe plan. Do not add a
production-number field to any casting document.

2. For Cast fact or design work on a specific Cast Member, read department context:

```bash
renku cast design context --cast <cast-member-id> --json
```

Before creating Cast facts, or when the user explicitly asks to refresh them
after another import, also read the complete canonical Screenplay and every
active source before authoring:

```bash
renku screenplay show --project <project-name> --json
renku asset list --project <project-name> --owner project --type screenplay_supporting_material --limit 200 --json
```

Follow `nextCursor` with repeated `--cursor <nextCursor>` calls until it is
`null`; combine every page before authoring.

Resolve each returned file below the current Project's `projectFolder` and use
the harness reader appropriate to its actual contents. Use the combined
evidence to write each Cast Member's `description` into its named sections
and to refine `want`, `need`, `arc` and `voiceNotes`; see the field and
section tables in `references/cast-authoring.md`. Read current facts first, preserve ambiguous identity as a user
question, and do not run this enrichment automatically when a file is imported.

3. If the Cast Member fact itself needs to change, apply a `kind: "castOperations"` document:

```bash
# Optional validation-only or review step:
renku cast validate --file tmp/operations/cast-operations.json --json
renku cast apply --file tmp/operations/cast-operations.json --dry-run --json
renku cast apply --file tmp/operations/cast-operations.json --json
```

Before creating cast from any screenplay, group its character cues by story
person using the complete script and existing Cast facts. `YOUNG MARA` and
`MARA` are one Cast Member when the script establishes that identity; their
ages become Looks. Reuse an existing Cast Member rather than adding another
for a new cue, age, nickname, title, or voice-over appearance. Ask only when
identity is unresolved; do not create provisional duplicates. Create or
update accepted facts through `renku cast`. Preserve FDX cues and source
ownership; do not bind references into an FDX-backed Screenplay. See
`references/cast-authoring.md` for the authoring workflow.

4. If interpretation, appearance, performance, base wardrobe logic, voice casting, continuity, or generation guidance needs to change, write a `kind: "castDesign"` document:

```bash
renku cast design validate --file tmp/operations/cast-design.json --json
renku cast design write --file tmp/operations/cast-design.json --json
```

5. If the sample audio is in the Project, with its durable ElevenLabs provider voice id when it has one, validate and attach a Cast Voice document:

```bash
renku cast voice validate --file tmp/operations/cast-voice-attachment.json --json
renku cast voice attach --file tmp/operations/cast-voice-attachment.json --json
renku cast voice list --cast <cast-member-id> --json
```

Every Cast Voice uses `kind: "castVoiceFileAttachment"`, whose
`sample.sourceProjectRelativePath` names an `.mp3`, `.wav` or `.m4a` file
already in the Project: a custom audio file the user provides or approves, or
a sample `media-producer` generated. Renku never fetches a sample itself. For
an existing ElevenLabs voice, ask `media-producer` for its sample through the
ElevenLabs voice-sample route, then attach that file with the voice's exact
identity in `voiceIdentity`. A Seed Audio sample omits `voiceIdentity`.
Include `sample.generationProvenance` only as `media-producer` returned it.

Example ElevenLabs attachment:

```json
{
  "kind": "castVoiceFileAttachment",
  "castMemberId": "cast_urban",
  "name": "normal-voice",
  "purpose": "Default spoken dialogue and calm technical explanation.",
  "voiceIdentity": {
    "provider": "elevenlabs",
    "voiceId": "JBFqnCBsd6RMkjVDRZzb"
  },
  "sample": {
    "sourceProjectRelativePath": "tmp/media/urban-normal-voice.mp3",
    "title": "Urban normal ElevenLabs voice sample"
  }
}
```

Validate before attachment. Core stores the sample in a durable file directly
under `cast/<handle>/`; never construct that path in the skill. See
`references/cast-voice-attachments.md` and `samples/cast-voice-attachment.json`.

6. Hand off profile and voice-sample generation to `media-producer` only when the user wants media work. Character sheets follow the casting flow below.

## One Person, One Cast Member

The same person is one Cast Member at every age. Ages and big physique
changes are Looks of that Cast Member, each covering a list of Scenes;
costumes are not Looks. Resolve identity before creating Cast Members, not
after creating one per cue. For example, Big Fish's Young Edward Bloom and
Edward Bloom belong to one Edward Bloom Cast Member with age-specific Looks.
If existing facts already duplicate a person, report the affected identities
and dependencies for a separate data correction; do not delete them as part
of routine cast creation. See `references/looks.md`.

## Casting Flow

Casting happens before character sheets. Work one Cast Member at a time:

1. **Looks.** Agree the Looks and their Scenes, then
   `renku cast looks validate|write --file tmp/operations/cast-looks-plan.json`
   (`references/looks.md`).
2. **Casting round per Look.** The director picks models, counts and the
   image detail level (preset from `candidateDetail`) and sees the estimate;
   that one confirmation covers every candidate of the round. The round
   prices every offered model/provider at each detail level itself; no
   requests are prepared before showing it (`references/casting-rounds.md`).
   Then `renku cast casting round create --file tmp/operations/casting-round.json`, and
   `media-producer` generates the candidates in parallel with purpose
   `cast.casting-candidate` at the round's detail level, importing each as it
   lands (`references/casting-rounds.md`).
3. **Hide and cast.** The director hides the candidates they don't want and
   casts one for the Look (`renku asset select --target look:<look-id>`).
   "More like these" is a new round with every kept (not hidden) candidate as
   references. A later Look uses the earlier Look's cast candidate as its
   identity reference.
4. **Wardrobe plan.** Costumes per Look with their Scenes, then
   `renku cast wardrobe validate|write --file tmp/operations/cast-wardrobe-plan.json`
   (`references/wardrobe-plan.md`).
5. **Character sheet rounds per costume.** A round confirmation covers some
   or all costumes of a cast Look; each costume gets a round, `media-producer`
   makes `cast.character-sheet` with target `casting-round:<round-id>` from
   the Look's cast candidate at `characterSheetDetail`, and the director
   picks one sheet per costume (`references/cast-media-handoff.md`).

Project casting defaults (`candidateRoutes` and `candidateDetail` for casting
rounds, `characterSheetRoutes` and `characterSheetDetail` for character sheet
rounds) are
`renku settings casting show|set --file tmp/operations/casting-settings.json`. Prices always come
from Renku estimates.

**Panels or chat.** In trusted Codex Desktop whose
`generation.review.capabilities` probe advertises panel support, use the
casting panels: `casting.wardrobe.open` for Looks and costumes,
`casting.round.open` for a round, and `casting.board.open` for candidates and
sheet picks. Open one, end the turn, and consume its result once; the
candidates board is opened while candidates generate and the turn ends after
the last import. Panels only
show and collect choices; the agent writes Looks and wardrobe plans with the
CLI. `casting.round.consume` returns the round's `detail` with its routes;
pass it to `media-producer` for the candidates. In Claude Code and every
other host, set rounds and plans up as chat text, take the user's reply as
the confirmation, and point the user to the Cast Member's **Casting** tab in
Studio to hide, compare, cast and pick sheets. A chat round uses
`candidateDetail` unless the user changes it for that round, and prices each
route with `renku generation estimate --detail <level>`.

## Reference Files

- Read `references/cast-authoring.md` for Cast Member fact commands and operation JSON.
- Read `references/cast-design.md` before writing Cast Design JSON.
- Read `references/looks.md` before proposing Looks or resolving age variants.
- Read `references/casting-rounds.md` before setting up or running a casting round.
- Read `references/wardrobe-plan.md` before writing costumes.
- Read `references/cast-media-handoff.md` before asking `media-producer` for casting candidates, character sheets, profiles, or voice samples.
- Read `references/voice-casting.md` when the request involves voice, accent, tempo, texture, or localization notes.
- Read `references/cast-voice-attachments.md` before attaching durable ElevenLabs provider voice ids or sample audio.

## Boundaries

- Costumes live in the wardrobe plan and ages live in Looks, never in Cast Design. Cast Design keeps only `costume.baseWardrobeLogic`.
- Casting candidate images and briefs are opaque: judge them with the user, never through Renku validation.
- Cast Design can describe voice casting and locale notes, but durable ElevenLabs provider voice ids and sample audio belong in Cast Voice records. Kling `voice_id` values are transient shot-video run artifacts.
- Generated files, asset ids, durable provider voice ids, transient Kling `voice_id` values, and media paths do not belong in Cast Design JSON.
- When casting changes affect Scene Beats, report the need for a `scene-beat-designer` pass instead of editing Scene Beats revisions directly.
- FDX cue candidates are evidence only. Do not infer identity from spelling
  alone and do not report ScriptNotes or formatting exclusions.
- Supporting material is import-only context for fact/design authoring. Never
  include its file paths or copied contents in Character Sheet, Cast Profile,
  voice, Media Producer, Scene Beats, Shot Plan, or Screenplay Analysis handoffs;
  those workflows consume the durable Cast Member and Cast Design descriptions.
