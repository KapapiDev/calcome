import { notFound } from "next/navigation";
import { LocalizedInvestmentFeeImpactPage } from "@/features/investment-fee-impact/components/localized-investment-fee-impact-page";
import { createInvestmentFeeImpactMetadata } from "@/features/investment-fee-impact/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createInvestmentFeeImpactMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedInvestmentFeeImpactPage locale={locale} />;
}
