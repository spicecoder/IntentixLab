'use client';

import { getSettings } from './indexeddb';

export interface WPAuthResult {
  loggedIn: boolean;
  user?: { id: number; name: string; email: string; roles: string[] };
}

export async function wpCheckHealth(): Promise<{ status: string; version: string } | null> {
  const settings = await getSettings();
  try {
    const res = await fetch(`${settings.wpApiUrl}/health`, {
      credentials: 'include',
    });
    if (res.ok) return res.json();
    return null;
  } catch {
    return null;
  }
}

export async function wpCheckLogin(): Promise<WPAuthResult> {
  const settings = await getSettings();
  const headers: Record<string, string> = {};
  if (settings.wpUsername && settings.wpAppPassword) {
    headers['Authorization'] = 'Basic ' + btoa(`${settings.wpUsername}:${settings.wpAppPassword}`);
  }
  try {
    const res = await fetch(`${settings.wpApiUrl}/me`, {
      credentials: 'include',
      headers,
    });
    const data = await res.json();
    if (data?.logged_in || data?.user_id) {
      return {
        loggedIn: true,
        user: {
          id: data?.user_id ?? data?.ID ?? 0,
          name: data?.display_name ?? data?.user_login ?? '',
          email: data?.user_email ?? '',
          roles: data?.roles ?? [],
        },
      };
    }
    return { loggedIn: false };
  } catch {
    return { loggedIn: false };
  }
}

export function wpOpenLogin() {
  const base = (document.getElementById('__wp-api-base') as HTMLInputElement)?.value
    ?? 'https://keybytesystems.com/wp-json/isc/v1';
  const wpBase = base.replace('/wp-json/isc/v1', '');
  const redirect = encodeURIComponent(window.location.href);
  window.open(`${wpBase}/wp-login.php?redirect_to=${redirect}`, '_blank');
}

function wpAuthHeaders(settings: { wpUsername: string; wpAppPassword: string }): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (settings.wpUsername && settings.wpAppPassword) {
    headers['Authorization'] = 'Basic ' + btoa(`${settings.wpUsername}:${settings.wpAppPassword}`);
  }
  return headers;
}

export async function wpGetSchema(): Promise<any> {
  const settings = await getSettings();
  try {
    const res = await fetch(`${settings.wpApiUrl}/schema`, { credentials: 'include' });
    return res.json();
  } catch {
    return null;
  }
}

export async function wpGetSpaces(): Promise<any[]> {
  const settings = await getSettings();
  try {
    const res = await fetch(`${settings.wpApiUrl}/spaces`, { credentials: 'include' });
    const data = await res.json();
    return data?.spaces ?? [];
  } catch {
    return [];
  }
}

export async function wpGetPhrases(spaceUid?: string): Promise<any[]> {
  const settings = await getSettings();
  const path = spaceUid ? `/phrases?space_uid=${encodeURIComponent(spaceUid)}` : '/phrases';
  try {
    const res = await fetch(`${settings.wpApiUrl}${path}`, { credentials: 'include' });
    const data = await res.json();
    return data?.phrases ?? (Array.isArray(data) ? data : []);
  } catch {
    return [];
  }
}

export async function wpCreatePhrase(body: Record<string, any>): Promise<any> {
  const settings = await getSettings();
  const res = await fetch(`${settings.wpApiUrl}/phrases`, {
    method: 'POST',
    credentials: 'include',
    headers: wpAuthHeaders(settings),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`WP API error: ${res.status} - ${err}`);
  }
  return res.json();
}

export async function wpUpdatePhrase(id: number, body: Record<string, any>): Promise<any> {
  const settings = await getSettings();
  const res = await fetch(`${settings.wpApiUrl}/phrases/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: wpAuthHeaders(settings),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`WP API error: ${res.status} - ${err}`);
  }
  return res.json();
}
