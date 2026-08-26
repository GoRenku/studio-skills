# MiniMax H3 Image To Video

Official operation specification:
https://dev.pika.art/llms/minimax/h3/image-to-video

Use when an accepted image anchors the opening appearance of a video. Put the
local marker in the exact live-schema field for that role and give it a
meaningful review label. Prompt motion, camera behavior, temporal change, and
continuity from the supplied frame rather than merely redescribing the still.
Use an ending frame only when the current live schema exposes a distinct field
and the user has deliberately selected one.

This operation does not require a checked-in `promptMention`. Inspect the live
schema immediately before authoring the request and do not copy field
inventories, defaults, bounds, duration or resolution choices, or prices into
this guide.
