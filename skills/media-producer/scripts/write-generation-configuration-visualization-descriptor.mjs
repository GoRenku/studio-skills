#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const TEMPLATE_CONTRACT_VERSION = 1;

export async function buildGenerationConfigurationVisualizationDescriptor(input) {
  const routeCatalogs = await Promise.all(input.routeIndexes.map(async (filePath) => {
    const document = JSON.parse(await readRegularFile(filePath, '--route-index'));
    if (!isRecord(document) || typeof document.provider !== 'string') {
      throw new Error(`Route index does not declare a provider: ${filePath}`);
    }
    return { provider: document.provider, document };
  }));
  routeCatalogs.sort((left, right) => left.provider.localeCompare(right.provider));
  const providers = routeCatalogs.map(({ provider }) => provider);
  if (new Set(providers).size !== providers.length) {
    throw new Error('Each --route-index must describe a different provider.');
  }
  const [visualizeSkill, templateContract] = await Promise.all([
    readRegularFile(input.visualizeSkillPath, '--visualize-skill'),
    readRegularFile(input.templateContractPath, '--template-contract'),
  ]);
  return {
    provider: input.provider,
    model: input.model,
    operation: input.operation,
    inputMode: input.inputMode,
    routeCatalogSha256: sha256(canonicalJson(routeCatalogs)),
    visualizeSkillVersion: input.visualizeSkillVersion,
    visualizeSkillSha256: sha256(visualizeSkill),
    templateContractVersion: TEMPLATE_CONTRACT_VERSION,
    templateContractSha256: sha256(templateContract),
  };
}

export async function writeGenerationConfigurationVisualizationDescriptor(input) {
  const descriptor = await buildGenerationConfigurationVisualizationDescriptor(input);
  await writeFileAtomically(input.outputPath, `${JSON.stringify(descriptor, null, 2)}\n`);
  return { descriptor, outputPath: path.resolve(input.outputPath) };
}

function parseArguments(argv) {
  const values = new Map();
  const routeIndexes = [];
  for (let index = 0; index < argv.length; index += 2) {
    const flag = argv[index];
    const value = argv[index + 1];
    if (!flag?.startsWith('--') || !value) {
      throw new Error('Every argument must be a flag followed by a value.');
    }
    if (flag === '--route-index') {
      routeIndexes.push(value);
    } else if (values.has(flag)) {
      throw new Error(`Flag may be provided only once: ${flag}`);
    } else {
      values.set(flag, value);
    }
  }
  const required = (flag) => {
    const value = values.get(flag);
    if (!value) {
      throw new Error(`Missing required flag: ${flag}`);
    }
    return value;
  };
  if (routeIndexes.length === 0) {
    throw new Error('At least one --route-index is required.');
  }
  return {
    provider: required('--provider'),
    model: required('--model'),
    operation: required('--operation'),
    inputMode: required('--input-mode'),
    routeIndexes,
    visualizeSkillPath: required('--visualize-skill'),
    visualizeSkillVersion: required('--visualize-skill-version'),
    templateContractPath: required('--template-contract'),
    outputPath: required('--output'),
  };
}

function canonicalJson(value) {
  if (Array.isArray(value)) {
    return `[${value.map(canonicalJson).join(',')}]`;
  }
  if (isRecord(value)) {
    return `{${Object.keys(value).sort().map((key) =>
      `${JSON.stringify(key)}:${canonicalJson(value[key])}`
    ).join(',')}}`;
  }
  return JSON.stringify(value);
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
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
    const result = await writeGenerationConfigurationVisualizationDescriptor(
      parseArguments(process.argv.slice(2))
    );
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}
