// How each AI app runs one cloud eval headless, with the Renku Cloud plugin's
// skills and two MCP servers: Renku Cloud (the launcher's local Worker) and
// the fictional acme provider's own server. Nothing is installed into the
// person's own Claude Code or Codex settings. Each app's shell commands run
// in its own sandbox: they may write only in the eval workspace, and Claude
// Code's may reach only loopback, where the launcher listens.
import { cp, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

/** The name the provider's MCP server has in both apps; requests refer to it. */
export const PROVIDER_MCP_NAME = 'acme-media';

/**
 * Claude Code's session settings: Bash runs in Claude Code's sandbox, which
 * keeps writes in the workspace and lets the network reach loopback only.
 */
export const CLAUDE_CODE_SETTINGS = {
  sandbox: {
    enabled: true,
    autoAllowBashIfSandboxed: true,
    network: { allowedDomains: ['127.0.0.1', 'localhost'], allowLocalBinding: true },
  },
};

/**
 * Claude Code loads the plugin folder for this session (`--plugin-dir`). Its
 * MCP servers come only from the eval's config (`--strict-mcp-config`), so
 * neither the person's own servers nor a local Renku join in; the strict
 * config also leaves out the plugin's own server, so Renku Cloud is named
 * there with the same address the plugin copy carries. The plugin folder is
 * also a working folder, so its reference files can be read without asking.
 * User settings are not read (`--setting-sources project`). Edits inside the
 * workspace and the two MCP servers' tools are allowed; anything that would
 * ask is refused, as nobody is there to answer.
 */
export function claudeCodeArguments({ prompt, pluginFolder, mcpConfigFile, model, budgetUsd }) {
  return [
    '-p', prompt,
    '--output-format', 'stream-json', '--verbose',
    '--plugin-dir', pluginFolder, '--add-dir', pluginFolder,
    '--mcp-config', mcpConfigFile, '--strict-mcp-config',
    '--setting-sources', 'project',
    '--settings', JSON.stringify(CLAUDE_CODE_SETTINGS),
    '--permission-mode', 'acceptEdits',
    '--permission-prompts', 'none',
    '--allowed-tools', 'mcp__renku', `mcp__${PROVIDER_MCP_NAME}`,
    '--no-session-persistence',
    ...(model ? ['--model', model] : []),
    ...(budgetUsd ? ['--max-budget-usd', String(budgetUsd)] : []),
  ];
}

/**
 * `codex exec` cannot load a plugin folder for one run without installing it
 * into the person's Codex home, so the plugin's skills are given as the
 * workspace's own skills (`.agents/skills/`) and its MCP servers through `-c`.
 * The person's config.toml is not read, so their plugins and servers stay out.
 * Commands run in Codex's workspace-write sandbox with network on, so curl
 * reaches the launcher; nothing asks, as nobody is there to answer.
 */
export function codexArguments({ prompt, workspace, mcpUrl, providerMcpUrl, model }) {
  return [
    'exec', '--json',
    '--skip-git-repo-check', '--ignore-user-config',
    '--sandbox', 'workspace-write',
    '-c', 'sandbox_workspace_write.network_access=true',
    '-c', 'approval_policy="never"',
    '--cd', workspace,
    '-c', `mcp_servers.renku.url=${JSON.stringify(mcpUrl)}`,
    '-c', `mcp_servers.${PROVIDER_MCP_NAME}.url=${JSON.stringify(providerMcpUrl)}`,
    ...(model ? ['--model', model] : []),
    prompt,
  ];
}

/** Each app: the program it runs, and the files and command line one eval needs. */
export const AGENT_APPS = {
  'claude-code': {
    program: 'claude',
    async prepare({ runFolder, workspace, pluginFolder, addresses, prompt, options }) {
      const mcpConfigFile = path.join(runFolder, 'claude-mcp.json');
      await writeFile(mcpConfigFile, `${JSON.stringify({
        mcpServers: {
          renku: { type: 'http', url: addresses.mcpUrl },
          [PROVIDER_MCP_NAME]: { type: 'http', url: addresses.providerMcpUrl },
        },
      }, null, 2)}\n`);
      return { cwd: workspace, args: claudeCodeArguments({ prompt, pluginFolder, mcpConfigFile, model: options.claudeModel, budgetUsd: options.claudeBudgetUsd }) };
    },
  },
  codex: {
    program: 'codex',
    async prepare({ workspace, pluginFolder, addresses, prompt, options }) {
      const skills = path.join(workspace, '.agents', 'skills');
      await mkdir(path.dirname(skills), { recursive: true });
      await cp(path.join(pluginFolder, 'skills'), skills, { recursive: true });
      return { cwd: workspace, args: codexArguments({ prompt, workspace, mcpUrl: addresses.mcpUrl, providerMcpUrl: addresses.providerMcpUrl, model: options.codexModel }) };
    },
  },
};
