// The Renku Cloud plugin as an eval uses it: built once by
// scripts/build-cloud-plugin.mjs (`pnpm build:cloud-plugin`), then copied for
// each eval with its MCP server's address replaced by the launcher's.
import { execFileSync } from 'node:child_process';
import { cp, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

/** Builds the plugin from the committed skill files and returns its folder. */
export function buildCloudPlugin(repositoryRoot) {
  const marketplace = execFileSync(process.execPath, [path.join(repositoryRoot, 'scripts', 'build-cloud-plugin.mjs')], { encoding: 'utf8' }).trim();
  return path.join(marketplace, 'renku-cloud');
}

/** Copies the built plugin to `target` with its `renku` MCP server at `mcpUrl`. */
export async function copyCloudPlugin(builtPlugin, target, mcpUrl) {
  await cp(builtPlugin, target, { recursive: true });
  const configFile = path.join(target, 'cloud.mcp.json');
  await writeFile(configFile, `${JSON.stringify(withRenkuAddress(JSON.parse(await readFile(configFile, 'utf8')), mcpUrl), null, 2)}\n`);
  return target;
}

/** The plugin's MCP settings with the `renku` server's address replaced. */
export function withRenkuAddress(config, mcpUrl) {
  const renku = config?.mcpServers?.renku;
  if (!renku || renku.type !== 'http') {
    throw new Error('SKILLS_CLOUD_EVAL030 cloud.mcp.json has no http server named renku.');
  }
  return { ...config, mcpServers: { ...config.mcpServers, renku: { ...renku, url: mcpUrl } } };
}
