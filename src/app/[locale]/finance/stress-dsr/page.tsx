import { notFound } from "next/navigation";
import { LocalizedStressDsrPage } from "@/features/stress-dsr/components/localized-stress-dsr-page";
import { createStressDsrMetadata } from "@/features/stress-dsr/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createStressDsrMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedStressDsrPage locale={locale} />;
}
