# Authoritative model discovery

Implementation verification; no paid generation or autonomous agent timing claim.

- Discovery prints Core-owned query matches with optional skill-owned guide
  paths. It does not save a catalog or accept a retained catalog as input.
- Live `H3 Max` discovery returned 16 matching routes and resolved model guides
  from the current installed indexes through the rebuilt CLI.
- Visualization preparation supplies all installed index paths to Core, which
  merges them with the personal library and derives the full-list digest.
  Non-fresh results return the complete selector routes; fresh hits reuse HTML.
- Core tests cover generic identity queries, personal precedence, complete-list
  digest preservation, and cache invalidation when current model sources change.
- CLI tests cover argument forwarding and the preparation/store/inspect flow.
- Skill tests prove discovery writes no catalog, and preparation retains the
  Core-resolved dependency descriptor for existing cache operations.
- Media-generation suite: 64 tests passed; provider and purpose validation passed.
- Focused Core: 18 tests passed; CLI: two tests passed. Core/CLI builds and root
  `pnpm check` passed, including architecture checks.

The existing per-thread catalog instructions and file-reuse tests were replaced.
Existing temporary verification files were not deleted. The installed plugin
must be refreshed before using these updated scripts in another agent session.
