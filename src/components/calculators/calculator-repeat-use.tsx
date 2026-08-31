"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

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

function notifyRepeatUseChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(REPEAT_USE_EVENT));
  }
}

export function getRepeatUseSnapshot(): RepeatUseSnapshot {
  return {
    favorites: readIds(FAVORITES_KEY),
    recent: readIds(RECENT_KEY, MAX_RECENT_CALCULATORS),
  };
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

export function recordRecentCalculator(id: string) {
  const recent = getRepeatUseSnapshot().recent.filter(
    (recentId) => recentId !== id,
  );
  writeIds(RECENT_KEY, [id, ...recent].slice(0, MAX_RECENT_CALCULATORS));
  notifyRepeatUseChange();
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
  const [snapshot, setSnapshot] = useState<RepeatUseSnapshot>({
    favorites: [],
    recent: [],
  });
  const [hydrated, setHydrated] = useState(false);
  const isEnglish = locale === "en";
  const byId = useMemo(
    () => new Map(calculators.map((calculator) => [calculator.id, calculator])),
    [calculators],
  );
  const refresh = useCallback(() => {
    setSnapshot(getRepeatUseSnapshot());
    setHydrated(true);
  }, []);

  useEffect(() => {
    const initialRefresh = window.setTimeout(refresh, 0);
    window.addEventListener(REPEAT_USE_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.clearTimeout(initialRefresh);
      window.removeEventListener(REPEAT_USE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  const favorites = resolveCalculators(snapshot.favorites, byId);
  const favoriteIds = new Set(favorites.map((calculator) => calculator.id));
  const recent = resolveCalculators(snapshot.recent, byId).filter(
    (calculator) => !favoriteIds.has(calculator.id),
  );

  if (!hydrated || (favorites.length === 0 && recent.length === 0)) return null;

  const groups = [
    {
      key: "favorites",
      label: isEnglish ? "Favorites" : "즐겨찾기",
      calculators: favorites,
    },
    {
      key: "recent",
      label: isEnglish ? "Recently used" : "최근 사용",
      calculators: recent,
    },
  ].filter((group) => group.calculators.length > 0);

  return (
    <section
      className="mt-10 rounded-xl border bg-muted/30 p-4 sm:p-5"
      aria-labelledby={`repeat-use-heading-${locale}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2
          id={`repeat-use-heading-${locale}`}
          className="text-base font-semibold tracking-tight"
        >
          {isEnglish ? "Your calculator shortcuts" : "내 계산기 바로가기"}
        </h2>
        <p className="text-xs text-muted-foreground">
          {isEnglish ? "Stored only on this device" : "이 기기에만 저장됩니다"}
        </p>
      </div>
      <div className="mt-4 space-y-4">
        {groups.map((group) => (
          <div key={group.key}>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {group.label}
            </h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {group.calculators.map((calculator) => (
                <li key={calculator.id}>
                  <Link
                    href={calculator.href}
                    onClick={() => recordRecentCalculator(calculator.id)}
                    className="inline-flex min-h-11 items-center rounded-lg border bg-background px-3 text-sm font-medium transition hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30 motion-reduce:transition-none"
                  >
                    {calculator.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
