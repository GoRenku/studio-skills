# Location Environment Sheet Purpose

Purpose key: `location.environment-sheet`

Target format: `location:<location-id>`

## Required Workflow

1. Read context with `renku generation context --purpose location.environment-sheet --target location:<location-id> --json`.
2. List model choices with `renku generation model list --purpose location.environment-sheet --target location:<location-id> --json` unless the user already chose a model.
3. Verify the target Location exists in the screenplay location list.
4. If the intended historical place is missing, ask the user or screenplay agent to add a Location first.
5. Create a persisted spec and estimate cost before any paid run.
6. Run only after user cost approval for the bound provider request.
7. Inspect the returned composite, use vision to identify the four scenic image blocks, crop those four blocks, and inspect the four slices.
8. Import only when the sheet has four useful views of the same location.

## Prompt Inputs

Use the returned context:

- screenplay overview, story function, and scene usage;
- target location name, description, time period, and visual notes;
- active Lookbook palette, texture, lighting, composition, and camera rules;
- selected location references and anti-references when present;
- historical basis, dramatized elements, research sources, and assumptions.

## Sheet Layout

Prompt for one composite image. Do not provide or reference a template image,
mask, uploaded grid, red marker sheet, or debug layout.

- front, azimuth 0;
- right, azimuth 90;
- back, azimuth 180;
- left, azimuth 270;
- one bottom guideline strip showing the active Lookbook texture and lighting behavior applied to the location.

Example prompt instruction:

```text
Create one polished 4:3 location environment sheet as a single finished image. Arrange four clean 16:9 scenic panels in a 2x2 sheet: 0 front top-left, 90 right top-right, 180 back bottom-left, 270 left bottom-right. Place labels in the sheet header or margin area, never inside the scenic image content. Add one bottom guideline strip for the active Lookbook's texture, materials, palette, and lighting behavior. Keep scale, entrances, wall breaks, landmarks, materials, weather, and horizon logic consistent between views. No red dots, crop marks, debug overlays, construction marks, heavy extraction borders, or labels over the scenic panels.
```

## Historical Guardrails

When the context is historical, include concrete exclusions that match the time period, geography, and location type. For a 1400s setting, relevant exclusions might include:

- telegraph poles;
- electrical wires;
- asphalt roads;
- concrete utility poles;
- cars or tire marks;
- modern signage;
- glass curtain walls;
- industrial steel streetlights;
- steam-era railway infrastructure.

Do not dump a generic anachronism list into every prompt. Choose exclusions from the context. If the context is too thin to write meaningful guardrails, ask for the missing location details or suggest adding them to the Location record.

## Vision-Guided Cropping Expectations

Renku generates one provider image, then the agent uses vision to locate the four actual scenic image blocks. Crop only those four blocks:

- `view_front`
- `view_right`
- `view_back`
- `view_left`

The bottom texture/material/lighting strip stays in the composite sheet. Do not crop it, store it, or import it as a separate file role.

Crop around the image content, not the panel frame. Exclude labels, azimuth text, gutters, decorative sheet background, borders, red dots, debug marks, and bottom-strip content. The crop boxes are selected by vision for the specific returned image; they are not fixed coordinates and are not discovered through border detection, marker detection, OCR, or rough quadrant fallback.

Do not import automatically when the image no longer provides four clean useful views. Show the composite to the user, explain that the generation is not good enough for a location sheet, and ask whether to regenerate or add better location details before trying again.
