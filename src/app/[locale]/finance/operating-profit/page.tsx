import { notFound } from "next/navigation";
import { LocalizedOperatingProfitPage } from "@/features/operating-profit/components/localized-operating-profit-page";
import { createOperatingProfitMetadata } from "@/features/operating-profit/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createOperatingProfitMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedOperatingProfitPage locale={locale} />;
}
