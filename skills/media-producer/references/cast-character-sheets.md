# Cast Character Sheets

Use `cast.character-sheet` for reusable Cast identity and continuity guidance
for one costume of one Look. The same universal layout applies to Production
and Storyboard rendering. The selected appearance authority changes the
rendering style; it never changes the layout.

Begin with `renku generation context --purpose cast.character-sheet --target
costume:<costume-id>`. Use its Cast facts/design, the Look and costume, the
costume's Scenes (the Look's Scenes when the costume has none yet),
Production and Storyboard Lookbooks, workflow/guidance, and
relationship-derived suggestions. Select the references that best serve this
request; the returned set is advisory and may be supplemented or replaced.

- **Identity:** the `cast-identity` suggestion is the Look's cast candidate,
  workflow-selected. Use it as the face and build authority unless the user
  wants a different face. When the Look has no cast candidate, say so and
  offer a casting round first; continue without it only when the user agrees.
- **Wardrobe:** dress the sheet in the costume's `wardrobe` and
  `continuityNotes` from the wardrobe plan, with Cast Design
  `costume.baseWardrobeLogic` as the rules behind them. Do not borrow another
  costume's clothing from an older sheet.
- **Continuity:** the `cast-continuity` suggestion lists the Cast Member's
  other sheets, with the costume's picked sheet marked when there is one.

For a Storyboard continuity sheet, select the exact accepted Production
Character Sheet of the same costume as canonical content authority and the
current Storyboard Lookbook Sheet as sole appearance authority. Use Additional
References only for request-specific likeness, costume, accessory, or
historical-source files.

Before generating, check whether an existing sheet of the Cast Member already
shows this costume; offer to pick it with
`renku asset select --project <project-name> --target costume:<costume-id> --asset-file <asset-file-id> --json`
instead of regenerating.

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

An existing design or reference image can contain a different sheet layout.
Preserve its character facts and visual identity without copying extra study
blocks into the current default layout. Explicit current user layout direction
takes precedence. For the height ruler, state the common sole baseline and
crown level; inspect the spacing of numeric marks, not only the printed height.

Production rendering commonly uses a Production Lookbook Sheet. Storyboard
rendering commonly uses a Storyboard Lookbook Sheet and keeps the Production
Character Sheet in the content-only role. Preserve identity, silhouette,
proportions, wardrobe, accessory design, and relevant state while re-rendering
them in the appearance reference's medium, linework, value treatment, finish,
lighting behavior, texture, and detail density. Do not copy the content
reference's photographic lighting, finish, or realism.

## Detail Level

Character sheets use the Project's `characterSheetDetail` (`lowest`, `mid` or
`highest`), read with `renku settings casting show --json`. Take the
`detail[<level>]` fields of the provider route used from its Default Model
List entry (`default-models.json`) in the lane used (`image` or `imageEdit`)
and set them in the native request; they override the model guide's default
size. An empty object leaves the route's size at its default.

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
  --target costume:<costume-id> \
  --source <project-relative-path> \
  --title <title> \
  --summary <costume-summary> \
  --reference-name <costume-name> \
  --tag storyboard \
  --provenance <provenance-json> \
  --select
```

Use the same provenance contract for every generated path. Omit `--tag storyboard` for
a Production sheet unless independently intended. Always keep `--summary` for
generated Production and Storyboard sheets; describe the costume and
rendering in readable card copy rather than repeating the reference name or
tags.

Each costume has one picked sheet. `--select` picks the new sheet for its
costume; use it when this sheet should be the costume's continuity sheet
(the usual case for a Production sheet). Omit it for an alternate, and pick
later with `renku asset select --target costume:<costume-id>`. Shots and
storyboards in the costume's Scenes list the picked sheet first.
