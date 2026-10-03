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
    assert.deepEqual(assessReviewRouting({ host: 'codex-desktop', codexPluginInstalled: true, preference: 'panel', panelStatus: 'advertised',
      displayPreview: true, events: accepted.map((event) => ({ ...event, mediaKind })) }), []);
  });
}

for (const host of ['codex-cli', 'claude-code', 'claude-desktop', 'unidentified']) {
  for (const preference of ['auto', 'panel', 'visualize']) {
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
    assert.deepEqual(assessReviewRouting({ host: 'codex-desktop', codexPluginInstalled: true, preference: 'visualize', panelStatus: 'advertised',
      displayPreview, events: [{ type: 'context-read' }, { type: 'visualize-rendered' },
        ...(displayPreview ? [{ type: 'preview-delivered' }] : []), { type: 'execute' }] }), []);
  });
}

for (const panelStatus of ['missing', 'unavailable']) {
  test(`an installed plugin with ${panelStatus} capabilities stops without another review`, () => {
    assert.deepEqual(assessReviewRouting({ host: 'codex-desktop', codexPluginInstalled: true,
      preference: 'auto', panelStatus, displayPreview: false,
      events: [{ type: 'context-read' }, { type: 'capabilities-read' }, { type: 'integration-failed' }] }), []);
  });
}

for (const preference of ['auto', 'panel', 'visualize']) {
  test(`Desktop without connection or installation record uses Visualize for ${preference}`, () => {
    assert.deepEqual(assessReviewRouting({ host: 'codex-desktop', codexPluginInstalled: false,
      preference, panelStatus: 'missing', displayPreview: false,
      events: [{ type: 'context-read' }, { type: 'visualize-rendered' }] }), []);
  });
}

test('Desktop auto with installed plugin selects the panel', () => {
  assert.deepEqual(assessReviewRouting({ host: 'codex-desktop', codexPluginInstalled: true,
    preference: 'auto', panelStatus: 'advertised', displayPreview: false, events: accepted }), []);
});

for (const preference of ['auto', 'panel']) {
  for (const [mediaKind, engines] of [['image', false], ['image', true], ['video', true], ['audio', true]]) {
    test(`development connection selects ${engines ? 'external' : 'built-in'} ${mediaKind} panel for ${preference} without installer state`, () => {
      const routing = { host: 'codex-desktop', codexPluginInstalled: false, preference,
        panelStatus: 'advertised', displayPreview: true };
      assert.deepEqual(assessReviewRouting({ ...routing,
        engines, events: accepted
          .filter((event) => engines || event.type !== 'validate')
          .map((event) => ({ ...event, mediaKind })) }), []);
      assert.ok(assessReviewRouting({ ...routing,
        events: [{ type: 'context-read' }, { type: 'capabilities-read' }, { type: 'preview-delivered' }] })
        .includes('duplicate-studio-preview'));
    });
  }

  for (const panelStatus of ['unavailable', 'failed']) {
    test(`development connection with ${panelStatus} capability stops for ${preference}`, () => {
      const routing = { host: 'codex-desktop', codexPluginInstalled: false,
        preference, panelStatus, displayPreview: true };
      assert.deepEqual(assessReviewRouting({ ...routing,
        events: [{ type: 'context-read' }, { type: 'capabilities-read' }, { type: 'integration-failed' }] }), []);
      assert.ok(assessReviewRouting({ ...routing,
        events: [{ type: 'context-read' }, { type: 'capabilities-read' }, { type: 'visualize-rendered' }] })
        .includes('missing-integration-diagnostic'));
    });
  }
}

test('development connection preserves explicit Visualize preference', () => {
  assert.deepEqual(assessReviewRouting({ host: 'codex-desktop', codexPluginInstalled: false,
    preference: 'visualize', panelStatus: 'advertised', displayPreview: true,
    events: [{ type: 'context-read' }, { type: 'visualize-rendered' }, { type: 'preview-delivered' }] }), []);
});

test('detects the duplicate Preview, duplicate confirmation and original-hash execution mistakes', () => {
  const events = structuredClone(accepted);
  events.splice(3, 0, { type: 'request-prepared' }, { type: 'preview-delivered' });
  events.splice(-1, 0, { type: 'conversational-confirmation' });
  events.at(-1).expectedRequestSha256 = 'source';
  assert.deepEqual(assessReviewRouting({ host: 'codex-desktop', codexPluginInstalled: true, preference: 'panel', panelStatus: 'advertised',
    displayPreview: true, events }), ['duplicate-studio-preview', 'duplicate-confirmation', 'accepted-edits-not-validated']);
});

test('cancel, reconfiguration and an already consumed Submit cannot authorize execution', () => {
  for (const action of ['cancel', 'reconfigure', 'submit']) {
    const events = structuredClone(accepted);
    Object.assign(events.find((event) => event.type === 'action-consumed'), { action, alreadyConsumed: action === 'submit' });
    assert.ok(assessReviewRouting({ host: 'codex-desktop', codexPluginInstalled: true, preference: 'panel', panelStatus: 'advertised',
      displayPreview: true, events }).includes('unaccepted-panel-execution'));
  }
});

test('failed panel handshake or mandatory Preview delivery prevents execution', () => {
  assert.ok(assessReviewRouting({ host: 'codex-desktop', codexPluginInstalled: true, preference: 'panel', panelStatus: 'advertised',
    displayPreview: true, events: [...accepted.slice(0, -1), { type: 'integration-failed' }, accepted.at(-1)] })
    .includes('executed-after-review-failure'));
  assert.deepEqual(assessReviewRouting({ host: 'codex-cli', preference: 'panel', panelStatus: 'unavailable',
    displayPreview: false, events: [{ type: 'context-read' }, { type: 'preview-failed' }] }), []);
});

test('built-in images consume the panel action without Engines validation', () => {
  assert.deepEqual(assessReviewRouting({ host: 'codex-desktop', codexPluginInstalled: true, preference: 'panel', panelStatus: 'advertised',
    engines: false, displayPreview: false, events: accepted.filter((event) => event.type !== 'validate') }), []);
});
