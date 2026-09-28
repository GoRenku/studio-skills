# Screenplay JSON Workflow

Use this reference for command order and validation when creating or revising Renku Studio screenplay data.

## Efficient Command Use

Screenplay commands support `--project <project-name>`; prefer it for a known project. Reuse selection after create or a verified current-project-only handoff instead of reopening. Apply existing operation documents for related changes; one apply validates the complete aggregate. Import reports establish outcome, but retain exact source-backed Screenplay reads and plan 0210 immediate pre-enrichment reads plus result verification. Refresh context after intervening edits or user review.

Consult the relevant CLI reference/help once if syntax is unknown, then reuse verified syntax for this task. Do not discover syntax by attempting mutations. Do not invent `project list`. If a known permission denial blocks cache/output/config or local-network access, explain the requirement and use the authorized host permission flow; do not repeat the denied attempt, read secrets, disable cache persistence, or change permissions. `CLI026` means the mutation succeeded: report the notification warning without replaying the mutation.

## Current Project

Use the known Project name explicitly. Read current selection only if identity
is missing; otherwise proceed directly to targeted screenplay status.

```bash
renku project current --json
renku screenplay status --project <project-name> --json
```

Only for a downstream current-authoring-only command whose selection has not
yet been established:

```bash
renku project open <project-name> --json
```

For a new project, create it first:

```bash
renku create <project-name> --title <title> --json
```

`renku create` opens the new project as the current authoring project.

## Required Fact Preflight

Before Screenplay create/apply, make sure referenced Cast Members, Locations,
and Props exist:

```bash
renku cast list --json
renku location list --json
renku prop list --json
```

Create or revise missing facts through the owning command families:

```bash
# Optional validation-only or review step:
renku cast validate --file tmp/operations/cast-operations.json --json
renku cast apply --file tmp/operations/cast-operations.json --json
# Optional validation-only or review step:
renku location validate --file tmp/operations/location-operations.json --json
renku location apply --file tmp/operations/location-operations.json --json
# Optional validation-only or review step:
renku prop validate --file tmp/operations/prop-operations.json --json
renku prop apply --file tmp/operations/prop-operations.json --json
```

Then use durable subject ids in separate Screenplay references. Keep the exact
authored screenplay text free of `@handle` tokens.

For FDX import, reverse the order: import the deterministic screenplay first,
then use its candidate evidence alongside existing facts. Do not pre-create
facts by guessing from cue or heading strings.

## Import Final Draft FDX

Use when Screenplay status is entirely empty or `sourceOwnership` is `fdx`:

```bash
renku screenplay import-fdx --file /absolute/path/to/script.fdx --project <project-name> --json
```

After `imported`, `refreshed`, or `unchanged`, let the agent read the canonical
Screenplay and current Project Information before writing any story metadata:

```bash
renku screenplay show --project <project-name> --json
renku info show --project <project-name> --json
```

Follow the field-by-field preservation and full-script reading rules in
`../SKILL.md`. For a large readback, save the JSON under `tmp/scratch/` and
inspect it in bounded portions. Re-read `info show` immediately before a
write, then make at most one `info set` call with only missing or clearly
temporary fields. For example, set just a missing logline, or combine
qualifying fields in the same command:

```bash
renku info set --project <project-name> --logline <drafted-logline> --json
renku info set --project <project-name> --logline <drafted-logline> --synopsis <drafted-synopsis> --premise <drafted-premise> --json
renku info show --project <project-name> --json
```

The two `info set` lines illustrate alternatives, not consecutive writes. Add
`--title <source-title>` only when the current title is clearly temporary and
the supplied FDX states an unambiguous title. Do not set aspect ratio or
Project language. Skip `info set` entirely when all existing fields are
substantive. An `unchanged` import may finish missing Project Information, but
does not repeat Screenplay or fact mutations. If the Project Information write
reports an error after import, read back Project Information to determine
whether the write persisted, then retry only fields still qualifying.
No Project Information write follows a failed import.

The JSON report returns `imported`, `refreshed`, or `unchanged`, exact source
provenance, counts, character-cue and Scene-heading candidates, and optional
tagged-subject evidence. It creates no Cast Member, Location, Prop, or
Screenplay reference. After `imported` or `refreshed`, return this evidence to
`movie-director`, which consumes `projectSettings.screenplayImport`, resolves
ambiguous identity with the user, and dispatches only enabled follow-up stages.
The coordinator may use accepted evidence for Project fact work, but do not add
Screenplay references after import. FDX ownership blocks every generic
`screenplay apply` operation, including `reference.*`.

An explicitly requested CLI import refreshes immediately, without a review
token. Detected Studio updates require review instead. A refresh mirrors the
source and is not a merge.
Every FDX projection is a flat source-ordered Scene list. Do not turn Final
Draft New Act, End of Act, Sequence, Summary, Outline, Note, ScriptNote, marker
text, or editor lanes into Renku Acts or Sequences. Do not describe formatting
or editor state as warnings.

## Create A First Screenplay

Use this path only when Screenplay status reports zero opening elements,
Sections, Scenes, Blocks, and references. Author the complete `opening`,
`scenes`, `sections`, `structure`, and `references` object without a `kind`.

```bash
renku screenplay create --file tmp/operations/screenplay-create.json --project <project-name> --json
```

## Revise An Existing Screenplay

Use this path whenever Screenplay status reports any authored content.
It is available only when `sourceOwnership` is `renku`; FDX-backed Screenplays
are source-owned and read-only.
Read the current canonical state first:

```bash
renku screenplay show --project <project-name> --json
```

Use durable IDs from that output in update, delete, move, parent, placement,
and reference fields. Use request-local keys only for new values in the same
atomic request.

When the user names a production scene number, resolve it first:

```bash
renku screenplay scene-number resolve --number <production-number> --project <project-name> --json
```

Carry only the returned durable `sceneId` into persisted screenplay JSON.

```bash
renku screenplay apply --file tmp/operations/screenplay-operations.json --project <project-name> --json
```

There is no separate validate or dry-run command for Screenplay operations.
`apply` validates the complete batch atomically and writes nothing on failure.

## Read Helpers

```bash
renku screenplay status --project <project-name> --json
renku screenplay show --project <project-name> --json
renku cast list --json
renku cast show <cast-member-id> --json
renku location list --json
renku location show <location-id> --json
renku prop list --json
renku screenplay structure --project <project-name> --json
renku screenplay section show <section-id> --project <project-name> --json
renku screenplay scene show <scene-id> --project <project-name> --json
renku screenplay scene-number list --project <project-name> --json
renku screenplay scene-number resolve --number <production-number> --project <project-name> --json
```

## Handling Reports

Successful mutation reports include `valid`, `warnings`,
`screenplayRevisionId`, `generatedIdentities`, and `resourceKeys`. Warnings do
not block the command. Errors block the command and are written as structured
diagnostics.

## External Export And Reviewed Update

For a detected Studio update, have the user export to the exact path displayed
by **External screenplay**: `<projectFolder>/screenplay/edit/script.fdx`.
Never write or overwrite a retained `screenplay_source` Asset. Studio detects
stable changed bytes and requires review plus **Update screenplay**; **Later**
leaves the accepted screenplay unchanged. Do not automatically run CLI import
to bypass that pending review. A user-explicit manual `import-fdx` request still
imports immediately and has no approval token.

Even a one-character dialogue edit can replace the whole Scene graph. Existing
Beats, Shot Plans, Shots, and audio remain in history attached to old Scene IDs;
do not promise continuity, infer replacements, or repair creative artifacts.
