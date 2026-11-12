# ElevenLabs Voice Sample Retrieval

In local Renku, with the person's saved ElevenLabs key, this operation
downloads the provider's existing preview audio for an exact opaque ElevenLabs
voice identity. It does not synthesize new text and has no prompt craft.
Follow the ElevenLabs provider Skill for the current request shape and attach
the accepted audio through the Cast Voice workflow.

Renku Cloud holds no ElevenLabs key and cannot run this operation. There, make
the sample with ElevenLabs' MCP server as the ElevenLabs provider Skill's
Renku Cloud Generation section describes.
