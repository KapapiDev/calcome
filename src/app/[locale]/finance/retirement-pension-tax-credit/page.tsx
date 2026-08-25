import { notFound } from "next/navigation";
import { LocalizedRetirementPensionTaxCreditPage } from "@/features/retirement-pension-tax-credit/components/localized-retirement-pension-tax-credit-page";
import { createRetirementPensionTaxCreditMetadata } from "@/features/retirement-pension-tax-credit/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createRetirementPensionTaxCreditMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedRetirementPensionTaxCreditPage locale={locale} />;
}
