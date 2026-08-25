import { notFound } from "next/navigation";
import { LocalizedYearEndTaxRefundPage } from "@/features/year-end-tax-refund/components/localized-year-end-tax-refund-page";
import { createYearEndTaxRefundMetadata } from "@/features/year-end-tax-refund/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createYearEndTaxRefundMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedYearEndTaxRefundPage locale={locale} />;
}
