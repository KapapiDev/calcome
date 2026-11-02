import {
  calculatorArithmeticBasis,
  getCalculatorSourceScope,
} from "@/content/calculator-source-context";

export function CalculatorSourceContext({
  locale,
  sources,
  calculatorId,
}: {
  locale: "ko" | "en";
  sources: readonly { label: string; href: string }[];
  calculatorId?: string;
}) {
  const scopedSources = sources.flatMap((source) => {
    const scope = getCalculatorSourceScope(source.href);
    return scope ? [{ ...source, scope: scope[locale] }] : [];
  });
  const basis =
    calculatorId && calculatorArithmeticBasis[calculatorId]?.[locale];
  if (scopedSources.length === 0 && !basis) return null;

  return (
    <details data-calculator-source-context className="mt-3">
      <summary className="cursor-pointer font-medium text-foreground">
        {locale === "ko"
          ? "출처의 적용 범위와 계산 가정"
          : "Source scope and calculation assumptions"}
      </summary>
      <div className="mt-3 space-y-3 text-xs leading-6 text-muted-foreground">
        <p>
          {locale === "ko"
            ? "출처 범위 설명 검토: "
            : "Source-scope notes reviewed: "}
          <time dateTime="2026-11-02">2026-11-02</time>
        </p>
        {scopedSources.length > 0 && (
          <dl className="space-y-3">
            {scopedSources.map((source) => (
              <div key={source.href} data-source-scope={source.href}>
                <dt className="font-medium text-foreground">{source.label}</dt>
                <dd>{source.scope}</dd>
              </div>
            ))}
          </dl>
        )}
        {basis && <p data-arithmetic-basis={calculatorId}>{basis}</p>}
        <p>
          {locale === "ko"
            ? "검토일은 설명을 검토한 날짜이며 법령·요율의 시행일이 아닙니다. 예시의 금액·금리·기간은 별도 표시가 없으면 가상 입력입니다. 실제 적용에는 해당 기간과 개인 조건을 확인하세요."
            : "A review date records when the explanation was reviewed, not when a rule or rate took effect. Example amounts, rates and periods are hypothetical unless stated otherwise. Check the applicable period and individual conditions before using a result."}
        </p>
      </div>
    </details>
  );
}
