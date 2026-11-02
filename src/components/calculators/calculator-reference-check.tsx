import { calculatorReferenceChecks } from "@/content/calculator-reference-checks";

export function CalculatorReferenceCheck({
  slug,
  locale,
}: {
  slug: string;
  locale: "ko" | "en";
}) {
  const entry = calculatorReferenceChecks.find((item) => item.slug === slug);
  if (!entry) return null;
  const copy = entry[locale];
  const ko = locale === "ko";
  const basis = {
    "published-example": ko
      ? "공식 공개 사례 대조"
      : "Published official example",
    "rule-derived": ko
      ? "공식 규칙으로 별도 계산"
      : "Independently calculated from official rules",
    arithmetic: ko
      ? "입력 가정에 따른 산술 대조"
      : "Arithmetic check of entered assumptions",
  }[entry.basis];
  return (
    <section
      className="mt-8 rounded-xl border bg-card p-5 sm:p-6"
      aria-labelledby={`${slug}-reference-title`}
      data-reference-check={slug}
    >
      <h2 id={`${slug}-reference-title`} className="text-xl font-semibold">
        {ko ? "재현 가능한 검증 사례" : "Reproducible reference check"}
      </h2>
      <p className="mt-3 text-sm font-medium">{basis}</p>
      <dl className="mt-4 space-y-4 text-sm leading-7">
        <div>
          <dt className="font-semibold">{ko ? "입력" : "Inputs"}</dt>
          <dd className="text-muted-foreground">{copy.inputs}</dd>
        </div>
        <div>
          <dt className="font-semibold">
            {ko ? "대조 결과" : "Reference result"}
          </dt>
          <dd className="text-muted-foreground">{copy.expected}</dd>
        </div>
        <div>
          <dt className="font-semibold">{ko ? "검증 범위" : "Scope"}</dt>
          <dd className="text-muted-foreground">{copy.scope}</dd>
        </div>
      </dl>
      <p className="mt-4 text-xs text-muted-foreground">
        {ko ? "이 사례 확인일: " : "Case checked: "}
        <time dateTime={entry.reviewedOn}>{entry.reviewedOn}</time>
      </p>
      {entry.sourceUrls.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-x-5">
          {entry.sourceUrls.map((href, i) => (
            <li key={href}>
              <a
                className="inline-flex min-h-11 items-center break-all text-sm text-primary underline underline-offset-4"
                href={href}
              >
                {ko ? "확인 근거" : "Source"} {i + 1} · {new URL(href).hostname}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
