import Link from "next/link";
import {
  calculatorExamples,
  calculatorExampleSources,
} from "@/content/calculator-examples";
import { allPublishedCalculators } from "@/config/calculator-directory";
import { getEnglishCalculatorName } from "@/config/calculator-directory-calculator-copy";

const guideLabels: Record<string, { ko: string; en: string }> = {
  "bond-price-and-yield": {
    ko: "채권 가격과 수익률 가이드",
    en: "Bond price and yield guide",
  },
  "currency-conversion-rate-check": {
    ko: "적용 환율 확인 가이드",
    en: "Exchange-rate checks guide",
  },
};

export function CalculatorWorkedExample({
  slug,
  locale,
}: {
  slug: string;
  locale: "ko" | "en";
}) {
  const entry = calculatorExamples[slug];
  if (!entry) throw new Error("Missing calculator example: " + slug);
  const copy = entry[locale];
  const headingId = slug + "-worked-example-title";
  return (
    <section
      data-calculator-example={slug}
      aria-labelledby={headingId}
      className="mt-8 rounded-xl border bg-card p-5 sm:p-6"
    >
      <h2 id={headingId} className="text-xl font-semibold">
        {locale === "ko"
          ? "계산 예시와 결과 해석"
          : "Worked example and interpretation"}
      </h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        {copy.answer}
      </p>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div>
          <h3 className="font-semibold">
            {locale === "ko" ? "숫자로 확인하기" : "Follow the numbers"}
          </h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {copy.example}
          </p>
        </div>
        <div>
          <h3 className="font-semibold">
            {locale === "ko" ? "결과를 적용할 때" : "Before using the result"}
          </h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {copy.check}
          </p>
        </div>
      </div>
      <div className="mt-5 border-t pt-4 text-xs leading-6 text-muted-foreground">
        <p>
          {locale === "ko" ? "설명 검토일" : "Explanation reviewed"}:{" "}
          <time dateTime="2026-10-30">2026-10-30</time>
        </p>
        {entry.sources.length > 0 && (
          <p className="mt-2">
            {locale === "ko" ? "참고자료" : "References"}:{" "}
            {entry.sources.map((key, index) => {
              const source = calculatorExampleSources[key];
              return (
                <span key={key}>
                  {index > 0 ? ", " : ""}
                  <a
                    className="underline underline-offset-4"
                    href={source.href}
                    rel="noreferrer"
                  >
                    {source[locale]}
                  </a>
                </span>
              );
            })}
          </p>
        )}
      </div>
      <nav
        className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm"
        aria-label={
          locale === "ko"
            ? "다음 계산과 가이드"
            : "Next calculations and guides"
        }
      >
        {entry.related.map((target) => {
          if (target.startsWith("guides:")) {
            const guide = target.slice(7);
            return (
              <Link
                key={target}
                className="text-primary underline underline-offset-4"
                href={"/" + locale + "/guides/" + guide}
              >
                {guideLabels[guide][locale]}
              </Link>
            );
          }
          const calculator = allPublishedCalculators.find(
            (c) => c.href.split("/").at(-1) === target,
          );
          if (!calculator)
            throw new Error("Unknown related calculator: " + target);
          return (
            <Link
              key={target}
              className="text-primary underline underline-offset-4"
              href={calculator.href.replace(/^\/ko\//, "/" + locale + "/")}
            >
              {locale === "ko"
                ? calculator.name
                : getEnglishCalculatorName(calculator.id)}
            </Link>
          );
        })}
      </nav>
    </section>
  );
}
