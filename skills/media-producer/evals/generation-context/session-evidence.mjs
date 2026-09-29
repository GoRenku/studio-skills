// Evaluation-only extraction from local Codex rollout JSONL records. This is
// visible evidence for an evaluator, not an automatic claim of agent compliance.
export function collectSessionEvidence(records) {
  return records.flatMap(({ payload }) => {
    if (payload?.type !== 'item_completed') return [];
    const item = payload.item;
    const timing = { startedAt: payload.started_at_ms, completedAt: payload.completed_at_ms };
    if (item?.type === 'CommandExecution') {
      const command = Array.isArray(item.command) ? item.command.join(' ') : item.command;
      return [{ kind: 'command', ...timing, command, cwd: item.cwd,
        exitCode: item.exit_code, stdout: item.stdout, stderr: item.stderr }];
    }
    if (item?.type === 'UserMessage' || item?.type === 'AgentMessage') {
      const text = typeof item.content === 'string' ? item.content
        : (item.content ?? []).filter((part) => typeof part.text === 'string')
          .map((part) => part.text).join('\n');
      return [{ kind: item.type === 'UserMessage' ? 'user' : 'assistant', ...timing,
        text: text.replace(/data:[^\s)]+/g, '[embedded media omitted]') }];
    }
    return [];
  });
}
