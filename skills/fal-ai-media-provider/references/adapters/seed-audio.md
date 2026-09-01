# Fal.ai Seed Audio Adapter

Use this adapter only after Media Producer selects the canonical Seed Audio 1.0
guide and the exact `bytedance/seed-audio-1.0` route.

The live Fal schema is authoritative. Author `prompt` as the exact final audio
script and put selected Cast Voice sample markers in the native `audio_urls`
array. The final array order establishes prompt mentions:

- first marker: `@Audio1`;
- second marker: `@Audio2`;
- third marker: `@Audio3`.

Each marker uses the normal Renku local-file envelope and a meaningful label:

```json
{
  "$file": "assets/cast/example/voices/example.mp3",
  "mimeType": "audio/mpeg",
  "reviewLabel": "Mara — selected Cast Voice sample",
  "promptMention": "@Audio1"
}
```

Use at most three markers. Do not upload the files yourself, reorder markers
after assigning mentions, invent higher-numbered mentions, or substitute the
native `voice` field for file-backed Cast Voice continuity.
