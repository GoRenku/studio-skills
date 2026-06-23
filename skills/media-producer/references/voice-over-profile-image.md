# Voice-Over Profile Image Purpose

Voice-over Cast Members can use `cast.profile` for cast navigation and overview
cards. This media is a symbolic display asset only. It must not be treated as a
physical character reference, character sheet substitute, shot-video character
dependency, costume reference, or likeness anchor.

Use this reference when:

- the target Cast Member has `isVoiceOver: true`;
- the user asks for a profile image, card image, navigation image, or visual
  representation for a narrator or other voice-only role;
- the user explicitly says a character sheet or physical portrait does not make
  sense.

Do not generate `cast.character-sheet` for voice-over Cast Members unless the
user changes the Cast Member into a visible on-screen role first.

## Required Context

Read the regular `cast.profile` context first:

```bash
renku generation context --purpose cast.profile --target cast:<cast-member-id> --json
```

Use the context to ground the prompt in:

- project title, genre, tone, logline, and summary;
- active Movie Lookbook visual language when present;
- Cast Member role, description, and voice notes;
- active Cast Design voice/performance/generation guidance when present.

If the role also needs a durable voice identity or sample audio, handle that
separately through `cast.voice-sample` or `casting-director` Cast Voice
attachment guidance. Do not confuse the visual profile image with voice sample
generation.

## Prompt Rules

Write a square `cast.profile` prompt that makes the image feel like an
intentional voice-only cast card:

- no human face, body, silhouette, avatar, or anonymous hooded figure;
- no stock microphone, studio headset, radio booth, podcast desk, or literal
  recording-session imagery unless the project itself is about that setting;
- no visible text, captions, logos, filenames, ids, UI, subtitles, or labels;
- use symbolic sound, narration, memory, signal, texture, light, atmosphere, or
  a subtle waveform-like motif;
- adapt the palette, contrast, texture, and cinematic language to the active
  project lookbook rather than using a generic audio graphic;
- keep the result useful as a square card image that can sit beside normal cast
  profiles.

Starting prompt shape:

```text
Create a square voice-over profile image for {castMember.name}, a voice-only cast role in {project.title}. This is not a character portrait and must not show a human face, body, silhouette, or avatar. Make it feel like an intentional cast-card image for narration: cinematic, symbolic, project-specific, and visually consistent with the active lookbook. Use the project tone, genre, visual language, and voice notes to suggest the presence of a speaking narrative voice through abstract sound, atmosphere, light, texture, or a subtle waveform-like motif. No text, logos, captions, filenames, UI elements, or microphone stock imagery.
```

Add project-specific visual direction after that starting shape. Prefer concise,
concrete image language over explaining UI behavior to the model.

## Import

Import the selected image as the normal cast profile purpose:

```bash
renku media import --purpose cast.profile --target cast:<cast-member-id> --source generated/media/<file>.png --json
```

Use a human-readable title such as `{Cast Member Name} voice-over profile`. If
relationship metadata is requested, use a stable reference name such as
`narrator-voice-over-profile` and a purpose such as
`symbolic profile image for voice-only cast navigation`.
