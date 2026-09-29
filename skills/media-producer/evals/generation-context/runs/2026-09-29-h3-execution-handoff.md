# H3 execution handoff regression

Source session: `01a0ee04-c8c7-7203-8791-b2c7c654305e`.

The confirmed turn's recorded user message was at 16:39:08.395 UTC. Execute
started at 16:39:37.604: 29.209 seconds later. This corrects the initial
49-second estimate. Reading the request took about 0.4 seconds, standalone
validation took 1.9 seconds, model/tool handoff gaps took about 17 seconds, and
elevated command launch gaps accounted for about 10 seconds. Launch gaps cannot
be attributed exclusively to permission review from this trace.

Execute completed with a downloaded artifact at 16:40:10.517. Import completed
at 16:41:35.897. The first editor-open attempt at 16:41:55.233 returned queued;
the final response embedded the video around 16:42:20. The agent manually
reconstructed provenance despite Execute returning the exact object. The
Visualize skill was listed, but an empty tool-name search was incorrectly
followed by skipping inline configuration.

Changes are shared skill instructions and evals: unchanged-document check plus
execution in one tool operation, validation retained inside Engines, Visualize
discovery from the skills catalog, immediate artifact presentation before review,
and exact serialization of returned provenance and paths. Fal and Pika had
contradictory post-confirmation instructions; those were corrected. No production
runtime, Settings, permission policy, schema, or CLI command changed.

Verification: 50 media-generation tests and 85 Engines tests passed. Eight new
tests exercise the evaluation scorer, including the observed H3 event order,
edited prompts/settings/references, queued playback, and receipt preservation.
The expanded manual suite covers all five external providers where their routes
support each media kind. It has not yet been run as independent agent trials;
no new paid generation or end-to-end timing claim is made. The optional Python
skill validator could not run because PyYAML is absent; the repository's own
media-skill validation passed. Installed plugin files were not updated.
