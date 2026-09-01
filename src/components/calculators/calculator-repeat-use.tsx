"use client";

import Link from "next/link";
import { useEffect, useMemo, useSyncExternalStore } from "react";

export type RepeatUseCalculator = {
  id: string;
  name: string;
  href: string;
};

type RepeatUseSnapshot = {
  favorites: string[];
  recent: string[];
};

const FAVORITES_KEY = "calcome:favorite-calculators:v1";
const RECENT_KEY = "calcome:recent-calculators:v1";
const REPEAT_USE_EVENT = "calcome:repeat-use";
const MAX_RECENT_CALCULATORS = 6;
const EMPTY_SNAPSHOT: RepeatUseSnapshot = { favorites: [], recent: [] };

let cachedSnapshot: RepeatUseSnapshot = EMPTY_SNAPSHOT;
let hasCachedSnapshot = false;
let listening = false;
const subscribers = new Set<() => void>();

function normalizeIds(value: unknown, limit = Number.POSITIVE_INFINITY) {
  if (!Array.isArray(value)) return [];

  const ids: string[] = [];
  for (const candidate of value) {
    if (typeof candidate !== "string") continue;
    const id = candidate.trim();
    if (!id || ids.includes(id)) continue;
    ids.push(id);
    if (ids.length >= limit) break;
  }
  return ids;
}

function readIds(key: string, limit?: number) {
  if (typeof window === "undefined") return [];

  try {
    return normalizeIds(
      JSON.parse(window.localStorage.getItem(key) ?? "[]"),
      limit,
    );
  } catch {
    return [];
  }
}

function writeIds(key: string, ids: readonly string[]) {
  if (typeof window === "undefined") return false;

  try {
    window.localStorage.setItem(key, JSON.stringify(ids));
    return true;
  } catch {
    return false;
  }
}

function readRepeatUseSnapshot(): RepeatUseSnapshot {
  return {
    favorites: readIds(FAVORITES_KEY),
    recent: readIds(RECENT_KEY, MAX_RECENT_CALCULATORS),
  };
}

function snapshotsEqual(a: RepeatUseSnapshot, b: RepeatUseSnapshot) {
  return (
    a.favorites.length === b.favorites.length &&
    a.recent.length === b.recent.length &&
    a.favorites.every((id, index) => id === b.favorites[index]) &&
    a.recent.every((id, index) => id === b.recent[index])
  );
}

function refreshRepeatUseSnapshot() {
  const next = readRepeatUseSnapshot();
  const changed = !hasCachedSnapshot || !snapshotsEqual(cachedSnapshot, next);
  cachedSnapshot = next;
  hasCachedSnapshot = true;

  if (changed) subscribers.forEach((subscriber) => subscriber());
}

function handleRepeatUseEvent() {
  refreshRepeatUseSnapshot();
}

function startListening() {
  if (listening || typeof window === "undefined") return;
  window.addEventListener(REPEAT_USE_EVENT, handleRepeatUseEvent);
  window.addEventListener("storage", handleRepeatUseEvent);
  listening = true;
}

function stopListening() {
  if (!listening || typeof window === "undefined") return;
  window.removeEventListener(REPEAT_USE_EVENT, handleRepeatUseEvent);
  window.removeEventListener("storage", handleRepeatUseEvent);
  listening = false;
}

function notifyRepeatUseChange() {
  if (typeof window === "undefined") return;
  refreshRepeatUseSnapshot();
  window.dispatchEvent(new Event(REPEAT_USE_EVENT));
}

export function subscribeRepeatUse(subscriber: () => void) {
  subscribers.add(subscriber);
  startListening();
  return () => {
    subscribers.delete(subscriber);
    if (subscribers.size === 0) stopListening();
  };
}

export function getRepeatUseSnapshot(): RepeatUseSnapshot {
  if (typeof window === "undefined") return EMPTY_SNAPSHOT;
  cachedSnapshot = readRepeatUseSnapshot();
  hasCachedSnapshot = true;
  return cachedSnapshot;
}

export function getCachedRepeatUseSnapshot(): RepeatUseSnapshot {
  if (typeof window === "undefined") return EMPTY_SNAPSHOT;
  if (!hasCachedSnapshot) refreshRepeatUseSnapshot();
  return cachedSnapshot;
}

export function isCalculatorFavorite(id: string) {
  return getRepeatUseSnapshot().favorites.includes(id);
}

export function toggleCalculatorFavorite(id: string) {
  const current = getRepeatUseSnapshot().favorites;
  const isFavorite = current.includes(id);
  const next = isFavorite
    ? current.filter((favoriteId) => favoriteId !== id)
    : [id, ...current];

  writeIds(FAVORITES_KEY, next);
  notifyRepeatUseChange();
  return !isFavorite;
}

