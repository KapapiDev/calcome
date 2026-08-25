import { notFound } from "next/navigation";
import { LocalizedCurrencyConversionPage } from "@/features/currency-conversion/components/localized-currency-conversion-page";
import { createCurrencyConversionMetadata } from "@/features/currency-conversion/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createCurrencyConversionMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedCurrencyConversionPage locale={locale} />;
}
