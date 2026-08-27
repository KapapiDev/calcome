import { notFound } from "next/navigation";
import { LocalizedAgePage } from "@/features/age/components/localized-age-page";
import { createAgeMetadata } from "@/features/age/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en" ? createAgeMetadata(locale) : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedAgePage locale={locale} />;
}
