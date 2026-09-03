# Conversion manifest

The conversion manifest is reviewed screenplay structure, not raw extraction
output. Save it as UTF-8 JSON.

## Shape

```json
{
  "document": {
    "title": "Example Title",
    "credit": "written by",
    "authors": ["Example Writer"],
    "additionalCredits": ["directed by Example Director"],
    "draft": "Final draft",
    "source": "https://example.com/official-script-page",
    "rights": [
      "Original license and attribution statement",
      "FDX format conversion; screenplay text unchanged"
    ]
  },
  "paragraphs": [
    {
      "type": "Scene Heading",
      "number": "1",
      "text": "EXT. EXAMPLE STREET - DAY",
      "source": { "page": 1, "lines": [4] }
    },
    {
      "type": "Action",
      "text": "A cyclist rounds the corner.",
      "source": { "page": 1, "lines": [5, 6] }
    },
    {
      "type": "Character",
      "text": "MARA"
    },
    {
      "type": "Dialogue",
      "text": "Wait for me."
    }
  ],
  "reviewNotes": []
}
```

`source` on a paragraph is optional QA provenance. It is not written into the
FDX. `reviewNotes` is also QA-only. Resolve or explicitly report every entry
before delivery.

## Document fields

- `title`: required non-empty string.
- `credit`: optional string such as `written by` or `screenplay by`.
- `authors`: required non-empty array of non-empty strings.
- `additionalCredits`: optional array for source-page credits that should not be
  discarded, such as a director credit printed with the screenplay.
- `draft`: optional draft label.
- `source`: optional public source URL or source description.
- `rights`: optional array of attribution or license lines. Preserve the
  source's actual statement; do not infer a license.

The builder places these fields on a simple centered title page. The title page
is deliberately separate from screenplay `Content`, so Renku will retain it in
the source without treating it as a Scene or Block.

## Paragraphs

Each paragraph requires `type` and non-empty `text`. Supported types are:

- `Scene Heading`
- `Action`
- `Character`
- `Parenthetical`
- `Dialogue`
- `Transition`
- `Shot`
- `General`
- `Lyrics`
- `New Act`
- `End of Act`
- `Sequence`

Only `Scene Heading` accepts an optional non-empty `number`. Preserve the
authored value exactly, including suffixes such as `12A`. Do not generate
numbers for unnumbered scenes.

Do not put PDF line wrapping into `text`. A paragraph that appears as three
lines on the PDF should normally be one string with ordinary spaces. Preserve
intentional line breaks only when their presentation is part of the authored
content.

## Dual dialogue

For unmistakably simultaneous dialogue, use a `dualDialogue` entry in place of
`type` and `text`:

```json
{
  "dualDialogue": [
    [
      { "type": "Character", "text": "MARA" },
      { "type": "Dialogue", "text": "Left side." }
    ],
    [
      { "type": "Character", "text": "ELIAS" },
      { "type": "Dialogue", "text": "Right side." }
    ]
  ]
}
```

Each side must begin with `Character` and may then contain `Parenthetical` and
`Dialogue` paragraphs only.

## Review notes

Use concise notes containing enough source location and uncertainty to verify:

```json
{
  "page": 4,
  "lines": [17, 18],
  "issue": "Could be a Shot rather than Action",
  "resolution": null
}
```

A note with `resolution: null` remains unresolved. The validator warns about
it; the final report must disclose it if the source does not settle the issue.
