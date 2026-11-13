---
cases: [G3, C8, K3]
apps: [claude-code, codex]
fixture: small-film
agentFiles: [voice-samples]
request: |
  Ada needs her dialogue voice. Two samples are on my computer:
  ./inbox/voices/ada-warm.mp3 and ./inbox/voices/ada-low.mp3. I've listened to
  both and I choose ada-warm. Attach it to Ada as her dialogue voice, named
  "warm".
checks:
  - check: cast-voices
    cast: "{ada}"
    min: 1
    max: 1
  - check: renku-calls
    tool: "*.open"
    max: 0
  - check: renku-calls
    tool: renku_upload
    min: 1
---

# Voice casting as a chat step

Claude Code and the Codex CLI have no panels, so casting runs as chat steps
and no panel opens (G3). The chosen sample goes up and is attached with
`cast voice attach` from its uploaded path (C8).
