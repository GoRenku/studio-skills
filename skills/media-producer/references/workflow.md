# Media Producer Workflow

1. Read purpose context from Renku.
2. Clarify the creative intent only when it materially changes the output.
3. Inspect purpose-specific model choices and honor any user-selected model.
4. Write a binding Media Generation Spec.
5. Persist the spec with `renku generation spec create`.
6. Estimate cost from the persisted spec.
7. Run with `--simulate` for dry checks or with the approval token for paid generation.
8. Import finished media with `renku media import`.

Do not use provider CLIs or external generation tools. Renku Studio engines are the execution boundary because they enforce persisted user choices and cost reporting.
