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

test('builds a stable descriptor from semantic route index content', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'renku-card-descriptor-'));
  const firstRouteIndex = path.join(directory, 'fal.json');
  const secondRouteIndex = path.join(directory, 'pika.json');
  const visualizeSkillPath = path.join(directory, 'SKILL.md');
  const templateContractPath = path.join(directory, 'inline-generation-configuration.md');
  await fs.writeFile(firstRouteIndex, JSON.stringify({
    routes: [{ apiId: 'openai/gpt-image-2' }],
    provider: 'fal-ai',
  }));
  await fs.writeFile(secondRouteIndex, JSON.stringify({
    provider: 'pika',
    routes: [{ apiId: 'bytedance/seedream-5.0-pro/text-to-image' }],
  }));
  await fs.writeFile(visualizeSkillPath, '# Visualize\n');
  await fs.writeFile(templateContractPath, '# Inline generation configuration\n');
  const input = {
    provider: 'fal-ai',
    model: 'openai/gpt-image-2',
    operation: 'text-to-image',
    inputMode: 'text',
    routeIndexes: [secondRouteIndex, firstRouteIndex],
    visualizeSkillPath,
    visualizeSkillVersion: '1.0.27',
    templateContractPath,
  };

  const first = await buildGenerationConfigurationVisualizationDescriptor(input);
  const second = await buildGenerationConfigurationVisualizationDescriptor({
    ...input,
    routeIndexes: [firstRouteIndex, secondRouteIndex],
  });
  assert.deepEqual(first, second);
  assert.equal(first.routeCatalogSha256.length, 64);
  assert.equal(first.visualizeSkillSha256.length, 64);
  assert.equal(first.templateContractVersion, 1);
  assert.equal(first.templateContractSha256.length, 64);
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
