# Prompt Input Visibility

Use this before drafting any final video prompt. Load the canonical model guide
and selected provider adapter before replacing the neutral placeholders below.

## Provider-Visible Inputs

A final provider prompt can refer only to inputs that the provider actually
receives:

- prompt text;
- authored values accepted by the selected endpoint;
- attached image mentions resolved from `<IMAGE_1>` placeholders;
- attached video mentions resolved from `<VIDEO_1>` placeholders;
- attached audio mentions resolved from `<AUDIO_1>` placeholders;
- source/first/last frame inputs when the selected endpoint exposes them.

Do not ask the provider to understand hidden Studio state.

## Iterated descriptions and requests

Treat an authored description as current creative intent, never as a revision log
to forward verbatim. Before adapting it to the selected model's best practices,
resolve conversational shorthand using the exact chosen revision and its context.
Preserve applicable direction and integrate feedback into one complete prompt.
Replace edit history with the resulting visible action: “the earlier reaction is
removed” becomes the intended speaker framing and cut sequence. Do not include
approval history, QA methods, source-code details or instructions to the agent.

Review the final prompt with only the exact request inputs in view. The provider
does not receive this conversation, previous requests, local descriptions or
Scene dialogue unless their needed content is explicitly included. Spell out
speakers and exact lines when required; bind appearance and continuity to actual
attached inputs using the model's documented syntax. For a continuation, “use the
last frame of revised clip 1” is insufficient: supply that exact frame through a
supported input and describe the opening state and continuing action. Resolve a
missing required reference or material ambiguity before execution; do not claim
an unseen input is attached or invent its contents.

Do this check on every revised request, including after model-specific shortening
or reordering. Keep revision identity, provenance and time maps in their existing
agent-facing evidence. This is agent editorial judgment, not runtime semantic
validation of opaque prompts.

Forbidden provider-facing language includes:

- selected;
- approved;
- current;
- Studio;
- card;
- tab;
- database;
- asset id;
- file name;
- project path;
- "video prompt sheet" as a creative object.

If an app concept matters, translate it into visible traits or a provider token
role.

## Token Rules

Place every included exact reference's local-file marker in a native media field
declared by the selected provider adapter and live schema.

Validate the draft and run:

```bash
renku generation preview show \
  --file tmp/operations/media-generation/request.json \
  --json
```

Inspect the exact reviewed native request as evidence of which inputs the
provider will receive and in what order. Do not infer numbering from filenames,
memory, guide order, UI card order, or earlier requests.

Use the exact mention syntax documented by the provider adapter. Map every
placeholder from final modality-local request order; never treat the placeholder
itself as provider-facing text.

Do not invent a token for a singular field unless the endpoint documentation or
generated preview establishes that token. Every supplied image, video, or audio
token needs a narrow provider-facing role.
Examples:

- storyboard;
- character reference;
- location reference;
- style reference;
- prop reference;
- motion reference;
- narrator voice reference;
- ambience reference;
- sound-character reference.

Do not decorate prompts with unused tokens.

## Bad And Better

Bad:

```text
Use the selected video prompt sheet and current Lookbook card.
```

Better:

```text
<IMAGE_1> is the storyboard for this video. Read it as ordered video beats.
<IMAGE_2> is only a visual style reference for palette, contrast, texture, and
cinematic finish.
```

Bad:

```text
Follow the approved Studio references for this take.
```

Better:

```text
Use <IMAGE_1> for the character's wardrobe and face continuity. Use <IMAGE_2> only
for the stone courtyard scale, materials, and doorway geometry.
```

Bad:

```text
Use file bombardment-sheet-v3.png.
```

Better:

```text
<IMAGE_1> is the storyboard. It controls camera path, sequence, screen direction,
and timing.
```

## Reference Precedence

When multiple references are attached, make their roles non-competing:

```text
<IMAGE_1> is the storyboard. It controls sequence, staging, camera, movement, and
timing.
<IMAGE_2> is only the location continuity reference for architecture, materials,
scale, and geography. Do not use it as an alternate storyboard or first frame.
<AUDIO_1> is the narrator voice reference. Follow the beat-level narration timing
written in the prompt.
```

Storyboard references should not compete with location, lookbook, or character
boards. Supporting references should be narrow and concrete.

Do not include upstream storyboard-generation references as final video tokens
unless the final provider request actually includes them and the storyboard
still needs their narrow role. If a realistic storyboard already contains the
location, look, and composition from those upstream references, do not add
`<IMAGE_2>` or `<IMAGE_3>` just because they existed earlier in the workflow.

## Negative Constraints

Use a separate negative field only when it is present in the live schema.
Otherwise put critical exclusions in the main prompt.

Use concrete visible exclusions:

```text
Do not show storyboard borders, panel labels, arrows, captions, UI, text boxes,
or the reference page layout in the final footage.
```
