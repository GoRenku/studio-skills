import assert from 'node:assert/strict';
import test from 'node:test';
import { assessConfigurationHandoff, assessExecutionHandoff } from '../evals/generation-context/execution-handoff.mjs';

const event = (type, toolOperation = 1) => ({ type, toolOperation });

test('H3 preparation that reads Visualize twice but authors no component fails', () => {
  const events = ['visualize-read', 'schema-read', 'visualize-read', 'review-authored',
    'preview', 'execution-rejected'].map((type) => ({ type, turn: 1 }));
  assert.deepEqual(assessConfigurationHandoff(events),
    ['configuration-not-rendered', 'review-before-settings-acceptance']);
});

test('rendered configuration ends preparation turn before accepted settings reach review', () => {
  const events = [{ type: 'configuration-rendered', turn: 1 },
    { type: 'settings-accepted', turn: 2 }, { type: 'review-authored', turn: 2 }];
  assert.deepEqual(assessConfigurationHandoff(events), []);
  assert.ok(assessConfigurationHandoff(events.map((entry) => ({ ...entry, turn: 1 })))
    .includes('configuration-turn-not-ended'));
  assert.ok(assessConfigurationHandoff(events.filter((entry) => entry.type !== 'settings-accepted'))
    .includes('review-before-settings-acceptance'));
});
const prepared = { prompt: 'Keep the face.', request: { prompt: 'Native: Keep the face.', resolution: '768P' } };
const provenance = { ...prepared, receipt: { expanded_prompt: 'Provider-authored text', seed: 123 } };
const preparedSha256 = 'a'.repeat(64);
const baseline = {
  prepared, preparedSha256, submitted: prepared, returnedProvenance: provenance, attachedProvenance: provenance,
  events: ['configuration', 'preview', 'confirmation', 'execute',
    'artifact-ready', 'media-presented', 'analysis', 'attachment'].map((type) =>
    type === 'execute' ? { ...event(type), expectedRequestSha256: preparedSha256 } : event(type)),
};

test('unchanged handoff preserves transformed native prompt and exact receipt', () => {
  assert.deepEqual(assessExecutionHandoff(baseline), []);
});

test('observed H3 ordering fails for revalidation, separate decision, and late playback', () => {
  const events = [event('preview'), event('confirmation'), event('document-check', 1),
    event('validate', 2), event('execute', 3), event('artifact-ready'), event('analysis'),
    event('attachment'), event('media-presented')];
  assert.deepEqual(assessExecutionHandoff({ ...baseline, events }),
    ['redundant-validation', 'extra-confirmation-roundtrip', 'missing-request-precondition', 'delayed-presentation']);
});

for (const [name, submitted] of Object.entries({
  prompt: { ...prepared, prompt: 'Change the face.' },
  settings: { ...prepared, request: { ...prepared.request, resolution: '1080P' } },
  references: { ...prepared, request: { ...prepared.request, images: [{ $file: 'new.png' }] } },
})) {
  test(`${name} edits require preparation before submission`, () => {
    assert.ok(assessExecutionHandoff({ ...baseline, submitted }).includes('unprepared-changes'));
    const events = [...baseline.events];
    events.splice(3, 0, event('prepare-changes'), event('validate'));
    assert.deepEqual(assessExecutionHandoff({ ...baseline, submitted, events }), []);
  });
}

test('queued editor open does not establish visible media', () => {
  const events = baseline.events.map((entry) => entry.type === 'media-presented' ? event('open-queued') : entry);
  assert.ok(assessExecutionHandoff({ ...baseline, events }).includes('delayed-presentation'));
});

test('receipt reconstruction cannot silently lose provider fields', () => {
  assert.ok(assessExecutionHandoff({ ...baseline, attachedProvenance: prepared }).includes('provenance-changed'));
});

test('settings submission alone is not paid-generation confirmation', () => {
  const events = baseline.events.filter((entry) => entry.type !== 'confirmation');
  assert.ok(assessExecutionHandoff({ ...baseline, events }).includes('execution-without-confirmation'));
});

test('successful execution needs neither receipt recovery nor provenance extraction', () => {
  const events = [...baseline.events];
  events.splice(7, 0, event('recover'), event('provenance-extraction'));
  events.push(event('attachment-rediscovery'));
  assert.deepEqual(assessExecutionHandoff({ ...baseline, events }),
    ['unnecessary-recovery', 'avoidable-provenance-processing', 'attachment-rediscovery']);
});

test('a separate interrupted request can recover before its artifact arrives', () => {
  const events = [...baseline.events];
  events.splice(4, 0, event('interrupted'), event('recover'));
  assert.deepEqual(assessExecutionHandoff({ ...baseline, events }), []);
});

test('an unchanged request supplies the exact digest returned by validation', () => {
  const events = baseline.events.map((entry) => entry.type === 'execute'
    ? { ...entry, expectedRequestSha256: 'b'.repeat(64) } : entry);
  assert.ok(assessExecutionHandoff({ ...baseline, events }).includes('missing-request-precondition'));
});
