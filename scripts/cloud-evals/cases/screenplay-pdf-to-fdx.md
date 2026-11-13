---
cases: [I4, I3, D6, C3, C8, K3]
apps: [claude-code, codex]
fixture: empty-film
agentFiles: [screenplay-pdf]
request: |
  My screenplay is the PDF at ./inbox/the-tide.pdf on my computer. Turn it into
  a Final Draft (FDX) file and import it into my Renku project as the
  screenplay.
checks:
  - check: screenplay-scenes
    min: 3
    max: 3
    headings: [EXT. HARBOR - DAWN, INT. LIGHTHOUSE - NIGHT, EXT. MARKET - DAY]
  - check: assets
    owner: project
    type: screenplay_source
    min: 1
  - check: renku-calls
    tool: renku_upload
    min: 1
---

# PDF to FDX on the agent's computer, then import

The person names a PDF on their computer (C3). The agent reads it and writes
the FDX there (D6, I4), uploads it and imports it with the uploaded path (I3,
C8). The checks read the imported scenes and the retained FDX source.
