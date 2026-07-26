import Link from "next/link";

import type { PublishedCalculator } from "@/config/calculators";

export function CalculatorCard({
  calculator,
  categoryLabel,
}: {
  calculator: PublishedCalculator;
  categoryLabel?: string;
}) {
  return (
    <Link
      href={calculator.href}
      className="group block h-full rounded-xl border bg-card p-4 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
    >
      <span className="text-xs font-semibold tracking-wide text-primary">
        {categoryLabel ?? calculator.category}
      </span>
      <h3 className="mt-2 text-lg font-semibold tracking-tight">
        {calculator.name}
      </h3>
      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
        {calculator.description}
      </p>
      <span className="mt-3 block text-sm font-medium text-primary group-hover:underline">
        계산하기
      </span>
    </Link>
  );
}
