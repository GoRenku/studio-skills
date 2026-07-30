#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const skillRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const project = readProjectArgument(process.argv.slice(2));
const registry = readJson(
  join(skillRoot, 'references/video-model-guide-registry.json'),
);
const errors = [];
const registryRoutes = new Map();

for (const [index, route] of (registry.routes ?? []).entries()) {
  if (!isNonEmptyString(route.provider)
      || !isNonEmptyString(route.model)
      || !isNonEmptyString(route.guide)) {
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

const descriptors = listCurrentVideoDescriptors(project);
const descriptorRoutes = new Map(
  descriptors.map((descriptor) => [routeIdentity(descriptor), descriptor]),
);
for (const identity of descriptorRoutes.keys()) {
  if (!registryRoutes.has(identity)) {
    errors.push(`Current Studio video route ${identity} has no guide.`);
  }
}
for (const identity of registryRoutes.keys()) {
  if (!descriptorRoutes.has(identity)) {
    errors.push(`Registry route ${identity} is not active in the current CLI.`);
  }
}

const samplesRoot = join(skillRoot, 'samples/shot-plan-video');
for (const filename of readdirSync(samplesRoot).filter((name) =>
  name.endsWith('-spec.json')
)) {
  validateSample(readJson(join(samplesRoot, filename)), filename, errors);
}

const evaluationPath = join(
  skillRoot,
  'evals/shot-plan-video/forward-test-cases.md',
);
if (!existsSync(evaluationPath)) {
  errors.push('Shot Plan video forward evaluations are missing.');
}
validateMarkdownLinks(
  [
    join(skillRoot, 'references/shot-plan-video'),
    join(skillRoot, 'references/video-generation'),
  ],
  errors,
);

if (errors.length > 0) {
  console.error(`Video prompt guide validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Validated ${registryRoutes.size} active video routes and current Shot Plan video samples for project ${project}.`,
);

function listCurrentVideoDescriptors(projectName) {
  const output = execFileSync(
    'renku',
    [
      'generation',
      'model',
      'list',
      '--project',
      projectName,
      '--purpose',
      'shot-plan.video-generation',
      '--json',
    ],
    { encoding: 'utf8' },
  );
  return JSON.parse(output).filter((descriptor) =>
    descriptor.mediaKind === 'video'
  );
}

function validateSample(sample, filename, validationErrors) {
  if (!sample.executionKind
      || !isNonEmptyString(sample.purpose)
      || sample.target?.kind !== 'project'
      || sample.target?.id !== 'project'
      || sample.authoredFrom?.kind !== 'shotPlan'
      || !isNonEmptyString(sample.authoredFrom?.id)) {
    validationErrors.push(`${filename} does not use the current Project/Shot Plan envelope.`);
  }
  if (sample.purpose === 'shot-plan.video-generation'
      && !['text-only', 'first-frame', 'first-last-frame', 'reference']
        .includes(sample.shotPlanVideoInputMode)) {
    validationErrors.push(`${filename} is missing a current video input mode.`);
  }
  for (const [index, reference] of (sample.references ?? []).entries()) {
    if (Object.hasOwn(reference, 'included')) {
      validationErrors.push(`${filename} reference ${index + 1} uses obsolete included state.`);
    }
  }
}

function validateMarkdownLinks(roots, validationErrors) {
  for (const markdownPath of roots.flatMap(listMarkdownFiles)) {
    const markdown = readFileSync(markdownPath, 'utf8');
    for (const match of markdown.matchAll(/`([^`\n]+\.md)`/g)) {
      const target = resolve(dirname(markdownPath), match[1]);
      if (!target.startsWith(skillRoot) || !existsSync(target)) {
        validationErrors.push(
          `Guide ${markdownPath.slice(skillRoot.length + 1)} references a missing file: ${match[1]}`,
        );
      }
    }
  }
}

function listMarkdownFiles(root) {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(root, entry.name);
    if (entry.isDirectory()) {
      return listMarkdownFiles(entryPath);
    }
    return entry.isFile() && entry.name.endsWith('.md') ? [entryPath] : [];
  });
}

function readProjectArgument(args) {
  const index = args.indexOf('--project');
  const value = index >= 0 ? args[index + 1] : undefined;
  if (!isNonEmptyString(value)) {
    console.error('Usage: node validate-video-prompt-guides.mjs --project <project>');
    process.exit(2);
  }
  return value;
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
