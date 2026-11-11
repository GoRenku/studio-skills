#!/usr/bin/env node
// Development commands for trying this repository's plugins in Codex. Codex
// reads a plugin from its own copy, made at install; `codex plugin add` on an
// installed plugin makes a fresh copy. Only Codex's public commands are used:
// nothing writes Codex's plugin cache or settings directly.
//
//   local  copy the local Renku plugin afresh from this folder; remove Renku Cloud
//   cloud  build the Renku Cloud plugin and copy it afresh; remove the local one
//   watch  refresh whichever of the two is installed whenever a plugin file changes
//
// After a refresh, start a new Codex chat. The desktop app may need a restart.
import { execFileSync, spawnSync } from 'node:child_process';
import { readdirSync, statSync, watch } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { RENKU_PLUGINS, installedRenkuPlugin, switchCommands, switchProblems } from './codex-plugin-variants.mjs';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cloudMarketplace = path.join(repositoryRoot, 'dist', 'renku-cloud-marketplace');
const PLUGIN_SETUP = {
  local: { source: repositoryRoot, prepare: requireLocalMarketplace },
  cloud: { source: path.join(cloudMarketplace, 'renku-cloud'), prepare: buildCloudMarketplace },
};
const WATCHED_FOLDERS = ['skills', '.codex-plugin', '.codex-plugin-cloud'];
const WATCHED_ROOT_FILES = ['codex.mcp.json', 'cloud.mcp.json'];
const WATCH_SETTLE_MS = 500;
const COMMANDS = { local: () => report(install('local')), cloud: () => report(install('cloud')), watch: watchPluginFiles };

const command = COMMANDS[process.argv[2]];
if (!command) {
  throw new Error('SKILLS_CODEX_PLUGIN003 Usage: codex-plugin.mjs local|cloud|watch');
}
command();

function install(name) {
  const setup = PLUGIN_SETUP[name];
  setup.prepare();
  for (const args of switchCommands(installedPlugins(), name)) {
    codex(args);
  }
  const problems = switchProblems(installedPlugins(), name, setup.source);
  if (problems.length > 0) {
    throw new Error(`SKILLS_CODEX_PLUGIN004 ${problems.join(' ')}`);
  }
  return RENKU_PLUGINS[name].pluginId;
}

function report(pluginId) {
  console.log(`${pluginId} is installed with the current files. Start a new Codex chat to use it.`);
}

function requireLocalMarketplace() {
  if (!marketplaces().some((marketplace) => marketplace.name === RENKU_PLUGINS.local.marketplace)) {
    throw new Error(`SKILLS_CODEX_PLUGIN005 Codex has no renku-local marketplace. Create ~/.agents/plugins/marketplace.json named renku-local with a renku plugin whose local path is ${repositoryRoot}.`);
  }
}

function buildCloudMarketplace() {
  execFileSync(process.execPath, [path.join(repositoryRoot, 'scripts', 'build-cloud-plugin.mjs')], { stdio: ['ignore', 'ignore', 'inherit'] });
  const registered = marketplaces().find((marketplace) => marketplace.name === RENKU_PLUGINS.cloud.marketplace);
  if (!registered) {
    codex(['plugin', 'marketplace', 'add', cloudMarketplace]);
  } else if (registered.root !== cloudMarketplace) {
    throw new Error(`SKILLS_CODEX_PLUGIN006 Codex's renku-cloud marketplace is ${registered.root}, not ${cloudMarketplace}. Remove it with codex plugin marketplace remove renku-cloud.`);
  }
}

// File events only prompt a check: Codex reading the folder while it copies
// raises a change event for every file, so a refresh happens only when a
// file's modification time or size differs from the last check.
function watchPluginFiles() {
  if (!installedRenkuPlugin(installedPlugins())) {
    throw new Error('SKILLS_CODEX_PLUGIN007 No Renku plugin is installed. Run pnpm codex:local or pnpm codex:cloud first.');
  }
  let snapshot = snapshotPluginFiles();
  let timer = null;
  const check = () => {
    const next = snapshotPluginFiles();
    const changed = [...new Set([...snapshot.keys(), ...next.keys()])].filter((file) => snapshot.get(file) !== next.get(file));
    snapshot = next;
    if (changed.length > 0) refresh(` after changes to ${changed.join(', ')}`);
  };
  const queue = () => {
    clearTimeout(timer);
    timer = setTimeout(check, WATCH_SETTLE_MS);
  };
  for (const folder of WATCHED_FOLDERS) {
    watch(path.join(repositoryRoot, folder), { recursive: true }, queue);
  }
  watch(repositoryRoot, (_event, file) => WATCHED_ROOT_FILES.includes(file) && queue());
  console.log(`Watching ${[...WATCHED_FOLDERS, ...WATCHED_ROOT_FILES].join(', ')}. Press Ctrl+C to stop.`);
  refresh('');
}

/** Project-relative path → "mtime:size" for every watched file. */
function snapshotPluginFiles() {
  const files = new Map();
  const record = (file) => {
    const stats = statSync(file, { throwIfNoEntry: false });
    if (stats) files.set(path.relative(repositoryRoot, file), `${stats.mtimeMs}:${stats.size}`);
  };
  for (const folder of WATCHED_FOLDERS) {
    for (const entry of readdirSync(path.join(repositoryRoot, folder), { recursive: true, withFileTypes: true })) {
      if (entry.isFile()) record(path.join(entry.parentPath, entry.name));
    }
  }
  for (const file of WATCHED_ROOT_FILES) record(path.join(repositoryRoot, file));
  return files;
}

// Synchronous: changes made while it runs arrive afterwards and prompt the next check.
function refresh(reason) {
  const time = new Date().toLocaleTimeString();
  try {
    const name = installedRenkuPlugin(installedPlugins());
    console.log(name ? `${time} ${install(name)} refreshed${reason}. Start a new Codex chat to use it.` : `${time} No Renku plugin is installed; nothing refreshed.`);
  } catch (error) {
    console.error(`${time} ${error.message}`);
  }
}

function installedPlugins() {
  return JSON.parse(codex(['plugin', 'list', '--json'])).installed;
}

function marketplaces() {
  return JSON.parse(codex(['plugin', 'marketplace', 'list', '--json'])).marketplaces;
}

function codex(args) {
  const result = spawnSync('codex', args, { encoding: 'utf8' });
  if (result.error?.code === 'ENOENT') {
    throw new Error('SKILLS_CODEX_PLUGIN008 The codex command is not on PATH. Install the Codex CLI.');
  }
  if (result.status !== 0) {
    throw new Error(`SKILLS_CODEX_PLUGIN009 codex ${args.join(' ')} failed: ${(result.stderr || result.stdout).trim()}`);
  }
  return result.stdout;
}
