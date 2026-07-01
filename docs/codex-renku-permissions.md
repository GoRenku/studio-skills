# Codex Permissions For Renku Skills

Codex permission profiles are the best way to give Renku skills the local
access they need without granting broad access to the rest of your machine or
network.

This guide is for Codex users who want Renku skills such as
`movie-director`, `scene-shot-designer`, `media-producer`, `lookbook-designer`,
`casting-director`, and the screenplay skills to work without repeated
permission prompts.

Permission profiles are still beta in Codex. The examples below use the newer
`default_permissions` and `[permissions.<name>]` model. Do not mix this model
with the older `sandbox_mode` / `sandbox_workspace_write` settings in the same
effective Codex config.

## Recommended Approach

For Renku Studio work, start from Codex's built-in `:workspace` profile and add
only the Renku-specific pieces:

- read access to Renku's global config directory;
- write access to your active Renku project, through workspace roots;
- loopback network access for the running Studio app;
- provider network domains only for the generation providers you use.

Extending `:workspace` is important. It preserves Codex's built-in workspace
behavior, including write access to active workspace roots and temp directories,
while keeping protected workspace metadata such as `.git`, `.codex`, and
`.agents` read-only unless you explicitly override those protections.

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

## Step 1: Open Your Codex Config

Codex reads user configuration from:

```text
~/.codex/config.toml
```

Create the file if it does not exist.

This document uses a Codex **permission profile**, configured under
`[permissions.<name>]`. That is different from a Codex configuration profile
started with `codex --profile <name>`.

## Step 2: Remove Older Sandbox Settings

Permission profiles do not compose with the older sandbox settings. Before
using the profile below, remove or comment out older settings such as:

```toml
sandbox_mode = "workspace-write"

[sandbox_workspace_write]
network_access = true
```

Also check selected Codex configuration profiles. If a selected config profile
sets `sandbox_mode`, Codex will use the older sandbox settings instead of
`default_permissions`.

For managed enterprise deployments, `allowed_permission_profiles` is the
exception: when that managed allowlist is present, Codex uses permission
profiles. In a mixed-version rollout, administrators may temporarily keep older
managed `allowed_sandbox_modes` requirements until all clients are on a version
that supports custom permission profiles.

## Step 3: Add The Base Renku Profile

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

[permissions.renku-studio]
description = "Renku Studio project editing with local Studio refresh."
extends = ":workspace"

[permissions.renku-studio.workspace_roots]
# Add the parent folder where you keep Renku movie projects.
# Every current Codex workspace root also counts automatically.
"~/renku-movies" = true

[permissions.renku-studio.filesystem]
# Renku provider credentials are read from ~/.config/renku/.env.
# Keep this read-only; edit credentials yourself.
"~/.config/renku" = "read"

# Needed only because the deny rules below use unbounded globs. This matters
# most on Linux, WSL, and native Windows, where Codex may pre-expand deny globs
# before the sandbox starts.
glob_scan_max_depth = 4

[permissions.renku-studio.filesystem.":workspace_roots"]
# Keep common project-local secret files unreadable. Store Renku provider
# keys in ~/.config/renku/.env instead of project-local .env files.
"**/.env" = "deny"
"**/.env.*" = "deny"

[permissions.renku-studio.network]
enabled = true

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

### Local Hostname Note

For the default Studio URL, the exact `localhost`, `127.0.0.1`, and `::1`
allow rules are enough.

Only add `allow_local_binding = true` if your local setup uses an allowlisted
hostname that resolves to a local or private address, such as a custom
development hostname:

```toml
[permissions.renku-studio.network]
enabled = true
allow_local_binding = true

[permissions.renku-studio.network.domains]
"studio.local" = "allow"
```

Leave it unset for ordinary Renku Studio use. Local and private network access
is intentionally guarded because those destinations may expose sensitive local
services.

## Step 4: Add Provider Domains You Actually Use

The base profile is enough for local screenplay, cast, location, lookbook,
shot-list, storyboard import, and Studio refresh workflows. Live media
generation needs network access to the selected provider.

