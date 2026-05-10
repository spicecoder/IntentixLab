'use client';

import { openDB, type IDBPDatabase } from 'idb';

const DB_NAME = 'cpux-authoring-tool';
const DB_VERSION = 1;

interface CpuxDB {
  projects: {
    key: string;
    value: StoredProject;
    indexes: { 'by-updated': string };
  };
  settings: {
    key: string;
    value: any;
  };
}

export interface StoredProject {
  id: string;
  name: string;
  scenario: string;
  phrases: string; // JSON string
  cpuxDesign: string; // JSON string
  verification: string; // JSON string
  exportData: string;
  createdAt: string;
  updatedAt: string;
}

let dbPromise: Promise<IDBPDatabase<CpuxDB>> | null = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<CpuxDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('projects')) {
          const store = db.createObjectStore('projects', { keyPath: 'id' });
          store.createIndex('by-updated', 'updatedAt');
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings');
        }
      },
    });
  }
  return dbPromise;
}

// Projects
export async function getAllProjects(): Promise<StoredProject[]> {
  const db = await getDB();
  const all = await db.getAll('projects');
  return all.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export async function getProject(id: string): Promise<StoredProject | undefined> {
  const db = await getDB();
  return db.get('projects', id);
}

export async function saveProject(project: StoredProject): Promise<void> {
  const db = await getDB();
  await db.put('projects', { ...project, updatedAt: new Date().toISOString() });
}

export async function createProject(name: string, scenario?: string, phrases?: string): Promise<StoredProject> {
  const db = await getDB();
  const now = new Date().toISOString();
  const project: StoredProject = {
    id: `proj-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    scenario: scenario ?? '',
    phrases: phrases ?? '[]',
    cpuxDesign: '{}',
    verification: '{}',
    exportData: '{}',
    createdAt: now,
    updatedAt: now,
  };
  await db.put('projects', project);
  return project;
}

export async function deleteProject(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('projects', id);
}

// Settings
export async function getSetting(key: string): Promise<any> {
  const db = await getDB();
  return db.get('settings', key);
}

export async function setSetting(key: string, value: any): Promise<void> {
  const db = await getDB();
  await db.put('settings', value, key);
}

export async function getSettings(): Promise<{
  llmApiUrl: string;
  llmApiKey: string;
  llmModel: string;
  wpApiUrl: string;
  wpUsername: string;
  wpAppPassword: string;
}> {
  const db = await getDB();
  return {
    llmApiUrl: (await db.get('settings', 'llmApiUrl')) ?? 'https://apps.abacus.ai/v1',
    llmApiKey: (await db.get('settings', 'llmApiKey')) ?? '',
    llmModel: (await db.get('settings', 'llmModel')) ?? 'gpt-5.4-mini',
    wpApiUrl: (await db.get('settings', 'wpApiUrl')) ?? 'https://keybytesystems.com/wp-json/isc/v1',
    wpUsername: (await db.get('settings', 'wpUsername')) ?? '',
    wpAppPassword: (await db.get('settings', 'wpAppPassword')) ?? '',
  };
}

export async function saveSettings(settings: Record<string, string>): Promise<void> {
  const db = await getDB();
  const tx = db.transaction('settings', 'readwrite');
  for (const [key, value] of Object.entries(settings)) {
    await tx.store.put(value, key);
  }
  await tx.done;
}
