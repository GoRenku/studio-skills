# Supporting Material Workflow

## Import contract

Run one command per external source file:

```bash
renku screenplay supporting-material import --file <absolute-path> --json
```

Core accepts any readable regular file as opaque bytes. Do not add agent-side
format, extension, MIME, content, or size validation. The result contains the
Project folder, a Project-owned `screenplay_supporting_material` Asset, and one
`source` file under `screenplay/`. `unchanged` means identical bytes were
already registered; do not copy or import them again.

List every active source for an explicit authoring or enrichment pass:

```bash
renku asset list \
  --project <project-name> \
  --owner project \
  --type screenplay_supporting_material \
  --limit 200 \
  --json
```

This command is paginated. If `nextCursor` is not `null`, repeat the same
command with `--cursor <nextCursor>` and accumulate `items` until
`nextCursor` is `null`. Never treat the first page as the complete source set.

Resolve each file by joining `projectFolder` from `renku project current
--json` with its returned `projectRelativePath`. Use the active harness's
appropriate reader for that source: direct text reading, document/PDF reading,
or image vision/OCR. If the harness cannot read one source, identify that exact
file and limitation; do not silently omit it or convert it into a different
durable artifact.

## Authoring handoff

For initial authoring or a user-requested later enrichment pass:

1. Read the complete canonical screenplay with `renku screenplay show --json`.
2. List and read all active supporting-material Assets.
3. Read current screenplay, Cast Member, Location, and Prop facts before
   proposing changes.
4. Preserve uncertain identity and source conflicts as explicit user questions.
5. Send initial screenplay drafting or explicit screenplay revision to
   `screenplay-drafter`. FDX-backed Screenplays remain source-authoritative and
   cannot be revised from supporting material.
6. Send character facts, descriptions, and `CastMember.arc` updates to
   `casting-director`.
7. Send Location/Prop facts and descriptions to `production-designer`.
8. Persist accepted conclusions through their existing CLI commands.

Import alone never starts this pass and never changes a Screenplay, fact, or
design. Later imports are incorporated only when the user explicitly asks to
revise, refresh, or enrich the owning authored values.

## Context cutoff

Once accepted evidence is represented in the canonical Screenplay or durable
Cast Member, Location, Prop, Cast Design, Location Design, or Prop Design
values, downstream skills read those values only. Never attach raw source paths
or source excerpts to a media handoff, generation request, Beat, Shot, Lookbook,
or analysis request. This is the context boundary that prevents the same
information from being supplied twice.
