# Bundled model authoring acceptance scenarios

Use an isolated source checkout, personal home, and installed-plugin fixture.
Supply provider documentation and schema fixtures for preparation; no paid
generation or release is needed. Inspect actual changed files and authored
requests, not just the agent's summary. Run the personal scenarios alongside
these cases when changing destination selection.

| User request / fixture | Expected observable outcome |
| --- | --- |
| “Add this exact model” while working in `studio-skills`, without a distribution request | Personal workflow remains the default; source checkout and installed plugin remain unchanged |
| “Add this exact Fal route to the Studio Skills distribution with prompting guidance” | Edits the source provider index, guide, and catalog; the route resolves to useful researched advice; no personal import or installed-plugin edit |
| Add a route for a model already curated under another provider | Reuses the appropriate model guide and key; adds provider-specific advice only where needed; no duplicate top-level Skill |
| Refresh an already bundled route and guide | Updates the exact existing entry without duplicates; preserves unrelated edits and checks other consumers of shared advice |
| Promote personal research containing private scene details and a preferred prompt length | Curates reusable advice without copying private details or making the preference universal; personal route and notes remain unchanged |
| Add a bundled route when no specialized prompting source is available | Adds the route using known identity; reports research limits without invented advice, mandatory guide scaffolding, or an availability gate |
| Distribution requested but only an installed plugin copy is available | Requests the source checkout path; does not edit the installed copy or silently add a personal entry |
| Newly authored catalog link is mistyped but repository tests pass | Manual lookup detects and corrects the broken connection before claiming curated advice is ready |
| Prepare a request after a plugin update adopts a personally added route | One effective choice keeps its personal name; preparation uses current bundled advice and preserves explicit personal preferences and note bytes |
| Requested route uses an unsupported provider execution protocol | Identifies the separate runtime limitation; does not add executable adapters, copied schemas, or claim successful execution |
| “Prepare this addition for review” with existing unrelated source changes | Runs validation and reports the focused diff; preserves unrelated changes; does not publish, tag, or change versions |

For preparation cases verify that the authored request reflects useful advice
while retaining the selected schema, exact references, Project policy, Preview,
and normal execution/attachment boundaries. Report unavailable checks honestly;
route discovery alone is not evidence of successful generation.
