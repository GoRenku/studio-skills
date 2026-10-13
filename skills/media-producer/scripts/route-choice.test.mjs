import assert from 'node:assert/strict';
import test from 'node:test';
import { assessRouteChoice } from '../evals/generation-context/route-choice.mjs';

const desktop = { host: 'codex-desktop', panelStatus: 'advertised' };
const chosen = [{ type: 'context-read' }, { type: 'route-chooser-opened' }, { type: 'turn-yielded' },
  { type: 'route-consumed', status: 'chosen' }, { type: 'authoring-started' }];
const direct = [{ type: 'context-read' }, { type: 'authoring-started' }];

test('Choose on opens the Route Chooser before authoring and consumes it once', () => {
  assert.deepEqual(assessRouteChoice({ ...desktop, chooseRouteBeforeGenerating: true, events: chosen }), []);
  assert.deepEqual(assessRouteChoice({ ...desktop, chooseRouteBeforeGenerating: true,
    events: [{ type: 'authoring-started' }, ...chosen.slice(1, -1)] }), ['authored-before-route-choice']);
  assert.ok(assessRouteChoice({ ...desktop, chooseRouteBeforeGenerating: true, events: direct })
    .includes('missing-route-choice'));
});

test('the chooser is skipped when Choose is off or the user named a route', () => {
  assert.deepEqual(assessRouteChoice({ ...desktop, chooseRouteBeforeGenerating: false, events: direct }), []);
  assert.deepEqual(assessRouteChoice({ ...desktop, chooseRouteBeforeGenerating: true, userNamedRoute: true, events: direct }), []);
  assert.deepEqual(assessRouteChoice({ ...desktop, chooseRouteBeforeGenerating: false, events: chosen }),
    ['unneeded-route-question']);
});

test('a missing default opens the chooser even when Choose is off, and says why', () => {
  const events = [...chosen.slice(0, 2), { type: 'missing-default-explained' }, ...chosen.slice(2)];
  assert.deepEqual(assessRouteChoice({ ...desktop, chooseRouteBeforeGenerating: false, defaultMissing: true, events }), []);
  assert.deepEqual(assessRouteChoice({ ...desktop, chooseRouteBeforeGenerating: false, defaultMissing: true, events: direct }),
    ['missing-route-choice', 'missing-default-not-explained']);
});

for (const host of ['codex-cli', 'claude-code', 'unidentified']) {
  test(`${host} asks one short question instead of opening the chooser`, () => {
    const routing = { host, panelStatus: 'unavailable', chooseRouteBeforeGenerating: true };
    assert.deepEqual(assessRouteChoice({ ...routing,
      events: [{ type: 'context-read' }, { type: 'route-question' }, { type: 'authoring-started' }] }), []);
    assert.deepEqual(assessRouteChoice({ ...routing,
      events: [{ type: 'route-question' }, { type: 'route-question' }, { type: 'authoring-started' }] }),
    ['repeated-route-question']);
  });
}

test('a canceled choice stops, and lane settings change only on request', () => {
  const canceled = chosen.map((event) => event.type === 'route-consumed' ? { ...event, status: 'canceled' } : event);
  assert.ok(assessRouteChoice({ ...desktop, chooseRouteBeforeGenerating: true, events: canceled })
    .includes('authored-without-chosen-route'));
  assert.deepEqual(assessRouteChoice({ ...desktop, chooseRouteBeforeGenerating: false,
    events: [...direct, { type: 'lane-settings-changed' }] }), ['unrequested-settings-change']);
  assert.deepEqual(assessRouteChoice({ ...desktop, chooseRouteBeforeGenerating: false, settingsChangeRequested: true,
    events: [...direct, { type: 'lane-settings-changed' }] }), []);
});
