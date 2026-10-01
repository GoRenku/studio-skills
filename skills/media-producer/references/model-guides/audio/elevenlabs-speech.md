# ElevenLabs Speech Prompt Guide

Use this guide for the currently bundled routes Eleven v3, Eleven Multilingual
v2, and Eleven Turbo v2.5. The transcript is spoken content: keep authored
words, names, numbers, and language exact unless the user asks for a rewrite.
Voice selection and supported voice settings are request configuration; do not
replace them with prose instructions in the transcript.

## Documented model differences

- **Eleven v3:** short audio tags belong inline in the text at the point where
  delivery changes. For example, `[whispers]` may precede a line. Punctuation
  and text structure also affect pacing. Do not use SSML `<break>` tags with
  v3. Tags can behave differently with different voices, so treat them as
  direction rather than a guaranteed performance.
- **Eleven Multilingual v2:** the documented pause control is an SSML break,
  such as `<break time="0.8s" />`, between spoken segments. Official guidance
  gives a maximum of three seconds and warns that excessive breaks may add
  artifacts or change speed.
- **Eleven Turbo v2.5:** the current pause guidance does not list this route
  among the models that support SSML breaks, and the v3 tag guide is specific
  to v3. Use ordinary punctuation unless the selected route's current provider
  documentation confirms a control. Do not assume v3 tags or Multilingual v2
  break syntax transfers to Turbo v2.5.

Confirm current native fields through the selected provider operation. If its
schema exposes voice settings, use those fields for supported controls such as
stability or style. A direction like “read this warmly” placed in the transcript
may be spoken aloud; it is not a substitute for an available setting or a
version-supported inline tag.

## Prompt examples and repairs

The examples below are original and have not been generated or tested.

For v3, preserve the line and add only the intended delivery cue:

```text
The lights are still on upstairs. [whispers] Someone must be home.
```

For Multilingual v2, place a pause between exact lines rather than writing a
stage direction that could be read aloud:

```text
The lights are still on upstairs.<break time="0.8s" />Someone must be home.
```

Avoid stacking opposing instructions or adding a preamble to the transcript:

```text
Read this warmly, slowly, urgently, and like a shout: The train is here.
```

Keep the exact line, then express only the chosen delivery through the selected
model's documented tag or supported request setting. When the request needs
frame-accurate pauses, word timing, or synchronization, use a composition or
lipsync workflow; pacing cues in TTS are not an exact edit timeline.

## Sources and evidence limits

The model-specific controls above are documented by ElevenLabs: [Prompting
Eleven v3](https://elevenlabs.io/docs/best-practices/prompting) (accessed
2026-09-30) and [pause guidance](https://elevenlabs.io/docs/help-center/product/core-capabilities/text-to-speech/how-can-i-add-pauses)
(accessed 2026-09-30). The [TTS guide](https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices)
(accessed 2026-09-30) explains that descriptive text in a TTS request can be
spoken. The pause page names Multilingual v2 and Flash models, but does not
name Turbo v2.5; this guide therefore does not claim SSML support for that
route. These documents describe controls, not guaranteed output quality.
