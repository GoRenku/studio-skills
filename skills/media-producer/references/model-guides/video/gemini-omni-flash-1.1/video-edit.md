# Gemini Omni Flash 1.1 Video Edit

Use this for an edit route that receives one source video. The source belongs in
the singular native field confirmed by the selected provider; do not add a
video-reference marker unless the adapter supplies one.

## Make one local change

Google recommends simple edit instructions because extra scene description can
lead to changes beyond the requested edit. Name the visible change first, then
state only the source details that matter to keep. Avoid asking an edit route to
change the duration or invent a different shot structure; choose a generation
or continuation route if the requested work is broader.

```text
[Change one visible object, garment, or lighting detail]. Keep [specific
unaffected action, framing, identity, and sound] as in the source.
```

Original, untested example:

```text
Change the red scarf to dark blue. Keep the person's movement, coat, face,
camera framing, street, and original sound as in the source.
```

Do not list every visible property by default. If the edit concerns only the
scarf, preserving unrelated timing, sound, or background may add noise to the
instruction. Name the unaffected details that the user actually cares about.

Preserved example for an edit with stricter continuity needs; not tested in this
refresh:

```text
Make the phone in the performer's right hand invisible. Keep everything else
the same: timing, hand motion, face, wardrobe, camera path, framing, background,
lighting, and original audio. Reconstruct only the small background area behind
the phone. Do not add another object, alter the fingers, or introduce a cut.
```

This explicitly protects the performance while requesting a local removal.
Its preservation language states the brief; review the output for altered hands,
background reconstruction, and unwanted changes rather than assuming success.

## Continuation is a different operation

Google documents Omni continuation in 10-second increments, using the source
video's final 10 seconds for continuity and allowing up to 40 seconds total.
Those are Google API facts; this guide's checked Fal route index exposed an edit
route, not continuation. Use a continuation-capable route only when its live
schema exposes that input. For a continuation, direct what happens next and
whether the scene carries on or cuts; do not send a continuation request to the
edit source field by inference.

When that supported continuation workflow uses segment-relative timecodes,
time zero describes the new segment, not the beginning of the entire source.

## Checks

- Is the source assigned to the exact native field exposed by the route?
- Is the requested visual change observable and limited to the intended scope?
- Does preservation language name only details that matter?
- Is this an edit, rather than an extension or new-shot request?

Google prompt advice reviewed 2026-09-30:

- [Google Gemini API: Generate and edit videos with Gemini Omni Flash](https://ai.google.dev/gemini-api/docs/omni#prompts-for-editing)
- [Fal Gemini Omni Flash 1.1 edit route](https://fal.ai/models/google/gemini-omni-flash/v1.1/edit/api)
