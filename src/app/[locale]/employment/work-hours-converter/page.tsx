import { notFound } from "next/navigation";
import { LocalizedWorkHoursConverterPage } from "@/features/work-hours-converter/components/localized-work-hours-converter-page";
import { createWorkHoursConverterMetadata } from "@/features/work-hours-converter/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createWorkHoursConverterMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedWorkHoursConverterPage locale={locale} />;
}
