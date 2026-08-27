import { notFound } from "next/navigation";
import { LocalizedJeonseLoanLimitPage } from "@/features/jeonse-loan-limit/components/localized-jeonse-loan-limit-page";
import { createJeonseLoanLimitMetadata } from "@/features/jeonse-loan-limit/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createJeonseLoanLimitMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedJeonseLoanLimitPage locale={locale} />;
}
