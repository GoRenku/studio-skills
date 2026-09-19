import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const providers = [
  ['fal-ai-media-provider', 'fal-ai'],
  ['pika-media-provider', 'pika'],
  ['replicate-media-provider', 'replicate'],
  ['wavespeed-media-provider', 'wavespeed-ai'],
  ['elevenlabs-media-provider', 'elevenlabs'],
];
await validateSkill('media-producer');
await validateSkill('model-researcher');
const mediaProducer = await readSkill('media-producer');
const routesByProvider = new Map();
for (const [skillName, provider] of providers) {
  await validateSkill(skillName);
  const providerSkill = await readSkill(skillName);
  if (!mediaProducer.includes(skillName)) {
    throw new Error(`Media Producer does not route to ${skillName}.`);
  }
  if (provider !== 'elevenlabs'
    && !new RegExp(`generation schema show --provider\\s+${provider}`).test(providerSkill)) {
    throw new Error(`${skillName} must inspect its exact live provider schema.`);
  }
  for (const required of [
    'supported-routes.json',
    'apiId',
    'review document',
    '`model` field',
  ]) {
    if (!providerSkill.includes(required)) {
      throw new Error(`${skillName} does not explain how to resolve ${required}.`);
    }
  }

  const indexPath = path.join(root, 'skills', skillName, 'references', 'supported-routes.json');
  const index = JSON.parse(await readFile(indexPath, 'utf8'));
  if (index.provider !== provider || !Array.isArray(index.routes) || index.routes.length === 0) {
    throw new Error(`${skillName} has an invalid supported-route index.`);
  }
  const seen = new Set();
  for (const route of index.routes) {
    if (!route || typeof route !== 'object'
      || !nonEmpty(route.apiId) || !nonEmpty(route.name)
      || seen.has(route.apiId)) {
      throw new Error(`${skillName} has an invalid or duplicate route entry.`);
    }
    if (!exactApiId(route.apiId)
      || (provider === 'fal-ai' && !route.apiId.includes('/'))) {
      throw new Error(`${skillName} route ${route.apiId} is not an exact provider API id.`);
    }
    const allowedKeys = ['adapter', 'apiId', 'docs', 'mediaKind', 'modelKey', 'name', 'operations'];
    if (Object.keys(route).some((key) => !allowedKeys.includes(key))) {
      throw new Error(`${skillName} route ${route.apiId} contains an unsupported field.`);
    }
    if (route.adapter !== undefined) {
      await assertRelativeFile(indexPath, route.adapter, `adapter for ${provider}/${route.apiId}`);
    }
    if (route.docs !== undefined && !/^https:\/\//.test(route.docs)) {
      throw new Error(`${skillName} route ${route.apiId} has an invalid docs URL.`);
    }
    seen.add(route.apiId);
  }
  routesByProvider.set(provider, index.routes);
}

for (const required of [
  'generation context',
  'context is evidence, not permission',
  'ignore, supplement, or replace',
  'generation validate',
  'generation preview show',
  'generation execute',
  'generation recover',
  'media import',
  '--provenance',
  'supported-routes.json',
  'model-catalog.json',
  'modelKey',
  'canonical model guide',
  'provider adapter',
]) {
  if (!mediaProducer.includes(required)) {
    throw new Error(`Media Producer is missing ${required}.`);
  }
}

const inlineConfiguration = await readFile(
  path.join(root, 'skills/media-producer/references/inline-generation-configuration.md'),
  'utf8',
);
for (const required of [
  'configuration-visualization inspect',
  '24 hours',
  'materialize-generation-configuration-visualization.mjs',
  '<!--__RENKU_GENERATION_CONFIGURATION_PAYLOAD__-->',
  'stale-on-error',
]) {
  if (!inlineConfiguration.includes(required)) {
    throw new Error(`Inline generation configuration is missing ${required}.`);
  }
}

const allSkillFiles = (await Promise.all(
  ['media-producer', 'model-researcher', ...providers.map(([name]) => name)]
    .map((name) => listFiles(path.join(root, 'skills', name))),
)).flat();
for (const file of allSkillFiles) {
  if (file.endsWith('.md')) await validateMarkdownLinks(file);
}

