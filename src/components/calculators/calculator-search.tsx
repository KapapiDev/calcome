"use client";

import { useMemo, useState } from "react";

import { CalculatorCard } from "@/components/calculators/calculator-card";
import type { DirectorySearchCalculator } from "@/config/calculator-directory";

type IndexedCalculator = {
  calculator: DirectorySearchCalculator;
  searchableText: string;
};

function normalizeSearchText(value: string) {
  return value.toLocaleLowerCase("ko-KR");
}

export function CalculatorSearch({
  calculators,
}: {
  calculators: readonly DirectorySearchCalculator[];
}) {
  const [query, setQuery] = useState("");
  const searchIndex = useMemo<readonly IndexedCalculator[]>(
    () =>
      calculators.map((calculator) => ({
        calculator,
        searchableText: normalizeSearchText(
          [
            calculator.name,
            calculator.description,
            ...calculator.keywords,
          ].join(" "),
        ),
      })),
    [calculators],
  );
  const normalizedQuery = normalizeSearchText(query.trim());
  const results = useMemo(() => {
    if (!normalizedQuery) return [];
    return searchIndex
      .filter(({ searchableText }) => searchableText.includes(normalizedQuery))
      .map(({ calculator }) => calculator);
  }, [searchIndex, normalizedQuery]);

  return (
    <div className="mt-8 max-w-2xl">
      <label htmlFor="calculator-search" className="text-sm font-medium">
        계산기 검색
      </label>
      <input
        id="calculator-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="예: 대출, 복리, CAGR"
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
            <p className="rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">
              검색어와 일치하는 계산기가 없습니다.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