Add only the provider domains you use. A command that can read provider
credentials and reach a broad network allowlist has a much larger trust
boundary than one that can reach only the provider API it needs.

Do not duplicate `[permissions.renku-studio.network.domains]` multiple times in
the final file. TOML tables should appear once; merge the entries you need into
one table.

### fal.ai

Use this for Renku-managed fal.ai image, video, audio, and Kling voice-control
workflows.

```toml
[permissions.renku-studio.network.domains]
"localhost" = "allow"
"127.0.0.1" = "allow"
"::1" = "allow"

"fal.run" = "allow"
"**.fal.run" = "allow"
"rest.fal.ai" = "allow"
"fal.ai" = "allow"
"**.fal.ai" = "allow"
"fal.media" = "allow"
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

## Recommended All-In-One Domain Table

If you want one profile that supports the currently known Renku providers, use
this combined domain table:

```toml
[permissions.renku-studio.network.domains]
"localhost" = "allow"
"127.0.0.1" = "allow"
"::1" = "allow"

# fal.ai
"fal.run" = "allow"
"**.fal.run" = "allow"
"rest.fal.ai" = "allow"
"fal.ai" = "allow"
"**.fal.ai" = "allow"
"fal.media" = "allow"
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

Avoid the global network allow rule unless you intentionally want broad public
network access:

```toml
[permissions.renku-studio.network.domains]
"*" = "allow"
```

That setting is convenient, but it is not a least-privilege Renku profile.

## Optional: Local Renku Development

End users normally do not need this. Add these roots only if you are developing
Renku Studio or the Renku skills themselves:

```toml
[permissions.renku-studio.workspace_roots]
"~/renku-movies" = true
"~/Projects/aitinkerbox/studio" = true
"~/Projects/aitinkerbox/studio-skills" = true
```

## Optional: Unix Sockets

Renku Studio workflows normally do not need Unix socket access. Do not enable
Docker or other local daemon sockets unless a specific local development task
requires them.

If you do need Docker for a Renku development workflow, allow only the exact
socket path:

```toml
[permissions.renku-studio.network.unix_sockets]
"/var/run/docker.sock" = "allow"
```

Avoid `dangerously_allow_all_unix_sockets = true`. It is a broad local escape
hatch, not a normal Renku setting.

## Step 5: Restart Or Start A New Codex Session

After editing `~/.codex/config.toml`, restart Codex or start a new Codex
session so the profile is loaded.

If you made it the default with:

```toml
default_permissions = "renku-studio"
```

new sessions should use it automatically.

If you did not make it the default, choose the `renku-studio` permission profile
when you start Renku work.

## Step 6: Verify The Profile

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

## Best Practices

- Prefer `extends = ":workspace"` over rebuilding the whole profile by hand.
  That keeps Codex's default workspace protections in place.
- Keep Renku provider credentials in `~/.config/renku/.env`, and grant the
  config directory read-only access.
- Keep project-local `.env` files denied so they cannot become a second
  provider-credential source.
- Add provider domains only when a workflow needs them.
- Keep `approval_policy = "on-request"` for Renku work so Codex can ask before
  leaving the profile.
- Leave network proxy listener settings at their defaults unless you are
  integrating with a special runtime.
- Avoid `:danger-full-access`, `dangerously_allow_non_loopback_proxy`, and
  `dangerously_allow_all_unix_sockets` for ordinary Studio use.
- Treat generated media folders as normal project data. If they live outside
  the active project root, add that directory as a workspace root instead of
  granting broad filesystem access.

## What This Profile Does Not Control

Permission profiles govern sandboxed local commands Codex runs on your machine.
They do not directly control:

- Codex app connectors or MCP tools;
- browser, Chrome, or computer-use surfaces;
- Codex cloud environment internet settings;
- commands the user explicitly approves to run outside the sandbox;
- Codex built-in tools such as built-in image generation.

Those surfaces have their own authorization and safety controls. For Renku, the
profile mainly matters when Codex runs local commands such as `renku ...`,
package-manager commands, or helper scripts.

## Troubleshooting

### Codex Still Uses The Old Sandbox

If your new profile appears to be ignored, check for older sandbox settings in
any loaded config file:

