# CLI provenance handoff verification — 2026-09-29

Scope: plan 0216's four accepted improvements. Studio base at final verification
was `d41141627a4f4bdf2f90d7d5cf0a9f3970b24b5f`; Skills base was
`8bdd1a85794333bf016d9c087decb69ae19d18b7`, both with working-tree changes.

## Implementation evidence

Execute/Recover save exact import-ready provenance automatically and return its
path. Default output omits the recipe body; JSON remains complete. Validate
returns the exact source-byte SHA-256; Execute compares the supplied digest
before provider work. No provider/model logic, schema policy or Core attachment
rule changed.

The real CLI integration fixture used an injected provider, generated an image
file in an isolated Project, imported the saved provenance through `media import`,
and read it through the Core Inspector service. A Preview prompt edit failed the
old digest through the top-level CLI. After native request repreparation and
validation, execution accepted the new digest and retained the edited prompt.
Closing the stdout consumer after another fixture execution left its exact
published provenance available locally and did not trigger a provider retry.
No provider Recover was called. This is real local CLI/Core behavior with a
fixture provider, not a live paid generation or visual-quality evaluation.

Verification passed: 120 CLI unit tests, then the expanded six-case result suite
(three additional media-kind cases); 37 CLI integration tests, with the extended
Preview-edit integration rerun; 85 Engines tests; root `pnpm check` including
architecture and 57 release tests; 57 Skill tests plus route/purpose validators;
Skill frontmatter validation. The existing Studio `no-console` warning remains.
The nine existing Core configuration-cache tests also passed, covering fresh,
expiry, incompatible descriptors and optional-guidance independence.

## Independent continuation evaluation

An independent agent read current source Skills, without the implementation
explanation, and selected next actions for unchanged video, image and audio,
reviewed video attachment, changed Preview prompt, and fresh cache reuse.
Its choices used direct Execute with the retained digest, direct saved-provenance
import, changed-request preparation, and reuse of the existing catalog/cache.
No Renku command was executed in that evaluation. It is preparation-only
behavioral evidence, not a full autonomous workflow trial.

The evaluation exposed three wording conflicts, corrected in source:

- the shared opening sequence still requested an unconditional final reread;
- changed-request guidance put validation before the final atomic file write;
- cache guidance said to run model discovery even when its result was retained.

Purpose-specific import examples now use compact output, and the dialogue-audio
example directly consumes returned `provenancePath`. The source evaluation
artifact is local `/tmp/renku-0216-forward-eval.md`.

## Timing and session evidence

A warmed ten-run local benchmark measured source-byte hashing plus provenance
serialization/publication at median 0.430 ms, range 0.385–0.530 ms, with roughly
70 KB of request text and 45 KB of receipt text. It excludes startup, request
file loading, provider work, agent response and host scheduling. Raw local
measurements: `/tmp/renku-0216-timing.json`.

The visible-only session extractor processed the original H3 session
`01a0ee99-09db-7182-9e69-2413415a255f`: 75 visible events, 62 commands,
one Recover call. The private extracted trace remains local at
`/tmp/renku-0216-session-evidence.json`; no prompts or media bytes are checked in.

## Versions and limits

SHA-256 values at verification:

- Built Execute: `0e0a09b42500302b0599279d3c63bb30666eaa8fc132c5a0a4739483badc85c9`
- Built provenance writer: `97c6c6e7ceff684137c498e71d794a9a548c8effe6ea77c1aa631ec381e0c21a`
- Source Media Producer: `4323027295141b1ea87346724431cdb758cd7ab76a6f7597dde5a9382cdc70f7`
- Source shared workflow: `70568c2cd483e454de95b0ea7dcfffb84ad6b8b48cf6a521d21ff662dec70876`

No release, plugin installation, installed-cache edits, paid provider calls, or
new Codex image generation were performed. Full fresh-agent cached video trials,
desktop inline configuration/playback, and installed-plugin verification remain
open. Source instructions changing the existing template-contract fingerprint
may correctly invalidate an older cache once; a subsequent identical descriptor
must reuse a fresh entry. No end-to-end latency improvement is claimed yet.
