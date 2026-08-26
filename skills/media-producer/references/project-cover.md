# Project Cover

Use `project.cover` with target `project` for retained Project Cover candidates
shown in Project Details and for the one selected image displayed in the
Project Library and Studio sidebar.

Begin with `renku generation context --purpose project.cover --target project
--json`. Read Project story facts from `project`, the Production Lookbook from
`visualLanguage`, the current review/execution policy from `workflowPolicy`, and
the advisory 16:9/quality suggestion from `outputGuidance`.

## Gather context progressively

Start with the conversation. Identify the requested subject, emotion, degree
of abstraction, typography preference, and whether the cover should match the
Project's established final-film look. The context deliberately does not
enumerate every Project subject for this broad target or automatically choose
visual references.

Read only what the agreed direction still needs:

- use the returned Project facts for title, logline, premise, genre, and tone;
- use the Production Lookbook when the cover should match the established
  final-image visual language, then inspect only exact useful Lookbook media;
- use exact Cast, Location, or Prop facts and owner-scoped media only for named
  subjects in the agreed cover;
- read a Scene or active Screenplay Analysis only when the request is anchored
  to that material;
- use the Storyboard Lookbook only when the user explicitly asks for a
  storyboard, previs, sketch-board, or related drawn treatment.

Stop once the request can be authored. Do not load all Project media, both
Lookbooks, the complete screenplay, or every Cast Member, Location, and Prop by
default. Project Info supplies story framing, not visual evidence. A Production
Lookbook reference may own palette, lighting, texture, and finish; exact
subject references own identity, design, and geography.

## Author and review

Create one explicit temporary review request for each proposed variation.
Include only the exact references deliberately selected for that variation and
place them only in matching native media fields exposed by the chosen route.
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
  --provenance <provenance-json> \
  --json
```

Use the same `--provenance` contract for a Codex request. Omit it
for an external file. Add `--select` only when the user explicitly chooses that
candidate as the active cover. Retained alternatives stay available in
**Project Details → Covers**; selecting one does not discard the others.
