import { notFound } from "next/navigation";
import { LocalizedPartTimeMonthlyPayPage } from "@/features/part-time-monthly-pay/components/localized-part-time-monthly-pay-page";
import { createPartTimeMonthlyPayMetadata } from "@/features/part-time-monthly-pay/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createPartTimeMonthlyPayMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedPartTimeMonthlyPayPage locale={locale} />;
}
