# Provider-Visible Video Prompting

Use this before drafting any final video provider prompt. This file is
provider-neutral. Load the active model route file as well.

## Provider-Visible Inputs

A final provider prompt can refer only to inputs that the provider actually
receives:

- prompt text;
- active route parameters;
- attached image tokens such as `@Image1`;
- attached video tokens such as `@Video1`;
- attached audio tokens such as `@Audio1`;
- source/first/last frame tokens when the active route exposes them.

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

Determine token order from the final provider preview or prepared inputs. Do
not infer numbering from filenames, memory, UI card order, or prior run payloads.

Map by modality-local order unless the provider preview says otherwise:

- first `image_urls` entry: `@Image1`;
- second `image_urls` entry: `@Image2`;
- first `video_urls` entry: `@Video1`;
- first `audio_urls` entry: `@Audio1`.

Every supplied image, video, or audio token needs a narrow provider-facing role.
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
@Audio1 is the narrator voice reference. Timing is best-effort inside native
video generation.
```

Storyboard references should not compete with location, lookbook, or character
boards. Supporting references should be narrow and concrete.

## Negative Constraints

Do not rely on a separate negative field unless the active route supports one.
Put critical exclusions in the main prompt when the route rejects or ignores a
negative field.

Use concrete visible exclusions:

```text
Do not show storyboard borders, panel labels, arrows, captions, UI, text boxes,
or the reference page layout in the final footage.
```
