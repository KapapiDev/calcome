import { notFound } from "next/navigation";
import { LocalizedEmergencyFundPage } from "@/features/emergency-fund/components/localized-emergency-fund-page";
import { createEmergencyFundMetadata } from "@/features/emergency-fund/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createEmergencyFundMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedEmergencyFundPage locale={locale} />;
}
