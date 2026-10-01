# Seedance 2.5 native audio

Read [index.md](index.md). Native audio output and uploaded reference audio are
different capabilities; use only the selected route's actual fields and the
provider adapter's exact mentions. Read
[reference-to-video.md](reference-to-video.md) when supplying audio.

## Direct a performance and its sound

The [BytePlus guide](https://fal.ai/learn/devs/how-to-use-seedance-2-5) permits
natural language and offers optional distinctions: braces for dialogue,
parentheses for music, angle brackets for effects, and `〖〗` for subtitles.
It recommends reinforcing spoken language and delivery explicitly.
[Fal's worked examples](https://fal.ai/learn/devs/seedance-2-5-prompting-guide)
also show ordinary quoted dialogue. These are prompt-writing examples on their
respective surfaces, not additional API fields or compulsory syntax.

Renku recommendations:

- Preserve the exact authored line. Name its speaker, language, delivery, and
  intended onset when known; distinguish an off-screen speaker from the visible
  listener. Do not invent dialogue merely to fill a sound section.
- Give an action and its spoken line room to happen. Avoid simultaneously
  asking a speaker to deliver a long line and perform several intricate actions.
- Name physical effects and background ambience separately from speech. Ask
  for music, no music, or silence deliberately when it matters to the brief.
- If uploaded audio supplies voice, performance, or rhythm, state that narrow
  role. Do not promise identical wording, duration, waveform, or lip sync from
  conditioning alone. Preserve selected Dialogue Take choices through the
  existing workflow rather than substituting another performance.

Original dialogue example, not generated or tested:

```text
One continuous medium two-shot at a quiet repair counter. The customer lays
one folded receipt on the counter and withdraws her hand. After the paper
settles, she says in quiet conversational English: {I kept it, just in case.}
The clerk listens with his mouth closed, glances at the receipt, then replies
in restrained conversational English: {That helps.} Keep the exchange natural,
with a short listening pause. Sound: paper contact, faint clock ticking,
clean speech, no music. No subtitles or additional dialogue.
```

The example separates prop action from speech and names the listener's response;
it uses BytePlus's optional dialogue notation without changing either line.

If the wrong person speaks, state speaker/listener responsibilities beside the
line. If speech overlaps an action, simplify the performance or allocate a
clearer onset. If unwanted captions appear, distinguish spoken content from
on-screen text rather than adding subtitle syntax. These are agent rewrite
suggestions, not measured repairs.

BytePlus's [primary guide](https://docs.byteplus.com/en/docs/modelark/seedance-2-5-prompt-guide)
reports that repeating dialogue and assigning delivery word by word can trigger
subtitles, and that captioned references can influence them. Keep delivery beside
the complete line and review references for unwanted text. A no-subtitles request
still does not guarantee suppression.

Event times remain directing targets. For a requirement to preserve an exact
editorial track or frame-level word timing, use the existing exact-sync workflow
rather than treating native generation as an audio compositor. Sources above
were read 2026-09-30; no speech or synchronization test was run in this refresh.
