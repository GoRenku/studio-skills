import assert from 'node:assert/strict';
import test from 'node:test';
import { assessReviewRouting } from '../evals/generation-context/review-routing.mjs';

const accepted = [
  { type: 'context-read' }, { type: 'capabilities-read' }, { type: 'validate', requestSha256: 'source' },
  { type: 'panel-opened' }, { type: 'turn-yielded' },
  { type: 'action-consumed', action: 'submit', reviewId: 'review-1', alreadyConsumed: false },
  { type: 'accepted-request-written' }, { type: 'validate', accepted: true, requestSha256: 'accepted' },
  { type: 'execute', reviewId: 'review-1', expectedRequestSha256: 'accepted' },
];

for (const mediaKind of ['image', 'video', 'audio']) {
  test(`${mediaKind} panel accepts exact edits without a second Preview or confirmation`, () => {
    assert.deepEqual(assessReviewRouting({ host: 'codex-desktop', preference: 'panel', panelStatus: 'advertised',
      displayPreview: true, events: accepted.map((event) => ({ ...event, mediaKind })) }), []);
  });
}

for (const host of ['codex-cli', 'claude-code', 'claude-desktop', 'unidentified']) {
  for (const preference of ['panel', 'visualize']) {
    test(`${host} with ${preference} always delivers Preview when Project policy disables it`, () => {
      assert.deepEqual(assessReviewRouting({ host, preference, panelStatus: 'unavailable', displayPreview: false,
        events: [{ type: 'context-read' }, { type: 'request-prepared' }, { type: 'preview-delivered' },
          { type: 'conversational-confirmation' }, { type: 'execute' }] }), []);
      assert.deepEqual(assessReviewRouting({ host, preference, panelStatus: 'unavailable', displayPreview: false,
        events: [{ type: 'context-read' }, { type: 'validate' }, { type: 'execute' }] }), ['missing-mandatory-preview']);
    });
  }
}

test('advertised UI on a non-Codex host still requires Studio Preview', () => {
  assert.deepEqual(assessReviewRouting({ host: 'claude-desktop', preference: 'panel', panelStatus: 'advertised',
    displayPreview: false, events: [{ type: 'context-read' }, { type: 'preview-delivered' }] }), []);
});

for (const displayPreview of [true, false]) {
  test(`explicit Visualize retains Project Preview policy (${displayPreview})`, () => {
    assert.deepEqual(assessReviewRouting({ host: 'codex-desktop', preference: 'visualize', panelStatus: 'advertised',
      displayPreview, events: [{ type: 'context-read' }, { type: 'visualize-rendered' },
        ...(displayPreview ? [{ type: 'preview-delivered' }] : []), { type: 'execute' }] }), []);
  });
}

test('a missing desktop probe stops, while known unsupported Codex capability selects mandatory Preview', () => {
  assert.deepEqual(assessReviewRouting({ host: 'codex-desktop', preference: 'panel', panelStatus: 'missing',
    displayPreview: false, events: [{ type: 'context-read' }, { type: 'integration-failed' }] }), []);
  assert.deepEqual(assessReviewRouting({ host: 'codex-desktop', preference: 'panel', panelStatus: 'unavailable',
    displayPreview: false, events: [{ type: 'context-read' }, { type: 'capabilities-read' }, { type: 'preview-delivered' }] }), []);
});

test('detects the duplicate Preview, duplicate confirmation and original-hash execution mistakes', () => {
  const events = structuredClone(accepted);
  events.splice(3, 0, { type: 'request-prepared' }, { type: 'preview-delivered' });
  events.splice(-1, 0, { type: 'conversational-confirmation' });
  events.at(-1).expectedRequestSha256 = 'source';
  assert.deepEqual(assessReviewRouting({ host: 'codex-desktop', preference: 'panel', panelStatus: 'advertised',
    displayPreview: true, events }), ['duplicate-studio-preview', 'duplicate-confirmation', 'accepted-edits-not-validated']);
});

test('cancel, reconfiguration and an already consumed Submit cannot authorize execution', () => {
  for (const action of ['cancel', 'reconfigure', 'submit']) {
    const events = structuredClone(accepted);
    Object.assign(events.find((event) => event.type === 'action-consumed'), { action, alreadyConsumed: action === 'submit' });
    assert.ok(assessReviewRouting({ host: 'codex-desktop', preference: 'panel', panelStatus: 'advertised',
      displayPreview: true, events }).includes('unaccepted-panel-execution'));
  }
});

test('failed panel handshake or mandatory Preview delivery prevents execution', () => {
  assert.ok(assessReviewRouting({ host: 'codex-desktop', preference: 'panel', panelStatus: 'advertised',
    displayPreview: true, events: [...accepted.slice(0, -1), { type: 'integration-failed' }, accepted.at(-1)] })
    .includes('executed-after-review-failure'));
  assert.deepEqual(assessReviewRouting({ host: 'codex-cli', preference: 'panel', panelStatus: 'unavailable',
    displayPreview: false, events: [{ type: 'context-read' }, { type: 'preview-failed' }] }), []);
});

test('built-in images consume the panel action without Engines validation', () => {
  assert.deepEqual(assessReviewRouting({ host: 'codex-desktop', preference: 'panel', panelStatus: 'advertised',
    engines: false, displayPreview: false, events: accepted.filter((event) => event.type !== 'validate') }), []);
});
