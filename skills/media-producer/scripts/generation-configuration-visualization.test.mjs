import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  buildGenerationConfigurationVisualizationDescriptor,
  prepareGenerationConfigurationVisualization,
} from './prepare-generation-configuration-visualization.mjs';

test('workflow edits do not invalidate templates, but contract edits do', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'renku-contract-'));
  const visualizeSkillPath = path.join(directory, 'SKILL.md');
  const templateContractPath = path.join(directory, 'contract.md');
  const workflowPath = path.join(directory, 'workflow.md');
  await fs.writeFile(visualizeSkillPath, 'Visualize');
  await fs.writeFile(templateContractPath, 'Payload contract');
  await fs.writeFile(workflowPath, 'Initial workflow');
  const input = { provider: 'atlas', model: 'route', operation: 'text-to-image',
    inputMode: 'text', visualizeSkillVersion: '1',
    visualizeSkillPath, templateContractPath };
  const first = await buildGenerationConfigurationVisualizationDescriptor(input);
  await fs.writeFile(workflowPath, 'Different command instructions');
  assert.deepEqual(await buildGenerationConfigurationVisualizationDescriptor(input), first);
  await fs.writeFile(templateContractPath, 'Changed payload contract');
  assert.notEqual((await buildGenerationConfigurationVisualizationDescriptor(input)).templateContractSha256,
    first.templateContractSha256);
});

test('prepares in one CLI invocation and returns its cache outcome unchanged', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'renku-prepare-card-'));
  const visualizeSkillPath = path.join(directory, 'SKILL.md');
  await fs.writeFile(visualizeSkillPath, 'Visualize');
  const input = { provider: 'atlas', model: 'route', operation: 'text-to-image',
    inputMode: 'text', visualizeSkillVersion: '1',
    visualizeSkillPath, descriptorPath: path.join(directory, 'descriptor.json'),
    payloadPath: path.join(directory, 'payload.json'), outputPath: path.join(directory, 'thread', 'card.html') };
  for (const status of ['fresh', 'miss', 'expired', 'incompatible']) {
    const calls = [];
    const expected = { status, descriptor: { provider: 'atlas', routeCatalogSha256: 'a'.repeat(64) }, ...(status === 'fresh' ? { outputPath: input.outputPath } : {}) };
    const result = await prepareGenerationConfigurationVisualization(input, async (args) => {
      calls.push(args);
      assert.equal(JSON.parse(await fs.readFile(input.descriptorPath, 'utf8')).model, 'route');
      return expected;
    });
    assert.deepEqual(result, expected);
    assert.equal(calls.length, 1);
    assert.deepEqual(calls[0].slice(0, 10), ['generation', 'configuration-visualization', 'prepare',
      '--file', input.descriptorPath, '--payload', input.payloadPath, '--output', input.outputPath, '--json']);
    assert.ok(calls[0].includes('--route-index'));
    assert.deepEqual(JSON.parse(await fs.readFile(input.descriptorPath, 'utf8')), expected.descriptor);
  }
});
