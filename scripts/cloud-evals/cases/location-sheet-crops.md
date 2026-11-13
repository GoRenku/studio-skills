---
cases: [E1, E2, D2, E8, M1, M3, B1, K3]
apps: [claude-code, codex]
fixture: small-film-library
request: |
  The Harbor's location sheet in my Renku project has four panels in a 2×2
  grid. Download the original at full size, crop the four panels on my
  computer with your own tools, and add each crop to the Harbor as a hero
  image titled "Harbor panel 1" to "Harbor panel 4" (left to right, top to
  bottom). Then make a contact sheet of the four crops side by side in one row
  and add it to the Harbor as a location sheet titled "Harbor contact sheet".
  Finally, write a small script that measures each crop's width and height,
  and put its output in the project at tmp/evals/crop-sizes.json as
  {"crops": [{"name", "width", "height"}]}.
checks:
  - check: assets
    owner: location:{harbor}
    type: location_hero
    min: 4
    max: 4
  - check: assets
    owner: location:{harbor}
    type: location_sheet
    min: 2
    max: 2
  - check: project-files
    pattern: tmp/evals/crop-sizes.json
    min: 1
    max: 1
  - check: renku-calls
    tool: renku_download
    min: 1
  - check: renku-calls
    tool: renku_upload
    min: 1
    max: 2
---

# Crops, a contact sheet and the agent's own script

The original comes down at full size for fine detail (D2). The agent crops
the panels (E1), builds the contact sheet (E2) and measures the crops with a
script of its own (E8, M1) on its computer, where it also checks the
documents it writes (M3); only the results go up, in at most two upload
calls. The fixture's Harbor sheet is the second location sheet.
