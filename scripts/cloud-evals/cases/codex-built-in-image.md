---
cases: [F12, K3]
apps: [codex]
fixture: small-film-library
request: |
  Make one hero image of the Harbor with your built-in image generation, using
  the Harbor's location sheet in my Renku project as the reference. Add it to
  the Harbor as a hero image, with its request as provenance.
checks:
  - check: assets
    owner: location:{harbor}
    type: location_hero
    provenanceProvider: codex
    min: 1
  - check: renku-calls
    tool: renku_download
    min: 1
---

# Codex built-in images

Codex only: the reference comes down, the image is made on the agent's
computer, goes up and imports with the request as provenance, as locally
(F12).
