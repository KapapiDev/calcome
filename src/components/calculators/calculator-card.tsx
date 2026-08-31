"use client";

import { Star } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";

import {
  getCachedRepeatUseSnapshot,
  recordRecentCalculator,
  subscribeRepeatUse,
  toggleCalculatorFavorite,
} from "@/components/calculators/calculator-repeat-use";
import type { PublishedCalculator } from "@/config/calculators";

export function CalculatorCard({
  calculator,
  categoryLabel,
}: {
  calculator: PublishedCalculator;
  categoryLabel?: string;
}) {
  const isEnglish = calculator.href.startsWith("/en/");
  const favorite = useSyncExternalStore(
    subscribeRepeatUse,
    () => getCachedRepeatUseSnapshot().favorites.includes(calculator.id),
    () => false,
  );

  const favoriteLabel = favorite
    ? isEnglish
      ? `Remove ${calculator.name} from favorites`
      : `${calculator.name} 즐겨찾기 해제`
    : isEnglish
      ? `Add ${calculator.name} to favorites`
      : `${calculator.name} 즐겨찾기 추가`;

  return (
    <div className="group relative h-full min-w-0 overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/40 focus-within:ring-2 focus-within:ring-ring motion-reduce:transition-none">
      <Link
        href={calculator.href}
        onClick={() => recordRecentCalculator(calculator.id)}
        className="flex min-h-11 h-full min-w-0 overflow-hidden flex-col p-4 pr-14 focus-visible:outline-none"
      >
        <span className="max-w-full break-words text-xs font-semibold leading-5 tracking-wide text-primary">
          {categoryLabel ?? calculator.category}
        </span>
        <h3 className="mt-2 break-words text-lg font-semibold leading-6 tracking-tight">
          {calculator.name}
        </h3>
        <p className="mt-1.5 line-clamp-3 break-words text-sm leading-6 text-muted-foreground">
          {calculator.description}
        </p>
        <span className="mt-auto block pt-3 text-sm font-medium text-primary group-hover:underline">
          {isEnglish ? "Calculate" : "계산하기"}
        </span>
      </Link>
      <button
        type="button"
        aria-label={favoriteLabel}
        aria-pressed={favorite}
        title={favoriteLabel}
        className="absolute right-2 top-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
        onClick={() => toggleCalculatorFavorite(calculator.id)}
      >
        <Star
          aria-hidden="true"
          className={`size-5 ${favorite ? "fill-current text-primary" : ""}`}
        />
      </button>
    </div>
  );
}
