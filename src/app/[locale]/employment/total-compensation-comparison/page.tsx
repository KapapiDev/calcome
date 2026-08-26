import { notFound } from "next/navigation";
import { LocalizedTotalCompensationComparisonPage } from "@/features/total-compensation-comparison/components/localized-total-compensation-comparison-page";
import { createTotalCompensationComparisonMetadata } from "@/features/total-compensation-comparison/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createTotalCompensationComparisonMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedTotalCompensationComparisonPage locale={locale} />;
}
