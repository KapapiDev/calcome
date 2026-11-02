import Link from "next/link";
import {
  comparisonReviewedOn,
  guideComparisons,
} from "@/content/guide-comparisons";
import type { GuideLocale, GuideSlug } from "@/content/guides";

export function GuideComparison({
  slug,
  locale,
  linkToGuide = false,
}: {
  slug: GuideSlug;
  locale: GuideLocale;
  linkToGuide?: boolean;
}) {
  const copy = guideComparisons[slug][locale];
  const id = "comparison-" + slug;
  return (
    <section
      id={id}
      aria-labelledby={id + "-title"}
      className="mt-8 min-w-0 scroll-mt-8 rounded-xl border bg-card p-5 sm:p-6"
      data-guide-comparison={slug}
    >
      <h2 id={id + "-title"} className="text-xl font-semibold">
        {copy.question}
      </h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        {copy.assumption}
      </p>
      <table className="mt-5 w-full table-fixed border-collapse text-left text-sm">
        <caption className="sr-only">{copy.question}</caption>
        <thead>
          <tr>
            {copy.columns.map((label) => (
              <th
                scope="col"
                key={label}
                className="break-words border-b p-2 align-top font-semibold"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {copy.rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) =>
                cellIndex === 0 ? (
                  <th
                    scope="row"
                    key={cellIndex}
                    className="break-words border-b p-2 align-top font-medium leading-6"
                  >
                    {cell}
                  </th>
                ) : (
                  <td
                    key={cellIndex}
                    className="break-words border-b p-2 align-top leading-6"
                  >
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        {copy.takeaway}
      </p>
      <p className="mt-3 text-xs text-muted-foreground">
        {locale === "ko" ? "비교 예시 검토일: " : "Comparison reviewed: "}
        <time dateTime={comparisonReviewedOn}>{comparisonReviewedOn}</time>
      </p>
      {linkToGuide && (
        <Link
          className="mt-3 inline-flex min-h-11 items-center text-sm text-primary underline underline-offset-4"
          href={`/${locale}/guides/${slug}#${id}`}
        >
          {locale === "ko"
            ? "비교 기준과 출처 자세히 보기"
            : "Read the comparison basis and sources"}
        </Link>
      )}
    </section>
  );
}
