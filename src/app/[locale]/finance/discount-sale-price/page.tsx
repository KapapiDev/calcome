import { notFound } from "next/navigation";
import { LocalizedDiscountSalePricePage } from "@/features/discount-sale-price/components/localized-discount-sale-price-page";
import { createDiscountSalePriceMetadata } from "@/features/discount-sale-price/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createDiscountSalePriceMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedDiscountSalePricePage locale={locale} />;
}
