// Which development Renku plugin Codex has installed, and the Codex commands
// that switch to the other one. Pure functions over the `installed` list from
// `codex plugin list --json`, so they are tested without Codex. Used by
// codex-plugin.mjs.

/**
 * The two Renku plugins a developer moves between. Both name their MCP server
 * "renku" and carry the same skills, so only one is installed at a time.
 */
export const RENKU_PLUGINS = {
  local: { pluginId: 'renku@renku-local', marketplace: 'renku-local' },
  cloud: { pluginId: 'renku-cloud@renku-cloud', marketplace: 'renku-cloud' },
};

const MANAGED_PLUGIN_IDS = Object.values(RENKU_PLUGINS).map((plugin) => plugin.pluginId);

/** 'local', 'cloud' or null for no Renku plugin; refuses when both are installed. */
export function installedRenkuPlugin(installed) {
  assertNoOtherRenkuPlugin(installed);
  const names = Object.keys(RENKU_PLUGINS).filter((name) => installed.some((plugin) => plugin.pluginId === RENKU_PLUGINS[name].pluginId));
  if (names.length > 1) {
    throw new Error('SKILLS_CODEX_PLUGIN002 Both Renku plugins are installed. Run pnpm codex:local or pnpm codex:cloud to keep one.');
  }
  return names[0] ?? null;
}

/**
 * Codex argument lists that remove the other Renku plugin, then copy the chosen
 * one afresh: `codex plugin add` on an installed plugin re-copies it and turns it on.
 */
export function switchCommands(installed, name) {
  assertNoOtherRenkuPlugin(installed);
  const target = RENKU_PLUGINS[name];
  const removals = installed.filter((plugin) => MANAGED_PLUGIN_IDS.includes(plugin.pluginId) && plugin.pluginId !== target.pluginId);
  return [...removals.map((plugin) => ['plugin', 'remove', plugin.pluginId]), ['plugin', 'add', target.pluginId]];
}

/** What is wrong after a switch; empty when only the chosen plugin is installed, on, and copied from `source`. */
export function switchProblems(installed, name, source) {
  const target = RENKU_PLUGINS[name];
  const plugin = installed.find((entry) => entry.pluginId === target.pluginId);
  const problems = [];
  if (!plugin) {
    problems.push(`${target.pluginId} is not installed.`);
  } else {
    if (!plugin.enabled) problems.push(`${target.pluginId} is turned off.`);
    if (plugin.source?.path !== source) problems.push(`${target.pluginId} is copied from ${plugin.source?.path}, not ${source}.`);
  }
  for (const other of installed.filter((entry) => isRenkuPlugin(entry) && entry.pluginId !== target.pluginId)) {
    problems.push(`${other.pluginId} is still installed.`);
  }
  return problems;
}

function isRenkuPlugin(plugin) {
  return plugin.name === 'renku' || plugin.name === 'renku-cloud';
}

// A released Renku plugin (renku@renku) would clash the same way; the person removes it themselves.
function assertNoOtherRenkuPlugin(installed) {
  const others = installed.filter((plugin) => isRenkuPlugin(plugin) && !MANAGED_PLUGIN_IDS.includes(plugin.pluginId));
  if (others.length > 0) {
    throw new Error(`SKILLS_CODEX_PLUGIN001 ${others.map((plugin) => plugin.pluginId).join(', ')} is installed as well. Remove it with codex plugin remove before using the development plugins.`);
  }
}
