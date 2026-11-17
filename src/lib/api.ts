import type { Member, Video } from '../types';
import { readLocal, writeLocal } from './storage';

/**
 * Data access with the Fetch API.
 *
 * Locally, JSON-Server (`npm run server`) exposes data.json as a REST API:
 *   GET   /videos            the catalogue
 *   PATCH /videos/:id        toggle a bookmark
 *   GET   /users?email=…     look up a member
 *   POST  /users             register a member (written back into data.json)
 *
 * When no API is configured or reachable (e.g. the GitHub Pages build) the app
 * falls back to the static catalogue shipped with the build and keeps bookmarks
 * and members in localStorage instead.
 */
const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');
const STATIC_CATALOGUE = `${import.meta.env.BASE_URL}data.json`;
const BOOKMARKS_KEY = 'ewa:bookmarks';
const MEMBERS_KEY = 'ewa:members';

let apiCheck: Promise<boolean> | null = null;

function isApiAvailable(): Promise<boolean> {
  if (!API_URL) return Promise.resolve(false);
  apiCheck ??= fetch(`${API_URL}/videos?_limit=1`).then(
    (res) => res.ok,
    () => {
      console.info(`JSON-Server not reachable at ${API_URL}; using the static catalogue.`);
      return false;
    },
  );
  return apiCheck;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });
  if (!res.ok) throw new Error(`${init?.method ?? 'GET'} ${path} failed with ${res.status}`);
  return (await res.json()) as T;
}

export async function fetchVideos(): Promise<Video[]> {
  if (await isApiAvailable()) return request<Video[]>('/videos');

  const res = await fetch(STATIC_CATALOGUE);
  if (!res.ok) throw new Error(`Could not load the catalogue (${res.status})`);
  const { videos } = (await res.json()) as { videos: Video[] };
  const saved = readLocal<Record<string, boolean>>(BOOKMARKS_KEY, {});
  return videos.map((video) =>
    String(video.id) in saved ? { ...video, isBookmarked: saved[video.id] } : video,
  );
}

export async function saveBookmark(id: number, isBookmarked: boolean): Promise<void> {
  if (await isApiAvailable()) {
    await request<Video>(`/videos/${id}`, { method: 'PATCH', body: JSON.stringify({ isBookmarked }) });
    return;
  }
  const saved = readLocal<Record<string, boolean>>(BOOKMARKS_KEY, {});
  writeLocal(BOOKMARKS_KEY, { ...saved, [id]: isBookmarked });
}

/**
 * Passwords are never stored in clear text. An unsalted SHA-256 is fine for a
 * front-end exercise, but real authentication belongs on a server.
 */
async function hashPassword(password: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

const normaliseEmail = (email: string) => email.trim().toLowerCase();

async function findMember(email: string): Promise<Member | undefined> {
  if (await isApiAvailable()) {
    const matches = await request<Member[]>(`/users?email=${encodeURIComponent(email)}`);
    return matches[0];
  }
  return readLocal<Member[]>(MEMBERS_KEY, []).find((member) => member.email === email);
}

export async function registerMember(rawEmail: string, password: string): Promise<'created' | 'exists'> {
  const email = normaliseEmail(rawEmail);
  if (await findMember(email)) return 'exists';

  const member: Member = { email, passwordHash: await hashPassword(password), createdAt: new Date().toISOString() };
  if (await isApiAvailable()) {
    await request<Member>('/users', { method: 'POST', body: JSON.stringify(member) });
  } else {
    writeLocal(MEMBERS_KEY, [...readLocal<Member[]>(MEMBERS_KEY, []), member]);
  }
  return 'created';
}

export async function verifyMember(
  rawEmail: string,
  password: string,
): Promise<'ok' | 'unknown-email' | 'wrong-password'> {
  const member = await findMember(normaliseEmail(rawEmail));
  if (!member) return 'unknown-email';
  return member.passwordHash === (await hashPassword(password)) ? 'ok' : 'wrong-password';
}
