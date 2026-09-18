# Platform installation and visible launch

Use these commands through the host's local shell tools. Replace sample paths
only with observed installation paths, quoted for the shell. Never require a
movie project or developer dependencies for bootstrap.

## macOS

Inspect `uname -s`, `uname -m`, and `command -v renku`. Released targets are
Darwin arm64 and x86_64. Under a translated shell, `uname -m` can describe the
translated architecture; use a native arm64 shell on Apple silicon when
available rather than claiming an Intel machine from that output alone.

Check an existing resolved executable with `about`. If PATH lookup fails, the
default launcher is `$HOME/.local/bin/renku`. An existing
`RENKU_BIN_ROOT` override changes that location; inspect only relevant path
variables, not the full environment, which can contain secrets.

If installation is needed:

```sh
curl -fsSL https://downloads.gorenku.com/install.sh | sh
```

The installer selects the archive, verifies SHA-256, smoke-checks its private
Node runtime, and activates a version beneath `$HOME/.local/share/renku` by
default. `RENKU_INSTALL_ROOT` and `RENKU_BIN_ROOT` are supported overrides.
Use existing explicit overrides; do not invent them to bypass a permission
failure. Installer PATH changes affect future login shells and restarted apps.

Verify using the actual launcher; default-path example:

```sh
"$HOME/.local/bin/renku" about
"$HOME/.local/bin/renku" studio server status --json
```

### Dedicated Terminal window

On macOS, Terminal's AppleScript `do script` without a target creates a new
window. Pass the executable path as an argument rather than interpolating it
into AppleScript source. AppleScript's `quoted form` protects the shell path.
For a default installation:

```sh
osascript - "$HOME/.local/bin/renku" <<'APPLESCRIPT'
on run argv
  set renkuPath to item 1 of argv
  tell application "Terminal"
    activate
    do script ((quoted form of renkuPath) & " studio start")
  end tell
end run
APPLESCRIPT
```

Use the resolved path for non-default installs. macOS may require permission
for the calling app to control Terminal. Respect that system prompt. If the
operation fails, inspect whether a window/server was created before retrying;
use Computer Use or guided launch if that is the available route. Do not change
automation permissions programmatically.

## Windows

Run native PowerShell on the user's desktop. Inspect:

```powershell
[Environment]::OSVersion.Platform
$env:PROCESSOR_ARCHITECTURE
$env:PROCESSOR_ARCHITEW6432
[Environment]::Is64BitOperatingSystem
Get-Command renku -ErrorAction SilentlyContinue
```

The published target is `win32-x64`. A 64-bit OS check alone does not establish
x64 support on ARM64; do not promise native ARM64 support. WSL is not the native
installation environment. Detect emulation/host ambiguity before installation.

If installation is needed:

```powershell
irm https://downloads.gorenku.com/install.ps1 | iex
```

By default the install root is `%LOCALAPPDATA%\Renku`, and launchers are under
its `bin` directory. `RENKU_INSTALL_ROOT` changes the root and default bin;
`RENKU_BIN_ROOT` explicitly overrides bin. Use the actual installer-reported
path. User PATH updates affect future processes; the current app may need a
restart. Prefer the `.cmd` launcher so a `.ps1` execution policy does not prevent
ordinary runtime launch; do not weaken execution policy.

Default-path verification:

```powershell
$renkuLauncher = Join-Path $env:LOCALAPPDATA 'Renku\bin\renku.cmd'
& $renkuLauncher about
& $renkuLauncher studio server status --json
```

### Dedicated visible Windows window

Launch an explicit native Windows PowerShell shell so a user's default Windows
Terminal profile cannot silently select WSL. Use Windows Terminal when `wt.exe`
is available, otherwise open a visible PowerShell process. This example encodes
only the launch command for reliable transport through process argument parsing;
it contains no credentials. `-EncodedCommand` does not bypass execution policy.

```powershell
# Set this to the observed launcher path if installation used overrides.
$renkuLauncher = Join-Path $env:LOCALAPPDATA 'Renku\bin\renku.cmd'
$launchCommand = "& '" + $renkuLauncher.Replace("'", "''") + "' studio start"
$launchEncoded = [Convert]::ToBase64String([Text.Encoding]::Unicode.GetBytes($launchCommand))
$nativePowerShell = Join-Path $env:SystemRoot 'System32\WindowsPowerShell\v1.0\powershell.exe'
$windowsTerminal = Get-Command wt.exe -ErrorAction SilentlyContinue
if ($windowsTerminal) {
  & $windowsTerminal.Source -w new new-tab --title 'Renku Studio' $nativePowerShell -NoLogo -NoProfile -NoExit -EncodedCommand $launchEncoded
} else {
  Start-Process -FilePath $nativePowerShell -ArgumentList @('-NoLogo', '-NoProfile', '-NoExit', '-EncodedCommand', $launchEncoded)
}
```

Keep the window visible; `-NoExit` also leaves failures readable. These native
Windows instructions require Windows acceptance testing; do not infer success
from macOS evaluation. See Microsoft's
[Terminal arguments](https://learn.microsoft.com/en-us/windows/terminal/command-line-arguments)
and [Start-Process](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/start-process).

## Computer Use and user-guided launch

When programmatic terminal launch is unavailable, use the desktop tools the
active host actually provides. Open Terminal on macOS or a native PowerShell
window on Windows, create a new window, inspect the prompt, and enter the quoted
full executable path followed by `studio start`. Do not type into an existing
busy session or assume that a generic Windows Terminal tab uses PowerShell.

If desktop control is unavailable, give the same steps to the user. Once they
start the server, verify through `studio server status --json` and the browser
where possible; label user-confirmed steps honestly.

## Readiness and focused recovery

- `INSTALL001`: unsupported platform. State the released targets; do not install
  an alternate OS runtime or add WSL as a workaround.
- Download, checksum, or extraction failure: retain the failure output without
  exposing secrets; stop the attempt. Never skip the checksum or repeatedly
  reinstall without addressing the cause.
- `INSTALL005`: PATH changed for future processes, not installation failure.
  Use the full launcher path now.
- `CLI161`: incomplete runtime. Explain the error and use the official installer
  for a targeted repair; preserve existing user configuration and projects.
- `CLI162`: occupied Studio port. Identify/report the conflict; do not kill an
  unrelated process or switch to an undocumented port.
- `CLI163`: Studio is running but browser opening failed. Open the reported URL
  with available browser tools or give it to the user.
- Invalid config or unwritable library: surface Studio's error and requested
  correction; do not delete configuration to force onboarding.

Read sanitized CLI status, not raw runtime descriptor files containing tokens.
Confirm `server.running` and `server.descriptor.matchesCanonical`, then verify
the Studio page. Terminal launch success, a generic HTTP response, and a saved
provider key are not substitutes for their respective readiness checks.
