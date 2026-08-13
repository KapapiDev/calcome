import { notFound } from "next/navigation";
import { LocalizedSavingsGoalPage } from "@/features/savings-goal/components/localized-savings-goal-page";
import { createSavingsGoalMetadata } from "@/features/savings-goal/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createSavingsGoalMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedSavingsGoalPage locale={locale} />;
}
