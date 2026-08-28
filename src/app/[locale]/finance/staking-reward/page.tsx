import { notFound } from "next/navigation";
import { LocalizedStakingRewardPage } from "@/features/staking-reward/components/localized-staking-reward-page";
import { createStakingRewardMetadata } from "@/features/staking-reward/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createStakingRewardMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedStakingRewardPage locale={locale} />;
}
