import { notFound } from "next/navigation";
import { LocalizedRentalYieldPage } from "@/features/rental-yield/components/localized-rental-yield-page";
import { createRentalYieldMetadata } from "@/features/rental-yield/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en" ? createRentalYieldMetadata(locale) : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedRentalYieldPage locale={locale} />;
}
