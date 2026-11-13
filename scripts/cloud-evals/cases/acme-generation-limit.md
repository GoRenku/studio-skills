---
cases: [F11, E6, F16, K3]
apps: [claude-code, codex]
fixture: small-film-acme
providerJobMs: 8000
request: |
  Make four new location sheets for the Harbor with the acme provider's
  image-basic model, one image per job, through the acme-media MCP server
  connected in this app. Use the Harbor's existing location sheet, resized on
  my computer to 512 pixels wide, as the reference image for every job. Write
  your own prompt for each. I approve the cost. Add all four to the Harbor as
  location sheets.
checks:
  - check: provider-calls
    tool: submit
    min: 4
    max: 4
  - check: provider-peak
    max: 2
  - check: provider-inputs
    contentType: image/png
    min: 1
  - check: assets
    owner: location:{harbor}
    type: location_sheet
    withReceipt: true
    min: 4
  - check: generation-jobs
    status: imported
    min: 4
  - check: generation-jobs
    status: submitted
    max: 0
  - check: renku-commands
    absent: [credentials]
---

# Generation through the provider's MCP server, within the project's limit

The fixture's image lane uses the fictional acme provider with at most two
generations at once, and asks before nothing. Each fake job runs for eight
seconds, so starting all four together would show four at once; the fake
provider records the peak (F11). The resized reference goes up and reaches the
provider as a 24-hour link of type image/png (E6). The agent checks that the
provider's MCP server is connected instead of asking Renku for keys (F16).
Every output imports with its recorded job and the provider's receipt.
