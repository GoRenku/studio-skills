---
cases: [M2, C3, B1, K3]
apps: [claude-code, codex]
fixture: small-film
agentFiles: [harbor-sheets]
request: |
  I've put seven new location sheets for the Harbor in ./inbox/harbor-sheets
  on my computer. Add all seven to the Harbor location in my Renku project as
  location sheets, titled "Harbor sheet 1" to "Harbor sheet 7".
checks:
  - check: assets
    owner: location:{harbor}
    type: location_sheet
    min: 7
    max: 7
  - check: renku-calls
    tool: renku_upload
    min: 1
    max: 1
  - check: renku-calls
    tool: renku_command
    min: 1
    max: 3
---

# Seven sheets in one upload and one batch

The person names files on their computer (C3). A local script that ran
`renku media import` seven times becomes one `renku_upload` call for all seven
files and one batch, or one import list the agent writes on its computer and
sends inline (M2, B1). The checks count the sheets on the Harbor and the
Renku calls it took.
