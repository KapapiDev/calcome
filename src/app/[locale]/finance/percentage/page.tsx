import { notFound } from "next/navigation";
import { LocalizedPercentagePage } from "@/features/percentage/components/localized-percentage-page";
import { createPercentageMetadata } from "@/features/percentage/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createPercentageMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedPercentagePage locale={locale} />;
}
