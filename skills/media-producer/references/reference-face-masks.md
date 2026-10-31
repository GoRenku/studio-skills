# Reference Face Masks

Many video models take a face from whichever view shows it, and a face that
fills a few percent of a full-length figure pulls identity off the large
close-up. A face-masked copy of a sheet blanks the small faces with plain white
ovals, so the model takes the face only from the close-up and the outfit and
build from the full-length views. The director's sheet stays unchanged; only
the copy goes to the provider.

The agent owns this, like slicing a storyboard sheet: look at the image, paint
the copy with your own image tool, check it, and import it. Studio never finds
faces and never edits pixels. It only stores the copy under a fixed name and
shows it in the generation's References tab with a "Faces masked" label.

## When to mask

Mask an image reference when all of these hold:

- the request is a video generation or video edit;
- the image goes in a reference role, never as a first frame, last frame or
  storyboard frame, because a frame's pixels become footage;
- it shows the same person as one large face close-up and smaller full-length
  or half-length views, as Character Sheets and casting candidates do;
- the selected route's model guide does not say to send unmasked sheets.

Leave the close-up untouched. A back view has no face to mask. Do not mask
other people, Location or Prop sheets, or image-generation references. An
explicit user choice wins either way.

## Find or make the copy

1. Start from the exact sheet the request should use: for a costume, the
   picked sheet that Scene generation context reports. Never reuse an older
   sheet's copy.
2. Ask Core for the copy's fixed path:

   ```bash
   renku asset face-mask show --project <project> --asset-file <sheet-asset-file-id> --json
   ```

   Use the returned `faceMaskedProjectRelativePath`; never build the name
   yourself.
3. If `exists` is true, look at the copy once and reuse it.
4. Otherwise copy the sheet into `tmp/media/` with the same extension and
   paint each small face over with a filled pure white (#FFFFFF) oval. Cover
   hair, ears and chin with a margin. Keep the image size, format and every
   other pixel unchanged. Use whatever image tool is available, placing the
   ovals from your own look at the sheet.
5. Look at the result. Every small face must be fully white and the close-up
   intact. Redo the copy until it is.
6. Import it:

   ```bash
   renku asset face-mask import --project <project> --asset-file <sheet-asset-file-id> --file tmp/media/<painted-file> --json
   ```

   Add `--replace` only to replace a copy you found to be wrong.

A regenerated or edited sheet is a new file with a new name, so it has no copy
until you make one.

## Use it in the request

Put the copy's path in the reference marker and say so in the label:

```json
{ "$file": "<faceMaskedProjectRelativePath>", "reviewLabel": "Ottavio costume sheet, faces masked", "promptMention": "<provider mention>" }
```

In the prompt, give the reference its narrow role through the provider's
mention syntax: face identity from the close-up, wardrobe and build from the
full-length views. Do not describe the white ovals as anything to render.

Do not store face positions anywhere, and do not ask Studio to find or mask
faces.
