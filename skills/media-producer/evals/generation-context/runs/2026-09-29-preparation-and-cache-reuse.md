# Preparation and cross-thread template reuse

Date: 2026-09-29

Implementation verification, not a new autonomous agent session.

- The preparation scorer covers image, audio, and video; fresh cache rebuilds,
  stale payload reuse, split preparation, and redundant calls are failures.
- Studio Skills suite: 62 tests passed; 184 routes and 22 purposes validated.
- Real H3 cached HTML reused in two separate CLI processes: 858 ms and 600 ms.
  Shared manifest, schema, and HTML remained byte-identical. Task payloads differed.
- Combined script against a temporary cache with the current template contract:
  initial miss followed by fresh preparation in 585 ms and 550 ms across separate
  CLI processes. Both instances carried their respective new payloads.
- Real H3 request passed generation prepare with no diagnostics, the existing
  request hash, and Studio Preview delivery. No generation was submitted.
- Domain/runtime tests cover validation failure before Preview, failed delivery,
  document edits during validation, opaque payload escaping, oversized instances,
  shared cache protection, and non-fresh statuses without instance writes.

Next session observation should verify the agent invokes the combined script,
uses Prepare after accepted settings, retains the confirmation pause, and runs
Execute directly with the returned hash. Existing cache entries invalidate once
for the narrower contract. Installed plugin copies need updating to these skills.
