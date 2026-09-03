---
name: screenplay-pdf-to-fdx
description: Reconstruct a conventionally formatted screenplay PDF as a faithful, editor-ready Final Draft XML (.fdx) file. Use when PDF import loses screenplay structure or produces garbled character, dialogue, action, parenthetical, transition, or scene-heading elements; do not use for adapting prose into a screenplay.
---

# Screenplay PDF to FDX

Convert the screenplay by reconstructing its semantic paragraphs. Treat PDF
text extraction as transcription evidence, not as an authoritative parse.

## Required outcome

Deliver an `.fdx` that:

- preserves the source wording and authored scene numbers;
- represents every screenplay paragraph with the correct Final Draft element;
- excludes page headers, page numbers, and extraction artifacts;
- opens cleanly in an FDX-capable editor; and
- passes the supplied structural validator.

This is a format conversion. Do not rewrite, modernize, summarize, repair story
logic, invent act headings, or silently correct the author's wording. Record
uncertain readings for review instead of guessing.

## Project Workspace

Keep every agent-created working file inside the current Project's categorized
`tmp/` tree. Never create operation JSON, Generation Specs, import manifests,
QA images, downloads, crops, or scratch files at the Project root.

- Use `tmp/operations/` for CLI authoring documents and the reviewed conversion
  manifest.
- Use `tmp/operations/media-generation/` for any later Media Producer review or
  provenance documents; this conversion skill does not create them itself.
- Use `tmp/media/` for temporary generated or transformed media, `tmp/qa/` for
  rendered PDF pages and review evidence, and `tmp/scratch/` for downloads and
  other temporary inputs.
- Create category folders lazily. Keep the downloaded source unchanged.
- Keep an external user source outside the Project when possible. If a temporary
  in-Project copy is necessary, place it under `tmp/scratch/`.
- Write the final `.fdx` to the user's requested location. Otherwise use
  `<source-name>-converted.fdx` beside the source. Never overwrite an existing
  output unless the user explicitly requested it.

## Workflow

1. Confirm that the input is a screenplay PDF and establish the requested
   output path. If it is scans rather than embedded text, OCR may be used, but
   every page still requires visual reconciliation.
2. Run `scripts/extract_pdf_layout.py` to produce page PNGs and line geometry.
   It requires Poppler's `pdftotext` and `pdftoppm` commands.
3. Inspect every rendered page. Use coordinates, indentation, capitalization,
   surrounding elements, and screenplay conventions to identify paragraph
   boundaries and types. Never classify from capitalization alone.
4. Author the reviewed conversion manifest described in
   [references/conversion-manifest.md](references/conversion-manifest.md).
   Join visual line wraps within one paragraph, but preserve separate authored
   paragraphs. Remove only verified headers, footers, and page numbers.
5. Run `scripts/reconcile_text.py` against the layout evidence and manifest.
   Resolve every textual mismatch against the rendered pages. This comparison
   starts at the first screenplay paragraph and ignores detected page numbers;
   it does not replace visual review. Dual-dialogue columns cannot be reduced
   to one trustworthy reading order, so the script stops when they are present;
   reconcile those passages visually and disclose that exception.
6. Run `scripts/build_fdx.py` with the reviewed manifest. The builder owns XML
   escaping and FDX envelope construction; do not hand-escape or concatenate
   XML in shell commands.
7. Run `scripts/validate_fdx.py --manifest ...` and resolve every error. Review
   every warning against the rendered pages.
8. Import the `.fdx` in Beat, Final Draft, or another FDX-capable editor when
   one is available. In Beat, use **File > Import Final Draft...**; Beat does
   not register `.fdx` as a directly openable document. Compare the imported
   screenplay page by page with the PDF and correct the manifest, not the
   generated XML. Rebuild and revalidate after every correction.
9. Report the output path, scene and paragraph counts, character cues, warnings
   reviewed, and any unresolved source ambiguity. Do not call a conversion
   complete while ambiguity remains unreported.

When the user also wants a Renku import, invoke the `screenplay-drafter`
workflow after the standalone FDX is complete. Do not create a Renku Project
merely to satisfy this skill's own validation.

## Classification rules

- A `Scene Heading` is an authored slugline or other explicit scene boundary.
  Preserve its printed scene number separately in `number`.
- `Character` identifies a dialogue cue, including an authored extension such
  as `(V.O.)` or `(O.S.)`.
- `Parenthetical` contains the complete parentheses.
- Consecutive visual dialogue lines belong to one `Dialogue` paragraph until
  spacing or another element establishes a new paragraph.
- `Action` contains visible or audible action and description. Preserve
  meaningful all-caps emphasis as text; semantic type is not inferred from
  capitalization.
- Use `Transition`, `Shot`, `General`, `Lyrics`, `New Act`, `End of Act`, or
  `Sequence` only when the source actually authors that element.
- If simultaneous dialogue is unmistakable, read the dual-dialogue section of
  the manifest reference. Otherwise do not manufacture dual dialogue.

## Quality gate

Before delivery, require all of the following:

- every source page was rendered and inspected;
- screenplay text reconciles exactly from the first converted paragraph onward,
  except for any disclosed dual-dialogue passage reconciled visually;
- the manifest-to-FDX comparison has zero errors;
- every scene number in the PDF is represented exactly once;
- no page header or page number appears in screenplay content;
- character cues are followed by their parenthetical/dialogue material;
- XML is well formed and contains no empty screenplay paragraphs; and
- an editor-open test or a clearly disclosed reason it could not be performed.
