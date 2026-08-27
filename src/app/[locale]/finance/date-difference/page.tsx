import { notFound } from "next/navigation";
import { LocalizedDateDifferencePage } from "@/features/date-difference/components/localized-date-difference-page";
import { createDateDifferenceMetadata } from "@/features/date-difference/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createDateDifferenceMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedDateDifferencePage locale={locale} />;
}
