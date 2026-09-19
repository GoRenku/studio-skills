# Personal model workflow

These commands need no active Project or running Studio. Use a runtime exposing
`renku generation models`; if unavailable, use the normal runtime update process.
Do not edit installed Skills or write the library JSON directly as a workaround.

1. Resolve the existing provider, exact route, and useful display name. Preserve
   namespaces, variants, and explicit Replicate versions.
2. Run `renku generation models list --json`. For bundled discovery, add repeated
   `--route-index <absolute-supported-routes.json>` paths from the current provider
   Skills. Keep the returned `revision`; use `absent` when it is null.
3. Write a temporary JSON object containing only `provider`, `apiId`, and `name`.
   When in a Project, use its `tmp/scratch/` directory; otherwise use a temporary
   working directory. Import with:

   ```bash
   renku generation models import --file <route.json> --if-revision <revision-or-absent> --json
   ```

4. Run `renku generation models show --provider <id> --model <exact-api-id> --json`.
   Verify the route. The returned `personalGuidePath` is an optional Markdown
   destination, not a required file. Create its parent directory only if saving
   advice. Read existing notes before editing them. Keep user preferences and
   unrelated edits; do not replace them wholesale with new research.
5. Report the route separately from any saved guidance or execution test.

A revision conflict means another edit happened: reread and reconcile the exact
route before a deliberate retry. Do not automatically rebase or replace unrelated
entries. A busy lock is not permission to steal it. For a stale lock, verify no
writer remains before manual recovery of the reported lock path.

To remove a personal discovery entry, use `generation models remove --provider
<id> --model <exact-api-id> --if-revision <revision> --json`. This preserves optional
notes and reveals any current bundled entry. Deleting notes is separate user intent.

Guidance resolution is independent of labels: current bundled advice supplies
curated defaults even when the discovery entry is personal. Personal research
adds context and explicit user preferences take priority. Later bundled updates
must not rewrite personal Markdown. Missing advice is ordinary absence; continue
without a warning, extra approval, or activation state.
