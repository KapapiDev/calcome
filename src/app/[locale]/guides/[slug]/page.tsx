import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InfoPage } from "@/components/layout/info-page";
import { getGuide, guideSlugs } from "@/content/guides";

export function generateStaticParams() {
  return (["ko", "en"] as const).flatMap((locale) =>
    guideSlugs.map((slug) => ({ locale, slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== "ko" && locale !== "en") return {};
  const guide = getGuide(locale, slug);
  if (!guide) return {};
  const koPath = `/ko/guides/${slug}`;
  const enPath = `/en/guides/${slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: locale === "ko" ? koPath : enPath,
      languages: { ko: koPath, en: enPath, "x-default": koPath },
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  const guide = getGuide(locale, slug);
  if (!guide) notFound();

  return (
    <InfoPage eyebrow="GUIDE" title={guide.title} description={guide.description}>
      {guide.sections.map(([heading, body]) => (
        <section key={heading}>
          <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
          <p className="mt-4 leading-8 text-muted-foreground">{body}</p>
        </section>
      ))}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">
          {locale === "ko" ? "직접 계산해 보기" : "Try the calculation"}
        </h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          {locale === "ko"
            ? "가이드의 개념을 실제 숫자로 비교해 보세요."
            : "Use your own numbers to compare the concept described in this guide."}
        </p>
        <Link className="mt-4 inline-flex font-semibold text-primary underline-offset-4 hover:underline" href={guide.calculatorHref}>
          {guide.calculatorLabel}
        </Link>
      </section>
      <p className="text-sm leading-6 text-muted-foreground">
        {locale === "ko"
          ? "이 가이드는 일반적인 정보 제공용이며 금융 또는 투자 자문이 아닙니다."
          : "This guide is for general information and is not financial or investment advice."}
      </p>
    </InfoPage>
  );
}
