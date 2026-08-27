import { notFound } from "next/navigation";
import { LocalizedPensionFutureMonthlyIncomePage } from "@/features/pension-future-monthly-income/components/localized-pension-future-monthly-income-page";
import { createPensionFutureMonthlyIncomeMetadata } from "@/features/pension-future-monthly-income/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createPensionFutureMonthlyIncomeMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedPensionFutureMonthlyIncomePage locale={locale} />;
}
