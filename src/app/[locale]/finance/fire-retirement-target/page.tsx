import { notFound } from "next/navigation";
import { LocalizedFireRetirementTargetPage } from "@/features/fire-retirement-target/components/localized-fire-retirement-target-page";
import { createFireRetirementTargetMetadata } from "@/features/fire-retirement-target/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createFireRetirementTargetMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedFireRetirementTargetPage locale={locale} />;
}