export function moveCalculatorFavorite(id: string, direction: -1 | 1) {
  const favorites = getRepeatUseSnapshot().favorites;
  const currentIndex = favorites.indexOf(id);
  if (currentIndex < 0) return false;

  const nextIndex = currentIndex + direction;
  if (nextIndex < 0 || nextIndex >= favorites.length) return false;

  const next = [...favorites];
  [next[currentIndex], next[nextIndex]] = [next[nextIndex], next[currentIndex]];
  writeIds(FAVORITES_KEY, next);
  notifyRepeatUseChange();
  return true;
}

export function removeCalculatorFavorite(id: string) {
  const current = getRepeatUseSnapshot().favorites;
  writeIds(
    FAVORITES_KEY,
    current.filter((favoriteId) => favoriteId !== id),
  );
  notifyRepeatUseChange();
}

export function clearCalculatorFavorites() {
  writeIds(FAVORITES_KEY, []);
  notifyRepeatUseChange();
}

export function recordRecentCalculator(id: string) {
  const recent = getRepeatUseSnapshot().recent.filter(
    (recentId) => recentId !== id,
  );
  writeIds(RECENT_KEY, [id, ...recent].slice(0, MAX_RECENT_CALCULATORS));
  notifyRepeatUseChange();
}

export function removeRecentCalculator(id: string) {
  const recent = getRepeatUseSnapshot().recent;
  writeIds(
    RECENT_KEY,
    recent.filter((recentId) => recentId !== id),
  );
  notifyRepeatUseChange();
}

export function clearRecentCalculators() {
  writeIds(RECENT_KEY, []);
  notifyRepeatUseChange();
}

export function clearRepeatUseShortcuts() {
  writeIds(FAVORITES_KEY, []);
  writeIds(RECENT_KEY, []);
  notifyRepeatUseChange();
}

export function reconcileRepeatUseCalculators(validIds: readonly string[]) {
  const valid = new Set(validIds);
  const current = getRepeatUseSnapshot();
  const next: RepeatUseSnapshot = {
    favorites: current.favorites.filter((id) => valid.has(id)),
    recent: current.recent.filter((id) => valid.has(id)),
  };

  if (snapshotsEqual(current, next)) return false;

  writeIds(FAVORITES_KEY, next.favorites);
  writeIds(RECENT_KEY, next.recent);
  notifyRepeatUseChange();
  return true;
}

function resolveCalculators(
  ids: readonly string[],
  byId: ReadonlyMap<string, RepeatUseCalculator>,
) {
  return ids
    .map((id) => byId.get(id))
    .filter((calculator): calculator is RepeatUseCalculator =>
      Boolean(calculator),
    );
}

