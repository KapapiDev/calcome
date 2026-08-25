import { notFound } from "next/navigation";
import { LocalizedPensionSavingsTaxCreditPage } from "@/features/pension-savings-tax-credit/components/localized-pension-savings-tax-credit-page";
import { createPensionSavingsTaxCreditMetadata } from "@/features/pension-savings-tax-credit/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createPensionSavingsTaxCreditMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedPensionSavingsTaxCreditPage locale={locale} />;
}
