import { notFound } from "next/navigation";
import { LocalizedDDayPage } from "@/features/d-day/components/localized-d-day-page";
import { createDDayMetadata } from "@/features/d-day/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createDDayMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedDDayPage locale={locale} />;
}
