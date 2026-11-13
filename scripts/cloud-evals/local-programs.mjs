// Finds the programs an eval needs on this computer: the AI apps themselves
// and anything a case `requires`, such as Blender.
import { accessSync, constants } from 'node:fs';
import path from 'node:path';

/** Where a program is installed outside PATH, by name. */
const APP_LOCATIONS = {
  blender: ['/Applications/Blender.app/Contents/MacOS/Blender'],
};

/** The program's path, from PATH or its known install location; null when it is not installed. */
export function findProgram(name, { searchPath = process.env.PATH ?? '', locations = APP_LOCATIONS } = {}) {
  const candidates = [...searchPath.split(path.delimiter).filter(Boolean).map((folder) => path.join(folder, name)), ...(locations[name] ?? [])];
  return candidates.find(isExecutable) ?? null;
}

function isExecutable(file) {
  try {
    accessSync(file, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}
