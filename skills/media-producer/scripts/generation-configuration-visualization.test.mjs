import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  buildGenerationConfigurationVisualizationDescriptor,
} from './write-generation-configuration-visualization-descriptor.mjs';
import {
  materializeGenerationConfigurationVisualization,
} from './materialize-generation-configuration-visualization.mjs';

test('uses the effective route digest without reading optional guidance', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'renku-card-descriptor-'));
  const visualizeSkillPath = path.join(directory, 'SKILL.md');
  const templateContractPath = path.join(directory, 'contract.md');
  await fs.writeFile(visualizeSkillPath, '# Visualize');
  await fs.writeFile(templateContractPath, '# Configuration');
  const input = { provider: 'fal-ai', model: 'personal/new-model',
    operation: 'text-to-image', inputMode: 'text', routeCatalogSha256: 'a'.repeat(64),
    visualizeSkillPath, visualizeSkillVersion: '1.0.27', templateContractPath };
  const first = await buildGenerationConfigurationVisualizationDescriptor(input);
  assert.equal(first.routeCatalogSha256, input.routeCatalogSha256);
  assert.deepEqual(await buildGenerationConfigurationVisualizationDescriptor(input), first);
  const changed = await buildGenerationConfigurationVisualizationDescriptor({
    ...input, routeCatalogSha256: 'b'.repeat(64) });
  assert.notEqual(changed.routeCatalogSha256, first.routeCatalogSha256);
  assert.equal(changed.templateContractSha256, first.templateContractSha256);
  await assert.rejects(buildGenerationConfigurationVisualizationDescriptor({
    ...input, routeCatalogSha256: 'invalid' }), /SHA-256/);
});

test('materializes request data safely without changing the shared template', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'renku-card-materializer-'));
  const templatePath = path.join(directory, 'template.html');
  const payloadPath = path.join(directory, 'payload.json');
  const outputPath = path.join(directory, 'instance.html');
  const template = '<section><!--__RENKU_GENERATION_CONFIGURATION_PAYLOAD__--><script>void 0;</script></section>';
  const payload = {
    prompt: 'A literal </script><script>alert(1)</script> sequence',
    references: [],
  };
  await fs.writeFile(templatePath, template);
  await fs.writeFile(payloadPath, JSON.stringify(payload));

  const result = await materializeGenerationConfigurationVisualization({
    templatePath,
    payloadPath,
    outputPath,
  });
  const instance = await fs.readFile(outputPath, 'utf8');
  const payloadMatch = instance.match(
    /<script id="renku-generation-configuration-payload" type="application\/json">([^<]*)<\/script>/
  );
  assert.ok(payloadMatch);
  assert.deepEqual(JSON.parse(payloadMatch[1]), payload);
  assert.equal(instance.includes('</script><script>alert(1)</script>'), false);
  assert.equal(await fs.readFile(templatePath, 'utf8'), template);
  assert.equal(result.outputPath, outputPath);
});

test('rejects a template without exactly one payload placeholder', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'renku-card-materializer-'));
  const templatePath = path.join(directory, 'template.html');
  const payloadPath = path.join(directory, 'payload.json');
  await fs.writeFile(templatePath, '<section></section>');
  await fs.writeFile(payloadPath, '{}');

  await assert.rejects(
    materializeGenerationConfigurationVisualization({
      templatePath,
      payloadPath,
      outputPath: path.join(directory, 'instance.html'),
    }),
    /exactly one Renku payload placeholder/
  );
});
