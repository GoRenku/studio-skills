---
cases: [D5, K3]
apps: [claude-code, codex]
fixture: small-film-library
requires: [whisper-cli]
request: |
  The "Harbor coverage" shot plan in my Renku project has a dialogue
  recording, the reference called "Harbor dialogue take". Transcribe it on my
  computer and save the transcript as that reference's one-line summary in
  Renku.
checks:
  - check: asset-text
    owner: project
    asset: "{dialogueTake}"
    field: oneLineSummary
    includes: [afraid, design]
  - check: renku-calls
    tool: renku_download
    min: 1
---

# Transcribing a dialogue take on the agent's computer

The recording comes down through a download link and is transcribed with
whisper on the agent's computer (D5); only the text goes back. The fixture
recording is the website's harbor scene, whose lines include "They are afraid
of your gun" and "A design unfired is a corpse with clean hands".
It needs a whisper model on this computer that the agent can find: Claude
Code's sandbox lets the network reach loopback only, so nothing is downloaded
during the run.
