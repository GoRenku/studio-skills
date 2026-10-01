# Seedance 2.0 Native Audio

Use this when native Seedance audio, narration, dialogue, ambience, or audio
references matter. Author native-audio controls and put audio markers only where
the provider adapter and live schema explicitly support them.

Seedance audio references are conditioning references, not exact editorial
tracks.

Read [index.md](index.md) for the 2.0 timing limitation. Keep speech beside the
action that motivates it, and specify which speaker owns each line. Director
timestamps remain intended pacing; they do not establish reliable exact onset.

## Rules

- Use each exact adapter-supplied audio mention as narrator voice/style, speaker
  character, ambience, rhythm, or sound-character reference.
- Put exact spoken text in the final prompt when the text is known.
- Place narration or dialogue inside the storyboard panel/shot/beat sequence so
  Seedance has timing intent.
- Do not invent exact spoken words.
- Do not write vague provider-facing audio caveats. Give concrete timing
  targets tied to panels, shots, or beats.

If exact waveform, word timing, editorial sync, or precise lip sync is required,
use a composition, lipsync, or talking-head workflow instead of relying on
native Seedance audio.

## Wording

```text
Use <AUDIO_1> as the narrator voice/style reference. The narrator says exactly:
"..."

Audio timing target: begin the line during [beat/panel/shot], continue through
[beat/panel/shot], and complete during [beat/panel/shot].
```

For ambience:

```text
Use <AUDIO_1> only as ambience and sound-character reference. Preserve the mood,
space, and texture of the sound, but do not treat it as exact editorial sync.
```

Replace `<AUDIO_1>` with the exact adapter-supplied mention.

## Worked dialogue beat

Original example, not generated or tested. Add voice references only when the
native request actually supplies them.

```text
One fixed medium two-shot beside a closed station gate. Mara looks through
the bars, then turns toward Ivo and says softly, "The platform is empty."
Ivo keeps his hand on the gate, waits for her to finish, and replies,
"Then we wait here." Keep the two voices distinct and the exact words in
that order. Low outdoor ambience and a small gate rattle beneath the speech;
no music, narrator, overlapping lines, or subtitles.
```

The reply follows a visible reaction and the first speaker's completed line.
Sound design supports the dialogue rather than giving each moment several
competing cues. These are authoring priorities, not synchronization guarantees.

Agent revision suggestions: if lines are assigned to the wrong person, repeat
stable speaker names beside each complete line and clarify any supplied voice
mapping. If dialogue is masked, reduce ambience/music direction. If the result
adds narration, distinguish the character's spoken line from scene description.

## Checks

- Are exact words copied exactly when known?
- Does the prompt give timing targets without promising frame-accurate sync?
- Are audio references scoped narrowly?
- Is a more exact synchronization workflow used when required?
