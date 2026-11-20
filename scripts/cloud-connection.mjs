// The Renku Cloud plugin's built connection file: the source cloud.mcp.json
// with the plugin version added to every request Renku Cloud receives. Codex
// reads `http_headers`; Claude Code reads `headersHelper`, a command it runs
// when it connects. Neither field changes the address or the saved sign-in,
// so a new release keeps the person signed in. Pure, so it is tested without
// a build.
import { parseSemver } from './release/release-contract.mjs';

export const PLUGIN_VERSION_HEADER = 'Renku-Plugin-Version';

/** The built connection file for `version`, from the parsed source cloud.mcp.json. */
export function cloudConnection(source, version) {
  parseSemver(version);
  const server = source?.mcpServers?.renku;
  if (!server || server.type !== 'http' || typeof server.url !== 'string') {
    throw new Error('SKILLS_CLOUD_PLUGIN001 cloud.mcp.json has no http server named renku.');
  }
  const header = { [PLUGIN_VERSION_HEADER]: version };
  return {
    ...source,
    mcpServers: {
      ...source.mcpServers,
      renku: { ...server, http_headers: header, headersHelper: `echo '${JSON.stringify(header)}'` },
    },
  };
}
