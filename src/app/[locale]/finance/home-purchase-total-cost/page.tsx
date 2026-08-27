import { notFound } from "next/navigation";
import { LocalizedHomePurchaseTotalCostPage } from "@/features/home-purchase-total-cost/components/localized-home-purchase-total-cost-page";
import { createHomePurchaseTotalCostMetadata } from "@/features/home-purchase-total-cost/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createHomePurchaseTotalCostMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedHomePurchaseTotalCostPage locale={locale} />;
}
