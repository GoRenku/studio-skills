# Shot Video Take Input Dependencies

Use this when the final video mode needs prepared inputs before final
`shot.video-take` generation.

This is a router, not a final video prompt guide.

## Dependency Types

Load the matching file:

- `storyboard-reference-image.md` for the `video-prompt-sheet`
  storyboard/reference image dependency.
- `first-last-frame-dependencies.md` for `first-frame` and `last-frame`.
- `generic-reference-inputs.md` for `reference-image` and other
  non-storyboard image/video/audio references.

## Reusable Inputs

Read reusable dependency candidates:

```bash
renku generation input list \
  --purpose shot.video-take \
  --target take:<take-id> \
  --json
```

Select a reusable dependency only when the user wants reuse and it matches the
current take, ordered shot ids, input mode, and creative need:

```bash
renku generation input select \
  --purpose shot.video-take \
  --target take:<take-id> \
  --input <shot-video-take-input-id> \
  --json
```

Clear a selected slot before regenerating it:

```bash
renku generation input clear \
  --purpose shot.video-take \
  --target take:<take-id> \
  --kind <input-kind> \
  --subject-kind <subject-kind> \
  --subject-id <subject-id> \
  --json
```

## Generation Path

For image dependencies, use Codex built-in image generation when:

- the user asks to use Codex, `$imagegen`, built-in GPT-Image 2, or no-extra-cost
  image generation;
- `agentMedia.imageGeneration.defaultExecutionPath` is
  `codexBuiltInWhenAvailable` and the image tool is available.

Use Renku-managed image models when:

- the user chooses Studio/fal.ai/provider generation;
- the user wants Renku generation records or cost estimates;
- the policy says `renkuManaged`;
- actual project image references must condition the provider and the active
  Codex image tool cannot pass those image files directly.

If policy says `ask` and the user has not chosen, ask before generating image
dependencies.

Final `shot.video-take` video generation remains Renku-managed.

## Handoff Rule

Every generated or imported dependency should leave a compact handoff note for
the final video prompt:

- dependency purpose and selected input kind;
- ordered shot ids it covers;
- intended role in final video;
- hard continuity constraints;
- known limitations or caveats;
- visible artifacts or reference-only marks that must not appear in final
  footage;
- exact dialogue/narration timing when known.

This handoff is agent guidance. It is not Studio schema and must not become
runtime validation of creative image contents.
