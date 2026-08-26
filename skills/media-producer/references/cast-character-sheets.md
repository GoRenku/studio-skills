# Cast Character Sheets

Use `cast.character-sheet` for reusable Cast identity and continuity guidance.
The same universal layout applies to Production and Storyboard rendering. The
selected appearance authority changes the rendering style; it never changes
the layout.

Begin with `renku generation context --purpose cast.character-sheet --target
cast:<cast-member-id> --json`. Use its Cast facts/design/Scene appearances,
Production and Storyboard Lookbooks, workflow/guidance, and relationship-derived
appearance/continuity suggestions. Select the references that best serve this
request; the returned set is advisory and may be supplemented or replaced. For a
Storyboard continuity sheet, select the exact accepted Production Character
Sheet as canonical content authority and the current Storyboard Lookbook Sheet
as sole appearance authority. Use Additional References only for request-
specific likeness, costume, accessory, or historical-source files.

## Universal layout

Every default Character Sheet contains:

1. one large, straight-on, identity-readable face close-up, centered and
   cropped above the shoulders;
2. a compact information area below the face with name, known height, and a
   short identity synopsis;
3. applicable character-owned accessory details in that information area;
4. four complete full-length views in this order: front, back, left profile,
   right profile, all with feet visible and a neutral repeatable pose; and
5. one clearly labeled height ruler with numeric marks whose proportions agree
   with the written height.

Keep the same person, body proportions, wardrobe layers, and accessory
placement in all four views. Do not invent height or accessories. When height
is missing, ask before preparing a reusable final sheet. The user may
explicitly proceed without height; record that limitation in the request and
quality feedback.

Do not add gesture panels, expression ranges, action poses, environment scenes,
tool demonstrations, material swatches, or extra studies by default. They may
replace the universal layout only when the user explicitly requests a custom
departure. Never use spare canvas as a reason to add them.

Production rendering commonly uses a Production Lookbook Sheet. Storyboard
rendering commonly uses a Storyboard Lookbook Sheet and keeps the Production
Character Sheet in the content-only role. Preserve identity, silhouette,
proportions, wardrobe, accessory design, and relevant state while re-rendering
them in the appearance reference's medium, linework, value treatment, finish,
lighting behavior, texture, and detail density. Do not copy the content
reference's photographic lighting, finish, or realism.

## Review

Follow `image-output-review.md`. Check the exact layout; straight-on face;
ordered, complete full-length views; identity, wardrobe, and accessory
consistency; written height and ruler agreement; absence of unrequested study
blocks; selected Lookbook appearance; no content-reference style leakage; and
no materially cropped or unreadable required region. An approved unknown-
height limitation is feedback, not a runtime rejection.

## Attachment

Attach accepted sheets atomically with human-readable metadata:

```bash
renku media import \
  --purpose cast.character-sheet \
  --target cast:<cast-member-id> \
  --source <project-relative-path> \
  --title <title> \
  --summary <variant-summary> \
  --reference-name <variant-name> \
  --tag storyboard \
  --provenance <provenance-json> \
  --json
```

Use the same provenance contract for every generated path. Omit `--tag storyboard` for
a Production sheet unless independently intended. Always keep `--summary` for
generated Production and Storyboard sheets; describe the appearance or
continuity variant in readable card copy rather than repeating the reference
name or tags. Character Sheets remain request-scoped candidates and never
receive a global selection.
