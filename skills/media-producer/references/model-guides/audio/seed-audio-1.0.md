# Seed Audio 1.0

Seed Audio 1.0 creates text-directed speech and multi-speaker audio while
optionally conditioning each speaker on an ordered reference clip. This guide
is provider-neutral; provider adapters own native fields and file-marker
syntax.

Sources:

- [Seed Audio 1.0 prompting and workflows](https://fal.ai/learn/tools/how-to-use-seed-audio)
- [Current Fal.ai route schema](https://fal.ai/models/bytedance/seed-audio-1.0/api)

## Reference voice samples

Create a reusable sample from text description only when no established sample
exists. Combine the user's direct direction with the Cast Member's voice notes.
Target about 30 seconds with roughly 70–85 natural words of spoken script. Count
only words the character will say; descriptive and instructional prompt text
does not satisfy the spoken-word budget. Verify that count before Preview. Keep
one speaker, one consistent emotion and timbre, natural continuous pacing,
minimal background sound, no music, no second voice, and a clear steady
microphone perspective. Never ask the model to stretch a short script with long
pauses or sparse delivery to reach the target duration; expand the actual
in-character speech instead.

## Dialogue with selected samples

Keep the exact screenplay words and order. Introduce each speaker clearly with
voice/performance direction and the provider-resolved reference marker. Reuse
the same marker every time that speaker returns. One-Turn and consecutive
multi-Turn requests use the same structure; do not add a second workflow or
combine outputs afterward.

For clean dialogue, describe a quiet recording context and avoid cinematic
sound beds, music, or effects. Give each speaker enough identity and delivery
direction to disambiguate the exchange, but do not overload the prompt with
unrelated audio cues.

## Hard request limits

- At most three reference clips, one per distinct speaker; each reference is at
  most 30 seconds.
- At most 2,048 prompt characters.
- At most two minutes of generated audio.

These are agent workflow stop conditions. Narrow or split the requested Turn
range before execution. Never truncate dialogue, omit a reference, or replace
an established voice with a text-invented approximation.
