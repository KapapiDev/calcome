"use client";

import Link from "next/link";
import { useEffect, useMemo, useSyncExternalStore } from "react";

import { saveDirectoryReturnContext } from "@/components/calculators/calculator-directory-context";
import {
  getCachedRepeatUseSnapshot,
  reconcileRepeatUseCalculators,
  recordRecentCalculator,
  subscribeRepeatUse,
} from "@/components/calculators/calculator-repeat-use";

export type DirectoryFavoriteCalculator = {
  id: string;
  name: string;
  href: string;
};

const EMPTY_FAVORITES: readonly string[] = [];

export function resolveFavoriteDirectoryCalculators(
  favoriteIds: readonly string[],
  calculators: readonly DirectoryFavoriteCalculator[],
) {
  const byId = new Map(calculators.map((calculator) => [calculator.id, calculator]));
  return favoriteIds
    .map((id) => byId.get(id))
    .filter(
      (calculator): calculator is DirectoryFavoriteCalculator =>
        Boolean(calculator),
    );
}

export function DirectoryFavorites({
  calculators,
  locale = "ko",
}: {
  calculators: readonly DirectoryFavoriteCalculator[];
  locale?: "ko" | "en";
}) {
  const favoriteIds = useSyncExternalStore(
    subscribeRepeatUse,
    () => getCachedRepeatUseSnapshot().favorites,
    () => EMPTY_FAVORITES,
  );
  const validIds = useMemo(
    () => calculators.map((calculator) => calculator.id),
    [calculators],
  );
  const favorites = useMemo(
    () => resolveFavoriteDirectoryCalculators(favoriteIds, calculators),
    [favoriteIds, calculators],
  );
  const isEnglish = locale === "en";

  useEffect(() => {
    reconcileRepeatUseCalculators(validIds);
  }, [validIds]);

  if (favorites.length === 0) return null;

  return (
    <section
      className="mt-10 rounded-xl border bg-primary/[0.035] p-4 sm:p-5"
      aria-labelledby={`directory-favorites-heading-${locale}`}
    >
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2
            id={`directory-favorites-heading-${locale}`}
            className="text-base font-semibold tracking-tight"
          >
            {isEnglish ? "Your favorites" : "내 즐겨찾기"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {isEnglish
              ? "Jump straight back to calculators you saved on this device."
              : "이 기기에 저장한 계산기를 전체 목록보다 먼저 다시 열 수 있습니다."}
          </p>
        </div>
        <span className="text-xs text-muted-foreground" aria-live="polite">
          {isEnglish
            ? `${favorites.length} favorite${favorites.length === 1 ? "" : "s"}`
            : `${favorites.length}개`}
        </span>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label={isEnglish ? "Favorite calculators" : "즐겨찾기 계산기"}>
        {favorites.map((calculator) => (
          <li key={calculator.id}>
            <Link
              href={calculator.href}
              onClick={() => {
                saveDirectoryReturnContext(locale);
                recordRecentCalculator(calculator.id);
              }}
              className="inline-flex min-h-11 items-center rounded-lg border bg-background px-3 text-sm font-medium transition hover:border-primary/40 hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30 motion-reduce:transition-none"
            >
              {calculator.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
