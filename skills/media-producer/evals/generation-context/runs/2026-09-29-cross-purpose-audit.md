# Cross-purpose generation briefing audit — 2026-09-29

## Scope and implementation

The character-sheet sessions exposed workflow problems that also affect other
media. The audit checked the existing 22-purpose coverage inventory, the shared
Core generation-context registry, CLI context presentation, Media Producer
guidance, department handoffs, and provider skill ownership.

Core report construction and CLI text/JSON presentation already serve all
generation purposes. This follow-up changes skill guidance and evaluation code;
it adds no runtime filtering, purpose-based context pruning, commands, or schema.

Shared guidance now requires complete, contiguous briefing reads through the end
before request authoring, in either text or JSON. Capturing a file or searching
headings does not establish complete reading. After Preview, execution consumes
the exact saved request instead of manually retyping it. These rules apply to
image, audio, video, and edit workflows.

Specific instruction gaps corrected:

- Shot Image no longer forces JSON for direct reading.
- Shot Plan Video and Blender Previs reuse a complete current briefing, refreshing
  after relevant dependency or state changes.
- Cast Voice Sample and Shot Plan Dialogue Audio use the briefing's provider
  policy with explicit user overrides instead of another Settings read.
- Lookbook workflows reuse exact known targets and the briefing's inventory;
  role-resolution commands are alternatives, not a mandatory pair.
- Casting, Production Design, Lookbook Design, Scene Beat Design, and Shot
  Planning route generation for existing targets directly to Media Producer.
- Movie Director accepts focused mutation results for completion rather than
  automatically fetching generation and director context again.
- Selected Shot Image handoffs use shared provider, Preview, and approval rules
  and pass known identities instead of demanding redundant reports.
- Reference guidance distinguishes facts worth preserving from prior deliverable
  directions without removing any creative context from the briefing.

Required target/revision resolution, changed-state refreshes, authoring source
reads, provider execution requirements, and visual review remain. Location World
is a separate specialist workflow, not a generation-context purpose; its required
source-image and world-preparation reads remain in that workflow.

## Evaluation evidence and limits

`pnpm test:media-generation` passed 42 tests and validated 184 provider routes,
22 purposes, and 27 cross-cutting evaluation requirements.

The new evaluation-only range checker identifies omitted portions of actually
displayed reports. It reproduces the Loukas session's missing middle and tail,
and exercises complete, skipped-middle, and skipped-tail reads in both text and
JSON for all 11 existing representative briefing fixtures. Overlapping reads and
invalid ranges are also tested. It does not claim to measure agent attention or
understanding.

The forward evaluation suite now specifies all 22 purposes, complete-read and
creative-fact checks, routing, report reuse, exact saved-request execution, and
legitimate refresh cases. The 11 fixtures are representative report shapes, not
22 populated live-purpose trials. Independent agent runs of this expanded suite
have not been performed; unavailable purpose fixtures must be marked not run.

These changes address avoidable calls and incomplete reads. They do not establish
a fix for the separately observed 132-second post-attachment response interval.
No new media was generated for this audit. Installed plugin distribution was not
updated by this source change.
