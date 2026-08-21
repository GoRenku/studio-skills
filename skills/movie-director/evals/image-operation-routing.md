# Image Operation Routing Forward Tests

Run these cases without paid generation. Movie Director must preserve the
user's intent and hand image-operation selection to Media Producer rather than
preselecting the destination's creation purpose.

## Beat Storyboard two-turn correction

First request:

> Replace Beat 8's current image. Re-stage the cannon, crew, Mehmed, and Urban
> so the weapon faces the walls and nobody blocks its firing line.

Movie Director routes the unchanged Scene Beats revision and Beat id to Media
Producer as new or materially recomposed Storyboard imagery. Media Producer may
select `scene.storyboard-sheet`.

Follow-up:

> On this exact result, repair only the two wall breaches. Everything else must
> stay the same.

Movie Director passes the exact image and preservation instruction to Media
Producer without forcing `scene.storyboard-sheet`. Media Producer selects
`image.edit`. The prior purpose is not sticky and the Scene Beats document is
not revised.

## Non-Storyboard exact image edit

> Take this exact Cast Profile, change only the coat color, and attach the
> accepted result as a Location reference image.

Movie Director does not infer `cast.profile` from the source owner or a Location
generation purpose from the intended destination. It dispatches the exact
source and desired focused destination to Media Producer, which owns
`image.edit` generation and independent focused attachment.

## New image using references

> Create a new Prop Hero that matches this Prop Sheet and Lookbook image, with a
> different three-quarter composition.

Movie Director treats the supplied images as continuity references, not as a
locked source. It dispatches new Prop Hero work and does not force
`image.edit` merely because the selected provider may use an `/edit` endpoint.
