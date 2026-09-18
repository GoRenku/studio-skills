---
name: install-renku
description: Install the Renku runtime on macOS or Windows, launch Studio in a visible terminal, and guide Project Library and optional API-key setup. Use for installing Renku, starting it again, or resuming initial setup after the skills plugin is installed.
---

# Install Renku

Take the user from an installed skills plugin to a running local Studio and a
configured Project Library. No movie project, Renku executable, source checkout,
Node.js, or package manager is required to begin. This skill installs the runtime;
it does not reinstall the plugin that supplied it.

## Inspect and install

Read [Platform installation](references/platform-installation.md) for host
detection, official installers, launcher paths, and visible terminal commands.

1. Identify the actual local desktop OS, architecture, and available shell.
   Distinguish the user's computer from an agent's remote/container/WSL shell.
   Ask which computer to target only when the available context cannot establish
   it. If local execution is unavailable, guide local actions and state that
   limitation instead of installing on the remote host.
2. Locate `renku` and run `renku about`. Reuse a working installation. Check the
   documented launcher path before treating a missing PATH entry as a missing
   install. If the command belongs to another product or is broken, explain the
   finding before a targeted repair; do not overwrite an unrelated executable.
3. If absent, run the official installer for the supported platform. The user's
   installation request authorizes this work; follow actual tool approval
   requirements without inventing a second confirmation gate. Preserve checksum
   verification. Report download, extraction, or smoke-check failures and stop
   that attempt; do not bypass verification or switch to a source build.
4. Verify the installed launcher with `about`. Use its full path in the current
   session if PATH has not refreshed. The installer may require restarting
   terminals or agent apps for future command discovery; setup can continue
   using the full path now.

## Start Studio in a visible terminal

Run `renku studio server status --json` using the resolved executable. If a live
canonical Studio server exists, reuse it and open its URL. Do not start a second
server or assume this skill owns the existing terminal/process.

Otherwise open a **fresh, dedicated visible terminal window** and run
`renku studio start` there. Prefer native programmatic launch from the platform
reference. If unavailable, use desktop Computer Use when the host exposes it:
open the terminal app, create a new window, inspect its prompt, then enter the
properly quoted command. Never type into an arbitrary existing session. If
neither automation route is available, guide the user through the same visible
terminal launch and resume verification afterward.

The terminal owns the foreground server independently of the agent tool session.
Do not replace it with a hidden agent session, daemon, login item, or background
service. Do not change the user's terminal preferences.

Verify the status reports a running canonical server and that the browser loads
Studio at the reported URL (normally `http://localhost:5173`). A successful
terminal-launch command alone is not proof that Studio started. If browser tools
are unavailable, give the URL and obtain the user's confirmation. On a port
conflict, report it without killing an unrelated process or inventing another
port. See the reference for existing failure codes.

Explain: **“This window runs Renku. You can minimize it; keep it open while using
Studio.”** Stopping the command with Ctrl+C or closing its terminal session stops
Studio; closing a browser tab does not. The user can later ask “Start Renku” or
run `renku studio start` in a terminal. When reusing a server, report any unknown
process ownership rather than claiming a new dedicated window was created.

## Guide first-run setup

Use the existing Studio controls, with browser automation if available or
step-by-step user guidance otherwise. Do not write config files or databases.

- On **Welcome to Renku**, show the recommended Project Library path and guide
  **Use this Project Library**. Defaults are `~/Movies/Renku` on macOS and
  `%USERPROFILE%\Videos\Renku` on Windows; the actual UI is authoritative.
- If the user requests a custom location before setup, use the existing
  `renku init <storage-root>` command with their chosen path, then reload Studio.
  This is not a library relocation operation. Preserve existing configuration.
- A valid existing configuration skips onboarding. An invalid one is a blocking
  error: report it without deleting, resetting, or overwriting it.
- After initialization, guide **Provider API keys**, or let the user choose
  **Skip for now**. The provider step is session-only: after a reload or earlier
  initialization, resume keys through **Open Settings**, not by restarting setup.

## Help with provider keys

Keys are optional for exploring Studio. Help only with providers the user wants
to use; do not require every account or select paid services for them. The current
managed fields are Fal.ai, Pika, Replicate, WaveSpeed, ElevenLabs, and World Labs.
Use the fields actually shown by the installed Studio; if they differ, explain
the installed-version difference rather than inventing fields or editing `.env`.

Start from the provider links in the official
[Quick Start](https://gorenku.com/quick-start/#providers). Check the selected
provider's current official instructions for creating an API key. Help the user
find the right account page; account sign-in and billing remain user actions.
Codex sign-in does not supply media-provider credentials.

Ask the user to enter keys **directly in Studio**, then choose **Save and
continue** (onboarding) or **Save** (Settings). Do not ask them to paste keys into
chat, put secrets in shell commands, read `.env`, or inspect/capture populated
secret inputs. Pause browser inspection during entry; after saving, inspect only
the masked saved/Replace state, or rely on the user's confirmation. Keys apply
across projects on this device. Saving confirms storage, not provider access or
available credit; do not run paid generation as an installation test.

## Finish and hand off

Report what is observed versus user-confirmed: platform, CLI installation,
reachable Studio, the terminal that must remain open, Project Library, and keys
saved or explicitly skipped. If any step remains pending, say so rather than
calling setup complete.

Offer guided **Create Project** and alignment of the agent's project folder with
the film's folder. Obtain the user's title; do not create a sample movie by
default. Follow the existing Studio creation flow. For screenplay import or
creative work, hand off to the appropriate installed screenplay or movie-director
skill once requested. Installation does not include automatic imports or paid
generation.
