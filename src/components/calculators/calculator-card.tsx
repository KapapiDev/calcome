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
      className="group flex min-h-11 h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-card p-4 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
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
        계산하기
      </span>
    </Link>
  );
}
