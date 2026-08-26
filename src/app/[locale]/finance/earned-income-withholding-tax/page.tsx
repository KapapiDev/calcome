import { notFound } from "next/navigation";
import { LocalizedEarnedIncomeWithholdingTaxPage } from "@/features/earned-income-withholding-tax/components/localized-earned-income-withholding-tax-page";
import { createEarnedIncomeWithholdingTaxMetadata } from "@/features/earned-income-withholding-tax/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createEarnedIncomeWithholdingTaxMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedEarnedIncomeWithholdingTaxPage locale={locale} />;
}
