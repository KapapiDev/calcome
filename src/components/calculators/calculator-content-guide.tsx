import type { ReactNode } from "react";

export type CalculatorContentSource = {
  label: string;
  href: string;
};

type CalculatorContentGuideProps = {
  locale: "ko" | "en";
  method: ReactNode;
  example: ReactNode;
  assumptions: readonly ReactNode[];
  limitations: readonly ReactNode[];
  reviewedAt: string;
  sources?: readonly CalculatorContentSource[];
};

export function CalculatorContentGuide({
  locale,
  method,
  example,
  assumptions,
  limitations,
  reviewedAt,
  sources = [],
}: CalculatorContentGuideProps) {
  const copy =
    locale === "ko"
      ? {
          heading: "계산 기준과 확인 사항",
          method: "계산 방법",
          example: "계산 예시",
          assumptions: "주요 가정",
          limitations: "한계와 확인할 점",
          reviewed: "콘텐츠 검토일",
          sources: "출처",
        }
      : {
          heading: "Calculation basis and checks",
          method: "How it works",
          example: "Worked example",
          assumptions: "Key assumptions",
          limitations: "Limits and checks",
          reviewed: "Content reviewed",
          sources: "Sources",
        };

  return (
    <section
      className="mt-10 rounded-xl border bg-card p-5 sm:p-6"
      aria-labelledby="calculator-content-guide-title"
    >
      <h2 id="calculator-content-guide-title" className="text-xl font-semibold">
        {copy.heading}
      </h2>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="font-semibold">{copy.method}</h3>
          <div className="mt-2 text-sm leading-7 text-muted-foreground">
            {method}
          </div>
        </div>
        <div>
          <h3 className="font-semibold">{copy.example}</h3>
          <div className="mt-2 text-sm leading-7 text-muted-foreground">
            {example}
          </div>
        </div>
        <div>
          <h3 className="font-semibold">{copy.assumptions}</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
            {assumptions.map((assumption, index) => (
              <li key={index}>{assumption}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">{copy.limitations}</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
            {limitations.map((limitation, index) => (
              <li key={index}>{limitation}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 border-t pt-4 text-xs leading-6 text-muted-foreground">
        <p>
          {copy.reviewed}: <time dateTime={reviewedAt}>{reviewedAt}</time>
        </p>
        {sources.length > 0 ? (
          <div className="mt-2">
            <span>{copy.sources}: </span>
            {sources.map((source, index) => (
              <span key={source.href}>
                {index > 0 ? ", " : null}
                <a
                  className="underline underline-offset-4"
                  href={source.href}
                  rel="noreferrer"
                >
                  {source.label}
                </a>
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
