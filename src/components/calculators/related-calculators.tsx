import Link from "next/link";

import {
  allPublishedCalculators,
  calculatorDirectoryCategories,
} from "@/config/calculator-directory";

const calculatorsById = new Map(
  allPublishedCalculators.map((calculator) => [calculator.id, calculator] as const),
);

const priorityRelatedIds: Readonly<Record<string, readonly string[]>> = {
  "compound-interest": [
    "savings",
    "deposit",
    "savings-goal",
    "cagr",
    "dollar-cost-averaging",
  ],
  loan: [
    "ltv",
    "dsr",
    "stress-dsr",
    "mortgage-loan-limit",
    "loan-refinancing-savings",
  ],
  ltv: ["mortgage-loan-limit", "dsr", "stress-dsr", "mortgage-payment"],
  dsr: ["stress-dsr", "mortgage-loan-limit", "ltv", "loan-affordability"],
  "stress-dsr": ["dsr", "mortgage-loan-limit", "ltv", "loan-affordability"],
  "mortgage-loan-limit": ["ltv", "dsr", "stress-dsr", "mortgage-payment"],
  cagr: [
    "compound-interest",
    "dollar-cost-averaging",
    "stock-profit-loss",
    "dividend-yield",
  ],
  "stock-average-cost": [
    "stock-profit-loss",
    "dollar-cost-averaging",
    "cagr",
    "dividend-yield",
  ],
};

function normalizeCalculatorPath(pathname: string) {
  const cleanPath = pathname.split(/[?#]/, 1)[0]?.replace(/\/$/, "") || "/";

  if (cleanPath.startsWith("/en/")) {
    return `/ko/${cleanPath.slice(4)}`;
  }

  return cleanPath.startsWith("/ko/") ? cleanPath : null;
}

function englishCalculatorName(href: string) {
  const slug = href.split("/").filter(Boolean).at(-1) ?? "calculator";
  const acronyms = new Set(["apr", "apy", "cagr", "dsr", "dti", "ltv", "vat"]);
  const words = slug.split("-").map((word) =>
    acronyms.has(word)
      ? word.toUpperCase()
      : `${word.charAt(0).toUpperCase()}${word.slice(1)}`,
  );

  return `${words.join(" ")} Calculator`;
}

export function getRelatedCalculators(pathname: string, limit = 4) {
  const normalizedPath = normalizeCalculatorPath(pathname);
  if (!normalizedPath) return [];

  const current = allPublishedCalculators.find(
    (calculator) => calculator.href === normalizedPath,
  );
  if (!current) return [];

  const category = calculatorDirectoryCategories.find((entry) =>
    entry.calculatorIds.includes(current.id),
  );
  if (!category) return [];

  const candidateIds = [
    ...(priorityRelatedIds[current.id] ?? []),
    ...category.calculatorIds,
  ];
  const seen = new Set<string>([current.id]);

  return candidateIds
    .filter((id) => {
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    })
    .map((id) => calculatorsById.get(id))
    .filter((calculator) => calculator !== undefined)
    .slice(0, limit);
}

export function RelatedCalculators({
  locale,
  pathname,
}: {
  locale: "ko" | "en";
  pathname: string;
}) {
  const related = getRelatedCalculators(pathname);
  if (related.length === 0) return null;

  const isEnglish = locale === "en";

  return (
    <aside
      aria-labelledby="related-calculators-title"
      className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8"
    >
      <div className="rounded-2xl border bg-card p-5 sm:p-6">
        <h2 id="related-calculators-title" className="text-lg font-semibold">
          {isEnglish ? "Related calculators" : "함께 보면 좋은 계산기"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {isEnglish
            ? "Continue with calculators that answer the next question in this topic."
            : "같은 주제에서 다음으로 궁금해질 계산기를 이어서 확인해 보세요."}
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((calculator) => {
            const href = isEnglish
              ? calculator.href.replace(/^\/ko\//, "/en/")
              : calculator.href;

            return (
              <li key={calculator.id}>
                <Link
                  href={href}
                  className="flex min-h-11 h-full items-center rounded-lg border bg-background px-4 py-3 text-sm font-medium transition hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
                >
                  {isEnglish
                    ? englishCalculatorName(calculator.href)
                    : calculator.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
