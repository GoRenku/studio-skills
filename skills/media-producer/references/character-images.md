# Character Reference Images

For a new standalone reference, use `image.create` with target `project`. Keep
the accepted output temporary until a current focused destination attaches it.

For a user or other external image, stage the accepted file inside the Project
and use its exact normalized Project-relative path. Do not invent generation
provenance, an Asset id, or an Asset File id.

For a localized revision of a registered image, use `image.edit` targeting
`asset:<asset-id>`. Resolve and inspect the exact source file, then place its
local-file marker in the selected provider endpoint's real native source-media
field. Optional Cast, Location, Lookbook, and Additional references are chosen
from current domain context and placed in their actual native request fields.

Do not build collages to simulate multiple references. Do not put local absolute paths or provider URLs in selections. If the user needs a durable generic Cast reference attachment and no current focused command owns it, report that capability gap instead of inventing an attachment workflow.
