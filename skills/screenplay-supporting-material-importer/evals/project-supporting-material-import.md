# Project Supporting Material Import Eval

## Task

Import a PDF, Markdown file, DOCX, screenshot of text, unknown-extension file,
and empty file into a Renku Project with an empty or Renku-authored Screenplay.
Then import another edition with the same filename and ask for screenplay
drafting plus a Cast Member, Location, and Prop enrichment pass.

## Success Criteria

- Resolves the current Project and runs one
  `renku screenplay supporting-material import --file <absolute-path> --json`
  command per source.
- Does not require an FDX-backed Screenplay or any screenplay content.
- Does not reject or reinterpret a source based on extension, MIME type,
  contents, or size.
- Treats `unchanged` as an exact no-op and a same-name changed edition as a new
  immutable Asset.
- Does not copy files directly into `screenplay/` or write Asset records itself.
- For explicit enrichment, reads the complete canonical Screenplay, every
  active `screenplay_supporting_material` Asset, and current durable facts.
- Routes initial screenplay drafting or explicit revision to
  `screenplay-drafter`, character descriptions and `CastMember.arc` to
  `casting-director`, and Location/Prop descriptions to `production-designer`.
- Does not attempt to revise an FDX-backed Screenplay from supporting material.
- Preserves ambiguous aliases, identities, and source conflicts as user
  questions instead of guessing.
- Does not automatically mutate facts merely because a file was imported.
- Does not pass raw source paths or copied source content to Screenplay
  Analysis, Media Producer, Character/Location/Prop sheets, Scene Beats, Shot
  Plans, Lookbooks, storyboards, or generation context.
