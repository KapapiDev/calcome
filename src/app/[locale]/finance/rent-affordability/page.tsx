import { notFound } from "next/navigation";
import { LocalizedRentAffordabilityPage } from "@/features/rent-affordability/components/localized-rent-affordability-page";
import { createRentAffordabilityMetadata } from "@/features/rent-affordability/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createRentAffordabilityMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedRentAffordabilityPage locale={locale} />;
}
