# Selected Image Evaluations

- A selected-image request hands `shot.image` and `shot:<id>` to
  `media-producer`.
- Without an execution choice, Codex GPT-Image-2 is proposed; an explicit user
  model choice wins.
- The flow shows saved Preview, continues through Codex without a separate
  generation-approval stop, inspects generated output, waits for output
  acceptance, then imports with `--select` when the accepted intent is
  selection. A Renku-managed route still requires estimate approval.
- An explicitly unselected import does not replace the selected image.
- Choosing an existing candidate uses one `renku asset select` call.
- Character Sheets, Location Sheets, Lookbook Sheets, and Dialogue Audio Takes
  never receive global selection.
