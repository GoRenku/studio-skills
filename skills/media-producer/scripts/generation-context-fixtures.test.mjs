import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';

const { reports, fixtureIds } = JSON.parse(await fs.readFile(
  new URL('../evals/generation-context/fixtures.json', import.meta.url), 'utf8',
));

for (const [name, { report, text }] of Object.entries(reports)) {
  test(`generation briefing fixture ${name} preserves facts and resolves relationships`, () => {
    const assets = new Map(report.assets.map((asset) => [asset.id, asset]));
    assert.equal(assets.size, report.assets.length);
    for (const asset of assets.values()) {
      assert.equal('generationProvenance' in asset, false);
    }
    for (const group of report.suggestedReferences) {
      for (const candidate of group.candidates) {
        const asset = assets.get(candidate.assetId);
        assert.ok(asset);
        const file = asset.files.find((entry) => entry.id === candidate.assetFileId);
        assert.ok(file);
        assert.ok(text.includes(file.projectRelativePath));
      }
    }
    function inspect(value, key = '') {
      if (typeof value === 'string') {
        assert.ok(text.includes(value), `${name}: missing authored value or identity ${key}`);
        if (['assetId', 'sampleAssetId'].includes(key)) assert.ok(assets.has(value));
      } else if (Array.isArray(value)) {
        if (['assetIds', 'imageAssetIds'].includes(key)) {
          for (const id of value) assert.ok(assets.has(id));
        }
        value.forEach((entry) => inspect(entry, key));
      } else if (value && typeof value === 'object') {
        for (const [field, entry] of Object.entries(value)) {
          if (field === 'voiceIdentity') assert.ok(text.includes(JSON.stringify(entry)));
          else inspect(entry, field);
        }
      }
    }
    inspect(report);
  });
}

test('behavioral inputs include alternatives, voices, exact edit files and changed dependencies', () => {
  const character = reports.character.report;
  assert.ok(character.targetContext.activeDesign);
  assert.ok(character.suggestedReferences.some((group) => group.candidates.some((candidate) => !candidate.available)));
  const voices = reports.dialogue.report.targetContext.sceneContext.castVoicesByCastMemberId;
  assert.equal(Object.keys(voices).length, 2);
  for (const entries of Object.values(voices)) {
    assert.equal(entries.length, 2);
    assert.equal(entries.filter((voice) => voice.isDefault).length, 1);
    assert.equal(entries[0].voiceIdentity.settings.rate, 0);
  }
  assert.equal(reports.edit.report.assets[0].files.length, 2);
  const selected = (report) => report.suggestedReferences
    .filter((group) => group.role === 'dialogue-audio')
    .flatMap((group) => group.candidates.filter((candidate) => candidate.isWorkflowSelected));
  assert.equal(selected(reports.video.report).length, 2);
  assert.equal(selected(reports.videoAfterSelection.report).length, 1);
  assert.ok(selected(reports.video.report).every((candidate) =>
    !selected(reports.videoAfterSelection.report).some((other) => other.assetId === candidate.assetId)));
  assert.ok(!reports.locationBefore.report.assets.some((asset) => asset.id === fixtureIds.newLocationSheet));
  assert.ok(reports.locationAfter.report.assets.some((asset) => asset.id === fixtureIds.newLocationSheet));
});
