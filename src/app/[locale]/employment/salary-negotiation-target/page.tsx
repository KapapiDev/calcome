import { notFound } from "next/navigation";
import { LocalizedSalaryNegotiationTargetPage } from "@/features/salary-negotiation-target/components/localized-salary-negotiation-target-page";
import { createSalaryNegotiationTargetMetadata } from "@/features/salary-negotiation-target/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createSalaryNegotiationTargetMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedSalaryNegotiationTargetPage locale={locale} />;
}