const mediaProducerFiles = await listFiles(path.join(root, 'skills', 'media-producer'));
const reviewFiles = mediaProducerFiles.filter((file) => file.endsWith('-review.json'));
const reviewedMediaKinds = new Set();
let includesCodexReview = false;
for (const file of reviewFiles) {
  const document = JSON.parse(await readFile(file, 'utf8'));
  const keys = Object.keys(document).sort().join(',');
  if (keys !== 'mediaKind,model,prompt,provider,request'
    || typeof document.provider !== 'string'
    || typeof document.model !== 'string'
    || !['image', 'audio', 'video'].includes(document.mediaKind)
    || typeof document.prompt !== 'string'
    || !plainObject(document.request)) {
    throw new Error(`Media Producer review sample has an invalid envelope: ${file}.`);
  }
  reviewedMediaKinds.add(document.mediaKind);
  includesCodexReview ||= document.provider === 'codex';
  validateReviewMarkers(document.request, file);
}

if ([...reviewedMediaKinds].sort().join(',') !== 'audio,image,video' || !includesCodexReview) {
  throw new Error('Media Producer samples must cover image, audio, video, and Codex review envelopes.');
}

console.log(`Validated ${
  [...routesByProvider.values()].reduce((sum, routes) => sum + routes.length, 0)
} provider routes.`);

function validateReviewMarkers(value, file) {
  if (Array.isArray(value)) {
    value.forEach((entry) => validateReviewMarkers(entry, file));
    return;
  }
  if (!value || typeof value !== 'object') return;
  if (Object.prototype.hasOwnProperty.call(value, '$file')) {
    const keys = Object.keys(value);
    if (typeof value.$file !== 'string'
      || typeof value.reviewLabel !== 'string'
      || !value.reviewLabel.trim()
      || keys.some((key) => !['$file', 'mimeType', 'reviewLabel', 'promptMention'].includes(key))) {
      throw new Error(`Media Producer review sample has an invalid local-media marker: ${file}.`);
    }
    return;
  }
  Object.values(value).forEach((entry) => validateReviewMarkers(entry, file));
}

async function validateSkill(name) {
  const content = await readSkill(name);
  const frontmatter = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatter) throw new Error(`${name} has no YAML frontmatter.`);
  const skillName = frontmatter[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const description = frontmatter[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();
  if (skillName !== name || !description || !/^[a-z0-9-]+$/.test(skillName)) {
    throw new Error(`${name} has invalid frontmatter.`);
  }
  if (content.includes('[TODO:')) throw new Error(`${name} contains an unfinished placeholder.`);
}

function readSkill(name) {
  return readFile(path.join(root, 'skills', name, 'SKILL.md'), 'utf8');
}

async function assertRelativeFile(ownerPath, relativePath, label) {
  const resolved = path.resolve(path.dirname(ownerPath), relativePath);
  if (!resolved.startsWith(`${path.dirname(ownerPath)}${path.sep}`)) {
    throw new Error(`Invalid path for ${label}: ${relativePath}.`);
  }
  try {
    await stat(resolved);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

async function validateMarkdownLinks(file) {
  const content = await readFile(file, 'utf8');
  for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const rawTarget = match[1].trim().replace(/^<|>$/g, '');
    if (!rawTarget || /^(?:https?:|mailto:|#)/.test(rawTarget)) continue;
    const relativeTarget = rawTarget.split('#', 1)[0];
    if (!relativeTarget || /[<>]/.test(relativeTarget)) continue;
    try {
      await stat(path.resolve(path.dirname(file), relativeTarget));
    } catch (error) {
      if (error.code === 'ENOENT' && (file.includes('model-guides') || rawTarget.includes('model-guides'))) continue;
      throw new Error(`Broken local Markdown link in ${path.relative(root, file)}: ${rawTarget}.`);
    }
  }
}

function nonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function exactApiId(value) {
  return /^[A-Za-z0-9._:-]+(?:\/[A-Za-z0-9._:-]+)*$/.test(value)
    && value.split('/').every((segment) => segment !== '.' && segment !== '..');
}

function plainObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(entryPath));
    else if (entry.isFile()) files.push(entryPath);
  }
  return files;
}
