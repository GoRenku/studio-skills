---
cases: [F18, K3]
apps: [claude-code, codex]
fixture: small-film
request: |
  From the Renku skills installed with your plugin, find which fal route
  Renku's Default Model List uses for MiniMax H3 Image, and the image size its
  "highest" detail asks for. Put the answer in my Renku project at
  tmp/evals/model-facts.json as {"route", "highestWidth", "highestHeight"}.
checks:
  - check: project-json
    path: tmp/evals/model-facts.json
    fields: {route: minimax/h3-image/text-to-image, highestWidth: 4096, highestHeight: 3072}
  - check: renku-calls
    tool: renku_guide
    max: 0
---

# Model details from the plugin's own files

The model files ship with the plugin's skills on the agent's computer, where
it reads them (F18); it does not need Renku's `renku_guide` tool for them.
The expected values are the media-producer skill's Default Model List entry.
