#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const skillRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const expectedPurposes = new Set([
  'image.create',
  'image.edit',
  'lookbook.image',
  'lookbook.video-sheet',
  'lookbook.storyboard-sheet',
  'cast.character-sheet',
  'cast.profile',
  'location.sheet',
  'location.hero',
  'scene.storyboard-sheet',
  'shot.image',
]);
const hiddenManagedFields = new Set([
  'num_images',
  'sync_mode',
  'output_format',
  'safety_tolerance',
  'seed',
  'limit_generations',
  'enable_web_search',
]);

const project = readProjectArgument(process.argv.slice(2));
const registryPath = join(skillRoot, 'references/image-model-guide-registry.json');
const registry = readJson(registryPath);
const errors = [];
const registryRoutes = new Map();

for (const [index, route] of (registry.routes ?? []).entries()) {
  if (!isNonEmptyString(route.provider) || !isNonEmptyString(route.model) ||
      !isNonEmptyString(route.guide)) {
    errors.push(`Registry route ${index + 1} must contain provider, model, and guide.`);
    continue;
  }
  const identity = routeIdentity(route);
  if (registryRoutes.has(identity)) {
    errors.push(`Registry route ${identity} is duplicated.`);
  }
  registryRoutes.set(identity, route);
  const guidePath = resolve(skillRoot, route.guide);
  if (!guidePath.startsWith(skillRoot) || !existsSync(guidePath)) {
    errors.push(`Registry guide for ${identity} does not exist: ${route.guide}`);
  }
}

const descriptors = listCurrentImageDescriptors(project);
const descriptorRoutes = new Map(
  descriptors.map((descriptor) => [routeIdentity(descriptor), descriptor]),
);

for (const identity of descriptorRoutes.keys()) {
  if (!registryRoutes.has(identity)) {
    errors.push(`Current image route ${identity} has no prompt guide.`);
  }
}
for (const identity of registryRoutes.keys()) {
  if (!descriptorRoutes.has(identity)) {
    errors.push(`Registry route ${identity} is not exposed by the current CLI.`);
  }
}

const coveredPurposes = new Set();
const samplesRoot = join(skillRoot, 'samples');
for (const filename of readdirSync(samplesRoot).filter((name) => name.endsWith('-spec.json'))) {
  const samplePath = join(samplesRoot, filename);
  const sample = readJson(samplePath);
  if (!expectedPurposes.has(sample.purpose)) {
    continue;
  }
  coveredPurposes.add(sample.purpose);
  validateSample(sample, filename, descriptorRoutes, registryRoutes, errors);
}

for (const purpose of expectedPurposes) {
  if (!coveredPurposes.has(purpose)) {
    errors.push(`No current sample covers image purpose ${purpose}.`);
  }
}

const evaluationsPath = join(
  skillRoot,
  'evals/image-prompt-routing/forward-test-cases.md',
);
if (!existsSync(evaluationsPath)) {
  errors.push('Image prompt routing forward evaluations are missing.');
}

if (errors.length > 0) {
  console.error(`Image prompt guide validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Validated ${registryRoutes.size} image routes, ${coveredPurposes.size} image purposes, and ${relative(process.cwd(), evaluationsPath)} for project ${project}.`,
);

function readProjectArgument(args) {
  const index = args.indexOf('--project');
  const value = index >= 0 ? args[index + 1] : undefined;
  if (!isNonEmptyString(value)) {
    console.error('Usage: node validate-image-prompt-guides.mjs --project <project>');
    process.exit(2);
  }
  return value;
}

function listCurrentImageDescriptors(projectName) {
  const descriptors = [];
  for (const purpose of ['image.create', 'image.edit']) {
    const output = execFileSync(
      'renku',
      ['generation', 'model', 'list', '--project', projectName, '--purpose', purpose, '--json'],
      { encoding: 'utf8' },
    );
    const rows = JSON.parse(output);
    for (const row of rows) {
      if (row.mediaKind === 'image') descriptors.push(row);
    }
  }
  return [...new Map(descriptors.map((row) => [routeIdentity(row), row])).values()];
}

function validateSample(sample, filename, descriptorRoutes, registryRoutes, validationErrors) {
  if (sample.executionKind === 'agent-external') {
    if (sample.model?.provider !== 'codex' ||
        Object.keys(sample.values ?? {}).join(',') !== 'prompt') {
      validationErrors.push(`${filename} must keep the Codex external values envelope prompt-only.`);
    }
    return;
  }

  const identity = routeIdentity(sample.model ?? {});
  const descriptor = descriptorRoutes.get(identity);
  if (!descriptor || !registryRoutes.has(identity)) {
    validationErrors.push(`${filename} selects image route ${identity} without a current guide.`);
    return;
  }

  for (const field of hiddenManagedFields) {
    if (Object.hasOwn(sample.values ?? {}, field)) {
      validationErrors.push(`${filename} authors hidden managed field ${field}.`);
    }
  }

  const descriptorFields = new Set((descriptor.fields ?? []).map((field) => field.name));
  const mentions = new Set();
  for (const [index, reference] of (sample.references ?? []).entries()) {
    if (Object.hasOwn(reference, 'included')) {
      validationErrors.push(`${filename} reference ${index + 1} uses obsolete included state.`);
    }
    if (reference.providerField && !descriptorFields.has(reference.providerField)) {
      validationErrors.push(
        `${filename} reference ${index + 1} names unknown provider field ${reference.providerField}.`,
      );
    }
    if (reference.promptMention) {
      if (mentions.has(reference.promptMention)) {
        validationErrors.push(`${filename} repeats prompt mention ${reference.promptMention}.`);
      }
      mentions.add(reference.promptMention);
    }
  }
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function routeIdentity(value) {
  return `${value.provider}/${value.model}`;
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}
