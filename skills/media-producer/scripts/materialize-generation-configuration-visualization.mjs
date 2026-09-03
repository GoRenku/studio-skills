#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const PAYLOAD_PLACEHOLDER = '<!--__RENKU_GENERATION_CONFIGURATION_PAYLOAD__-->';
const PAYLOAD_ELEMENT_ID = 'renku-generation-configuration-payload';
const VISUALIZATION_MAX_BYTES = 1_000_000;

export async function materializeGenerationConfigurationVisualization(input) {
  const [template, payloadContents] = await Promise.all([
    readRegularFile(input.templatePath, '--template'),
    readRegularFile(input.payloadPath, '--payload'),
  ]);
  if (template.split(PAYLOAD_PLACEHOLDER).length !== 2) {
    throw new Error('The template must contain exactly one Renku payload placeholder.');
  }
  if (new RegExp(`<[^>]*\\bid\\s*=\\s*["']${PAYLOAD_ELEMENT_ID}["']`, 'i').test(template)) {
    throw new Error('The shared template already contains a materialized request payload.');
  }
  let payload;
  try {
    payload = JSON.parse(payloadContents);
  } catch {
    throw new Error('The payload must be valid JSON.');
  }
  if (!isRecord(payload)) {
    throw new Error('The payload must be a JSON object.');
  }
  const serializedPayload = JSON.stringify(payload).replace(
    /[<>&\u2028\u2029]/g,
    (character) => `\\u${character.charCodeAt(0).toString(16).padStart(4, '0')}`
  );
  const payloadElement = `<script id="${PAYLOAD_ELEMENT_ID}" type="application/json">${serializedPayload}</script>`;
  const visualization = template.replace(PAYLOAD_PLACEHOLDER, payloadElement);
  if (/<\/?(?:html|head|body)\b|<!doctype\b/i.test(visualization)) {
    throw new Error('The materialized visualization must remain an HTML fragment.');
  }
  const byteLength = Buffer.byteLength(visualization, 'utf8');
  if (byteLength > VISUALIZATION_MAX_BYTES) {
    throw new Error('The materialized visualization exceeds the 1 MB Visualize limit.');
  }
  await writeFileAtomically(input.outputPath, visualization);
  return {
    outputPath: path.resolve(input.outputPath),
    byteLength,
    sha256: crypto.createHash('sha256').update(visualization).digest('hex'),
  };
}

function parseArguments(argv) {
  const values = new Map();
  for (let index = 0; index < argv.length; index += 2) {
    const flag = argv[index];
    const value = argv[index + 1];
    if (!flag?.startsWith('--') || !value) {
      throw new Error('Every argument must be a flag followed by a value.');
    }
    if (values.has(flag)) {
      throw new Error(`Flag may be provided only once: ${flag}`);
    }
    values.set(flag, value);
  }
  const required = (flag) => {
    const value = values.get(flag);
    if (!value) {
      throw new Error(`Missing required flag: ${flag}`);
    }
    return value;
  };
  return {
    templatePath: required('--template'),
    payloadPath: required('--payload'),
    outputPath: required('--output'),
  };
}

async function readRegularFile(filePath, flag) {
  const absolutePath = path.resolve(filePath);
  const stats = await fs.lstat(absolutePath);
  if (!stats.isFile() || stats.isSymbolicLink()) {
    throw new Error(`${flag} must point to a regular file: ${filePath}`);
  }
  return fs.readFile(absolutePath, 'utf8');
}

async function writeFileAtomically(filePath, contents) {
  const absolutePath = path.resolve(filePath);
  const directory = path.dirname(absolutePath);
  await fs.mkdir(directory, { recursive: true });
  try {
    const stats = await fs.lstat(absolutePath);
    if (!stats.isFile() || stats.isSymbolicLink()) {
      throw new Error(`Output must be a regular file: ${absolutePath}`);
    }
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      throw error;
    }
  }
  const temporaryPath = path.join(
    directory,
    `.${path.basename(absolutePath)}.${process.pid}.${crypto.randomUUID()}.tmp`
  );
  let temporaryCreated = false;
  try {
    const handle = await fs.open(temporaryPath, 'wx', 0o600);
    temporaryCreated = true;
    try {
      await handle.writeFile(contents, 'utf8');
      await handle.sync();
    } finally {
      await handle.close();
    }
    await fs.rename(temporaryPath, absolutePath);
    temporaryCreated = false;
  } finally {
    if (temporaryCreated) {
      await fs.unlink(temporaryPath).catch(() => undefined);
    }
  }
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const result = await materializeGenerationConfigurationVisualization(
      parseArguments(process.argv.slice(2))
    );
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}
