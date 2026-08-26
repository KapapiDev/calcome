import { notFound } from "next/navigation";
import { LocalizedMaternityLeaveBenefitPage } from "@/features/maternity-leave-benefit/components/localized-maternity-leave-benefit-page";
import { createMaternityLeaveBenefitMetadata } from "@/features/maternity-leave-benefit/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createMaternityLeaveBenefitMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedMaternityLeaveBenefitPage locale={locale} />;
}
