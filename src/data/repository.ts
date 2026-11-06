import AsyncStorage from '@react-native-async-storage/async-storage';

import { nationalDigits } from './format';
import { addresses as seedAddresses, routes as seedRoutes, users as seedUsers } from './seed';
import type { Address, AuthResult, TurnOnRoute, User } from './types';

// ---------------------------------------------------------------------------
// Single data-access layer (D-016, Level 1). Screens only talk to `repository`.
// This local implementation persists to the device and fakes network latency;
// swapping it for a real API later means re-implementing this interface only.
// ---------------------------------------------------------------------------
export interface Repository {
  getSession(): Promise<User | null>;
  checkPhone(phone: string): Promise<User | null>;
  signIn(phone: string, pin: string): Promise<AuthResult>;
  signOut(): Promise<void>;
  listRoutes(): Promise<TurnOnRoute[]>;
  listAddresses(routeId: string): Promise<Address[]>;
  getAddress(id: string): Promise<Address | null>;
  markTurnedOn(id: string, notes: string, by: User): Promise<Address>;
}

const KEYS = { addresses: 'cuinc.addresses.v1', session: 'cuinc.session.v1' };
const LATENCY_MS = 250;
const wait = () => new Promise<void>((resolve) => setTimeout(resolve, LATENCY_MS));

async function read<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null; // storage unavailable (private mode etc.): fall back to seed data
  }
}

async function write(key: string, value: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore: the app still works in memory for this session
  }
}

let memory: Address[] | null = null;

async function loadAddresses(): Promise<Address[]> {
  if (memory) return memory;
  memory = (await read<Address[]>(KEYS.addresses)) ?? seedAddresses.map((a) => ({ ...a }));
  return memory;
}

export const normalizePhone = nationalDigits;

export const repository: Repository = {
  async getSession() {
    const id = await read<string>(KEYS.session);
    return seedUsers.find((u) => u.id === id) ?? null;
  },

  async checkPhone(phone) {
    await wait();
    return seedUsers.find((u) => u.phone === normalizePhone(phone)) ?? null;
  },

  async signIn(phone, pin) {
    await wait();
    const user = seedUsers.find((u) => u.phone === normalizePhone(phone));
    if (!user) return { ok: false, reason: 'phone_not_found' };
    if (user.pin !== pin) return { ok: false, reason: 'wrong_pin' };
    await write(KEYS.session, user.id);
    return { ok: true, user };
  },

  async signOut() {
    try {
      await AsyncStorage.removeItem(KEYS.session);
    } catch {
      // ignore
    }
  },

  async listRoutes() {
    await wait();
    return seedRoutes;
  },

  async listAddresses(routeId) {
    await wait();
    return (await loadAddresses()).filter((a) => a.routeId === routeId);
  },

  async getAddress(id) {
    return (await loadAddresses()).find((a) => a.id === id) ?? null;
  },

  async markTurnedOn(id, notes, by) {
    await wait();
    const all = await loadAddresses();
    const idx = all.findIndex((a) => a.id === id);
    if (idx < 0) throw new Error('Address not found');
    const updated: Address = {
      ...all[idx],
      notes: notes.trim(),
      status: 'turned_on',
      turnedOnBy: by.name,
      turnedOnAt: new Date().toISOString(),
    };
    memory = all.map((a, i) => (i === idx ? updated : a));
    await write(KEYS.addresses, memory);
    return updated;
  },
};
