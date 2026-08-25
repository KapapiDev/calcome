import { notFound } from "next/navigation";
import { LocalizedIsaTaxSavingsPage } from "@/features/isa-tax-savings/components/localized-isa-tax-savings-page";
import { createIsaTaxSavingsMetadata } from "@/features/isa-tax-savings/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createIsaTaxSavingsMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedIsaTaxSavingsPage locale={locale} />;
}
