import { notFound } from "next/navigation";
import { LocalizedRetirementIncomeTaxPage } from "@/features/retirement-income-tax/components/localized-retirement-income-tax-page";
import { createRetirementIncomeTaxMetadata } from "@/features/retirement-income-tax/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createRetirementIncomeTaxMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedRetirementIncomeTaxPage locale={locale} />;
}
