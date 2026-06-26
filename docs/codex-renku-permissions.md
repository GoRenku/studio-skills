# Codex Permissions For Renku Skills

Renku skills work best with a named Codex permission profile that is close to
the built-in `:workspace` profile, but also allows the local Studio notification
endpoint and whichever live generation providers the user wants to use.

This guide is for Codex users who want Renku skills such as
`movie-director`, `scene-shot-designer`, `media-producer`, `lookbook-designer`,
`casting-director`, and the screenplay skills to work without repeated
sandbox prompts.

## Why Renku Needs A Custom Profile

Renku skills usually do four kinds of local work:

1. Read and write the current Renku project database and media files.
2. Create temporary specs, generated images, crops, downloads, and import files.
3. Read provider credentials from the user's Renku config directory.
4. Notify the running Studio app through local HTTP, normally
   `http://localhost:5173`.

The fourth point is the one that often surprises people. In Codex,
`localhost` and `127.0.0.1` HTTP calls are still network access. If the profile
does not allow loopback network access, a Renku CLI mutation can succeed but
Studio may not refresh. In that case the CLI reports `CLI026`: the project was
changed, but Studio was not notified.

The built-in `:workspace` profile is convenient because it follows the current
session's workspace roots. A custom profile that hardcodes only one or two
directories can accidentally be narrower than `:workspace`. The profile below
keeps the useful `:workspace_roots` behavior and adds Renku-specific network
and temp access.

## Step 1: Open Your Codex Config

Codex reads user configuration from:

```text
~/.codex/config.toml
```

Create the file if it does not exist.

This document uses a Codex **permission profile**, configured under
`[permissions.<name>]`. That is different from a Codex configuration profile
started with `codex --profile <name>`.

## Step 2: Add The Base Renku Profile

Add this to `~/.codex/config.toml`:

```toml
# Optional: make Renku permissions the default for new Codex sessions.
# If you prefer to choose it manually, leave your existing default_permissions
# unchanged and select the renku-studio profile in Codex when doing Renku work.
default_permissions = "renku-studio"

# Recommended for Renku work: Codex can keep moving inside the profile, and
# asks when it needs to go outside it.
approval_policy = "on-request"

# Use "user" if you want every approval prompt to come to you.
# Use "auto_review" if you want eligible prompts reviewed automatically.
approvals_reviewer = "auto_review"

[permissions.renku-studio.workspace_roots]
# Add the parent folder where you keep Renku movie projects.
# Every current Codex workspace root also counts automatically.
"~/renku-movies" = true

[permissions.renku-studio.filesystem]
# Required by common tools and runtimes.
":minimal" = "read"

# Required for image crops, downloads, generated specs, package caches, and
# other temporary files created by Renku workflows.
":tmpdir" = "write"
":slash_tmp" = "write"

# Renku provider credentials are normally read from ~/.config/renku/.env or
# ~/.config/renku/.env.local. Keep this read-only; edit credentials yourself.
"~/.config/renku" = "read"

# Needed only because the deny rules below use unbounded globs.
glob_scan_max_depth = 4

[permissions.renku-studio.filesystem.":workspace_roots"]
# Give Codex normal workspace-like write access to the current project roots
# and any roots listed above.
"." = "write"

# Keep common project-local secret files unreadable. Prefer storing Renku
# provider keys in ~/.config/renku instead of project-local .env files.
"**/.env" = "deny"
"**/.env.*" = "deny"

[permissions.renku-studio.network]
enabled = true

# Required so allowlisted local hostnames can resolve to loopback/private
# addresses. Keep the domain allowlist narrow.
allow_local_binding = true

[permissions.renku-studio.network.domains]
# Studio notification endpoint. Without these, CLI mutations can succeed but
# Studio may not refresh.
"localhost" = "allow"
"127.0.0.1" = "allow"
"::1" = "allow"
```

If you keep Renku projects somewhere other than `~/renku-movies`, replace that
path with your own project parent folder, for example:

```toml
[permissions.renku-studio.workspace_roots]
"~/Movies/renku-projects" = true
```

If you only want to grant access to one movie project at a time, omit the
profile-defined workspace root and open Codex with that movie project folder as
the active workspace root.

## Step 3: Add Provider Domains You Actually Use

The base profile is enough for local screenplay, cast, location, lookbook,
shot-list, storyboard import, and Studio refresh workflows. Live media
generation needs network access to the selected provider.

Add only the provider blocks you use.

### fal.ai

Use this for Renku-managed fal.ai image, video, audio, and Kling voice-control
workflows.

```toml
[permissions.renku-studio.network.domains]
"localhost" = "allow"
"127.0.0.1" = "allow"
"::1" = "allow"

"**.fal.run" = "allow"
"rest.fal.ai" = "allow"
"**.fal.ai" = "allow"
"**.fal.media" = "allow"
"storage.googleapis.com" = "allow"
```

### OpenAI

Use this for Renku-managed OpenAI calls. Codex built-in image generation is a
Codex tool and does not require this domain in the Renku CLI profile, but any
Renku CLI process that calls OpenAI directly does.

```toml
[permissions.renku-studio.network.domains]
"localhost" = "allow"
"127.0.0.1" = "allow"
"::1" = "allow"

"api.openai.com" = "allow"
```

### Vercel AI Gateway

Use this for Renku prompt-generation or LLM workflows routed through Vercel AI
Gateway.

```toml
[permissions.renku-studio.network.domains]
"localhost" = "allow"
"127.0.0.1" = "allow"
"::1" = "allow"

"ai-gateway.vercel.sh" = "allow"
```

