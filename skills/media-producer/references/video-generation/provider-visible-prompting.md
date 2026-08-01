# Provider-Visible Video Prompting

Use this before drafting any final video provider prompt. This file is
provider-neutral. Load provider-specific guidance only after selecting the exact
provider/model endpoint from current descriptors.

## Provider-Visible Inputs

A final provider prompt can refer only to inputs that the provider actually
receives:

- prompt text;
- authored values accepted by the selected endpoint;
- attached image mentions such as `@Image1` or `Image 1`;
- attached video mentions such as `@Video1` or `Video 1`;
- attached audio mentions such as `@Audio1` or `Audio 1`;
- source/first/last frame inputs when the selected endpoint exposes them.

Do not ask the provider to understand hidden Studio state.

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

Assign every included exact reference to a file-backed media field declared by
the selected model descriptor. Keep media fields out of `values`.

Validate the draft and run:

```bash
renku generation preview show --file <generation-spec-json> --json
```

Use the resulting `providerPayload` as evidence of which inputs the provider
will receive and in what order. Do not infer numbering from filenames, memory,
guide order, UI card order, or prior run payloads.

Use the exact mention syntax documented for the selected route. For provider
fields that document modality-local mentions, map the array order shown in
`providerPayload`. For example:

- first Seedance `image_urls` entry: `@Image1`;
- second MiniMax H3 `reference_image_urls` entry: `Image 2`;
- first H3 `reference_video_urls` entry: `Video 1`;
- first H3 `reference_audio_urls` entry: `Audio 1`.

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
@Image1 is the storyboard for this video. Read it as ordered video beats.
@Image2 is only a visual style reference for palette, contrast, texture, and
cinematic finish.
```

Bad:

```text
Follow the approved Studio references for this take.
```

Better:

```text
Use @Image1 for the character's wardrobe and face continuity. Use @Image2 only
for the stone courtyard scale, materials, and doorway geometry.
```

Bad:

```text
Use file bombardment-sheet-v3.png.
```

Better:

```text
@Image1 is the storyboard. It controls camera path, sequence, screen direction,
and timing.
```

## Reference Precedence

When multiple references are attached, make their roles non-competing:

```text
@Image1 is the storyboard. It controls sequence, staging, camera, movement, and
timing.
@Image2 is only the location continuity reference for architecture, materials,
scale, and geography. Do not use it as an alternate storyboard or first frame.
@Audio1 is the narrator voice reference. Follow the beat-level narration timing
written in the prompt.
```

Storyboard references should not compete with location, lookbook, or character
boards. Supporting references should be narrow and concrete.

Do not include upstream storyboard-generation references as final video tokens
unless the generated provider payload actually includes them and the storyboard
still needs their narrow role. If a realistic storyboard already contains the
location, look, and composition from those upstream references, do not add
`@Image2` or `@Image3` just because they existed earlier in the workflow.

## Negative Constraints

Use a separate negative field only when it is present in the selected model
descriptor. Otherwise put critical exclusions in the main prompt.

Use concrete visible exclusions:

```text
Do not show storyboard borders, panel labels, arrows, captions, UI, text boxes,
or the reference page layout in the final footage.
```
