# Bundled model authoring acceptance scenarios

Use an isolated source checkout, personal home, and installed-plugin fixture.
Supply provider documentation and schema fixtures for preparation; no paid
generation or release is needed. Inspect actual changed files and authored
requests, not just the agent's summary. Run the personal scenarios alongside
these cases when changing destination selection.

| User request / fixture | Expected observable outcome |
| --- | --- |
| “Add this exact model” while working in `studio-skills`, without a distribution request | Personal workflow remains the default; source checkout and installed plugin remain unchanged |
| “Add this exact Fal route to the Studio Skills distribution with prompting guidance” | Edits the source provider index and useful researched guide; advice is discoverable by model name and Markdown links; no personal import or installed-plugin edit |
| Add a route for a model already curated under another provider | Reuses appropriate model guidance; adds provider-specific advice only where needed; no duplicate top-level Skill |
| Refresh an already bundled route and guide | Updates the exact existing entry without duplicates; preserves unrelated edits and checks other consumers of shared advice |
| Promote personal research containing private scene details and a preferred prompt length | Curates reusable advice without copying private details or making the preference universal; personal route and notes remain unchanged |
| Add a bundled route when no specialized prompting source is available | Adds the route using known identity; reports research limits without invented advice, mandatory guide scaffolding, or an availability gate |
| Distribution requested but only an installed plugin copy is available | Requests the source checkout path; does not edit the installed copy or silently add a personal entry |
| Newly authored operation-guide link is mistyped but repository tests pass | Manual lookup detects and corrects the broken connection before claiming curated advice is ready |
| Prepare a request after a plugin update adopts a personally added route | One effective choice keeps its personal name; preparation uses current bundled advice and preserves explicit personal preferences and note bytes |
| Requested route uses an unsupported provider execution protocol | Identifies the separate runtime limitation; does not add executable adapters, copied schemas, or claim successful execution |
| “Prepare this addition for review” with existing unrelated source changes | Runs validation and reports the focused diff; preserves unrelated changes; does not publish, tag, or change versions |
| Normal model addition; fixtures include an API page and a substantive developer/provider prompt guide | Reads both, saves useful model-specific advice and an original explained example; does not stop at API boilerplate or claim its authored prompt was tested |
| Explicit route-only addition with available prompting material | Saves the exact requested route without imposing a guidance-authoring task or availability gate |
| Refresh a thin guide whose only citation is an API page; a developer prompt guide is linked from the provider tutorial | Follows the guide link, improves a concrete prompt decision, and cites the prompting source separately from endpoint constraints |
| Reference guide and examples document conflicting syntax on different provider surfaces | Keeps the exact selected adapter/schema authoritative for native mentions; qualifies optional prompt notation instead of asserting one universal syntax |
| Current maker guidance differs from an older tutorial on precise timing | Resolves the relevant version and surface, explains the timing evidence, and keeps authored times as intent without promising reliable synchronization |
| Strong existing timecoded examples accompany weak provenance | Preserves useful examples and workflow rules, supplies attribution where supported, and labels agent recommendations instead of replacing the file with boilerplate |
| Newer music or speech documentation is detailed but the selected route is an older version | Retains the selected version, does not transpose new tags/controls as facts, and reports the evidence boundary with useful qualified advice |
| Source offers a rendered example; newly authored prompt changes its subjects and action | Labels the new example as original and untested; does not use the source's result as evidence that our prompt succeeded |
| A model-branded third-party site calls its guide official | Checks affiliation and uses verified primary material when available; labels any necessary secondary advice accurately |

For preparation cases verify that the authored request reflects useful advice
while retaining the selected schema, exact references, Project policy, Preview,
and normal execution/attachment boundaries. Report unavailable checks honestly;
route discovery alone is not evidence of successful generation. Inspect whether
the guide's advice and examples actually demonstrate model-specific craft;
citations, headings, file length, and test success alone are insufficient.
