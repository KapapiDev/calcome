"use client";

import { useEffect, useMemo, useState } from "react";

import { CalculatorCard } from "@/components/calculators/calculator-card";
import type { DirectorySearchCalculator } from "@/config/calculator-directory";

type IndexedCalculator = {
  calculator: DirectorySearchCalculator;
  normalizedName: string;
  normalizedDescription: string;
  normalizedKeywords: readonly string[];
  sourceIndex: number;
};

type SearchLocale = "ko" | "en";

const DIRECTORY_SEARCH_STORAGE_KEY = "calcome:calculator-directory-search";

const searchCopy = {
  ko: {
    label: "계산기 검색",
    placeholder: "예: 대출, 복리, CAGR",
    empty: "검색어와 일치하는 계산기가 없습니다.",
    recovery: "검색어를 지우고 아래 카테고리에서 계산기를 찾아보세요.",
    clear: "검색어 지우기",
  },
  en: {
    label: "Search calculators",
    placeholder: "e.g. loan, compound interest, CAGR",
    empty: "No calculators match your search.",
    recovery: "Clear the search and browse the calculator categories below.",
    clear: "Clear search",
  },
} as const;

function normalizeSearchText(value: string) {
  return value.normalize("NFKC").toLocaleLowerCase("ko-KR").trim();
}

function getSearchScore(indexed: IndexedCalculator, query: string) {
  if (indexed.normalizedName === query) return 0;
  if (indexed.normalizedKeywords.some((keyword) => keyword === query)) return 1;
  if (indexed.normalizedName.startsWith(query)) return 2;
  if (indexed.normalizedName.includes(query)) return 3;
  if (indexed.normalizedKeywords.some((keyword) => keyword.startsWith(query)))
    return 4;
  if (indexed.normalizedKeywords.some((keyword) => keyword.includes(query)))
    return 5;
  if (indexed.normalizedDescription.includes(query)) return 6;
  return null;
}

export function CalculatorSearch({
  calculators,
  locale = "ko",
}: {
  calculators: readonly DirectorySearchCalculator[];
  locale?: SearchLocale;
}) {
  const [query, setQuery] = useState("");
  const [hasRestoredQuery, setHasRestoredQuery] = useState(false);
  const copy = searchCopy[locale];

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) return;

      let restoredQuery = "";
      try {
        restoredQuery =
          window.sessionStorage.getItem(DIRECTORY_SEARCH_STORAGE_KEY) ?? "";
      } catch {
        // Search remains usable when browser storage is unavailable.
      }

      setQuery(restoredQuery);
      setHasRestoredQuery(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hasRestoredQuery) return;

    try {
      if (query) {
        window.sessionStorage.setItem(DIRECTORY_SEARCH_STORAGE_KEY, query);
      } else {
        window.sessionStorage.removeItem(DIRECTORY_SEARCH_STORAGE_KEY);
      }
    } catch {
      // Search remains usable when browser storage is unavailable.
    }
  }, [hasRestoredQuery, query]);

  const searchIndex = useMemo<readonly IndexedCalculator[]>(
    () =>
      calculators.map((calculator, sourceIndex) => ({
        calculator,
        normalizedName: normalizeSearchText(calculator.name),
        normalizedDescription: normalizeSearchText(calculator.description),
        normalizedKeywords: calculator.keywords.map(normalizeSearchText),
        sourceIndex,
      })),
    [calculators],
  );
  const normalizedQuery = normalizeSearchText(query);
  const results = useMemo(() => {
    if (!normalizedQuery) return [];
    return searchIndex
      .map((indexed) => ({
        indexed,
        score: getSearchScore(indexed, normalizedQuery),
      }))
      .filter(
        (result): result is { indexed: IndexedCalculator; score: number } =>
          result.score !== null,
      )
      .sort(
        (a, b) =>
          a.score - b.score || a.indexed.sourceIndex - b.indexed.sourceIndex,
      )
      .map(({ indexed }) => indexed.calculator);
  }, [searchIndex, normalizedQuery]);

  return (
    <div className="mt-8 max-w-2xl">
      <label htmlFor="calculator-search" className="text-sm font-medium">
        {copy.label}
      </label>
      <input
        id="calculator-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={copy.placeholder}
        autoComplete="off"
        className="mt-2 h-12 w-full rounded-xl border bg-background px-4 text-base shadow-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
      />
      {normalizedQuery ? (
        <div className="mt-4" aria-live="polite">
          {results.length ? (
            <ul className="grid gap-3">
              {results.map((calculator) => (
                <li key={calculator.id}>
                  <CalculatorCard
                    calculator={calculator}
                    categoryLabel={calculator.primaryCategory}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">
              <p>{copy.empty}</p>
              <p className="mt-1">{copy.recovery}</p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-3 inline-flex min-h-11 items-center rounded-lg border bg-background px-4 font-medium text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
              >
                {copy.clear}
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
