# Media Producer Workflow

1. Read purpose context from Renku.
2. Clarify the creative intent only when it materially changes the output.
3. Choose the execution path:
   - Use Codex built-in image generation when the user asks for Codex, `$imagegen`, built-in image generation, GPT-Image 2 through Codex, or no-extra-cost image generation.
   - Use Renku-managed generation when the user chooses a Studio/fal.ai/provider model, wants a Renku generation record or cost estimate, or requests video/audio generation.
4. For Codex built-in image generation, use the system `$imagegen` workflow, save the selected output inside the project as a project-relative file, inspect it, and import it without `--receipt`.
5. For Renku-managed generation, inspect purpose-specific model choices and honor any user-selected model.
6. For Renku-managed generation, write a binding Media Generation Spec.
7. For Renku-managed generation, persist the spec with `renku generation spec create`.
8. For Renku-managed generation, estimate cost from the persisted spec.
9. For Renku-managed generation, before any paid provider-backed run, get explicit user approval for both the estimated cost and sending project-derived prompt/context to the provider.
10. For Renku-managed generation, run with `--simulate` for dry checks or with the approval token for paid generation. For a real provider-backed run, request sandbox/network permission before the first `renku generation run` attempt, because generation needs outbound network access.
11. Inspect finished media before import. For location environment sheets, inspect the composite, use vision to identify the four scenic view blocks, crop only those four blocks, and inspect the four slices.
12. Import finished media with `renku media import`.

Do not use provider CLIs or third-party generation tools as shortcuts around Renku-managed generation. The only approved non-Renku image path is Codex built-in image generation through `$imagegen`; treat its outputs as imported media and keep Renku as the attachment/metadata boundary.

When requesting permission for a real run, make the reason explicit: the command will contact the approved generation provider and send project-derived prompt/context that the user already approved for that run.
