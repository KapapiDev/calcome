import { notFound } from "next/navigation";
import { LocalizedEmployerTotalLaborCostPage } from "@/features/employer-total-labor-cost/components/localized-employer-total-labor-cost-page";
import { createEmployerTotalLaborCostMetadata } from "@/features/employer-total-labor-cost/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createEmployerTotalLaborCostMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedEmployerTotalLaborCostPage locale={locale} />;
}
