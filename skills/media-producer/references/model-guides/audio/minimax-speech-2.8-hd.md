# MiniMax Speech 2.8 HD Prompt Guide

The bundled Replicate route takes a `text` value to narrate. Keep the authored
dialogue, language, names, and numbers exact unless the user requests a rewrite.
The route exposes voice identity and delivery controls separately from that
text, including `voice_id`, `emotion`, `speed`, and `pitch`. Use only controls
present in the selected route's current schema; do not turn spoken prose into
an instruction block.

## Transcript and delivery controls

Replicate documents `<#x#>` pause markers in the text field, with `x` in
seconds. Use a pause only where the line calls for one. Keep speed and pitch
near their defaults unless a concrete delivery need calls for a change; large
adjustments can alter the performance as well as the duration or timbre. Treat
that last point as a production recommendation, not a provider guarantee.

Original examples below have not been generated or tested. Preserve the line
and add only a deliberate pause:

```text
The north platform is empty.<#0.6#>We still have time to cross.
```

Choose the selected Cast Voice identity independently. If the route exposes an
emotion control, choose one supported setting that fits the line rather than
stacking conflicting labels in the text. For example, avoid:

```text
Read this in a calm, furious, cheerful voice: I said we should wait.
```

Keep the transcript as the words intended to be heard, then express a chosen
delivery through the available voice or emotion control. This is an inference
from the route's `text`-to-narration contract and separate controls; free-form
stage directions are not documented as a general instruction channel.

## Interjections and evidence limits

MiniMax's Speech 2.8 announcement demonstrates parenthetical vocal events such
as `(chuckle)`, `(breath)`, and `(clear-throat)` in sample text. The Replicate
route documentation confirms pause markers but does not enumerate or guarantee
those interjection tags. Use them only when the selected provider's current
documentation supports them, and treat results as voice-dependent rather than
guaranteed. Do not add a tag that changes the authored line's meaning or
performance without user direction.

This route is text-to-speech. It does not promise exact word timing, a precise
duration, or lip synchronization; use a composition or lipsync workflow when
those are required.

## Sources

- [MiniMax Speech 2.8 announcement](https://www.minimax.io/news/minimax-speech-28),
  2026-01-23: describes native sound-tag support and demonstrates vocal-event
  examples.
- [Replicate `minimax/speech-2.8-hd` route and schema](https://replicate.com/minimax/speech-2.8-hd),
  accessed 2026-09-30: documents the `text` field, pause marker, and separate
  voice and delivery controls. It does not document a supported interjection
  list.
- [MiniMax WebSocket TTS documentation](https://platform.minimax.io/docs/api-reference/speech-t2a-websocket),
  accessed 2026-09-30: its Speech 2.8 example also places vocal-event notation
  in text, but does not establish that every notation is supported by each
  provider wrapper.
