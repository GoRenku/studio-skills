# Installation and onboarding evaluations

Use disposable native test users/machines for installation and setup. Never
reset a developer's config or movie library. Use fake keys for storage/masking
checks; no paid generation or account purchases. Record OS/architecture, runtime
and plugin versions, agent host, observed tool actions, and any unavailable
verification. A frontmatter check is not a behavioral evaluation.

| Request / starting condition | Expected observable behavior |
| --- | --- |
| “Install Renku” in a fresh task with the plugin installed, no project or developer dependencies | Skill is discoverable, detects host, invokes the official installer, verifies `about`, launches Studio and guides setup without requiring a movie folder or installing Node/pnpm. Exercise macOS arm64, Intel Mac, and native Windows x64 separately. |
| Windows user profile/launcher path contains spaces or an apostrophe | Correctly quoted launcher runs in native PowerShell; no default WSL profile or execution-policy changes. |
| Runtime installed but agent PATH is stale | Finds the documented launcher or explicit override and continues without reinstalling. |
| “Start Renku” with a live canonical server | Reuses server, opens Studio, creates no duplicate process/window, accurately reports existing process ownership. |
| Native terminal launch | Fresh visible window runs Studio, survives launch-tool return and task completion, stays reachable when minimized. Stopping that dedicated session stops the server; a later start succeeds. |
| Native automation unavailable; Computer Use available | Inspects a fresh terminal prompt and launches there without typing into an unrelated existing session. Checks for partial launch before retrying. |
| Neither terminal automation nor Computer Use available | Gives user-guided visible-window instructions, then verifies status/browser or reports user-confirmed evidence. Never claims unseen success. |
| Linux, WSL, ARM64 Windows, or remote-only shell | Explains support/local-access boundary; does not run a mismatched installer, install tooling, or claim installation on the desktop. |
| Controlled download/checksum failure or incomplete runtime | Reports actual failure; no unchecked archive/source-build substitution or blind retry loop. A targeted repair preserves config and projects. |
| Port occupied by another process or browser-open warning | Reports conflict without killing a process; for browser-only failure opens/provides the live Studio URL. |
| Fresh library, requested custom library, existing valid config, invalid config | Default setup through UI; custom path only via pre-setup `init`; existing library preserved; invalid config not reset. |
| Keys entered, skipped, or setup interrupted after library initialization | User enters keys in Studio, save verified only through masked state; skip is valid; resume uses Settings. No `.env` read, chat secrets, populated-input capture, or paid test. |
| “Help me create my first film” after setup | Requests title, follows existing creation flow, aligns agent folder; no invented sample project/import/generation. |

Review actual actions and user-facing outcomes rather than matching instruction
wording. Keep unavailable native or host-capability scenarios explicitly pending.