export function CalculatorRepeatUseShortcuts({
  calculators,
  locale = "ko",
}: {
  calculators: readonly RepeatUseCalculator[];
  locale?: "ko" | "en";
}) {
  const snapshot = useSyncExternalStore(
    subscribeRepeatUse,
    getCachedRepeatUseSnapshot,
    () => EMPTY_SNAPSHOT,
  );
  const isEnglish = locale === "en";
  const validIds = useMemo(
    () => calculators.map((calculator) => calculator.id),
    [calculators],
  );
  const byId = useMemo(
    () => new Map(calculators.map((calculator) => [calculator.id, calculator])),
    [calculators],
  );

  useEffect(() => {
    reconcileRepeatUseCalculators(validIds);
  }, [validIds]);

  const favorites = resolveCalculators(snapshot.favorites, byId);
  const favoriteIds = new Set(favorites.map((calculator) => calculator.id));
  const recent = resolveCalculators(snapshot.recent, byId).filter(
    (calculator) => !favoriteIds.has(calculator.id),
  );
  const isEmpty = favorites.length === 0 && recent.length === 0;
  const shortcutCount = favorites.length + recent.length;

  return (
    <section
      className="mt-10 rounded-xl border bg-muted/30 p-4 sm:p-5"
      aria-labelledby={`repeat-use-heading-${locale}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2
            id={`repeat-use-heading-${locale}`}
            className="text-base font-semibold tracking-tight"
          >
            {isEnglish ? "Your calculator shortcuts" : "내 계산기 바로가기"}
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {isEnglish
              ? "Stored only on this device"
              : "이 기기에만 저장됩니다"}
          </p>
        </div>
        {!isEmpty ? (
          <div className="flex min-h-11 items-center gap-2">
            <span className="text-xs text-muted-foreground" aria-live="polite">
              {isEnglish
                ? `${shortcutCount} shortcut${shortcutCount === 1 ? "" : "s"}`
                : `바로가기 ${shortcutCount}개`}
            </span>
            <button
              type="button"
              onClick={clearRepeatUseShortcuts}
              className="inline-flex min-h-11 items-center rounded-lg px-2 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30 motion-reduce:transition-none"
            >
              {isEnglish ? "Clear all" : "전체 지우기"}
            </button>
          </div>
        ) : null}
      </div>

      {isEmpty ? (
        <div className="mt-4 rounded-lg border border-dashed bg-background/70 p-4">
          <p className="text-sm text-muted-foreground">
            {isEnglish
              ? "Favorite a calculator or open one from the directory to keep a quick path back here."
              : "계산기를 즐겨찾기하거나 목록에서 사용하면 여기에서 빠르게 다시 열 수 있습니다."}
          </p>
          <Link
            href={isEnglish ? "/en/calculators" : "/ko/calculators"}
            className="mt-3 inline-flex min-h-11 items-center rounded-lg border bg-background px-3 text-sm font-medium transition hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30 motion-reduce:transition-none"
          >
            {isEnglish ? "Browse all calculators" : "전체 계산기 보기"}
          </Link>
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          {favorites.length > 0 ? (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {isEnglish ? "Favorites" : "즐겨찾기"}
                  </h3>
                  {favorites.length > 1 ? (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {isEnglish
                        ? "Use the arrow controls to personalize shortcut order."
                        : "화살표 버튼으로 바로가기 순서를 원하는 대로 바꿀 수 있습니다."}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={clearCalculatorFavorites}
                  className="inline-flex min-h-11 items-center rounded-lg px-2 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30 motion-reduce:transition-none"
                >
                  {isEnglish ? "Clear favorites" : "즐겨찾기 지우기"}
                </button>
              </div>
              <ul className="mt-2 flex flex-wrap gap-2">
                {favorites.map((calculator, index) => (
                  <li
                    key={calculator.id}
                    className="flex min-h-11 items-stretch overflow-hidden rounded-lg border bg-background"
                  >
                    <Link
                      href={calculator.href}
                      onClick={() => recordRecentCalculator(calculator.id)}
                      className="inline-flex items-center px-3 text-sm font-medium transition hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/30 motion-reduce:transition-none"
                    >
                      {calculator.name}
                    </Link>
                    {favorites.length > 1 ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            moveCalculatorFavorite(calculator.id, -1)
                          }
                          disabled={index === 0}
                          aria-label={
                            isEnglish
                              ? `Move ${calculator.name} earlier in favorites`
                              : `${calculator.name} 즐겨찾기에서 앞으로 이동`
                          }
                          className="inline-flex min-h-11 min-w-11 items-center justify-center border-l text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            moveCalculatorFavorite(calculator.id, 1)
                          }
                          disabled={index === favorites.length - 1}
                          aria-label={
                            isEnglish
                              ? `Move ${calculator.name} later in favorites`
                              : `${calculator.name} 즐겨찾기에서 뒤로 이동`
                          }
                          className="inline-flex min-h-11 min-w-11 items-center justify-center border-l text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none"
                        >
                          ↓
                        </button>
                      </>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => removeCalculatorFavorite(calculator.id)}
                      aria-label={
                        isEnglish
                          ? `Remove ${calculator.name} from favorites`
                          : `${calculator.name} 즐겨찾기에서 제거`
                      }
                      className="inline-flex min-h-11 min-w-11 items-center justify-center border-l text-base text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/30 motion-reduce:transition-none"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {recent.length > 0 ? (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {isEnglish ? "Recently used" : "최근 사용"}
                </h3>
                <button
                  type="button"
                  onClick={clearRecentCalculators}
                  className="inline-flex min-h-11 items-center rounded-lg px-2 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30 motion-reduce:transition-none"
                >
                  {isEnglish ? "Clear recent" : "최근 사용 지우기"}
                </button>
              </div>
              <ul className="mt-2 flex flex-wrap gap-2">
                {recent.map((calculator) => (
                  <li
                    key={calculator.id}
                    className="flex min-h-11 items-stretch overflow-hidden rounded-lg border bg-background"
                  >
                    <Link
                      href={calculator.href}
                      onClick={() => recordRecentCalculator(calculator.id)}
                      className="inline-flex items-center px-3 text-sm font-medium transition hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/30 motion-reduce:transition-none"
                    >
                      {calculator.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeRecentCalculator(calculator.id)}
                      aria-label={
                        isEnglish
                          ? `Remove ${calculator.name} from recent calculators`
                          : `${calculator.name} 최근 사용에서 제거`
                      }
                      className="inline-flex min-h-11 min-w-11 items-center justify-center border-l text-base text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/30 motion-reduce:transition-none"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}
