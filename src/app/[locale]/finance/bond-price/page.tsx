import { notFound } from "next/navigation";
import { LocalizedBondPricePage } from "@/features/bond-price/components/localized-bond-price-page";
import { createBondPriceMetadata } from "@/features/bond-price/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createBondPriceMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedBondPricePage locale={locale} />;
}
