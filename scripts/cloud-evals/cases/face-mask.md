---
cases: [E3, C8, K3]
apps: [claude-code, codex]
fixture: small-film-library
request: |
  Ada's profile image in my Renku project shows her face as the light circle
  centred at (256, 200) with a radius of 90 pixels. Paint a face mask for it
  on my computer: a copy of the original where that circle is solid black and
  everything else is unchanged. Then add it to Renku as the profile image's
  face-masked copy.
checks:
  - check: assets
    owner: cast:{ada}
    type: cast_profile
    faceMasked: true
    min: 1
  - check: renku-calls
    tool: renku_upload
    min: 1
    max: 1
---

# A face mask painted on the agent's computer

The agent downloads the profile, paints the masked copy with its own tools
(E3), uploads it and runs `asset face-mask import` with the uploaded path
(C8).
