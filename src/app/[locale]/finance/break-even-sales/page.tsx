import { notFound } from "next/navigation";
import { LocalizedBreakEvenSalesPage } from "@/features/break-even-sales/components/localized-break-even-sales-page";
import { createBreakEvenSalesMetadata } from "@/features/break-even-sales/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createBreakEvenSalesMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedBreakEvenSalesPage locale={locale} />;
}
