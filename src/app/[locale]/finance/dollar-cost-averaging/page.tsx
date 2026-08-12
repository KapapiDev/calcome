import { notFound } from "next/navigation";
import { LocalizedDollarCostAveragingPage } from "@/features/dollar-cost-averaging/components/localized-dollar-cost-averaging-page";
import { createDollarCostAveragingMetadata } from "@/features/dollar-cost-averaging/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createDollarCostAveragingMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedDollarCostAveragingPage locale={locale} />;
}
