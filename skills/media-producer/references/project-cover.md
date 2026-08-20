# Project Cover

Use `project.cover` with target `project` for retained Project Cover candidates
shown in Project Details and for the one selected image displayed in the
Project Library and Studio sidebar.

```bash
renku generation context --purpose project.cover --target project --json
renku generation model list --purpose project.cover --json
```

Core fixes the output aspect ratio to 16:9 and currently recommends medium
quality and Nano Banana 2 for managed generation. The Project's image-path
setting still chooses Codex by default unless the user explicitly chooses a
path or an existing saved spec already records one. Never override the fixed
aspect ratio.

## Gather context progressively

Start with the conversation. Identify the requested subject, emotion, degree
of abstraction, typography preference, and whether the cover should match the
Project's established final-film look. The Generation Context intentionally
keeps `referenceGuide.sections` empty; it does not send the complete Project or
automatically choose visual references.

Read only what the agreed direction still needs:

- use `renku info show --json` when title, logline, premise, genre, or tone is
  missing;
- use the Production Lookbook when the cover should match the established
  final-image visual language, then inspect only exact useful Lookbook media;
- use exact Cast, Location, or Prop facts and owner-scoped media only for named
  subjects in the agreed cover;
- read a Scene or active Screenplay Analysis only when the request is anchored
  to that material;
- use the Storyboard Lookbook only when the user explicitly asks for a
  storyboard, previs, sketch-board, or related drawn treatment.

Stop once the request can be authored. Never load all Project media, both
Lookbooks, the complete screenplay, or every Cast Member, Location, and Prop by
default. Project Info supplies story framing, not visual evidence. A Production
Lookbook reference may own palette, lighting, texture, and finish; exact
subject references own identity, design, and geography.

## Author and review

Create one explicit GenerationSpec for each proposed variation. Include only
the exact references deliberately selected for that variation and assign a
provider field only when the chosen route exposes a matching media field.
Prompts and generated pixels remain opaque to Studio runtime validation.

Compose for the actual cover surface:

- keep one legible focal hierarchy at Project Library thumbnail size;
- account for intentional edge behavior and safe areas on a 16:9 image;
- keep important faces, symbols, and silhouettes readable at small size;
- treat generated typography as unreliable unless the user explicitly wants
  it, and review any produced text visually rather than assuming correctness.

These are creative review criteria, not mandatory prompt phrases or runtime
validation rules. Follow `image-output-review.md` after generation and make no
automatic retry based on subjective cover quality.

Import each accepted candidate through the focused purpose:

```bash
renku media import \
  --purpose project.cover \
  --target project \
  --source <project-relative-path> \
  --title <human-readable-title> \
  --summary <meaningful-card-summary> \
  --receipt <run-json> \
  --json
```

Use `--source-spec` instead of `--receipt` for a frozen Codex request. Omit both
for an external file. Add `--select` only when the user explicitly chooses that
candidate as the active cover. Retained alternatives stay available in
**Project Details → Covers**; selecting one does not discard the others.
