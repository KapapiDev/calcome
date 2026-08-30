import { visibleCalculatorDirectory } from "@/config/calculator-directory";
import { englishDirectoryCategoryCopy } from "@/config/calculator-directory-copy";

export function DirectoryCategoryNavigation({
  locale = "ko",
}: {
  locale?: "ko" | "en";
}) {
  const isEnglish = locale === "en";

  return (
    <nav
      aria-label={isEnglish ? "Calculator categories" : "계산기 카테고리"}
      className="mt-10"
    >
      <ul className="-mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain px-1 pb-2">
        {visibleCalculatorDirectory.map((category) => (
          <li key={category.id} className="shrink-0 snap-start">
            <a
              href={`#${category.id}`}
              aria-controls={category.id}
              className="inline-flex min-h-11 items-center rounded-lg border bg-background px-4 text-sm font-medium transition hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
            >
              {isEnglish
                ? englishDirectoryCategoryCopy[category.id].name
                : category.name}
              <span className="ml-2 text-muted-foreground">
                {category.calculators.length}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
