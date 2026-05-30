# Media Producer Workflow

1. Read purpose context from Renku.
2. Clarify the creative intent only when it materially changes the output.
3. Inspect purpose-specific model choices and honor any user-selected model.
4. Write a binding Media Generation Spec.
5. Persist the spec with `renku generation spec create`.
6. Estimate cost from the persisted spec.
7. Before any paid provider-backed run, get explicit user approval for both the estimated cost and sending project-derived prompt/context to the provider.
8. Run with `--simulate` for dry checks or with the approval token for paid generation. For a real provider-backed run, request sandbox/network permission before the first `renku generation run` attempt, because generation needs outbound network access.
9. Inspect finished media before import. For location environment sheets, inspect the composite, use vision to identify the four scenic view blocks, crop only those four blocks, and inspect the four slices.
10. Import finished media with `renku media import`.

Do not use provider CLIs or external generation tools. Renku Studio engines are the execution boundary because they enforce persisted user choices and cost reporting.

When requesting permission for a real run, make the reason explicit: the command will contact the approved generation provider and send project-derived prompt/context that the user already approved for that run.
