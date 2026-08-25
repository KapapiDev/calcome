import { notFound } from "next/navigation";
import { LocalizedInflationPurchasingPowerPage } from "@/features/inflation-purchasing-power/components/localized-inflation-purchasing-power-page";
import { createInflationPurchasingPowerMetadata } from "@/features/inflation-purchasing-power/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createInflationPurchasingPowerMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedInflationPurchasingPowerPage locale={locale} />;
}
