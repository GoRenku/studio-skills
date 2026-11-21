// The Renku Cloud plugin's built connection files: the source cloud.mcp.json
// with the plugin version added to every request Renku Cloud receives, one
// file per AI app.
//
// - Claude Code reads claude.mcp.json. Its headersHelper is the same command
//   in every release: it prints renku-plugin-version.json, which the build
//   writes beside it (Claude Code runs a plugin's headersHelper in the
//   plugin's folder). claude.ai records a notice for each release whose MCP
//   settings change, so this file must not change between releases.
// - Codex reads codex.mcp.json, with the version in http_headers.
//
// Neither field changes the address or the saved sign-in, so a new release
// keeps the person signed in. Pure, so it is tested without a build.
import { parseSemver } from './release/release-contract.mjs';

export const PLUGIN_VERSION_HEADER = 'Renku-Plugin-Version';
export const CLAUDE_CONNECTION_FILE = 'claude.mcp.json';
export const CODEX_CONNECTION_FILE = 'codex.mcp.json';
export const PLUGIN_VERSION_FILE = 'renku-plugin-version.json';

/** Each built connection file for `version`, by its name in the plugin folder, from the parsed source cloud.mcp.json. */
export function cloudConnectionFiles(source, version) {
  parseSemver(version);
  const server = source?.mcpServers?.renku;
  if (!server || server.type !== 'http' || typeof server.url !== 'string') {
    throw new Error('SKILLS_CLOUD_PLUGIN001 cloud.mcp.json has no http server named renku.');
  }
  const header = { [PLUGIN_VERSION_HEADER]: version };
  const withRenku = (renku) => ({ ...source, mcpServers: { ...source.mcpServers, renku } });
  return {
    [CLAUDE_CONNECTION_FILE]: withRenku({ ...server, headersHelper: `cat ${PLUGIN_VERSION_FILE}` }),
    [CODEX_CONNECTION_FILE]: withRenku({ ...server, http_headers: header }),
    [PLUGIN_VERSION_FILE]: header,
  };
}
