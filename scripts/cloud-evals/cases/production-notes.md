---
cases: [D6, C3, C8, B1, M3, K3]
apps: [claude-code, codex]
fixture: small-film
agentFiles: [production-notes-pdf]
request: |
  The production notes in ./inbox/production-notes.pdf on my computer describe
  a new location. Keep the PDF in my Renku project as supporting material, and
  add the location it describes, with its description from the notes.
checks:
  - check: location
    name: Lighthouse
    descriptionIncludes: [headland, stair]
  - check: assets
    owner: project
    type: screenplay_supporting_material
    min: 1
  - check: renku-calls
    tool: renku_upload
    min: 1
---

# Reading a supporting PDF and importing what the agent wrote

The agent reads the PDF on its computer (D6), uploads it as supporting
material with the uploaded path (C3, C8), and writes the Location document
on its computer (B1), checking it there before it sends it inline (M3).
