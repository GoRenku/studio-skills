# Lookbook Image

Use `lookbook.image` with target `lookbook:<lookbook-id>`. Context recommends the project aspect ratio, medium quality, and Nano Banana 2.

For Renku-managed work, author a generic spec, validate it, persist it, show
the saved Preview, estimate, obtain approval, and run with the returned approval
token. Use Codex only when the user explicitly requests it; save its external
spec before Preview and import the accepted image with `--source-spec`. Manual
or other external images without a saved generation request use neither a spec
nor a receipt.

After visual review, import the image first:

```bash
renku media import --purpose lookbook.image --target lookbook:<lookbook-id> --source <project-relative-path> --title <title> --receipt <run-json> --json
```

Use the returned `ownerRecord.id` with
`renku lookbook image set-placement --image <lookbook-image-id> --sections ...`
when section or point placement is intended. Import and placement are separate
commands. Section placement is agent/user judgment; do not infer it during
runtime generation validation. Use `--source-spec <spec-id>` for Codex-generated files. Omit both provenance flags for external files with no saved generation request.
