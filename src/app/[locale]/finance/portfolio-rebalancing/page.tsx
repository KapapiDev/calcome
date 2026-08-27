import { notFound } from "next/navigation";
import { LocalizedPortfolioRebalancingPage } from "@/features/portfolio-rebalancing/components/localized-portfolio-rebalancing-page";
import { createPortfolioRebalancingMetadata } from "@/features/portfolio-rebalancing/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createPortfolioRebalancingMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedPortfolioRebalancingPage locale={locale} />;
}
