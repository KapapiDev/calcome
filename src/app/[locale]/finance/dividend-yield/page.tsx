import { notFound } from "next/navigation";
import { LocalizedDividendYieldRatePage } from "@/features/dividend-yield-rate/components/localized-dividend-yield-rate-page";
import { createDividendYieldRateMetadata } from "@/features/dividend-yield-rate/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createDividendYieldRateMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedDividendYieldRatePage locale={locale} />;
}
