import { notFound } from "next/navigation";
import { LocalizedAprApyPage } from "@/features/apr-apy-conversion/components/localized-apr-apy-page";
import { createAprApyMetadata } from "@/features/apr-apy-conversion/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createAprApyMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedAprApyPage locale={locale} />;
}
