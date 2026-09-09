# Implementation evaluation — 2026-09-08

## Runtime and skill checks

- Studio root build, check (types, lint, architecture and release checks) and full
  unit suites passed: 964 tests across 231 files. One initial concurrent-run timeout in the existing project
  deletion test passed both a focused rerun and the next full run.
- Core tests exercise exact source snapshots, revision retry identity, changed-source
  history, missing/opaque playback metadata, generation-context candidates, AI take
  separation, temporary cleanup preservation, traversal/source-link rejection,
  registered-file protection, partial cleanup and linked render destinations.
- CLI tests cover exact Project/plan/path delegation, JSON output and notification
  behavior. Studio tests cover route auth/delegation/errors, confirmation/cancel,
  result reporting and unchanged settings autosave behavior.
- Skill creator validation and the sister repository's full `pnpm test` passed.

## Isolated authoring exercises

Artifacts were made outside the real movie at `/tmp/renku-previs-eval-0200/`.
No existing Harbor media/source file or selected Asset was changed by the eval.
After verification, the accepted additive schema migration was applied to Urban
Basilica through Renku with verified backups; all existing ids were preserved.

### Harbor

Copied the actual current Scene-specific builder/motion/config. Retained its
960×540, 24fps Workbench setup and geometry. Added an early shoulder/lean example,
kept the centered base camera and existing later stop/slow turn, and derived the
speaking performance cue plus playback metadata from the third dialogue turn's
8–11-second interval. Resolved the exact Scene line as “Then do not go to him.”

The 408-frame, 17-second MP4 fully decoded. Rebuilding an earlier frame from its
retained source/config produced identical decoded pixels (FFmpeg PSNR infinity);
PNG file bytes differed in metadata. Event frames 1, 193, 265, 313 and 408,
and a 2fps motion contact sequence were inspected. The three-second settled hold
was checked separately from approach/turn in the motion evaluator. Side-swap was
exercised in a separate config and rendered preview. The requested lean is visible;
the shoulder is tight and illustrates why a numerical camera check alone is
insufficient. These are workflow evals, not a new director-approved movie revision.

The route-space +X check reproduced the old world-Y look-ahead, then exercised a
local correction: the aim moved 0.65m along +X. A shortest-angle 179→−179 check
returned 181°, avoiding a full spin mathematically. This does not establish that
an angular-boundary defect was visible in the original Harbor bake. Local examples
also exercised side coordinates, stable cue replacement/order and finite/lens/fade
preflight checks; they are not a shipped reusable motion engine.

### The First Patron

Read the actual Scene dialogue and inspected the Council Chamber production sheet,
Urban and Loukas character sheets. Authored an independent 8-second plan with
left windows/columns, icon wall, long council table, chairs, drawing, ledgers and
nearly empty coin tray. Distinct proxies form the three-person negotiating triangle.
A parameterized 24mm push and Loukas' third Scene dialogue turn drive the sample.

Built a saved `.blend`, rendered frames 1–96, then resumed with 97–192 from that
file. The first range took about 6.25s and the second 5.62s in this local run.
Encoded twice from those same frames without invoking Blender again. The resulting
192-frame, 960×540/24fps, 8-second MP4 decoded successfully. The mid/end composition
was inspected for spatial readability; this block previs is not a photoreal output
or director-approved coverage. The parameters and source remain editable.

Blender 5.2.1 crashed during sandbox startup before script evaluation. The same
isolated commands succeeded with macOS graphics access. FFmpeg/FFprobe were used
for encoding and decode checks. A direct attempt to overwrite a completed build exited with code 1 before writing.
The new entrypoint guidance separates this failure
from Python/dependency errors and protects completed outputs at direct writers.

## Media handoff exercises

Prepared separate native request fixtures for H3 Max, Seedance 2.5, Seedance 2.0
and Wan 3.0 Prime in Media Producer's `previs-native-requests.json`, with dated API
sources. H3/Wan use `reference_*_urls` and integer duration; Seedance uses its own
arrays and string duration. Seedance 2.0's no-dialogue case supplies no audio file.
Fixtures use inert example URLs and were not submitted to a provider.

The 17→15 time map was checked: 8s→7.0588s, 11s→9.7059s; the 3s hold becomes
2.6471s. That derivative needs director agreement when the hold is locked. A
selected speech performance stays unmodified. Reordered references require new
mentions; excessive selected audio or a missing modality requires a route/input
choice, not silent omission. A First Patron request assigning turn3 to Mara would
conflict with the current Scene's Loukas line and needs clarification.

No paid generation was run. The exploration's accepted H3 take remains the prior
quality/timing evidence: arrival around 8–9s versus intended mapped 7.06s. Its
speech was not newly listened to or transcribed. Visual review used sampled
sequences/event frames and full decode, not a claim of frame-by-frame or audio
perceptual certification. Future directing evals retain the detailed scenarios in
`director-iteration.md`; these results distinguish executed checks from guidance.
