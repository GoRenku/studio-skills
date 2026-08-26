import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const providers = [
  ['fal-ai-media-provider', 'fal-ai'],
  ['replicate-media-provider', 'replicate'],
  ['wavespeed-media-provider', 'wavespeed-ai'],
  ['elevenlabs-media-provider', 'elevenlabs'],
];

await validateSkill('media-producer');
const mediaProducer = await readSkill('media-producer');
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
  const indexPath = path.join(root, 'skills', skillName, 'references', 'supported-models.json');
  const index = JSON.parse(await readFile(indexPath, 'utf8'));
  if (index.provider !== provider || !Array.isArray(index.models) || index.models.length === 0) {
    throw new Error(`${skillName} has an invalid supported-model index.`);
  }
  const seen = new Set();
  for (const model of index.models) {
    if (!model || typeof model !== 'object') {
      throw new Error(`${skillName} has an invalid model entry.`);
    }
    const keys = Object.keys(model).sort();
    if (typeof model.id !== 'string' || typeof model.name !== 'string'
      || !Array.isArray(model.inputModes) || model.inputModes.length === 0
      || model.inputModes.some((mode) => typeof mode !== 'string' || mode.length === 0)
      || typeof model.guide !== 'string' || seen.has(model.id)
      || keys.join(',') !== 'guide,id,inputModes,name') {
      throw new Error(`${skillName} has an invalid or duplicate model entry.`);
    }
    seen.add(model.id);
    await stat(path.join(path.dirname(indexPath), model.guide));
  }
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
]) {
  if (!mediaProducer.includes(required)) {
    throw new Error(`Media Producer is missing ${required}.`);
  }
}

for (const forbidden of [
  'GenerationSpec',
  'estimate token',
  'providerField',
]) {
  if (mediaProducer.includes(forbidden)) {
    throw new Error(`Media Producer still contains obsolete generation language: ${forbidden}.`);
  }
}

const mediaProducerFiles = await listFiles(path.join(root, 'skills', 'media-producer'));
for (const file of mediaProducerFiles) {
  if (file.endsWith('-spec.json')) {
    throw new Error(`Media Producer still contains an obsolete Spec sample: ${file}.`);
  }
  if (file.endsWith('model-guide-registry.json')) {
    throw new Error(`Media Producer duplicates a provider model registry: ${file}.`);
  }
}

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
    || !document.request
    || typeof document.request !== 'object'
    || Array.isArray(document.request)) {
    throw new Error(`Media Producer review sample has an invalid envelope: ${file}.`);
  }
  reviewedMediaKinds.add(document.mediaKind);
  includesCodexReview ||= document.provider === 'codex';
  validateReviewMarkers(document.request, file);
}

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
if ([...reviewedMediaKinds].sort().join(',') !== 'audio,image,video'
  || !includesCodexReview) {
  throw new Error('Media Producer samples must cover image, audio, video, and Codex review envelopes.');
}

console.log('Media generation skills are valid.');

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

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFiles(entryPath));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }
  return files;
}
