import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InfoPage } from "@/components/layout/info-page";
import {
  getGuide,
  guideReviewedOn,
  guideSlugs,
  guideSources,
  type GuideSlug,
} from "@/content/guides";
import { createPageMetadata, socialLocale } from "@/lib/seo/metadata";

export function generateStaticParams() {
  // LocaleLayout supplies ko/en; enumerate only this segment's slugs.
  return guideSlugs.map((slug) => ({ slug }));
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
  const metadata = createPageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/${locale}/guides/${slug}`,
  });
  return {
    ...metadata,
    openGraph: { ...metadata.openGraph, ...socialLocale(locale) },
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
    <InfoPage
      eyebrow="GUIDE"
      title={guide.title}
      description={guide.description}
    >
      <p className="text-sm text-muted-foreground">
        {locale === "ko"
          ? "CalCome 편집 · 내용 및 출처 확인: "
          : "CalCome editorial · Content and sources checked: "}
        <time dateTime={guideReviewedOn}>{guideReviewedOn}</time>
      </p>
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
        <Link
          className="mt-4 inline-flex min-h-11 items-center font-semibold text-primary underline-offset-4 hover:underline"
          href={guide.calculatorHref}
        >
          {guide.calculatorLabel}
        </Link>
      </section>
      <section>
        <h2 className="text-xl font-semibold">
          {locale === "ko" ? "참고 자료" : "Sources"}
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-7">
          {guideSources[slug as GuideSlug].map((source) => (
            <li key={source.href}>
              <a
                className="break-words font-medium text-primary underline underline-offset-4"
                href={source.href}
              >
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
      <Link
        className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4"
        href={locale === "ko" ? "/guides" : "/en/guides"}
      >
        {locale === "ko" ? "전체 가이드 보기" : "All guides"}
      </Link>
      <p className="text-sm leading-6 text-muted-foreground">
        {locale === "ko"
          ? "이 가이드는 일반적인 정보 제공용이며 금융 또는 투자 자문이 아닙니다."
          : "This guide is for general information and is not financial or investment advice."}
      </p>
    </InfoPage>
  );
}
