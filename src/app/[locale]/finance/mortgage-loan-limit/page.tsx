import { notFound } from "next/navigation";
import { LocalizedMortgageLoanLimitPage } from "@/features/mortgage-loan-limit/components/localized-mortgage-loan-limit-page";
import { createMortgageLoanLimitMetadata } from "@/features/mortgage-loan-limit/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createMortgageLoanLimitMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedMortgageLoanLimitPage locale={locale} />;
}
