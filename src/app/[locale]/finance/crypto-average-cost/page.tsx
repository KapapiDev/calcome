import { notFound } from "next/navigation";
import { LocalizedCryptoAverageCostPage } from "@/features/crypto-average-cost/components/localized-crypto-average-cost-page";
import { createCryptoAverageCostMetadata } from "@/features/crypto-average-cost/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createCryptoAverageCostMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedCryptoAverageCostPage locale={locale} />;
}
