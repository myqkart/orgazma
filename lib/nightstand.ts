"use client";

import { useSyncExternalStore } from "react";

const EVENT = "orgazma-library";

export interface ProgressMark {
  slug: string;
  position: number;
}

export interface Drawer {
  inProgress: ProgressMark[];
  saved: string[];
  finished: string[];
}

const EMPTY_DRAWER: Drawer = {
  inProgress: [],
  saved: [],
  finished: [],
};

let drawerCache: { raw: string; value: Drawer } | null = null;

function notify() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(EVENT));
}

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function snapshotRaw(): string {
  if (typeof window === "undefined") return "";
  const parts: string[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      if (key.startsWith("pos:") || key.startsWith("saved:") || key.startsWith("done:") || key === "dim") {
        parts.push(`${key}=${localStorage.getItem(key) ?? ""}`);
      }
    }
  } catch {
    return "";
  }
  parts.sort();
  return parts.join("|");
}

function parseDrawer(raw: string): Drawer {
  if (!raw) return EMPTY_DRAWER;
  const inProgress: ProgressMark[] = [];
  const saved: string[] = [];
  const finished: string[] = [];

  for (const part of raw.split("|")) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    const key = part.slice(0, eq);
    const value = part.slice(eq + 1);
    if (key.startsWith("pos:")) {
      const position = parseFloat(value);
      if (position > 80) inProgress.push({ slug: key.slice(4), position });
    } else if (key.startsWith("saved:") && value === "1") {
      saved.push(key.slice(6));
    } else if (key.startsWith("done:") && value === "1") {
      finished.push(key.slice(5));
    }
  }

  return { inProgress, saved, finished };
}

function readDrawerSnapshot(): Drawer {
  const raw = snapshotRaw();
  if (drawerCache && drawerCache.raw === raw) return drawerCache.value;
  const value = parseDrawer(raw);
  drawerCache = { raw, value };
  return value;
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function useDrawer(): Drawer {
  return useSyncExternalStore(subscribe, readDrawerSnapshot, () => EMPTY_DRAWER);
}

export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function useSaved(slug: string): boolean {
  return useSyncExternalStore(
    subscribe,
    () => safeGet(`saved:${slug}`) === "1",
    () => false
  );
}

export function useDim(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => safeGet("dim") === "1",
    () => false
  );
}

export function toggleSaved(slug: string): void {
  try {
    const key = `saved:${slug}`;
    if (localStorage.getItem(key) === "1") localStorage.removeItem(key);
    else localStorage.setItem(key, "1");
    notify();
  } catch {
    // ignore private mode
  }
}

export function toggleDim(): void {
  try {
    if (localStorage.getItem("dim") === "1") localStorage.removeItem("dim");
    else localStorage.setItem("dim", "1");
    notify();
  } catch {
    // ignore
  }
}

export function markFinished(slug: string): void {
  try {
    if (localStorage.getItem(`done:${slug}`) === "1") return;
    localStorage.setItem(`done:${slug}`, "1");
    localStorage.removeItem(`pos:${slug}`);
    notify();
  } catch {
    // ignore
  }
}