- `sandbox_mode`
- `[sandbox_workspace_write]`
- CLI flags such as `--sandbox`
- a selected config profile that sets `sandbox_mode`

Codex uses those older settings instead of `default_permissions` unless a
managed `allowed_permission_profiles` requirement forces permission profiles.

### CLI026 After A Successful Mutation

`CLI026` means the project mutation succeeded, but Studio was not notified.
Do not rerun a non-idempotent command just to refresh Studio; that can duplicate
shot lists, media imports, or generation records.

Check:

- the `renku-studio` profile is active;
- `[permissions.renku-studio.network].enabled = true`;
- `localhost`, `127.0.0.1`, and `::1` are allowlisted;
- Studio is running on the expected port, normally `5173`;
- if you use a custom local hostname, that hostname is allowlisted and
  `allow_local_binding = true` is set.

### The Profile Feels Narrower Than `:workspace`

This usually means the profile hardcoded too few workspace roots, or it was
created from scratch instead of extending `:workspace`.

Use:

```toml
[permissions.renku-studio]
extends = ":workspace"
```

Then either:

- open Codex with the movie project folder as a workspace root; or
- add the parent folder that contains your Renku projects under
  `[permissions.renku-studio.workspace_roots]`.

### Temp File Or Cache Permission Errors

The recommended profile inherits temp-directory write access from `:workspace`.
If you created a profile from scratch instead, make sure it includes:

```toml
[permissions.renku-studio.filesystem]
":tmpdir" = "write"
":slash_tmp" = "write"
```

Renku media workflows often need temp space for generated sheets, crops,
downloads, and provider SDK internals.

### Provider Credentials Are Missing

Renku generation providers read credentials from one file:

```text
~/.config/renku/.env
```

Make sure the profile includes:

```toml
[permissions.renku-studio.filesystem]
"~/.config/renku" = "read"
```

If provider keys exist in a project-local `.env`, move them to
`~/.config/renku/.env`. Do not remove the project `.env` deny rules just to
make provider credentials work.

### A Live Provider Is Still Blocked

Read the denied hostname from the Codex permission error and add the exact
provider hostname to `[permissions.renku-studio.network.domains]`.

Keep the allowlist narrow. Avoid unrestricted network access unless you are
intentionally using a broader trust model.

### Provider Run Fails With `fetch failed`

If `renku generation run` gets past credential/env loading but fails with only
`fetch failed`, first confirm the active Codex session is using the
provider-enabled permission profile. Defining `[permissions.renku-studio]` in
`config.toml` does not affect a session that is still running under
`:workspace` or another profile with network disabled.

For fal.ai image generations that use project references, the first provider
network request may be a file upload for selected Lookbook, Location Sheet, or
Character Sheet images, before the model request itself starts. That path needs
the fal.ai API domains and the storage/upload/download domains listed above.

A quick diagnosis is:

```bash
curl -I -sS https://rest.fal.ai
curl -I -sS https://storage.googleapis.com
```

Run those checks inside the same Codex permission context as the failing
generation command. If they fail inside the sandbox but work outside it, fix the
active permission profile or domain allowlist before retrying the paid
generation. Do not rewrite a validated Renku generation spec, remove
`referenceMode`, add provider URLs by hand, or switch to local image processing
just because the provider upload could not reach the network.

### Glob Denies Behave Differently Across Platforms

The profile uses:

```toml
[permissions.renku-studio.filesystem]
glob_scan_max_depth = 4

[permissions.renku-studio.filesystem.":workspace_roots"]
"**/.env" = "deny"
"**/.env.*" = "deny"
```

On Linux, WSL, and native Windows, Codex may pre-expand unbounded deny globs
before sandbox startup. If startup becomes slow in very large project trees,
either reduce the scan depth or replace the unbounded patterns with explicit
depths such as:

```toml
[permissions.renku-studio.filesystem.":workspace_roots"]
".env" = "deny"
".env.*" = "deny"
"*/.env" = "deny"
"*/.env.*" = "deny"
"*/*/.env" = "deny"
"*/*/.env.*" = "deny"
```
