import type { ReactNode } from "react";

const COPY = {
  ko: {
    title: "결과를 이렇게 읽어보세요",
    description:
      "표시된 값은 현재 입력값을 기준으로 계산한 결과입니다. 단위와 계산기별 가정·포함 범위는 입력 항목과 페이지 설명을 함께 확인하세요.",
    primary: "가장 중요한 결과",
    context: "함께 확인할 값",
  },
  en: {
    title: "How to read these results",
    description:
      "These values are calculated from your current inputs. Check the input units and this calculator’s stated assumptions or included scope alongside the results.",
    primary: "Primary result",
    context: "Supporting value",
  },
} as const;

function inferLocale(metrics: readonly { label: string }[]): "ko" | "en" {
  return metrics.some(({ label }) => /[가-힣]/.test(label)) ? "ko" : "en";
}

export function CalculatorResultContext({
  metrics,
}: {
  metrics: readonly { label: string; value: ReactNode; featured?: boolean }[];
}) {
  const copy = COPY[inferLocale(metrics)];
  const featured = metrics.find((metric) => metric.featured) ?? metrics[0];
  const supporting = metrics.find((metric) => metric !== featured);

  return (
    <section
      className="mt-3 rounded-lg border bg-muted/30 p-3 text-sm"
      data-testid="result-context"
      aria-labelledby="result-context-title"
    >
      <p id="result-context-title" className="font-medium">
        {copy.title}
      </p>
      <p className="mt-1 leading-5 text-muted-foreground">{copy.description}</p>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {featured ? (
          <p className="rounded-md bg-background px-3 py-2 font-medium">
            {copy.primary}: {featured.label}
          </p>
        ) : null}
        {supporting ? (
          <p className="rounded-md bg-background px-3 py-2 font-medium">
            {copy.context}: {supporting.label}
          </p>
        ) : null}
      </div>
    </section>
  );
}
