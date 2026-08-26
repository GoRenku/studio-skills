# MiniMax H3 Text To Video

Official operation specification:
https://dev.pika.art/llms/minimax/h3/text-to-video

Use when motion begins from text alone. Write observable change over time:
subject action, camera behavior, environmental movement, timing, and the desired
visual finish. Keep one coherent shot unless the user's intent calls for
another structure. Do not invent a reference token when no reference is sent.

Inspect the live schema immediately before authoring the request. Use only the
native fields and values it currently exposes; do not copy defaults, bounds,
duration or resolution choices, audio assumptions, or prices into this guide.
