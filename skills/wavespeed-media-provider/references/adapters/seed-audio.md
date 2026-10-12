# Seed Audio 1.0 on WaveSpeed

WaveSpeed's [route documentation](https://wavespeed.ai/models/bytedance/seed-audio-1.0)
uses ordered `audios` for up to three reference clips and offers `image` as an
alternative reference mode. Prepare `$file` markers only in the native fields
confirmed by the selected live schema. The published route does not establish
a prompt marker syntax for those clips, so do not copy Pika's `@AudioN` syntax
or invent `promptMention`. Describe the intended voices and performance in
plain prompt text while retaining the reviewed reference order.

In the Codex dialogue direction panel, this route is described by the
[Seed Audio `## Codex panel` block](../../../media-producer/references/model-guides/audio/seed-audio-1.0.md#codex-panel);
keep the notation above when mapping its consumed draft.
