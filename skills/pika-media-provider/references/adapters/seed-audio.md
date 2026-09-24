# Seed Audio 1.0 on Pika

Use the selected route's live input schema for fields and limits. Pika's
[operation specification](https://dev.pika.art/llms/bytedance/seed-audio-1.0/text-to-audio)
accepts ordered reference audio clips in `audio_urls` and identifies them in
the prompt as `@Audio1`, `@Audio2`, and `@Audio3`. Keep each marker aligned with
its exact native reference position. For an attached local clip, put the `$file`
marker in `audio_urls` and set `promptMention` to its corresponding
`@AudioN` only when the request actually uses that clip. A preset `voice`
belongs to the base model variant; the multilingual variant uses cloning
references. Confirm the selected variant in the live schema before preparing
the request.
