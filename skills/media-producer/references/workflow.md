# Media Producer Workflow

1. Read purpose context from Renku.
2. Clarify the creative intent only when it materially changes the output.
3. Choose the execution path from user intent and the returned `agentMedia` policy:
   - Use Codex built-in image generation when the user asks for Codex, `$imagegen`, built-in image generation, GPT-Image 2 through Codex, or no-extra-cost image generation, and the image tool is available.
   - If `agentMedia.imageGeneration.defaultExecutionPath` is `codexBuiltInWhenAvailable`, prefer Codex built-in image generation for eligible image purposes when available. If it is `renkuManaged`, use Renku-managed generation unless the user explicitly overrides. If it is `ask`, ask when the user has not already chosen.
   - Use Renku-managed generation when the user chooses a Studio/fal.ai/provider model, wants a Renku generation record or cost estimate, or requests video/audio generation.
4. For Codex built-in image generation, use the system `$imagegen` workflow, stage the selected output inside the project under `generated/media/`, inspect it, and import it with `renku media import` without `--receipt`.
5. For Renku-managed generation, inspect purpose-specific model choices and honor any user-selected model.
6. For Renku-managed generation, write a binding Media Generation Spec.
7. For Renku-managed generation, persist the spec with `renku generation spec create`.
8. For Renku-managed generation, estimate cost from the persisted spec.
9. For Renku-managed generation, before any paid provider-backed run, get explicit user approval for both the estimated cost and sending project-derived prompt/context to the provider.
10. For Renku-managed generation, run with `--simulate` for dry checks or with the approval token for paid generation. For a real provider-backed run, request sandbox/network permission before the first `renku generation run` attempt, because generation needs outbound network access.
11. Inspect finished media before import. For Location Sheets, inspect the full image as one production reference board, confirm it matches the required description, and do not crop or slice it. For storyboard sheets, follow the storyboard-specific slicing reference.
12. Import finished media with `renku media import`.

Do not use provider CLIs or third-party generation tools as shortcuts around Renku-managed generation. The only approved non-Renku image path is Codex built-in image generation through `$imagegen`; treat its outputs as imported media and keep Renku as the attachment/metadata boundary.

## Codex Built-In Image Generation Contract

When the user asks for Codex, `$imagegen`, built-in image generation, GPT-Image
2 through Codex, or no-extra-cost image generation for an image purpose:

1. Generate with the system imagegen tool or skill. Do not create a Renku
   generation spec, estimate, approval token, run, or receipt.
2. Save the selected generated image under `generated/media/<descriptive-file>.png`
   inside the Renku project. This project-relative path is the import source,
   not the durable asset location.
3. Import with the same purpose-specific Renku media command used for
   Renku-managed outputs. Do not manually copy files into canonical folders
   such as `cast/`, `locations/`, `visual-language/`, or `shotlist/`; Core owns
   those folders during import.
4. Omit `--receipt`. Never fabricate a Renku receipt for Codex-generated or
   manually supplied media. Use `--replace-selected` only for correction flows
   where the previous selected shot-video take input should be discarded.
5. Read the import JSON and use the returned imported asset/file path as the
   attached project media. For location media, this should be under
   `locations/<handle>/environment-sheets/...` or
   `locations/<handle>/heroes/...`, not only under `generated/media/`.
6. In the final response, make the image visible to the user with a Markdown
   image preview using the absolute path to the imported asset when available,
   and also report the imported asset id and project-relative path. If the
   platform supports a real attachment API in addition to Markdown previews,
   attach the same imported file as well.

Saved, imported, and shown are separate requirements. A generated file sitting
in `generated/media/` is only staged. The media is not a real Studio attachment
until `renku media import` succeeds, and the user has not actually been shown
the result until the final response includes a visible preview or attachment.

When requesting permission for a real run, make the reason explicit: the command will contact the approved generation provider and send project-derived prompt/context that the user already approved for that run.
