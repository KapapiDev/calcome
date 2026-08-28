import { notFound } from "next/navigation";
import { LocalizedForeignCurrencyAverageCostPage } from "@/features/foreign-currency-average-cost/components/localized-foreign-currency-average-cost-page";
import { createForeignCurrencyAverageCostMetadata } from "@/features/foreign-currency-average-cost/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createForeignCurrencyAverageCostMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedForeignCurrencyAverageCostPage locale={locale} />;
}
