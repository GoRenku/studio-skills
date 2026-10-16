# Plugin Installation And Review Routing

The split is deliberate: creative workflow guidance belongs here; domain
validation and durable project mutations belong in Studio core. Changes to CLI
commands or document contracts need coordinated updates in both repositories.
The plugin does not bundle the Studio runtime. Studio platform installers and
both update paths install the Codex and Claude plugins automatically when a
compatible CLI or desktop runtime is available. No generic skills tool or agent
picker is bundled. Existing loose skill files and their settings are retained.
Claude setup prefers a compatible terminal CLI, otherwise Desktop's cached Code
runtime, and installs `renku@renku` once at user scope. For Desktop-only setups,
open its Code tab once before setup. Start a new local Code session and use
`/renku:movie-director`. This targets local Code, not Cowork.
Other harnesses use the [separate installation guide](https://gorenku.com/agent-skills/)
and choose an explicit agent and project/global scope.
Studio keeps Claude's marketplace checkout under its installation directory and
refreshes it during `renku update` or `renku update skills`. Plugin releases must
bump `.claude-plugin/plugin.json`'s version so Claude loads the updated content.
Development connections with advertised panel support use the panel without an
installer record. Without a connection or installation record, Codex Desktop
and other harnesses use Studio Preview with conversation, or a text review when
Studio is not running. Each Project generation lane (Image Generation, Image
Editing, Video Generation, Audio Generation) sets whether the agent confirms the
provider and model and whether it asks before generating. See the canonical
[generation review routing guide](../skills/media-producer/references/generation-review-routing.md)
and [route choice guide](../skills/media-producer/references/route-choice.md).
Media Producer publishes its
[Default Model List](../skills/media-producer/references/default-models.json) to
Studio with `renku generation default-models sync`.