If your Renku or AI SDK configuration overrides the Vercel Gateway base URL,
allow the hostname from that custom URL instead.

### Replicate

Use this for Replicate-backed models.

```toml
[permissions.renku-studio.network.domains]
"localhost" = "allow"
"127.0.0.1" = "allow"
"::1" = "allow"

"api.replicate.com" = "allow"
"**.replicate.delivery" = "allow"
```

### ElevenLabs

Use this for direct ElevenLabs voice and audio workflows.

```toml
[permissions.renku-studio.network.domains]
"localhost" = "allow"
"127.0.0.1" = "allow"
"::1" = "allow"

"api.elevenlabs.io" = "allow"
"api.us.elevenlabs.io" = "allow"
"api.eu.residency.elevenlabs.io" = "allow"
"api.in.residency.elevenlabs.io" = "allow"
```

### WaveSpeed

Use this for WaveSpeed-backed models.

```toml
[permissions.renku-studio.network.domains]
"localhost" = "allow"
"127.0.0.1" = "allow"
"::1" = "allow"

"api.wavespeed.ai" = "allow"
```

## Recommended All-In-One Profile

If you want one profile that supports the currently known Renku providers, use
this combined domain table:

```toml
[permissions.renku-studio.network.domains]
"localhost" = "allow"
"127.0.0.1" = "allow"
"::1" = "allow"

# fal.ai
"**.fal.run" = "allow"
"rest.fal.ai" = "allow"
"**.fal.ai" = "allow"
"**.fal.media" = "allow"
"storage.googleapis.com" = "allow"

# OpenAI
"api.openai.com" = "allow"

# Vercel AI Gateway
"ai-gateway.vercel.sh" = "allow"

# Replicate
"api.replicate.com" = "allow"
"**.replicate.delivery" = "allow"

# ElevenLabs
"api.elevenlabs.io" = "allow"
"api.us.elevenlabs.io" = "allow"
"api.eu.residency.elevenlabs.io" = "allow"
"api.in.residency.elevenlabs.io" = "allow"

# WaveSpeed
"api.wavespeed.ai" = "allow"
```

Do not duplicate `[permissions.renku-studio.network.domains]` multiple times in
the final file. TOML tables should appear once; merge the entries you need into
one table.

## Optional: Local Renku Development

End users normally do not need this. Add these roots only if you are developing
Renku Studio or the Renku skills themselves:

```toml
[permissions.renku-studio.workspace_roots]
"~/renku-movies" = true
"~/Projects/aitinkerbox/studio" = true
"~/Projects/aitinkerbox/studio-skills" = true
```

## Step 4: Restart Or Start A New Codex Session

After editing `~/.codex/config.toml`, restart Codex or start a new Codex
session so the profile is loaded.

If you made it the default with:

```toml
default_permissions = "renku-studio"
```

new sessions should use it automatically.

If you did not make it the default, choose the `renku-studio` permission profile
when you start Renku work.

## Step 5: Verify The Profile

With Studio running, ask Codex to run a harmless local network check:

```bash
node -e "fetch('http://localhost:5173').then(r => console.log('Studio reachable:', r.status)).catch(e => console.error(e.message))"
```

Expected results:

- `Studio reachable: <status>` means Codex could reach the local server.
- `fetch failed` or `ECONNREFUSED` usually means no Studio server is listening
  on that port.
- A sandbox or permission denial means the `renku-studio` profile is not active
  or the loopback domains are missing.

Then run a read-only Renku command:

```bash
renku studio current --json
```

If Studio is open and focused on a Renku project, this should return the current
Studio context. If it says no active selection is available, refresh Studio or
click inside the Studio window so it publishes fresh browser activity.

## Troubleshooting

### CLI026 After A Successful Mutation

`CLI026` means the project mutation succeeded, but Studio was not notified.
Do not rerun a non-idempotent command just to refresh Studio; that can duplicate
shot lists, media imports, or generation records.

Check:

- the `renku-studio` profile is active;
- `localhost`, `127.0.0.1`, and `::1` are allowlisted;
- `[permissions.renku-studio.network].enabled = true`;
- `[permissions.renku-studio.network].allow_local_binding = true`;
- Studio is running on the expected port, normally `5173`.

### The Profile Feels Narrower Than `:workspace`

This usually means the profile hardcoded too few workspace roots. Use
`:workspace_roots` for filesystem rules, and either:

- open Codex with the movie project folder as a workspace root; or
- add the parent folder that contains your Renku projects under
  `[permissions.renku-studio.workspace_roots]`.

### Temp File Or Cache Permission Errors

Make sure the profile includes:

```toml
[permissions.renku-studio.filesystem]
":tmpdir" = "write"
":slash_tmp" = "write"
```

Renku media workflows often need temp space for generated sheets, crops,
downloads, and provider SDK internals.

### Provider Credentials Are Missing

Renku generation providers normally read credentials from:

```text
~/.config/renku/.env
~/.config/renku/.env.local
```

Make sure the profile includes:

```toml
[permissions.renku-studio.filesystem]
"~/.config/renku" = "read"
```

If you intentionally store provider keys in a project-local `.env`, the deny
rules in this guide will block them. Prefer moving those keys to
`~/.config/renku`; otherwise remove the `.env` deny rules for your local setup.

### A Live Provider Is Still Blocked

Read the denied hostname from the Codex permission error and add the exact
provider hostname to `[permissions.renku-studio.network.domains]`.

Keep the allowlist narrow. Avoid unrestricted network access unless you are
intentionally using a broader trust model.

