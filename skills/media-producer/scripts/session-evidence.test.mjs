import assert from 'node:assert/strict';
import test from 'node:test';
import { collectSessionEvidence } from '../evals/generation-context/session-evidence.mjs';

test('extracts visible commands and messages without reasoning or image bytes', () => {
  const record = (item) => ({ payload: { type: 'item_completed', started_at_ms: 10, completed_at_ms: 20, item } });
  const records = [
    record({ type: 'Reasoning', raw_content: 'private reasoning' }),
    record({ type: 'ImageView', data: 'image bytes' }),
    record({ type: 'UserMessage', content: [{ text: 'Generate' }, { image: 'image bytes' }] }),
    record({ type: 'AgentMessage', content: '![video](/tmp/video.mp4)' }),
    record({ type: 'CommandExecution', command: ['renku', 'generation', 'execute', '--file', 'request.json'],
      cwd: '/project', exit_code: 0, stdout: 'Generation completed', stderr: '' }),
    { payload: { type: 'custom_tool_call_output', output: 'unbounded image bytes' } },
  ];
  assert.deepEqual(collectSessionEvidence(records), [
    { kind: 'user', startedAt: 10, completedAt: 20, text: 'Generate' },
    { kind: 'assistant', startedAt: 10, completedAt: 20, text: '![video](/tmp/video.mp4)' },
    { kind: 'command', startedAt: 10, completedAt: 20, command: 'renku generation execute --file request.json',
      cwd: '/project', exitCode: 0, stdout: 'Generation completed', stderr: '' },
  ]);
});
