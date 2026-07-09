import { readJSON, writeJSON, repoPath } from './io.js';

const registryPath = repoPath('registry', 'dn-registry.json');

export async function registerDN(entry) {
  let registry;
  try {
    registry = await readJSON(registryPath);
  } catch {
    registry = { dns: [] };
  }
  registry.dns = registry.dns.filter((dn) => dn.dnName !== entry.dnName);
  registry.dns.push({ ...entry, registeredAt: new Date().toISOString() });
  await writeJSON(registryPath, registry);
  return registry;
}

export async function listDNs() {
  return readJSON(registryPath);
}
