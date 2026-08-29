import { notFound } from "next/navigation";
import { LocalizedBusinessCashRunwayPage } from "@/features/business-cash-runway/components/localized-business-cash-runway-page";
import { createBusinessCashRunwayMetadata } from "@/features/business-cash-runway/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createBusinessCashRunwayMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedBusinessCashRunwayPage locale={locale} />;
}
