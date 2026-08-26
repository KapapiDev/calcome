import { notFound } from "next/navigation";
import { LocalizedDailyWorkerPayPage } from "@/features/daily-worker-pay/components/localized-daily-worker-pay-page";
import { createDailyWorkerPayMetadata } from "@/features/daily-worker-pay/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createDailyWorkerPayMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedDailyWorkerPayPage locale={locale} />;
}
