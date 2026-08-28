import { notFound } from "next/navigation";
import { LocalizedBondYieldPage } from "@/features/bond-yield-to-maturity/components/localized-bond-yield-page";
import { createBondYieldMetadata } from "@/features/bond-yield-to-maturity/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createBondYieldMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedBondYieldPage locale={locale} />;
}
