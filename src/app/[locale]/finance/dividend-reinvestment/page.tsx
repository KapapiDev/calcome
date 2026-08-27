import { notFound } from "next/navigation";
import { LocalizedDividendReinvestmentPage } from "@/features/dividend-reinvestment/components/localized-dividend-reinvestment-page";
import { createDividendReinvestmentMetadata } from "@/features/dividend-reinvestment/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createDividendReinvestmentMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedDividendReinvestmentPage locale={locale} />;
}
