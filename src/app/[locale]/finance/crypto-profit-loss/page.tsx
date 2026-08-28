import { notFound } from "next/navigation";
import { LocalizedCryptoProfitLossPage } from "@/features/crypto-profit-loss/components/localized-crypto-profit-loss-page";
import { createCryptoProfitLossMetadata } from "@/features/crypto-profit-loss/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createCryptoProfitLossMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedCryptoProfitLossPage locale={locale} />;
}
