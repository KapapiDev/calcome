import { notFound } from "next/navigation";
import { LocalizedRetirementWithdrawalPage } from "@/features/retirement-withdrawal/components/localized-retirement-withdrawal-page";
import { createRetirementWithdrawalMetadata } from "@/features/retirement-withdrawal/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createRetirementWithdrawalMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedRetirementWithdrawalPage locale={locale} />;
}
