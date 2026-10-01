# Seedance 2.5 text-to-video

Read [index.md](index.md). Use this when no supplied media should control the
scene. Keep native duration, aspect ratio, resolution, and audio controls in the
selected route's fields. Mention duration in prose only when it helps describe
the creative pacing; make that intent agree with the actual request.

## A simple action or an ordered sequence

Start with the subject and physical event. For a short action, one paragraph can
also carry framing, light, and sound. For several dependent events, give each
stage a visible result that the next stage inherits. This follows the stage
construction in the [BytePlus guide](https://fal.ai/learn/devs/how-to-use-seedance-2-5).

Renku recommendation: decide whether the result is one continuous take or an
edited sequence before writing camera direction. A camera cannot remain locked
and simultaneously cut to a new angle. For an edited sequence, name the shots
and the cuts; for a continuous take, describe positions along one camera path.
Use timing ranges where a handoff or sound cue needs emphasis, rather than
timecoding every incidental gesture.

The [primary 2.5 timing guidance](index.md) supports integer-second ranges.
Keep a director's important event times, while treating them as requested pacing
and checking whether the generated take follows them.

Original compact example, not generated or tested:

```text
One continuous eye-level medium shot of a watchmaker closing a small brass
case on the workbench. Her thumb presses the lid until the latch catches;
she withdraws her hands and the case remains still. Cool window light reveals
fine scratches in the metal. Sound: one latch click and quiet room tone,
no dialogue or music.
```

The visible action has a completion state. The sound has a physical cause;
the camera does not compete with the hand movement.

Original controlled example for a 16-second request, not generated or tested:

```text
One continuous shoulder-height lateral track inside a dim railway workshop,
natural real-time motion. One mechanic in a navy coat carries one folded
canvas bag in her left hand throughout.
0-5s: she enters from frame left and walks toward the bench; the camera tracks
parallel, keeping her in the left half of frame and the bench on the right.
5-11s: she stops, places the bag on the bench with her left hand, then opens
its top flap with both hands. The bag stays on the bench.
11-16s: she takes one brass gauge from the bag with her right hand and holds
it below her face; the camera stops without crossing the bench.
Keep one mechanic, one bag, the same coat, and the same workshop geography.
Sound: footsteps, canvas rustle, a soft metal tap, distant ventilation;
no music or speech. No cuts, repeated entrance, or duplicated gauge.
```

The state changes are connected: carried bag, placed bag, opened bag, removed
gauge. The camera's stopping point is separate from the subject's final action.

## When a result misses

These are agent rewrite suggestions, not confirmed causes of a particular run:

- Idle time or repeated movement: specify the next meaningful state change and
  the ending state; reduce duration or add an intended development, rather than
  relying on a longer setting to create more story.
- A prop changes hands or duplicates: clarify who owns it before and after
  the transfer, leaving unrelated camera/style wording alone.
- An unexpected cut: state the continuous path explicitly and remove conflicting
  shot labels. If cuts are intended, name the transition instead.

The state, continuity, and timing choices are informed by
[Fal's demonstrated 2.5 examples](https://fal.ai/learn/devs/seedance-2-5-prompting-guide),
read 2026-09-30. The examples and repair suggestions above are original Renku
recommendations; do not infer guaranteed event times or prop fidelity.
