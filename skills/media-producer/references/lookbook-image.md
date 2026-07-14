# Lookbook Image

Use `lookbook.image` with target `lookbook:<lookbook-id>`. Context recommends the project aspect ratio, medium quality, and Nano Banana 2.

For Renku-managed work, author a generic spec, validate it, show Preview,
persist it, estimate, obtain approval, and run with the returned approval token.
For Codex/manual/external images, attach without a spec or receipt.

After visual review, import the image first:

```bash
renku media import --purpose lookbook.image --target lookbook:<lookbook-id> --source <project-relative-path> --title <title> --receipt <run-json> --json
```

Use the returned `ownerRecord.id` with
`renku lookbook image set-placement --image <lookbook-image-id> --sections ...`
when section or point placement is intended. Import and placement are separate
commands. Section placement is agent/user judgment; do not infer it during
runtime generation validation. Omit `--receipt` for external or Codex files.
