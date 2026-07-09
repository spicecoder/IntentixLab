import fs from 'node:fs/promises';
import path from 'node:path';

export async function readJSON(filePath) {
  return JSON.parse(await fs.readFile(filePath, 'utf8'));
}

export async function writeJSON(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(value, null, 2));
}

export async function readText(filePath) {
  return fs.readFile(filePath, 'utf8');
}

export async function writeText(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, value);
}

export function repoPath(...parts) {
  return path.resolve(process.cwd(), ...parts);
}
