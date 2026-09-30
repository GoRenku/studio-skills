# Selection liveness and model discovery

Implementation verification, not a new autonomous generation session.

- Core coordination: 17 tests passed, including passive visible/hidden activity,
  explicit navigation to the library, and expiry after activity stops.
- Studio hook: two tests passed, including three minutes of hidden heartbeats
  and suppressing a library report while a project route loads.
- Native Chrome verification after a clean reload retained the exact Urban
  Basilica Shot Plan/Shot beyond two minutes hidden. Heartbeats at 21:51:29 and
  21:52:08 UTC kept the tab live while another window reported library activity;
  `studio current` still returned the selection at 21:52:46. The initial browser
  debugging run was inconclusive and required detaching and reloading.
- Media-generation skill suite: 65 tests passed. Discovery preserves the full
  Core catalog and digest, resolves optional bundled guidance, and supports a
  personal route or empty match without another CLI list call.
- Actual H3 Max discovery: 1.70 seconds for the complete catalog and matching
  guide paths. A second query from that saved catalog: 0.51 seconds, no CLI call.
- Behavior scorers cover full selector-catalog preservation, repeated discovery,
  missing selected guidance, enabled schema defaults, and explicit overrides.
  The forward-test scenario also includes absent and boolean expansion controls.
- Root `pnpm check`, Core build, and Studio build passed. The standalone
  skill-creator Python validator could not run because PyYAML is unavailable;
  repository-owned skill and purpose validators passed.

These measurements demonstrate command behavior, not total agent preparation
latency. A subsequent generation session must establish the end-to-end gain.
Refresh the installed Renku plugin before that session so it includes the new
discovery script and guidance.
